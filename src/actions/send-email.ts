'use server'

import { Resend } from "resend";
import ContactEmail from "@/components/email-templates/contact-email";
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactActionResult = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function submitContact(formData: FormData): Promise<ContactActionResult> {
  try {
    // Extract form data
    const phoneNumberValue = formData.get('phone-number') as string | null;
    const rawData = {
      firstName: formData.get('first-name') as string,
      lastName: formData.get('last-name') as string,
      email: formData.get('email') as string,
      phoneNumber: phoneNumberValue && phoneNumberValue.trim() !== "" ? phoneNumberValue : undefined,
      message: formData.get('message') as string,
    };

    // Validate the data
    const validatedData = contactSchema.parse(rawData);

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

    // Send email to support
    await resend.emails.send({
      from: fromEmail,
      to: "support@headshot.ai",
      subject: `New Contact Form Submission from ${validatedData.firstName} ${validatedData.lastName}`,
      react: ContactEmail({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phoneNumber: validatedData.phoneNumber || '',
        message: validatedData.message,
      }),
    });

    return {
      success: true,
      message: "Thank you for contacting us! We've received your message and will respond soon.",
    };
  } catch (error) {
    console.error('Contact form submission error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
      };
    }

    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }
}