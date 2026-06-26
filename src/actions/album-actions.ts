"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Tables } from "@/types/database.types";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClientWithOptions } from "@/lib/supabase/serverCached";
import { CACHE_DURATIONS, CACHE_TAGS, getUserDataCacheConfig } from "@/lib/cache-config";
import { revalidateTag } from "next/cache";

export interface AlbumWithPack extends Tables<"albums"> {
  pack: Tables<"packs">;
  generated_images: Tables<"generated_images">[];
}

export interface AlbumImage {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  created_at: string;
  favourite: boolean;
  edited: boolean;
}

export interface Album {
  id: string;
  title: string;
  description?: string;
  photoCount: number;
  photos?: AlbumImage[];
  coverImages: string[];
  status: string;
  created_at: string;
  training_id: string;
}

export interface AlbumProgress {
  id: string;
  status: "generating" | "done" | "failed" | "training";
  currentImageCount: number;
  maxImages: number;
  packTitle: string;
  photos: AlbumImage[];
}

export async function getUserAlbums(): Promise<Album[]> {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    redirect("/login");
  }

  const supabaseCacheClient = await createClientWithOptions(
    getUserDataCacheConfig(
      claims.sub,
      [CACHE_TAGS.userAlbums(claims.sub)],
      CACHE_DURATIONS.USER_DATA_LONG
    )
  );

  try {
    // Get albums with pack info and generated images
    const { data: albums, error } = await supabaseCacheClient
      .from("albums")
      .select(
        `
        *,
        pack:packs(*),
        generated_images(*)
      `
      )
      .eq("user_id", claims.sub)
      .in("status", ["done", "training", "generating"])
      .order("created_at", { ascending: false })
      .order("created_at", { referencedTable: "generated_images" }) // order nested images
      .limit(5, { referencedTable: "generated_images" }); // limit nested images
    if (error) {
      console.error("Error fetching albums:", error);
      return [];
    }

    if (!albums) return [];

    // Convert to our Album interface format
    const formattedAlbums: Album[] = [];

    for (const album of albums as AlbumWithPack[]) {
      const imageUrls: string[] = [];
      // Get signed URLs for all images
      for (const image of album.generated_images) {
        imageUrls.push(image.storage_path);
        // photos.push({
        //   id: image.id,
        //   url: image.storage_path,
        //   alt: `${album.pack.title} photo`,
        //   width: image.width || undefined,
        //   height: image.height || undefined,
        //   created_at: image.created_at,
        //   favourite: image.favourite || false,
        //   edited: image.edited || false,
        // });
        // const { data: signedUrl } = await supabase.storage
        //   .from("output-images")
        //   .createSignedUrl(image.storage_path, 60 * 60); // 1 hour expiry

        // if (signedUrl?.signedUrl) {
        //   imageUrls.push(signedUrl.signedUrl);
        //   photos.push({
        //     id: image.id,
        //     url: signedUrl.signedUrl,
        //     alt: `${album.pack.title} photo`,
        //     width: image.width || undefined,
        //     height: image.height || undefined,
        //     created_at: image.created_at,
        //     favourite: image.favourite || false,
        //     edited: image.edited || false,
        //   });
        // }
      }

      // Use only generated images for cover
      const coverImages = imageUrls.slice(0, 4);

      formattedAlbums.push({
        id: album.id,
        title: album.pack.title,
        description: album.pack.description || undefined,
        photoCount: album.generated_count || 0,
        coverImages,
        status: album.status,
        created_at: album.created_at,
        training_id: album.training_id,
      });
    }

    return formattedAlbums;
  } catch (error) {
    console.error("Error in getUserAlbums:", error);
    return [];
  }
}

export async function getAlbumById(albumId: string): Promise<Album | null> {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    redirect("/login");
  }
  const supabaseCacheClient = await createClientWithOptions(
    getUserDataCacheConfig(
      claims.sub,
      [CACHE_TAGS.userAlbums(claims.sub), `album-${albumId}`],
      CACHE_DURATIONS.USER_DATA_MEDIUM
    )
  );

  try {
    // Get album with pack info and generated images
    const { data: album, error } = await supabaseCacheClient
      .from("albums")
      .select(
        `
        *,
        pack:packs(*),
        generated_images(*)
      `
      )
      .eq("id", albumId)
      .eq("user_id", claims.sub)
      .single();

    if (error || !album) {
      console.error("Error fetching album:", error);
      return null;
    }

    const albumData = album as AlbumWithPack;

    const photos: AlbumImage[] = [];

    // Get signed URLs for all images
    for (const image of albumData.generated_images) {

        photos.push({
          id: image.id,
          url: image.storage_path,
          alt: `${albumData.pack.title} photo`,
          width: image.width || undefined,
          height: image.height || undefined,
          created_at: image.created_at,
          favourite: image.favourite || false,
          edited: image.edited || false,
        });
    }

    // Use only generated image URLs for cover
    const coverImages = photos.slice(0, 4).map((p) => p.url);

    return {
      id: albumData.id,
      title: albumData.pack.title,
      description: albumData.pack.description || undefined,
      photoCount: albumData.generated_images.length,
      coverImages,
      photos,
      status: albumData.status,
      created_at: albumData.created_at,
      training_id: albumData.training_id,
    };
  } catch (error) {
    console.error("Error in getAlbumById:", error);
    return null;
  }
}

