"use client";

import Image from "next/image";
import React, { useMemo, useRef, useEffect, useState, useCallback } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryReviewsSectionProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  description?: string;
  category?: string;
}

// Generate gallery images array
const generateGalleryImages = (category: string, count: number): GalleryImage[] => {
  return Array.from({ length: count }, (_, i) => ({
    src: `/assets/landing-page/${category}/examples/${i + 1}.webp`,
    alt: `${category} headshot ${i + 1}`,
  }));
};

// Memoized Image Card Component
const GalleryImageCard = React.memo(({ image }: { image: GalleryImage }) => (
  <div className="relative w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 break-inside-avoid mb-4">
    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        className="object-cover object-top"
      />
    </div>
  </div>
));

GalleryImageCard.displayName = "GalleryImageCard";

// Highlighted text renderer
const HighlightedTitle = React.memo(({ title, highlight }: { title: string; highlight?: string }) => {
  if (!highlight) return <>{title}</>;

  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = title.split(new RegExp(`(${escapedHighlight})`, "i"));

  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part.toLowerCase() === highlight.toLowerCase() ? (
            <span className="text-blue-500">{part}</span>
          ) : (
            part
          )}
        </span>
      ))}
    </>
  );
});

HighlightedTitle.displayName = "HighlightedTitle";

// Single animated grid component
interface AnimatedGalleryGridProps {
  images: GalleryImage[];
  columnCount: number;
  speed?: number;
}

const AnimatedGalleryGrid = ({ images, columnCount, speed = 0.5 }: AnimatedGalleryGridProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [singleSetHeight, setSingleSetHeight] = useState(0);
  const positionRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  // Triple images for seamless infinite loop
  const tripleImages = useMemo(() => [...images, ...images, ...images], [images]);

  const calculateHeight = useCallback(() => {
    if (trackRef.current) {
      // Height of one complete set (1/3 of total since we tripled)
      const totalHeight = trackRef.current.scrollHeight;
      setSingleSetHeight(totalHeight / 3);
    }
  }, []);

  useEffect(() => {
    // Wait for images to render and calculate height
    const timer = setTimeout(calculateHeight, 300);
    window.addEventListener("resize", calculateHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateHeight);
    };
  }, [calculateHeight, tripleImages, columnCount]);

  useEffect(() => {
    if (singleSetHeight === 0 || !trackRef.current) return;

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Normalize speed to ~60fps for consistent animation
      const normalizedSpeed = speed * (deltaTime / 16.67);

      // Move upward (negative Y)
      positionRef.current -= normalizedSpeed;

      // Seamless reset when one set has scrolled
      if (positionRef.current <= -singleSetHeight) {
        positionRef.current += singleSetHeight;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateY(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [singleSetHeight, speed]);

  return (
    <div className="w-full h-full overflow-hidden">
      <div
        ref={trackRef}
        className="will-change-transform"
        style={{
          columnCount: columnCount,
          columnGap: "1rem",
        }}
      >
        {tripleImages.map((image, index) => (
          <GalleryImageCard key={`${image.src}-${index}`} image={image} />
        ))}
      </div>
    </div>
  );
};

export default function GalleryReviewsSection({
  title = "Not made in a studio. Created by AI.",
  highlight = "Created by AI.",
  subtitle = "Don't just take our word for it. Our AI headshot generator turns everyday photos into stunning professional headshots, that reflect your confidence & credibility.",
  category = "professional",
  // description = "These headshots look like they were shot in a studio - but they're 100% AI-generated from your selfies.",
}: GalleryReviewsSectionProps) {
  const [columnCount, setColumnCount] = useState(2);

  // Generate 32 images
  const galleryImages = useMemo(() => generateGalleryImages(category, 32), [category]);

  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) setColumnCount(5);      // xl: 5 columns
      else if (width >= 1024) setColumnCount(4); // lg: 4 columns
      else if (width >= 768) setColumnCount(3);  // md: 3 columns
      else setColumnCount(2);                     // mobile: 2 columns
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  return (
    <section
      className="px-4 max-w-full w-full sm:max-w-[90%] mx-auto scroll-m-40"
      aria-label="Gallery of AI-generated headshots"
      id="examples"
    >
      <div className="text-left mb-8 space-y-4">
        <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block">
          See For Yourself
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont leading-tight">
          <HighlightedTitle title={title} highlight={highlight} />
        </h2>

        <p className="text-gray-600 text-base xs:text-lg sm:text-xl max-w-4xl xl:max-w-full mb-4">
          {subtitle}
        </p>

        {/* <span className="w-full inline-block text-gray-400 text-left sm:text-center text-sm">
          {description}
        </span> */}
      </div>

      <div
        className="relative h-[800px] w-full overflow-hidden rounded-lg bg-background"
        role="img"
        aria-label="Scrolling gallery of AI-generated professional headshots"
      >
        {/* Single animated container with CSS columns */}
        <div className="w-full h-full px-2">
          <AnimatedGalleryGrid
            key={columnCount} // Re-mount when column count changes for proper recalculation
            images={galleryImages}
            columnCount={columnCount}
            speed={0.5}
          />
        </div>

        {/* Gradient overlays for fade effect */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white dark:from-background to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white dark:from-background to-transparent z-10"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}