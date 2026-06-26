import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { CTASectionWithTabs } from "@/components/landing-page/cta-section-with-tabs";
import AboutHeroSection from "@/components/landing-page/about/about-hero-section";
import AboutOurStorySection from "@/components/landing-page/about/about-our-story-section";
import AboutMissionStatsSection from "@/components/landing-page/about/about-mission-stats-section";
import AboutValuesSection from "@/components/landing-page/about/about-values-section";
import AboutSocialProofSection from "@/components/landing-page/about/about-social-proof-section";

export const metadata = createPageMetadata({
  title: "About Headshot.AI | #1 AI Headshot Generator",
  description:
    "Meet the team behind Headshot.AI — the #1 AI headshot generator trusted by 133,000+ professionals. Learn our story, mission, and values.",
  canonicalPath: "/about-us",
});

export default function AboutUsPage() {
  return (
    <main className="flex flex-col">
      {/* ─────────────────── HERO ─────────────────── */}
      <AboutHeroSection />

      {/* ─────────────────── OUR STORY ─────────────────── */}
      <AboutOurStorySection />

      {/* ─────────────────── MISSION + STATS ─────────────────── */}
      <AboutMissionStatsSection />

      {/* ─────────────────── VALUES ─────────────────── */}
      <AboutValuesSection />

      {/* ─────────────────── SOCIAL PROOF ─────────────────── */}
      <AboutSocialProofSection />

      {/* ─────────────────── CONTACT ─────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[90%]">
          <div className="max-w-2xl">
            <h2 className="font-mont text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl lg:text-5xl">
              We&apos;d Love to{" "}
              <span className="text-blue-500">Hear</span> From You
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Whether you need help with your headshots, have a press inquiry,
              or just want to say hello &mdash; we&apos;re here for you.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div>
              <h3 className="border-l border-blue-500 pl-6 font-semibold text-gray-900">
                Support
              </h3>
              <div className="border-l border-gray-200 pt-2 pl-6 not-italic text-gray-600">
                <p>Questions about your headshots or account?</p>
                <a
                  href="mailto:support@headshot.ai"
                  className="mt-1 inline-block font-medium text-blue-500 hover:text-blue-600"
                >
                  support@headshot.ai
                </a>
              </div>
            </div>

            <div>
              <h3 className="border-l border-blue-500 pl-6 font-semibold text-gray-900">
                Press
              </h3>
              <div className="border-l border-gray-200 pt-2 pl-6 not-italic text-gray-600">
                <p>Media inquiries &amp; partnerships</p>
                <a
                  href="mailto:support@headshot.ai"
                  className="mt-1 inline-block font-medium text-blue-500 hover:text-blue-600"
                >
                  support@headshot.ai
                </a>
              </div>
            </div>

            <div>
              <h3 className="border-l border-blue-500 pl-6 font-semibold text-gray-900">
                General
              </h3>
              <div className="border-l border-gray-200 pt-2 pl-6 not-italic text-gray-600">
                <p>Everything else &mdash; we&apos;d love to connect.</p>
                <Link
                  href="/contact-us"
                  className="mt-1 inline-block font-medium text-blue-500 hover:text-blue-600"
                >
                  Visit our contact page &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── CTA ─────────────────── */}
      <div className="py-24 sm:py-32">
        <CTASectionWithTabs
          title="Your Studio-Quality Headshots Are Minutes Away"
          highlight="Minutes Away"
          ctaText="Get My Headshots Now"
        />
      </div>
    </main>
  );
}