export async function downloadImage(
  imageId: string,
  albumId: string
): Promise<string | null> {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    redirect("/login");
  }

  try {
    // Verify user owns this album
    const { data: album, error: albumError } = await supabase
      .from("albums")
      .select("id")
      .eq("id", albumId)
      .eq("user_id", claims.sub)
      .single();

    if (albumError || !album) {
      throw new Error("Album not found or access denied");
    }

    // Get the image
    const { data: image, error: imageError } = await supabase
      .from("generated_images")
      .select("storage_path")
      .eq("id", imageId)
      .eq("album_id", albumId)
      .single();

    if (imageError || !image) {
      throw new Error("Image not found");
    }

    // Create a longer-lived signed URL for download
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from("generated-images")
      .createSignedUrl(image.storage_path, 60 * 10); // 10 minutes

    if (urlError || !signedUrl?.signedUrl) {
      throw new Error("Failed to create download URL");
    }

    return signedUrl.signedUrl;
  } catch (error) {
    console.error("Error in downloadImage:", error);
    return null;
  }
}

export async function downloadAllImages(albumId: string): Promise<string[]> {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    redirect("/login");
  }

  try {
    // Verify user owns this album and get all images
    const { data: album, error } = await supabase
      .from("albums")
      .select(
        `
        id,
        generated_images(id, storage_path)
      `
      )
      .eq("id", albumId)
      .eq("user_id", claims.sub)
      .single();

    if (error || !album) {
      throw new Error("Album not found or access denied");
    }

    const albumData = album as {
      id: string;
      generated_images: { id: string; storage_path: string }[];
    };

    const downloadUrls: string[] = [];

    // Create signed URLs for all images
    for (const image of albumData.generated_images) {
      const { data: signedUrl } = await supabase.storage
        .from("generated-images")
        .createSignedUrl(image.storage_path, 60 * 10); // 10 minutes

      if (signedUrl?.signedUrl) {
        downloadUrls.push(signedUrl.signedUrl);
      }
    }

    return downloadUrls;
  } catch (error) {
    console.error("Error in downloadAllImages:", error);
    return [];
  }
}

export async function setFavorite(
  imageId: string,
  albumId: string,
  isFavorite: boolean
) {
  // Get user ID first for cache invalidation
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

  const { error } = await supabaseAdmin
    .from("generated_images")
    .update({
      favourite: isFavorite,
    })
    .eq("id", imageId)
    .eq("album_id", albumId)
    .select();

  if (error) {
    console.error("Error in setFavorite:", error);
  }

  // Invalidate album cache since favorite status changed
  revalidateTag(CACHE_TAGS.userAlbums(claims.sub));

  return { success: true };
}

