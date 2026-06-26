"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Tables } from "@/types/database.types";
import { format } from "date-fns";
import { createClientWithOptions } from "@/lib/supabase/serverCached";

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
  photos: UploadImage[];
  status: string;
  created_at: string;
}

export interface Uploads {
  id: string;
  title: string;
  photoCount: number;
  coverImages: string[];
  status: string;
  created_at: string;
}

export async function getUserUploads(limit?: number): Promise<Uploads[]> {
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (authError || !user) {
    redirect("/login");
  }

  const supabaseCacheClient = await createClientWithOptions({
    cache: "force-cache",
    next: {
      tags: [`uploads-${user.sub}`],
      revalidate: 60 * 60 * 24 * 7, // 7 day
    },
  });

  try {
    // Get trainings with ready status
    const { data: trainings, error } = await supabaseCacheClient
      .from("trainings")
      .select("*")
      .eq("user_id", user.sub)
      .eq("status", "ready")
      .order("created_at", { ascending: false })
      .limit(limit || 6);

    if (error) {
      console.error("Error fetching uploads:", error);
      return [];
    }

    if (!trainings) return [];

    // Convert to our Upload interface format
    const formattedUploads: Uploads[] = [];

    for (const training of trainings as Tables<"trainings">[]) {
      const imageUrls: string[] = [];

      // Get signed URLs for all uploaded images
      if (
        training.uploaded_images &&
        Array.isArray(training.uploaded_images) &&
        training.uploaded_images.length > 0
      ) {
        const maxImages = Math.min(training.uploaded_images.length, 4);
        for (let i = 0; i < maxImages; i++) {
          const imagePath = training.uploaded_images[i];

          if (imagePath) {
            imageUrls.push(imagePath);
          }
        }
      }

      // Use first 4 images for cover
      const coverImages = imageUrls.slice(0, 4);

      formattedUploads.push({
        id: training.id,
        title: `Uploaded on ${format(new Date(training.created_at), "MMM dd, yyyy")}`,
        photoCount: training.uploaded_images?.length || 0,
        coverImages,
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
  const user = data?.claims;

  if (authError || !user) {
    redirect("/login");
  }

  try {
    // Get training with ready status
    const { data: training, error } = await supabase
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
    if (training.uploaded_images && Array.isArray(training.uploaded_images) && training.uploaded_images.length > 0) {
      for (let i = 0; i < training.uploaded_images.length; i++) {
        const imagePath = training.uploaded_images[i];

        if (imagePath) {
          photos.push({
            id: `${training.id}_${i}`,
            url: imagePath,
            alt: `Training image ${i + 1}`,
            created_at: training.created_at,
          });
        }
      }
    }

    return {
      id: training.id,
      title: `Training Model - ${format(new Date(training.created_at), "MMM dd, yyyy 'at' h:mm a")}`,
      photoCount: training.uploaded_images?.length || 0,
      photos,
      status: training.status,
      created_at: training.created_at,
    };
  } catch (error) {
    console.error("Error in getUploadById:", error);
    return null;
  }
}
