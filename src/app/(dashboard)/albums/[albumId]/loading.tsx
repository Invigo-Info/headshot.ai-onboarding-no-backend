import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MoreHorizontal, Download, RatioIcon as AspectRatio } from "lucide-react"

export default function AlbumDetailLoading() {
  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" disabled>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button className="hidden sm:flex" variant="outline" size="sm" disabled>
              <AspectRatio className="w-4 h-4 mr-2" />
              Change aspect ratio
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Download className="w-4 h-4 mr-2" />
              Download all
            </Button>
            <Button variant="outline" size="sm" disabled>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Album Title and Description */}
        <div className="mb-8">
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-start overflow-x-auto xs:overflow-hidden gap-2 rounded-none bg-white border-b-2 w-full border-gray-200">
            <div className="flex gap-2">
              <TabsTrigger value="all" className="text-sm sm:text-base border-2 pb-2 data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-600 cursor-pointer rounded-none data-[state=active]:shadow-none">
                <Skeleton className="h-4 w-20" />
              </TabsTrigger>
              <TabsTrigger value="favorites" className="text-sm sm:text-base border-2 pb-2 data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-600 cursor-pointer rounded-none data-[state=active]:shadow-none">
                <Skeleton className="h-4 w-16" />
              </TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 15 }).map((_, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden hover:shadow-lg transition-shadow duration-200 py-0"
                >
                  <div className="relative aspect-[4/5]">
                    <Skeleton className="w-full h-full rounded-none" />

                    {/* Action buttons overlay skeleton */}
                    <div className="flex flex-col gap-2 absolute top-3 right-2">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <Skeleton className="w-10 h-10 rounded-full" />
                    </div>

                    {/* Bottom buttons overlay skeleton */}
                    <div className="flex gap-2 absolute bottom-3 left-3 right-3 justify-between">
                      <Skeleton className="h-8 w-16 rounded-full" />
                      <Skeleton className="w-10 h-10 rounded-full" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden hover:shadow-lg transition-shadow duration-200 py-0"
                >
                  <div className="relative aspect-[4/5]">
                    <Skeleton className="w-full h-full rounded-none" />

                    {/* Action buttons overlay skeleton */}
                    <div className="flex flex-col gap-2 absolute top-3 right-2">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <Skeleton className="w-10 h-10 rounded-full" />
                    </div>

                    {/* Bottom buttons overlay skeleton */}
                    <div className="flex gap-2 absolute bottom-3 left-3 right-3 justify-between">
                      <Skeleton className="h-8 w-16 rounded-full" />
                      <Skeleton className="w-10 h-10 rounded-full" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
