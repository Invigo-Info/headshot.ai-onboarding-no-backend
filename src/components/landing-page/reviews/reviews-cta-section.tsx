import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";
import Link from "next/link";

const features = [
  "150 headshots in 15 minutes",
  "Multiple attire & background options",
  "Private & secure",
  "100% money-back guarantee",
];

const headshotImages = Array.from(
  { length: 10 },
  (_, i) => `/assets/landing-page/professional/examples/${i + 1}.webp`
);

export default function ReviewsCTASection() {
  return (
    <section className="bg-white">
      <div className="max-w-full mx-auto text-center">
        {/* CTA Header */}
        <h2 className="text-3xl sm:text-4xl font-semibold font-mont text-gray-900 leading-tight mb-4 sm:mb-6 mx-auto max-w-3xl">
          Ready to Join{" "}
          <span className="text-blue-500">100,000+</span>{" "}
          Professionals Who Finally Got Headshots They Love?
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-base sm:text-lg mb-4 sm:mb-8 mx-auto max-w-3xl">
          Get yours in 15 minutes. No photoshoot. No dressing up. Just results.
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className={`bg-blue-500 text-white font-semibold text-lg sm:text-xl px-6 py-6 sm:py-8 mb-8`}
          asChild
        >
          <Link href="/generate/one-time/professional-headshots?step=gender">
            Get My Headshots
            <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </Button>

        {/* Feature List */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-8">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600 shrink-0" strokeWidth={3} />
              <span className="text-sm sm:text-base text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

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
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
