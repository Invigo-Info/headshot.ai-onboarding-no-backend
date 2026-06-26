import { NextRequest, NextResponse, after } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-config";
import { selectPromptsForPlan } from "./helper";
import crypto from "crypto";
import { Resend } from "resend";
import HeadshotTrainingFailureEmail from "@/components/email-templates/training-failed";
import { siteMetaData } from "@/siteMetaData";

export const maxDuration = 600; // 5 minutes

interface WebhookHeaders {
  id: string;
  timestamp: string;
  signature: string;
}

interface TrainingResponse {
  id: string;
  status: string;
  completed_at?: string;
  error?: string | null;
  output?: {
    version: string;
    weights: string;
  } | null;
}

// interface ReplicateImageOutput {
// 	blob(): Promise<Blob>
// }

// Updated interface for new prompt structure
interface PackPrompts {
  [gender: string]:
    | {
        [attire: string]: {
          [background: string]: string[];
        };
      }
    | string[]; // Allow direct array of prompts for simplified structure
}

// Interface for user selection
interface UserSelection {
  attire?: string[]; // Made optional
  gender: string;
  background?: string[]; // Made optional
  selectedPlan: string;
  ageGroup?: string;
  bodyType?: string;
  ethnicity?: string;
  hairType?: string;
  hairColor?: string;
  hairLength?: string;
  filePath?: string;
  packSlug?: string;
  glassesPreference?: string;
}

// Initialize Supabase admin client
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Initialize Replicate
// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN ?? "",
//   useFileOutput: true,
// });

async function sendFailedTrainingEmail(userId: string, packSlug: string): Promise<void> {
  const resend =
  process.env.RESEND_API_KEY && new Resend(process.env.RESEND_API_KEY);

  if (!resend) {
    throw new Error("RESEND_API_KEY missing; cannot send failed training email.");
  }

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  // Get user profile to get full name
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", userId)
    .single<{ full_name: string | null, email: string | null }>();

  if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "not found"
    console.error("Error fetching profile for failed training email:", profileError);
  }

  const fullName = profile?.full_name || profile?.email?.split('@')[0] || ""; // fallback to email prefix

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ||
    "Headshots AI <no-reply@headshot.ai>";

  const link = `${siteMetaData.baseUrl}/generate/one-time/${packSlug}?step=gender`;

  await resend.emails.send({
    from: fromEmail,
    to: profile?.email || "",
    subject: "Oops! Your headshots couldn't be created!",
    react: HeadshotTrainingFailureEmail({ full_name: fullName, link }),
  });
}

