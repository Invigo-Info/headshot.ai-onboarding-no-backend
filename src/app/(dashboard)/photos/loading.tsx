import { Skeleton } from "@/components/ui/skeleton"

export default function PhotosLoading() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 items-start">
            <div>
              <Skeleton className="h-9 w-32 mb-2" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
          </div>
        </div>
      </header>

      {/* Photo Packs Grid Skeleton */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-900"
            >
              {/* Main background skeleton */}
              <Skeleton className="w-full h-full" />

              {/* Content overlay skeleton */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

              {/* Bottom content skeleton */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <Skeleton className="h-6 w-32 mb-2 bg-white/20" />
                <Skeleton className="h-4 w-full mb-1 bg-white/20" />
                <Skeleton className="h-4 w-3/4 mb-4 bg-white/20" />

                {/* Payment badge skeleton */}
                <Skeleton className="h-6 w-32 bg-white/20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
