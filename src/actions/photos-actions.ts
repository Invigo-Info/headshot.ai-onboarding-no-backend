"use server"
import { createClientWithOptions } from "@/lib/supabase/serverCached"
import { CACHE_TAGS, getGlobalDataCacheConfig } from "@/lib/cache-config"

export async function getAllPacks() {
  const supabaseCacheClient = await createClientWithOptions(
    getGlobalDataCacheConfig([CACHE_TAGS.globalPacks]) // remove this zero
  )

  try {
    const { data, error } = await supabaseCacheClient.from('packs').select('*')

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export async function getPackBySlug(slug: string) {
  const supabaseCacheClient = await createClientWithOptions(
    getGlobalDataCacheConfig([CACHE_TAGS.globalPacks, `pack-${slug}`])
  )

  try {
    const { data, error } = await supabaseCacheClient
      .from('packs')
      .select('id, slug, title, description, attire, background, is_active, pro, choices')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return {
      success: true,
      data
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Pack not found',
    }
  }
}