import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { photoPacks } from '@/data/photo-packs'
import { parseConversionSlug } from '@/data/image-formats'

const REDIRECT_COOKIE_NAME = 'onboarding_from'
const CONVERT_COOKIE_NAME = 'convert_from'
const COOKIE_MAX_AGE = 60 * 10 // 10 minutes

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Capture and store the 'from' parameter for onboarding redirects
  if (request.nextUrl.pathname === '/login') {
    const fromParam = request.nextUrl.searchParams.get('from')

    if (fromParam) {
      let validSource = fromParam

      // Transform the source to match photo pack slugs
      if (fromParam === 'dating') {
        validSource = 'dating-photos'
      } else if (fromParam === 'real-estate') {
        validSource = 'realtor-headshots'
      } else if (!fromParam.includes('-headshots') && !fromParam.includes('-photos')) {
        validSource += '-headshots'
      }

      // Validate that the source is a valid photo pack slug
      const isValidSource = photoPacks.some(pack => pack.slug === validSource)

      if (isValidSource) {
        // Store the original 'from' parameter in cookie
        supabaseResponse.cookies.set(REDIRECT_COOKIE_NAME, fromParam, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: COOKIE_MAX_AGE,
          path: '/',
        })
      }
    }

    // Capture 'convert' parameter for image converter redirects
    const convertParam = request.nextUrl.searchParams.get('convert')
    if (convertParam) {
      const parsed = parseConversionSlug(convertParam)
      if (parsed) {
        supabaseResponse.cookies.set(CONVERT_COOKIE_NAME, convertParam, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: COOKIE_MAX_AGE,
          path: '/',
        })
      }
    }
  }

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  // const startTime = Date.now()

  const { data, error } = await supabase.auth.getClaims();
  const user = data?.claims

  // If the session is expired/revoked, clear stale auth cookies so the error
  // doesn't repeat on every subsequent request.
  if (error?.code === 'session_expired') {
    const allCookies = request.cookies.getAll()
    const authCookies = allCookies.filter(c => c.name.startsWith('sb-'))

    supabaseResponse = NextResponse.next({ request })
    for (const cookie of authCookies) {
      supabaseResponse.cookies.set(cookie.name, '', { maxAge: 0 })
    }
  }

  // const endTime = Date.now()
  // const duration = endTime - startTime
  // console.log(`supabase.auth.getClaims() took ${duration}ms`)

  // Define public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/actor-headshots',
    '/architect-headshots',
    '/author-headshots',
    '/ballet-dancer-headshots',
    '/black-and-white-headshots',
    '/bumble-headshots',
    '/business-headshots',
    '/casting-headshots',
    '/ceo-headshots',
    '/chef-headshots',
    '/corporate-headshots',
    '/dancer-headshots',
    '/data-analyst-headshots',
    '/dating-headshots',
    '/dating-photos',
    '/dentist-headshots',
    '/doctor-headshots',
    '/entrepreneur-headshots',
    '/eras-headshots',
    '/esthetician-headshots',
    '/examples',
    '/executive-headshots',
    '/graduation-headshots',
    '/hairdresser-headshots',
    '/hair-stylist-headshots',
    '/hinge-headshots',
    '/interior-designer-headshots',
    '/lawyer-headshots',
    '/linkedin-headshots',
    '/makeup-artist-headshots',
    '/massage-therapist-headshots',
    '/model-headshots',
    '/musician-headshots',
    '/nail-technician-headshots',
    '/nurse-headshots',
    '/nurse-practitioner-headshots',
    '/personal-trainer-headshots',
    '/professional-headshots',
    '/professor-headshots',
    '/psychologist-headshots',
    '/real-estate-headshots',
    '/sales-executive-headshots',
    '/sales-manager-headshots',
    '/singer-headshots',
    '/software-engineer-headshots',
    '/surgeon-headshots',
    '/teacher-headshots',
    '/theatrical-headshots',
    '/therapist-headshots',
    '/tinder-headshots',
    '/yoga-teacher-headshots',
    '/photo-editor',
    '/photo-editor/background-changer',
    '/photo-editor/blemish-remover',
    '/photo-editor/text-remover',
    '/photo-editor/face-restorer',
    '/photo-editor/color-correction',
    '/photo-editor/image-upscaler',
    '/photo-editor/image-extender',
    '/photo-editor/magic-eraser',
    '/photo-editor/photo-restoration',
    '/photo-editor/unblur-image',
    '/privacy-policy',
    '/security-policy',
    '/terms-of-service',
    '/refund-policy',
    '/pricing',
    '/login',   
    '/error',
    '/forgot-password',
    '/sign-up-success',
    '/magic-link-success',
    '/auth',
    '/api/webhooks',
    '/api/cron',
    // Cross-device "upload from your phone" relay + the mobile upload page.
    '/api/mobile-upload',
    '/m',
    // Watermarked preview generation (pre-payment, no Supabase).
    '/api/generate/preview',
    '/reviews',
    '/sitemap.xml',
    '/sitemap-0.xml',
    '/contact-us',
    '/robots.txt',
    '/api/test-webhooks',
    '/about-us',
    '/affiliate',
    '/media-kit',
    '/convert',
    // Anonymous-friendly onboarding entry. Auth gate is the preview step inside
    // the wizard, not the URL — see preview-step.tsx.
    '/generate/one-time'
  ]

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/') {
      return request.nextUrl.pathname === '/'
    }
    return request.nextUrl.pathname.startsWith(route)
  })

  if (!user && !isPublicRoute) {
    // no user and trying to access protected route, redirect to login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Define auth routes that authenticated users should not access
  const authRoutes = [
    '/login',
    '/login',
    '/forgot-password',
    '/sign-up-success'
  ]

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (user && isAuthRoute) {
    // If user is already authenticated and came from a convert page, redirect to converter
    const convertParam = request.nextUrl.searchParams.get('convert')
    if (convertParam) {
      const parsed = parseConversionSlug(convertParam)
      if (parsed) {
        const url = request.nextUrl.clone()
        url.pathname = '/editor/image-converter'
        url.searchParams.delete('convert')
        url.searchParams.set('input', parsed.input.key)
        url.searchParams.set('output', parsed.output.key)
        return NextResponse.redirect(url)
      }
    }

    // user is logged in but trying to access auth pages, redirect to dashboard
    const url = request.nextUrl.clone()
    url.pathname = '/photos'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
