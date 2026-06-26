"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Crown, Lock, ArrowRight, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import type { PhotoPack } from "@/data/photo-packs";

interface PhotoPackCardProps {
  pack: PhotoPack;
  isMostPopular?: boolean;
}

export function PhotoPackCard({ pack, isMostPopular }: PhotoPackCardProps) {
  const router = useRouter();
  const handleClick = async () => {
    router.push(`/generate/one-time/${pack.slug}?step=gender`);
  };

  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div
            onClick={handleClick}
            className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-900 cursor-pointer group transition-all duration-300  hover:shadow-2xl hover:shadow-black/30"
          >
            {/* Main background image */}
            <Image
              src={`/assets/pack-preview-images/${pack.folder}/1.webp`}
              alt={pack.title}
              fill
              priority={true}
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl overflow-hidden"
            />

            {/* Content overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

            {/* Most Popular badge */}
            {isMostPopular && (
              <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500 text-white text-xs font-semibold shadow-md">
                <Star className="w-3.5 h-3.5 fill-white" />
                Most Popular
              </div>
            )}

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
              {pack.pro && (
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    PRO
                  </Badge>
                  <Lock className="w-4 h-4 text-white/60" />
                </div>
              )}
              <h3 className="text-lg font-bold mb-1 sm:mb-2">{pack.title}</h3>
              <p className="text-xs sm:text-sm text-white/90 mb-3 sm:mb-4 line-clamp-2">
                {pack?.description || "No description"}
              </p>

              <Button
                className="w-full bg-white/20 hover:bg-blue-500 text-white font-semibold shadow-lg backdrop-blur-sm transition-colors"
                size="lg"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </HoverCardTrigger>

        <HoverCardContent
          className="w-xl p-4 shadow-xl"
          side="right"
          align="center"
        >
          <div className="grid grid-cols-3 gap-2 ">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="aspect-[4/5] relative rounded-md overflow-hidden bg-gray-100"
              >
                <Image
                  src={`/assets/pack-preview-images/${pack.folder}/${index + 2}.webp`}
                  alt={`Sample ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
