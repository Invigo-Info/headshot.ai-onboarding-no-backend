"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle, Check } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// TypeScript interfaces for component props
export interface StepData {
  number: number;
  title: string;
  description: string;
  images: string[];
  labels?: string[];
  status?: string;
}

export interface HowItWorksProps {
  /** Main title displayed at the top of the section */
  mainTitle?: string;
  /** Subtitle displayed below the main title */
  subtitle?: string;
  /** Array of step data objects, must contain exactly 4 steps */
  steps?: StepData[];
  highlight?: string;
}

// Default data - same as the original hardcoded data
const defaultSteps: StepData[] = [
  {
    number: 1,
    title: "Upload Selfies - No Photoshoot Needed",
    description:
      "Upload 6-12 well-lit selfies, taken at eye level. Casual clothes are totally fine-our AI applies your selected outfit and background seamlessly.",
    images: [
      "/assets/auth/Casual Confidence Portrait.jpeg",
      "/assets/auth/Confident Woman Portrait.jpeg",
      "/assets/auth/Distinguished Man in Formal Setting.jpeg",
      "/assets/auth/Professional Woman Portrait.jpeg",
      "/assets/auth/Casual Confidence Portrait.jpeg",
      "/assets/auth/Confident Woman Portrait.jpeg",
    ],
    status: "🎉 Uploaded successfully",
  },
  {
    number: 2,
    title: "Pick Your Look",
    description:
      "Start by choosing the attire that fits your industry and personal style such as Business Professional, Business Casual, or Smart Casual. Then, select your ideal background from studio, modern office, urban city, etc.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    labels: ["Professional", "Business casual", "Smart casual"],
  },
  {
    number: 3,
    title: "Let AI Do the Work",
    description:
      "Our proprietary AI generates stunningly realistic, professionally styled headshots from your uploaded selfies. Once ready, your full gallery will be available to preview & download instantly.",
    images: ["/assets/auth/Professional Woman Portrait.jpeg"],
  },
  {
    number: 4,
    title: "Review & Download Your Favorites",
    description:
      "Preview your personalized gallery, mark your favorite images, and download the ones that align with your personal brand. You'll receive up to 100 high-resolution headshots, suitable for both digital and print use.",
    images: [
      "/assets/auth/Casual Confidence Portrait.jpeg",
      "/assets/auth/Confident Woman Portrait.jpeg",
      "/assets/auth/Distinguished Man in Formal Setting.jpeg",
      "/assets/auth/Professional Woman Portrait.jpeg",
      "/assets/auth/Casual Confidence Portrait.jpeg",
      "/assets/auth/Confident Woman Portrait.jpeg",
    ],
  },
];

