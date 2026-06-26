
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormStore } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

const bodyTypeSchema = z.object({
  bodyType: z.string().min(1, "Please select your body type"),
});

export function BodyTypeStep() {
  const { formData, updateFormData, slug, getNextStep } = useFormStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof bodyTypeSchema>>({
    resolver: zodResolver(bodyTypeSchema),
    defaultValues: {
      bodyType: formData.bodyType,
    },
  });

  const handleBodyTypeChange = (value: string) => {
    updateFormData({ bodyType: value });
    form.setValue("bodyType", value);
  };

  const onSubmit = (data: z.infer<typeof bodyTypeSchema>) => {
    updateFormData(data);
    const nextStep = getNextStep("body-type");
    if (nextStep) {
      router.push(`/generate/one-time/${slug}?step=${nextStep}`);
    }
  };

  const maleBodyTypes = [
    {
      value: "slim",
      label: "Slim",
      image: "/assets/on-boarding/base/male/body-type/slim.webp",
    },
    {
      value: "regular",
      label: "Regular",
      image: "/assets/on-boarding/base/male/body-type/regular.webp",
    },
    {
      value: "athletic",
      label: "Athletic",
      image: "/assets/on-boarding/base/male/body-type/athletic.webp",
    },
    {
      value: "medium-large",
      label: "Medium Large",
      image: "/assets/on-boarding/base/male/body-type/medium-large.webp",
    },
    {
      value: "large",
      label: "Large",
      image: "/assets/on-boarding/base/male/body-type/large.webp",
    },
    {
      value: "plus-size",
      label: "Plus Size",
      image: "/assets/on-boarding/base/male/body-type/plus-size.webp",
    },
  ];

  const femaleBodyTypes = [
    {
      value: "slim",
      label: "Slim",
      image: "/assets/on-boarding/base/female/body-type/slim.webp",
    },
    {
      value: "regular",
      label: "Regular",
      image: "/assets/on-boarding/base/female/body-type/regular.webp",
    },
    {
      value: "curvy",
      label: "Curvy",
      image: "/assets/on-boarding/base/female/body-type/curvy.webp",
    },
    {
      value: "full-figured",
      label: "Full Figured",
      image: "/assets/on-boarding/base/female/body-type/full-figured.webp",
    },
    {
      value: "plus-size",
      label: "Plus Size",
      image: "/assets/on-boarding/base/female/body-type/plus-size.webp",
    },
  ];

  const bodyTypes = formData.gender === "man" ? maleBodyTypes : femaleBodyTypes;

  return (
    <div className="space-y-8 pb-28">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">
          What&apos;s your body type?
        </h2>
        <p className="text-gray-600">
Select your body type — pick the closest one if you&apos;re in between.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="bodyType"
            render={() => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={handleBodyTypeChange}
                    value={formData.bodyType}
                    className="flex flex-wrap gap-4 justify-center"
                  >
                    {bodyTypes.map((type) => (
                      <div key={type.value} className="relative w-[150px]">
                        <RadioGroupItem
                          value={type.value}
                          id={type.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={type.value}
                          className="block cursor-pointer group"
                        >
                          <div
                            className={`relative border-2 rounded-lg aspect-[4/5] w-full overflow-hidden transition-all duration-200 hover:border-gray-300 ${
                              formData.bodyType === type.value
                                ? "border-blue-500 shadow-lg scale-[1.02]"
                                : "border-gray-200"
                            }`}
                          >
                            <Image
                              src={type.image || "/placeholder.svg"}
                              alt={type.label}
                              fill
                              className="w-full h-48 object-cover"
                            />
                            <div
                              className={`absolute top-2 right-2 w-6 h-6 bg-white rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                formData.bodyType === type.value
                                  ? "border-blue-500 bg-blue-500 opacity-100"
                                  : "border-gray-300 opacity-0"
                              }`}
                            >
                              <Check className="w-4 h-4 text-blue-500" />
                            </div>
                          </div>
                          <p className="text-center mt-2 font-medium">
                            {type.label}
                          </p>
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
  );
}
