"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormStore } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { onboardingFallback } from "@/data/onboarding-fallback";

type Gender = "man" | "woman" | "other";

// Number of before/after image pairs available under
// /public/assets/before-images-and-after-headshots/ (Nb.webp = original,
// Na.webp = generated headshot).
const PAIR_COUNT = 15;
const PREVIEW_BASE = "/assets/before-images-and-after-headshots";

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "man", label: "Male" },
  { value: "woman", label: "Female" },
  { value: "other", label: "Other" },
];

export function GenderStep() {
  const { formData, updateFormData, slug, getNextStep } = useFormStore();
  const router = useRouter();

  const fallback = onboardingFallback[slug];
  const womenOnly = fallback?.womenOnly === true;

  const name = formData.name ?? "";
  const gender = (formData.gender as Gender) || "";

  const genderOptions = womenOnly
    ? GENDER_OPTIONS.filter((o) => o.value === "woman")
    : GENDER_OPTIONS;

  // Randomized rotation order through the before/after pairs.
  const order = useMemo(() => {
    const arr = Array.from({ length: PAIR_COUNT }, (_, i) => i + 1);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % order.length),
      3500,
    );
    return () => clearInterval(id);
  }, [order.length]);

  const currentPair = order[index];

  const canContinue = Boolean(name.trim()) && Boolean(gender);

  const handleSubmit = () => {
    if (!canContinue) return;
    const next = getNextStep("gender");
    if (next) router.push(`/generate/one-time/${slug}?step=${next}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: form card */}
        <div className="flex min-h-150 flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Tell us about yourself
          </h2>

          {/* Name */}
          <div className="mt-8">
            <label
              htmlFor="profile-name"
              className="block text-lg font-medium text-neutral-900"
            >
              Name
            </label>
            <p className="mt-1 text-sm text-gray-500">
              We&apos;ll use this name to create your profile.
            </p>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              placeholder="Your name"
              autoComplete="name"
              className="mt-3 w-full rounded-md border border-gray-300 px-4 py-3 text-base text-neutral-900 outline-none transition-colors placeholder:text-gray-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {/* Gender */}
          <div className="mt-8">
            <span className="block text-lg font-medium text-neutral-900">
              Gender
            </span>
            <p className="mt-1 text-sm text-gray-500">
              This will help us recommend the best looks for you.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {genderOptions.map((opt) => {
                const selected = gender === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateFormData({ gender: opt.value })}
                    aria-pressed={selected}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md border px-4 py-3 text-left transition-colors focus:outline-none",
                      selected
                        ? "border-neutral-900 ring-1 ring-neutral-900"
                        : "border-gray-300 hover:border-gray-400",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        selected ? "border-neutral-900" : "border-gray-300",
                      )}
                    >
                      {selected && (
                        <span className="size-2.5 rounded-full bg-neutral-900" />
                      )}
                    </span>
                    <span className="text-base text-neutral-900">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex flex-col gap-4 pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-sm">
              <p className="text-gray-500">Want headshots for your team?</p>
              <a
                href="#"
                className="font-medium text-emerald-600 hover:text-emerald-700"
              >
                Switch to Headshot.ai for Teams
              </a>
            </div>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!canContinue}
              className="shrink-0 gap-2 rounded-md bg-blue-500 px-6 py-6 text-base font-medium text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              Continue
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Right: rotating before/after preview */}
        <div className="relative min-h-150 overflow-hidden rounded-2xl bg-black">
          {order.map((pair, i) => (
            <Image
              key={pair}
              src={`${PREVIEW_BASE}/${pair}a.webp`}
              alt="AI generated headshot preview"
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={cn(
                "object-cover object-top transition-opacity duration-700 ease-in-out",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}

          {/* Original (before) thumbnail */}
          <div className="absolute left-4 top-4 h-24 w-20 overflow-hidden rounded-md border-2 border-white/80 shadow-lg">
            <Image
              key={`thumb-${currentPair}`}
              src={`${PREVIEW_BASE}/${currentPair}b.webp`}
              alt="Original photo"
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
