import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import Replicate from "replicate";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-config";

export const maxDuration = 180; // This function can run for a maximum of 180 seconds

// export const config = {
//   maxDuration: 180, // 3 minutes
// };

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN ?? "",
  useFileOutput: true,
});

interface NanoBananaOutput {
  url(): string;
}

export async function POST(req: Request) {
  const { userImage, backgroundColor } = await req.json();

  // Get authenticated user
  const userSupabase = await createServerClient();
  const { data, error: authError } = await userSupabase.auth.getClaims();
  const user = data?.claims

  if (authError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const supabase = createAdminClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let userImageUrl = userImage;

    if(userImage.includes("/api/image/")) {
      const [userImagePath, storageBucket] = userImage.split("/api/image/")[1].split("?from=");
    // let's get signed URL
    const { data: signedUrlData } = await supabase.storage
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
      p_user_id: user.sub,
      p_daily_free_limit: 2,
    });
  
    if (creditInfoError) throw creditInfoError;
    /*
    data = {
      paid_editor_credit_balance: number,
      paid_editor_credit_expires_on: string | null,
      free_remaining_today: number,
      effective_available: number
    }
    */
   if (creditInfo?.[0]?.effective_available <= 0) {
    throw new Error("You have no credits left");
   }

    // Prepare API input for background color change using nano-banana
    const input = {
      prompt: `Change the background of this image to a solid ${backgroundColor} color. Keep the person in the foreground exactly as they are - do not change their appearance, pose, clothing, or expression. Keep hair edges, flyaways, and soft transparency realistic. Only change the background behind them to be a clean, solid ${backgroundColor} color. Make the background look professional and well-lit with ample lighting on the person. Match rim lighting subtly to the new background; keep skin tones unchanged. Maintain the original crop and aspect ratio. Do not add patterns or gradients unless specified.`,
      image_input: [userImageUrl],
      output_format: "png"
    };

    // Use replicate nano-banana for background color change
    const output = (await replicate.run("google/nano-banana", { input })) as NanoBananaOutput;

    // Get the image URL and fetch the blob
    const imageUrl = output.url();
    const imageBlob = await fetch(imageUrl).then(res => res.blob());
    const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());

    const { width, height } = await sharp(imageBuffer).metadata();

    const imagePath = `${user.sub}/edited_${uuidv4()}.png`;
    const { error } = await supabase.storage
      .from("edited-images")
      .upload(imagePath, imageBuffer, {
        contentType: `image/png`,
      });
    if (error) throw error;

    const { error: error2 } = await supabase.from("edited_images").insert({
      storage_path: {
        path: imagePath,
        width: width,
        height: height,
      },
      user_id: user.sub,
      metadata: {
        tool: "background-color-changer",
        background_color: backgroundColor,
      },
    });
    if (error2) throw error2;

    // get signed url
    const { data } = await supabase.storage
      .from("edited-images")
      .createSignedUrl(imagePath, 3600);


    // let's deduct one credit
    await supabase.rpc('use_editor_credit', {
      p_user_id: user.sub,
      p_tool_name: 'background-color-changer',
      p_tool_cost: 1,
      p_daily_free_limit: 2,
    });

    revalidateTag(CACHE_TAGS.recentEdits(user?.sub || ""));
    

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
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occurred while changing the background color";
    console.error(error, errorMessage);

    return new Response(JSON.stringify({ error: "An unknown error occurred while changing the background color" }), {
      status: 500,
    });
  }
}
