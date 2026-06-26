'use client';

import React, { useTransition, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RequiredClaims, UserMetadata } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserProfile } from '@/actions/auth-actions';
import { toast } from 'sonner';


/**
 * Schema for validating the profile update form.
 */
const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email(), // Include email for completeness, though it's disabled
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface UpdateProfileFormProps {
  /**
   * The Supabase user object containing current user details.
   */
  user: RequiredClaims & UserMetadata;
}

/**
 * Renders a form for updating the user's profile information (full name).
 * Displays the user's email address in a disabled field.
 *
 * @param {UpdateProfileFormProps} props - The component props.
 * @param {User} props.user - The current Supabase user object.
 * @returns {JSX.Element} The rendered form component.
 */
const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();

  // Store initial values
  const initialValues = useMemo(() => ({
    fullName: user.full_name || '',
    email: user.email || '',
  }), [user.full_name, user.email]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    // Initialize form with user data
    defaultValues: initialValues,
  });

  // Use react-hook-form's built-in dirty state to track changes
  const { isDirty } = form.formState;

  /**
   * Handles form submission.
   * Calls the updateUserProfile server action and shows toast notifications.
   * @param {ProfileFormValues} values - The validated form values.
   */
  const onSubmit = (values: ProfileFormValues) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('fullName', values.fullName);

      try {
        const result = await updateUserProfile(formData);
        if (result?.error) {
          toast.error(result.error.message ?? 'An unexpected error occurred. Please try again.');
        } else {
          toast.success('Profile updated successfully!');
          // Reset form dirty state to disable the button until new changes are made
          form.reset(form.getValues());
        }
      } catch (e) {
        console.error(e);
        toast.error('An unexpected error occurred. Please try again.');
      }
    });
  };

  return (
    <Card className='shadow-none drop-shadow-none'>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className=''>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name Field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} aria-required="true" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email Field (Disabled) */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} disabled aria-readonly="true" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button - Only enabled when form has changes and not pending */}
            <Button type="submit" disabled={isPending || !isDirty} className='w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white'>
              {isPending ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateProfileForm; 