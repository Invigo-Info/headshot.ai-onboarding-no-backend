import { createClient as createAdminClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { createClient } from "@/lib/supabase/server";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-config";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN ?? "",
  useFileOutput: true,
});

export const maxDuration = 180; // This function can run for a maximum of 180 seconds

interface ReplicateImageOutput {
  url(): string;
}

export async function POST(req: Request) {
  const data = await req.formData();
  const userImage = data.get("userImage") as string;
  const userId = data.get("userId") as string;
  const maskImageFile = data.get("maskImageFile") as File;

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getClaims();
  const user = userData?.claims;

  const supabaseAdmin = createAdminClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let userImageUrl = userImage;

  if(userImage.includes("/api/image/")) {
    const [userImagePath, storageBucket] = userImage.split("/api/image/")[1].split("?from=");
  // let's get signed URL
  const { data: signedUrlData } = await supabaseAdmin.storage
    .from(storageBucket || "recent-uploads")
    .createSignedUrl(userImagePath, 3600); // 1 hour expiration
  if (!signedUrlData?.signedUrl) {
    throw new Error("Failed to generate signed URL for image");
  }
  userImageUrl = signedUrlData.signedUrl;
  }

 if(!userImageUrl) {
  throw new Error("Failed to get signed URL for image");
 }

  let tempMaskPath: string | null = null;

  try {
    const { data: creditInfo, error: creditInfoError } = await supabase.rpc('get_editor_credit_info', {
      p_user_id: user?.sub,
      p_daily_free_limit: 2,
    });
    if (creditInfoError) throw creditInfoError;
    if (creditInfo?.[0]?.effective_available <= 0) {
      throw new Error("You have no credits left!");
    }
    // Upload mask image to temporary storage
    const maskBuffer = Buffer.from(await maskImageFile.arrayBuffer());
    tempMaskPath = `${userId}/temp_mask_${uuidv4()}.png`;

    const { error: maskUploadError } = await supabaseAdmin.storage
      .from("edited-images")
      .upload(tempMaskPath, maskBuffer, {
        contentType: "image/png",
      });

    if (maskUploadError) throw maskUploadError;

    // Get signed URL for the mask (since bucket is private)
    const { data: maskUrlData } = await supabaseAdmin.storage
      .from("edited-images")
      .createSignedUrl(tempMaskPath, 3600); // 1 hour expiration

    if (!maskUrlData?.signedUrl) {
      throw new Error("Failed to generate signed URL for mask");
    }

    // Prepare replicate input
    const input = {
      mask: maskUrlData.signedUrl,
      sync: true,
      image: userImageUrl,
      mask_type: "manual" as const,
      preserve_alpha: true,
      content_moderation: false,
    };

    // Call replicate API
    const result = (await replicate.run("bria/eraser", { input })) as ReplicateImageOutput;

    // Get the result image
    const imageUrl = result.url();
    const response = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await response.arrayBuffer());

    const { width, height } = await sharp(imageBuffer).metadata();

    // Save the final image
    const imagePath = `${userId}/edited_${uuidv4()}.png`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from("edited-images")
      .upload(imagePath, imageBuffer, {
        contentType: "image/png",
      });

    if (uploadError) throw uploadError;

    // Insert into database
    const { error: dbError } = await supabaseAdmin.from("edited_images").insert({
      storage_path: {
        path: imagePath,
        width: width,
        height: height,
      },
      user_id: userId,
      metadata: {
        tool: "magic-eraser",
      }
    });

    if (dbError) throw dbError;

    // Get signed URL for the final image
    const { data: signedUrlData } = await supabaseAdmin.storage
      .from("edited-images")
      .createSignedUrl(imagePath, 3600);

    // Clean up temporary mask
    if (tempMaskPath) {
      await supabaseAdmin.storage
        .from("edited-images")
        .remove([tempMaskPath]);
    }

    // Delay revalidation to ensure database transaction is fully committed
    await new Promise(resolve => setTimeout(resolve, 100));
    revalidateTag(CACHE_TAGS.recentEdits(user?.sub || ""));

    // let's deduct one credit
    await supabase.rpc('use_editor_credit', {
      p_user_id: user?.sub,
      p_tool_name: 'magic-eraser',
      p_tool_cost: 1,
      p_daily_free_limit: 2,
    });

    return new Response(
      JSON.stringify({
        image: {
          url: signedUrlData?.signedUrl,
          width: width,
          height: height,
        },
      }),
      { status: 200 }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while processing magic eraser";
    console.error(error, errorMessage);

    // Clean up temporary mask on error
    if (tempMaskPath) {
      try {
        await supabaseAdmin.storage
          .from("edited-images")
          .remove([tempMaskPath]);
      } catch (cleanupError) {
        console.error("Error cleaning up temporary mask:", cleanupError);
      }
    }

    return new Response(
      JSON.stringify({ error: "An unknown error occurred while processing magic eraser request" }),
      { status: 500 }
    );
  }
}
