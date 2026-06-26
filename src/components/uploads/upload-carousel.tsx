"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, Download } from "lucide-react"
import { UploadImage } from "@/actions/training-upload-actions"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

interface UploadCarouselProps {
  images: UploadImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
  uploadTitle?: string
}

export function UploadCarousel({ images, currentIndex, onClose, onNavigate, uploadTitle = "training" }: UploadCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(currentIndex)
  const [activeTab, setActiveTab] = useState("Preview")

  // Disable body scroll when carousel is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  useEffect(() => {
    if (!api) return

    // Set initial slide
    api.scrollTo(currentIndex)

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap()
      setCurrent(newIndex)
      onNavigate(newIndex)
    })
  }, [api, currentIndex, onNavigate])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      } else if (event.key === "ArrowLeft") {
        api?.scrollPrev()
      } else if (event.key === "ArrowRight") {
        api?.scrollNext()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [api, onClose])

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
      a.download = `${uploadTitle}-photo-${index + 1}.${url.split(".").pop()?.split("?")[0] || "jpg"}`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const currentImage = images[current];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Desktop Header - Hidden on mobile */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm hidden sm:block">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-6">
            <span className="text-white text-sm font-medium">
              @ {current + 1}/{images.length}
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab("Preview")}
                className={`text-sm px-3 py-1 rounded ${
                  activeTab === "Preview" ? "text-black bg-blue-500" : "text-gray-400"
                }`}
              >
                Preview
              </button>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Header - Only visible on mobile */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/90 via-black/50 to-transparent sm:hidden">
        <div className="flex items-center justify-between p-4 pb-8">
          <span className="text-white text-sm font-medium flex items-center gap-2">
            📷 {current + 1}/{images.length}
          </span>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleDownloadSingle(`/api/image/${currentImage.url}?from=user-uploads`, current)}
              className="text-white hover:bg-white/20 w-10 h-10 rounded-full"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="text-white hover:bg-white/20 w-10 h-10 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="flex-1 flex items-center justify-center pt-16 sm:pt-20 pb-4">
        <Carousel
          setApi={setApi}
          className="w-full h-full max-w-7xl flex items-center justify-center"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="h-full items-center">
            {images.map((image, index) => (
              <CarouselItem key={image.id || index} className="h-full flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center p-4 sm:px-16">
                  <div className="relative max-w-full max-h-full flex items-center justify-center">
                    <Image
                      src={`/api/image/${image.url}?from=user-uploads` || "/placeholder.svg"}
                      alt={image.alt}
                      width={800}
                      height={1000}
                      className="object-contain w-auto h-auto max-w-full max-h-full"
                      style={{
                        maxHeight: 'calc(100vh - 120px)', // Account for header space
                        maxWidth: '100%',
                      }}
                      priority={index === currentIndex}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Desktop Navigation - Hidden on mobile */}
          <CarouselPrevious className="hidden sm:flex left-8 text-black bg-white hover:bg-white/90 border-0 w-12 h-12 shadow-lg" />
          <CarouselNext className="hidden sm:flex right-8 text-black bg-white hover:bg-white/90 border-0 w-12 h-12 shadow-lg" />
        </Carousel>
      </div>

      {/* Desktop Right Sidebar - Hidden on mobile */}
      <div className="absolute right-4 top-16 hidden sm:flex flex-col gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDownloadSingle(`/api/image/${currentImage.url}?from=user-uploads`, current)}
          className="text-white hover:bg-transparent hover:text-blue-500 w-12 h-12 rounded-lg flex flex-col gap-1 cursor-pointer bg-black/20 backdrop-blur-sm"
        >
          <Download className="w-4 h-4" />
          <span className="text-xs">Download</span>
        </Button>
      </div>
    </div>
  )
} 