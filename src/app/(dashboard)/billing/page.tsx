import React from 'react';
import { BillingContent } from '@/components/billing';

/**
 * Renders the Billing page.
 * Fetches the current user session and displays billing information.
 * Redirects to sign-in page if the user is not authenticated.
 *
 * @returns {Promise<JSX.Element | null>} The rendered page component or null if redirecting.
 */
const BillingPage = async () => {

  return <BillingContent />;
};

export default BillingPage;