// Individual Step Card Component
const StepCard = ({
  step,
  index,
  no,
}: {
  step: StepData;
  index: number;
  no: number;
}) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    hover: {
      y: -8,
      scale: 1.02,
    },
  };

  const imageVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <div className="flex flex-col space-y-6 max-w-md">
      {/* Animation Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
        className="group cursor-pointer"
      >
        <div
          className={`bg-white rounded-3xl p-4 h-72 xs:h-90 xl:h-80 border border-gray-200 relative overflow-hidden shadow shadow-blue-100`}
        >
          {/* Animation Area */}
          <div className="relative w-full h-full flex items-center justify-center">
            {step.number === 1 && (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <div
                  className={`grid grid-cols-3 ${step.images.length > 3 ? "grid-rows-2 place-items-start" : "grid-rows-1 place-items-center"} gap-1 sm:gap-2 lg:gap-3 max-w-full w-full mx-auto border-gray-300  rounded-xl p-2`}
                >
                  {step.images
                    .slice(0, step.images.length > 3 ? 6 : 3)
                    .map((img, idx) => (
                      <motion.div
                        key={idx}
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{
                          scale: 1.1,
                          rotate: [-1, 1, -1],
                          transition: { duration: 0.3 },
                        }}
                        className="relative w-full flex flex-col items-center"
                      >
                        <div className="relative aspect-square w-full">
                          <Image
                            src={img}
                            alt={step.labels?.[idx] || `Option ${idx + 1}`}
                            fill
                            sizes="(max-width: 1200px) 50vw, 33vw"
                            className="rounded-xl object-cover object-top shadow-md border-2 border-white w-full h-full"
                          />
                          <motion.div
                            className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8 + idx * 0.1 }}
                          >
                            <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                          </motion.div>
                        </div>
                        {step.labels?.[idx] && (
                          <motion.p
                            className="text-xs text-gray-600 mt-1 sm:mt-2 text-center font-medium leading-tight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 + idx * 0.1 }}
                          >
                            {step.labels[idx]}
                          </motion.p>
                        )}
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {step.number === 2 && (
              <div className="flex items-center justify-center gap-2 sm:gap-4 w-full h-full">
                {step.images.slice(0, 3).map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="text-center relative w-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.2, duration: 0.6 }}
                      className="relative flex items-center justify-center aspect-[4/5] w-full min-w-20 sm:min-w-24 lg:min-w-32"
                    >
                      <Image
                        src={img}
                        alt={step.labels?.[idx] || ""}
                        fill
                        sizes="(max-width: 1200px) 50vw, 33vw"
                        className="rounded-xl object-cover object-top shadow-lg border-2 border-white w-full h-full"
                      />
                      {/* Check icon overlay */}
                      <motion.div
                        className={`absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + idx * 0.2 }}
                      >
                        <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}

            {step.number === 3 && (
              <div className="flex items-center justify-center">
                <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                  <Image
                    src={step.images[0]}
                    alt="AI Processing"
                    width={180}
                    height={240}
                    sizes="(max-width: 1200px) 50vw, 33vw"
                    className="rounded-2xl object-cover object-top shadow-2xl border-4 border-white w-32 h-40 sm:w-40 sm:h-52 lg:w-44 lg:h-60"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl"
                    animate={{
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
            )}

            {step.number === 4 && (
              <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-full w-full">
                {step.images.slice(0, 9).map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="relative overflow-hidden rounded-lg group/image aspect-square w-full"
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: idx * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Result ${idx + 1}`}
                      fill
                      sizes="(max-width: 1200px) 50vw, 33vw"
                      className="rounded-lg object-cover object-top w-full h-full shadow-md border border-white"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: [-60, 60] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2 + idx * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover/image:opacity-100 rounded-lg"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Step Details - Always below each card */}
      <motion.div
        className=" px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
      >
        <div className="flex items-center justify-start mb-3">
          <span className={` font-bold text-sm sm:text-base mr-3`}>
            <span
              className={`size-8 rounded-full bg-blue-500 text-white flex items-center justify-center `}
            >
              {no}
            </span>
          </span>
          <h3 className="font-semibold text-gray-900 leading-tight font-mont text-sm sm:text-base  text-left">
            {step.title}
          </h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
};

/**
 * Dynamic "How It Works" section component with animated step cards
 *
 * @param mainTitle - Main heading text (default: "From Selfies to Studio Quality Headshots")
 * @param subtitle - Subheading text (default: "Get it done in 1-2-3-4 easy Steps!")
 * @param steps - Array of 4 step objects with images, titles, and descriptions (default: defaultSteps)
 *
 * @example
 * ```tsx
 * // Using default data
 * <HowItWorksSection />
 *
 * // With custom data
 * <HowItWorksSection
 *   mainTitle="Custom Process Title"
 *   subtitle="Easy as 1-2-3-4!"
 *   steps={customStepsData}
 * />
 * ```
 */
export default function HowItWorksSection({
  mainTitle = "From Selfies to Studio Quality Headshots",
  subtitle = "Get it done in 1-2-3-4 easy Steps!",
  highlight = "Studio Quality",
  steps = defaultSteps,
}: HowItWorksProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
      className="px-4  max-w-full sm:max-w-[90%] mx-auto"
      id="how-it-works"
    >
      <motion.div
        className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block">
          How It Works
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont leading-tight">
          {(() => {
            const lowerHighlight = highlight.toLowerCase();
            const parts = mainTitle.split(
              new RegExp(
                `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                "i"
              )
            );

            return parts.map((part, index) => (
              <span key={index}>
                {part.toLowerCase() === lowerHighlight ? (
                  <span className={"text-blue-500 relative"}>
                    {part}{" "}
                    {/* <motion.div
                      className={`absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-1 bg-blue-200 rounded-full`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    /> */}
                  </span>
                ) : (
                  part
                )}
              </span>
            ));
          })()}
        </h2>

        <p className="text-gray-600 text-base xs:text-lg sm:text-xl">{subtitle}</p>
      </motion.div>

      {/* Mobile/Tablet Carousel (below lg) */}
      <div className="xl:hidden overflow-hidden">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: false,
          }}
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {steps.map((step, index) => (
              <CarouselItem key={index} className="pl-2 sm:pl-4 md:basis-1/2">
                <StepCard step={step} index={index} no={index + 1} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-12" />
          <CarouselNext className="hidden sm:flex -right-12" />

          {/* Mobile Navigation Buttons */}
          <div className="flex justify-start gap-2 mt-8 xl:hidden">
            <CarouselPrevious
              className={`relative size-10 translate-0 left-auto  disabled:opacity-50 disabled:cursor-not-allowed`}
              variant="outline"
            />
            <CarouselNext
              className={`relative size-10  right-auto translate-0 disabled:opacity-50 disabled:cursor-not-allowed`}
              variant="outline"
            />
          </div>
        </Carousel>
      </div>

      {/* Desktop Grid (lg and above) */}
      <motion.div
        className="hidden xl:grid xl:grid-cols-4 gap-6 xl:gap-8"
        style={{
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
        }}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {steps.map((step, index) => (
          <StepCard key={index} step={step} no={index + 1} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
