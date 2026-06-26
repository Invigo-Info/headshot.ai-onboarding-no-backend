import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import Replicate from "replicate";
import JSZip from "jszip";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

async function prepareImageForAITraining(
  imageBuffer: Buffer
): Promise<Buffer> {
  try {
    // Key: We do NOT rotate the pixels
    // We ONLY strip/reset the orientation metadata
    const processedBuffer = await sharp(imageBuffer)
    .rotate()
      // Remove or reset orientation to 1 (normal)
      .withMetadata({ orientation: 1 })
      .jpeg({ quality: 95 }) // Optional: ensure consistent format
      .toBuffer();

    return processedBuffer;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}
import {
  TRAINING_STEPS,
  TRIGGER_WORD,
  TRAINING_RESOLUTION,
  TRAINING_MODEL,
  TRAINING_VERSION,
  TRAINING_VERSION_ID,
  LORA_TYPE,
} from "@/lib/constants";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-config";


export const maxDuration = 300; // 5 minutes

interface OrderWithJoins {
  id: string;
  pack_id: string;
  price_id: string;
  used: boolean;
  prices: {
    headshot_count: number;
    plan_name: string;
  };
  packs: {
    slug: string;
    title: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase client
    const supabase = await createClient();

    const supabaseAdmin = createAdminClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check user authentication
    const {
      data,
      error: authError,
    } = await supabase.auth.getClaims();
    const user = data?.claims

    if (authError || !user?.sub) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const userId = user.sub;

    // Check for unused orders with join to get headshot count
    const { data: ordersData, error: orderError } = await supabaseAdmin
      .from("orders")
      .select(
        `
				id,
				pack_id,
				price_id,
				used,
				prices!inner(
					headshot_count,
					plan_name
				),
				packs!inner(
					slug,
					title
				)
			`
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
        { status: 400 }
      );
    }

    const orders = ordersData as unknown as OrderWithJoins;

    // Parse form data
    const formData = await request.formData();
    const packSlug = (formData.get("packSlug") as string) || orders.packs.slug;

    // Extract user selection data
    const attireData = formData.get("attire") as string
    const backgroundData = formData.get("background") as string
    
    const userSelectionData = {
      gender: formData.get("gender") as string,
      ageGroup: formData.get("ageGroup") as string,
      hairColor: formData.get("hairColor") as string,
      hairLength: formData.get("hairLength") as string,
      hairType: formData.get("hairType") as string,
      ethnicity: formData.get("ethnicity") as string,
      bodyType: formData.get("bodyType") as string,
      // Handle optional attire and background - parse if provided, otherwise empty array
      attire: attireData ? JSON.parse(attireData) : [],
      background: backgroundData ? JSON.parse(backgroundData) : [],
      selectedPlan: formData.get("selectedPlan") as string,
      packSlug,
      filePath: formData.get("filePath") as string,
      glassesPreference: formData.get("glassesPreference") as string,
    };

    const zipFileUrl = await supabaseAdmin.storage
      .from("zip-uploads")
      .createSignedUrl(userSelectionData.filePath, 60 * 60 * 24 * 30)
      .then((res) => res.data?.signedUrl)
      .catch((error) => {
        console.error("Error getting zip file URL:", error);
        return null;
      });

    if (!zipFileUrl) {
      return NextResponse.json(
        { error: "There was an error uploading your images. Try generate headshots again." }, // zip upload failed
        { status: 400 }
      );
    }

    // Initialize Replicate
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN ?? "",
    });

    // Generate unique IDs
    const albumId = uuidv4();
    const modelId = uuidv4();
    const orderId = orders.id;

    const replicateDestination =
      `${process.env.NEXT_PUBLIC_REPLICATE_USER_NAME!}/${modelId}` as `${string}/${string}`;

    // Create model placeholder on Replicate
    await replicate.models.create(
      `${process.env.NEXT_PUBLIC_REPLICATE_USER_NAME!}`,
      modelId,
      {
        visibility: "private",
        hardware: "gpu-h100",
        description: `Training for album ${modelId}, User ${userId}, Style: ${packSlug}`,
      }
    );

    // Setup webhook URL
    const WEBHOOK_HOST =
      process.env.NGROK_HOST || process.env.NEXT_PUBLIC_SITE_URL;
    const webhookUrl = `${WEBHOOK_HOST}/api/webhooks/training/onetime?userId=${userId}&modelId=${modelId}&filePath=${userSelectionData.filePath}&orderId=${orderId}&gender=${userSelectionData.gender}&albumId=${albumId}&packSlug=${packSlug}`;

    console.log("webhookHost", WEBHOOK_HOST);
    console.log("webhookUrl", webhookUrl);

    // Process zip file and extract images
    const zipFileResponse = await fetch(zipFileUrl);
    const zipBuffer = await zipFileResponse.arrayBuffer();
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(zipBuffer);

    const newZip = new JSZip();
    const imageUploadPromises: Promise<string>[] = [];
    const supportedFormats = [".jpg", ".jpeg", ".png", ".webp"];

    // Process images in parallel
    const fileEntries = Object.entries(zipContent.files);
    await Promise.all(
      fileEntries.map(async ([filename, file]) => {
        if (
          !file.dir &&
          supportedFormats.some((format) =>
            filename.toLowerCase().endsWith(format)
          )
        ) {
          try {
            const fileBuffer = await file.async("nodebuffer");
            const processedBuffer = await prepareImageForAITraining(fileBuffer);

            // Use .jpg extension for consistency
            const nameWithoutExt =
              filename.substring(0, filename.lastIndexOf(".")) || filename;
            const newFilename = `${nameWithoutExt}.jpg`;

            // Add to new zip
            newZip.file(newFilename, processedBuffer);

            // Upload to Supabase (individual image)
            const imagePath = `${userId}/${modelId}/${uuidv4()}.jpg`;
            const uploadPromise = supabaseAdmin.storage
              .from("user-uploads")
              .upload(imagePath, processedBuffer, {
                contentType: "image/jpeg",
                upsert: false,
              })
              .then(({ error }) => {
                if (error) throw error;
                return imagePath;
              });

            imageUploadPromises.push(uploadPromise);
          } catch (err) {
            console.error(`Failed to process image ${filename}`, err);
          }
        }
      })
    );

    const imageCount = imageUploadPromises.length;
    const uploadedImagePaths = await Promise.all(imageUploadPromises);

    if (imageCount === 0) {
      return NextResponse.json(
        { error: "No valid images found in the zip file" },
        { status: 400 }
      );
    }

    // Generate new zip
    const newZipBuffer = await newZip.generateAsync({ type: "nodebuffer" });

    // Overwrite the existing zip file
    const { error: zipUploadError } = await supabaseAdmin.storage
      .from("zip-uploads")
      .upload(userSelectionData.filePath, newZipBuffer, {
        contentType: "application/zip",
        upsert: true,
      });

    if (zipUploadError) {
      throw new Error(
        `Failed to upload processed zip: ${zipUploadError.message}`
      );
    }

    // Start training
    const training = await replicate.trainings.create(
      TRAINING_MODEL,
      TRAINING_VERSION,
      TRAINING_VERSION_ID,
      {
        destination: replicateDestination,
        input: {
          input_images: zipFileUrl,
          steps: imageCount > 10 ? TRAINING_STEPS : 1000,
          resolution: TRAINING_RESOLUTION,
          trigger_word: TRIGGER_WORD,
          lora_type: LORA_TYPE,
        },
        webhook: webhookUrl,
        webhook_events_filter: ["completed"],
      }
    );

    // Insert training record
    const { error: trainingError } = await supabase.from("trainings").insert({
      id: modelId,
      user_id: userId,
      replicate_training_id: training.id,
      status: "processing",
      uploaded_images: uploadedImagePaths,
      user_selection: userSelectionData,
    });

    if (trainingError) {
      throw new Error(
        `Failed to create training record: ${trainingError.message}`
      );
    }

    // Get pack ID from packs table using pack-slug
    let packId = orders.pack_id; // Default fallback to orders pack_id
    
    const { data: packData, error: packError } = await supabaseAdmin
      .from("packs")
      .select("id")
      .eq("slug", packSlug)
      .single();
    
    // Use pack ID from packs table if available, otherwise use orders pack_id
    if (!packError && packData?.id) {
      packId = packData.id;
    }

    // Insert album record
    const { error: albumError } = await supabase.from("albums").insert({
      id: albumId,
      user_id: userId,
      pack_id: packId,
      training_id: modelId,
      status: "training",
      price_id: orders.price_id,
    });

    if (albumError) {
      throw new Error(`Failed to create album record: ${albumError.message}`);
    }

    // Mark order as used
    const { error: updateOrderError } = await supabaseAdmin
      .from("orders")
      .update({ used: true })
      .eq("id", orderId);

    if (updateOrderError) {
      throw new Error(
        `Failed to mark order as used: ${updateOrderError.message}`
      );
    }

    revalidateTag(CACHE_TAGS.userAlbums(userId));

    return NextResponse.json({
      success: true,
      data: {
        trainingId: training.id,
        status: training.status,
        packTitle: orders.packs.title,
      },
    });
  } catch (error) {
    console.error("Training creation error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to start training",
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
