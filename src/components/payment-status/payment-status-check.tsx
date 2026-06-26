'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Loader2, Clock } from 'lucide-react'
import { checkPaymentStatus } from '@/actions/payment-actions'

interface PaymentStatusCheckProps {
  userId: string
}

export default function PaymentStatusCheck({ userId }: PaymentStatusCheckProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'checking' | 'success' | 'failed' | 'pending'>('checking')
  const [error, setError] = useState<string | null>(null)
  const [paymentType, setPaymentType] = useState<'one-time' | 'subscription'>('one-time')

  const slug = searchParams.get('slug')
  const plan = searchParams.get('plan')
  const type = searchParams.get('type')

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Determine payment type
        const isSubscription = type === 'subscription'
        setPaymentType(isSubscription ? 'subscription' : 'one-time')

        // if (isSubscription) {
        //   // Check subscription status
        //   const result = await checkSubscriptionStatus(userId)
          
        //   if (result.success) {
        //     if (result.hasActiveSubscription) {
        //       setStatus('success')
        //       // Redirect to generate pro after a delay
        //       setTimeout(() => {
        //         router.push('/photos')
        //       }, 3000)
        //     } else {
        //       setStatus('pending')
        //     }
        //   } else {
        //     setStatus('failed')
        //     setError(result.error || 'Failed to check subscription status')
        //   }
        // } else {
          // Check one-time payment status
          if (!plan) {
            setStatus('failed')
            setError('Missing plan information')
            return
          }

          const result = await checkPaymentStatus(userId, plan)
          
          if (result.success) {
            if (result.hasPaidOrder) {
              setStatus('success')
              // Redirect to the user's headshot dashboard after a delay so
              // they see their training/generated images.
              setTimeout(() => {
                router.push('/dashboard')
              }, 3000)
            } else {
              setStatus('pending')
            }
          } else {
            setStatus('failed')
            setError(result.error || 'Failed to check payment status')
          }
        // }
      } catch (err) {
        console.error('Error checking payment status:', err)
        setStatus('failed')
        setError('An unexpected error occurred')
      }
    }

    checkStatus()
    
    // Poll every 3 seconds if status is pending
    const interval = setInterval(() => {
      if (status === 'pending' || status === 'checking') {
        checkStatus()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [userId, plan, slug, type, status, router])

  const renderContent = () => {
    switch (status) {
      case 'checking':
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Checking Payment Status
              </CardTitle>
              <CardDescription>
                Please wait while we verify your {paymentType === 'subscription' ? 'subscription' : 'payment'}...
              </CardDescription>
            </CardHeader>
          </Card>
        )
      
      case 'success':
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                {paymentType === 'subscription' ? 'Subscription Active!' : 'Payment Successful!'}
              </CardTitle>
              <CardDescription>
                {paymentType === 'subscription' 
                  ? 'Your Pro subscription is now active. Redirecting to dashboard...'
                  : 'Your payment has been processed successfully. Redirecting to generate your headshots...'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting in 3 seconds...
              </div>
            </CardContent>
          </Card>
        )
      
      case 'pending':
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-yellow-600">
                <Clock className="h-5 w-5" />
                {paymentType === 'subscription' ? 'Subscription Pending' : 'Payment Pending'}
              </CardTitle>
              <CardDescription>
                {paymentType === 'subscription'
                  ? 'We\'re still processing your subscription. This usually takes a few moments.'
                  : 'We\'re still processing your payment. This usually takes a few moments.'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking every 3 seconds...
              </div>
              <Button 
                variant="outline" 
                onClick={() => router.push('/dashboard')}
              >
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        )
      
      case 'failed':
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-red-600">
                <XCircle className="h-5 w-5" />
                {paymentType === 'subscription' ? 'Subscription Issue' : 'Payment Issue'}
              </CardTitle>
              <CardDescription>
                {error || `There was an issue with your ${paymentType === 'subscription' ? 'subscription' : 'payment'}.`}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                If you believe this is an error, please contact support or try again.
              </p>
              <div className="flex gap-2 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/dashboard')}
                >
                  Return to Dashboard
                </Button>
                <Button 
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {renderContent()}
    </div>
  )
} 