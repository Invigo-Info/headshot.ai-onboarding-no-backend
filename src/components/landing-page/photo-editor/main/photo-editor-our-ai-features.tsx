import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftRightIcon,
  ImageIcon,
  PaletteIcon,
  Sparkles,
  ZapIcon,
} from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const AIFeatures = [
  {
    name: "Blemish Remover",
    description:
      "Smooth out acne, redness, and skin imperfections effortlessly. This tool enhances facial clarity while keeping your natural look intact-perfect for professional headshots or polished personal photos.",
    icon: <ZapIcon className="size-4" />,
    beforeSrc: "/assets/editor-page/blemish-remover/1b.webp",
    afterSrc: "/assets/editor-page/blemish-remover/1a.jpg",
    ctaText: "Try the Blemish remover",
    ctaLink: "/photo-editor/blemish-remover",
  },
  {
    name: "Background Changer",
    description:
      "Easily replace distracting or dull backdrops with clean, professional, or creative backgrounds. Ideal for LinkedIn profiles, resumes, or dating apps-your photo, your setting, your style.",
    icon: <PaletteIcon className="size-4" />,
    beforeSrc: "/assets/editor-page/background-changer/1b.webp",
    afterSrc: "/assets/editor-page/background-changer/1a.jpg",
    ctaText: "Try the Background Changer",
    ctaLink: "/photo-editor/background-changer",
  },
  {
    name: "Face Restoration",
    description:
      "Sharpen and enhance real facial features-no AI-generated faces. Perfect for blurry or low-res images that need detail recovery, while keeping your identity 100% authentic.",
    icon: <Sparkles className="size-4" />,
    beforeSrc: "/assets/editor-page/face-restorer/1b.webp",
    afterSrc: "/assets/editor-page/face-restorer/1a.png",
    ctaText: "Try the Face Restoration",
    ctaLink: "/photo-editor/face-restorer",
  },
  {
    name: "Image Upscaler",
    description:
      "Make low-resolution photos high-quality with one click. Our upscaler increases size and clarity without losing detail-great for printing, websites, or anywhere you need your image to shine.",
    icon: <Sparkles className="size-4" />,
    beforeSrc: "/assets/editor-page/image-upscaler/10b.jpg",
    afterSrc: "/assets/editor-page/image-upscaler/10a.jpg",
    ctaText: "Try the Image Upscaler",
    ctaLink: "/photo-editor/image-upscaler",
  },
  {
    name: "Magic Eraser",
    description:
      "Instantly remove unwanted objects, people, or text without affecting the rest of your photo.",
    icon: <Sparkles className="size-4" />,
    beforeSrc: "/assets/editor-page/magic-eraser/1b.webp",
    afterSrc: "/assets/editor-page/magic-eraser/1a.jpg",
    ctaText: "Try the Magic Eraser",
    ctaLink: "/photo-editor/magic-eraser",
  },
  {
    name: "Image Extender",
    description:
      "Add more context or detail to your photos by extending them horizontally or vertically.",
    icon: <ArrowLeftRightIcon className="size-4" />,
    beforeSrc: "/assets/editor-page/image-extender/1a.webp",
    afterSrc: "/assets/editor-page/image-extender/1b.jpg",
    ctaText: "Try the Image Extender",
    ctaLink: "/photo-editor/image-extender",
  },
  {
    name: "Unblur Image",
    description: "Sharpen soft or unfocused images effortlessly. Whether it’s motion blur or poor lighting, this tool brings out detail and definition, making your photos pop with clarity and focus.",
    icon: <ImageIcon className="size-4" />,
    beforeSrc: "/assets/editor-page/unblur-image/1b.png",
    afterSrc: "/assets/editor-page/unblur-image/1a.webp",
    ctaText: "Try the Unblur Image",
    ctaLink: "/photo-editor/unblur-image",
  },
];

export default function PhotoEditorOurAIFeatures() {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl leading-tight font-semibold text-black mb-8 sm:mb-16">
        Explore Our Popular AI Editing Tools
        </h2>
        <div className="grid grid-cols-1 gap-y-16 sm:gap-y-24">
          {AIFeatures.map((feature, index) => {
            const isImageFirst = index % 2 === 0;
            return (
              <div
                key={`${feature.name}-${index}`}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center"
              >
                {/* Image - Always first on mobile, alternating on desktop */}
                <div className={`aspect-[5/4] rounded-xl overflow-hidden ${
                  isImageFirst ? 'md:order-1' : 'md:order-2'
                }`}>
                  <ReactCompareSlider
                    className="w-full h-full object-top"
                    itemOne={
                      <ReactCompareSliderImage
                        src={feature.beforeSrc}
                        alt="before"
                        className="!object-top object-cover w-full h-full"
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src={feature.afterSrc}
                        alt="after"
                        className="!object-top object-cover w-full h-full"
                      />
                    }
                  />
                </div>

                {/* Text - Always second on mobile, alternating on desktop */}
                <div className={`space-y-2 sm:space-y-4 ${
                  isImageFirst ? 'md:order-2' : 'md:order-1'
                }`}>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-black">
                    {feature.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-7 max-w-2xl">
                    {feature.description}
                  </p>
                  <Button
                    asChild
                    className="h-10 sm:h-12 !px-4 rounded-md font-medium bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                  >
                    <Link
                      href={feature.ctaLink}
                      className="flex items-center gap-2 capitalize"
                    >
                      {feature.icon}
                      <span>{feature.ctaText}</span>
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
