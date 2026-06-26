"use server";

import { createClient } from "@/lib/supabase/server";
import { createClientWithOptions } from "@/lib/supabase/serverCached";
import { CACHE_TAGS, getUserDataCacheConfig } from "@/lib/cache-config";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export interface ReviewEligibility {
  shouldShow: boolean;
  userId: string;
  userName: string | null;
  userEmail: string | null;
  firstHeadshotUrl: string | null;
}

const reviewSchema = z.object({
  albumId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  reviewText: z.string().max(2000).optional(),
  reviewerName: z.string().max(200).optional(),
  jobTitle: z.string().max(200).optional(),
  reviewerEmail: z.string().email().optional().or(z.literal("")),
  headshotUrl: z.string().optional(),
  shareConsent: z.boolean().optional(),
});

export async function checkReviewModalEligibility(
  albumId: string
): Promise<ReviewEligibility> {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    redirect("/login");
  }

  const userId = claims.sub;

  const cachedClient = await createClientWithOptions(
    getUserDataCacheConfig(
      userId,
      [CACHE_TAGS.userReviews(userId)],
      60 * 60 * 24 // 1 day
    )
  );

  // Check if user has ANY existing review
  const { count: reviewCount } = await cachedClient
    .from("reviews")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  if (reviewCount && reviewCount > 0) {
    return {
      shouldShow: false,
      userId,
      userName: null,
      userEmail: null,
      firstHeadshotUrl: null,
    };
  }

  // Check if review was dismissed within last 7 days
  const { data: profile } = await cachedClient
    .from("profiles")
    .select("full_name, email, review_dismissed_at")
    .eq("id", userId)
    .single();

  if (profile?.review_dismissed_at) {
    const dismissedAt = new Date(profile.review_dismissed_at);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    if (dismissedAt > sevenDaysAgo) {
      return {
        shouldShow: false,
        userId,
        userName: null,
        userEmail: null,
        firstHeadshotUrl: null,
      };
    }
  }

  // Fetch first generated image for headshot preview
  const { data: firstImage } = await cachedClient
    .from("generated_images")
    .select("storage_path")
    .eq("album_id", albumId)
    .limit(1)
    .single();

  return {
    shouldShow: true,
    userId,
    userName: profile?.full_name ?? null,
    userEmail: profile?.email ?? null,
    firstHeadshotUrl: firstImage?.storage_path ?? null,
  };
}

export async function submitReview(input: {
  albumId: string;
  rating: number;
  reviewText?: string;
  reviewerName?: string;
  jobTitle?: string;
  reviewerEmail?: string;
  headshotUrl?: string;
  shareConsent?: boolean;
}): Promise<{ success: boolean; error?: string }> {
  const parsed = reviewSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid review data" };
  }

  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    redirect("/login");
  }

  const userId = claims.sub;

  // Verify user owns this album
  const { data: album, error: albumError } = await supabase
    .from("albums")
    .select("id")
    .eq("id", parsed.data.albumId)
    .eq("user_id", userId)
    .single();

  if (albumError || !album) {
    return { success: false, error: "Album not found" };
  }

  const { error: upsertError } = await supabase.from("reviews").upsert(
    {
      user_id: userId,
      album_id: parsed.data.albumId,
      rating: parsed.data.rating,
      review_text: parsed.data.reviewText || null,
      reviewer_name: parsed.data.reviewerName || null,
      job_title: parsed.data.jobTitle || null,
      reviewer_email: parsed.data.reviewerEmail || null,
      headshot_url: parsed.data.headshotUrl || null,
      share_consent: parsed.data.shareConsent ?? false,
    },
    { onConflict: "user_id,album_id" }
  );

  if (upsertError) {
    console.error("Error submitting review:", upsertError);
    return { success: false, error: "Failed to submit review" };
  }

  revalidateTag(CACHE_TAGS.userReviews(userId));

  return { success: true };
}

export async function dismissReviewModal(): Promise<{ success: boolean }> {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("profiles")
    .update({ review_dismissed_at: new Date().toISOString() })
    .eq("id", claims.sub);

  if (error) {
    console.error("Error dismissing review modal:", error);
    return { success: false };
  }

  revalidateTag(CACHE_TAGS.userReviews(claims.sub));

  return { success: true };
}
