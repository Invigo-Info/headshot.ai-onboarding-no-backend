import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/lib/supabase/server'
import { getAndClearOnboardingSource, getRedirectUrl, getAndClearConvertSource, getConvertRedirectUrl } from '@/lib/redirect-utils'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }

  if (code) {
    const supabase = await createClient()
    const { error, data: sessionData } = await supabase.auth.exchangeCodeForSession(code)
	if (!error) {
		// Honor the `next` query param when it points back into the in-flow
		// wizard so users resume where they left off after auth. Anything else
		// defaults to /photos.
		const isWizardResume = next.startsWith('/generate/one-time/')
		if (!isWizardResume) {
			next = '/photos'
		}

		// Check if user came from a specific landing page (e.g., corporate-headshots)
		const onboardingSource = await getAndClearOnboardingSource()
		if (!isWizardResume && onboardingSource && sessionData.session?.user) {
			try {
				const createdAt = new Date(sessionData.session.user.created_at)
				const now = new Date()
				const minutesAgo = (now.getTime() - createdAt.getTime()) / 1000 / 60
				const isNewUser = minutesAgo < 5

				next = await getRedirectUrl(onboardingSource, isNewUser)
			} catch (err) {
				console.error('Error checking user status:', err)
				// Fall back to default /photos redirect on error
			}
		}

		// Check if user came from a convert page (works for all users, not just new)
		const convertSource = await getAndClearConvertSource()
		if (convertSource) {
			const convertUrl = getConvertRedirectUrl(convertSource)
			if (convertUrl) {
				next = convertUrl
			}
		}

		const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/error?error="Something went wrong"`)
}