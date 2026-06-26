"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Shape of a single review entry consumed by this section.
export interface ShowcaseReview {
  title: string;
  name: string;
  role: string;
  quote: string;
  stars: number;
  avatar?: string;
}

interface ReviewsShowcaseProps {
  /** Full list of reviews — the first is featured, the rest fill the grid */
  reviews: ShowcaseReview[];
  /** Main heading text */
  title?: string;
  /** Portion of the title to highlight in blue */
  highlight?: string;
  /** Supporting line below the heading */
  subtitle?: string;
  /** Average rating shown in the top label, e.g. "4.9/5" */
  rating?: string;
  /** Review-count text shown in the top label */
  label?: string;
  /** Number of reviews shown in the grid below the featured review */
  gridCount?: number;
}

// Renders a row of filled yellow rating stars.
function StarRating({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className={`fill-yellow-400 text-yellow-400 ${className ?? "size-4"}`}
        />
      ))}
    </div>
  );
}

// Builds up-to-two-letter initials from a person's name.
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ReviewsShowcase({
  reviews,
  title = "See what our customers say",
  highlight = "customers say",
  subtitle = "Real reviews from real professionals. Read a few, then decide.",
  rating = "4.9/5",
  label = "4.9/5 from 2,000+ reviews",
  gridCount = 6,
}: ReviewsShowcaseProps) {
  if (!reviews?.length) return null;

  const featured = reviews[0];
  const gridReviews = reviews.slice(1, 1 + gridCount);

  const renderTitle = () => {
    if (!highlight) return title;
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = title.split(new RegExp(`(${escaped})`, "i"));
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
    <section className="bg-white scroll-m-48" id="reviews">
      <div className="px-4 max-w-full sm:max-w-[90%] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <span className="flex items-center gap-1.5 text-sm sm:text-base font-semibold uppercase tracking-[0.15em] text-gray-400">
            {rating}
            <Star className="size-4 fill-yellow-500 text-yellow-500" />
            <span className="text-gray-300">•</span>
            {label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont text-gray-900 leading-tight">
            {renderTitle()}
          </h2>
          <p className="max-w-3xl text-gray-600 text-base xs:text-lg sm:text-xl">
            {subtitle}
          </p>
        </div>

        {/* Featured review */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto w-full max-w-4xl flex flex-col sm:flex-row items-center gap-6 sm:gap-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-10"
        >
          <Avatar className="size-28 sm:size-40 shrink-0 border border-blue-100">
            <AvatarImage asChild src={featured.avatar}>
              {featured.avatar ? (
                <Image
                  src={featured.avatar}
                  alt={featured.name}
                  width={200}
                  height={200}
                  className="size-full object-cover object-top"
                />
              ) : (
                <span />
              )}
            </AvatarImage>
            <AvatarFallback className="bg-blue-50 text-3xl sm:text-5xl font-semibold text-blue-500">
              {getInitials(featured.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <StarRating count={featured.stars} className="size-4 sm:size-5" />
            <blockquote className="mt-4 text-lg sm:text-xl italic leading-relaxed text-gray-700">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 sm:justify-start">
              <span className="font-semibold text-gray-900">
                {featured.name}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">{featured.role}</span>
            </div>
          </div>
        </motion.div>

        {/* Review grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridReviews.map((review, index) => (
            <motion.div
              key={`${review.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              whileHover={{ y: -5 }}
              className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/60"
            >
              <StarRating count={review.stars} />
              <h3 className="mt-3 text-lg font-semibold leading-snug text-gray-900">
                {review.title}
              </h3>
              <blockquote className="mt-2 flex-grow text-[15px] leading-relaxed text-gray-600">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                <Avatar className="size-10">
                  <AvatarImage asChild src={review.avatar}>
                    {review.avatar ? (
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={80}
                        height={80}
                        className="size-full object-cover object-top"
                      />
                    ) : (
                      <span />
                    )}
                  </AvatarImage>
                  <AvatarFallback className="bg-blue-50 text-sm font-semibold text-blue-500">
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
      </div>
    </section>
  );
}
