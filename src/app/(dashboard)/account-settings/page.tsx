import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import UpdateProfileForm from '../../../components/account-settings/update-profile-form';
import SupportSection from '../../../components/account-settings/support-section';

/**
 * Renders the Account Settings page.
 * Fetches the current user session and displays profile update form and support section.
 * Redirects to sign-in page if the user is not authenticated.
 *
 * @returns {Promise<JSX.Element | null>} The rendered page component or null if redirecting.
 */
const AccountSettingsPage = async () => {
  // Await the creation of the Supabase client
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims

  // Redirect to sign-in if user is not found
  if (!user) {
    return redirect('/login');
  }

  const { data: userData } = await supabase.from('profiles').select('*').eq('id', user.sub).single();


  return (
    <div className='w-full min-h-screen max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      <h1 className='text-3xl font-semibold tracking-tight mb-1 font-satoshi'>Account Settings</h1>
      <p className='text-muted-foreground mb-8'>Manage your account settings</p>

      <div className='grid gap-8 max-w-4xl'>
        <UpdateProfileForm user={userData} />
        <SupportSection />
      </div>
    </div>
  );
};

export default AccountSettingsPage;