"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useFormStore } from "@/store/form-store"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { ArrowRight, Check } from "lucide-react"
import { useRouter } from "next/navigation" 
import Image from "next/image"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"

const hairLengthSchema = z.object({
  hairLength: z.string().min(1, "Please select your hair length"),
})

export function HairLengthStep() {
  const { formData, updateFormData, slug } = useFormStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof hairLengthSchema>>({
    resolver: zodResolver(hairLengthSchema),
    defaultValues: {
      hairLength: formData.hairLength,
    },
  })
  const handleHairLengthChange = (value: string) => {
    updateFormData({
      hairLength: value,
      // Clear hair color and hair type if user selected bald
      ...(value === "bald" && {
        hairColor: "",
        hairType: ""
      })
    })
    form.setValue("hairLength", value)
  }

  const onSubmit = (data: z.infer<typeof hairLengthSchema>) => {
    updateFormData(data)
    // If user selected bald, skip hair-color and hair-type, go to ethnicity
    const nextStep = data.hairLength === "bald" ? "ethnicity" : "hair-color"
    router.push(`/generate/one-time/${slug}?step=${nextStep}`)
  }

  const maleHairLengths = [
    { value: "bald", label: "Bald", image: "/assets/on-boarding/base/male/hair-length/bald/1.webp"},
    { value: "buzz-cut", label: "Buzz Cut", image: "/assets/on-boarding/base/male/hair-length/buzz-cut/1.webp" },
    { value: "long", label: "Long", image: "/assets/on-boarding/base/male/hair-length/long/1.webp" },
    { value: "medium", label: "Medium Length", image: "/assets/on-boarding/base/male/hair-length/medium-length/1.webp" },
    { value: "short", label: "Short", image: "/assets/on-boarding/base/male/hair-length/short/1.webp" },
  ]

  const femaleHairLengths = [
    { value: "bob-cut", label: "Bob Cut", image: "/assets/on-boarding/base/female/hair-length/bob-cut/1.webp" },
    { value: "long", label: "Long", image: "/assets/on-boarding/base/female/hair-length/long/1.webp" },
    { value: "medium", label: "Medium Length", image: "/assets/on-boarding/base/female/hair-length/medium-length/1.webp" },
    { value: "pixie-cut", label: "Pixie Cut", image: "/assets/on-boarding/base/female/hair-length/pixie-cut/1.webp" },
  ]

  const hairLengths = formData.gender === "man" ? maleHairLengths : femaleHairLengths

  // Generate hover images for each hair length option (images 2-7)
  const getHoverImages = (baseImagePath: string) => {
    const basePath = baseImagePath.replace('/1.webp', '')
    return Array.from({ length: 6 }, (_, index) => `${basePath}/${index + 2}.webp`)
  }

  return (
    <div className="space-y-8 pb-28">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">What&apos;s your hair length?</h2>
        <p className="text-gray-600">Select your current hair length — pick the closest one if you&apos;re in between.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="hairLength"
            render={() => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={handleHairLengthChange}
                    value={formData.hairLength}
                    className="flex flex-wrap gap-4 justify-center"
                  >
                    {hairLengths.map((length) => (
                      <div key={length.value} className="relative w-[150px]">
                        <RadioGroupItem value={length.value} id={length.value} className="peer sr-only" />
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Label htmlFor={length.value} className="block cursor-pointer group">
                              <div className={`relative border-2 rounded-lg aspect-[4/5] w-full overflow-hidden transition-all duration-200 hover:border-gray-300 ${
                                formData.hairLength === length.value 
                                  ? "border-blue-500 shadow-lg scale-[1.02]" 
                                  : "border-gray-200"
                              }`}>
                                <Image
                                  src={length.image || "/placeholder.svg"}
                                  alt={length.label}
                                  fill
                                  className="w-full h-48 object-cover"
                                />
                                <div className={`absolute top-2 right-2 w-6 h-6 bg-white rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                  formData.hairLength === length.value 
                                    ? "border-blue-500 bg-blue-500 opacity-100"
                                    : "border-gray-300 opacity-0"
                                }`}>
                                  <Check className="w-4 h-4 text-blue-500" />
                                </div>
                              </div>
                              <p className="text-center mt-2 font-medium">{length.label}</p>
                            </Label>
                          </HoverCardTrigger>
                          
                          <HoverCardContent className="w-xl p-4 shadow-xl" side="right" align="center">
                            <div className="grid grid-cols-3 gap-2">
                              {getHoverImages(length.image).map((image, index) => (
                                <div key={index} className="aspect-[4/5] relative rounded-md overflow-hidden bg-gray-100">
                                  <Image
                                    src={image || "/placeholder.svg"}
                                    alt={`${length.label} sample ${index + 2}`}
                                    fill
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              ))}
                            </div>
                          </HoverCardContent>
                        </HoverCard>
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
