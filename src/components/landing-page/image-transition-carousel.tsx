"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useRef, useEffect, useState, useCallback } from "react";

interface ImagePair {
  before: string;
  after: string;
}

const getImageData = (category: string): ImagePair[] => {
  const images: ImagePair[] = [];
  for (let i = 1; i <= 15; i++) {
    images.push({
      before: `/assets/landing-page/${category}/before-n-after/${i}b.webp`,
      after: `/assets/landing-page/${category}/before-n-after/${i}a.webp`,
    });
  }
  return images;
};

interface ImageCardProps {
  src: string;
  alt: string;
  variant: "before" | "after";
}

const ImageCard = React.memo(({ src, alt, variant }: ImageCardProps) => (
  <div className="flex-shrink-0 px-2">
    <div className="relative w-48 sm:w-64 aspect-[4/5] rounded-2xl overflow-hidden">
      <Image
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        fill
        priority
        sizes="(max-width: 640px) 192px, 256px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      {variant === "after" && (
        <div className="absolute bottom-4 right-4 bg-blue-500/90 backdrop-blur-sm p-2 rounded-md flex items-center gap-2">
          <Sparkles className="size-4 text-white" aria-hidden="true" />
        </div>
      )}
    </div>
  </div>
));

ImageCard.displayName = "ImageCard";

interface MarqueeTrackProps {
  images: ImagePair[];
  direction: "left" | "right";
  variant: "before" | "after";
}

const MarqueeTrack = ({ images, direction, variant }: MarqueeTrackProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);

  // Calculate single set width (we'll use 3 sets for seamless looping)
  const calculateWidth = useCallback(() => {
    if (trackRef.current) {
      // Width of one complete set of images
      const singleSetWidth = trackRef.current.scrollWidth / 3;
      setTrackWidth(singleSetWidth);
    }
  }, []);

  useEffect(() => {
    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [calculateWidth]);

  useEffect(() => {
    if (!trackWidth || !trackRef.current) return;

    const speed = 1.2; // pixels per frame - adjust for desired speed
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Normalize to ~60fps for consistent speed
      const normalizedSpeed = speed * (deltaTime / 16.67);

      if (direction === "left") {
        positionRef.current -= normalizedSpeed;
        // Reset when we've scrolled one full set
        if (positionRef.current <= -trackWidth) {
          positionRef.current += trackWidth;
        }
      } else {
        positionRef.current += normalizedSpeed;
        // Reset when we've scrolled one full set
        if (positionRef.current >= 0) {
          positionRef.current -= trackWidth;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize position for right-moving track
    if (direction === "right") {
      positionRef.current = -trackWidth;
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trackWidth, direction]);

  // Triple the images for seamless infinite scroll
  const tripleImages = [...images, ...images, ...images];

  return (
    <div
      ref={trackRef}
      className="flex will-change-transform"
      style={{ transform: "translateX(0px)" }}
    >
      {tripleImages.map((img, index) => (
        <ImageCard
          key={`${variant}-${index}`}
          src={variant === "before" ? img.before : img.after}
          alt={`${variant === "before" ? "Original" : "AI Generated"} ${(index % images.length) + 1}`}
          variant={variant}
        />
      ))}
    </div>
  );
};

interface ImageTransitionCarouselProps {
  category?: string;
}

const ImageTransitionCarousel = ({
  category = "professional",
}: ImageTransitionCarouselProps) => {
  const imageData = getImageData(category);

  return (
    <div className="w-full h-[320px] relative mb-8" role="region" aria-label="Before and after image comparison carousel">
      <div className="relative h-full flex items-center">
        {/* Left side - Before images scrolling left */}
        <div className="absolute inset-0 flex items-center">
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
            }}
          >
            <div className="absolute inset-0 flex items-center">
              <MarqueeTrack
                images={imageData}
                direction="right"
                variant="before"
              />
            </div>
          </div>
        </div>

        {/* Right side - After images scrolling right */}
        <div className="absolute inset-0 flex items-center">
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{
              clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
            }}
          >
            <div className="absolute inset-0 flex items-center">
              <MarqueeTrack
                images={imageData}
                direction="right"
                variant="after"
              />
            </div>
          </div>
        </div>

        {/* Center divider */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-68 sm:h-84 rounded-full bg-white shadow-xl shadow-blue-300 border-2 border-blue-500 z-20"
          aria-hidden="true"
        />
      </div>

      {/* Edge fade effects */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-20"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-20"
        aria-hidden="true"
      />
    </div>
  );
};

export default ImageTransitionCarousel;