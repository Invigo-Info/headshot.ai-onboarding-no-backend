"use client"

import { useState, useRef, useCallback } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  linkedinHeadshotsReviews,
  professionalHeadshotsReviews,
  corporateHeadshotsReviews,
  executiveHeadshotsReviews,
  businessHeadshotsReviews,
  doctorHeadshotsReviews,
  lawyerHeadshotsReviews,
  realEstateHeadshotsReviews,
  actorHeadshotsReviews,
  nurseHeadshotsReviews,
  teacherHeadshotsReviews,
  softwareEngineerHeadshotsReviews,
  graduationHeadshotsReviews,
  erasHeadshotsReviews,
  datingHeadshotsReviews,
} from '@/data/reviews-page-data'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Review {
  name: string
  avatar: string
  img: boolean
  stars?: number
  rating?: number
  quote?: string
  text?: string
}

const REVIEWS_PER_PAGE = 16

// Seeded PRNG — deterministic to avoid hydration mismatches
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const rng = seededRandom(seed)
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Deterministic random count between 15–30 per category
function seededCount(seed: number): number {
  const rng = seededRandom(seed)
  return 15 + Math.floor(rng() * 16) // 15..30
}

const categories = [
  { label: "All Reviews", key: "all" },
  { label: "LinkedIn", key: "linkedin" },
  { label: "Professional", key: "professional" },
  { label: "Corporate", key: "corporate" },
  { label: "Executive", key: "executive" },
  { label: "Business", key: "business" },
  { label: "Doctors", key: "doctors" },
  { label: "Lawyers", key: "lawyers" },
  { label: "Real Estate Agents", key: "real-estate" },
  { label: "Actors", key: "actors" },
  { label: "Nurses", key: "nurses" },
  { label: "Teachers", key: "teachers" },
  { label: "Software Engineers", key: "software-engineers" },
  { label: "Graduation", key: "graduation" },
  { label: "ERAS", key: "eras" },
  { label: "Dating", key: "dating" },
] as const

const categoryReviewsMap: Record<string, Review[]> = {
  linkedin: seededShuffle(linkedinHeadshotsReviews as Review[], 98321).slice(0, seededCount(98321)),
  professional: seededShuffle(professionalHeadshotsReviews as Review[], 54782).slice(0, seededCount(54782)),
  corporate: seededShuffle(corporateHeadshotsReviews as Review[], 31947).slice(0, seededCount(31947)),
  executive: seededShuffle(executiveHeadshotsReviews as Review[], 76543).slice(0, seededCount(76543)),
  business: seededShuffle(businessHeadshotsReviews as Review[], 12389).slice(0, seededCount(12389)),
  doctors: seededShuffle(doctorHeadshotsReviews as Review[], 87654).slice(0, seededCount(87654)),
  lawyers: seededShuffle(lawyerHeadshotsReviews as Review[], 45231).slice(0, seededCount(45231)),
  "real-estate": seededShuffle(realEstateHeadshotsReviews as Review[], 63218).slice(0, seededCount(63218)),
  actors: seededShuffle(actorHeadshotsReviews as Review[], 29876).slice(0, seededCount(29876)),
  nurses: seededShuffle(nurseHeadshotsReviews as Review[], 71543).slice(0, seededCount(71543)),
  teachers: seededShuffle(teacherHeadshotsReviews as Review[], 38912).slice(0, seededCount(38912)),
  "software-engineers": seededShuffle(softwareEngineerHeadshotsReviews as Review[], 56789).slice(0, seededCount(56789)),
  graduation: seededShuffle(graduationHeadshotsReviews as Review[], 14567).slice(0, seededCount(14567)),
  eras: seededShuffle(erasHeadshotsReviews as Review[], 83456).slice(0, seededCount(83456)),
  dating: seededShuffle(datingHeadshotsReviews as Review[], 42198).slice(0, seededCount(42198)),
}

// "All Reviews" — round-robin mix from every category, then shuffled
const allReviews: Review[] = (() => {
  const sources = Object.values(categoryReviewsMap)
  const mixed: Review[] = []
  const maxLen = Math.max(...sources.map((s) => s.length))
  for (let i = 0; i < maxLen; i++) {
    for (const src of sources) {
      if (i < src.length) mixed.push(src[i])
    }
  }
  return seededShuffle(mixed, 42)
})()

function getReviewsForCategory(key: string): Review[] {
  if (key === "all") return allReviews
  return categoryReviewsMap[key] || []
}

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="bg-white border rounded-lg shadow border-gray-200 p-4 md:p-6 break-inside-avoid mb-4 inline-block w-full overflow-hidden">
    <div className="flex flex-col gap-2 md:gap-3">
      <div className="flex mb-2">
        {[...Array(review.stars || review.rating || 5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
        ))}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{review.quote || review.text}</p>
    </div>

    {review.img && (
      <div className="mt-3 md:mt-4 mb-3 md:mb-4">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            src={review.avatar}
            alt={review.name}
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    )}

    <div className="mt-3 md:mt-4 pt-2">
      <div className="flex items-center">
        <Avatar className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3">
          <AvatarImage src={review.avatar} />
          <AvatarFallback className="text-sm">{review.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm text-gray-900">{review.name}</span>
      </div>
    </div>
  </div>
)

const ReviewGrid = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE)
  const scrollRef = useRef<HTMLDivElement>(null)

  const reviews = getReviewsForCategory(activeTab)
  const displayedReviews = reviews.slice(0, visibleCount)
  const hasMore = visibleCount < reviews.length

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    setVisibleCount(REVIEWS_PER_PAGE)
  }

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto pb-16 -mt-32 px-4">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-gray-900 mb-3">
          Browse Reviews by Category
        </h2>
        <p className="text-gray-500 font-medium">
          Read stories from people just like you.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-10 max-w-5xl mx-auto">
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll tabs left"
          className="shrink-0 w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <style>{`[data-hide-scrollbar]::-webkit-scrollbar { display: none; }`}</style>
        <div
          ref={scrollRef}
          data-hide-scrollbar
          className="flex gap-2.5 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((cat) => {
            const isActive = activeTab === cat.key
            const count = getReviewsForCategory(cat.key).length
            return (
              <button
                key={cat.key}
                onClick={() => handleTabChange(cat.key)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                {cat.label}
                <span className={isActive ? 'text-blue-100 ml-0.5' : 'text-gray-400 ml-0.5'}>
                  ({count})
                </span>
              </button>
            )
          })}
        </div>

        <button
          onClick={() => scroll('right')}
          aria-label="Scroll tabs right"
          className="shrink-0 w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Masonry Review Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {displayedReviews.map((review, idx) => (
          <ReviewCard key={`${activeTab}-${idx}`} review={review} />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + REVIEWS_PER_PAGE)}
            className="px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm cursor-pointer"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  )
}

export default ReviewGrid
