import React from 'react';
import FeedbackForm from '../../../components/feedback/feedback-form';

/**
 * Renders the Feedback page.
 * Displays a form for users to submit feedback to the admin team.
 *
 * @returns {JSX.Element} The rendered feedback page component.
 */
const FeedbackPage = () => {
  return (
    <div className='w-full min-h-screen max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      <h1 className='text-3xl font-semibold tracking-tight mb-1 font-satoshi'>Share Feedback</h1>
      <p className='text-muted-foreground mb-8'>Help us make Headshot.AI better</p>

      <div className='grid gap-8 max-w-4xl'>
        <FeedbackForm />
      </div>
    </div>
  );
};

export default FeedbackPage;