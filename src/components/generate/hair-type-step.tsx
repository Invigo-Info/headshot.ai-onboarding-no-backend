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
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"

const hairTypeSchema = z.object({
  hairType: z.string().min(1, "Please select your hair type"),
})

export function HairTypeStep() {
  const { formData, updateFormData, slug } = useFormStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof hairTypeSchema>>({
    resolver: zodResolver(hairTypeSchema),
    defaultValues: {
      hairType: formData.hairType,
    },
  })

  const handleHairTypeChange = (value: string) => {
    updateFormData({ hairType: value })
    form.setValue("hairType", value)
  }

  const onSubmit = (data: z.infer<typeof hairTypeSchema>) => {
    updateFormData(data)
    router.push(`/generate/one-time/${slug}?step=ethnicity`)
  }

  const maleHairTypes = [
    { value: "curly", label: "Curly", image: "/assets/on-boarding/base/male/hair-type/curly.webp" },
    { value: "dreadlocks", label: "Dreadlocks", image: "/assets/on-boarding/base/male/hair-type/dreadlocks.webp" },
    { value: "straight", label: "Straight", image: "/assets/on-boarding/base/male/hair-type/straight.webp" },
    { value: "wavy", label: "Wavy", image: "/assets/on-boarding/base/male/hair-type/wavy.webp" },
  ]

  const femaleHairTypes = [
    { value: "curly", label: "Curly", image: "/assets/on-boarding/base/female/hair-type/curly.webp" },
    { value: "dreadlocks", label: "Dreadlocks", image: "/assets/on-boarding/base/female/hair-type/dreadlocks.webp" },
    { value: "straight", label: "Straight", image: "/assets/on-boarding/base/female/hair-type/straight.webp" },
    { value: "wavy", label: "Wavy", image: "/assets/on-boarding/base/female/hair-type/wavy.webp" },
  ]

  const hairTypes = formData.gender === "man" ? maleHairTypes : femaleHairTypes


  return (
    <div className="space-y-8 pb-28">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">What&apos;s your hair type?</h2>
        <p className="text-gray-600">
        Select your hair texture — pick the closest one if it&apos;s not an exact match.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="hairType"
            render={() => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={handleHairTypeChange}
                    value={formData.hairType}
                    className="flex flex-wrap gap-4 justify-center"
                  >
                     {hairTypes.map((type) => (
                      <div key={type.value} className="relative w-[150px]">
                        <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                        <Label htmlFor={type.value} className="block cursor-pointer group">
                          <div className={`relative border-2 rounded-lg aspect-[4/5] w-full overflow-hidden transition-all duration-200 hover:border-gray-300 ${
                            formData.hairType === type.value 
                              ? "border-blue-500 shadow-lg scale-[1.02]" 
                              : "border-gray-200"
                          }`}>
                            <Image
                              src={type.image || "/placeholder.svg"}
                              alt={type.label}
                              fill
                              className="w-full h-48 object-cover"
                            />
                            <div className={`absolute top-2 right-2 w-6 h-6 bg-white rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              formData.hairType === type.value 
                                ? "border-blue-500 bg-blue-500 opacity-100"
                                : "border-gray-300 opacity-0"
                            }`}>
                              <Check className="w-4 h-4 text-blue-500" />
                            </div>
                          </div>
                          <p className="text-center mt-2 font-medium">{type.label}</p>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-500 font-semibold mx-auto text-center py-4 text-lg"  />
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
