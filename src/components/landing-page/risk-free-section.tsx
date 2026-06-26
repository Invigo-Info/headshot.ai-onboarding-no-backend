import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

// A single risk-free reassurance point.
export interface RiskFreeItem {
  title: string;
  description: string;
}

interface RiskFreeSectionProps {
  /** Small uppercase label above the heading */
  label?: string;
  /** Main heading text */
  title?: string;
  /** Portion of the title to highlight in blue */
  highlight?: string;
  /** Supporting line below the heading */
  subtitle?: string;
  /** Reassurance points displayed in a two-column grid */
  items?: RiskFreeItem[];
  /** CTA button label */
  ctaText?: string;
  /** Category used to derive the onboarding pack slug (e.g. "business" -> "business-headshots") */
  category?: string;
  /** Optional explicit pack slug. Falls back to `${category}-headshots`. */
  slug?: string;
}

const defaultItems: RiskFreeItem[] = [
  {
    title: "Start without commitment",
    description:
      "No payment to start. Just upload your selfies and we'll generate your headshots.",
  },
  {
    title: "Preview before you pay",
    description: "See a free preview of your headshots before you decide.",
  },
  {
    title: "Don't love them? Don't pay",
    description:
      "If they're not what you wanted, just walk away. No charge, no questions.",
  },
  {
    title: "Even after paying, you're covered",
    description:
      "If you're not 100% happy, we'll redo your headshots or refund you in full.",
  },
];

export default function RiskFreeSection({
  label = "Risk-Free",
  title = "Pay only if you love your headshots.",
  highlight = "love your headshots.",
  subtitle = "We're confident you'll love them. If you don't, you don't pay.",
  items = defaultItems,
  ctaText = "Generate My Free Headshots",
  category = "professional",
  slug,
}: RiskFreeSectionProps) {
  const onboardingSlug = slug ?? `${category}-headshots`;
  const onboardingHref = `/generate/one-time/${onboardingSlug}?step=gender`;
  return (
    <section className="px-4 max-w-full w-full sm:max-w-[90%] mx-auto">
      <div className="flex flex-col items-center text-center mb-12 space-y-4">
        <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block">
          {label}
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont text-gray-900 leading-tight">
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
                  <span className="text-blue-500">{part}</span>
                ) : (
                  part
                )}
              </span>
            ));
          })()}
        </h2>

        <p className="text-gray-600 text-base xs:text-lg sm:text-xl">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 max-w-4xl mx-auto">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-4 text-left">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-green-100">
              <Check className="size-4 text-green-600" strokeWidth={3} />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-1 text-base leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg sm:text-xl px-6 py-6 sm:py-8"
          asChild
        >
          <Link href={onboardingHref} className="flex items-center">
            {ctaText} <ArrowRight className="ml-2 size-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
