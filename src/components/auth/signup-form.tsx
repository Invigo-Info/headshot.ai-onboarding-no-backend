'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { SignInWithGoogleAction, signUpAction } from '@/actions/auth-actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { GoogleLogo } from './GoogleLogo'

const signupSchema = z.object({
  full_name: z
    .string()
    .min(1, 'Full name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/(?=.*[0-9])/, 'Password must contain at least one number')
    .regex(/(?=.*[!@#$%^&*])/, 'Password must contain at least one special character (!@#$%^&*)'),

    agreeToTerms: z.boolean().refine((data) => data, {
      message: 'You must agree to the terms and conditions',
    }),

  repeatPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords don't match",
  path: ["repeatPassword"],
}

)

type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreeToTerms: false,
    },
  })

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signUpAction(values)
      
      if (!result.success) {
        setError(result.error || 'An error occurred')
        return
      }

      if (result.redirectTo) {
        router.push(result.redirectTo)
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }
  const handleSignUpWithGoogle = async () => {
    setIsGoogleLoading(true)
    const result = await SignInWithGoogleAction()
    if (result.success) {
      router.push(result.redirectTo || '/photos')
    }
    setIsGoogleLoading(false)
  }


  return (
    <Card className='shadow-none border-none bg-transparent'>
      <CardHeader className='text-center'>
        <CardTitle className="text-2xl font-mont">Create your account</CardTitle>
        <CardDescription>
          Get started with your professional AI headshots
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      className='bg-white'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className='bg-white'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      className='bg-white'
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Must be at least 6 characters with one number and one special character
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      className='bg-white'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className='flex flex-row '>
                 
                  <FormLabel htmlFor="agreeToTerms" className='cursor-pointer flex items-start'><FormControl>
                  <Checkbox
                    id="agreeToTerms"
                    className='bg-white border-gray-800 mr-2'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  /></FormControl>
                  
                  <span className='text-sm'>I agree to the <Link href="/terms" target='_blank' className="underline inline-block">Terms & Conditions</Link> and <Link href="/privacy" target='_blank' className="underline inline-block">Privacy Policy</Link>  </span>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
              {isLoading ? (
                <>
                <Loader2 className='size-4 mr-2 animate-spin' />  Creating account...
                </>
              ) : (
                <>
                Create account
                </>
              )}
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-blue-50/50 px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <Button variant="outline" className="w-full cursor-pointer" type='button' onClick={() => handleSignUpWithGoogle()} disabled={isGoogleLoading}>
            <GoogleLogo className='size-4 mr-1' />
          {isGoogleLoading ? (
            <>
            <Loader2 className='size-4 mr-2 animate-spin' />  Signing in with Google...
            </>
          ) : (
            <>
            Sign up with Google
            </>
          )}
        </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
} 