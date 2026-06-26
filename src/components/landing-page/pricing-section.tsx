"use client";

import { motion } from "framer-motion";
import { Check, X, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PricingDetails } from "@/data/one-time-pricing-details";

const testimonialFrames = [
  [
    {
      quote: "Looks like a real studio shot without any hassle at all.",
      name: "Carla M.",
      role: "Family Law Attorney",
    },
    {
      quote:
        "Clean, sharp office-style photo that finally feels truly professional.",
      name: "Amanda R.",
      role: "Civil Litigation Attorney",
    },
  ],
  [
    {
      quote:
        "Lighting and suit look natural, like a photographer actually shot it.",
      name: "Jason F.",
      role: "Employment Attorney",
    },
    {
      quote:
        "Consistent, polished portraits that made our whole firm look aligned.",
      name: "Noah B.",
      role: "Managing Partner",
    },
  ],
  [
    {
      quote:
        "Fresh, modern headshot that instantly upgraded my entire online presence.",
      name: "Steven D.",
      role: "Antitrust Counsel",
    },
    {
      quote:
        "City-style background feels authentic and far better than my old selfie.",
      name: "Hannah O.",
      role: "Appellate Lawyer",
    },
  ],
  [
    {
      quote:
        "Quality looks premium, and the expressions feel natural and relaxed.",
      name: "Julia C.",
      role: "Commercial Contracts Lawyer",
    },
    {
      quote:
        "Crisp photo that fits every platform and looks professionally taken.",
      name: "Valerie S.",
      role: "Bankruptcy Attorney",
    },
  ],
  [
    {
      quote:
        "Clients said I look more approachable, which helped build trust faster.",
      name: "Grace P.",
      role: "Immigration Lawyer",
    },
    {
      quote: "My new image boosted calls from local clients searching online.",
      name: "Liam H.",
      role: "Personal Injury Lawyer",
    },
  ],
  [
    {
      quote:
        "Updated headshot made nervous clients feel safer reaching out to me.",
      name: "Tara N.",
      role: "Plaintiff Attorney",
    },
    {
      quote:
        "Sharper, friendlier photo helped new clients feel comfortable contacting my office.",
      name: "Rosa Y.",
      role: "Estate Planning Attorney",
    },
  ],
];

type CompareCellValue = boolean | string;

interface CompareRow {
  feature: string;
  photographer: CompareCellValue;
  otherAI: CompareCellValue;
  headshotAI: CompareCellValue;
}

const comparisonRows: CompareRow[] = [
  {
    feature: "Looks just like you",
    photographer: true,
    otherAI: false,
    headshotAI: true,
  },
  {
    feature: "Studio-quality finish",
    photographer: true,
    otherAI: false,
    headshotAI: true,
  },
  {
    feature: "Time to results",
    photographer: "1+ week",
    otherAI: "30–60 minutes",
    headshotAI: "Under 5 minutes",
  },
  {
    feature: "Price",
    photographer: "$400+",
    otherAI: "$30–$80",
    headshotAI: "$25–$45",
  },
  {
    feature: "Number of headshots",
    photographer: "3–5",
    otherAI: "~50",
    headshotAI: "50–200",
  },
  {
    feature: "Variety in outfits, backgrounds, poses, and expressions",
    photographer: "Limited",
    otherAI: "Limited",
    headshotAI: true,
  },
  {
    feature: "No photographer, studio, or appointment",
    photographer: false,
    otherAI: true,
    headshotAI: true,
  },
  {
    feature: "Preview before paying",
    photographer: false,
    otherAI: false,
    headshotAI: true,
  },
  {
    feature: "100% Money-Back Guarantee",
    photographer: false,
    otherAI: false,
    headshotAI: true,
  },
  {
    feature: "Selfies kept private",
    photographer: "Sometimes",
    otherAI: false,
    headshotAI: true,
  },
  {
    feature: "Never used to train AI",
    photographer: true,
    otherAI: false,
    headshotAI: true,
  },
  {
    feature: "You own your headshots",
    photographer: true,
    otherAI: "Sometimes",
    headshotAI: true,
  },
  {
    feature: "Full commercial use",
    photographer: "Sometimes",
    otherAI: "Sometimes",
    headshotAI: true,
  },
  {
    feature: "Download as many times as you want",
    photographer: false,
    otherAI: false,
    headshotAI: true,
  },
  {
    feature: "One-time payment (no subscription)",
    photographer: true,
    otherAI: false,
    headshotAI: true,
  },
];

