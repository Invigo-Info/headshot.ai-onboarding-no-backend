"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
  Trash2,
} from "lucide-react"
import { UploadCarousel } from "@/components/uploads/upload-carousel"
import { Upload } from "@/actions/training-upload-actions"
import { deleteUploadedImages } from "@/actions/upload-actions"
import JSZip from "jszip"

interface UploadDetailsProps {
  upload: Upload
}

export default function UploadDetails({ upload }: UploadDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  if (!upload) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Training upload not found</h1>
          <Link href="/uploads">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Uploads
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleCloseCarousel = () => {
    setSelectedImageIndex(null)
  }

  const handleDownloadAll = async () => {
    setIsDownloading(true)
    
    try {
      const zip = new JSZip()
      
      // Use Promise.all to wait for all downloads to complete
      const downloadPromises = upload.photos.map(async (photo, index) => {
        try {
          const response = await fetch(`/api/image/${photo.url}?from=user-uploads`)
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
      await Promise.all(downloadPromises)
      
      // Generate zip blob
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      
      // Create download link
      const downloadUrl = URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `upload-${upload.title}.zip`
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

  const handleDownloadSingle = async (url: string, index: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `photo-${index + 1}.jpg`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleDeleteImages = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteUploadedImages(upload.id)
      if (result.success) {
        // Refresh the page to show updated state
        window.location.reload()
      } else {
        console.error('Failed to delete images:', result.error)
        // You might want to show a toast notification here
      }
    } catch (error) {
      console.error('Error deleting images:', error)
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  return (
    <>
      <div className="min-h-screen ">
        <div className="max-w-full mx-auto sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <Link href="/uploads">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadAll}
                className="cursor-pointer"
                disabled={isDownloading || upload.photos.length === 0}
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
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={upload.photos.length === 0}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete images
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Upload Title and Info */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{upload.title}</h1>
            <p className="text-gray-600">
              Training Status: <span className="capitalize font-medium">{upload.status}</span> • 
              <span className="ml-1">{upload.photoCount} images</span>
            </p>
          </div>

          {/* Images Grid - No Tabs, Just Display All Images */}
          <div className="mb-6">
            
            {upload.photos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No training images available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {upload.photos.map((photo, index) => (
                  <Card
                    key={photo.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-200 py-0" 
                    onClick={() => handleImageClick(index)}
                  >
                    <div className="relative aspect-[4/5]">
                      <Image src={`/api/image/${photo.url}?from=user-uploads` || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" />
                      <Button
                          size="sm"
                          className="absolute top-3 right-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white rounded-full p-2 size-10 cursor-pointer hover:text-blue-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownloadSingle(`/api/image/${photo.url}?from=user-uploads`, index)
                          }}
                        >
                          <Download className="size-6" />
                        </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      {selectedImageIndex !== null && (
        <UploadCarousel
          images={upload.photos}
          currentIndex={selectedImageIndex}
          onClose={handleCloseCarousel}
          onNavigate={setSelectedImageIndex}
          uploadTitle={upload.title}
        />
      )}

      {/* Delete Images Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Training Images</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all uploaded images for &quot;{upload.title}&quot;? This action cannot be undone and will permanently delete all {upload.photoCount} training images. The training model will remain available for generating new headshots.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteImages}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete Images'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 