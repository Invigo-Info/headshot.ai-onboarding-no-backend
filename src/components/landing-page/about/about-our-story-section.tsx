"use client";

import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AboutOurStorySection() {
  const [isFull, setIsFull] = useState(false);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="space-y-10 text-center">
          <div className="space-y-4">
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-sm">
              Our Story
            </span>
            <h2 className="font-mont text-3xl font-semibold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem]">
              We <span className="text-blue-500">Built</span> What We Couldn&apos;t <span className="text-blue-500">Find</span>
            </h2>
          </div>

          <div className="relative mx-auto max-w-2xl rounded-3xl border border-gray-100 bg-white p-8 pb-20 shadow-sm ring-1 ring-gray-200/80 sm:p-12 sm:pb-24">
            <Button
              onClick={() => setIsFull(!isFull)}
              className="group absolute bottom-8 left-8 z-10 flex pr-2.5 sm:bottom-10 sm:left-12"
              variant="secondary"
              size="sm"
            >
              <span>Read {isFull ? "Less" : "More"}</span>
              {isFull ? (
                <Minus
                  strokeWidth={2.5}
                  className="!size-3.5 opacity-50 duration-300"
                />
              ) : (
                <Plus
                  strokeWidth={2.5}
                  className="!size-3.5 opacity-50 duration-300 group-hover:rotate-90"
                />
              )}
            </Button>

            <motion.div
              className={cn(
                "relative overflow-hidden",
                !isFull && "mask-b-from-45%"
              )}
              initial={{ height: "22rem" }}
              animate={{ height: isFull ? "auto" : "22rem" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="space-y-5 text-left text-[0.938rem] leading-[1.8] text-gray-500 sm:text-base">
                <p>
                  In 2024, our founder was preparing for a major product
                  launch&nbsp;&mdash; new website, investor deck, press
                  outreach. Everything had to look sharp. Then he glanced at his
                  LinkedIn photo. Years old.{" "}
                  <span className="font-medium text-gray-800">Blurry.</span>{" "}
                  <span className="font-medium text-gray-800">Badly lit.</span>{" "}
                  Not exactly the face of someone you&apos;d hand your money to.
                </p>
                <p>
                  Professional photographers wanted{" "}
                  <span className="inline-flex items-baseline rounded bg-blue-50 px-1.5 py-0.5 text-[0.85rem] font-semibold text-blue-600 sm:text-[0.925rem]">
                    $400&thinsp;to&thinsp;$800
                  </span>{" "}
                  &mdash; with weeks of waiting. AI tools were faster and
                  cheaper, but the results? Plastic skin, dead eyes, lighting
                  that screamed &ldquo;fake.&rdquo; It was either overpriced or
                  unusable. Nothing in between.
                </p>

                <blockquote className="border-l-2 border-blue-400/60 bg-blue-50/30 py-3 pl-5 pr-4">
                  <p className="text-[0.938rem] font-medium italic leading-relaxed text-gray-600 sm:text-base">
                    Why wasn&apos;t there something fast, affordable, and
                    actually realistic?
                  </p>
                </blockquote>

                <p>
                  In 2025, we launched an AI headshot generator that produces
                  headshots so realistic, people can&apos;t tell they&apos;re
                  AI. When the results started blowing people away, we went all
                  in and acquired{" "}
                  <span className="font-semibold text-gray-900">
                    Headshot.ai
                  </span>{" "}
                  &mdash; one of the most sought-after domains in the space. The
                  product deserved nothing less.
                </p>
                <p>
                  Today,{" "}
                  <span className="inline-flex items-baseline rounded bg-blue-50 px-1.5 py-0.5 text-[0.85rem] font-semibold text-blue-600 sm:text-[0.925rem]">
                    133,000+ professionals
                  </span>{" "}
                  across 50+ countries trust Headshot.AI&nbsp;&mdash; lawyers,
                  doctors, realtors, actors, entrepreneurs, and more. What
                  started as one founder&apos;s frustration is now the{" "}
                  <span className="font-medium text-gray-800">
                    #1 AI headshot generator
                  </span>{" "}
                  in the world.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
