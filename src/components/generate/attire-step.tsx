"use client";

import { useFormStore } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Attire options map to the prompt sub-folders
// (professional_<gender>_<attire>_*) so the selection can later filter prompts.
const ATTIRE_OPTIONS = [
  {
    key: "business-professional",
    name: "Business Professional",
    description: "Sharp blazers, tailored jackets, or classic dress shirts",
  },
  {
    key: "business-casual",
    name: "Business Casual",
    description: "Casual blazers, sleek knits, stylish dresses or blouses",
  },
  {
    key: "smart-casual",
    name: "Smart Casual",
    description: "Fitted tops, cardigans, collared shirts and blouses",
  },
];

export function AttireStep() {
  const { formData, updateFormData, slug, getNextStep } = useFormStore();
  const router = useRouter();

  // Show female reference images when "woman" is selected, male otherwise.
  const folder = formData.gender === "woman" ? "female" : "male";

  const selected = formData.attire || [];

  const toggle = (key: string) => {
    const next = selected.includes(key)
      ? selected.filter((k) => k !== key)
      : [...selected, key];
    updateFormData({ attire: next });
  };

  const canContinue = selected.length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    const next = getNextStep("attire");
    if (next) router.push(`/generate/one-time/${slug}?step=${next}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-28">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-bold text-neutral-900">Select your attire</h2>
        <p className="text-gray-600">
          Pick as many attires as you&apos;d like! Most users go with all
          available options for the best mix.
        </p>
        <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
          {selected.length} selected
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {ATTIRE_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.key);
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => toggle(option.key)}
              aria-pressed={isSelected}
              className={cn(
                "group rounded-2xl border p-3 text-left transition-all focus:outline-none",
                isSelected
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200 hover:border-gray-300",
              )}
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={`/assets/on-boarding/${slug}/${folder}/attire/${option.key}/1.webp`}
                  alt={option.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-top"
                />
                <span
                  className={cn(
                    "absolute right-2 top-2 flex size-6 items-center justify-center rounded-full border-2 transition-colors",
                    isSelected
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-white bg-white/80 text-transparent",
                  )}
                >
                  <Check className="size-4" strokeWidth={3} />
                </span>
              </div>
              <h3 className="mt-3 font-semibold text-neutral-900">
                {option.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{option.description}</p>
            </button>
          );
        })}
      </div>

      <div className="fixed bottom-4 left-1/2 z-20 w-[90%] max-w-sm -translate-x-1/2">
        <Button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
          className="w-full rounded-md bg-blue-500 py-6 text-lg font-medium text-white shadow-sm hover:bg-blue-600 disabled:bg-blue-300"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
