import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface BeforeAfterMediaProps {
  beforeSrc: string;
  afterSrc: string;
}

interface Collage4MediaProps {
  images: string[];
}

interface SingleImageMediaProps {
  image: string;
}

interface SliderMediaProps {
  beforeSrc: string;
  afterSrc: string;
}

type MediaConfig =
  | ({ kind: "beforeAfter" } & BeforeAfterMediaProps)
  | ({ kind: "collage4" } & Collage4MediaProps)
  | ({ kind: "single" } & SingleImageMediaProps)
  | ({ kind: "slider" } & SliderMediaProps);
  
export interface WhyChooseItem {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  media: MediaConfig;
}

interface EditorPageWhyChooseProps {
  items?: WhyChooseItem[];
  title?: string;
}

function BeforeAfterMedia({ beforeSrc, afterSrc }: BeforeAfterMediaProps) {
  return (
    <div className="relative mr-auto lg:mx-auto w-full h-64 sm:h-72 md:h-80 max-w-sm sm:max-w-md">
      {/* Before card */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 z-0 h-[80%] w-48 sm:w-56 md:w-64 aspect-[4/5] overflow-hidden rounded-2xl border">
        <span className="absolute left-2 sm:left-3 top-2 sm:top-3 z-20 rounded-full bg-black/80 px-1.5 sm:px-2 py-0.5 text-xs font-semibold text-white">
          Before
        </span>
        <div className="absolute inset-0 p-2 sm:p-4">
          <Image
            src={beforeSrc}
            alt="before"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* After card */}
      <div className="absolute right-0 top-0 z-10 h-full w-48 sm:w-56 md:w-64 aspect-[4/5] overflow-hidden rounded-2xl">
        <span className="absolute left-2 sm:left-3 top-2 sm:top-3 z-20 rounded-full bg-black/80 px-1.5 sm:px-2 py-0.5 text-xs font-semibold text-white">
          After
        </span>
        <Image src={afterSrc} alt="after" fill className="object-cover" />
      </div>
    </div>
  );
}

function Collage4Media({ images }: Collage4MediaProps) {
  return (
    <div className="mr-auto lg:mx-auto w-[280px] sm:w-[320px]">
      <div className="grid grid-cols-2 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-xl overflow-hidden shadow"
          >
            <Image
              src={image}
              alt="grid"
              fill
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SingleImageMedia({ image }: { image: string }) {
  return (
    <div className="relative mr-auto lg:mx-auto w-full max-w-sm sm:max-w-md aspect-square rounded-xl overflow-hidden shadow">
      <Image src={image} alt="grid" fill className="object-cover object-top" />
    </div>
  );
}

function SliderLayout({
  beforeSrc,
  afterSrc,
}: {
  beforeSrc: string;
  afterSrc: string;
}) {
  return (
    <div className="aspect-[5/4] px-4 sm:px-6 md:px-8 rounded-xl overflow-hidden">
      <ReactCompareSlider
        className="w-full h-full object-top rounded-xl"
        transition={".75s ease-in-out"}
        itemOne={
          <ReactCompareSliderImage
            src={beforeSrc}
            alt="before"
            className="!object-top object-cover w-full h-full"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterSrc}
            alt="after"
            className="!object-top object-cover w-full h-full"
          />
        }
      />
    </div>
  );
}

const DEFAULT_ITEMS: WhyChooseItem[] = [
  {
    title: "Make your product photos pop",
    description:
      "Transform your mundane product shots with better backgrounds. Breathe life into your products by surrounding them with vibrant, attention grabbing backdrops to add personality to your photos.",
    ctaText: "Change the background",
    ctaHref: "/editor/background-changer",
    media: {
      kind: "beforeAfter",
      beforeSrc: "/assets/landing-page/professional/examples/1.webp",
      afterSrc: "/assets/landing-page/professional/examples/9.webp",
    },
  },
  {
    title: "Stand out from the background",
    description:
      "Elevate your images by focusing on what matters most-your subject. Whether it’s for personal use or professional branding, let your subject own the spotlight by placing them in the right settings.",
    ctaText: "Stop waiting. Start editing.",
    ctaHref: "/editor/background-changer",
    media: {
      kind: "beforeAfter",
      beforeSrc: "/assets/landing-page/linkedin/examples/9.webp",
      afterSrc: "/assets/landing-page/linkedin/examples/10.webp",
    },
  },
  {
    title: "Marketing materials made easy",
    description:
      "Simplify the creative process with AI. Create eye-catching designs of your graphics with a click of a button. Create multiple versions of your materials within minutes.",
    ctaText: "Get creative",
    ctaHref: "/editor/background-changer",
    media: {
      kind: "collage4",
      images: [
        "/assets/landing-page/realtor/examples/13.webp",
        "/assets/landing-page/teacher/examples/4.webp",
        "/assets/landing-page/actor/examples/10.webp",
        "/assets/landing-page/corporate/examples/7.webp",
      ],
    },
  },
];

export default function EditorPageWhyChoose({
  items = DEFAULT_ITEMS,
  title = "Why Choose Our AI Tool?",
}: EditorPageWhyChooseProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl leading-tight font-semibold text-black mb-12 sm:mb-16">
          {title}
        </h2>
        <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32">
          {items.map((item, index) => {
            const isImageFirst = index % 2 === 0;
            return (
              <div
                key={`${item.title}-${index}`}
                className="flex flex-col lg:flex-row lg:items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16"
              >
                {/* Image section - always first on mobile/tablet */}
                <div className={`flex-1 ${isImageFirst ? 'lg:order-1' : 'lg:order-2'}`}>
                  {item.media.kind === "beforeAfter" && (
                    <BeforeAfterMedia
                      beforeSrc={item.media.beforeSrc}
                      afterSrc={item.media.afterSrc}
                    />
                  )}
                  {item.media.kind === "collage4" && (
                    <Collage4Media images={item.media.images} />
                  )}
                  {item.media.kind === "single" && (
                    <SingleImageMedia image={item.media.image} />
                  )}
                  {item.media.kind === "slider" && (
                    <SliderLayout
                      beforeSrc={item.media.beforeSrc}
                      afterSrc={item.media.afterSrc}
                    />
                  )}
                </div>

                {/* Text section - always second on mobile/tablet */}
                <div className={`flex-1 space-y-4 sm:space-y-6 ${isImageFirst ? 'lg:order-2' : 'lg:order-1'}`}>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold tracking-tight text-black">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-base text-gray-700 leading-6 sm:leading-7 max-w-full lg:max-w-2xl">
                    {item.description}
                  </p>
                  <Button
                    asChild
                    className="h-11 sm:h-12 !px-4 sm:!px-6 rounded-md font-medium bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                  >
                    <Link
                      href={item.ctaHref}
                      className="flex items-center gap-2 capitalize text-sm sm:text-base"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{item.ctaText}</span>
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
