"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { Tables } from "@/types/database.types";
import { v4 as uuidv4 } from "uuid";
import { revalidateTag } from "next/cache";
import { createClientWithOptions } from "@/lib/supabase/serverCached";
import { CACHE_DURATIONS, CACHE_TAGS, getUserDataCacheConfig } from "@/lib/cache-config";

// Define the expected structure of the analysis result
const ImageAnalysisSchema = z.object({
  isAccepted: z.boolean().describe("Whether the image meets the requirements."),
  reason: z
    .string()
    .nullable()
    .describe(
      "The reason for rejection if isAccepted is false, otherwise null."
    ),
});

// Type for the analysis result
export type ImageAnalysisResult = z.infer<typeof ImageAnalysisSchema>;

/**
 * Analyzes an image using Google Gemini via Vercel AI SDK.
 *
 * @param imageBase64 The base64 encoded string of the image data.
 * @returns An object containing the analysis result (isAccepted, reason).
 */
export async function analyzeImage(
  formData: FormData
): Promise<{ success: boolean; data?: ImageAnalysisResult; error?: string }> {
  // 

  const image = formData.get("image") as File;

  // Basic check for base64 string format (can be improved)
  if (!image || !image.type.startsWith("image/")) {
    return { success: false, error: "Invalid image data format." };
  }

  // Extract mime type and base64 data
  const mimeType = image.type;
  const imageData = await image.arrayBuffer();

  const apiKey = process.env.GEMINI_API_KEY;
  // No key configured → fail open silently (don't block uploads, don't spam).
  if (!apiKey) {
    return { success: true, data: { isAccepted: true, reason: null } };
  }

  const promptText = `Task: Evaluate this single image for inclusion in a Flux (fast-flux-trainer) headshot fine-tuning dataset.

Decision rule: ACCEPT by default. REJECT only for clear, hard failures listed below. Do not add extra criteria. If unsure, accept.

Hard-fail reasons (reject only if one applies):
1) No primary face
   - No human face visible, or face is fully cropped out.

2) Multiple people
   - More than one person is visible in the image, regardless of how prominent, small, or blurred they are.
   - This includes background people, partially visible people, and any other human presence beyond the primary subject.
   - Even if secondary people are far away, out of focus, or only partially in frame, the image must be rejected.

3) Face too small or lacks detail
   - The face region is so small/low-res that key features can’t be learned (e.g., heavy pixelation, tiny face in frame).

4) Severe blur/compression/noise
   - Strong motion blur, heavy JPEG/WebP artifacts, or noise that makes facial features indistinguishable at normal viewing.

5) Severe lighting
   - Exposure prevents seeing facial features (face mostly in deep shadow, blown out, or silhouetted).

6) Face occluded or sunglasses
   - Reject ANY sunglasses or tinted/dark glasses, even if the eyes are faintly visible through the lenses or the glasses are pushed up onto the forehead/hair. The eyes must be clearly visible with no tint over them.
   - Also reject: medical mask covering nose/mouth, hands/hair/objects blocking key facial landmarks.
   - Clear, untinted prescription eyeglasses are fine. Hats are fine unless they hide eyebrows/forehead or cast heavy shadow over eyes.

7) Extreme pose/angle
   - Back-of-head or turned so far that facial structure isn’t learnable.
   - Eye contact is NOT required.

8) Obvious AI or heavy edits
   - Clearly AI-generated/illustration, face-swap, or heavy beauty filters/AR stickers that distort facial geometry.
   - Mild color/contrast edits are fine.

9) Explicit/sexual content
   - Nudity or sexualized content. (Revealing/non-business clothing alone is NOT a rejection if the face is usable.)

10) Duplicate
   - Near-identical to another image in the current session (same pose/background/outfit). Use only if you have session context.

Notes to avoid over-rejection (Flux-specific):
- Variety helps Flux LoRA training: different settings, lighting, backgrounds, and expressions are good.
- The face does NOT need to fill most of the frame. If facial features are clear and reasonably sized, accept.
- Selfies, smartphone, or webcam images are acceptable if the face is clear. Do not reject based on camera type.
- Minor softness, mild noise, uneven lighting, or slight angle should be accepted.
- Aspect ratio does not matter; square is not required.
- Hands near the face are acceptable unless they obscure key facial features.

Determine if the image is accepted based *strictly* on these criteria. If rejected, provide a concise reason referencing the specific failed requirement (e.g., "Multiple people detected", "Face not prominent enough", "Hat/sunglasses detected", "Poor lighting/quality", "Unnatural angle", "Duplicate image", "Revealing clothing"). If accepted, the reason must be null.

Respond with ONLY a JSON object: {"isAccepted": boolean, "reason": string|null}.`;

  const model = process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash";

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: promptText },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: Buffer.from(imageData).toString("base64"),
                  },
                },
              ],
            },
          ],
          generationConfig: {
            // Low temperature → consistent enforcement of the reject rules
            // (e.g. sunglasses) instead of borderline cases slipping through.
            temperature: 0.1,
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                isAccepted: { type: "BOOLEAN" },
                reason: { type: "STRING", nullable: true },
              },
              required: ["isAccepted"],
            },
          },
        }),
      },
    );

    if (!res.ok) {
      throw new Error(`Gemini analyze failed (${res.status})`);
    }

    const json = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const parsed = ImageAnalysisSchema.parse(JSON.parse(text));
    return { success: true, data: parsed };
  } catch (error) {
    // Fail-closed: a photo we couldn't validate is NOT accepted, so it's never
    // used for generation. Returning success:false makes the client retry a few
    // times (absorbing transient rate-limit/network blips); if it still can't be
    // verified the photo ends up in the non-accepted "error" state.
    console.warn(
      "Image analysis failed; treating photo as not accepted:",
      error instanceof Error ? error.message : error,
    );
    return {
      success: false,
      error: "Could not verify this photo. Please try a different one.",
    };
  }
}

