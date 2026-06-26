import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, GalleryVerticalEnd, Loader2, Plus } from "lucide-react";
import { Album, getUserAlbums } from "@/actions/album-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { isNew } from "@/lib/utils";

export default async function AlbumsPage() {
  const albums = await getUserAlbums();

  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Albums</h1>
            <p className="text-gray-600">
              Browse, edit, and download your favorite headshots — just pick an album to get started!
            </p>
          </div>
          {
            albums.length > 0 && <Button className="bg-blue-500 hover:bg-blue-600 text-white" asChild>
          <Link href="/photos" className="capitalize">
              <Camera className="w-4 h-4 mr-2" />
              Create more headshost
          </Link>
          </Button>
          }
          

        </div>

        {/* Albums Grid */}
        {albums.length === 0 ? (
          <div className="text-center py-12 sm:py-16 w-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <div className="max-w-md mx-auto">
              <GalleryVerticalEnd className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No albums yet
              </h3>
              <p className="text-gray-600 mb-6">
                Your headshot albums will show up here after you create them.
              </p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white" asChild>
              <Link href="/photos" className="capitalize">
                  <Plus className="w-4 h-4 mr-2" />
                  Create my first album
                  </Link>
                </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) =>
              album.status !== "done" ? (
                <Link
                  key={album.id}
                  href={
                    album.status === "generating" ? `/albums/${album.id}` : `#`
                  }
                  className={`${album.status !== "generating" ? "pointer-events-none" : ""}`}
                >
                  <Card
                    key={album.id}
                    className={`group cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden py-0 h-full relative ${album.status !== "generating" ? "pointer-events-none" : ""}`}
                  >
                    <div className="relative h-full">
                      {/* {isNew(album.created_at) && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white !text-xs rounded-full uppercase">
                          New
                        </Badge>
                      )} */}
                      {/* Album Cover Images */}
                      <div className="grid grid-cols-3 grid-rows-2 gap-2 p-4 pb-0">
                        <div className="relative aspect-[4/5] col-span-2 row-span-2">
                            <Skeleton className="w-full h-full object-cover rounded-md bg-gray-300" />
                        </div>
                        <div className="relative aspect-[4/5] col-span-1 row-span-1">
                            <Skeleton className="w-full h-full object-cover rounded-md bg-gray-300" />
                        </div>
                        <div className="relative aspect-[4/5] col-span-1 row-span-1">
                            <Skeleton className="w-full h-full object-cover rounded-md bg-gray-300" />
                        </div>
                        </div>

                      {/* Album Info */}
                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex gap-2">
                            {album.title}
                          </h3>
                          <Badge
                            variant={
                              album.status === "generating"
                                ? "outline"
                                : "secondary"
                            }
                            className={`text-sm z-40  flex items-center ${album.status === "generating" ? "text-blue-500" : ""} capitalize`}
                          >
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            {album.status}
                          </Badge>
                        </div>
                        {album.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {album.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ) : (
                <AlbumCard key={album.id} album={album} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const AlbumCard = ({ album }: { album: Album }) => {
  return (
    <Link key={album.id} href={`/albums/${album.id}`}>
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden py-0 h-full">
        <div className="relative h-full">
          {/* {isNew(album.created_at) && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white !text-xs rounded-full uppercase">
              New
            </Badge>
          )} */}
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
  );
};
