import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { RequiredClaims, UserMetadata } from "@supabase/supabase-js"

interface DashboardOverviewProps {
  user: RequiredClaims & UserMetadata
}

export function DashboardOverview({ user }: DashboardOverviewProps) {
  // Get user's name from metadata or email
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Your Overview</h1>
        <p className="text-gray-600">
          Welcome back, {userName}!
        </p>
      </div>
      <Link href="/photos">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white capitalize">
          <Camera className="w-4 h-4 mr-2" />
          Create more headshots
        </Button>
      </Link>
    </div>
  )
} 