"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MediaKitHeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-28 sm:py-36 lg:py-44">
      {/* Subtle grid background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full mask-[radial-gradient(40rem_40rem_at_center,white,transparent)] stroke-gray-100"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="media-kit-grid"
            width={80}
            height={80}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 80V.5H80" fill="none" />
          </pattern>
        </defs>
        <rect
          fill="url(#media-kit-grid)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>

      <div className="relative mx-auto max-w-[90%]">
        <div className="mx-auto max-w-3xl text-center">
          {/* Label */}
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-sm">
              For Press &amp; Media
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`mt-6 font-mont text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl/tight transition-all duration-700 delay-100 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <span className="text-blue-500">Media</span> Kit
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-6 text-lg text-gray-600 sm:text-xl/relaxed transition-all duration-700 delay-200 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
Everything you need to cover Headshot.AI — including logos, brand assets, product screenshots, and official press materials.
          </p>

          {/* CTA */}
          <div
            className={`mt-10 transition-all duration-700 delay-300 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base sm:text-lg px-6 py-6 sm:py-7 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
              asChild
            >
              <a href="#downloads">
                Download Full Kit
                <ArrowDown className="ml-2 size-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