/*
OLD PROMPT:

 Analyze this image for use as a headshot profile photo for AI training. Requirements:
      1.  **Single Person:** Only one person should be clearly visible.
      2.  **Clear Face:** The face must be clearly visible, well-lit, and in focus.
      3.  **No Accessories on Face/Head:** No sunglasses, hats, excessive makeup, or face coverings. Regular glasses are okay.
      4.  **Good Quality:** The image should not be blurry, heavily pixelated, or have extreme filters applied.
      5.  **Frontal/Slight Angle:** The person should be mostly facing the camera (frontal or slight angle is acceptable, not a side profile).
      6. **Revealing Clothing:** The clothing should not be revealing.

      Determine if the image is accepted based *strictly* on these criteria. If rejected, provide a concise reason referencing the specific failed requirement (e.g., "Multiple people detected", "Face unclear or blurry", "Sunglasses detected", "Low image quality", "Side profile detected"). If accepted, the reason must be null.
                    
*/

export interface UploadImage {
  id: string;
  url: string;
  alt: string;
  created_at: string;
}

export interface Upload {
  id: string;
  title: string;
  photoCount: number;
  coverImages: string[];
  photos: UploadImage[];
  status: string;
  created_at: string;
}

export async function getUserUploads(): Promise<Upload[]> {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const user = data?.claims

  if (authError || !user) {
    redirect("/login");
  }

  const supabaseCacheClient = await createClientWithOptions(
    getUserDataCacheConfig(
      user?.sub || "",
      [CACHE_TAGS.userUploads(user?.sub || "")],
      CACHE_DURATIONS.USER_DATA_LONG
    )
  )

  try {
    // Get trainings with ready status
    const { data: trainings, error } = await supabaseCacheClient
      .from("trainings")
      .select("*")
      .eq("user_id", user?.sub)
      .eq("status", "ready")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching uploads:", error);
      return [];
    }

    if (!trainings) return [];

    // Convert to our Upload interface format
    const formattedUploads: Upload[] = [];

    for (const training of trainings as Tables<"trainings">[]) {
      const photos: UploadImage[] = [];
      const imageUrls: string[] = [];

      // Get signed URLs for all uploaded images
      if (training.uploaded_images && Array.isArray(training.uploaded_images)) {
        for (let i = 0; i < training.uploaded_images.length; i++) {
          const imagePath = training.uploaded_images[i];

          const { data: signedUrl } = await supabase.storage
            .from("user-uploads")
            .createSignedUrl(imagePath, 60 * 60); // 1 hour expiry

          if (signedUrl?.signedUrl) {
            imageUrls.push(signedUrl.signedUrl);
            photos.push({
              id: `${training.id}_${i}`, // Create unique ID
              url: signedUrl.signedUrl,
              alt: `Training image ${i + 1}`,
              created_at: training.created_at,
            });
          }
        }
      }

      // Use first 4 images for cover
      const coverImages = imageUrls.slice(0, 4);

      formattedUploads.push({
        id: training.id,
        title: `Training Model ${new Date(training.created_at).toLocaleDateString()}`,
        photoCount: training.uploaded_images?.length || 0,
        coverImages,
        photos,
        status: training.status,
        created_at: training.created_at,
      });
    }

    return formattedUploads;
  } catch (error) {
    console.error("Error in getUserUploads:", error);
    return [];
  }
}

