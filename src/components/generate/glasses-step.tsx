"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useFormStore } from "@/store/form-store"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

const glassesSchema = z.object({
  glassesPreference: z.string().min(1, "Please select your glasses preference"),
})

export function GlassesStep() {
  const { formData, updateFormData, slug } = useFormStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof glassesSchema>>({
    resolver: zodResolver(glassesSchema),
    defaultValues: {
      glassesPreference: formData.glassesPreference,
    },
  })

  const handleGlassesChange = (value: string) => {
    updateFormData({ glassesPreference: value })
    form.setValue("glassesPreference", value)
  }

  const onSubmit = (data: z.infer<typeof glassesSchema>) => {
    updateFormData(data)
    router.push(`/generate/one-time/${slug}?step=review`)
  }

  return (
    <div className="space-y-8 pb-28">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Do you want your headshots with or without glasses?</h2>
        </div>
        <p className="text-gray-600">
          Choose how you want to appear in your headshots.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="glassesPreference"
            render={() => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={handleGlassesChange}
                    value={formData.glassesPreference}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {[
                      {
                        value: "with-glasses",
                        label: "With Glasses",
                        description: "All headshots will have glasses",
                      },
                      {
                        value: "without-glasses",
                        label: "Without Glasses",
                        description: "All headshots without glasses",
                      },
                      {
                        value: "mix",
                        label: "Mix of Both",
                        description: "Half with glasses, half without",
                      },
                    ].map((option) => (
                      <div key={option.value}>
                        <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                        <Label
                          htmlFor={option.value}
                          className={`flex flex-col items-start gap-3 p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 ${
                            formData.glassesPreference === option.value
                              ? "border-blue-500 bg-blue-50 shadow-lg scale-[1.02]"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <span className="font-semibold text-base sm:text-lg">{option.label}</span>
                            <div
                              className={`ml-auto w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                                formData.glassesPreference === option.value
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300"
                              }`}
                            >
                              <div
                                className={`w-2 h-2 bg-white rounded-full ${
                                  formData.glassesPreference === option.value ? "opacity-100" : "opacity-0"
                                }`}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-600">{option.description}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-500 font-semibold mx-auto text-center py-4 text-lg" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-[90%] sm:w-full max-w-sm py-6 fixed bottom-4 cursor-pointer -translate-x-1/2 left-1/2 mx-auto bg-blue-500 hover:bg-blue-600 text-white rounded-sm text-lg font-medium shadow-sm"
          >
            Continue
            <ArrowRight className="size-5" />
          </Button>
        </form>
      </Form>
    </div>
  )
}
