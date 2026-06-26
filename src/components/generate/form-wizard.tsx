"use client"

import { useFormStore } from "@/store/form-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
import { ReviewStep } from "./review-step"

const steps = [
  { component: GenderStep, title: "What's your gender?" },
  { component: AgeStep, title: "How old are you?" },
  { component: HairColorStep, title: "What's your hair color?" },
  { component: HairLengthStep, title: "What's your hair length?" },
  { component: HairTypeStep, title: "What's your hair type?" },
  { component: EthnicityStep, title: "What's your ethnicity?" },
  { component: BodyTypeStep, title: "What's your body type?" },
  { component: AttireStep, title: "Choose your attire" },
  { component: BackgroundStep, title: "Choose your background" },
  { component: ReviewStep, title: "Review your selections" },
]

export function FormWizard() {
  const { currentStep, setCurrentStep, resetForm } = useFormStore()
  const CurrentStepComponent = steps[Number(currentStep) - 1]?.component

  const progressPercentage = (Number(currentStep) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-semibold">Headshot.ai</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4">
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-6 py-2">
            <Button variant="ghost" onClick={() => setCurrentStep(String(Number(currentStep) - 1))} disabled={Number(currentStep) === 1} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{(currentStep)}</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="px-6 py-8">{CurrentStepComponent && <CurrentStepComponent />}</div>
        </CardContent>
      </Card>
    </div>
  )
}
