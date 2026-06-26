"use client";

import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";

// Container orchestrates the staggered reveal of the step cards.
const cardsContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

// Each step card fades in and slides up as it enters the viewport.
const cardItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// A single numbered step in the "How It Works" flow.
export interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
}

interface HowItWorksStepsProps {
  /** Small uppercase label above the heading */
  label?: string;
  /** Main heading text */
  title?: string;
  /** Portion of the title to highlight in blue */
  highlight?: string;
  /** Supporting line below the heading */
  subtitle?: string;
  /** Portion of the subtitle rendered in a muted tone */
  subtitleHighlight?: string;
  /** Ordered steps displayed as cards */
  steps?: HowItWorksStep[];
  /** Heading for the privacy reassurance bar */
  privacyTitle?: string;
  /** Short reassurance points shown in the privacy bar */
  privacyPoints?: string[];
}

const defaultSteps: HowItWorksStep[] = [
  {
    number: 1,
    title: "Pick your outfits and backgrounds",
    description:
      "Choose the outfits and backgrounds you want your headshots in. Outfits include business professional, business casual, and smart casual. Backgrounds include studio, office, city, nature, and walls. Pick as many as you'd like.",
  },
  {
    number: 2,
    title: "Upload your selfies",
    description:
      "Any clear, recent, well-lit selfies work — even bathroom mirror shots, vacation photos, or regular phone pictures. No studio, no special lighting needed.",
  },
  {
    number: 3,
    title: "The AI does the work",
    description:
      "In seconds, our AI turns your selfies into studio-quality professional headshots that look just like you — your real face, your real features.",
  },
  {
    number: 4,
    title: "Preview your headshots for free",
    description:
      "See a free preview of your headshots — in the outfits and backgrounds you picked.",
  },
  {
    number: 5,
    title: "Pick a plan and download",
    description:
      "Love what you see? Pick a plan to unlock your full set of headshots. Don't love them? Walk away — no charge.",
  },
];

const defaultPrivacyPoints = [
  "Never shared",
  "Never sold",
  "Only used to make your headshots",
];

export default function HowItWorksSteps({
  label = "How It Works",
  title = "Get your professional headshots in 5 easy steps— under 5 minutes",
  highlight = "5 easy steps",
  subtitle = "Free to preview — pay only if you love them.",
  subtitleHighlight = "pay only if you love them.",
  steps = defaultSteps,
  privacyTitle = "Your selfies and headshots stay private.",
  privacyPoints = defaultPrivacyPoints,
}: HowItWorksStepsProps) {
  return (
    <section
      className="px-4 max-w-full sm:max-w-[90%] mx-auto"
      id="how-it-works"
    >
      {/* Section header */}
      <div className="text-center mb-10 sm:mb-14 space-y-4">
        <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block">
          {label}
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont text-gray-900 leading-tight max-w-4xl mx-auto">
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
          {(() => {
            if (!subtitleHighlight) return subtitle;
            const parts = subtitle.split(subtitleHighlight);
            return (
              <>
                {parts[0]}
                <span className="text-gray-400">{subtitleHighlight}</span>
                {parts[1]}
              </>
            );
          })()}
        </p>
      </div>

      {/* Step cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        variants={cardsContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step) => (
          <motion.div
            key={step.number}
            variants={cardItem}
            whileHover={{ y: -8 }}
            className="group flex flex-col items-center text-center rounded-2xl border border-gray-200 bg-gray-50 px-5 pt-6 pb-8 transition-all duration-300 hover:border-blue-400 hover:bg-gradient-to-b hover:from-blue-50 hover:to-white hover:shadow-xl hover:shadow-blue-200/60"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110">
              {step.number}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-500">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Privacy reassurance bar */}
      <div className="mt-10 mx-auto max-w-3xl rounded-2xl bg-blue-50 px-6 py-6 text-center">
        <p className="text-lg font-semibold text-gray-900">{privacyTitle}</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {privacyPoints.map((point) => (
            <span
              key={point}
              className="flex items-center gap-2 text-sm sm:text-base text-gray-600"
            >
              <Check className="size-4 text-green-600" strokeWidth={3} />
              {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
