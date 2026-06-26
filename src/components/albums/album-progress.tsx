"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CheckCircle, AlertCircle, Loader2, Download } from "lucide-react";
import { getAlbumProgress, AlbumProgress } from "@/actions/album-actions";
import { toast } from "sonner";

interface AlbumProgressProps {
  albumId: string;
  initialProgress?: AlbumProgress | null;
}

export default function AlbumProgressComponent({
  albumId,
  initialProgress,
}: AlbumProgressProps) {
  const router = useRouter();
  const [progress, setProgress] = useState<AlbumProgress | null>(
    initialProgress || null
  );
  const [isPolling, setIsPolling] = useState(true);

  // Polling function
  const pollProgress = async () => {
    try {
      const updatedProgress = await getAlbumProgress(albumId);
      if (updatedProgress) {
        // Check if new images were added
        const newImageCount = updatedProgress.currentImageCount;
        const previousImageCount = progress?.currentImageCount || 0;

        if (newImageCount > previousImageCount) {
          const newImagesAdded = newImageCount - previousImageCount;
          toast.success(
            `${newImagesAdded} new headshot${newImagesAdded > 1 ? "s" : ""} generated!`
          );
        }

        setProgress(updatedProgress);

        // Stop polling if generation is complete or failed
        if (
          updatedProgress.status === "done" ||
          updatedProgress.status === "failed"
        ) {
          setIsPolling(false);

          if (updatedProgress.status === "done") {
            toast.success("All your headshots are ready!");
            // Refresh the page to show the completed album
            setTimeout(() => {
              router.refresh();
            }, 1000);
          } else if (updatedProgress.status === "failed") {
            toast.error("Image generation failed. Please try again.");
          }
        }
      }
    } catch (error) {
      console.error("Error polling progress:", error);
    }
  };

  // Set up polling interval
  useEffect(() => {
    if (
      !isPolling ||
      !progress ||
      progress.status === "done" ||
      progress.status === "failed"
    ) {
      router.push(`/albums/${albumId}`);
      return;
    }

    const interval = setInterval(pollProgress, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [isPolling, progress?.status]);

  // Initial load if no initial progress provided
  useEffect(() => {
    if (!progress) {
      pollProgress();
    }
  }, []);

  if (!progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading album...</p>
        </div>
      </div>
    );
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

  const progressPercentage =
    (progress.currentImageCount / progress.maxImages) * 100;
  const remainingImages = progress.maxImages - progress.currentImageCount;

  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <Link href="/albums">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Albums
              </Button>
            </Link>
          </div>
        </div>

        {/* Album Title and Status */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {progress.packTitle}
          </h1>

          {progress.status === "generating" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                <span className="text-lg text-gray-600">
                  Generating your headshots... {progress.currentImageCount} of{" "}
                  {progress.maxImages} completed
                </span>
              </div>

              <div className="max-w-md">
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-gray-500 mt-2">
                  {Math.round(progressPercentage)}% complete.
                </p>
              </div>
            </div>
          )}

          {progress.status === "done" && (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-lg text-green-600">
                Generation complete! {progress.currentImageCount} headshots
                ready
              </span>
            </div>
          )}

          {progress.status === "failed" && (
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-lg text-red-600">
                Generation failed. Please try again or contact support.
              </span>
            </div>
          )}
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Show generated images */}
          {progress.photos.map((photo) => (
            <Card
              key={photo.id}
              className="group overflow-hidden hover:shadow-lg transition-shadow duration-200 py-0 relative"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={`/api/image/${photo.url}?from=output-images`}
                  alt={photo.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <Button
                          size="sm"
                          className="absolute top-2 right-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/80 text-white rounded-full p-2 size-10 cursor-pointer hover:text-blue-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownloadSingle(`/api/image/${photo.url}?from=output-images`, photo.id)
                          }}
                        >
                          <Download className="size-6" />
                        </Button>
            </Card>
          ))}

          {/* Show skeleton placeholders for remaining images */}
          {progress.status === "generating" &&
            Array.from({ length: remainingImages }).map((_, index) => (
              <Card key={`skeleton-${index}`} className="overflow-hidden py-0">
                <div className="relative aspect-[4/5]">
                  <Skeleton className="w-full h-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">Generating...</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>

        {/* Status Messages */}
        {progress.status === "generating" && (
          <div className="mt-8 text-center w-full flex flex-col">
            <p className="text-gray-600">
              Your headshots are being generated. This page will automatically
              update as new images become available.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              You can safely close this page and come back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
