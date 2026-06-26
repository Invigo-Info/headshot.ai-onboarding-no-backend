import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Error | AI Headshot Generator",
  description: "An error occurred while processing your request. Please try again later.",
}

export default async function Page({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const params = await searchParams

  return (
    <div className="flex  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className='bg-red-50 shadow-none border-red-400'>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Sorry, something went wrong.</CardTitle>
            </CardHeader>
            <CardContent className='text-center'>
              {params?.error ? (
                <p className="text-sm text-destructive">{params.error}</p>
              ) : (
                <p className="text-sm text-destructive">An unspecified error occurred.</p>
              )}
              <Link href="/login" className='text-sm '>
              <Button
                variant="default"
                className='mt-4'
              >
                Go back to Login
              </Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
