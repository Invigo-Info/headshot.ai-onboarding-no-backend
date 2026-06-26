import Image from "next/image";
import { Check } from "lucide-react";

// A single step in the "How It Works" flow.
export interface StepData {
  number: number;
  title: string;
  description: string;
  images: string[];
  /** Optional caption shown under each image, matched by index. */
  labels?: string[];
}

interface HowItWorksSectionProps {
  /** Small uppercase label above the heading */
  badge?: string;
  /** Main heading text */
  mainTitle: string;
  /** Portion of the heading highlighted in blue */
  highlight?: string;
  /** Supporting line below the heading */
  subtitle?: string;
  /** Ordered steps shown as cards */
  steps: StepData[];
}

// Static image-grid layouts keyed by image count — kept as full class
// strings so Tailwind doesn't purge them.
const gridLayoutByCount: Record<number, string> = {
  1: "grid-cols-1 grid-rows-1",
  2: "grid-cols-2 grid-rows-1",
  3: "grid-cols-3 grid-rows-1",
  4: "grid-cols-2 grid-rows-2",
  5: "grid-cols-3 grid-rows-2",
  6: "grid-cols-3 grid-rows-2",
  8: "grid-cols-2 grid-rows-4",
};

// Labeled picker grid — each option is an image with a green check badge
// and a caption underneath (used when a step supplies per-image labels).
function StepLabeledGrid({ step }: { step: StepData }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
      <div className="grid grid-cols-3 gap-x-3 gap-y-4">
        {step.images.map((src, i) => (
          <div key={src} className="flex flex-col">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={src}
                alt={step.labels?.[i] ?? `${step.title} option ${i + 1}`}
                fill
                sizes="(max-width: 768px) 28vw, 14vw"
                className="object-cover object-top"
              />
              <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-green-500 ring-2 ring-white">
                <Check className="size-3 text-white" strokeWidth={3.5} />
              </span>
            </div>
            {step.labels?.[i] && (
              <span className="mt-1.5 text-center text-xs font-medium leading-tight text-gray-600">
                {step.labels[i]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Fixed-height collage of a step's example images.
function StepCollage({ step }: { step: StepData }) {
  const layout =
    gridLayoutByCount[step.images.length] ?? "grid-cols-3 grid-rows-3";

  return (
    <div className="h-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-md">
      <div className={`grid h-full gap-1.5 p-1.5 ${layout}`}>
        {step.images.map((src, i) => (
          <div
            key={src}
            className="relative overflow-hidden rounded-lg bg-gray-100"
          >
            <Image
              src={src}
              alt={`${step.title} example ${i + 1}`}
              fill
              sizes="(max-width: 768px) 45vw, (max-width: 1280px) 22vw, 13vw"
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HowItWorksSection({
  badge = "How It Works",
  mainTitle,
  highlight,
  subtitle,
  steps,
}: HowItWorksSectionProps) {
  const titleParts = highlight ? mainTitle.split(highlight) : [mainTitle];

  return (
    <section
      className="px-4 max-w-full sm:max-w-[90%] mx-auto"
      id="how-it-works"
    >
      {/* Section header */}
      <div className="text-center mb-10 sm:mb-14 space-y-4">
        <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block">
          {badge}
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont text-gray-900 leading-tight max-w-4xl mx-auto">
          {titleParts[0]}
          {highlight && <span className="text-blue-500">{highlight}</span>}
          {titleParts[1]}
        </h2>

        {subtitle && (
          <p className="text-gray-600 text-base xs:text-lg sm:text-xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Step cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10 lg:gap-x-8 items-start">
        {steps.map((step) => (
          <div key={step.number} className="group flex flex-col">
            {step.labels && step.labels.length > 0 ? (
              <StepLabeledGrid step={step} />
            ) : (
              <StepCollage step={step} />
            )}

            <div className="mt-5 flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-500 whitespace-pre-line">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
