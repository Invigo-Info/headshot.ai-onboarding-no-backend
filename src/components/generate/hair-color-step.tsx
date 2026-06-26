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

const hairColorSchema = z.object({
  hairColor: z.string().min(1, "Please select your hair color"),
})

export function HairColorStep() {
  const { formData, updateFormData, slug } = useFormStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof hairColorSchema>>({
    resolver: zodResolver(hairColorSchema),
    defaultValues: {
      hairColor: formData.hairColor,
    },
  })

  const handleHairColorChange = (value: string) => {
    updateFormData({ hairColor: value })
    form.setValue("hairColor", value)
  }

  const onSubmit = (data: z.infer<typeof hairColorSchema>) => {
    updateFormData(data)
    router.push(`/generate/one-time/${slug}?step=hair-type`)
  }

  const hairColors = [
    { value: "brown", label: "Brown", color: "#8B4513" },
    { value: "black", label: "Black", color: "#000000" },
    { value: "blonde", label: "Blonde", color: "#FAD5A5" },
    { value: "gray", label: "Gray", color: "#808080" },
    { value: "auburn", label: "Auburn", color: "#A52A2A" },
    { value: "red", label: "Red", color: "#FF4500" },
    { value: "white", label: "White", color: "#FFFFFF" },
    { value: "other", label: "Other", color: "linear-gradient(45deg, #ff0000, #00ff00, #0000ff)" },
  ]

  return (
    <div className="space-y-8 pb-28">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">What&apos;s your hair color?</h2>
        <p className="text-gray-600">
        Select your current hair color — pick the closest one if it&apos;s not an exact match.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="hairColor"
            render={() => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={handleHairColorChange}
                    value={formData.hairColor}
                    className="flex flex-wrap gap-4 justify-center"
                  >
                    {hairColors.map((color) => (
                      <div key={color.value} className="min-w-[200px]">
                        <RadioGroupItem value={color.value} id={color.value} className="peer sr-only" />
                        <Label
                          htmlFor={color.value}
                          className={`flex items-center gap-3 p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 ${
                            formData.hairColor === color.value 
                              ? "border-blue-500 bg-blue-50 shadow-lg scale-[1.02]" 
                              : "border-gray-200"
                          }`}
                        >
                          <div
                            className="w-6 h-6 rounded-full border border-gray-300"
                            style={{
                              background: color.value === "other" ? color.color : color.color,
                              border: color.value === "white" ? "2px solid #ccc" : undefined,
                            }}
                          />
                          <span className="font-semibold">{color.label}</span>
                          <div className={`ml-auto w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                            formData.hairColor === color.value 
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300"
                          }`}>
                            <div className={`w-2 h-2 bg-white rounded-full ${
                              formData.hairColor === color.value ? "opacity-100" : "opacity-0"
                            }`}></div>
                          </div>
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
