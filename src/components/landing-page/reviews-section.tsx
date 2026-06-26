"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

// Review Data
export interface Review {
  title: string;
  name: string;
  role: string;
  quote: string;
  stars: number;
  avatar: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  title: string;
  highlight: string;
  subtitle: string;
}

export default function ReviewsSection({
  reviews,
  title,
  highlight,
  subtitle,
}: ReviewsSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const isMobile = useIsMobile(768);

  // Use the reviews prop instead of hardcoded allReviews
  const chunkSize = isMobile ? 4 : 8;
  const reviewChunks = React.useMemo(() => {
    const chunks = [];
    for (let i = 0; i < reviews.length; i += chunkSize) {
      chunks.push(reviews.slice(i, i + chunkSize));
    }
    return chunks;
  }, [reviews, chunkSize]);

  const count = reviewChunks.length;

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const renderTitle = () => {
    if (!highlight) return title;
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = title.split(new RegExp(`(${escapedHighlight})`, "i"));

    return parts.map((part, index) => (
      <span key={index}>
        {part.toLowerCase() === highlight.toLowerCase() ? (
          <span className="text-blue-500">{part}</span>
        ) : (
          part
        )}
      </span>
    ));
  };

  return (
    <section className="bg-white overflow-hidden scroll-m-48" id="reviews">
      <div className="px-4 max-w-full sm:max-w-[90%] mx-auto">
        {/* Header */}
        {/* <span className="text-sm sm:text-base text-center font-semibold uppercase tracking-wider text-gray-500 block mb-4">
          Reviews
        </span> */}
        <span className="text-center text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block mb-4">
          Reviews
        </span>
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          {/* <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-5 h-5 fill-green-500 text-green-500"
              />
            ))}
          </div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Verified 4.9/5 Average Rating
          </h2> */}
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont text-gray-900 leading-tight">
            {renderTitle()}
          </h3>
          <p className="max-w-3xl xl:max-w-full text-gray-600 text-base xs:text-lg sm:text-xl">
            {subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {reviewChunks.map((chunk, slideIndex) => (
                <CarouselItem
                  key={slideIndex}
                  className="basis-full overflow-auto pt-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-1">
                    {chunk.map((review, reviewIndex) => (
                      <motion.div
                        key={`${slideIndex}-${reviewIndex}`}
                        className="rounded-2xl p-6 border border-gray-200 h-full flex flex-col group bg-gray-50"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex gap-0.5 mb-4">
                          {[...Array(review.stars)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-green-500 text-green-500"
                            />
                          ))}
                        </div>
                        <h4 className="font-semibold text-gray-900 text-lg mb-3 leading-snug">
                          {review.title}
                        </h4>
                        <blockquote className="text-gray-600 text-[15px] flex-grow mb-6 leading-relaxed">
                          &ldquo;{review.quote}&rdquo;
                        </blockquote>

                        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                          <Avatar className="size-10">
                            {/* <AvatarImage
                              src={review.avatar}
                              alt={review.name}
                              className="object-cover object-top"
                            /> */}
                            <AvatarImage asChild src={review.avatar}>
                              <Image
                                src={review.avatar}
                                alt={review.name}
                                width={100} // Matches container size for sharp rendering
                                height={100}
                                className="size-full object-cover object-top"
                              />
                            </AvatarImage>
                            <AvatarFallback>
                              {getInitials(review.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 text-sm">
                              {review.name}
                            </span>
                            <span className="text-gray-500 text-xs font-medium">
                              {review.role}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Desktop Navigation Arrows */}
            {/* <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-md transition-all" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-md transition-all" />
            </div> */}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={current === 1}
                className={cn(
                  "p-2 rounded-full border border-gray-200 transition-colors cursor-pointer",
                  current === 1
                    ? "text-gray-300 cursor-not-allowed bg-gray-50"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                )}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                      current === index + 1
                        ? "bg-emerald-500 w-8"
                        : "bg-gray-200 w-2.5 hover:bg-gray-300",
                    )}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => api?.scrollNext()}
                disabled={current === count}
                className={cn(
                  "p-2 rounded-full border border-gray-200 transition-colors",
                  current === count
                    ? "text-gray-300 cursor-not-allowed bg-gray-50"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                )}
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

// Helpers
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
