"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useFormStore } from "@/store/form-store"
import { Button } from "@/components/ui/button"
import { createPaymentLink, checkPaymentStatus, getPriceInfo } from "@/actions/payment-actions"
import { useState, useEffect, useMemo, useCallback } from "react"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Star, User, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {getPricingDetails } from "@/data/one-time-pricing-details"
import { getPricingPageReview } from "@/data/reviews"
import { getTrustLogos } from "@/data/trust-logos"
import { cn } from "@/lib/utils"
import TrustedLogos from "@/components/landing-page/trusted-logos"

const pricingSchema = z.object({
  selectedPlan: z.string().min(1, "Please select a plan"),
})

export const PricingStep: React.FC<{ userId: string }> = ({ userId }) => {
  const { formData, updateFormData, slug, getNextStep } = useFormStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paidPlans, setPaidPlans] = useState<string[]>([])
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)
  const [priceData, setPriceData] = useState<{[key: string]: {amount: number, headshot_count: number}}>({
    starter: { amount: 25, headshot_count: 40 },
    basic: { amount: 35, headshot_count: 100 },
    premium: { amount: 55, headshot_count: 150 }
  });

  const router = useRouter();


  // Extract category from slug (first word before dash)
  const getCategoryFromSlug = (slug: string): string => {
    // return slug.split('-')[0] || 'professional';
    return slug.replace('-headshots', "") || 'professional';
  };

  // Get pricing details based on category
  

  const category = getCategoryFromSlug(slug);
  const pricingDetails = getPricingDetails(category);

  const pricingReview = useMemo(
    () => getPricingPageReview(category),
    [category]
  );

  const form = useForm<z.infer<typeof pricingSchema>>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      selectedPlan: formData.selectedPlan || (pricingDetails.plans[1]?.name.toLowerCase() || "basic"), // Default to second plan (usually "Basic" which is most popular)
    },
  })

  // Update form when paid plans are loaded
  useEffect(() => {
    if (paidPlans.length > 0) {
      const selectedPlan = paidPlans[0]
      updateFormData({ selectedPlan })
      form.setValue("selectedPlan", selectedPlan)
    }
  }, [paidPlans, updateFormData, form, formData.selectedPlan])

  // Check for existing paid orders and payment status
  useEffect(() => {
    const checkExistingOrders = async () => {
      try {
        setIsLoading(true)
        // Get plan IDs from pricing details
        const plans = pricingDetails.plans.map(plan => plan.name.toLowerCase())

        // Run payment status checks in parallel
        const paymentStatusPromises = plans.map(plan => checkPaymentStatus(userId, plan))
        const paymentStatusResults = await Promise.all(paymentStatusPromises)

        const paidPlansList: string[] = []
        paymentStatusResults.forEach((result, index) => {
          if (result.success && result.hasPaidOrder) {
            paidPlansList.push(plans[index])
          }
        })
        setPaidPlans(paidPlansList)

        // Automatically select the first paid plan if available
        const defaultPlan = pricingDetails.plans[1]?.name.toLowerCase() || plans[0] || "basic"
        const selectedPlan = paidPlansList[0] || defaultPlan
        updateFormData({ selectedPlan })
        form.setValue("selectedPlan", selectedPlan)

        // Run price info fetches in parallel
        const priceInfoPromises = plans.map(plan => getPriceInfo(plan))
        const priceInfoResults = await Promise.all(priceInfoPromises)

        const priceInfo: {[key: string]: {amount: number, headshot_count: number}} = {}
        priceInfoResults.forEach((result, index) => {
          if (result.success && result.price) {
            priceInfo[plans[index]] = {
              amount: result.price.amount,
              headshot_count: result.price.headshot_count
            }
          }
        })
        setPriceData(priceInfo)
      } catch (error) {
        console.error('Error checking existing orders:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkExistingOrders()

    // Check for payment status from URL params
    const urlParams = new URLSearchParams(window.location.search)
    const payment = urlParams.get('payment')
    if (payment) {
      setPaymentStatus(payment)
      // Clear the URL params after a few seconds
      setTimeout(() => {
        const newUrl = window.location.pathname + window.location.search.replace(/[?&]payment=[^&]*/g, '')
        window.history.replaceState({}, '', newUrl)
        setPaymentStatus(null)
      }, 5000)
    }
  }, [userId, updateFormData, form, pricingDetails])

  const handlePlanChange = useCallback((value: string) => {
    // If user already has a paid plan, prevent switching to other plans
    if (paidPlans.length > 0 && !paidPlans.includes(value)) {
      return
    }
    updateFormData({ selectedPlan: value })
    form.setValue("selectedPlan", value)
  }, [updateFormData, form, paidPlans])

  const onSubmit = useCallback(async (data: z.infer<typeof pricingSchema>) => {
    try {
      setIsSubmitting(true)
      updateFormData(data)
      
      // Check if user already has this plan
      if (paidPlans.includes(data.selectedPlan)) {
        // User already has this plan, proceed to upload

        const nextStep = getNextStep("pricing");
        if (nextStep) {
          router.push(`/generate/one-time/${slug}?step=${nextStep}`)
        }
        return
      }
      
      // Create form data object with slug
      const formDataWithSlug = { ...formData, ...data, slug }

      // Create payment link and redirect straight to Stripe Checkout.
      const result = await createPaymentLink(formDataWithSlug)

      if (result.success && result.url) {
        window.location.href = result.url
        return
      }

      toast.error(result.error || 'Failed to create payment link')
      setIsSubmitting(false)
    } catch (error) {
      console.error('Error creating payment link:', error)
      toast.error('Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }, [updateFormData, paidPlans, getNextStep, router, formData, slug])

  const plans = useMemo(() => {
    return pricingDetails.plans.map((plan) => {
      const planId = plan.name.toLowerCase();
      const amount = priceData[planId]?.amount || plan.price;
      const headshots = priceData[planId]?.headshot_count || plan.headshots;
      return {
        id: planId,
        name: plan.name,
        badge: plan.badge,
        price: amount,
        originalPrice: plan.originalPrice,
        headshots,
        perHeadshot: (amount / headshots).toFixed(2),
      };
    });
  }, [pricingDetails.plans, priceData])

  const selectedPlanData = plans.find((p) => p.id === formData.selectedPlan)

  const everyPlanIncludes = [
    "Full HD, no watermarks",
    "Use them anywhere you want",
    "Yours forever — download as many times as you want",
  ]

  const trustLogoFiles = useMemo(() => getTrustLogos(category), [category])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pb-28">
      {paymentStatus === 'success' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
          <p className="text-emerald-800 font-medium text-sm">🎉 You&apos;re all set! Your purchased package is ready to use.</p>
        </div>
      )}

      {paymentStatus === 'timeout' && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
          <p className="text-amber-800 font-medium text-sm">⏱️ Payment verification timed out. If you completed payment, please refresh the page.</p>
        </div>
      )}

      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Pick a plan to unlock your professional headshots
        </h2>
        <p className="text-gray-600 text-base">Pay once. No subscriptions. No hidden fees.</p>
        <div className="flex justify-center pt-1">
          <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm sm:text-base">
            <Check className="size-4" strokeWidth={3} />
            100% Money Back Guarantee
          </span>
        </div>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto pt-6">
          More headshots means more variety — in outfits, backgrounds, poses, and expressions.
        </p>
      </div>

      {isLoading && (
        <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-2xl p-6 animate-pulse h-48 bg-gray-50" />
          ))}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-12 w-full", isLoading && "hidden")}>
          <FormField
            control={form.control}
            name="selectedPlan"
            render={() => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={handlePlanChange}
                    value={formData.selectedPlan}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4"
                  >
                    {plans.map((plan) => {
                      const isPurchased = paidPlans.includes(plan.id)
                      const hasAnyPaid = paidPlans.length > 0
                      const isDisabled = hasAnyPaid && !isPurchased
                      const isSelected = plan.id === formData.selectedPlan

                      return (
                        <div key={plan.id} className="relative w-full">
                          <RadioGroupItem
                            value={plan.id}
                            id={plan.id}
                            className="peer sr-only w-full"
                            disabled={isDisabled}
                          />
                          {/* Floating badge above the card */}
                          {plan.badge && !isPurchased && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-500 shadow-sm whitespace-nowrap">
                              {plan.badge}
                            </span>
                          )}
                          {isPurchased && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-emerald-500 shadow-sm">
                              Purchased
                            </span>
                          )}
                          <Label
                            htmlFor={plan.id}
                            className={cn(
                              "block rounded-2xl border-2 p-5 sm:p-6 w-full transition-all duration-200 h-full",
                              isSelected
                                ? "border-blue-500 bg-blue-50/60 shadow-md"
                                : "border-gray-200 bg-white hover:border-gray-300",
                              isPurchased && "border-emerald-500 bg-emerald-50",
                              isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
                            )}
                          >
                            <div className="flex items-center gap-2 mb-4">
                              <h3 className="text-lg font-bold">{plan.name}</h3>
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-gray-400 line-through text-base">
                                ${plan.originalPrice}
                              </span>
                              <span className="text-4xl font-bold text-gray-900">
                                ${plan.price}
                              </span>
                            </div>
                            <p className="text-emerald-600 font-semibold text-sm mt-1">
                              ${plan.perHeadshot}/headshot
                            </p>
                            <div className="mt-5 pt-4 border-t border-gray-200 flex items-center gap-2 text-sm text-gray-700">
                              <User className="size-4 text-gray-500" />
                              <span>{plan.headshots} unique headshots</span>
                            </div>
                          </Label>
                        </div>
                      )
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-500 font-semibold text-center pt-2" />
              </FormItem>
            )}
          />

          {/* Every plan includes — perks shared across all tiers */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 sm:px-6 py-4">
            <p className="text-center text-sm font-semibold text-gray-900 mb-3">
              Every plan includes
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2">
              {everyPlanIncludes.map((perk) => (
                <span
                  key={perk}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-700"
                >
                  <Check className="size-4 text-emerald-600" strokeWidth={3} />
                  {perk}
                </span>
              ))}
            </div>
          </div>

          {/* Review card with avatar */}
          <div className="rounded-2xl border border-gray-200 bg-white px-5 sm:px-8 py-6 flex items-center gap-5 sm:gap-6">
            <div className="relative size-16 sm:size-20 shrink-0 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={pricingReview.avatar}
                alt={pricingReview.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex gap-0.5">
                {Array.from({ length: pricingReview.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm sm:text-base italic text-gray-800 leading-snug">
                &ldquo;{pricingReview.quote}&rdquo;
              </p>
              <p className="text-sm text-gray-600">
                <span>- {pricingReview.name}, {pricingReview.role}</span>
              </p>
            </div>
          </div>

          {/* Trust section: rating + social proof line + logos */}
          <div className="text-center space-y-3 pt-2">
            <p className="inline-flex items-center justify-center gap-2 text-base sm:text-lg font-semibold text-gray-900">
              <span className="inline-flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </span>
              4.9/5 from 2,000+ reviews
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              Trusted by 7,600+ professionals at LinkedIn, Google, Microsoft, and more.
            </p>
            <TrustedLogos logos={trustLogoFiles} category={category} />
          </div>

          {/* Purchase button — floating sticky at the bottom, dimensions match other step CTAs */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-20">
            <Button
              type="submit"
              disabled={isLoading || isSubmitting || !selectedPlanData}
              className="w-full py-6 bg-blue-500 hover:bg-blue-600 text-white rounded-sm text-lg font-medium shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Processing..."
                : paidPlans.includes(formData.selectedPlan)
                  ? `Continue with ${selectedPlanData?.name} Plan`
                  : selectedPlanData
                    ? `Unlock ${selectedPlanData.headshots} Headshots — $${selectedPlanData.price}`
                    : "Pick a plan"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
