import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Marquee } from "../magicui/marquee";
import Link from "next/link";

export function CTASection({
  textClass = "text-blue-500",
  bgClass = "bg-blue-500",
  category = "professional",
  title = "Get your AI headshots today",
  highlight = "AI headshots",
  ctaText = "Get My Headshots",
}: {
  textClass?: string;
  bgClass?: string;
  category?: string;
  title?: string;
  highlight?: string;
  ctaText?: string;
}) {
  const headshotImages = [
    `/assets/landing-page/${category}/examples/1.webp`,
    `/assets/landing-page/${category}/examples/2.webp`,
    `/assets/landing-page/${category}/examples/3.webp`,
    `/assets/landing-page/${category}/examples/4.webp`,
    `/assets/landing-page/${category}/examples/5.webp`,
    `/assets/landing-page/${category}/examples/6.webp`,
    `/assets/landing-page/${category}/examples/7.webp`,
    `/assets/landing-page/${category}/examples/8.webp`,
    `/assets/landing-page/${category}/examples/9.webp`,
    `/assets/landing-page/${category}/examples/10.webp`,
  ];
  return (
    <section className="bg-white">
      <div className="max-w-full mx-auto text-center">
        {/* CTA Header */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont text-gray-900 leading-tight mb-4 sm:mb-8">
          {(() => {
            const lowerHighlight = highlight.toLowerCase();
            const parts = title.split(
              new RegExp(
                `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                "i"
              )
            );

            return parts.map((part, index) => (
              <span key={index}>
                {part.toLowerCase() === lowerHighlight ? (
                  <span className={textClass}>{part}</span>
                ) : (
                  part
                )}
              </span>
            ));
          })()}
        </h2>

        {/* CTA Button */}
        <Button
          size="lg"
          className={`${bgClass} text-white font-semibold text-lg sm:text-xl px-6 py-6 sm:py-8 mb-8`}
          asChild
        >
          <Link href={`/generate/one-time/${category}-headshots?step=gender`}>
            {ctaText}
            <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </Button>

        {/* Headshot Gallery */}
        <Marquee className="w-full">
          {headshotImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[4/5] rounded-lg overflow-hidden w-64"
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`Professional headshot ${index + 1}`}
                fill
                className="object-cover object-top"
              />
              {/* Small logo overlay */}
              {/* <div className={`absolute bottom-2 bg-blue-500 right-2 backdrop-blur-sm rounded-md p-1 text-xs font-medium flex items-center`}>
                    <Focus className="size-6 text-white" />
                  </div> */}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
