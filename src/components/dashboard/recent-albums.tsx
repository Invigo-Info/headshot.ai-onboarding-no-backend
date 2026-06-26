import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, ChevronRight, Loader2 } from "lucide-react"
import { Album } from "@/actions/album-actions"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { isNew } from "@/lib/utils"

interface RecentAlbumsProps {
  albums: Album[]
}

export function RecentAlbums({ albums }: RecentAlbumsProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Recent Albums</h2>
        <Link href="/albums">
          <Button variant="outline" size="sm" className="cursor-pointer">
            See all<ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {/* Create More Albums Card */}
        {/* <Link href="/photos">
          <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden py-0 h-full border-2 border-dashed border-gray-200 hover:border-blue-300">
            <div className="relative h-full flex items-center justify-center">
              <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
                <SwitchCamera className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2 text-center">
                  Create more photos
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Explore all our packs and create stunning photos effortlessly.
                </p>
              </div>
            </div>
          </Card>
        </Link> */}

        {/* Recent Albums */}
        {albums.slice(0, 3).map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  )
}

const AlbumCard = ({ album }: { album: Album }) => {
  if (album.status !== 'done') {
    return (
      <Link
        key={album.id}
        href={album.status === "generating" ? `/albums/${album.id}` : `#`}
        className={`${album.status !== "generating" ? 'pointer-events-none' : ''}`}
      >
        <Card className={`group cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden py-0 h-full relative ${album.status !== 'generating' ? 'pointer-events-none' : ''}`}>
          <div className="relative h-full">
            {/* Album Cover Images */}
            <div className="grid grid-cols-3 grid-rows-2 gap-2 p-4 pb-0">
              <div className="relative aspect-[4/5] col-span-2 row-span-2">
                {album.coverImages[0] ? (
                  <Image
                    src={`/api/image/${album.coverImages[0]}?from=output-images`}
                    alt={album.title}
                    fill
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <Skeleton className="w-full h-full object-cover rounded-md bg-gray-300" />
                )}
              </div>
              <div className="relative aspect-[4/5] col-span-1 row-span-1">
                {album.coverImages[1] ? (
                  <Image
                    src={`/api/image/${album.coverImages[1]}?from=output-images`}
                    alt={album.title}
                    fill
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <Skeleton className="w-full h-full object-cover rounded-md bg-gray-300" />
                )}
              </div>
              <div className="relative aspect-[4/5] col-span-1 row-span-1">
                {album.coverImages[2] ? (
                  <Image
                    src={`/api/image/${album.coverImages[2]}?from=output-images`}
                    alt={album.title}
                    fill
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <Skeleton className="w-full h-full object-cover rounded-md bg-gray-300" />
                )}
              </div>
            </div>

            {/* Album Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {album.title}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center gap-1">
                  <Badge variant={album.status === "generating" ? "outline" : "secondary"} className={`text-sm z-40 flex items-center ${album.status === "generating" ? 'text-blue-500' : ''} capitalize`}>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    {album.status}
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(album.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link key={album.id} href={`/albums/${album.id}`}>
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden py-0 h-full">
        <div className="relative h-full">
          {/* Album Cover Images */}
          <div className="relative overflow-hidden p-4 pb-0">
            {album.coverImages.length >= 3 && (
              <div className="grid grid-cols-3 grid-rows-2 gap-2">
                <div className="relative aspect-[4/5] col-span-2 row-span-2">
                  <Image
                    src={`/api/image/${album.coverImages[0]}?from=output-images`}
                    alt={album.title}
                    fill
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="relative aspect-[4/5] col-span-1 row-span-1">
                  <Image
                    src={`/api/image/${album.coverImages[1]}?from=output-images`}
                    alt={album.title}
                    fill
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="relative aspect-[4/5] col-span-1 row-span-1">
                  <Image
                    src={`/api/image/${album.coverImages[2]}?from=output-images`}
                    alt={album.title}
                    fill
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            )}

            {album.coverImages.length <= 2 && (
              <div className="grid grid-cols-3 grid-rows-2 gap-2">
                <div className="relative aspect-[4/5] col-span-2 row-span-2">
                  <Camera className="w-12 h-12 text-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="relative aspect-[4/5] col-span-1 row-span-1">
                  <Camera className="w-12 h-12 text-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="relative aspect-[4/5] col-span-1 row-span-1">
                  <Camera className="w-12 h-12 text-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}
          </div>

          {/* Album Info */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex gap-2">
              {album.title} {isNew(album.created_at) && (
                                      <Badge className="bg-green-500 hover:bg-green-600 text-white !text-xs rounded-full uppercase">
                                        New
                                      </Badge>
                                    )}
            </h3>
            <div className="flex justify-between items-center mt-1">
              <div className="flex items-center text-sm text-gray-600">
                <Camera className="w-4 h-4 mr-1" />
                <span>{album.photoCount} headshots</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(album.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
} 