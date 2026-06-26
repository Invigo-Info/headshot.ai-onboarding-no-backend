// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the theatrical headshots landing page.
import { CTASection } from "@/components/landing-page/cta-section";
import DataSafetySection, {
  type DataSafetyItem,
} from "@/components/landing-page/data-safety-section";
import FloatingCtaButton from "@/components/landing-page/floating-cta-button";
import GalleryReviewsSection from "@/components/landing-page/gallery-reviews-section";
import HowItWorksSection, {
  type StepData,
} from "@/components/landing-page/how-it-works";
import TheatricalBenefitsSection from "@/components/landing-page/theatrical-headshots/theatrical-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";
import HeroSection from "@/components/landing-page/hero-section";
import PricingSection from "@/components/landing-page/pricing-section";
import ReviewsSection from "@/components/landing-page/reviews-section";

// Static data and utility functions for the page content.
import { theatricalHeadshotsReviews } from "@/data/reviews";
import { theatricalPricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";
import { theatricalFaqs } from "@/data/faqs";

const { logos } = getLogosBySlug("theatrical");

const keypoints = ["100% money-back", "Fully private & secure"];

const theatricalSteps: StepData[] = [
  {
    number: 1,
    title: "Choose Your Background",
    description:
      "Select one or more backgrounds: studio, dramatic, theater stage, backstage and rehearsal, outdoor.",
    images: [
      "/assets/landing-page/theatrical/how-it-works/step-1/background/1.studio.webp",
      "/assets/landing-page/theatrical/how-it-works/step-1/background/2.dramatic.webp",
      "/assets/landing-page/theatrical/how-it-works/step-1/background/3.theater-stage.webp",
      "/assets/landing-page/theatrical/how-it-works/step-1/background/4.backstage-and-rehearsal.webp",
      "/assets/landing-page/theatrical/how-it-works/step-1/background/5.outdoor.webp",
    ],
    labels: [
      "Studio",
      "Dramatic",
      "Theater Stage",
      "Backstage and Rehearsal",
      "Outdoor",
    ],
  },
  {
    number: 2,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/theatrical/how-it-works/step-2/1.webp",
      "/assets/landing-page/theatrical/how-it-works/step-2/2.webp",
      "/assets/landing-page/theatrical/how-it-works/step-2/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Headshots",
    description:
      "In under 15 minutes, our AI turns your selfies into casting-ready theatrical headshots with the backgrounds you've chosen.",
    images: ["/assets/landing-page/theatrical/how-it-works/step-3/1.webp"],
  },
  {
    number: 4,
    title: "Download Your Headshots",
    description:
      "Review your gallery of 150 theatrical headshots and download your favorites for instant use.",
    images: [
      "/assets/landing-page/theatrical/how-it-works/step-4/1.webp",
      "/assets/landing-page/theatrical/how-it-works/step-4/2.webp",
      "/assets/landing-page/theatrical/how-it-works/step-4/3.webp",
      "/assets/landing-page/theatrical/how-it-works/step-4/4.webp",
      "/assets/landing-page/theatrical/how-it-works/step-4/5.webp",
      "/assets/landing-page/theatrical/how-it-works/step-4/6.webp",
    ],
  },
];

const dataSafetyItems: DataSafetyItem[] = [
  {
    icon: <Crown className="size-6 sm:size-8" />,
    title: "Full Ownership, No Surprises",
    description:
      "• You own every headshot we create.\n• Use them anywhere you want — online, in print, and in media.\n• No usage restrictions, no hidden clauses.",
  },
  {
    icon: <Lock className="size-6 sm:size-8" />,
    title: "Never Shared or Used for Training",
    description:
      "• Your selfies and headshots are never used to train our AI.\n• We never sell or share your images.\n• They're only used to generate your headshots.",
  },
  {
    icon: <Trash2 className="size-6 sm:size-8" />,
    title: "Auto-Delete Built In",
    description:
      "• Selfies are automatically deleted after 7 days.\n• Headshots are automatically deleted after 30 days.\n• You can manually delete everything from your account at any time.",
  },
  {
    icon: <Shield className="size-6 sm:size-8" />,
    title: "Secure From Upload to Download",
    description:
      "• Your images are protected at every step.\n• Access is limited to your secure account.\n• We follow strict security standards and comply with privacy laws like GDPR and CCPA.",
  },
];

export const metadata = createPageMetadata({
  title: "#1 AI Theatrical Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality theatrical headshots. Perfect for stage auditions and casting platforms. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: "/theatrical-headshots",
});

export default function TheatricalHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI THEATRICAL HEADSHOT GENERATOR"
        title="Get Professional Theatrical Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality theatrical headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="theatrical"
        trustedByText="Over 227,800 AI headshots generated for 2,600+ actors & performers"
        trustedByTexthighlight={["227,800", "2,600+"]}
        usedByText="Used by actors across the entertainment industry"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Theatrical Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={theatricalSteps}
      />
      <ReviewsSection
        reviews={theatricalHeadshotsReviews}
        title="Trusted by 2,600+ Stage Performers"
        highlight="2,600+"
        subtitle="Read reviews from theatre actors using our headshots for playbills, auditions, and talent submissions."
      />
      <TheatricalBenefitsSection
        title="Increase up to 2× More Audition Calls and Stage Opportunities"
        highlight="2× More"
        description="Look expressive, dynamic, and stage-ready across theatre programs and audition materials."
      />
      <GalleryReviewsSection
        category="theatrical"
        title="Theatrical Headshots"
        highlight="Theatrical"
        subtitle="See how our AI turns your selfies into studio-quality theatrical headshots — in minutes."
        description="They look like a professional photographer took them-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={theatricalPricing}
        title="Theatrical Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality theatrical headshots — without the $500+ cost."
        highlight="90% Less"
      />

      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={theatricalFaqs}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="theatrical"
        title="Your Studio-Quality Theatrical Headshots Are Minutes Away"
        highlight="Theatrical Headshots"
        ctaText="Get My Headshots Now"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