// Renders a single comparison cell — a yes/no marker or a text value.
function CompareCell({ value }: { value: CompareCellValue }) {
  if (typeof value === "boolean") {
    return value ? (
      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
        <Check className="w-4 h-4 text-white" />
      </div>
    ) : (
      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
        <X className="w-4 h-4 text-white" />
      </div>
    );
  }
  return (
    <span className="text-white text-sm sm:text-base text-center whitespace-nowrap">
      {value}
    </span>
  );
}

export default function PricingSection({
  pricingDetails,
  title = "Professional Headshots at a Fraction of the Cost",
  description = "Why spend $450+ on a traditional photo shoot when you can get high-resolution, studio-quality headshots from your selfies in minutes - fast, affordable, and designed for professionals who want to stand out in a competitive job market.",
  highlight = "Fraction",
  isHomePage = false,
}: {
  pricingDetails: PricingDetails;
  title?: string;
  description?: string;
  highlight?: string;
  /** Home-page-only extras: trust badges, "Every Plan Includes" box, CTA button */
  isHomePage?: boolean;
}) {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handlePlanSelect = () => {
    const category =
      pricingDetails.category.toLocaleLowerCase() || "professional";
    router.push(`/generate/one-time/${category}-headshots?step=gender`);
  };

  const testimonials = pricingDetails.testimonials || testimonialFrames.flat();

  return (
    <section
      className="px-4 bg-black/85 text-white relative max-w-[95%] sm:max-w-[90%] lg:max-w-[80%] w-full rounded-3xl mx-auto scroll-m-48"
      id="pricing"
    >
      {/* Pricing badge above the section */}
      <span className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 inline-flex items-center bg-white text-gray-900 px-5 py-2 rounded-full text-sm sm:text-base font-semibold shadow-md border border-gray-200 whitespace-nowrap">
        PRICING
      </span>

      <div className="max-w-6xl mx-auto pt-16 xs:pt-20 sm:pt-28 pb-12 xs:pb-16 sm:pb-24 w-full overflow-hidden">
        {/* Title Section */}
        <div className="text-center pb-8 pt-4 space-y-4">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont 
        capitalize"
          >
            {(() => {
              const lowerHighlight = highlight.toLowerCase();
              const parts = title.split(
                new RegExp(
                  `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                  "i",
                ),
              );

              return parts.map((part, index) => (
                <span key={index}>
                  {part.toLowerCase() === lowerHighlight ? (
                    <span className={"text-blue-500"}>{part}</span>
                  ) : (
                    part
                  )}
                </span>
              ));
            })()}
          </h2>

          <p className="text-gray-300 text-base xs:text-lg sm:text-xl mb-8 max-w-[80%] xl:max-w-full mx-auto">
            {description}
          </p>

          {/* Trust badges after the subtitle (home page only) */}
          {isHomePage && (
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 text-sm sm:text-base text-gray-200">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                100% Money-Back Guarantee
              </span>
              <span className="hidden sm:inline text-gray-600">·</span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                One-time payment, no subscription
              </span>
            </div>
          )}
        </div>

        {/* Variety note above the pricing cards (home page only) */}
        {isHomePage && (
          <div className="text-center pb-10">
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              More headshots means more variety — in outfits, backgrounds,
              poses, and expressions.
            </p>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 sm:mt-10 mb-16 max-w-5xl mx-auto">
          {pricingDetails.plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`relative bg-[#1C1C1C] rounded-2xl p-8 border  ${
                plan.popular ? "border-blue-500" : "border-zinc-800"
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              // onClick={handlePlanSelect}
            >
              {plan.badge && (
                <div
                  className={`absolute -top-3.5 left-1/2 transform -translate-x-1/2 inline-flex items-center gap-1.5 px-4 whitespace-nowrap py-1.5 rounded-full text-xs sm:text-sm font-medium ${
                    plan.badgeIsBlue
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {plan.popular && (
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  )}
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-3">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-6xl font-bold">${plan.price}</span>
                  <span className="text-gray-400 line-through ml-2">
                    ${plan.originalPrice}
                  </span>
                </div>
              </div>

              <div className="mb-8 border-y border-zinc-800 divide-y divide-zinc-800">
                {plan.pricePerHeadshot && (
                  <div className="flex items-center justify-between py-3 text-sm">
                    <span className="font-medium text-gray-400">
                      Per headshot
                    </span>
                    <span className="font-medium text-white">
                      {plan.pricePerHeadshot}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between py-3 text-sm">
                  <span className="font-medium text-gray-400">Headshots</span>
                  <span className="font-medium text-white">
                    {plan.headshots} unique
                  </span>
                </div>
              </div>

              <Button
                className={`w-full font-semibold py-3 rounded-lg text-base cursor-pointer ${
                  plan.buttonVariant === "default"
                    ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:opacity-90"
                    : "bg-white text-gray-900 hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect();
                }}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Home-page-only: "Every Plan Includes" box */}
        {isHomePage && (
          <div className="bg-[#1C1C1C] rounded-2xl p-8 mb-12 border border-zinc-800 w-fit flex flex-col gap-2 items-start mx-auto">
            <span className="text-base mb-2 font-semibold mx-auto capitalize tracking-wider text-white text-center block">
              Every Plan Includes
            </span>
            {pricingDetails.allPlansInclude ? (
              pricingDetails.allPlansInclude.map((text, idx) => (
                <p
                  key={idx}
                  className="flex items-center justify-start gap-2 text-start"
                >
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  {text}
                </p>
              ))
            ) : (
              <>
                <p className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Access to our full suite of free editing tools (50 Credits)
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  No subscriptions - One Time Payment only
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Full commercial rights - 100% yours
                </p>
              </>
            )}
          </div>
        )}

        {/* Comparison Table */}
        <div className="bg-[#1C1C1C] rounded-2xl p-8 border border-zinc-800 w-full overflow-x-auto no-scrollbar">
          <div className="text-center pt-8 pb-16 space-y-4">
            <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-white block">
              Why Headshot.AI
            </span>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont leading-tight">
              {(() => {
                const compareTitle = "Better, faster, cheaper";
                const compareHighlight = "cheaper.";
                const lowerHighlight = compareHighlight.toLowerCase();
                const parts = compareTitle.split(
                  new RegExp(
                    `(${compareHighlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                    "i",
                  ),
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
            </h3>

            <p className="text-gray-300 text-base xs:text-lg sm:text-xl max-w-2xl mx-auto">
              See how we compare to a traditional photographer or other AI
              tools.
            </p>
          </div>
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-4 mb-6">
              <div />
              <div className="text-center">
                <h4 className="text-sm sm:text-base md:text-lg font-bold">
                  Traditional Photographer
                </h4>
              </div>
              <div className="text-center">
                <h4 className="text-sm sm:text-base md:text-lg font-bold">
                  Other AI Tools
                </h4>
              </div>
              <div className="text-center">
                <h4 className="text-sm sm:text-base md:text-lg font-bold text-blue-500">
                  Headshot.AI
                </h4>
              </div>
            </div>

            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-4 py-4 border-b border-gray-700 last:border-b-0"
              >
                <div className="font-medium text-sm sm:text-base">
                  {row.feature}
                </div>
                <div className="flex items-center justify-center">
                  <CompareCell value={row.photographer} />
                </div>
                <div className="flex items-center justify-center">
                  <CompareCell value={row.otherAI} />
                </div>
                <div className="flex items-center justify-center">
                  <CompareCell value={row.headshotAI} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials carousel */}
        <div className="w-full max-w-full sm:max-w-4xl mx-auto px-0 sm:px-12 relative mt-12">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {testimonials.map((review, index) => (
                <CarouselItem key={index}>
                  <div className="flex flex-col items-center justify-center text-center pb-2 pt-4  md:pb-4 md:pt-10 lg:py-10 px-4">
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-5 h-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <h4 className="text-base md:text-lg font-medium text-white max-w-xl leading-snug mb-8">
                      &ldquo;{review?.quote}&rdquo;
                    </h4>

                    <div className="flex flex-col items-center">
                      <p className="text-sm  text-gray-400 font-medium">
                        {review?.name} | {review?.role}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Side Navigation Arrows */}
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                disabled={!api?.canScrollPrev()}
                className={cn(
                  "relative lg:absolute left-0 lg:top-1/2 lg:-translate-y-1/2 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed",
                )}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                type="button"
                onClick={() => api?.scrollNext()}
                disabled={!api?.canScrollNext()}
                className={cn(
                  "relative lg:absolute right-0 top-1/2 lg:-translate-y-1/2 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed",
                )}
                aria-label="Next slide"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  type="button"
                  key={`review-${index}`}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300 cursor-pointer",
                    current === index + 1
                      ? "bg-white scale-110"
                      : "bg-zinc-600 hover:bg-zinc-500",
                  )}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
