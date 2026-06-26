"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider"

const tools = [
  {
    title: "Background Changer",
    description: "Change the background of your images to create the perfect backdrop.",
    beforeSrc: "/assets/editor-page/background-changer/1b.webp",
    afterSrc: "/assets/editor-page/background-changer/1a.jpg",
    href: "/photo-editor/background-changer",
    internalhref: "/editor/background-changer",
  },
  {
    title: "Blemish Remover",
    description: "Erase acne, spots, or redness for smooth, natural-looking skin.",
    beforeSrc: "/assets/editor-page/blemish-remover/1b.webp",
    afterSrc: "/assets/editor-page/blemish-remover/1a.jpeg",
    href: "/photo-editor/blemish-remover",
    internalhref: "/editor/blemish-remover",
  },
  {
    title: "Color Correction",
    description: "Fix tones, lighting, and exposure to restore vibrant, balanced colors.",
    beforeSrc: "/assets/editor-page/color-correction/1b.jpg",
    afterSrc: "/assets/editor-page/color-correction/1a.webp",
    href: "/photo-editor/color-correction",
    internalhref: "/editor/color-correction",
  },
  {
    title: "Face Restoration",
    description: "Repair blurry or low-quality faces to bring back clear details.",
    beforeSrc: "/assets/editor-page/face-restorer/1b.webp",
    afterSrc: "/assets/editor-page/face-restorer/1a.png",
    href: "/photo-editor/face-restorer",
    internalhref: "/editor/face-restorer",
  },
  {
    title: "Image Extender",
    description: "Expand your photo's frame to fix awkward crops or fit any layout.",
    beforeSrc: "/assets/editor-page/image-extender/1b.jpg",
    afterSrc: "/assets/editor-page/image-extender/1a.webp",
    href: "/photo-editor/image-extender",
    internalhref: "/editor/image-extender",
  },
  {
    title: "Image Upscaler",
    description: "Instantly boost resolution for sharper, high-quality images.",
    beforeSrc: "/assets/editor-page/image-upscaler/1b.jpg",
    afterSrc: "/assets/editor-page/image-upscaler/1a.jpg",
    href: "/photo-editor/image-upscaler",
    internalhref: "/editor/image-upscaler",
  },
  {
    title: "Magic Eraser",
    description: "Remove unwanted objects, people, or distractions with one click.",
    beforeSrc: "/assets/editor-page/magic-eraser/1b.webp",
    afterSrc: "/assets/editor-page/magic-eraser/1a.jpg",
    href: "/photo-editor/magic-eraser",
    internalhref: "/editor/magic-eraser",
  },
  {
    title: "Photo Restoration",
    description: "Revive old, faded, or damaged photos and restore their charm.",
    beforeSrc: "/assets/editor-page/photo-restoration/1b.webp",
    afterSrc: "/assets/editor-page/photo-restoration/1a.jpg",
    href: "/photo-editor/photo-restoration",
    internalhref: "/editor/photo-restoration",
  },
  {
    title: "Text Remover",
    description: "Erase text, watermarks, or captions without harming the background.",
    beforeSrc: "/assets/editor-page/text-remover/1b.webp",
    afterSrc: "/assets/editor-page/text-remover/1a.jpg",
    href: "/photo-editor/text-remover",
    internalhref: "/editor/text-remover",
  },
  {
    title: "Unblur Image",
    description: "Sharpen soft or out-of-focus shots for a crisp, professional finish.",
    beforeSrc: "/assets/editor-page/unblur-image/1b.png",
    afterSrc: "/assets/editor-page/unblur-image/1a.webp",
    href: "/photo-editor/unblur-image",
    internalhref: "/editor/unblur-image",
  }
]

export function EditorToolsSection({
  title = "AI Editor",
  internal = false,
  highlight = ""}: {
  title?: string
  highlight?: string
  internal?: boolean
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollAmount = 248 // 240px width + 8px gap

  const nextSlide = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const prevSlide = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-16 px-4 w-full max-w-full @container" id="features">
      <div className="text-left mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
          {(() => {
            const lowerHighlight = highlight.toLowerCase()
            const parts = title.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'))

            return parts.map((part, index) => (
              <span key={index}>
                {part.toLowerCase() === lowerHighlight ? (
                  <span className={"text-blue-500"}>{part}</span>
                ) : (
                  part
                )}
              </span>
            ))
          })()}
        </h2>
      </div>

      <div className="w-full overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tools.map((tool, idx) => (
            <div
              key={`${tool.title}-${idx}`}
              className="group cursor-pointer flex-shrink-0 w-64 sm:w-80"
            >
              <div className="aspect-[5/4] rounded-xl overflow-hidden">
                    <ReactCompareSlider
                      className="w-full h-full object-top"
                      itemOne={
                        <ReactCompareSliderImage
                          src={tool.beforeSrc}
                          alt="before"
                          className="!object-top object-cover w-full h-full"
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src={tool.afterSrc}
                          alt="after"
                          className="!object-top object-cover w-full h-full"
                        />
                      }
                    />
                  </div>
              {/* <div className="w-full aspect-[5/4] relative overflow-hidden rounded-xl mb-4">
                <Image
                  src={tool.src}
                  alt={`${tool.title}`}
                  fill
                  className="object-cover rounded-xl overflow-hidden group-hover:scale-105 transition-all duration-300"
                />
              </div> */}
              <Link href={internal ? tool.internalhref : tool.href}
                key={`${tool.title}-${idx}`}
                className="flex flex-col"
              >
                <h3 className="font-semibold text-lg my-1">{tool.title}</h3>
                <p className="text-gray-500 text-sm">{tool.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Button variant="outline" size="icon" onClick={prevSlide} className="bg-white border-gray-300 rounded-full">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={nextSlide} className="bg-white border-gray-300 rounded-full">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  )
}