export async function getUploadById(uploadId: string): Promise<Upload | null> {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const user = data?.claims

  if (authError || !user) {
    redirect("/login");
  }

  const supabaseCacheClient = await createClientWithOptions(
    getUserDataCacheConfig(
      user?.sub || "",
      [CACHE_TAGS.userUploads(user?.sub || ""), `upload-${uploadId}`],
      CACHE_DURATIONS.USER_DATA_LONG
    )
  );

  try {
    // Get training with ready status
    const { data: training, error } = await supabaseCacheClient
      .from("trainings")
      .select("*")
      .eq("id", uploadId)
      .eq("user_id", user.sub)
      .eq("status", "ready")
      .single();

    if (error || !training) {
      console.error("Error fetching upload:", error);
      return null;
    }

    const photos: UploadImage[] = [];

    // Get signed URLs for all uploaded images
    if (training.uploaded_images && Array.isArray(training.uploaded_images)) {
      for (let i = 0; i < training.uploaded_images.length; i++) {
        const imagePath = training.uploaded_images[i];

        const { data: signedUrl } = await supabase.storage
          .from("user-uploads")
          .createSignedUrl(imagePath, 60 * 60); // 1 hour expiry

        if (signedUrl?.signedUrl) {
          photos.push({
            id: `${training.id}_${i}`,
            url: signedUrl.signedUrl,
            alt: `Training image ${i + 1}`,
            created_at: training.created_at,
          });
        }
      }
    }

    // Use generated image URLs for cover
    const coverImages = photos.slice(0, 4).map((p) => p.url);

    return {
      id: training.id,
      title: `Training Model ${new Date(training.created_at).toLocaleDateString()}`,
      photoCount: training.uploaded_images?.length || 0,
      coverImages,
      photos,
      status: training.status,
      created_at: training.created_at,
    };
  } catch (error) {
    console.error("Error in getUploadById:", error);
    return null;
  }
}

export async function deleteUploadedImages(uploadId: string) {
  const supabase = await createClient();
  const supabaseAdmin = await createAdminClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error: authError } = await supabase.auth.getClaims();
  const user = data?.claims
  
  if (authError || !user) {
    redirect("/login");
  }

  try {
    // First, get the training record to access uploaded_images
    const { data: training, error: trainingError } = await supabaseAdmin
      .from('trainings')
      .select('id, uploaded_images, user_id')
      .eq('id', uploadId)
      .single();

    if (trainingError || !training) {
      console.error('Error fetching training:', trainingError);
      return { success: false, error: 'Training not found' };
    }

    // Delete files from storage bucket if there are uploaded images
    if (training.uploaded_images && Array.isArray(training.uploaded_images) && training.uploaded_images.length > 0) {
      const { error: storageError } = await supabaseAdmin.storage
        .from('user-uploads')
        .remove(training.uploaded_images);

      if (storageError) {
        console.error('Error deleting files from storage:', storageError);
        return { success: false, error: 'Failed to delete files from storage' };
      }

      // Clear the uploaded_images array in the training record
      const { error: updateError } = await supabaseAdmin
        .from('trainings')
        .update({ uploaded_images: [] })
        .eq('id', uploadId);

      if (updateError) {
        console.error('Error updating training record:', updateError);
        return { success: false, error: 'Failed to update training record' };
      }
    }

    revalidateTag(CACHE_TAGS.userUploads(user?.sub || ""));

    return { success: true };
  } catch (error) {
    console.error('Error in deleteUploadedImages:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getUploadSignedUrl() {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const user = data?.claims

  if (authError || !user) {
    redirect("/login");
  }

  const supabaseAdmin = await createAdminClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Generate unique file path with timestamp and user ID

  const uniqueFileName = `zip_upload_${uuidv4()}.zip`;
  const filePath = `${user.sub}/${uniqueFileName}`;

  const { data: signedUrlData, error } = await supabaseAdmin.storage
    .from("zip-uploads")
    .createSignedUploadUrl(filePath);

  if (error) {
    throw new Error(error.message);
  }

  return {
    signedUrl: signedUrlData.signedUrl,
    filePath: filePath,
  };
}
