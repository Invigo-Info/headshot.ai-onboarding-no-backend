'use client';

import React, { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { submitFeedback, type FeedbackActionResult } from '@/actions/feedback-actions';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';
import Link from 'next/link';

const feedbackFormSchema = z.object({
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, { message: "Message must be less than 1000 characters." }),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

const FeedbackForm: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      message: '',
    },
  });

  const { isDirty } = form.formState;

  const onSubmit = (values: FeedbackFormValues) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('message', values.message);

      try {
        const result: FeedbackActionResult = await submitFeedback(formData);
        if (result.error) {
          toast.error(result.error);
        } else if (result.message) {
          toast.success(result.message);
          setIsSubmitted(true);
        }
      } catch (e) {
        console.error(e);
        toast.error('An unexpected error occurred. Please try again.');
      }
    });
  };

  if (isSubmitted) {
    return (
      <Card className='shadow-none drop-shadow-none'>
        <CardContent className='text-center py-12'>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">Thank you for your feedback!</h3>
              <p className="text-gray-600 max-w-md">
                We&apos;ve received your feedback and will review it carefully. Your input helps us improve our service for everyone.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='shadow-none drop-shadow-none'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Privacy Badge */}
            <div className="flex">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/60 border rounded-full px-3 py-1.5">
                <Lock className="w-3.5 h-3.5" />
                Your feedback is private
              </span>
            </div>

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <label className="text-base font-semibold">How can we improve?</label>
                  <FormControl>
                    <Textarea
                      placeholder="Found a bug? Have an idea? Something not working right? We're listening..."
                      className="min-h-[160px] mt-2"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">We read every message.</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending || !isDirty}
              className="w-full"
              size="lg"
            >
              {isPending ? 'Sending...' : 'Send Feedback'}
            </Button>

            {/* Support Link */}
            <p className="text-center text-sm text-muted-foreground">
              Need help?{' '}
              <Link href="mailto:support@headshot.ai" className="text-primary hover:underline">
                Contact support
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
