// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the dating headshots landing page.
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
import DatingBenefitsSection from "@/components/landing-page/dating-headshots/dating-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";

// Static data and utility functions for the page content.
import { datingHeadshotsReviews } from "@/data/reviews";
import { datingPricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";
import { datingPhotosFaqs } from "@/data/faqs";

const { logos } = getLogosBySlug("dating");

const keypoints = ["100% money-back", "Fully private & secure"];

const datingSteps: StepData[] = [
  {
    number: 1,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/dating/how-it-works/step-1/1.webp",
      "/assets/landing-page/dating/how-it-works/step-1/2.webp",
      "/assets/landing-page/dating/how-it-works/step-1/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Looks",
    description:
      "In under 15 minutes, our AI transforms your selfies into stunning dating headshots with different outfits, settings, and vibes — all designed to help you stand out on any dating app.",
    images: ["/assets/landing-page/dating/how-it-works/step-2/1.webp"],
  },
  {
    number: 4,
    title: "Download Your Favorites",
    description:
      "Review your gallery of 150 dating headshots and download your favorites for instant use on Tinder, Bumble, Hinge, or any dating app.",
    images: [
      "/assets/landing-page/dating/how-it-works/step-3/1.webp",
      "/assets/landing-page/dating/how-it-works/step-3/2.webp",
      "/assets/landing-page/dating/how-it-works/step-3/3.webp",
      "/assets/landing-page/dating/how-it-works/step-3/4.webp",
      "/assets/landing-page/dating/how-it-works/step-3/5.webp",
      "/assets/landing-page/dating/how-it-works/step-3/6.webp",
    ],
  },
  // {
  //   number: 3,
  //   title: "Download Your Favorites",
  //   description:
  //     "Review your gallery of 150 dating headshots and download your favorites for instant use on Tinder, Bumble, Hinge, or any dating app.",
  //   images: [
  //     "/assets/landing-page/dating/how-it-works/step-4/1.webp",
  //     "/assets/landing-page/dating/how-it-works/step-4/2.webp",
  //     "/assets/landing-page/dating/how-it-works/step-4/3.webp",
  //     "/assets/landing-page/dating/how-it-works/step-4/4.webp",
  //     "/assets/landing-page/dating/how-it-works/step-4/5.webp",
  //     "/assets/landing-page/dating/how-it-works/step-4/6.webp",
  //   ],
  // },
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
  title: "#1 AI Dating Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality dating headshots. Perfect for profiles that look natural and approachable. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: '/dating-headshots',
});

export default function DatingHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI DATING HEADSHOT GENERATOR"
        title="Get Dating Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality dating headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="dating"
        trustedByText="Over 385,400 AI headshots generated for 4,400+ singles"
        trustedByTexthighlight={["385,400", "4,400+"]}
        usedByText="As seen in"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Dating Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={datingSteps}
      />
      <ReviewsSection
        reviews={datingHeadshotsReviews}
        title="Trusted by 4,400+ Singles"
        highlight="4,400+"
        subtitle="Read reviews from people using our headshots to stand out on dating apps, attract better matches, and start real conversations."
      />
      <DatingBenefitsSection
        title="Boost up to 3× More Matches and Real Connections"
        highlight="3× More"
        description="Look confident, genuine, and attractive across all your dating profiles."
      />
      <GalleryReviewsSection
        category="dating"
        title="Dating Headshots"
        highlight="Dating"
        subtitle="See how our AI turns your selfies into studio-quality dating headshots — in minutes."
        description="They look like a professional photographer took them-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={datingPricing}
        title="Dating Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality dating headshots — without the $500+ cost."
        highlight="90% Less"
      />

      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={datingPhotosFaqs}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="dating"
        title="Your Studio-Quality Dating Headshots Are Minutes Away"
        highlight="Dating Headshots"
        ctaText="Get My Headshots Now"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
