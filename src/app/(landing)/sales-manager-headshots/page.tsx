// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the sales-manager headshots landing page.
import { CTASection } from "@/components/landing-page/cta-section";
import DataSafetySection, {
  type DataSafetyItem,
} from "@/components/landing-page/data-safety-section";
import FloatingCtaButton from "@/components/landing-page/floating-cta-button";
import GalleryReviewsSection from "@/components/landing-page/gallery-reviews-section";
import HowItWorksSection, {
  type StepData,
} from "@/components/landing-page/how-it-works";
import SalesManagerBenefitsSection from "@/components/landing-page/sales-manager-headshots/sales-manager-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";
import HeroSection from "@/components/landing-page/hero-section";
import PricingSection from "@/components/landing-page/pricing-section";
import ReviewsSection from "@/components/landing-page/reviews-section";

// Static data and utility functions for the page content.
import { salesManagerHeadshotsReviews } from "@/data/reviews";
import { salesManagerPricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";
import { salesManagerFaqs } from "@/data/faqs";

const { logos } = getLogosBySlug("sales-manager");

const keypoints = ["100% money-back", "Fully private & secure"];

const salesmanagerSteps: StepData[] = [
  {
    number: 1,
    title: "Pick Your Look",
    description:
      "Select one or more options:\n• Attire: business professional, business casual, smart casual\n• Background: studio, office, corporate sales environment, city, outdoor",
    images: [
      "/assets/landing-page/sales-manager/how-it-works/step-1/attire/1.business-professional.webp",
      "/assets/landing-page/sales-manager/how-it-works/step-1/attire/2.business-casual.webp",
      "/assets/landing-page/sales-manager/how-it-works/step-1/background/1.studio.webp",
      "/assets/landing-page/sales-manager/how-it-works/step-1/background/2.office.webp",
      "/assets/landing-page/sales-manager/how-it-works/step-1/background/3.corporate-sales-environment.webp",
      "/assets/landing-page/sales-manager/how-it-works/step-1/background/4.city.webp",
    ],
    labels: [
      "Business Professional",
      "Business Casual",
      "Studio",
      "Office",
      "Sales Environment",
      "City",
    ],
  },
  {
    number: 2,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/sales-manager/how-it-works/step-2/1.webp",
      "/assets/landing-page/sales-manager/how-it-works/step-2/2.webp",
      "/assets/landing-page/sales-manager/how-it-works/step-2/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Headshots",
    description:
      "In under 15 minutes, our AI turns your casual selfies into studio-quality sales manager headshots in the attire and backgrounds you've chosen.",
    images: ["/assets/landing-page/sales-manager/how-it-works/step-3/1.webp"],
  },
  {
    number: 4,
    title: "Download Your Headshots",
    description:
      "Review your gallery of 150 sales manager headshots and download your favorites for instant use.",
    images: [
      "/assets/landing-page/sales-manager/how-it-works/step-4/1.webp",
      "/assets/landing-page/sales-manager/how-it-works/step-4/2.webp",
      "/assets/landing-page/sales-manager/how-it-works/step-4/3.webp",
      "/assets/landing-page/sales-manager/how-it-works/step-4/4.webp",
      "/assets/landing-page/sales-manager/how-it-works/step-4/5.webp",
      "/assets/landing-page/sales-manager/how-it-works/step-4/6.webp",
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
  title: "#1 AI Sales Manager Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality sales manager headshots. Perfect for LinkedIn, team pages and pitches. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: "/sales-manager-headshots",
});

export default function SalesManagerHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI SALES MANAGER HEADSHOT GENERATOR"
        title="Get Professional Sales Manager Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality sales manager headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="sales-manager"
        trustedByText="Over 131,400 AI headshots generated for 1,500+ sales managers"
        trustedByTexthighlight={["131,400", "1,500+"]}
        usedByText="Used by sales professionals across every industry"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Sales Manager Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={salesmanagerSteps}
      />
      <ReviewsSection
        reviews={salesManagerHeadshotsReviews}
        title="Trusted by 1,500+ Sales Managers"
        highlight="1,500+"
        subtitle="Read reviews from sales managers using our headshots for LinkedIn, company profiles, and team presentations."
      />
      <SalesManagerBenefitsSection
        title="Boost up to 3× More Team Credibility and Client Trust"
        highlight="3× More"
        description="Lead with confidence across company profiles, team pages, and client meetings."
      />
      <GalleryReviewsSection
        category="sales-manager"
        title="Sales Manager Headshots"
        highlight="Sales Manager"
        subtitle="See how our AI turns your selfies into studio-quality sales manager headshots — in minutes."
        description="They look like a high-end studio shoot-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={salesManagerPricing}
        title="Sales Manager Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality sales manager headshots — without the $500+ cost."
        highlight="90% Less"
      />

      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={salesManagerFaqs}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="sales-manager"
        title="Your Studio-Quality Sales Manager Headshots Are Minutes Away"
        highlight="Sales Manager Headshots"
        ctaText="Get My Headshots Now"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
