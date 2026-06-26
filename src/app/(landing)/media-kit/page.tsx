import { createPageMetadata } from "@/lib/seo";
import MediaKitHeroSection from "@/components/landing-page/media-kit/media-kit-hero-section";
import MediaKitAboutSection from "@/components/landing-page/media-kit/media-kit-about-section";
import MediaKitFactsSection from "@/components/landing-page/media-kit/media-kit-facts-section";
import MediaKitDownloadsSection from "@/components/landing-page/media-kit/media-kit-downloads-section";
import MediaKitPressContactSection from "@/components/landing-page/media-kit/media-kit-press-contact-section";

export const metadata = createPageMetadata({
  title: "Headshot.AI Media Kit | Press & Brand Assets",
  description:
    "Download Headshot.AI logos, brand assets, and press materials. Everything journalists and partners need to feature the #1 AI headshot generator.",
  canonicalPath: "/media-kit",
});

export default function MediaKitPage() {
  return (
    <main className="flex flex-col">
      {/* ─────────────────── HERO ─────────────────── */}
      <MediaKitHeroSection />

      {/* ─────────────────── ABOUT ─────────────────── */}
      <MediaKitAboutSection />

      {/* ─────────────────── QUICK FACTS ─────────────────── */}
      <MediaKitFactsSection />

      {/* ─────────────────── DOWNLOADS ─────────────────── */}
      <MediaKitDownloadsSection />

      {/* ─────────────────── PRESS CONTACT ─────────────────── */}
      <MediaKitPressContactSection />
    </main>
  );
}
