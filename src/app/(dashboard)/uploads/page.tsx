import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Camera, ImagesIcon, Plus, Upload } from "lucide-react"
import { getUserUploads, Uploads } from "@/actions/training-upload-actions"
import { Badge } from "@/components/ui/badge"

export default async function UploadsPage() {
  const uploads = await getUserUploads();
  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Uploads</h1>
            <p className="text-gray-600">
             View the selfies you&apos;ve uploaded to generate your AI headshots.
            </p>
          </div>
          {uploads.length > 0 && (
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" asChild>
              <Link href="/photos" className="capitalize">
                <Plus className="w-4 h-4 mr-2" />
                Create More Headshots
              </Link>
            </Button>
          )}
        </div>

        {/* Uploads Grid */}
        {uploads.length === 0 ? (
          <div className="text-center py-12 sm:py-16 w-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <div className="max-w-md mx-auto">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No uploads yet
              </h3>
              <p className="text-gray-600 mb-6">
                Upload 8-12 selfies to create your AI headshots.
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white" asChild>
                <Link href="/photos" className="capitalize">
                  <ArrowRight className="w-4 h-4 mr-1" />
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploads.map((upload) => (
              <UploadCard key={upload.id} upload={upload} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const UploadCard = ({ upload }: { upload: Uploads }) => {
  const isDeleted = upload.photoCount <= 0;

  return (
    <Link
      href={isDeleted ? "#" : `/uploads/${upload.id}`}
      className={isDeleted ? "pointer-events-none" : ""}
    >
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden py-0 h-full relative">
        {isDeleted && (
          <Badge variant="destructive" className="rounded-full text-sm absolute top-2 right-2 z-20">
            Deleted
          </Badge>
        )}
        <div className="relative h-full">
          {/* Upload Cover Images */}
          <div className="relative overflow-hidden p-4 pb-0">
            {upload.coverImages.length >= 3 ? (
              <div className="grid grid-cols-3 grid-rows-2 gap-2">
                <div className="relative aspect-[4/5] col-span-2 row-span-2">
                  <Image
                    src={`/api/image/${upload.coverImages[0]}?from=user-uploads`}
                    alt={upload.title}
                    fill
                    className="w-full h-full object-cover object-top rounded-md"
                  />
                </div>
                <div className="relative aspect-[4/5] col-span-1 row-span-1">
                  <Image
                    src={`/api/image/${upload.coverImages[1]}?from=user-uploads`}
                    alt={upload.title}
                    fill
                    className="w-full h-full object-cover object-top rounded-md"
                  />
                </div>
                <div className="relative aspect-[4/5] col-span-1 row-span-1">
                  <Image
                    src={`/api/image/${upload.coverImages[2]}?from=user-uploads`}
                    alt={upload.title}
                    fill
                    className="w-full h-full object-cover object-top rounded-md"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 grid-rows-2 gap-2">
                <div className="relative aspect-[4/5] col-span-2 row-span-2">
                  {upload.coverImages.length >= 1 ? (
                    <Image
                      src={`/api/image/${upload.coverImages[0]}?from=user-uploads`}
                      alt={upload.title}
                      fill
                      className="w-full h-full object-cover object-top rounded-md"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
                <div className="relative aspect-[4/5] col-span-1 row-span-1">
                  {upload.coverImages.length >= 2 ? (
                    <Image
                      src={`/api/image/${upload.coverImages[1]}?from=user-uploads`}
                      alt={upload.title}
                      fill
                      className="w-full h-full object-cover object-top rounded-md"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
                <div className="relative aspect-[4/5] col-span-1 row-span-1">
                  <Camera className="w-12 h-12 text-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}
          </div>

          {/* Upload Info */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex gap-2">
              {upload.title}
              
            </h3>
            <div className="flex justify-between items-center mt-1">
              <div className="flex items-center text-sm text-gray-600">
                <ImagesIcon className="w-4 h-4 mr-1" />
                <span>{upload.photoCount} {upload.photoCount === 1 ? "photo" : "photos"}</span>
              </div>
              <span className="text-sm text-gray-500">
                {/* {new Date(upload.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} */}
                {upload.status === "ready" && (
                <Badge className="bg-green-500 hover:bg-green-600 text-white !text-xs rounded-full uppercase">
                  Ready
                </Badge>
              )}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
