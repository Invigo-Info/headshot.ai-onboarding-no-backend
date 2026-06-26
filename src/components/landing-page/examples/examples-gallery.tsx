"use client";

import { useState, useRef, useCallback } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { ChevronLeft, ChevronRight, MapPin, Shirt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  exampleCategories,
  type ExampleCard,
} from "@/data/examples-categories";
import { Button } from "@/components/ui/button";

function SliderHandle() {
  return (
    <div className="relative flex items-center justify-center h-full">
      <div className="h-full w-0.5 bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
      <div className="absolute w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.25)] flex items-center justify-center border border-white/80">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 3.5L2.5 9L6 14.5"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 3.5L15.5 9L12 14.5"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function CompareCard({
  card,
  categoryLabel,
  index,
}: {
  card: ExampleCard;
  categoryLabel: string;
  index: number;
}) {
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden ring-1 ring-gray-400/60"
      style={{
        animation: "exGalleryFadeIn 0.5s cubic-bezier(0.16,1,0.3,1) both",
        animationDelay: `${index * 70}ms`,
      }}
    >
      {/* Compare slider */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <ReactCompareSlider
          handle={<SliderHandle />}
          className="!absolute inset-0"
          itemOne={
            <ReactCompareSliderImage
              src={card.afterImage}
              alt={`Before - ${categoryLabel} headshot ${index + 1}`}
              className="!object-top object-cover w-full h-full"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={card.beforeImage}
              alt={`After - ${categoryLabel} headshot ${index + 1}`}
              className="!object-top object-cover w-full h-full"
            />
          }
        />

        {/* Before / After labels */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between pointer-events-none z-10">
          <Badge className="bg-gray-900/70 hover:bg-gray-900/70 text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-md backdrop-blur-md border-0 shadow-sm">
            Before
          </Badge>
          <Badge className="bg-blue-600/85 hover:bg-blue-600/85 text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-md backdrop-blur-md border-0 shadow-sm">
            After
          </Badge>
        </div>
      </div>

      {/* Environment & Attire tags */}
      <div className="px-3.5 py-3 flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 ring-1 ring-sky-100">
          <MapPin className="w-3 h-3 shrink-0" />
          {card.background}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-amber-100">
          <Shirt className="w-3 h-3 shrink-0" />
          {card.attire}
        </span>
      </div>
    </div>
  );
}

export default function ExamplesGallery() {
  const [activeKey, setActiveKey] = useState(exampleCategories[0].key);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeCategory = exampleCategories.find((c) => c.key === activeKey)!;

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <section>
      <style>{`
        @keyframes exGalleryFadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Sticky category navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl ">
        <div className="flex items-center gap-2 max-w-[95vw] sm:max-w-[90vw] lg:max-w-6xl xl:max-w-9xl mx-auto px-4 py-3.5">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll tabs left"
            className="shrink-0 w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="relative flex-1 min-w-0">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none" />
            <div
              ref={scrollRef}
              className="flex gap-2 overflow-x-auto scrollbar-none px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>{`.scrollbar-none::-webkit-scrollbar { display: none; }`}</style>
              {exampleCategories.map((cat) => {
                const isActive = activeKey === cat.key;
                return (
                  <Button
                    key={cat.key}
                    onClick={() => setActiveKey(cat.key)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                        : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300"
                    }`}
                  >
                    {cat.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            aria-label="Scroll tabs right"
            className="shrink-0 w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Category content */}
      <div key={activeKey} className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-mont text-gray-900 leading-tight mb-3">
            {activeCategory.headline}
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
            Drag the slider to see how casual selfies transform into
            studio-quality headshots 100% AI-generated.
          </p>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-12">
          {activeCategory.cards.map((card, i) => (
            <CompareCard
              key={`${activeKey}-${i}`}
              card={card}
              categoryLabel={activeCategory.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