async function cleanupReplicateResources(filePath: string, modelId: string) {
  try {
    // Delete the replicate file
    await supabaseAdmin.storage.from("zip-uploads").remove([filePath]);

    // Delete the model
    await fetch(
      `https://api.replicate.com/v1/models/${process.env.NEXT_PUBLIC_REPLICATE_USER_NAME}/${modelId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        },
      }
    );
  } catch (error) {
    console.error("Error cleaning up Replicate resources:", error);
  }
}

async function handleFailedTraining(
  modelId: string,
  albumId: string,
  orderId: string,
  filePath: string,
  packSlug: string,
  userId: string
) {
  try {
    // Update training status to failed
    await supabaseAdmin
      .from("trainings")
      .update({ status: "failed" })
      .eq("id", modelId);

    // Update album status to failed
    await supabaseAdmin
      .from("albums")
      .update({ status: "failed" })
      .eq("id", albumId);

    // Get uploaded image paths to delete them
    const { data: training } = await supabaseAdmin
      .from("trainings")
      .select("uploaded_images")
      .eq("id", modelId)
      .single();

    if (training?.uploaded_images) {
      // Delete uploaded images from storage
      const deletePromises = (training.uploaded_images as string[]).map(
        async (path) => {
          try {
            await supabaseAdmin.storage.from("user-uploads").remove([path]);
          } catch (error) {
            console.error(`Failed to delete image ${path}:`, error);
          }
        }
      );
      await Promise.all(deletePromises);
    }

    // Reset order to unused so user can try again
    await supabaseAdmin
      .from("orders")
      .update({ used: false })
      .eq("id", orderId);

    // Cleanup Replicate resources
    await cleanupReplicateResources(filePath, modelId);

    // send failed training email
    await sendFailedTrainingEmail(userId, packSlug);
    
  } catch (error) {
    console.error("Error handling failed training:", error);
  }
}

async function verifyWebhookSignature(
  headers: WebhookHeaders,
  body: TrainingResponse
): Promise<boolean> {
  const signedContent = `${headers.id}.${headers.timestamp}.${JSON.stringify(body)}`;
  const secret = process.env.REPLICATE_WEBHOOK_SECRET;

  if (!secret) return false;

  const secretBytes = Buffer.from(secret.split("_")[1], "base64");
  const signature = crypto
    .createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest("base64");

  const expectedSignatures = headers.signature
    .split(" ")
    .map((sig: string) => sig.split(",")[1]);
  return expectedSignatures.some(
    (expectedSignature) => expectedSignature === signature
  );
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxAttempts = Number(process.env.PREDICTION_CREATE_RETRY_ATTEMPTS ?? "3"),
  baseMs = Number(process.env.PREDICTION_CREATE_RETRY_BASE_MS ?? "300")
): Promise<Response> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url, options);
      // Success or non-retryable client error (4xx except 408/429)
      if (res.ok || (res.status >= 400 && res.status < 500
          && res.status !== 408 && res.status !== 429)) {
        return res;
      }
      // Retryable: 408, 429, 5xx — fall through to retry
      if (attempt === maxAttempts) return res;
    } catch (err) {
      // Network error — retry unless last attempt
      if (attempt === maxAttempts) throw err;
    }
    const jitter = Math.random() * 100;
    await new Promise(r => setTimeout(r, baseMs * Math.pow(2, attempt - 1) + jitter));
  }
  throw new Error("fetchWithRetry: unreachable");
}

export async function POST(request: NextRequest) {
  try {
    // Extract webhook headers
    const webhookId = request.headers.get("webhook-id");
    const webhookTimestamp = request.headers.get("webhook-timestamp");
    const webhookSignature = request.headers.get("webhook-signature");

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

    const body: TrainingResponse = await request.json();

    // Verify webhook signature
    const isValid = await verifyWebhookSignature(headers, body);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    // Extract URL parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const modelId = searchParams.get("modelId");
    const filePath = searchParams.get("filePath");
    const orderId = searchParams.get("orderId");
    const gender = searchParams.get("gender");
    const albumId = searchParams.get("albumId");
    const packSlug = searchParams.get("packSlug");

    if (
      !userId ||
      !modelId ||
      !filePath ||
      !orderId ||
      !gender ||
      !albumId ||
      !packSlug
    ) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    console.log("Webhook verified successfully for training:", {
      status: body.status,
      modelId,
      albumId,
    });

    // Process everything in the background using after()
    after(async () => {
      try {
        if (body.status === "succeeded" && body.output?.version) {
          // Training succeeded - generate images
          try {
            // Update training with model version
            await supabaseAdmin
              .from("trainings")
              .update({
                status: "ready",
                replicate_trained_model_version: body.output.version,
              })
              .eq("id", modelId);

            // Update album status to generating
            await supabaseAdmin
              .from("albums")
              .update({ status: "generating" })
              .eq("id", albumId);

            // Get pack to retrieve prompts and user selection from training
            const [packResult, trainingResult] = await Promise.all([
              supabaseAdmin
                .from("packs")
                .select("prompts")
                .eq("slug", packSlug)
                .single(),
              supabaseAdmin
                .from("trainings")
                .select("user_selection")
                .eq("id", modelId)
                .single(),
            ]);

            if (!packResult.data?.prompts) {
              throw new Error("Pack prompts not found");
            }

            if (!trainingResult.data?.user_selection) {
              throw new Error("User selection not found in training");
            }

            const userSelection = trainingResult.data
              .user_selection as UserSelection;

            // Select prompts based on user selection and plan
            const prompts = selectPromptsForPlan(
              packResult.data.prompts as PackPrompts,
              userSelection
            );

            console.log(
              "Selected prompts:",
              prompts.length,
              "prompts for plan:",
              userSelection.selectedPlan
            );

            // Fire-and-forget: send one request per prompt to predictions API
            const internalSecret =
              process.env.PREDICTIONS_INTERNAL_SECRET ||
              process.env.INTERNAL_WEBHOOK_SECRET;
            const predictionsUrl = `${
              process.env.NEXT_PUBLIC_SITE_URL || process.env.NGROK_HOST
            }/api/webhooks/predictions`;
            
            // Build prompt helper function
            const buildPrompt = (p: string, shouldAddGlasses: boolean) => {
              const descriptors: string[] = [];

              if (userSelection.ageGroup) {
                descriptors.push(`aged ${userSelection.ageGroup}`);
              }

              if (shouldAddGlasses && !/glasses/i.test(p)) {
                descriptors.push("wearing glasses");
              }

              if (userSelection.hairLength) {

                if (userSelection.hairLength === "bald") {
                  descriptors.push(`bald`);
                } else {
                  if (userSelection.hairType) {
                    descriptors.push(`with ${userSelection.hairType},`);
                  }

                  descriptors.push(`${userSelection.hairLength}-length`);
                  
                if (userSelection.hairColor) {
                  descriptors.push(`${userSelection.hairColor} hair`);
                }
                
                  
                }

              }

              if (userSelection.bodyType) {
                descriptors.push(`and a ${userSelection.bodyType} body type`);
              }

              if (!descriptors.length) {
                return p;
              }

              const descriptorString = descriptors.join(" ");
              const firstCommaIndex = p.indexOf(",");

              if (firstCommaIndex === -1) {
                return `${p}, ${descriptorString}`;
              }

              const before = p.slice(0, firstCommaIndex + 1);
              const after = p.slice(firstCommaIndex + 1).trimStart();

              return after.length
                ? `${before} ${descriptorString}, ${after}`
                : `${before} ${descriptorString}`;
            };

            const concurrency =
              Number(process.env.PREDICTION_FANOUT_CONCURRENCY ?? "8") || 10;
            const queue = [...prompts];
            let globalPromptIndex = 0; // Track global index across all batches
            let totalAccepted = 0;
            let totalFailed = 0;
            const failureReasons: string[] = [];

            while (queue.length) {
              const batch = queue.splice(0, concurrency);
              const results = await Promise.allSettled(
                batch.map((p, batchIndex) => {
                  // Calculate the true global index for this prompt
                  const currentGlobalIndex = globalPromptIndex + batchIndex;

                  // Determine if this prompt should include glasses
                  let shouldAddGlasses = false;
                  if (userSelection.glassesPreference === "with-glasses") {
                    shouldAddGlasses = true; // All prompts get glasses
                  } else if (userSelection.glassesPreference === "mix") {
                    shouldAddGlasses = currentGlobalIndex % 2 === 0; // Alternate: even indices get glasses
                  }
                  // else "without-glasses" or undefined: shouldAddGlasses remains false

                  return fetchWithRetry(predictionsUrl, {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                      authorization: `Bearer ${internalSecret}`,
                    },
                    body: JSON.stringify({
                      modelVersion: body.output?.version,
                      prompt: buildPrompt(p, shouldAddGlasses),
                      gender: userSelection.gender,
                      userId,
                      albumId,
                      modelId,
                    }),
                  });
                })
              );

              for (const result of results) {
                if (result.status === "rejected") {
                  totalFailed++;
                  if (failureReasons.length < 10) failureReasons.push(String(result.reason));
                } else if (!result.value.ok) {
                  totalFailed++;
                  if (failureReasons.length < 10)
                    failureReasons.push(`HTTP ${result.value.status} ${result.value.statusText}`);
                } else {
                  totalAccepted++;
                }
              }
              // Update global index for next batch
              globalPromptIndex += batch.length;
            }

            console.log("Fanout summary:", {
              modelId, albumId,
              planned: prompts.length, totalAccepted, totalFailed,
              sampleFailures: failureReasons,
            });

            // Handle zero-acceptance case
            if (totalAccepted === 0 && prompts.length > 0) {
              console.error("All prediction fanout requests failed", {
                modelId, albumId, failureReasons
              });
              await handleFailedTraining(modelId, albumId, orderId, filePath, packSlug, userId);
              return; // handleFailedTraining already cleans up
            }

            // Persist expected_count for deterministic album completion
            await supabaseAdmin
              .from("albums")
              .update({ expected_count: totalAccepted })
              .eq("id", albumId);

            // Cleanup uploaded zip now that training completed
            await supabaseAdmin.storage.from("zip-uploads").remove([filePath]);

            console.log("Training completed successfully: queued predictions", {
              modelId,
              planned: prompts.length,
              totalAccepted,
              totalFailed,
            });

          } catch (error) {
            console.error("Error processing successful training:", error);
            await handleFailedTraining(modelId, albumId, orderId, filePath, packSlug, userId);
          }
        } else {
          // Training failed, cancelled, or other non-success status
          console.log("Training failed:", {
            status: body.status,
            error: body.error,
          });
          await handleFailedTraining(modelId, albumId, orderId, filePath, packSlug, userId);
        }

        // Revalidate albums
        revalidateTag(CACHE_TAGS.userAlbums(userId));
      } catch (error) {
        console.error("Background processing error:", error);
      }
    });

    // Immediately return 200 response to Replicate
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
