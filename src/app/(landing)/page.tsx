// Core library and icon imports for the page.
import { Ban, Lock, ShieldCheck, Timer } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the professional headshots landing page.
import { CTASectionWithTabs } from "@/components/landing-page/cta-section-with-tabs";
import DataSafetySection, {
  type DataSafetyItem,
} from "@/components/landing-page/data-safety-section";
import FloatingCtaButton from "@/components/landing-page/floating-cta-button";
import GalleryReviewsSection from "@/components/landing-page/gallery-reviews-section";
import HowItWorksSection, {
  type StepData,
} from "@/components/landing-page/how-it-works";
import BenefitsSection from "@/components/landing-page/benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";
import HeroSection from "@/components/landing-page/hero-section";
import PricingSection from "@/components/landing-page/pricing-section";
import ReviewsShowcase from "@/components/landing-page/reviews-showcase";
import RiskFreeSection from "@/components/landing-page/risk-free-section";

// Static data and utility functions for the page content.
import { homePageHeadshotsReviews } from "@/data/reviews";
import { homePagePricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";
import { homePageFaqs } from "@/data/faqs";

const { logos } = getLogosBySlug("professional");

const keypoints = ["See them for free. No payment required."];

const dataSafetyItems: DataSafetyItem[] = [
  {
    icon: <Lock className="size-5 sm:size-6" />,
    title: "The headshots are yours",
    description:
      "You own every headshot you download. Use them anywhere — no limits, no fine print.",
  },
  {
    icon: <Ban className="size-5 sm:size-6" />,
    title: "We don't share or sell your selfies",
    description:
      "Not to anyone. Not ever. They're only used to make your headshots.",
  },
  {
    icon: <Timer className="size-5 sm:size-6" />,
    title: "Your selfies and headshots get deleted automatically",
    description:
      "Your selfies are deleted after 7 days. Your headshots after 30 days. Want them gone sooner? Delete them from your account anytime.",
  },
  {
    icon: <ShieldCheck className="size-5 sm:size-6" />,
    title: "Your selfies and headshots are safe",
    description:
      "Only you can see them. They're protected from the moment you upload them.",
  },
];

const homePageSteps: StepData[] = [
  {
    number: 1,
    title: "Pick your outfits and backgrounds",
    description:
      "Choose the outfits and backgrounds you want your headshots in. Outfits include business professional, business casual, and smart casual. Backgrounds include studio, office, city, nature, and walls. Pick as many as you’d like.",
    images: [
      "/assets/landing-page/frontpage/how-it-works/step-1/attire/1.business-professional.webp",
      "/assets/landing-page/frontpage/how-it-works/step-1/attire/2.business-casual.webp",
      "/assets/landing-page/frontpage/how-it-works/step-1/attire/3.smart-casual.webp",
      "/assets/landing-page/frontpage/how-it-works/step-1/background/1.studio.webp",
      "/assets/landing-page/frontpage/how-it-works/step-1/background/2.office.webp",
      "/assets/landing-page/frontpage/how-it-works/step-1/background/3.city.webp",
      "/assets/landing-page/frontpage/how-it-works/step-1/background/4.nature.webp",
      "/assets/landing-page/frontpage/how-it-works/step-1/background/5.wall-and-bricks.webp",
    ],
    labels: [
      "Business Professional",
      "Business Casual",
      "Smart Casual",
      "Studio",
      "Office",
      "City",
      "Nature",
      "Wall and Bricks",
    ],
  },
  {
    number: 2,
    title: "Upload your selfies",
    description:
      "Any clear, recent, well-lit selfies work — even bathroom mirror shots, vacation photos, or regular phone pictures. No studio, no special lighting needed.",
    images: [
      "/assets/landing-page/frontpage/how-it-works/step-2/1.webp",
      "/assets/landing-page/frontpage/how-it-works/step-2/2.webp",
      "/assets/landing-page/frontpage/how-it-works/step-2/3.webp",
    ],
  },
  {
    number: 3,
    title: "The AI does the work",
    description:
      "In seconds, our AI turns your selfies into studio-quality professional headshots that look just like you — your real face, your real features.",
    images: ["/assets/landing-page/frontpage/how-it-works/step-3/1.webp"],
  },
  {
    number: 4,
    title: "Pick a plan and download",
    description:
      "Love what you see? Pick a plan to unlock your full set of headshots. Don't love them? Walk away — no charge.",
    images: [
      "/assets/landing-page/frontpage/how-it-works/step-4/1.webp",
      "/assets/landing-page/frontpage/how-it-works/step-4/2.webp",
      "/assets/landing-page/frontpage/how-it-works/step-4/3.webp",
      "/assets/landing-page/frontpage/how-it-works/step-4/4.webp",
      "/assets/landing-page/frontpage/how-it-works/step-4/5.webp",
      "/assets/landing-page/frontpage/how-it-works/step-4/6.webp",
    ],
  },
];

export const metadata = createPageMetadata({
  title: "#1 AI Headshot Generator - 15 Minutes | Headshot.AI",
  description:
    "Turn your selfies into studio quality professional headshots that look exactly like you in 15 minutes. Rated 4.9/5 by 133,000+ professionals. Get yours now.",
  canonicalPath: "/",
});

export default function ProfessionalHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-32 sm:space-y-44 ">
      <HeroSection
        badgeText="4.9/5 from 2,000+ reviews"
        title="Free to Try AI Headshot Generator"
        highlight="Free to Try"
        description="Turn everyday selfies into studio-quality professional headshots in seconds. Free to preview — pay only if you love them."
        ctaText="Generate My Free Headshots"
        logos={logos}
        keypoints={keypoints}
        category="professional"
        trustedByText="780,000+ AI headshots generated for 7,600+ professionals worldwide"
        trustedByTexthighlight={["780,000+", "7,600+"]}
        usedByText=""
        showRating={true}
      />
      {/* Pull up 64px to cancel the Hero's extra footer spacing (its trust
          block adds mb-8 + pb-8 = 64px), so the gap above this section
          matches the spacing between the other sections. */}
      <div className="-mt-16">
        <RiskFreeSection category="professional" ctaText="Try it Risk-Free" />
      </div>
      <HowItWorksSection
        mainTitle="Get your professional headshots in 5 easy steps — under 5 minutes"
        highlight="5 easy steps"
        subtitle="Free to preview — pay only if you love them."
        steps={homePageSteps}
      />
      <ReviewsShowcase
        reviews={homePageHeadshotsReviews}
        title="See what our customers say"
        highlight="customers say"
        subtitle="Real reviews from real professionals. Read a few, then decide."
        rating="4.9/5"
        label="from 2,000+ reviews"
      />
      <GalleryReviewsSection
        category="professional"
        title="None of these headshots came from a photographer"
        highlight="photographer"
        subtitle="Every headshot below was made by our AI from everyday selfies. They look real because they capture exactly how each person looks — same face, studio-quality finish."
        description="They look like a high-end studio shoot-but they're 100% AI-generated from your selfies."
      />
      <BenefitsSection
        title="Wherever you need a professional headshot"
        highlight="professional headshot"
        description="Your headshot is the first thing people see. Here's where our customers use theirs."
      />

      {/* Extra top padding offsets the absolutely-positioned "Pricing" badge
          so the gap above this section matches the other sections. */}
      <div className="pt-10 sm:pt-12">
        <PricingSection
          pricingDetails={homePagePricing}
          title="Studio-quality professional headshots, at a fraction of the price"
          description="A studio session costs $400+. Ours is $25–$45 — and you see a free preview of your headshots before you pay."
          highlight="fraction of the price"
          isHomePage
        />
      </div>

      <DataSafetySection
        label="Your Selfies, Your Control"
        title="Your selfies and headshots stay private"
        highlight="stay private"
        description="Never shared. Never sold. Never used to train AI."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        faqs={homePageFaqs}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Everything you need to know before you start."
      />
      <CTASectionWithTabs
        badge="Get Started"
        title="Your professional headshots are 5 minutes away"
        highlight="5 minutes away"
        subtitle="Worst case? 5 minutes. Best case? Headshots you love."
        ctaText="Generate My Free Headshots"
        socialProof="See them for free. No payment required."
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
