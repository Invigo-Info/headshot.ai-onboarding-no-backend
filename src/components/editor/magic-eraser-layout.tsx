'use client'

import { useRef, useState, useEffect } from 'react'
import { MagicEraserPanel } from '@/components/editor'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface MagicEraserLayoutProps {
  editorTool: string
  imageSrc: string
  userId: string
  width?: number
  height?: number
}

export function MagicEraserLayout({ editorTool, imageSrc, userId, width, height }: MagicEraserLayoutProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [brushSize, setBrushSize] = useState(20)
  const [isDrawing, setIsDrawing] = useState(false)
  const [scaleRatio, setScaleRatio] = useState({ x: 1, y: 1 })

  const handleBrushSizeChange = (newSize: number[]) => {
    setBrushSize(newSize[0])
  }

  // Get actual image dimensions
  const getActualImageDimensions = async (imageUrl: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = document.createElement('img')
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight })
      }
      img.src = imageUrl
    })
  }

  // Helper function to get coordinates from mouse or touch event
  const getEventCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const rect = canvas?.getBoundingClientRect()
    if (!canvas || !rect) return null

    let clientX: number
    let clientY: number

    if ('touches' in e) {
      // Touch event
      if (e.touches.length === 0) return null
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }

    // Get display coordinates
    const displayX = clientX - rect.left
    const displayY = clientY - rect.top

    // Convert to actual image coordinates
    const actualX = displayX * scaleRatio.x
    const actualY = displayY * scaleRatio.y

    return { actualX, actualY }
  }

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault() // Prevent scrolling on touch
    setIsDrawing(true)
    draw(e)  
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault() // Prevent scrolling on touch
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const coordinates = getEventCoordinates(e)
    if (!coordinates) return

    const { actualX, actualY } = coordinates

    ctx.globalCompositeOperation = "source-over"
    ctx.fillStyle = "rgba(255, 255, 255, 1)" // White for the mask
    ctx.beginPath()
    ctx.arc(actualX, actualY, (brushSize / 2) * Math.min(scaleRatio.x, scaleRatio.y), 0, 2 * Math.PI)
    ctx.fill()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  // Setup canvas when image loads
  useEffect(() => {
    const setupCanvas = async () => {
      const canvas = canvasRef.current
      const image = imageRef.current
      
      if (!canvas || !image) return

      // Prevent default touch behaviors on the canvas
      const preventTouch = (e: TouchEvent) => {
        e.preventDefault()
      }

      canvas.addEventListener('touchstart', preventTouch, { passive: false })
      canvas.addEventListener('touchmove', preventTouch, { passive: false })
      canvas.addEventListener('touchend', preventTouch, { passive: false })

      // Get actual image dimensions
      const actualDimensions = await getActualImageDimensions(imageSrc)
      const resizeCanvas = () => {
        const container = image.parentElement
        if (!container) return

        const containerRect = container.getBoundingClientRect()

        const imageAspectRatio = actualDimensions.width / actualDimensions.height
        const containerAspectRatio = containerRect.width / containerRect.height

        let displayedWidth: number
        let displayedHeight: number

        if (imageAspectRatio > containerAspectRatio) {
          // Image is limited by width
          displayedWidth = containerRect.width
          displayedHeight = containerRect.width / imageAspectRatio
        } else {
          // Image is limited by height
          displayedHeight = containerRect.height
          displayedWidth = containerRect.height * imageAspectRatio
        }

        // Set canvas to actual image dimensions
        canvas.width = actualDimensions.width
        canvas.height = actualDimensions.height

        // Set display size to match the contained image
        canvas.style.width = `${displayedWidth}px`
        canvas.style.height = `${displayedHeight}px`

        // Position the canvas over the image
        canvas.style.position = 'absolute'
        canvas.style.top = `${(containerRect.height - displayedHeight) / 2}px`
        canvas.style.left = `${(containerRect.width - displayedWidth) / 2}px`
        canvas.style.cursor = 'crosshair'
        canvas.style.borderRadius = '0.5rem'

        // Calculate scale ratio for coordinate conversion
        const newScaleRatio = {
          x: actualDimensions.width / displayedWidth,
          y: actualDimensions.height / displayedHeight,
        }
        setScaleRatio(newScaleRatio)
      }

      // Resize canvas when image loads
      if (image.complete) {
        resizeCanvas()
      } else {
        image.onload = resizeCanvas
      }

      // Handle window resize
      window.addEventListener("resize", resizeCanvas)

      return () => {
        window.removeEventListener("resize", resizeCanvas)
        canvas.removeEventListener('touchstart', preventTouch)
        canvas.removeEventListener('touchmove', preventTouch)
        canvas.removeEventListener('touchend', preventTouch)
      }
    }

    setupCanvas()
  }, [imageSrc])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row relative">
        <Button variant="outline" className="absolute top-4 left-4 lg:top-8 lg:left-8 z-10" asChild>
          <Link href={`/editor/${editorTool}`} className="inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
        </Button>
        
        {/* Image Section with Canvas Overlay */}
        <div className="flex-1 flex items-center justify-center pt-20 pb-4 lg:pt-24 lg:pb-8 lg:p-8 px-4">
          <div className="relative max-w-2xl w-full">
            <div className="relative w-full mx-auto max-w-lg" style={{aspectRatio: width && height ? width / height : 4 / 3}}>
              <Image
                ref={imageRef}
                src={imageSrc}
                alt="Image to edit"
                fill
                className="object-contain rounded-lg"
                priority
              />
              {/* Canvas overlay for drawing mask */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 cursor-crosshair rounded-lg touch-none select-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                onTouchCancel={stopDrawing}
                style={{
                  backgroundColor: "transparent",
                  touchAction: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <ScrollArea className="max-h-full lg:max-h-screen h-full">
          <div className="max-w-full lg:max-w-sm bg-white lg:border-l px-4 lg:px-0">
            <MagicEraserPanel
              currentImageUrl={imageSrc}
              userId={userId}
              onBrushSizeChange={handleBrushSizeChange}
              canvasRef={canvasRef}
            />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  )
} 