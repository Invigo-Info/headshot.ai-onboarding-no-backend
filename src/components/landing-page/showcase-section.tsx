"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const categories = [
  "professional",
  "realtor",
  "lawyer",
  "doctor",
  "eras",
  "actor",
  "corporate",
  "executive",
  "teacher",
  "graduation",
  "linkedin",
  "dating",
]



const getImages = (category: string) => {

  const capitalCategory = category.charAt(0).toUpperCase() + category.slice(1)
  return [
    { src: `/assets/landing-page/${category}/examples/1.webp`, category: `${capitalCategory}`, featured: true },
    { src: `/assets/landing-page/${category}/examples/2.webp`, category: `${capitalCategory}` },
    { src: `/assets/landing-page/${category}/examples/3.webp`, category: `${capitalCategory}` },
    { src: `/assets/landing-page/${category}/examples/4.webp`, category: `${capitalCategory}` },
    { src: `/assets/landing-page/${category}/examples/5.webp`, category: `${capitalCategory}` },
    { src: `/assets/landing-page/${category}/examples/6.webp`, category: `${capitalCategory}` },
    { src: `/assets/landing-page/${category}/examples/7.webp`, category: `${capitalCategory}` },
    { src: `/assets/landing-page/${category}/examples/8.webp`, category: `${capitalCategory}` },
    { src: `/assets/landing-page/${category}/examples/9.webp`, category: `${capitalCategory}` },
    { src: `/assets/landing-page/${category}/examples/10.webp`, category: `${capitalCategory}` },
  ]
}


export default function ShowcaseSection() {
  const [selectedCategory, setSelectedCategory] = useState("professional")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollAmount = 208 // 200px width + 8px gap

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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      })
    }
  }


const selectedImages = getImages(selectedCategory)

  return (
    <section className="py-16 px-4 w-full max-w-full sm:max-w-[90%] mx-auto @container">
      <div className="text-left mb-8">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4">
        Headshots for Every <span className="text-blue-500">Profession</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-7xl">
        From Executives to Educators, Doctors to Actors - Our AI creates stunning headshots tailored to every career path and personality.
        </p>
      </div>

      <div className="w-full overflow-hidden  flex items-start justify-between mb-8">
        <div className="w-full overflow-x-auto flex flex-nowrap gap-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 whitespace-nowrap rounded-full capitalize text-sm font-medium transition-colors cursor-pointer ${
                selectedCategory === category ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

     
      </div>

      <div className="w-full overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {selectedImages.map((image, idx) => (
            <motion.div
              key={`${selectedCategory}-${idx}`}
              className="relative group cursor-pointer overflow-hidden rounded-xl flex-shrink-0 w-48"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <div className="w-full aspect-[4/5] relative overflow-hidden rounded-xl">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={`${image.category} headshot`}
                  fill
                  className="object-cover object-top rounded-xl overflow-hidden group-hover:scale-105 transition-all duration-300"
                />
                {image.featured && (
                  <div className="absolute top-3 left-3 bg-blue-500 text-white rounded-md px-2 py-1 text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
            </motion.div>
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

      <div className="text-center mt-8">
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300" asChild>
          <Link href={`/login?from=${selectedCategory}`}>View all packs</Link>
        </Button>
      </div>

 
    </section>
  )
}
