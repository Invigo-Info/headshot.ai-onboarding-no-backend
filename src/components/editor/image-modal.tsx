"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { Download} from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

interface ImageItem {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
  path: string
}

interface ImageModalProps {
  images: ImageItem[]
  initialIndex: number
  children: React.ReactNode
}

export const ImageModal: React.FC<ImageModalProps> = ({
  images,
  initialIndex,
  children
}) => {
  const [open, setOpen] = useState(false)
  const [api, setApi] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  React.useEffect(() => {
    if (!api) return

    setCurrentIndex(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap())
    })
  }, [api])

  React.useEffect(() => {
    if (open && api) {
      api.scrollTo(initialIndex)
    }
  }, [open, initialIndex, api])

  const handleDownload = async (image: ImageItem) => {
    try {
      const response = await fetch(`/api/image/${image.url}?from=edited-images`)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `image_${uuidv4()}.${blob.type.split('/')[1]}`
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogOverlay className='bg-black/60 backdrop-blur-sm h-full' />
      <DialogContent
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen  max-w-none max-h-none p-0 bg-transparent border-none rounded-none shadow-none"
        onKeyDown={handleKeyDown}
      >
        <DialogTitle className="sr-only">Image Gallery</DialogTitle>
        <div className="relative w-full  flex items-center justify-center">
          {/* Close button */}
          {/* Download button */}
          <Button
            variant="default"
            size="lg"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-white hover:bg-white/20"
            onClick={() => handleDownload(images[currentIndex])}
          >
            Download <Download className="h-6 w-6" />
          </Button>

          {/* Carousel */}
          <Carousel
            setApi={setApi}
            className="w-full h-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="h-full items-center">
              {images.map((image, index) => (
                <CarouselItem key={image.id} className="h-full">
                  <div className="flex items-center justify-center h-full">
                    <div className="relative">
                      <Image
                        src={`/api/image/${image.url}?from=edited-images`}
                        alt={image.alt}
                        width={image.width || 800}
                        height={image.height || 600}
                        className="w-full h-auto max-w-full max-h-full"
                        priority={Math.abs(index - currentIndex) <= 2}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation arrows - only show if more than 1 image */}
            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70 border-white/20 text-white" />
                <CarouselNext className="right-4 bg-black/50 hover:bg-black/70 border-white/20 text-white" />
              </>
            )}
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  )
}
