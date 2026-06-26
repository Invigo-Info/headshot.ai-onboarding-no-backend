import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import {
  selectPrompts,
  promptToText,
  type HeadshotPrompt,
} from "@/lib/headshot-prompts";
import {
  generateImageWithGemini,
  type GeneratedImage,
  type ReferenceImage,
} from "@/lib/gemini-image";

// Watermarked preview generation for the unlock step.
//
// Self-contained: takes the user's uploaded reference photos (base64 / data
// URLs) plus gender + attire + background, generates a small batch of headshots
// with Gemini, and returns them as data URLs. No Supabase / auth / payment —
// these are the free, watermarked previews shown before purchase.

export const maxDuration = 300;

// One headshot is generated per reference photo (1:1), capped for safety.
const MAX_REFERENCES = 10;
const CONCURRENCY = 3;
// All previews are normalised to a square 1024×1024 output.
const OUTPUT_SIZE = 1024;

interface PreviewRequest {
  gender?: string;
  attire?: string[];
  background?: string[];
  images?: string[]; // base64 or data URLs of the uploaded selfies
}

function parseImage(input: string): ReferenceImage {
  const match = /^data:(.+?);base64,([\s\S]*)$/.exec(input);
  if (match) {
    return { mimeType: match[1], data: match[2] };
  }
  // Bare base64 — assume JPEG.
  return { mimeType: "image/jpeg", data: input };
}

