"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { photoEditorReviews } from '@/data/reviews'

const PhotoEditorReviews = () => {
  // For smaller screens, we'll show only the first 8 reviews (2 rows of 4)
  const reviewsToShow = photoEditorReviews.slice(0, 8)

  return (
    <div className="py-16 px-4 max-w-full sm:max-w-[90%] mx-auto">
      {/* Desktop and Tablet Grid Layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photoEditorReviews.map((review, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col justify-between"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4">{review.text}</p>
            </div>
            <div className="flex items-center justify-between self-end">
              <div className="flex items-center">
                <Avatar className="size-7 mr-2">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">{review.name}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Horizontal Scroll Layout */}
      <div className="md:hidden">
        {/* First Row */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-4 no-scrollbar scroll-smooth touch-pan-x">
          <div className="flex gap-4 min-w-max pl-4 pr-4">
            {reviewsToShow.slice(0, 4).map((review, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col justify-between w-[280px] h-[200px] flex-shrink-0"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-4 overflow-hidden">{review.text}</p>
                </div>
                <div className="flex items-center justify-between self-end">
                  <div className="flex items-center">
                    <Avatar className="size-7 mr-2">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{review.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth touch-pan-x">
          <div className="flex gap-4 min-w-max pl-4 pr-4">
            {reviewsToShow.slice(4, 8).map((review, idx) => (
              <motion.div
                key={idx + 4}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col justify-between w-[280px] h-[200px] flex-shrink-0"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-4 overflow-hidden">{review.text}</p>
                </div>
                <div className="flex items-center justify-between self-end">
                  <div className="flex items-center">
                    <Avatar className="size-7 mr-2">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{review.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoEditorReviews