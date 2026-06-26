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
})

  // export const config = {
  //   maxDuration: 180, // 3 minutes
  // };

export const maxDuration = 180; // This function can run for a maximum of 180 seconds
interface ReplicateImageOutput {
  blob(): Promise<Blob>;
}

export async function POST(req: Request) {

    const { userImage } = await req.json();

    const supabase = await createClient()

    const { data } = await supabase.auth.getClaims();
    const user = data?.claims

  

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

  try {
    const { data: creditInfo, error: creditInfoError } = await supabase.rpc('get_editor_credit_info', {
      p_user_id: user?.sub,
      p_daily_free_limit: 2,
    });
    if (creditInfoError) throw creditInfoError;
    if (creditInfo?.[0]?.effective_available <= 0) {
      throw new Error("You have no credits left!");
    }
    // Prepare API input based on whether we're using text or image
    // Call fal API with the appropriate input
    const input = {
      input_image: userImageUrl,
      output_format: "png",
    };
    
    const result = (await replicate.run("flux-kontext-apps/restore-image", { input })) as ReplicateImageOutput;

    const imageBlob = await result.blob();
    const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());

    const { width, height } = await sharp(imageBuffer).metadata();


      const imagePath = `${user?.sub}/edited_${uuidv4()}.png`;


      const { error } = await supabaseAdmin.storage
    .from("edited-images")
    .upload(imagePath, imageBuffer, {
      contentType: `image/png`
    });

    if (error) throw error;
    
    const {error: error2} = await supabaseAdmin.from("edited_images").insert({
      storage_path: {
        path: imagePath,
        width: width,
        height: height,
      },
      user_id: user?.sub || '',
      metadata: {
        tool: "photo-restoration",
      }
    });

    if (error2) throw error2;

    // get signed url
    const { data } = await supabaseAdmin.storage
    .from("edited-images")
    .createSignedUrl(imagePath, 3600);

    // Delay revalidation to ensure database transaction is fully committed
    await new Promise(resolve => setTimeout(resolve, 100)) // 100ms delay
    revalidateTag(CACHE_TAGS.recentEdits(user?.sub || ""))

    // let's deduct one credit
    await supabase.rpc('use_editor_credit', {
      p_user_id: user?.sub,
      p_tool_name: 'photo-restoration',
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
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while generating the photo restoration";
    console.error(error, errorMessage);

    return new Response(
      JSON.stringify({ error: "An unknown error occurred while generating the photo restoration" }),
      { status: 500 }
    );
  }
}
