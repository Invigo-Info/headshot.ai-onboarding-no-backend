'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export interface UpdateProfileResult {
  success: boolean
  error?: string
}

export async function updateUserName(formData: FormData): Promise<UpdateProfileResult> {
  const supabase = await createClient()
  
  const { data, error: authError } = await supabase.auth.getClaims();
  const user = data?.claims
  
  if (authError || !user) {
    redirect('/login')
  }

  const fullName = formData.get('fullName') as string

  if (!fullName || fullName.trim().length < 2) {
    return {
      success: false,
      error: 'Name must be at least 2 characters long'
    }
  }

  // Update in auth.users metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: { full_name: fullName.trim() }
  })

  if (updateError) {
    return {
      success: false,
      error: updateError.message
    }
  }

  // Also update in the users table if it exists
  await supabase
    .from('profiles')
    .update({ full_name: fullName.trim() })
    .eq('id', user.sub)

  // Don't fail if users table doesn't exist or update fails
  // as the auth metadata is the primary source

  revalidatePath('/profile')
  
  return {
    success: true
  }
}

export async function updateUserPassword(formData: FormData): Promise<UpdateProfileResult> {
  const supabase = await createClient()
  
  const { data, error: authError } = await supabase.auth.getClaims();
  const user = data?.claims
  
  if (authError || !user) {
    redirect('/login')
  }

  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Validation
  if (!currentPassword) {
    return {
      success: false,
      error: 'Current password is required'
    }
  }

  if (!newPassword || newPassword.length < 6) {
    return {
      success: false,
      error: 'New password must be at least 6 characters long'
    }
  }

  if (newPassword !== confirmPassword) {
    return {
      success: false,
      error: 'New passwords do not match'
    }
  }

  if (currentPassword === newPassword) {
    return {
      success: false,
      error: 'New password must be different from current password'
    }
  }

  // Verify current password by attempting to sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword
  })

  if (signInError) {
    return {
      success: false,
      error: 'Current password is incorrect'
    }
  }

  // Update password
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (updateError) {
    return {
      success: false,
      error: updateError.message
    }
  }

  revalidatePath('/profile')
  
  return {
    success: true
  }
} 