'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import type { 
  LoginCredentials, 
  SignUpCredentials, 
  ForgotPasswordData, 
  UpdatePasswordData, 
  AuthActionResult 
} from '@/types/auth.types'
import { revalidatePath } from 'next/cache'

export async function loginAction(credentials: LoginCredentials): Promise<AuthActionResult> {
  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      redirectTo: '/photos',
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export async function signUpAction(credentials: SignUpCredentials): Promise<AuthActionResult> {
  const supabase = await createClient()

  if (credentials.password !== credentials.repeatPassword) {
    return {
      success: false,
      error: 'Passwords do not match',
    }
  }

  try {
    const headersList = await headers()
    const origin = headersList.get('origin') || 'http://localhost:3000'

    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: `${origin}/photos`,
        data: {
          full_name: credentials.full_name,
        },
      },
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      redirectTo: '/auth/sign-up-success',
      // redirectTo: '/login',
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export async function forgotPasswordAction(data: ForgotPasswordData): Promise<AuthActionResult> {
  const supabase = await createClient()

  try {
    const headersList = await headers()
    const origin = headersList.get('origin') || 'http://localhost:3000'

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${origin}/update-password`,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export async function updatePasswordAction(data: UpdatePasswordData): Promise<AuthActionResult> {
  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.updateUser({ 
      password: data.password 
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      redirectTo: '/dashboard',
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function SignInWithGoogleAction(nextPath?: string): Promise<AuthActionResult> {
  const supabase = await createClient()
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin"); // e.g., 'http://localhost:3000'
  const safeNext =
    nextPath && nextPath.startsWith("/") ? nextPath : "/photos";
  try {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(safeNext)}`,
      },
    });


    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      redirectTo: data.url,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export async function signInWithMagicLink(email: string, nextPath?: string) {
  const supabase = await createClient()
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  const safeNext =
    nextPath && nextPath.startsWith("/") ? nextPath : "/photos";

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      // shouldCreateUser: false,
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(safeNext)}`,
    },
  })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    redirectTo: `${origin}/magic-link-success`,
  }
}


export async function updateUserProfile(formData: FormData) {
  const supabase = await createClient();

  const fullName = formData.get('fullName') as string | null;

  // Basic validation for full name
  if (!fullName || fullName.trim().length < 2) {
    return { error: { message: 'Full name must be at least 2 characters.' } };
  }

  // Fetch the current user session to ensure the user is authenticated
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
      console.warn('updateUserProfile called without authenticated user.')
      return { error: { message: 'Authentication required.' } };
  }

  // Update user metadata
  // Update in auth.users metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: { full_name: fullName.trim() }
  })

  // Handle potential update errors
  if (updateError) {
    console.error('Error updating user profile:', updateError.message);
    return { error: { message: 'Could not update profile. Please try again.' } };
  }

    // Also update in the users table if it exists
 await supabase
 .from('profiles')
 .update({ full_name: fullName.trim() })
 .eq('id', claims.sub)

  // Revalidate the account settings page path to reflect changes immediately
  revalidatePath('/account-settings');
  // Consider revalidating other paths if the name is displayed elsewhere (e.g., header)
  // revalidatePath('/');

  return { success: true };
}