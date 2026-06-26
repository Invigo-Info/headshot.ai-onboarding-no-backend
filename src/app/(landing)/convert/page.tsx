import { createPageMetadata } from "@/lib/seo";
import { CircleCheck } from "lucide-react";
import UploadArea from "@/components/landing-page/convert/upload-area";
import FeaturesGrid from "@/components/landing-page/convert/features-grid";
import SupportedFormats from "@/components/landing-page/convert/supported-formats";
import HowToConvert from "@/components/landing-page/convert/how-to-convert";
import FreeForever from "@/components/landing-page/convert/free-forever";
import AllConverters from "@/components/landing-page/convert/all-converters";
import ConvertFAQ from "@/components/landing-page/convert/convert-faq";
import TrustedLogos from "@/components/landing-page/trusted-logos";
import { CONVERT_LOGOS, CONVERT_BADGES, highlightText } from "@/components/landing-page/convert/convert-shared";

export const metadata = createPageMetadata({
  title:
    "Free Image Converter Online — JPG, PNG, WebP, AVIF, GIF, HEIC | Headshot.AI",
  description:
    "Convert images between JPG, PNG, WebP, AVIF, GIF, and HEIC for free. No ads, no watermarks, no uploads to servers. Browser-based batch conversion that works on any device. 30 format combinations supported.",
  canonicalPath: "/convert",
});

export default function ConvertPage() {
  return (
    <main className="flex flex-col">
      {/* Hero section */}
      <section className="pb-10 pt-10 md:pt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Title */}
          <h1 className="font-mont mb-4 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Image Converter
          </h1>

          {/* Description */}
          <p className="font-open mx-auto mb-6 max-w-2xl text-center text-base leading-relaxed text-gray-500 sm:text-lg">
            Convert your images into any format for free. Drop your files
            below, pick a format, and download — everything happens in your
            browser. Nothing gets uploaded anywhere.
          </p>

          {/* Trust badges */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {CONVERT_BADGES.map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <CircleCheck
                  className="h-4.5 w-4.5 text-emerald-500"
                  strokeWidth={2}
                />
                <span className="font-open text-sm font-medium text-gray-600">
                  {badge}
                </span>
              </div>
            ))}
          </div>

          {/* Upload area */}
          <UploadArea />
        </div>
      </section>

<div className="text-center my-8 container mx-auto px-4">
        <p className="text-base sm:text-lg text-gray-700 mb-4">
          {highlightText(
            "Trusted by Thousands of Creators & Photographers Worldwide", 
            ["Thousands"], 
            "text-blue-500 font-bold"
          )}
        </p>
        {/* Company Logos */}
        <TrustedLogos logos={CONVERT_LOGOS} category={"photo-restoration"}  editorPage={true} />
      </div>

      {/* Features */}
      <FeaturesGrid
        benefits={[
          {
            title: "Fast Conversion",
            description:
              "Images convert in 1-3 seconds using your browser's built-in processing power. No upload wait, no server queue, no spinning progress bars.",
            icon: "Zap",
          },
          {
            title: "Ad-Free",
            description:
              'No banner ads, no pop-ups, no interstitials, no "watch this ad to continue" walls. The converter is completely ad-free and always will be.',
            icon: "ShieldOff",
          },
          {
            title: "Batch Convert",
            description:
              "Convert one image or a hundred at once. Upload multiple files simultaneously and download them individually or as a single ZIP file.",
            icon: "Layers",
          },
          {
            title: "Browser-Based",
            description:
              "The conversion runs locally in your browser. You don't need to download software, install plugins, or give any app access to your files.",
            icon: "Globe",
          },
          {
            title: "Easy to Use",
            description:
              "Upload, pick a format, download. That's it. No settings to configure, no sliders to adjust, no technical knowledge required.",
            icon: "MousePointerClick",
          },
          {
            title: "Private & Secure",
            description:
              "Your images are processed on your device, not our servers. We never see, store, or access your files. Your privacy isn't a policy — it's how the tool works.",
            icon: "Lock",
          },
        ]}
      />

      {/* Supported formats */}
      <SupportedFormats />

      {/* How to convert */}
      <HowToConvert />

      {/* Free forever */}
      <FreeForever />

      {/* Popular converters */}
      <AllConverters />

      {/* FAQ */}
      <ConvertFAQ />
    </main>
  );
}
