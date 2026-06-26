import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

export default function AlbumsLoading() {
  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start mb-8">
          <div>
            <Skeleton className="h-9 w-32 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white" disabled>
            <Camera className="w-4 h-4 mr-2" />
            Create more photos
          </Button>
        </div>

        {/* Albums Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden py-0 h-full">
              <div className="relative h-full">
                {/* Album Cover Images Skeleton */}
                <div className="grid grid-cols-3 grid-rows-2 gap-2 p-4 pb-0">
                  <div className="relative aspect-[4/5] col-span-2 row-span-2">
                    <Skeleton className="w-full h-full rounded-md" />
                  </div>
                  <div className="relative aspect-[4/5] col-span-1 row-span-1">
                    <Skeleton className="w-full h-full rounded-md" />
                  </div>
                  <div className="relative aspect-[4/5] col-span-1 row-span-1">
                    <Skeleton className="w-full h-full rounded-md" />
                  </div>
                </div>

                {/* Album Info Skeleton */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
