import { createPageMetadata } from "@/lib/seo";

import { Badge } from "@/components/ui/badge";
import ExamplesGallery from "@/components/landing-page/examples/examples-gallery";
import { CTASectionWithTabs } from "@/components/landing-page/cta-section-with-tabs";
import FloatingCtaButton from "@/components/landing-page/floating-cta-button";

export const metadata = createPageMetadata({
  title: "AI Headshot Examples | Before & After Transformations",
  description:
    "See real before & after examples of how our AI transforms casual selfies into studio-quality professional headshots. Browse LinkedIn, corporate, doctor, lawyer & more.",
  canonicalPath: "/examples",
});

export default function ExamplesPage() {
  return (
    <main className="pb-16">
      {/* Hero section */}
      <section className="text-center pt-16 pb-10 sm:pt-24 sm:pb-14 px-4 sm:px-6 bg-gradient-to-b from-white via-gray-50/40 to-white">
        <Badge className="bg-blue-50 hover:bg-blue-50 text-blue-600 border-0 text-xs sm:text-sm font-bold tracking-wide mb-5 px-4 py-1.5 rounded-full">
          #1 AI HEADSHOT GENERATOR
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-semibold font-mont text-gray-900 leading-tight mb-4 max-w-3xl mx-auto">
          Stunning Results That Speak{" "}
          <span className="text-blue-500">for Themselves</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
          See real examples of how our AI transforms casual selfies into
          studio-quality headshots.
        </p>
      </section>

      {/* Examples gallery with tabs */}
      <ExamplesGallery />

      {/* CTA section with tabs, marquee, and merged banner content */}
      <CTASectionWithTabs
        title="Want Headshots Like These?"
        highlight="Like These?"
        ctaText="Get My Headshots Now"
        subtitle="Transform your selfies into headshots you'll love."
        features={["100% money-back guarantee", "Private & secure"]}
        socialProof="7,200,000+ AI headshots generated for 100,000+ professionals"
      />

      {/* Floating CTA for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
