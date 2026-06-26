// /app/api/webhooks/predictions/output/route.ts
// Fully re-written with:
// - Raw-body HMAC verification (Replicate webhooks)
// - Idempotent storage (deterministic path + upsert)
// - Idempotent DB upsert on (prediction_id, output_index)
// - Atomic album progress update via RPC (update_album_progress)
// - Single-delivery email using albums.email_sent (claim in RPC)
// - If email sending fails, revert email_sent=false to allow retry

import { NextRequest, NextResponse, after } from "next/server";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import crypto from "crypto";
import { Resend } from "resend";
import Replicate from "replicate";
import { with429Retry } from "@/lib/retry429";
import HeadshotDeliveryEmail from "@/components/email-templates/headshots-ready";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-config";
import GetFeedbackFromUserEmail from "@/components/email-templates/get-feedback-from-user";
import HeadshotExpirationWarningEmail from "@/components/email-templates/download-headshot-reminder";

export const maxDuration = 500; // 8+ minutes 

// Required env:
// - SUPABASE_URL
// - SUPABASE_SERVICE_ROLE_KEY
// - REPLICATE_WEBHOOK_SECRET (secret_<base64> or <base64>)
// - RESEND_API_KEY
// - RESEND_FROM_EMAIL (e.g., "Headshots <no-reply@yourdomain.com>")
// Optional:
// - NEXT_PUBLIC_SITE_URL (for album link in email)

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN ?? "",
});

const MAX_PREDICTION_RETRIES = parseInt(
  process.env.MAX_PREDICTION_RETRIES || "2",
  10
);

const resend =
  process.env.RESEND_API_KEY && new Resend(process.env.RESEND_API_KEY);

interface PredictionWebhookBody {
  id: string; // Replicate prediction id
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output?: string[] | string | null;
  error?: string | null;
  logs?: string | null;
  metrics?: Record<string, unknown>;
}

type UpdateAlbumProgressRow = {
	album_id: string;
	generated_count: number;
	expected_count: number;
	album_status: "generating" | "done" | "failed" | "training";
	email_just_marked: boolean;
  };
  
interface WebhookHeaders {
	id: string
	timestamp: string
	signature: string
}
interface PredictionWebhookBody {
	id: string
	status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled'
	output?: string[] | string | null
	error?: string | null
	logs?: string | null
	metrics?: Record<string, unknown>
}

// -------- Utils --------

/** Retry a function on transient network errors (ECONNRESET, fetch failed, etc.) */
async function withTransientRetry<T>(
  fn: () => Promise<T>,
  { maxRetries = 3, baseMs = 1000 }: { maxRetries?: number; baseMs?: number } = {}
): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      const cause = err instanceof Error && 'cause' in err ? String((err as { cause?: unknown }).cause) : '';
      const isTransient =
        message.includes('fetch failed') ||
        message.includes('ECONNRESET') ||
        message.includes('ETIMEDOUT') ||
        message.includes('ECONNREFUSED') ||
        cause.includes('ECONNRESET') ||
        cause.includes('ETIMEDOUT');

      if (!isTransient || attempt >= maxRetries) throw err;

      const delay = baseMs * Math.pow(2, attempt) + Math.random() * 500;
      console.warn(`Transient error (attempt ${attempt + 1}/${maxRetries}), retrying in ${Math.round(delay)}ms...`, message);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

function normalizeOutputs(
  output: PredictionWebhookBody["output"]
): string[] {
  if (!output) return [];
  if (Array.isArray(output)) {
    return output.map((o) => String(o)).filter(Boolean);
  }
  return [String(output)].filter(Boolean);
}

function sha256HexShort(input: string, length = 16): string {
  return crypto
    .createHash("sha256")
    .update(input)
    .digest("hex")
    .slice(0, length);
}

