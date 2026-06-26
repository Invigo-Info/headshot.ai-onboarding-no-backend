"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { trackCTAClick } from "@/lib/gtm";

interface HeroCTAButtonProps {
  ctaText: string;
  category: string;
}

export default function HeroCTAButton({ ctaText, category }: HeroCTAButtonProps) {
  return (
    <Button
      size="lg"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg sm:text-xl px-6 py-6 sm:py-8"
      asChild
    >
      <Link
        href={`/generate/one-time/${category}-headshots?step=gender`}
        className="flex items-center"
        onClick={() =>
          trackCTAClick({
            event: "hero_cta_click",
            ctaText,
            ctaLocation: "hero",
            ctaVariant: "primary",
            category,
          })
        }
      >
        {ctaText} <ArrowRight className="ml-2 size-5" />
      </Link>
    </Button>
  );
}
