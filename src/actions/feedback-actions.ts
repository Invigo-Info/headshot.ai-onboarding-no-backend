'use server'

import { Resend } from "resend";
import FeedbackEmail from "@/components/email-templates/feedback-email";
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';


const feedbackSchema = z.object({
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, { message: "Message must be less than 1000 characters." }),
});

export type FeedbackActionResult = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function submitFeedback(formData: FormData): Promise<FeedbackActionResult> {
  try {
    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "You must be logged in to submit feedback.",
      };
    }

    const name = user.user_metadata?.full_name || user.user_metadata?.name || 'User';
    const email = user.email || '';

    // Extract and validate form data
    const rawData = {
      message: formData.get('message') as string,
    };

    const validatedData = feedbackSchema.parse(rawData);

    // Initialize Resend
    const resend = process.env.RESEND_API_KEY
      ? new Resend(process.env.RESEND_API_KEY)
      : null;

    if (!resend) {
      console.error("RESEND_API_KEY is not configured");
      return {
        success: false,
        error: "Email service is not configured. Please try again later.",
      };
    }

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Headshots AI <no-reply@headshot.ai>";

    // Send email to admin
    await resend.emails.send({
      from: fromEmail,
      to: "support@headshot.ai",
      subject: `New Feedback from ${name}`,
      react: FeedbackEmail({
        name,
        email,
        feedbackType: 'General Feedback',
        message: validatedData.message,
      }),
    });

    return {
      success: true,
      message: "Thank you for your feedback! We'll get back to you soon.",
    };
  } catch (error) {
    console.error('Feedback submission error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
      };
    }

    return {
      success: false,
      error: "Failed to send feedback. Please try again later.",
    };
  }
}
