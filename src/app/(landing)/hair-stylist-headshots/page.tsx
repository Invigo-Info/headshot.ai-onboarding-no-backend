// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the hair stylist headshots landing page.
import { CTASection } from "@/components/landing-page/cta-section";
import DataSafetySection, {
  type DataSafetyItem,
} from "@/components/landing-page/data-safety-section";
import FloatingCtaButton from "@/components/landing-page/floating-cta-button";
import GalleryReviewsSection from "@/components/landing-page/gallery-reviews-section";
import HowItWorksSection, {
  type StepData,
} from "@/components/landing-page/how-it-works";
import PricingSection from "@/components/landing-page/pricing-section";
import ReviewsSection from "@/components/landing-page/reviews-section";
import HeroSection from "@/components/landing-page/hero-section";
import HairStylistBenefitsSection from "@/components/landing-page/hair-stylist-headshots/hair-stylist-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";

// Static data and utility functions for the page content.
import { hairStylistHeadshotsReviews } from "@/data/reviews";
import { hairStylistPricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";
import { hairStylistFaqs } from "@/data/faqs";

const { logos } = getLogosBySlug("hair-stylist");

const keypoints = ["100% money-back", "Fully private & secure"];

const hairstylistSteps: StepData[] = [
  {
    number: 1,
    title: "Choose Your Background",
    description:
      "Select one or more backgrounds: studio, salon workspace, outdoor.",
    images: [
      "/assets/landing-page/hair-stylist/how-it-works/step-1/background/1.studio.webp",
      "/assets/landing-page/hair-stylist/how-it-works/step-1/background/2.salon-workspace.webp",
      "/assets/landing-page/hair-stylist/how-it-works/step-1/background/3.outdoor.webp",
    ],
    labels: ["Studio", "Salon Workspace", "Outdoor"],
  },
  {
    number: 2,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/hair-stylist/how-it-works/step-2/1.webp",
      "/assets/landing-page/hair-stylist/how-it-works/step-2/2.webp",
      "/assets/landing-page/hair-stylist/how-it-works/step-2/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Headshots",
    description:
      "In under 15 minutes, our AI turns your selfies into studio-quality hair stylist headshots with professional attire and the backgrounds you've chosen.",
    images: ["/assets/landing-page/hair-stylist/how-it-works/step-3/1.webp"],
  },
  {
    number: 4,
    title: "Download Your Headshots",
    description:
      "Review your gallery of 150 hair stylist headshots and download your favorites for instant use.",
    images: [
      "/assets/landing-page/hair-stylist/how-it-works/step-4/1.webp",
      "/assets/landing-page/hair-stylist/how-it-works/step-4/2.webp",
      "/assets/landing-page/hair-stylist/how-it-works/step-4/3.webp",
      "/assets/landing-page/hair-stylist/how-it-works/step-4/4.webp",
      "/assets/landing-page/hair-stylist/how-it-works/step-4/5.webp",
      "/assets/landing-page/hair-stylist/how-it-works/step-4/6.webp",
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
  title: "#1 AI Hair Stylist Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality hair stylist headshots. Perfect for salon sites, LinkedIn and social media. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: "/hair-stylist-headshots",
});

export default function HairStylistHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI HAIR STYLIST HEADSHOT GENERATOR"
        title="Get Professional Hair Stylist Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality hair stylist headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="hair-stylist"
        trustedByText="Over 113,900 AI headshots generated for 1,300+ hair stylists"
        trustedByTexthighlight={["113,900", "1,300+"]}
        usedByText="Used by hair stylists across the beauty industry"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Hair Stylist Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={hairstylistSteps}
      />
      <ReviewsSection
        reviews={hairStylistHeadshotsReviews}
        title="Trusted by 1,300+ Hair Stylists"
        highlight="1,300+"
        subtitle="Read reviews from hair stylists using our headshots for salon websites, booking apps, and social media profiles."
      />
      <HairStylistBenefitsSection
        title="Boost up to 2× More Client Bookings and Referrals"
        highlight="2× More"
        description="Look polished everywhere clients find you — from salon profiles to Instagram."
      />
      <GalleryReviewsSection
        category="hair-stylist"
        title="Hair Stylist Headshots"
        highlight="Hair Stylist"
        subtitle="See how our AI turns your selfies into studio-quality hair stylist headshots — in minutes."
        description="They look like a high-end studio shoot-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={hairStylistPricing}
        title="Hair Stylist Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality hair stylist headshots — without the $500+ cost."
        highlight="90% Less"
      />

      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={hairStylistFaqs}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="hair-stylist"
        title="Your Studio-Quality Hair Stylist Headshots Are Minutes Away"
        highlight="Hair Stylist Headshots"
        ctaText="Get My Headshots Now"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