export async function POST(request: NextRequest) {
  let body: PreviewRequest;
  try {
    body = (await request.json()) as PreviewRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const gender = body.gender || "";
  const attire = Array.isArray(body.attire) ? body.attire : [];
  const background = Array.isArray(body.background) ? body.background : [];
  const rawImages = Array.isArray(body.images) ? body.images : [];

  if (rawImages.length === 0) {
    return NextResponse.json(
      { error: "No reference photos provided." },
      { status: 400 },
    );
  }

  const references = rawImages
    .slice(0, MAX_REFERENCES)
    .map(parseImage)
    .filter((r) => r.data);

  if (references.length === 0) {
    return NextResponse.json(
      { error: "Reference photos could not be read." },
      { status: 400 },
    );
  }

  // Prefer prompts matching the user's selections; fall back to any prompts for
  // the gender so a preview is always produced.
  let candidate = await selectPrompts(gender, { attire, background });
  if (candidate.length === 0) {
    candidate = await selectPrompts(gender, {});
  }
  if (candidate.length === 0) {
    return NextResponse.json(
      { error: `No prompts found for gender "${gender}".` },
      { status: 400 },
    );
  }

  // Group matching prompts by their attire×background combo (filename token 2 =
  // attire, token 3 = background) so we can guarantee every selected combo is
  // represented instead of letting the alphabetically-first combo dominate.
  const byCombo = new Map<string, HeadshotPrompt[]>();
  for (const p of candidate) {
    const parts = p.file.replace(/\.json$/, "").split("_");
    const key = `${parts[2]}|${parts[3]}`;
    const arr = byCombo.get(key) ?? [];
    arr.push(p);
    byCombo.set(key, arr);
  }

  // Selected dimensions (fall back to whatever the prompts offer if the user
  // didn't constrain a dimension).
  const attires = attire.length
    ? attire
    : [...new Set([...byCombo.keys()].map((k) => k.split("|")[0]))];
  const backgrounds = background.length
    ? background
    : [...new Set([...byCombo.keys()].map((k) => k.split("|")[1]))];

  // Build one job per selected combo, in attire→background order. Each job
  // carries SEVERAL candidate prompts for that combo so a transient failure on
  // the first prompt can fall back to the next (e.g. _001 → _002 → _003)
  // instead of dropping the whole combo.
  const MAX_PROMPTS_PER_COMBO = 3;
  const comboKeys: string[] = [];
  for (const a of attires) {
    for (const b of backgrounds) {
      if (byCombo.has(`${a}|${b}`)) comboKeys.push(`${a}|${b}`);
    }
  }

  type Job = { label: string; prompts: HeadshotPrompt[]; ref: ReferenceImage };
  const jobs: Job[] =
    comboKeys.length > 0
      ? comboKeys.map((key, i) => ({
          label: key,
          prompts: (byCombo.get(key) ?? []).slice(0, MAX_PROMPTS_PER_COMBO),
          ref: references[i % references.length],
        }))
      : // Fallback if combo grouping matched nothing (e.g. naming mismatch).
        candidate
          .slice(0, Math.max(references.length, 1))
          .map((p, i) => ({
            label: p.file,
            prompts: [p],
            ref: references[i % references.length],
          }));

  // Generate a single headshot from one reference + prompt, escalating through
  // fallback tiers. A reference can make the model silently decline
  // (IMAGE_OTHER), so we vary the request — modality, then a softened prompt.
  const generateOne = async (
    ref: ReferenceImage,
    data: Record<string, unknown>,
  ): Promise<GeneratedImage> => {
    const strict = promptToText(data);
    const soft = promptToText(data, { soften: true });
    const tiers: { text: string; modalities: ("TEXT" | "IMAGE")[] }[] = [
      { text: strict, modalities: ["IMAGE"] },
      { text: strict, modalities: ["TEXT", "IMAGE"] },
      { text: soft, modalities: ["TEXT", "IMAGE"] },
    ];

    let lastErr: unknown;
    for (const tier of tiers) {
      try {
        return await generateImageWithGemini([ref], tier.text, {
          modalities: tier.modalities,
        });
      } catch (e) {
        lastErr = e;
        await new Promise((r) => setTimeout(r, 400 + Math.random() * 400));
      }
    }
    throw lastErr instanceof Error ? lastErr : new Error("generation failed");
  };

  // Try each candidate prompt for a combo until one succeeds, then normalise the
  // output to an exact 1024×1024 square (face-aware crop). Falls back to the raw
  // image if the resize ever fails so a successful generation isn't lost.
  const generateForCombo = async (
    job: Job,
  ): Promise<{ image: string; file: string }> => {
    let lastErr: unknown;
    for (const p of job.prompts) {
      try {
        const img = await generateOne(job.ref, p.data);
        let outBuf = img.data;
        let mime = img.mimeType;
        try {
          outBuf = await sharp(img.data)
            .resize(OUTPUT_SIZE, OUTPUT_SIZE, {
              fit: "cover",
              // Gemini now returns a square frame, so this is usually a no-op
              // crop. If it ever returns a taller frame, bias the crop to the
              // TOP so the head/headroom is kept instead of being clipped.
              position: "top",
            })
            .png()
            .toBuffer();
          mime = "image/png";
        } catch (resizeErr) {
          console.warn("[preview] resize to 1024 failed, using raw", resizeErr);
        }
        return {
          image: `data:${mime};base64,${outBuf.toString("base64")}`,
          file: p.file,
        };
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr instanceof Error ? lastErr : new Error("combo failed");
  };

  // Results aligned to combo order (a fully-failed combo leaves a null hole).
  const results: ({ image: string; file: string } | null)[] = new Array(
    jobs.length,
  ).fill(null);
  const queue = jobs.map((job, index) => ({ job, index }));
  let firstError = "";
  let imageOtherFailures = 0;

  const worker = async () => {
    for (;;) {
      const next = queue.shift();
      if (!next) return;
      try {
        results[next.index] = await generateForCombo(next.job);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (!firstError) firstError = msg;
        if (msg.includes("IMAGE_OTHER")) imageOtherFailures++;
        console.error(
          `Preview generation failed for combo ${next.job.label}`,
          e,
        );
      }
    }
  };

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  const chosen = results.filter(
    (r): r is { image: string; file: string } => r !== null,
  );

  if (chosen.length === 0) {
    // Distinguish "Gemini won't render these faces" from a transient outage so
    // the user gets an action they can actually take. If most failures were a
    // bare IMAGE_OTHER, the photo itself is being declined.
    const declined = imageOtherFailures >= Math.max(1, jobs.length - 1);
    return NextResponse.json(
      {
        error: declined
          ? "We couldn't generate headshots from these photos. Please use clear, well-lit photos showing a single adult face, looking toward the camera, with no heavy filters."
          : "Generation failed. Please try again.",
        code: declined ? "PHOTOS_DECLINED" : "GENERATION_FAILED",
        detail: firstError || undefined,
      },
      { status: declined ? 422 : 502 },
    );
  }

  // Log exactly which prompt JSON files (one per attire×background combo)
  // produced the returned previews.
  console.log(
    `[preview] generated ${chosen.length} image(s) (1 per attire×background combo) from prompts:`,
    chosen.map((r) => r.file),
  );

  return NextResponse.json({
    images: chosen.map((r) => r.image),
    prompts: chosen.map((r) => r.file),
  });
}
