"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const columnOneImages = [
  { src: "/assets/landing-page/professional/examples/1.webp", alt: "Professional headshot" },
  { src: "/assets/landing-page/corporate/examples/3.webp", alt: "Corporate headshot" },
  { src: "/assets/landing-page/linkedin/examples/5.webp", alt: "LinkedIn headshot" },
  { src: "/assets/landing-page/executive/examples/2.webp", alt: "Executive headshot" },
  { src: "/assets/landing-page/professional/examples/14.webp", alt: "Professional headshot" },
  { src: "/assets/landing-page/corporate/examples/10.webp", alt: "Corporate headshot" },
];

const columnTwoImages = [
  { src: "/assets/landing-page/professional/examples/7.webp", alt: "Professional headshot" },
  { src: "/assets/landing-page/business/examples/4.webp", alt: "Business headshot" },
  { src: "/assets/landing-page/corporate/examples/8.webp", alt: "Corporate headshot" },
  { src: "/assets/landing-page/professional/examples/10.webp", alt: "Professional headshot" },
  { src: "/assets/landing-page/linkedin/examples/12.webp", alt: "LinkedIn headshot" },
  { src: "/assets/landing-page/professional/examples/11.webp", alt: "Professional headshot" },
];

const columnThreeImages = [
  { src: "/assets/landing-page/linkedin/examples/8.webp", alt: "LinkedIn headshot" },
  { src: "/assets/landing-page/professional/examples/15.webp", alt: "Professional headshot" },
  { src: "/assets/landing-page/corporate/examples/5.webp", alt: "Corporate headshot" },
  { src: "/assets/landing-page/executive/examples/4.webp", alt: "Executive headshot" },
  { src: "/assets/landing-page/business/examples/6.webp", alt: "Business headshot" },
  { src: "/assets/landing-page/professional/examples/18.webp", alt: "Professional headshot" },
];

const highlights = ["7.2M+ headshots generated", "50+ countries", "4.9/5 rating"];

/* ── Vertical marquee track (requestAnimationFrame-based) ── */

interface VerticalMarqueeTrackProps {
  images: { src: string; alt: string }[];
  direction: "up" | "down";
}

const VerticalMarqueeTrack = ({ images, direction }: VerticalMarqueeTrackProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(0);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);

  const calculateHeight = useCallback(() => {
    if (trackRef.current) {
      const singleSetHeight = trackRef.current.scrollHeight / 3;
      setTrackHeight(singleSetHeight);
    }
  }, []);

  useEffect(() => {
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, [calculateHeight]);

  useEffect(() => {
    if (!trackHeight || !trackRef.current) return;

    const speed = 0.5;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const normalizedSpeed = speed * (deltaTime / 16.67);

      if (direction === "up") {
        positionRef.current -= normalizedSpeed;
        if (positionRef.current <= -trackHeight) {
          positionRef.current += trackHeight;
        }
      } else {
        positionRef.current += normalizedSpeed;
        if (positionRef.current >= 0) {
          positionRef.current -= trackHeight;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateY(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    if (direction === "down") {
      positionRef.current = -trackHeight;
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trackHeight, direction]);

  const tripleImages = [...images, ...images, ...images];

  return (
    <div
      ref={trackRef}
      className="flex flex-col gap-4 will-change-transform"
      style={{ transform: "translateY(0px)" }}
    >
      {tripleImages.map((img, i) => (
        <div
          key={`${direction}-${i}`}
          className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-2xl"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 208px"
            className="object-cover object-top"
            priority={i < 3}
          />
        </div>
      ))}
    </div>
  );
};

/* ── Hero section ── */

export default function AboutHeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Background decoration */}
      {/* <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="about-hero-grid"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#about-hero-grid)" width="100%" height="100%" strokeWidth={0} />
      </svg> */}

      {/* <div
        aria-hidden="true"
        className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
        />
      </div> */}

      <div className="mx-auto max-w-[90%] pt-10 pb-24 sm:pb-32 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: Text content ── */}
          <div className="max-w-2xl">
            <span className="block text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400">
              About Us
            </span>

            <h1 className="mt-8 text-4xl xs:text-5xl font-bold tracking-tighter text-pretty text-gray-900 sm:text-6xl leading-[1.1]">
              We&apos;re Making Professional Headshots{" "}
              <span className="text-blue-500">Accessible to Everyone</span>
            </h1>

            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              The #1 AI headshot generator &mdash; turning casual selfies into
              realistic, studio-quality headshots in minutes. Trusted by{" "}
              <span className="text-blue-500 font-semibold">133,000+</span>{" "}
              professionals worldwide.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-green-600 shrink-0" />
                  <span className="text-sm sm:text-base font-medium text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-x-6">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base sm:text-lg px-6 py-6 sm:py-7"
                asChild
              >
                <Link href="/generate/one-time/professional-headshots?step=gender">
                  Get My Headshots <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* ── Right: Triple vertical marquee ── */}
          <div className="relative h-[32rem] sm:h-[36rem] lg:h-[40rem]">
            {/* Top gradient fade */}
            <div
              className="absolute inset-x-0 top-0 z-20 h-16 sm:h-32 bg-gradient-to-b from-white to-transparent pointer-events-none"
              aria-hidden="true"
            />
            {/* Bottom gradient fade */}
            <div
              className="absolute inset-x-0 bottom-0 z-20 h-16 sm:h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-3 gap-4 sm:gap-5 h-full">
              {/* Column 1 — scrolls up */}
              <div className="overflow-hidden">
                <VerticalMarqueeTrack images={columnOneImages} direction="up" />
              </div>

              {/* Column 2 — scrolls down */}
              <div className="overflow-hidden">
                <VerticalMarqueeTrack images={columnTwoImages} direction="down" />
              </div>

              {/* Column 3 — scrolls up */}
              <div className="overflow-hidden">
                <VerticalMarqueeTrack images={columnThreeImages} direction="up" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
