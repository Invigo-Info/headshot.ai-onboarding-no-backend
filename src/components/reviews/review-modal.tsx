"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { submitReview, dismissReviewModal } from "@/actions/review-actions"
import { Check, Heart, Star } from "lucide-react"
import Logo from "../shared/logo"

interface ReviewModalProps {
  albumId: string
  userId: string
  userName: string | null
  userEmail: string | null
  firstHeadshotUrl: string | null
}

type ModalStep =
  | "rating"
  | "high-form"
  | "low-prompt"
  | "low-form"
  | "success"
  | "thank-you"

export default function ReviewModal({
  albumId,
  userName,
  userEmail,
  firstHeadshotUrl,
}: ReviewModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<ModalStep>("rating")
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // High rating form
  const [reviewText, setReviewText] = useState("")
  const [reviewerName, setReviewerName] = useState(userName || "")
  const [jobTitle, setJobTitle] = useState("")
  const [shareConsent, setShareConsent] = useState(true)

  // Low rating form
  const [lowFeedbackText, setLowFeedbackText] = useState("")
  const [lowName, setLowName] = useState(userName || "")
  const [lowEmail, setLowEmail] = useState(userEmail || "")

  // 5-second delay before showing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = useCallback(async () => {
    setIsOpen(false)
    await dismissReviewModal()
  }, [])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        handleDismiss()
      }
    },
    [handleDismiss]
  )

  const handleStarClick = async (value: number) => {
    setRating(value)

    if (value === 5) {
      // Auto-submit for 5 stars
      setIsSubmitting(true)
      const result = await submitReview({
        albumId,
        rating: value,
        reviewerName: userName || undefined,
        headshotUrl: firstHeadshotUrl || undefined,
        shareConsent: true,
      })
      setIsSubmitting(false)
      if (result.success) {
        setStep("success")
      }
    } else if (value === 4) {
      setStep("high-form")
    } else {
      setStep("low-prompt")
    }
  }

  const handleHighFormSubmit = async () => {
    setIsSubmitting(true)
    const result = await submitReview({
      albumId,
      rating,
      reviewText: reviewText || undefined,
      reviewerName: reviewerName || undefined,
      jobTitle: jobTitle || undefined,
      headshotUrl: shareConsent ? firstHeadshotUrl || undefined : undefined,
      shareConsent,
    })
    setIsSubmitting(false)
    if (result.success) {
      setStep("success")
    }
  }

  const handleLowFormSubmit = async () => {
    setIsSubmitting(true)
    const result = await submitReview({
      albumId,
      rating,
      reviewText: lowFeedbackText || undefined,
      reviewerName: lowName || undefined,
      reviewerEmail: lowEmail || undefined,
    })
    setIsSubmitting(false)
    if (result.success) {
      setStep("thank-you")
    }
  }

  const handleDone = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-[440px] rounded-md sm:rounded-xl p-0 gap-0 border-0 max-h-[90dvh] overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Rate your headshots</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Rate your headshots and leave a review
        </DialogDescription>

        <ScrollArea className="max-h-[calc(90dvh)]">
          <div className="p-4 sm:p-6 md:p-8">

        {/* Rating Step */}
        {(step === "rating" || step === "high-form" || step === "low-prompt" || step === "low-form") && (
          <div>
            {/* Icon + Title */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <Logo className="size-10 sm:size-12 text-white" />
              </div>
              <h2 className="text-lg sm:text-[22px] font-bold text-gray-900 mb-1.5 sm:mb-2">
                How would you rate your headshots?
              </h2>
            </div>

            {/* Star Rating */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className="transition-transform duration-150 hover:scale-[1.15] cursor-pointer bg-transparent border-0 p-0"
                  onMouseEnter={() => setHoveredStar(value)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => handleStarClick(value)}
                  disabled={isSubmitting}
                >
                  <span
                    className={`text-3xl sm:text-4xl leading-none select-none ${
                      value <= (hoveredStar || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>

            {/* High Rating Form (4 stars) */}
            {step === "high-form" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="mb-3 sm:mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Tell us what you loved
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="The quality blew me away! Perfect for my LinkedIn profile..."
                    className="w-full min-h-[80px] sm:min-h-[100px] p-2.5 sm:p-3 text-sm text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-[10px] resize-vertical transition-all focus:outline-none focus:border-[#4F6EF7] focus:bg-white placeholder:text-gray-400"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Your name
                    </label>
                    <input
                      type="text"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="Sarah Johnson"
                      className="w-full p-2.5 sm:p-3 text-sm text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-[10px] transition-all focus:outline-none focus:border-[#4F6EF7] focus:bg-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Job title (optional)
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Marketing Manager"
                      className="w-full p-2.5 sm:p-3 text-sm text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-[10px] transition-all focus:outline-none focus:border-[#4F6EF7] focus:bg-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Headshot Preview */}
                {shareConsent && firstHeadshotUrl && (
                  <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-[10px] mb-3 sm:mb-4">
                    <Image
                      src={`/api/image/${firstHeadshotUrl}?from=output-images`}
                      alt="Your headshot"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-[13px] text-gray-500">
                      <strong className="block text-sm text-gray-900">
                        We&apos;ll use your AI headshot
                      </strong>
                      Makes your review stand out!
                    </div>
                  </div>
                )}

                {/* Share Consent Checkbox */}
                <label className="flex items-start gap-2.5 p-3 sm:p-3.5 bg-[#F0F4FF] rounded-[10px] mb-4 sm:mb-5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareConsent}
                    onChange={(e) => setShareConsent(e.target.checked)}
                    className="w-[18px] h-[18px] mt-0.5 accent-[#4F6EF7] cursor-pointer shrink-0"
                  />
                  <span className="text-sm text-gray-700">
                    <strong className="text-gray-900">
                      Feature my review on your website
                    </strong>
                    <br />
                    Help others discover Headshot.AI
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleHighFormSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-3.5 bg-[#4F6EF7] hover:bg-[#3B5BDB] text-white font-semibold rounded-[10px] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full py-2.5 sm:py-3.5 text-gray-500 hover:text-gray-700 font-semibold bg-transparent border-0 transition-colors cursor-pointer"
                >
                  Maybe later
                </button>
              </div>
            )}

            {/* Low Rating Prompt (1-3 stars) */}
            {step === "low-prompt" && (
              <div className="text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm sm:text-[15px] text-gray-500 mb-4 sm:mb-5">
                  Thanks for your honesty! We&apos;d love to hear more
                  <br className="hidden sm:block" />
                  {" "}about your experience.
                </p>
                <button
                  type="button"
                  onClick={() => setStep("low-form")}
                  className="w-full py-3 sm:py-3.5 text-[#4F6EF7] font-semibold bg-transparent border-2 border-gray-200 rounded-[10px] hover:border-[#4F6EF7] hover:bg-[#F0F4FF] transition-all cursor-pointer"
                >
                  Tell Us More
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full py-2.5 sm:py-3.5 text-gray-500 hover:text-gray-700 font-semibold bg-transparent border-0 transition-colors cursor-pointer"
                >
                  No thanks
                </button>
              </div>
            )}

            {/* Low Rating Form */}
            {step === "low-form" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="mb-3 sm:mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Share your experience
                  </label>
                  <textarea
                    value={lowFeedbackText}
                    onChange={(e) => setLowFeedbackText(e.target.value)}
                    placeholder="Tell us about your experience with Headshot.AI..."
                    className="w-full min-h-[80px] sm:min-h-[100px] p-2.5 sm:p-3 text-sm text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-[10px] resize-vertical transition-all focus:outline-none focus:border-[#4F6EF7] focus:bg-white placeholder:text-gray-400"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Your name (optional)
                    </label>
                    <input
                      type="text"
                      value={lowName}
                      onChange={(e) => setLowName(e.target.value)}
                      placeholder="Sarah Johnson"
                      className="w-full p-2.5 sm:p-3 text-sm text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-[10px] transition-all focus:outline-none focus:border-[#4F6EF7] focus:bg-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Email (optional)
                    </label>
                    <input
                      type="text"
                      value={lowEmail}
                      onChange={(e) => setLowEmail(e.target.value)}
                      placeholder="sarah@email.com"
                      className="w-full p-2.5 sm:p-3 text-sm text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-[10px] transition-all focus:outline-none focus:border-[#4F6EF7] focus:bg-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLowFormSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-3.5 bg-[#4F6EF7] hover:bg-[#3B5BDB] text-white font-semibold rounded-[10px] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full py-2.5 sm:py-3.5 text-gray-500 hover:text-gray-700 font-semibold bg-transparent border-0 transition-colors cursor-pointer"
                >
                  Maybe later
                </button>
              </div>
            )}
          </div>
        )}

        {/* Success State (4-5 stars) */}
        {step === "success" && (
          <div className="text-center py-3 sm:py-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 bg-emerald-50 rounded-full flex items-center justify-center">
              <Check className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">Thank you!</h3>
            <p className="text-sm sm:text-[15px] text-gray-500 mb-4 sm:mb-5">
              Your review means the world to us. Want to help even more?
            </p>
            <a
              href="https://www.trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 text-sm font-semibold text-white bg-[#00B67A] hover:bg-[#009567] rounded-lg transition-colors mb-3"
            >
              <Star className="w-5 h-5 fill-current" />
              Leave a Trustpilot Review
            </a>
            <br />
            <button
              type="button"
              onClick={handleDone}
              className="w-full py-2.5 sm:py-3.5 text-gray-500 hover:text-gray-700 font-semibold bg-transparent border-0 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

        {/* Thank You State (1-3 stars) */}
        {step === "thank-you" && (
          <div className="text-center py-3 sm:py-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 bg-indigo-50 rounded-full flex items-center justify-center">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-[#4F6EF7]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">
              Thank you for sharing
            </h3>
            <p className="text-sm sm:text-[15px] text-gray-500 mb-4 sm:mb-5">
              Your honest feedback helps us improve. We truly appreciate you
              taking the time.
            </p>
            <button
              type="button"
              onClick={handleDone}
              className="w-full py-3 sm:py-3.5 bg-[#4F6EF7] hover:bg-[#3B5BDB] text-white font-semibold rounded-[10px] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
