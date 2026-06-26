import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function EditorLoading() {
  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <Skeleton className="h-9 w-32 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        {/* Editor Tools Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} className="cursor-pointer py-0 border-none shadow-none">
              <CardContent className="p-0">
                {/* Compare slider skeleton */}
                <div className="aspect-[5/4] rounded-xl overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>

                {/* Tool info skeleton */}
                <div className="p-4 pl-0">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
