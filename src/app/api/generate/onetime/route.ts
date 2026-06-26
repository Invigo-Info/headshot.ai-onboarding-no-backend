import { NextRequest, NextResponse, after } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import JSZip from "jszip";
import sharp from "sharp";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-config";
import { selectPrompts, promptToText } from "@/lib/headshot-prompts";
import {
  generateImageWithGeminiRetry,
  type ReferenceImage,
} from "@/lib/gemini-image";

// Gemini-based headshot generation. Drop-in replacement for the Replicate
// training + prediction-webhook chain (/api/training/onetime): instead of
// training a LoRA and fanning out predictions, we generate every gender prompt
// directly from the uploaded reference photos with Gemini and persist the
// results into the same albums / generated_images / output-images shape so the
// existing dashboard display keeps working.

export const maxDuration = 300;

const MAX_REFERENCE_IMAGES = 4; // reference photos sent to Gemini per generation
const GEN_CONCURRENCY = 4; // parallel Gemini calls
const SUPPORTED = /\.(jpe?g|png|webp)$/i;

interface OrderWithJoins {
  id: string;
  pack_id: string;
  price_id: string;
  used: boolean;
  prices: { headshot_count: number; plan_name: string };
  packs: { slug: string; title: string };
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const admin = createAdminClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data: claims } = await supabase.auth.getClaims();
    const user = claims?.claims;
    if (!user?.sub) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }
    const userId = user.sub;

    // Require an unused paid order (same gate as the Replicate flow).
    const { data: ordersData, error: orderError } = await admin
      .from("orders")
      .select(
        `id, pack_id, price_id, used,
         prices!inner(headshot_count, plan_name),
         packs!inner(slug, title)`,
      )
      .eq("user_id", userId)
      .eq("status", "paid")
      .eq("used", false)
      .limit(1)
      .single();

    if (orderError || !ordersData) {
      return NextResponse.json(
        {
          error:
            "No valid unused orders found. Please purchase a headshot pack first.",
        },
        { status: 400 },
      );
    }
    const order = ordersData as unknown as OrderWithJoins;

    const formData = await request.formData();
    const gender = (formData.get("gender") as string) || "";
    const packSlug = (formData.get("packSlug") as string) || order.packs.slug;
    const filePath = formData.get("filePath") as string;
    const selectedPlan = (formData.get("selectedPlan") as string) || "";

    // review-step sends attire/background as JSON-encoded string arrays.
    const parseList = (raw: FormDataEntryValue | null): string[] => {
      if (typeof raw !== "string" || !raw) return [];
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.map(String) : [];
      } catch {
        return [];
      }
    };
    const attire = parseList(formData.get("attire"));
    const background = parseList(formData.get("background"));

    if (!filePath) {
      return NextResponse.json(
        { error: "Missing uploaded images. Please upload your photos again." },
        { status: 400 },
      );
    }

    // Resolve pack id for the album.
    let packId = order.pack_id;
    const { data: packData } = await admin
      .from("packs")
      .select("id")
      .eq("slug", packSlug)
      .single();
    if (packData?.id) packId = packData.id;

    // Select prompts matching the chosen gender + attire + background.
    const prompts = await selectPrompts(gender, { attire, background });
    if (prompts.length === 0) {
      return NextResponse.json(
        {
          error: `No prompts found for the selected gender/attire/background combination.`,
        },
        { status: 400 },
      );
    }

    const trainingId = uuidv4();
    const albumId = uuidv4();

    // Create the training + album records up front so the client can navigate
    // to the dashboard and watch images appear while generation runs.
    await admin.from("trainings").insert({
      id: trainingId,
      user_id: userId,
      replicate_training_id: `gemini-${trainingId}`,
      status: "ready",
      uploaded_images: [],
      user_selection: { gender, selectedPlan, packSlug, attire, background },
    });

    await admin.from("albums").insert({
      id: albumId,
      user_id: userId,
      pack_id: packId,
      training_id: trainingId,
      status: "generating",
      price_id: order.price_id,
      generated_count: 0,
    });

    // Consume the order (parity with the Replicate flow).
    await admin.from("orders").update({ used: true }).eq("id", order.id);
    revalidateTag(CACHE_TAGS.userAlbums(userId));

    // Heavy work runs after the response so the request returns quickly.
    after(async () => {
      const failAlbum = async (reason: string) => {
        console.error(`[generate/onetime] album ${albumId} failed: ${reason}`);
        await admin.from("albums").update({ status: "failed" }).eq("id", albumId);
        revalidateTag(CACHE_TAGS.userAlbums(userId));
      };

      try {
        // 1) Download the uploaded zip and extract reference photos.
        const { data: signed } = await admin.storage
          .from("zip-uploads")
          .createSignedUrl(filePath, 60 * 60);
        if (!signed?.signedUrl) {
          await failAlbum("zip signed URL failed");
          return;
        }

        const zipBuffer = await fetch(signed.signedUrl).then((r) =>
          r.arrayBuffer(),
        );
        const zip = await JSZip.loadAsync(zipBuffer);

        const references: ReferenceImage[] = [];
        for (const [name, entry] of Object.entries(zip.files)) {
          if (entry.dir || !SUPPORTED.test(name)) continue;
          try {
            const raw = await entry.async("nodebuffer");
            const jpg = await sharp(raw)
              .rotate()
              .withMetadata({ orientation: 1 })
              .jpeg({ quality: 92 })
              .toBuffer();
            references.push({ data: jpg, mimeType: "image/jpeg" });
          } catch (e) {
            console.error(`Failed to prepare reference ${name}`, e);
          }
        }

        if (references.length === 0) {
          await failAlbum("no reference images");
          return;
        }
        const refs = references.slice(0, MAX_REFERENCE_IMAGES);

        // 2) Generate every prompt with bounded concurrency, persisting as we go.
        let stored = 0;
        const queue = [...prompts];

        const worker = async () => {
          for (;;) {
            const prompt = queue.shift();
            if (!prompt) return;
            try {
              const text = promptToText(prompt.data);
              const img = await generateImageWithGeminiRetry(refs, text);
              const png =
                img.mimeType === "image/png"
                  ? img.data
                  : await sharp(img.data).png().toBuffer();
              const meta = await sharp(png).metadata();

              const storagePath = `${userId}/${albumId}/${uuidv4()}.png`;
              const { error: upErr } = await admin.storage
                .from("output-images")
                .upload(storagePath, png, {
                  contentType: "image/png",
                  upsert: true,
                });
              if (upErr) {
                console.error("output-images upload failed", upErr, prompt.file);
                continue;
              }

              const { error: dbErr } = await admin
                .from("generated_images")
                .insert({
                  album_id: albumId,
                  storage_path: storagePath,
                  width: meta.width ?? null,
                  height: meta.height ?? null,
                  prediction_id: uuidv4(),
                  output_index: 0,
                  url_hash: crypto
                    .createHash("sha256")
                    .update(storagePath)
                    .digest("hex")
                    .slice(0, 16),
                });
              if (dbErr) {
                console.error("generated_images insert failed", dbErr);
                continue;
              }

              stored++;
              if (stored % 5 === 0) {
                await admin
                  .from("albums")
                  .update({ generated_count: stored })
                  .eq("id", albumId);
                revalidateTag(CACHE_TAGS.userAlbums(userId));
              }
            } catch (e) {
              console.error(`Gemini generation failed for ${prompt.file}`, e);
            }
          }
        };

        await Promise.all(
          Array.from({ length: GEN_CONCURRENCY }, () => worker()),
        );

        // 3) Finalize the album.
        await admin
          .from("albums")
          .update({
            status: stored > 0 ? "done" : "failed",
            generated_count: stored,
          })
          .eq("id", albumId);
        revalidateTag(CACHE_TAGS.userAlbums(userId));

        console.log(
          `[generate/onetime] album ${albumId} finished: ${stored}/${prompts.length} stored`,
        );
      } catch (err) {
        console.error("[generate/onetime] background generation crashed", err);
        await failAlbum("background crash");
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        albumId,
        total: prompts.length,
        packTitle: order.packs.title,
      },
    });
  } catch (error) {
    console.error("Gemini generation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to start generation",
      },
      { status: 500 },
    );
  }
}
