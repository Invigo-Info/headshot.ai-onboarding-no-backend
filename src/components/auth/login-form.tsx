'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { SignInWithGoogleAction, signInWithMagicLink } from '@/actions/auth-actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { GoogleLogo } from './GoogleLogo'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  // password: z
  //   .string()
  //   .min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      // password: '',
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signInWithMagicLink(values.email)
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

  const handleSignInWithGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await SignInWithGoogleAction();
      if (result.success) {
        router.push(result.redirectTo || '/dashboard');
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setIsGoogleLoading(false);
    }
  }

  return (
    <Card className='shadow-none border-none bg-transparent'>
      <CardHeader className='text-center'>
        <CardTitle className="text-2xl font-mont">Signup or Login</CardTitle>
        <CardDescription>
        Start creating your AI headshots
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
      <div className="flex flex-col space-y-4">
      <Button variant="outline" className="w-full py-6 cursor-pointer text-sm lg:text-base" type='button' onClick={() => handleSignInWithGoogle()} disabled={isGoogleLoading}>
          {isGoogleLoading ? (
            <>
            <Loader2 className='size-6 mr-2 animate-spin' />  Logging in with Google...
            </>
          ) : (
            <>
            <GoogleLogo className='size-6 mr-1' />
            Continue with Google
            </>
          )}
        </Button>

        {/* <Button variant="outline" className="w-full py-5 cursor-pointer" type='button' onClick={() => handleSignInWithGoogle()} disabled={isGoogleLoading}>
          {isGoogleLoading ? (
            <>
            <Loader2 className='size-6 mr-2 animate-spin' />  Logging in with Facebook...
            </>
          ) : (
            <>
            <Image src="/assets/social-logos/Facebook_Logo_Primary.png" alt="Facebook" width={20} height={20} className='size-6 mr-1' />
            Continue with Facebook
            </>
          )}
        </Button>

        <Button variant="outline" className="w-full py-5 cursor-pointer" type='button' onClick={() => handleSignInWithGoogle()} disabled={isGoogleLoading}>
          {isGoogleLoading ? (
            <>
            <Loader2 className='size-6 mr-2 animate-spin' />  Logging in with Apple...
            </>
          ) : (
            <>
            <AppleLogo className='size-6 mr-1' />
            Continue with Apple
            </>
          )}
        </Button> */}
      </div>

        <div className="relative flex items-center justify-center my-8">
          <span className='flex-1 bg-gray-300 h-[1px]'>&nbsp;</span>
          <span className="relative w-fit z-10  px-2 text-muted-foreground">Or continue with</span>
          <span className='flex-1 bg-gray-300 h-[1px]'>&nbsp;</span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Email</FormLabel> */}
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className='bg-white'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            


            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full cursor-pointer py-6 text-sm lg:text-base" disabled={isLoading}>
             {isLoading ? (
              <>
              <Loader2 className='size-4 mr-2 animate-spin' />  Signing in...
              </>
             ) : (
              <>
              Continue with email
              </>
             )}
            </Button>
            
        
          </form>
          
        </Form>
        
        <div className="mt-6 w-full text-sm text-gray-500">
          New accounts are subjected to our <Link href="/terms-of-service" target='_blank' className="underline inline-block hover:text-primary">Terms</Link> and <Link href="/privacy-policy" target='_blank' className="underline inline-block hover:text-primary">Privacy Policy</Link> 
        </div>

      </CardContent>
    </Card>
  )
} 