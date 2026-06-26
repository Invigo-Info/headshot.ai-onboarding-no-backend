/* eslint-disable @typescript-eslint/no-explicit-any */
import { unstable_cache } from "next/cache";

// Cache configuration constants
export const CACHE_DURATIONS = {
  // User-specific data that changes frequently
  USER_DATA_SHORT: 60 * 5, // 5 minutes
  USER_DATA_MEDIUM: 60 * 60 * 24 * 3, // 3 days
  USER_DATA_LONG: 60 * 60 * 24 * 7, // 7 days (user uploads/albums)

  // Global/static data that rarely changes
  GLOBAL_DATA: 60 * 60 * 24 * 30, // 30 days

  // Generated content (AI images) - kept longer
  GENERATED_CONTENT: 60 * 60 * 24 * 30, // 30 days

  // Editor data - medium cache
  EDITOR_DATA: 60 * 60 * 6, // 6 hours

  TEST_DATA: 1, // 1 second
} as const;

// Cache tags for invalidation
export const CACHE_TAGS = {
  // User-specific tags
  userAlbums: (userId: string) => `albums-${userId}`,
  userUploads: (userId: string) => `uploads-${userId}`,
  userProfile: (userId: string) => `profile-${userId}`,
  userCredits: (userId: string) => `credits-${userId}`,
  recentEdits: (userId: string) => `recent-edits-${userId}`,
  recentUploads: (userId: string) => `recent-uploads-${userId}`,
  userReviews: (userId: string) => `reviews-${userId}`,

  // Global tags
  packs: "packs",
  globalPacks: "global-packs",

  // Training related
  training: (trainingId: string) => `training-${trainingId}`,
  trainingStatus: (trainingId: string) => `training-status-${trainingId}`,
} as const;

/**
 * Cache configuration for Supabase client with options
 */
export const getUserDataCacheConfig = (userId: string, tags: string[], duration: number = CACHE_DURATIONS.USER_DATA_MEDIUM) => ({
  cache: "force-cache" as const,
  next: {
    tags,
    revalidate: duration,
  },
});

/**
 * Cache configuration for global data
 */
// const defaultDuration = process.env.NODE_ENV === "development" ? CACHE_DURATIONS.TEST_DATA : CACHE_DURATIONS.GLOBAL_DATA;
const defaultDuration = CACHE_DURATIONS.GLOBAL_DATA;

export const getGlobalDataCacheConfig = (tags: string[], duration: number = defaultDuration) => ({
  cache: "force-cache" as const,
  next: {
    tags,
    revalidate: duration,
  },
});

/**
 * Wrapper for unstable_cache with user-specific keys
 */
// export function createUserCache<T extends (...args: any[]) => Promise<any>>(
//   fn: T,
//   keyParts: (string | ((...args: Parameters<T>) => string))[],
//   options: {
//     revalidate?: number;
//     tags?: (string | ((...args: Parameters<T>) => string))[];
//   } = {}
// ) {
//   return unstable_cache(
//     fn,
//     keyParts.map(part => typeof part === 'function' ? part : () => part),
//     {
//       revalidate: options.revalidate ?? CACHE_DURATIONS.USER_DATA_MEDIUM,
//       tags: options.tags?.map(tag => typeof tag === 'function' ? tag : () => tag),
//     }
//   );
// }

/**
 * Wrapper for unstable_cache with global keys
 */
export function createGlobalCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyParts: string[],
  options: {
    revalidate?: number;
    tags?: string[];
  } = {}
) {
  return unstable_cache(
    fn,
    keyParts,
    {
      revalidate: options.revalidate ?? CACHE_DURATIONS.GLOBAL_DATA,
      tags: options.tags,
    }
  );
}