export async function deleteAlbum(albumId: string) {
  // Get user ID first for cache invalidation
  const userSupabase = await createClient();
  const { data, error: authError } = await userSupabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    redirect("/login");
  }

  const supabase = createAdminClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // First, get all images related to this album
    const { data: images, error: imagesError } = await supabase
      .from("generated_images")
      .select("id, storage_path")
      .eq("album_id", albumId);

    if (imagesError) {
      console.error("Error fetching album images:", imagesError);
      return { success: false, error: "Failed to fetch album images" };
    }

    // Delete files from storage bucket
    if (images && images.length > 0) {
      const filePaths = images.map((img) => img.storage_path);

      const { error: storageError } = await supabase.storage
        .from("output-images")
        .remove(filePaths);

      if (storageError) {
        console.error("Error deleting files from storage:", storageError);
        return { success: false, error: "Failed to delete files from storage" };
      }
    }

    // Delete records from generated_images table
    const { error: deleteImagesError } = await supabase
      .from("generated_images")
      .delete()
      .eq("album_id", albumId);

    if (deleteImagesError) {
      console.error("Error deleting image records:", deleteImagesError);
      return { success: false, error: "Failed to delete image records" };
    }

    // Finally, delete the album record
    const { error: deleteAlbumError } = await supabase
      .from("albums")
      .delete()
      .eq("id", albumId);

    if (deleteAlbumError) {
      console.error("Error deleting album:", deleteAlbumError);
      return { success: false, error: "Failed to delete album" };
    }

    // Invalidate album cache since album was deleted
    revalidateTag(CACHE_TAGS.userAlbums(claims.sub));

    return { success: true };
  } catch (error) {
    console.error("Error in deleteAlbum:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getAlbumProgress(
  albumId: string
): Promise<AlbumProgress | null> {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    redirect("/login");
  }

  const supabaseCacheClient = await createClientWithOptions(
    getUserDataCacheConfig(
      claims.sub,
      [CACHE_TAGS.userAlbums(claims.sub), `album-progress-${albumId}`],
      CACHE_DURATIONS.USER_DATA_SHORT // Short cache for progress data
    )
  );

  try {
    // Get album with pack info, generated images, training info, and price info
    const { data: album, error } = await supabaseCacheClient
      .from("albums")
      .select(
        `
        *,
        pack:packs(*),
        generated_images(*),
        training:trainings(user_selection),
        price:prices(headshot_count)
      `
      )
      .eq("id", albumId)
      .eq("user_id", claims.sub)
      .single();

    if (error || !album) {
      console.error("Error fetching album progress:", error);
      return null;
    }

    const albumData = album as AlbumWithPack & {
      training: { user_selection: { gender: string } };
      price: { headshot_count: number | null };
    };
    const photos: AlbumImage[] = [];

    // Get signed URLs for generated images
    for (const image of albumData.generated_images) {

        photos.push({
          id: image.id,
          url: image.storage_path,
          alt: `${albumData.pack.title} photo`,
          width: image.width || undefined,
          height: image.height || undefined,
          created_at: image.created_at,
          favourite: image.favourite || false,
          edited: image.edited || false,
        });
    }

    // Calculate max images based on headshot_count from prices table
    const maxImages = albumData.price?.headshot_count || 30; // Default fallback if no price data

    return {
      id: albumData.id,
      status: albumData.status as "generating" | "done" | "failed" | "training",
      currentImageCount: albumData.generated_images.length,
      maxImages,
      packTitle: albumData.pack.title,
      photos,
    };
  } catch (error) {
    console.error("Error in getAlbumProgress:", error);
    return null;
  }
}

export async function getGeneratingAlbumsProgress(): Promise<AlbumProgress[]> {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    return [];
  }

  try {
    const { data: albums, error } = await supabase
      .from("albums")
      .select(
        `
        *,
        pack:packs(*),
        generated_images(*),
        price:prices(headshot_count)
      `
      )
      .eq("user_id", claims.sub)
      .in("status", ["generating", "training"])
      .order("created_at", { ascending: false });

    if (error || !albums) {
      return [];
    }

    return (
      albums as (AlbumWithPack & {
        price: { headshot_count: number | null } | null;
      })[]
    ).map((album) => ({
      id: album.id,
      status: album.status as "generating" | "done" | "failed" | "training",
      currentImageCount: album.generated_images.length,
      maxImages: album.price?.headshot_count || 30,
      packTitle: album.pack.title,
      photos: [],
    }));
  } catch (error) {
    console.error("Error in getGeneratingAlbumsProgress:", error);
    return [];
  }
}

export async function getAlbumImageById(
  albumId: string,
  imageId: string
): Promise<AlbumImage | null> {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    redirect("/login");
  }

  const supabaseCacheClient = await createClientWithOptions(
    getUserDataCacheConfig(
      claims.sub,
      [CACHE_TAGS.userAlbums(claims.sub), `album-image-${imageId}`],
      CACHE_DURATIONS.GENERATED_CONTENT
    )
  );

  try {
    // First verify user owns this album
    const { data: album, error: albumError } = await supabaseCacheClient
      .from("albums")
      .select("id")
      .eq("id", albumId)
      .eq("user_id", claims.sub)
      .single();

    if (albumError || !album) {
      return null;
    }

    // Get the specific image
    const { data: image, error: imageError } = await supabase
      .from("generated_images")
      .select("*")
      .eq("id", imageId)
      .eq("album_id", albumId)
      .single();

    if (imageError || !image) {
      return null;
    }


    return {
      id: image.id,
      url: image.storage_path,
      alt: `Album image ${image.id}`,
      width: image.width || undefined,
      height: image.height || undefined,
      created_at: image.created_at,
      favourite: image.favourite || false,
      edited: image.edited || false,
    };
  } catch (error) {
    console.error("Error in getAlbumImageById:", error);
    return null;
  }
}
