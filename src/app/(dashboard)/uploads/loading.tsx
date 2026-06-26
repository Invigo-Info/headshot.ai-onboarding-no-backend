import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function UploadsLoading() {
  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start mb-8">
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white" disabled>
            <Upload className="w-4 h-4 mr-2" />
            Create More Headshots
          </Button>
        </div>

        {/* Uploads Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="group cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden py-0 relative">
              {/* Upload Cover Image Skeleton */}
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>

              {/* Upload Info Skeleton */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