async function sendAlbumDoneEmail(
  albumId: string,
  userId: string
): Promise<void> {
  if (!resend) {
    throw new Error(
      "RESEND_API_KEY missing; cannot send completion email."
    );
  }

  // Fetch recipient from profiles
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("email, full_name")
    .eq("id", userId)
    .single<{ email: string | null; full_name: string | null }>();

  if (profileError || !profile?.email) {
    throw new Error(
      `Profile email not found for user ${userId}: ${profileError?.message}`
    );
  }
  

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ||
    "Headshots AI <no-reply@headshot.ai>";

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://headshot.ai";
  const viewLink = `${siteUrl}/albums/${albumId}`;

  const subject = "Your headshots are ready";

  await resend.emails.send({
    from: fromEmail,
    to: profile.email,
    subject,
	react: HeadshotDeliveryEmail({ firstName: profile.full_name || "there", galleryUrl: viewLink }),
  });

  // let's schedule the feedback email
  await resend.emails.send({
    from: fromEmail,
    to: profile.email,
    subject: "We would love to hear from you",
    react: GetFeedbackFromUserEmail({ firstName: profile.full_name || "there", feedbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/feedback` }),
    scheduledAt: 'in 6 hours',
  });

  const in29Days = new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString();

  // let's schedule the download headshot reminder email
  await resend.emails.send({
    from: fromEmail,
    to: profile.email,
    subject: "Your headshots will be deleted in next 24 hours",
    react: HeadshotExpirationWarningEmail({ firstName: profile.full_name || "there", galleryUrl: viewLink }),
    scheduledAt: in29Days,
  });
}

// -------- Signature verification helpers --------

async function verifyWebhookSignature(
	headers: WebhookHeaders,
	body: PredictionWebhookBody
): Promise<boolean> {
	const signedContent = `${headers.id}.${headers.timestamp}.${JSON.stringify(body)}`
	const secret = process.env.REPLICATE_WEBHOOK_SECRET

	if (!secret) return false

	const secretBytes = Buffer.from(secret.split("_")[1], "base64")
	const signature = crypto
		.createHmac("sha256", secretBytes)
		.update(signedContent)
		.digest("base64")

	const expectedSignatures = headers.signature
		.split(" ")
		.map((sig: string) => sig.split(",")[1])
	return expectedSignatures.some(
		(expectedSignature) => expectedSignature === signature
	)
}

async function decrementExpectedCount(albumId: string): Promise<void> {
  // Read current expected_count
  const { data: album, error: readErr } = await supabaseAdmin
    .from("albums")
    .select("expected_count")
    .eq("id", albumId)
    .single<{ expected_count: number }>();

  if (readErr || !album) {
    console.error("Failed to read album for expected_count decrement:", readErr, { albumId });
    return;
  }

  // Optimistic-lock update to prevent race conditions
  const { error: updateErr } = await supabaseAdmin
    .from("albums")
    .update({ expected_count: album.expected_count - 1 })
    .eq("id", albumId)
    .eq("expected_count", album.expected_count);

  if (updateErr) {
    console.error("Failed to decrement expected_count:", updateErr, { albumId });
  }
}

export async function POST(request: NextRequest) {
  // 1) Verify webhook headers and signature (fast — do before returning 200)
  const webhookId = request.headers.get("webhook-id") || "";
  const webhookTimestamp = request.headers.get("webhook-timestamp") || "";
  const webhookSignature = request.headers.get("webhook-signature") || "";

  if (!webhookId || !webhookTimestamp || !webhookSignature) {
    return NextResponse.json(
      { error: "Missing webhook headers" },
      { status: 400 }
    );
  }
  const headers: WebhookHeaders = {
    id: webhookId,
    timestamp: webhookTimestamp,
    signature: webhookSignature,
  };

  const body = (await request.json()) as PredictionWebhookBody;

  const valid = await verifyWebhookSignature(headers, body);
  if (!valid) {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 401 }
    );
  }

  // 2) Validate params (fast)
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const albumId = searchParams.get("albumId");
  if (!userId || !albumId) {
    return NextResponse.json(
      { error: "Missing params: userId, albumId" },
      { status: 400 }
    );
  }

  // Return 200 immediately so Replicate doesn't timeout/retry,
  // then do all heavy work (image fetch, storage upload, DB, RPC, email) in after()
  after(async () => {
    try {
      // Handle failed/canceled predictions with automatic retry
      if (body.status === "failed" || body.status === "canceled") {
        await handleFailedPrediction(body, userId, albumId, searchParams);
        return;
      }

      // Ignore non-terminal, non-succeeded statuses (starting, processing)
      if (body.status !== "succeeded") return;

      const predictionId = body.id;
      const outputs = normalizeOutputs(body.output);
      if (!predictionId || outputs.length === 0) return;

      // 3) Idempotent store each output image — track failures for recovery
      let storedCount = 0;
      const failedOutputs: Array<{ idx: number; url: string; error: string }> = [];

      for (let idx = 0; idx < outputs.length; idx++) {
        const url = outputs[idx];
        if (!url) continue;

        try {
          const stored = await storeOutputImage(url, idx, predictionId, userId, albumId);
          if (stored) {
            storedCount++;
          } else {
            failedOutputs.push({ idx, url, error: "Storage or DB operation failed after retries" });
          }
        } catch (e) {
          const errMsg = e instanceof Error ? e.message : String(e);
          console.error("prediction output store error", e, { url, idx });
          failedOutputs.push({ idx, url, error: errMsg });
        }
      }

      // 3b) For any failed outputs, re-fetch from Replicate API and try one final time
      if (failedOutputs.length > 0) {
        console.warn(`[webhooks/output] ${failedOutputs.length} output(s) failed, attempting re-fetch from Replicate API...`, { predictionId, albumId });

        const stillFailed: Array<{ idx: number; url: string; error: string }> = [];

        for (const failure of failedOutputs) {
          try {
            // Get fresh output URLs from Replicate API
            const prediction = await replicate.predictions.get(predictionId);
            const freshOutputs = normalizeOutputs(prediction.output as string[] | string | null);
            const freshUrl = freshOutputs[failure.idx];

            if (!freshUrl) {
              stillFailed.push({ ...failure, error: "No output URL returned from Replicate API re-fetch" });
              continue;
            }

            const stored = await storeOutputImage(freshUrl, failure.idx, predictionId, userId, albumId);
            if (stored) {
              storedCount++;
              console.log(`[webhooks/output] Re-fetch recovery succeeded for output ${failure.idx}`, { predictionId, albumId });
            } else {
              stillFailed.push({ ...failure, url: freshUrl, error: "Storage or DB still failed after Replicate re-fetch" });
            }
          } catch (retryErr) {
            const errMsg = retryErr instanceof Error ? retryErr.message : String(retryErr);
            console.error("Re-fetch recovery failed:", retryErr, { predictionId, idx: failure.idx });
            stillFailed.push({ ...failure, error: `Re-fetch recovery error: ${errMsg}` });
          }
        }

        // Send admin email for any outputs that still failed after re-fetch
        if (stillFailed.length > 0) {
          await sendStorageFailureEmail(predictionId, albumId, userId, stillFailed);
        }
      }

      // 4) Update album progress atomically; RPC will also claim email_sent
      //    Retry on transient network errors (Supabase returns error object instead of throwing)
      const { data: progressRows, error: rpcError } = await withTransientRetry(async () => {
        const result = await supabaseAdmin.rpc("update_album_progress", { in_album_id: albumId });
        if (result.error && (result.error.message?.includes('fetch failed') || result.error.message?.includes('ECONNRESET'))) {
          throw new Error(result.error.message);
        }
        return result;
      });

      if (rpcError) {
        console.error("update_album_progress RPC error", rpcError, { albumId });
      }

      const progress = Array.isArray(progressRows)
        ? (progressRows[0] as UpdateAlbumProgressRow)
        : (progressRows as UpdateAlbumProgressRow | null);

      // Send email exactly once when album becomes done
      if (progress?.email_just_marked) {
        try {
          await sendAlbumDoneEmail(albumId, userId);
          revalidateTag(CACHE_TAGS.userAlbums(userId));
        } catch (emailErr) {
          console.error("Failed to send completion email:", emailErr);
          // Revert email_sent to allow a retry later
          const { error: revertErr } = await supabaseAdmin
            .from("albums")
            .update({ email_sent: false })
            .eq("id", albumId)
            .eq("email_sent", true);

          revalidateTag(CACHE_TAGS.userAlbums(userId));

          if (revertErr) {
            console.error("Failed to revert email_sent flag:", revertErr, { albumId });
          }
        }
      }

      console.log(`[webhooks/output] prediction ${predictionId} stored=${storedCount} status=${progress?.album_status || "unknown"}`, { albumId });
    } catch (err) {
      // Top-level after() crash — send admin email so it's not silently lost
      console.error("prediction output webhook after() error", err);
      try {
        await sendStorageFailureEmail(body.id, albumId, userId, [{
          idx: 0,
          url: "N/A (top-level crash)",
          error: err instanceof Error ? err.message : String(err),
        }]);
      } catch (emailErr) {
        console.error("Failed to send admin alert for after() crash:", emailErr);
      }
    }
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

// -------- Store a single output image (used by main flow + re-fetch recovery) --------

async function storeOutputImage(
  url: string,
  idx: number,
  predictionId: string,
  userId: string,
  albumId: string
): Promise<boolean> {
  // Fetch image with retry on transient errors
  const res = await withTransientRetry(() => fetch(url).then(r => {
    if (!r.ok) throw new Error(`Fetch failed with status ${r.status}`);
    return r;
  }));

  const buffer = Buffer.from(await res.arrayBuffer());
  const meta = await sharp(buffer).metadata();

  // Deterministic path; upsert in storage to make retries safe
  const urlHash = sha256HexShort(url);
  const storagePath = `${userId}/${albumId}/${predictionId}/${idx}-${urlHash}.png`;

  // Retry storage upload on transient network errors (ECONNRESET, etc.)
  const { error: uploadError } = await withTransientRetry(async () => {
    const result = await supabaseAdmin.storage
      .from("output-images")
      .upload(storagePath, buffer, {
        contentType: "image/png",
        upsert: true,
      });
    if (result.error && (result.error.message?.includes('fetch failed') || result.error.message?.includes('ECONNRESET'))) {
      throw new Error(result.error.message);
    }
    return result;
  });
  if (uploadError) {
    console.error("Storage upload error:", uploadError, storagePath);
    return false;
  }

  // Upsert DB row idempotently on (prediction_id, output_index)
  const { error: dbError } = await withTransientRetry(async () => {
    const result = await supabaseAdmin
      .from("generated_images")
      .upsert(
        {
          album_id: albumId,
          storage_path: storagePath,
          width: meta.width || null,
          height: meta.height || null,
          prediction_id: predictionId,
          output_index: idx,
          url_hash: urlHash,
        },
        {
          onConflict: "prediction_id,output_index",
          ignoreDuplicates: true,
        }
      );
    if (result.error && (result.error.message?.includes('fetch failed') || result.error.message?.includes('ECONNRESET'))) {
      throw new Error(result.error.message);
    }
    return result;
  });
  if (dbError) {
    console.error("DB upsert error:", dbError, storagePath);
    return false;
  }

  return true;
}

// -------- Admin notification for storage/DB failures --------

async function sendStorageFailureEmail(
  predictionId: string,
  albumId: string,
  userId: string,
  failedOutputs: Array<{ idx: number; url: string; error: string }>
): Promise<void> {
  if (!resend) {
    console.error("RESEND_API_KEY missing; cannot send storage failure alert email.");
    return;
  }

  try {
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Headshots AI <no-reply@headshot.ai>";

    const failedRows = failedOutputs
      .map(
        (f) =>
          `<tr>
            <td style="padding:4px 12px 4px 0;">${f.idx}</td>
            <td style="padding:4px 12px 4px 0;word-break:break-all;max-width:300px;">${f.url}</td>
            <td style="padding:4px 0;">${f.error}</td>
          </tr>`
      )
      .join("");

    await resend.emails.send({
      from: fromEmail,
      to: "support@headshot.ai",
      subject: `[Alert] Failed to store ${failedOutputs.length} generated image(s) — action needed`,
      html: `
        <h2>Image Storage Failed</h2>
        <p>A prediction succeeded on Replicate but ${failedOutputs.length} output image(s) could not be stored after all retry attempts (including a re-fetch from the Replicate API).</p>
        <h3>Details</h3>
        <table style="border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Prediction ID</td><td style="padding:4px 0;">${predictionId}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Album ID</td><td style="padding:4px 0;">${albumId}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">User ID</td><td style="padding:4px 0;">${userId}</td></tr>
        </table>
        <h3>Failed Outputs</h3>
        <table style="border-collapse:collapse;margin:16px 0;width:100%;">
          <tr style="font-weight:bold;">
            <td style="padding:4px 12px 4px 0;">Index</td>
            <td style="padding:4px 12px 4px 0;">URL</td>
            <td style="padding:4px 0;">Error</td>
          </tr>
          ${failedRows}
        </table>
        <h3>How to recover manually</h3>
        <ol>
          <li>Fetch the prediction output: <code>replicate.predictions.get("${predictionId}")</code></li>
          <li>Download the image from the output URL</li>
          <li>Upload to Supabase storage bucket <code>output-images</code> at path <code>${userId}/${albumId}/${predictionId}/</code></li>
          <li>Insert a row in <code>generated_images</code> with the correct <code>album_id</code>, <code>storage_path</code>, <code>prediction_id</code>, and <code>output_index</code></li>
          <li>Call the <code>update_album_progress</code> RPC with <code>in_album_id = '${albumId}'</code></li>
        </ol>
      `,
    });

    console.log(`[webhooks/output] Admin alert email sent for ${failedOutputs.length} failed output(s)`, { predictionId, albumId });
  } catch (emailErr) {
    console.error("Failed to send storage failure admin email:", emailErr, { predictionId, albumId });
  }
}

// -------- Failed prediction handler (extracted for after() usage) --------

async function handleFailedPrediction(
  body: PredictionWebhookBody,
  userId: string,
  albumId: string,
  searchParams: URLSearchParams
): Promise<void> {
  const retryCount = parseInt(searchParams.get("retryCount") || "0", 10);

  if (retryCount < MAX_PREDICTION_RETRIES) {
    try {
      const original = await replicate.predictions.get(body.id);
      const version = original.version;
      const input = original.input as Record<string, unknown>;

      if (version && input) {
        const WEBHOOK_HOST = process.env.NGROK_HOST || process.env.NEXT_PUBLIC_SITE_URL;
        const modelId = searchParams.get("modelId");
        const newRetryCount = retryCount + 1;
        const outputWebhook =
          `${WEBHOOK_HOST}/api/webhooks/predictions/output` +
          `?userId=${encodeURIComponent(userId)}` +
          `&albumId=${encodeURIComponent(albumId)}` +
          `${modelId ? `&modelId=${encodeURIComponent(modelId)}` : ""}` +
          `&retryCount=${newRetryCount}`;

        await with429Retry(() =>
          replicate.predictions.create({
            version,
            input,
            webhook: outputWebhook,
            webhook_events_filter: ["completed"],
          })
        );

        console.log(
          `Retried failed prediction ${body.id} (attempt ${newRetryCount}/${MAX_PREDICTION_RETRIES})`,
          { albumId, status: body.status, error: body.error }
        );
        return;
      }

      console.error("Cannot retry: missing version or input from original prediction", {
        predictionId: body.id,
        albumId,
      });
    } catch (retryErr) {
      console.error("Failed to retry prediction:", retryErr, {
        predictionId: body.id,
        albumId,
        retryCount,
      });
    }
  }

  // Max retries exhausted (or retry itself failed) — permanent failure
  console.error(
    `Prediction ${body.id} permanently failed after ${retryCount + 1} attempt(s)`,
    { albumId, status: body.status, error: body.error }
  );

  await decrementExpectedCount(albumId);

  const { error: rpcError } = await supabaseAdmin.rpc(
    "update_album_progress",
    { in_album_id: albumId }
  );
  if (rpcError) {
    console.error("update_album_progress RPC error (after permanent failure)", rpcError, { albumId });
  }

  // Notify admin about the permanent failure
  if (resend) {
    try {
      const fromEmail =
        process.env.RESEND_FROM_EMAIL ||
        "Headshots AI <no-reply@headshot.ai>";

      await resend.emails.send({
        from: fromEmail,
        to: "support@headshot.ai",
        subject: `[Alert] Image generation failed for customer after ${retryCount + 1} attempts`,
        html: `
          <h2>Image Generation Permanently Failed</h2>
          <p>A prediction failed for a customer after exhausting all ${retryCount + 1} attempt(s) (max ${MAX_PREDICTION_RETRIES} retries).</p>
          <table style="border-collapse:collapse;margin:16px 0;">
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Prediction ID</td><td style="padding:4px 0;">${body.id}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Album ID</td><td style="padding:4px 0;">${albumId}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">User ID</td><td style="padding:4px 0;">${userId}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Status</td><td style="padding:4px 0;">${body.status}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Error</td><td style="padding:4px 0;">${body.error || "N/A"}</td></tr>
          </table>
          <p>The album's <code>expected_count</code> has been decremented so the album can still reach "done" status. The customer will receive one fewer image than originally planned.</p>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send admin failure notification email:", emailErr);
    }
  }
}