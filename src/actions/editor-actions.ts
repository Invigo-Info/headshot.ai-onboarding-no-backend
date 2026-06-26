"use server";

import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { CACHE_DURATIONS, CACHE_TAGS, getUserDataCacheConfig } from "@/lib/cache-config";

export interface EditorImage {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  created_at: string;
}

export interface RecentEdit {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  isEnhanced: boolean;
  created_at: string;
  path: string;
}

export interface RecentUpload {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  created_at: string;
  path: string;
}

export interface RecentAlbum {
  id: string;
  name: string;
  count: number;
  reviews?: number;
  url: string;
  alt: string;
  created_at: string;
}

// Get signed upload URL for editor images
export async function getEditorImageSignedUrl() {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    redirect("/login");
  }

  const supabaseAdmin = createAdminClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Generate unique file path with timestamp and user ID
  const uniqueFileName = `editor_${uuidv4()}.jpg`;
  const filePath = `${claims.sub}/${uniqueFileName}`;

  const { data: signedUrlData, error } = await supabaseAdmin.storage
    .from("recent-uploads")
    .createSignedUploadUrl(filePath);

  if (error) {
    throw new Error(error.message);
  }

  return {
    signedUrl: signedUrlData.signedUrl,
    filePath: filePath,
    userId: claims.sub,
  };
}

// Store uploaded image metadata in database
export async function storeEditorImageMetadata(
  filePath: string,
  width: number,
  height: number
): Promise<string> {
  const userSupabase = await createClient();
  const { data, error: authError } = await userSupabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    throw new Error("Unauthorized");
  }

  const supabase = createAdminClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: imageData, error } = await supabase
    .from("image_uplods_for_edit")
    .insert({
      user_id: claims.sub,
      storage_path: {
        path: filePath,
        width: width,
        height: height,
      },
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return imageData.id.toString();
}

// Get editor image by ID
export async function getEditorImageById(
  imageId: string,
  from: string
): Promise<EditorImage | null> {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    redirect("/login");
  }

  const supabaseAdmin = createAdminClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const table = from === "edits" ? "edited_images" : "image_uplods_for_edit";
  // const storageBucket = from === "edits" ? "edited-images" : "recent-uploads";
  try {
    const { data: image, error } = await supabaseAdmin
      .from(table)
      .select("*")
      .eq("id", imageId)
      .eq("user_id", claims.sub)
      .single();

    if (error || !image) {
      return null;
    }

    const storagePath = image.storage_path as {
      path: string;
      width?: number;
      height?: number;
    };

    // const { data: signedUrl } = await supabaseAdmin.storage
    //   .from(storageBucket)
    //   .createSignedUrl(storagePath.path, 60 * 60); // 1 hour expiry

    // if (!signedUrl?.signedUrl) {
    //   return null;
    // }

    return {
      id: image.id.toString(),
      url: storagePath.path,
      alt: `Editor image ${image.id}`,
      width: storagePath.width,
      height: storagePath.height,
      created_at: image.created_at,
    };
  } catch (error) {
    console.error("Error in getEditorImageById:", error);
    return null;
  }
}

// Get recent edits (from edited_images table)
export async function getRecentEdits(limit?: number): Promise<RecentEdit[]> {
  try {
    const supabase = await createClient();

    const { data, error: authError } = await supabase.auth.getClaims();
    const claims = data?.claims;

    if (authError || !claims) {
      console.warn("User not authenticated for recent edits");
      return [];
    }

    const supabaseAdmin = createAdminClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        global:{
          fetch: (url, options) => {
            return fetch(url, {
              ...options,
              ...getUserDataCacheConfig(
                claims.sub,
                [CACHE_TAGS.recentEdits(claims.sub)],
                CACHE_DURATIONS.EDITOR_DATA
              )
            })
          }
        }
      }
    )

    const { data: edits, error } = await supabaseAdmin
      .from("edited_images")
      .select("*")
      .eq("user_id", claims.sub)
      .order("created_at", { ascending: false })
      .limit(limit || 6);

    if (error || !edits) {
      console.warn("Error fetching recent edits:", error);
      return [];
    }

    const recentEdits: RecentEdit[] = [];

    for (const edit of edits) {
      const storagePath = edit.storage_path as { path: string };

      if (!storagePath?.path) continue;

      // const { data: signedUrl } = await supabaseAdmin.storage
      //   .from("edited-images")
      //   .createSignedUrl(storagePath.path, 60 * 60 * 24 * 24); // 1 day

      // if (signedUrl?.signedUrl) {
        recentEdits.push({
          id: edit.id.toString(),
          url: storagePath.path,
          width: edit.storage_path.width || 0,
          height: edit.storage_path.height || 0,
          alt: `Recent edit ${edit.id}`,
          isEnhanced: true,
          created_at: edit.created_at,
          path: storagePath.path,
        });
      // }
    }

    return recentEdits;
  } catch (error) {
    console.error("Error in getRecentEdits:", error);
    return [];
  }
}

