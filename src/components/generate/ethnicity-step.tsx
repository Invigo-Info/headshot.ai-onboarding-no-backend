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

const ethnicitySchema = z.object({
  ethnicity: z.string().min(1, "Please select your ethnicity"),
})

export function EthnicityStep() {
  const { formData, updateFormData, slug } = useFormStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof ethnicitySchema>>({
    resolver: zodResolver(ethnicitySchema),
    defaultValues: {
      ethnicity: formData.ethnicity,
    },
  })

  const handleEthnicityChange = (value: string) => {
    updateFormData({ ethnicity: value })
    form.setValue("ethnicity", value)
  }

  const onSubmit = (data: z.infer<typeof ethnicitySchema>) => {
    updateFormData(data)
    router.push(`/generate/one-time/${slug}?step=body-type`)
  }

  const ethnicities = [
    {
      label: "White / Caucasian",
      value: "white / caucasian"
    },
    {
      label: "African American",
      value: "african american"
    },
    {
      label: "East or Central Asian",
      value: "east or central asian"
    },
    {
      label: "Hispanic, Latino, Spanish origin",
      value: "hispanic, latino, spanish origin"
    },
    {
      label: "Middle Eastern, North African, or Arab",
      value: "middle eastern, north african, or arab"
    },
    {
      label: "Multiracial",
      value: "multiracial"
    },
    {
      label: "Native Hawaiian or other Pacific Islander",
      value: "native hawaiian or other pacific islander"
    },
    {
      label: "Southeast Asian (Vietnamese, Cambodian, etc.)",
      value: "southeast asian"
    },
    {
      label: "South Asian (Indian, Pakistani, Bangladeshi, etc.)",
      value: "south asian"
    },
    {
      label: "Other",
      value: "other"
    },
  ]
  

  return (  
    <div className="space-y-8 pb-28">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">What&apos;s your ethnicity?</h2>
        <p className="text-gray-600">
        Select the option that best describes your background.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="ethnicity"
            render={() => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={handleEthnicityChange}
                    value={formData.ethnicity}
                    className="flex flex-wrap gap-4 justify-center"
                  >
                    {ethnicities.map((ethnicity) => (
                      <div key={ethnicity.value} className="min-w-[200px]">
                        <RadioGroupItem
                          value={ethnicity.value}
                          id={ethnicity.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={ethnicity.value}
                          className={`flex items-center justify-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 font-semibold ${
                            formData.ethnicity === ethnicity.value 
                              ? "border-blue-500 bg-blue-50 shadow-lg scale-[1.02]" 
                              : "border-gray-200"
                          }`}
                        >
                          {ethnicity.label}
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
