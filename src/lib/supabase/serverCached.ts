import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient as createAdminClient } from '@supabase/supabase-js'

/**
 * If using Fluid compute: Don't put this client in a global variable. Always create a new client within each
 * function when using it.
 */
export async function createClientWithOptions(cacheOptions: {
cache: RequestCache,
next: {
  tags: string[]
  revalidate: number
}
}) {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        global:{
          fetch: (url, options) => {
            return fetch(url, {
              ...options,
              ...cacheOptions
            })
          }, },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export async function createAdminClientWithOptions(cacheOptions: {
  cache: RequestCache,
  next: {
    tags: string[]
    revalidate: number
  }
  }) {
    return createAdminClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
          global:{
            fetch: (url, options) => {
              return fetch(url, {
                ...options,
                ...cacheOptions
              })
            }, },
      }
    )
  }