// Get recent uploads (from image_uplods_for_edit table)
export async function getRecentUploads(limit?: number): Promise<RecentUpload[]> {
  try {
    const supabase = await createClient();

    const { data, error: authError } = await supabase.auth.getClaims();
    const claims = data?.claims;

    if (authError || !claims) {
      console.warn("User not authenticated for recent uploads");
      return [];
    }

    const supabaseAdmin = createAdminClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        global:{
          fetch: (url, options) => {
            return fetch(url, {
              ...options,
              ...getUserDataCacheConfig(
                claims.sub,
                [CACHE_TAGS.recentUploads(claims.sub)],
                CACHE_DURATIONS.USER_DATA_LONG
              )
            })
          }
        }
      }
    );

    const { data: uploads, error } = await supabaseAdmin
      .from("image_uplods_for_edit")
      .select("*")
      .eq("user_id", claims.sub)
      .order("created_at", { ascending: false })
      .limit(limit || 6);

    if (error || !uploads) {
      console.warn("Error fetching recent uploads:", error);
      return [];
    }

    const recentUploads: RecentUpload[] = [];

    for (const upload of uploads) {
      const storagePath = upload.storage_path as { path: string; width?: number; height?: number };

      if (!storagePath?.path) continue;

        recentUploads.push({
          id: upload.id.toString(),
          url: storagePath.path,
          width: storagePath.width || 0,
          height: storagePath.height || 0,
          alt: `Recent upload ${upload.id}`,
          created_at: upload.created_at,
          path: storagePath.path,
        });
    }

    return recentUploads;
  } catch (error) {
    console.error("Error in getRecentUploads:", error);
    return [];
  }
}

// delete edited image
export async function deleteEditedImage(imageId: string, path: string) {
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    throw new Error("Unauthorized");
  }
  try {
    const supabaseAdmin = createAdminClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabaseAdmin
      .from("edited_images")
      .delete()
      .eq("id", imageId)
      .eq("user_id", claims.sub);

    const { error: deleteError } = await supabaseAdmin.storage
      .from("edited-images")
      .remove([path]);

    if (deleteError) {
      console.error("Error in deleteEditedImage:", deleteError);
    }
    if (error) {
      throw new Error(error.message);
    }

    revalidateTag(CACHE_TAGS.recentEdits(claims.sub))

    return {success: true};
  } catch (error) {
    console.error("Error in deleteEditedImage:", error);
    return null;
  }
}



// revalidate client side uploads with delay
export async function revalidateClientSideUploadsDelayed(delayMs: number = 100) {
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    throw new Error("Unauthorized");
  }
  
  // Delay revalidation to ensure database transaction is fully committed
  await new Promise(resolve => setTimeout(resolve, delayMs));
  revalidateTag(CACHE_TAGS.recentUploads(claims.sub))
}

// Get current user ID
export async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createClient();
    const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    return null;
  }

  return claims.sub;
}

export async function deleteUploadedImage(imageId: string, path: string) {
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    throw new Error("Unauthorized");
  }
  try {
    const supabaseAdmin = createAdminClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabaseAdmin
      .from("image_uplods_for_edit")
      .delete()
      .eq("id", imageId)
      .eq("user_id", claims.sub);

    const { error: deleteError } = await supabaseAdmin.storage
      .from("recent-uploads")
      .remove([path]);

    if (deleteError) {
      console.error("Error in deleteUploadedImage:", deleteError);
    }
    if (error) {
      throw new Error(error.message);
    }

    revalidateTag(CACHE_TAGS.recentUploads(claims.sub))

    return {success: true};
  } catch (error) {
    console.error("Error in deleteUploadedImage:", error);
    return null;
  }
}

export interface EditorCredits {
  v: number;
  paid_editor_credit_balance: number;
  free_editor_credit_usage_date: string | null;
  free_editor_credit_used_count: number;
  paid_editor_credit_expires_on: string;
}

// Get editor credits for current user
export async function getEditorCredits(): Promise<EditorCredits | null> {
  try {
    const supabase = await createClient();

    const { data, error: authError } = await supabase.auth.getClaims();
    const claims = data?.claims;

    if (authError || !claims) {
      console.warn("User not authenticated for editor credits");
      return null;
    }

    const supabaseAdmin = createAdminClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("editor_credits")
      .eq("id", claims.sub)
      .single();

    if (error || !profile) {
      console.warn("Error fetching editor credits:", error);
      return null;
    }

    return profile.editor_credits as EditorCredits;
  } catch (error) {
    console.error("Error in getEditorCredits:", error);
    return null;
  }
}