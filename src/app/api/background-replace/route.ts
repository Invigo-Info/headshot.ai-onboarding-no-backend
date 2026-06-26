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

interface NanoBananaOutput {
  url(): string;
}

export async function POST(req: Request) {
  const { userImage, backgroundImage } = await req.json();

  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const supabaseAdmin = createAdminClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (!user?.sub) {
    throw new Error("User ID is required");
  }

  if (!userImage) {
    throw new Error("User image is required");
  }

  if (!backgroundImage) {
    throw new Error("Background image is required");
  }

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


  try {

    const { data: creditInfo, error: creditInfoError } = await supabase.rpc('get_editor_credit_info', {
      p_user_id: user?.sub,
      p_daily_free_limit: 2,
    });
    if (creditInfoError) throw creditInfoError;
    if (creditInfo?.[0]?.effective_available <= 0) {
      throw new Error("You have no credits left!");
    }
    // Prepare API input for background replacement using nano-banana
    const input = {
      prompt: `Use the first image as the subject and replace its background with the second image. Remove the original background and composite the subject into the new background with correct perspective and scale. Keep the subject's identity, clothing, pose, and expression unchanged. Ensure the background replacement looks natural and seamless by matching color grade, lighting, and perspective. Preserve fine hair details, add a soft contact shadow if appropriate, and maintain a clean, photorealistic headshot aesthetic.`,
      image_input: [userImageUrl, backgroundImage],
      aspect_ratio: "match_input_image",
      output_format: "png"
    };

    // Use replicate nano-banana for background replacement
    const output = (await replicate.run("google/nano-banana", { input })) as NanoBananaOutput;

    // Get the image URL and fetch the blob
    const imageUrl = output.url();
    const imageBlob = await fetch(imageUrl).then(res => res.blob());
    const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());

    const { width, height } = await sharp(imageBuffer).metadata();

    const imagePath = `${user?.sub}/edited_${uuidv4()}.png`;

    const { error } = await supabaseAdmin.storage
      .from("edited-images")
      .upload(imagePath, imageBuffer, {
        contentType: `image/png`,
      });

    if (error) throw error;

    const { error: error2 } = await supabaseAdmin.from("edited_images").insert({
      storage_path: {
        path: imagePath,
        width: width,
        height: height,
      },
      user_id: user?.sub || '',
      metadata: {
        tool: "background-replace",
        background_type: "image",
      }
    });

    if (error2) throw error2;

    // get signed url
    const { data } = await supabaseAdmin.storage
      .from("edited-images")
      .createSignedUrl(imagePath, 3600);

    // Delay revalidation to ensure database transaction is fully committed
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
    revalidateTag(CACHE_TAGS.recentEdits(user?.sub || ""));

        // let's deduct one credit
        await supabase.rpc('use_editor_credit', {
          p_user_id: user.sub,
          p_tool_name: 'background-replace',
          p_tool_cost: 1,
          p_daily_free_limit: 2,
        });

    return new Response(
      JSON.stringify({
        image: {
          url: data?.signedUrl,
          width: width,
          height: height,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while replacing background";
    console.error(error, errorMessage);

    return new Response(
      JSON.stringify({ error: "An unknown error occurred while replacing background" }),
      { status: 500 }
    );
  }
}
