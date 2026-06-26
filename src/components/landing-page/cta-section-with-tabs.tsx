"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Marquee } from "../magicui/marquee";
import Link from "next/link";

const categories = [
  { label: "Professional", key: "professional" },
  { label: "LinkedIn", key: "linkedin" },
  { label: "Corporate", key: "corporate" },
  { label: "Executive", key: "executive" },
  { label: "Business", key: "business" },
  { label: "Doctor", key: "doctor" },
  { label: "Lawyer", key: "lawyer" },
  { label: "Real Estate", key: "real-estate" },
  { label: "Actor", key: "actor" },
  { label: "Nurse", key: "nurse" },
  { label: "Teacher", key: "teacher" },
  { label: "Software Engineer", key: "software-engineer" },
  { label: "Graduation", key: "graduation" },
  { label: "Dating", key: "dating" },
  { label: "Model", key: "model" },
  { label: "CEO", key: "ceo" },
  { label: "Entrepreneur", key: "entrepreneur" },
  { label: "Surgeon", key: "surgeon" },
  { label: "Dentist", key: "dentist" },
  { label: "Therapist", key: "therapist" },
] as const;

const IMAGE_COUNT = 10;

function getImagesForCategory(category: string): string[] {
  return Array.from(
    { length: IMAGE_COUNT },
    (_, i) => `/assets/landing-page/${category}/examples/${i + 1}.webp`
  );
}

interface CTASectionWithTabsProps {
  badge?: string;
  title?: string;
  highlight?: string;
  ctaText?: string;
  subtitle?: string;
  features?: string[];
  socialProof?: string;
  /** Portion of socialProof to highlight in blue. */
  socialProofHighlight?: string;
}

export function CTASectionWithTabs({
  badge,
  title = "Your Studio-Quality Professional Headshots Are Minutes Away",
  highlight = "Professional Headshots",
  ctaText = "Get My Headshots",
  subtitle,
  features,
  socialProof,
  socialProofHighlight,
}: CTASectionWithTabsProps) {
  const [activeTab, setActiveTab] = useState("professional");
  const scrollRef = useRef<HTMLDivElement>(null);

  const images = getImagesForCategory(activeTab);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <section className="bg-white">
      <div className="max-w-full mx-auto text-center">
        {/* Optional eyebrow badge */}
        {badge && (
          <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block mb-3 sm:mb-4 px-4">
            {badge}
          </span>
        )}

        {/* CTA Header */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont text-gray-900 leading-tight mb-4 sm:mb-8 px-4 sm:px-6">
          {(() => {
            const lowerHighlight = highlight.toLowerCase();
            const parts = title.split(
              new RegExp(
                `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                "i"
              )
            );

            return parts.map((part, index) => (
              <span key={index}>
                {part.toLowerCase() === lowerHighlight ? (
                  <span className="text-blue-500">{part}</span>
                ) : (
                  part
                )}
              </span>
            ));
          })()}
        </h2>

        {/* Optional subtitle */}
        {subtitle && (
          <p className="text-lg sm:text-xl text-gray-500 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            {subtitle}
          </p>
        )}

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-blue-500 text-white font-semibold text-lg sm:text-xl px-6 py-6 sm:py-8 mb-6"
          asChild
        >
          <Link href={`/generate/one-time/${activeTab}-headshots?step=gender`}>
            {ctaText}
            <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </Button>

        {/* Optional features */}
        {features && features.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 px-4">
            {features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1.5 text-sm text-gray-500"
              >
                <Check className="w-4 h-4 text-green-500 shrink-0" strokeWidth={2.5} />
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Optional social proof */}
        {socialProof && (
          <p className="flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-gray-600 mb-12 px-4">
            <Check
              className="size-4 sm:size-5 text-green-600 shrink-0"
              strokeWidth={2.5}
            />
            <span>
              {socialProofHighlight &&
              socialProof.includes(socialProofHighlight) ? (
                (() => {
                  const [before, after] = socialProof.split(
                    socialProofHighlight
                  );
                  return (
                    <>
                      {before}
                      <span className="text-blue-500">
                        {socialProofHighlight}
                      </span>
                      {after}
                    </>
                  );
                })()
              ) : (
                socialProof
              )}
            </span>
          </p>
        )}

        {/* Category Tabs */}
        <div className={`flex items-center gap-2 max-w-5xl mx-auto px-4 ${!features && !socialProof ? "mb-8" : "mb-8"}`}>
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll tabs left"
            className="shrink-0 w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <style>{`[data-cta-hide-scrollbar]::-webkit-scrollbar { display: none; }`}</style>
          <div
            ref={scrollRef}
            data-cta-hide-scrollbar
            className="flex gap-2.5 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {categories.map((cat) => {
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scroll("right")}
            aria-label="Scroll tabs right"
            className="shrink-0 w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Headshot Gallery */}
        <Marquee key={activeTab} className="w-full">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[4/5] rounded-lg overflow-hidden w-64"
            >
              <Image
                src={src}
                alt={`${activeTab} headshot ${index + 1}`}
                fill
                className="object-cover object-top"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
