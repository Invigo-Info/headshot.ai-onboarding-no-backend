"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Marquee } from "../magicui/marquee";
import { useSearchParams } from "next/navigation";
import { getLogosBySlug } from "@/data/trusted-logos";
import { getReviewsBySlug } from "@/data/reviews";
import TrustedLogos from "../landing-page/trusted-logos";

const ReviewCard = ({
  review,
}: {
  review: {
    quote: string;
    name: string;
    role: string;
    stars: number;
    avatar: string;
  };
}) => (
  <div className="flex-shrink-0 w-[400px] backdrop-blur-sm rounded-xl p-4 flex flex-col justify-between">
    <div className="flex flex-col">
    <div className="flex mb-2">
      {[...Array(review.stars)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-green-500 text-green-500" />
      ))}
    </div>
    <p className="text-gray-700 text-sm mb-3 line-clamp-4">{review.quote}</p>
    </div>
    <div className="flex items-center">
      <Avatar className="size-6 mr-2 rounded-full">
        <AvatarImage src={review.avatar} />
        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium text-xs">{review.name}</span>
        <span className="text-gray-500 text-[11px]">{review.role}</span>
      </div>
    </div>
  </div>
);

const AuthScreen = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("from") || "professional";

  const reviews = useMemo(
    () => getReviewsBySlug(category).slice(0, 12),
    [category]
  );

  const AuthImages = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        src: `/assets/landing-page/${category}/examples/${i + 1}.webp`,
        alt: `${category} headshot ${i + 1}`,
      })),
    [category]
  );

  const logoData = getLogosBySlug(category);

  return (
    <div className="hidden lg:flex sticky top-0 h-screen  flex-col justify-between bg-blue-100/30 p-12 space-y-8">
      {/* let's add top and bottom overlay */}
      <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-t from-transparent to-blue-100/10 z-10" />
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-b from-transparent to-blue-100/10 z-10" />
      <h2 className="text-2xl xs:text-3xl font-semibold tracking-tighter leading-tight text-gray-900">
        Get 150 studio-quality headshots in
        <span className="bg-gradient-to-r from-blue-500 to-blue-400 text-transparent bg-clip-text inline-block">
          &nbsp;15 minutes&nbsp;
        </span>
      </h2>
      <div className="max-w-lg grid grid-cols-4 grid-rows-2 gap-2">
        {AuthImages.map((image, idx) => (
          <div key={idx} className="relative group aspect-square rounded-lg">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              priority
              sizes="33vw"
              fill
              className="w-full object-top object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Reviews Marquee */}
      <div className="relative w-full ">
        <Marquee className="[--duration:60s] [--gap:0.75rem]" pauseOnHover>
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} review={review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#f4f8fe] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#f4f8fe] to-transparent z-10" />
      </div>

      <div className="text-center w-full">
        <p className="text-base text-gray-700 mb-2 font-semibold">
          {logoData.usedByText}
        </p>
        {/* Company Logos */}
        <TrustedLogos logos={logoData.logos} category={logoData.category} />
      </div>
    </div>
  );
};

export default AuthScreen;
