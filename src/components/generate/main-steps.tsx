"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useFormStore } from "@/store/form-store"
import { FormLayout } from "@/components/generate/form-layout"

interface AttireOption {
  name: string
  vaule: string // Note: keeping the typo from the database
  thumbnail: string
  description: string
}

interface BackgroundOption {
  name: string
  vaule: string // Note: keeping the typo from the database
  thumbnail: string
  description: string
  value?: string // Added to handle cases where 'value' might be used instead of 'vaule'
}

// Attire will have following structure { "man" : [ { name:"business casual", "vaule": "business-casual", "description": "Business professional attire" } ], "woman" : [ { name:"business casual", "vaule": "business-casual", "description": "Business professional attire" } ] }

interface PackData {
  id: string
  slug: string
  title: string
  description: string | null
  attire: { [key: string]: AttireOption[] } | null
  background: BackgroundOption[] | null
  choices: {
    attire: { [key: string]: number | "all" }
    background: { [key: string]: number | "all" }
  } | null
  is_active: boolean | null
  pro: boolean | null
}

export default function MainSteps({slug, userId, packData}: {slug: string, userId: string, packData: PackData}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentStep, setCurrentStep, setSlug, validateStep } = useFormStore()
  const [isValidating, setIsValidating] = useState(true)

  const step = searchParams.get("step") || "gender"

  useEffect(() => {
    setIsValidating(true)

    // Detect pack switch and clear pack-specific data (attire, background, plan)
    setSlug(slug)

    // Validate step access
    const validation = validateStep(step)

    if (!validation.isValid) {
      // Redirect to the appropriate step if validation fails
      router.replace(`/generate/one-time/${slug}?step=${validation.redirectTo}`)
      return
    }

    // Only update the store if the step from URL is different from current step
    if (step !== currentStep) {
      setCurrentStep(step)
    }

    // If no step parameter, redirect to gender step
    if (!searchParams.get("step")) {
      router.replace(`/generate/one-time/${slug}?step=gender`)
      return
    }

    setIsValidating(false)
  }, [step, currentStep, setCurrentStep, router, searchParams, slug, setSlug, validateStep])

  // Show loading during validation to prevent content flash
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return <FormLayout slug={slug} userId={userId} packData={packData} />
}

export type { PackData, AttireOption, BackgroundOption }
