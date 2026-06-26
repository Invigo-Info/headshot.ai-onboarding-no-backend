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

const ageSchema = z.object({
  ageGroup: z.string().min(1, "Please select your age group"),
})

export function AgeStep() {
  const { formData, updateFormData, slug } = useFormStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof ageSchema>>({
    resolver: zodResolver(ageSchema),
    defaultValues: {
      ageGroup: formData.ageGroup,
    },
  })

  const handleAgeChange = (value: string) => {
    updateFormData({ ageGroup: value })
    form.setValue("ageGroup", value)
  }

  const onSubmit = (data: z.infer<typeof ageSchema>) => {
    updateFormData(data)
    router.push(`/generate/one-time/${slug}?step=hair-length`)
  }

  const ageGroups = ["18-20", "21-24", "25-29", "30-40", "41-50", "51-65", "65+"]

  return (
    <div className="space-y-8 pb-28">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">How old are you?</h2>
        <p className="text-gray-600">
        Select your age range.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="ageGroup"
            render={() => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={handleAgeChange}
                    value={formData.ageGroup}
                    className="flex flex-wrap gap-4 justify-center"
                  >
                    {ageGroups.map((age) => (
                      <div key={age} className="min-w-[150px]">
                        <RadioGroupItem value={age} id={age} className="peer sr-only" />
                        <Label
                          htmlFor={age}
                          className={`flex items-center justify-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 font-semibold ${
                            formData.ageGroup === age 
                              ? "border-blue-500 bg-blue-50 shadow-lg scale-[1.02]" 
                              : "border-gray-200"
                          }`}
                        >
                          {age}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-[90%] sm:w-full max-w-sm py-6 fixed bottom-4 -translate-x-1/2 left-1/2 mx-auto bg-blue-500 hover:bg-blue-600 text-white rounded-sm text-lg font-medium shadow-sm cursor-pointer"
          >
            Continue
            <ArrowRight className="size-5" />
          </Button>
        </form>
      </Form>
    </div>
  )
}
