"use client"

import type React from "react"
import { memo, useEffect } from "react"
import dynamic from "next/dynamic"
import { useFormStore } from "@/store/form-store"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, X } from "lucide-react"
import { GenderStep } from "./gender-step"
import { AgeStep } from "./age-step"
import { HairColorStep } from "./hair-color-step"
import { HairLengthStep } from "./hair-length-step"
import { HairTypeStep } from "./hair-type-step"
import { EthnicityStep } from "./ethnicity-step"
import { BodyTypeStep } from "./body-type-step"
import { AttireStep } from "./attire-step"
import { BackgroundStep } from "./background-step"
import { UploadStep } from "./upload-step"
import { ReviewStep } from "./review-step"
import { GlassesStep } from "./glasses-step"
import { PreviewStep } from "./preview-step"
import { UnlockStep } from "./unlock-step"
import { CheckoutStep } from "./checkout-step"
import { PaymentSuccessStep } from "./payment-success-step"
import Link from "next/link"
import Logo from "../shared/logo"
import type { PackData } from "./main-steps"

const PricingStep = dynamic(() => import("./pricing-step").then(mod => mod.PricingStep), { ssr: false })


export const FormLayout = memo(function FormLayout({slug, userId, packData}: {slug: string, userId: string, packData: PackData}) {
  const { currentStep, resetFormWithCleanup, getStepNumber, getTotalSteps, getStepOrder, setPackData } = useFormStore()
  const router = useRouter()

  // Set pack data in store when component mounts or pack data changes
  useEffect(() => {
    if (packData) {
      setPackData(packData)
    }
  }, [packData, setPackData])

  const currentStepNumber = getStepNumber(currentStep)
  const totalSteps = getTotalSteps()
  const progressPercentage = (currentStepNumber / totalSteps) * 100
  const stepOrder = getStepOrder()

  const handleBack = () => {
    // payment-success is reached via Stripe's success_url which skips
    // glasses + review, so Back should return to pricing rather than to
    // the prior step in the array order.
    if (currentStep === "payment-success") {
      router.push(`/generate/one-time/${slug}?step=pricing`)
      return
    }
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      const prevStep = stepOrder[currentIndex - 1]
      router.push(`/generate/one-time/${slug}?step=${prevStep}`)
    }
  }

  const handleReset = () => {
    resetFormWithCleanup()
    // router.push(`/generate/${slug}?step=gender`)
    router.push("/photos")
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "gender":
        return <GenderStep />
      case "age":
        return <AgeStep />
      case "hair-color":
        return <HairColorStep />
      case "hair-length":
        return <HairLengthStep />
      case "hair-type":
        return <HairTypeStep />
      case "ethnicity":
        return <EthnicityStep />
      case "body-type":
        return <BodyTypeStep />
      case "attire":
        return <AttireStep />
      case "background":
        return <BackgroundStep />
      case "pricing":
        return <PricingStep userId={userId} />
      case "upload":
        return <UploadStep />
      case "preview":
        return <PreviewStep userId={userId} />
      case "unlock":
        return <UnlockStep userId={userId} />
      case "checkout":
        return <CheckoutStep />
      case "glasses":
        return <GlassesStep />
      case "review":
        return <ReviewStep />
      case "payment-success":
        return <PaymentSuccessStep />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      {/* Header */}
      <div className="w-full sticky top-0 z-10 bg-white shrink-0">
        <div className="w-full px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-neutral-900 font-mont"
          >
            <Logo className="size-7" />
            <span>HEADSHOT.AI</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              aria-label="Close onboarding"
              className="text-neutral-700 hover:text-neutral-900"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Progress bar — starts under the logo and ends under the X button */}
        <div className="w-full px-6 lg:px-8 pb-2">
          <div className="w-full h-1.5 bg-gray-100">
            <div
              className="h-full bg-neutral-900 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progressPercentage)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-start items-center w-full">
        <ScrollArea className="h-full flex flex-col justify-center items-center w-full">
          <div className="w-full px-6 lg:px-8 pt-6 pb-8 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-10">
              {currentStepNumber > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  className="gap-2 text-gray-700 hover:text-gray-900 -ml-3"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
              ) : (
                <span className="h-9" aria-hidden="true" />
              )}
              <span
                className="shrink-0 size-9 rounded-full bg-blue-500 text-white text-sm font-semibold flex items-center justify-center shadow-sm"
                aria-label={`Step ${currentStepNumber} of ${totalSteps}`}
              >
                {currentStepNumber}
              </span>
            </div>
            <div className="w-full max-w-6xl lg:max-w-7xl mx-auto flex flex-col items-center justify-center">
              {renderCurrentStep()}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
})
