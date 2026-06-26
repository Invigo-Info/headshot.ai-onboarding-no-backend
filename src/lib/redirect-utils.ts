/**
 * Utility functions for managing user onboarding redirects based on source page
 */

import { cookies } from 'next/headers';
import { photoPacks } from '@/data/photo-packs';
import { parseConversionSlug } from '@/data/image-formats';

const REDIRECT_COOKIE_NAME = 'onboarding_from';
const CONVERT_COOKIE_NAME = 'convert_from';

/**
 * Retrieve and clear the onboarding source from cookie
 */
export async function getAndClearOnboardingSource(): Promise<string | null> {
  const cookieStore = await cookies();
  const source = cookieStore.get(REDIRECT_COOKIE_NAME)?.value || null;

  // Clear the cookie after reading
  if (source) {
    cookieStore.delete(REDIRECT_COOKIE_NAME);
  }

  return source;
}

/**
 * Get the onboarding redirect URL based on source
 * For new users, redirect to the category-specific generation flow
 * For returning users, redirect to dashboard
 */
export async function getRedirectUrl(source: string | null, isNewUser: boolean): Promise<string> {
  // If no source or not a new user, go to photos
  if (!source || !isNewUser) {
    return '/photos';
  }

  // Transform the source to match photo pack slugs
  let validSource = source;
  if (source === 'dating') {
    validSource = 'dating-photos';
  } else if (source === 'real-estate') {
    validSource = 'realtor-headshots';
  } else if (!source.includes('-headshots') && !source.includes('-photos')) {
    validSource += '-headshots';
  }

  // Validate source is a valid photo pack slug
  const pack = photoPacks.find(p => p.slug === validSource);
  if (!pack) {
    return '/photos';
  }

  // Redirect to the category-specific generation flow with gender step
  return `/generate/one-time/${validSource}?step=gender`;
}

/**
 * Retrieve and clear the convert source from cookie
 */
export async function getAndClearConvertSource(): Promise<string | null> {
  const cookieStore = await cookies();
  const source = cookieStore.get(CONVERT_COOKIE_NAME)?.value || null;

  if (source) {
    cookieStore.delete(CONVERT_COOKIE_NAME);
  }

  return source;
}

/**
 * Get the converter redirect URL from a conversion slug (e.g., "jpg-to-png")
 * Returns null if the slug is invalid
 */
export function getConvertRedirectUrl(slug: string): string | null {
  const parsed = parseConversionSlug(slug);
  if (!parsed) return null;
  return `/editor/image-converter?input=${parsed.input.key}&output=${parsed.output.key}`;
}
