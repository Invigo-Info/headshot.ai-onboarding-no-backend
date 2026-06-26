import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { CircleCheck } from "lucide-react";
import {
  getAllConversionSlugs,
  parseConversionSlug,
} from "@/data/image-formats";
import { getConversionContent } from "@/data/conversion-content";
import FormatSelector from "@/components/landing-page/convert/format-selector";
import UploadArea from "@/components/landing-page/convert/upload-area";
import FeaturesGrid from "@/components/landing-page/convert/features-grid";
import CTASection from "@/components/landing-page/convert/cta-section";
import HowToConvert from "@/components/landing-page/convert/how-to-convert";
import WhenToConvert from "@/components/landing-page/convert/when-to-convert";
import FormatInfoCards from "@/components/landing-page/convert/format-info-cards";
import ConversionPageFAQ from "@/components/landing-page/convert/conversion-page-faq";
import OtherConverters from "@/components/landing-page/convert/other-converters";
import TrustedLogos from "@/components/landing-page/trusted-logos";
import { CONVERT_LOGOS, CONVERT_BADGES, highlightText } from "@/components/landing-page/convert/convert-shared";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllConversionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseConversionSlug(slug);
  if (!parsed) return {};

  const { input, output } = parsed;
  const content = getConversionContent(slug);

  return createPageMetadata({
    title: content?.meta.title ?? `${input.label} to ${output.label} Converter - Free Online Image Converter`,
    description: content?.meta.description ?? `Convert ${input.label} to ${output.label} online for free. Simply drop your ${input.label} images below to convert them to ${output.label} in seconds. No registration required.`,
    canonicalPath: `/convert/${slug}`,
  });
}

export default async function ConvertPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseConversionSlug(slug);
  if (!parsed) return notFound();

  const { input, output } = parsed;
  const content = getConversionContent(slug);

  return (
    <main className="flex flex-col">
      {/* Hero section */}
      <section className="pb-10 pt-10 md:pt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Format selector */}
          <div className="mb-8 flex justify-center">
            <FormatSelector
              currentInput={input.key}
              currentOutput={output.key}
            />
          </div>

          {/* Title */}
          <h1 className="font-mont mb-4 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {input.label} to {output.label} Converter
          </h1>

          {/* Description */}
          <p className="font-open mx-auto mb-6 max-w-2xl text-center text-base leading-relaxed text-gray-500 sm:text-lg">
            {content?.hero.subheadline ?? `Convert ${input.label} to ${output.label} online for free. Simply drop your ${input.label} images below to convert them to ${output.label} in seconds.`}
          </p>

          {/* Trust badges */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {CONVERT_BADGES.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1.5"
              >
                <CircleCheck className="h-4.5 w-4.5 text-emerald-500" strokeWidth={2} />
                <span className="font-open text-sm font-medium text-gray-600">
                  {badge}
                </span>
              </div>
            ))}
          </div>

          {/* Upload area */}
          <UploadArea inputFormat={input.key} outputFormat={output.key} />
        </div>
      </section>

      {/* Trusted by */}
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

      {/* Why Choose Our Tool? */}
      <FeaturesGrid benefits={content?.benefits} />

      {/* How to convert */}
      <HowToConvert input={input} output={output} />

      {/* CTA */}
      <CTASection input={input} output={output} description={content?.ctaContent} />

      {/* When to convert */}
      {content?.whenToConvert && (
        <WhenToConvert input={input} output={output} items={content.whenToConvert} />
      )}

      {/* Format info */}
      <FormatInfoCards input={input} output={output} />

      {/* FAQ */}
      {content?.faqs && (
      <div className="bg-gray-50/60">
        <ConversionPageFAQ input={input} output={output} faqs={content.faqs} />
      </div>
      )}

      {/* Other converters */}
      <OtherConverters currentInput={input} currentOutput={output} />
    </main>
  );
}
