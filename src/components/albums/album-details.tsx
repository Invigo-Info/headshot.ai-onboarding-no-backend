"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  Download,
  MoreHorizontal,
  // Share2,
  Upload,
  Trash2,
  RatioIcon as AspectRatio,
  Edit,
  Heart,
  Fullscreen,
} from "lucide-react"
import { ImageCarousel } from "@/components/albums/image-carousel"
import { Album, AlbumImage, setFavorite, deleteAlbum } from "@/actions/album-actions"
import { ReviewEligibility } from "@/actions/review-actions"
import ReviewModal from "@/components/reviews/review-modal"
import JSZip from "jszip"

interface AlbumDetailsProps {
  album: Album
  reviewEligibility?: ReviewEligibility | null
}

export default function AlbumDetails({ album, reviewEligibility }: AlbumDetailsProps) {
  const router = useRouter()
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<"1/1" | "4/5" | "16/9">("4/5");
  const [images, setImages] = useState<AlbumImage[]>(album.photos || [])
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)


const toggleAspectRatio = () => {
  setAspectRatio(aspectRatio === "1/1" ? "4/5" : "1/1")
}

  if (!album) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Album not found</h1>
          <Link href="/albums">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Albums
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleFavouriteImageClick = (id: string) => {
    setSelectedImageIndex(images.findIndex(image => image.id === id))
  }

  const handleCloseCarousel = () => {
    setSelectedImageIndex(null)
  }

  const handleDownloadAll = async () => {
    setIsDownloading(true)
    
    try {
      const zip = new JSZip()
      
      // Use Promise.all to wait for all downloads to complete
      const downloadPromises = album.photos?.map(async (photo, index) => {
        try {
          const response = await fetch(`/api/image/${photo.url}?from=output-images`)
          if (!response.ok) {
            throw new Error(`Failed to fetch image ${index + 1}`)
          }
          
          const blob = await response.blob()
          
          // Get file extension from content type or default to jpg
          const extension = blob.type.split('/')[1] || 'jpg'
          const filename = `photo-${index + 1}.${extension}`
          
          zip.file(filename, blob)
        } catch (error) {
          console.error(`Error downloading image ${index + 1}:`, error)
        }
      })
      
      // Wait for all downloads to complete
      await Promise.all(downloadPromises || [])
      
      // Generate zip blob
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      
      // Create download link
      const downloadUrl = URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `album-${album.title}.zip`
      document.body.appendChild(a)
      a.click()
      
      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Error creating zip file:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleDownloadSingle = async (url: string, id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
const extension = blob.type.split('/')[1] || 'jpg'

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `photo-${id}.${extension}`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleFavorite = async (e: React.MouseEvent, imageId: string, albumId: string, isFavorite: boolean) => {
    e.stopPropagation()
    const { success } = await setFavorite(imageId, albumId, isFavorite)
    if (success) {
      setImages(images.map(image => image.id === imageId ? { ...image, favourite: isFavorite } : image))
    }
    return null;
  }

  const handleDeleteAlbum = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteAlbum(album.id)
      if (result.success) {
        router.push('/albums')
      } else {
        console.error('Failed to delete album:', result.error)
        // You might want to show a toast notification here
      }
    } catch (error) {
      console.error('Error deleting album:', error)
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }
  return (
    <>
      <div className="min-h-screen ">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <Link href="/albums">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Button className="hidden sm:flex" variant="outline" size="sm" onClick={toggleAspectRatio}>
                <AspectRatio className="w-4 h-4 mr-2" />
                Change aspect ratio
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadAll}
                disabled={isDownloading || album.photos?.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? 'Downloading...' : 'Download all'}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Album
                  </DropdownMenuItem> */}
                  <DropdownMenuItem>
                    <Link href={`/uploads/${album.training_id}`} className="flex items-center">
                    <Upload className="w-4 h-4 mr-2" />
                    View uploads
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete album
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Album Title and Description */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{album.title}</h1>
            {album.description && <p className="text-gray-600">{album.description}</p>}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex justify-start  overflow-x-auto xs:overflow-hidden gap-2 rounded-none bg-white border-b-2 w-full border-gray-200">
              <div className="flex gap-2">
              <TabsTrigger value="all" className="text-sm sm:text-base border-2 pb-2 data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-600 cursor-pointer rounded-none data-[state=active]:shadow-none">
                All Photos ({album.photoCount})
              </TabsTrigger>
              <TabsTrigger value="favorites" className="text-sm sm:text-base border-2 pb-2 data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-600 cursor-pointer rounded-none data-[state=active]:shadow-none">Favorites</TabsTrigger>
              {/* <TabsTrigger value="edited" className="text-sm sm:text-base border-2 pb-2 data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-600 cursor-pointer rounded-none data-[state=active]:shadow-none">Edited Photos</TabsTrigger> */}
              </div>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {images?.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No photos available in this album</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {images.map((photo, index) => (
                    <Card
                      key={photo.id}
                      className="group  overflow-hidden hover:shadow-lg transition-shadow duration-200 py-0" 
                      onClick={() => handleImageClick(index)}
                    >
                      <div className="relative" style={{ aspectRatio: aspectRatio }}>
                        <Image src={`/api/image/${photo.url}?from=output-images` || "/placeholder.svg"} alt={photo.alt} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        <div className="flex flex-col gap-2 absolute top-3 right-2">
                        <Button
                          size="sm"
                          className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white rounded-full p-2 size-10 cursor-pointer hover:text-blue-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownloadSingle(`/api/image/${photo.url}?from=output-images`, photo.id)
                          }}
                        >
                          <Download className="size-6" />
                        </Button>

                        <Button
                          size="sm"
                          className=" opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white rounded-full p-2 size-10 cursor-pointer hover:text-blue-500 "
                          onClick={(e) => {
                            handleFavorite(e, photo.id, album.id, !photo.favourite)
                          }}
                        >
                          <Heart className={`size-6 ${photo.favourite ? 'text-blue-500' : 'text-white'}`} />
                        </Button>
                        </div>

                        <div className="flex gap-2 absolute bottom-3 left-3 right-3 justify-between">
                        <Button
                        size="sm"
                        className=" opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white cursor-pointer hover:text-blue-500"
                        asChild
                      >
                     <Link href={`/editor/album/${album.id}/${photo.id}`}>    <Edit className="w-3 h-3 mr-1" />
                        Edit</Link>
                      </Button>
                      <Button
                        size="sm"
                        className=" opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white cursor-pointer hover:text-blue-500"
                      >
                     <Fullscreen className="size-6" />
                      </Button>

                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              {images.filter(photo => photo.favourite).length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No favorite photos yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                 {images.filter(photo => photo.favourite).map((photo) => (
                    <Card
                      key={photo.id}
                      className="group  overflow-hidden hover:shadow-lg transition-shadow duration-200 py-0" 
                      onClick={() => handleFavouriteImageClick(photo.id)}
                    >
                      <div className="relative" style={{ aspectRatio: aspectRatio }}>
                        <Image src={`/api/image/${photo.url}?from=output-images` || "/placeholder.svg"} alt={photo.alt} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        <div className="flex flex-col gap-2 absolute top-3 right-2">
                        <Button
                          size="sm"
                          className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white rounded-full p-2 size-10 cursor-pointer hover:text-blue-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownloadSingle(`/api/image/${photo.url}?from=output-images`, photo.id)
                          }}
                        >
                          <Download className="size-6" />
                        </Button>

                        <Button
                          size="sm"
                          className=" opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white rounded-full p-2 size-10 cursor-pointer hover:text-blue-500 "
                          onClick={(e) => {
                            handleFavorite(e, photo.id, album.id, !photo.favourite)
                          }}
                        >
                          <Heart className={`size-6 ${photo.favourite ? 'text-blue-500' : 'text-white'}`} />
                        </Button>
                        </div>

                        <div className="flex gap-2 absolute bottom-3 left-3 right-3 justify-between">
                        <Button
                        size="sm"
                        className=" opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white cursor-pointer hover:text-blue-500"
                        asChild
                      >
                     <Link href={`/editor/album/${album.id}/${photo.id}`}>    <Edit className="w-3 h-3 mr-1" />
                        Edit</Link>
                      </Button>
                      <Button
                        size="sm"
                        className=" opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white cursor-pointer hover:text-blue-500"
                      >
                     <Fullscreen className="size-6" />
                      </Button>

                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="edited" className="mt-6">
            {images.filter(photo => photo.edited).length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No edited photos yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                 {images.filter(photo => photo.edited).map((photo, index) => (
                    <Card
                      key={photo.id}
                      className="group  overflow-hidden hover:shadow-lg transition-shadow duration-200 py-0" 
                      onClick={() => handleImageClick(index)}
                    >
                      <div className="relative" style={{ aspectRatio: aspectRatio }}>
                        <Image src={`/api/image/${photo.url}?from=output-images` || "/placeholder.svg"} alt={photo.alt} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        <div className="flex flex-col gap-2 absolute top-3 right-2">
                        <Button
                          size="sm"
                          className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white rounded-full p-2 size-10 cursor-pointer hover:text-blue-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownloadSingle(`/api/image/${photo.url}?from=output-images`, photo.id)
                          }}
                        >
                          <Download className="size-6" />
                        </Button>

                        <Button
                          size="sm"
                          className=" opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white rounded-full p-2 size-10 cursor-pointer hover:text-blue-500 "
                          onClick={(e) => {
                            handleFavorite(e, photo.id, album.id, !photo.favourite)
                          }}
                        >
                          <Heart className={`size-6 ${photo.favourite ? 'text-blue-500' : 'text-white'}`} />
                        </Button>
                        </div>

                        <div className="flex gap-2 absolute bottom-3 left-3 right-3 justify-between">
                        <Button
                        size="sm"
                        className=" opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white cursor-pointer hover:text-blue-500"
                        asChild
                      >
                     <Link href={`/editor/album/${album.id}/${photo.id}`}>    <Edit className="w-3 h-3 mr-1" />
                        Edit</Link>
                      </Button>
                      <Button
                        size="sm"
                        className=" opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white cursor-pointer hover:text-blue-500"
                      >
                     <Fullscreen className="size-6" />
                      </Button>

                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Image Carousel */}
      {selectedImageIndex !== null && (
        <ImageCarousel
          images={album.photos || []}
          currentIndex={selectedImageIndex}
          onClose={handleCloseCarousel}
          onNavigate={setSelectedImageIndex}
          albumId={album.id}
          bucket="output-images"
        />
      )}

      {/* Delete Album Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Album</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{album.title}&quot;? This action cannot be undone and will permanently delete all photos in this album.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAlbum}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete Album'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Review Modal */}
      {reviewEligibility?.shouldShow && (
        <ReviewModal
          albumId={album.id}
          userId={reviewEligibility.userId}
          userName={reviewEligibility.userName}
          userEmail={reviewEligibility.userEmail}
          firstHeadshotUrl={reviewEligibility.firstHeadshotUrl}
        />
      )}
    </>
  )
}
