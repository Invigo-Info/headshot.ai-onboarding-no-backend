"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface AlbumImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  className?: string
  skeletonClassName?: string
}

export function AlbumImage({
  src,
  alt,
  className,
  skeletonClassName,
  priority,
  ...props
}: AlbumImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400 text-sm",
          className
        )}
      >
        Failed to load image
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton
          className={cn(
            "absolute inset-0 z-10",
            skeletonClassName,
            `w-[${props.width}] h-[${props.height}]`
          )}
        />
      )}
      <Image
        src={src}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
        {...props}
      />
    </div>
  )
}
