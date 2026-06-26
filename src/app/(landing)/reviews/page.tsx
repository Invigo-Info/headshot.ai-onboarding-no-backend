import ReviewsHeroSection from '@/components/landing-page/reviews/reviews-hero-section'
import ReviewGrid from '@/components/landing-page/reviews/review-grid'
import React from 'react'
import ReviewsCTASection from '@/components/landing-page/reviews/reviews-cta-section'
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "See What Users Say About Headshot.AI – Authentic Reviews & Results",
  description: "Read authentic testimonials from Headshot.AI users. See how professionals, creators, and teams share their experiences and results with AI-generated headshots.",
  canonicalPath: "/reviews",
});

const ReviewsPage = () => {
  return (
    <main className="flex flex-col pb-16">
        <ReviewsHeroSection />
        <ReviewGrid />
        <ReviewsCTASection />
    </main>
  )
}

export default ReviewsPage
