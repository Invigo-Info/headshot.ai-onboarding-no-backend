// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the singer headshots landing page.
import { CTASection } from "@/components/landing-page/cta-section";
import DataSafetySection, {
  type DataSafetyItem,
} from "@/components/landing-page/data-safety-section";
import FloatingCtaButton from "@/components/landing-page/floating-cta-button";
import GalleryReviewsSection from "@/components/landing-page/gallery-reviews-section";
import HowItWorksSection, {
  type StepData,
} from "@/components/landing-page/how-it-works";
import SingerBenefitsSection from "@/components/landing-page/singer-headshots/singer-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";
import HeroSection from "@/components/landing-page/hero-section";
import PricingSection from "@/components/landing-page/pricing-section";
import ReviewsSection from "@/components/landing-page/reviews-section";

// Static data and utility functions for the page content.
import { singerHeadshotsReviews } from "@/data/reviews";
import { singerPricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";
import { singerFaqs } from "@/data/faqs";

const { logos } = getLogosBySlug("singer");

const keypoints = ["100% money-back", "Fully private & secure"];

const singerSteps: StepData[] = [
  {
    number: 1,
    title: "Choose Your Background",
    description:
      "Select one or more backgrounds: studio, dramatic, music recording studio, stage, outdoor.",
    images: [
      "/assets/landing-page/singer/how-it-works/step-1/background/1.studio.webp",
      "/assets/landing-page/singer/how-it-works/step-1/background/2.dramatic.webp",
      "/assets/landing-page/singer/how-it-works/step-1/background/3.music-recording-studio.webp",
      "/assets/landing-page/singer/how-it-works/step-1/background/4.stage.webp",
      "/assets/landing-page/singer/how-it-works/step-1/background/5.outdoor.webp",
    ],
    labels: [
      "Studio",
      "Dramatic",
      "Music Recording Studio",
      "Stage",
      "Outdoor",
    ],
  },
  {
    number: 2,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/singer/how-it-works/step-2/1.webp",
      "/assets/landing-page/singer/how-it-works/step-2/2.webp",
      "/assets/landing-page/singer/how-it-works/step-2/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Headshots",
    description:
      "In under 15 minutes, our AI turns your selfies into studio-quality singer headshots with professional attire and the backgrounds you've chosen.",
    images: ["/assets/landing-page/singer/how-it-works/step-3/1.webp"],
  },
  {
    number: 4,
    title: "Download Your Headshots",
    description:
      "Review your gallery of 150 singer headshots and download your favorites for instant use.",
    images: [
      "/assets/landing-page/singer/how-it-works/step-4/1.webp",
      "/assets/landing-page/singer/how-it-works/step-4/2.webp",
      "/assets/landing-page/singer/how-it-works/step-4/3.webp",
      "/assets/landing-page/singer/how-it-works/step-4/4.webp",
      "/assets/landing-page/singer/how-it-works/step-4/5.webp",
      "/assets/landing-page/singer/how-it-works/step-4/6.webp",
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
  title: "#1 AI Singer Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality singer headshots. Perfect for press kits, flyers and streaming profiles. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: "/singer-headshots",
});

export default function SingerHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI SINGER HEADSHOT GENERATOR"
        title="Get Professional Singer Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality singer headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="singer"
        trustedByText="Over 157,700 AI headshots generated for 1,800+ singers"
        trustedByTexthighlight={["157,700", "1,800+"]}
        usedByText="Used by singers across the music industry"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Singer Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={singerSteps}
      />
      <ReviewsSection
        reviews={singerHeadshotsReviews}
        title="Trusted by 1,800+ Singers"
        highlight="1,800+"
        subtitle="Read reviews from singers using our headshots for press kits, streaming profiles, and event bookings."
      />
      <SingerBenefitsSection
        title="Boost up to 3× More Gig Bookings and Fan Engagement"
        highlight="3× More"
        description="Look like a star across press kits, streaming platforms, and social profiles."
      />
      <GalleryReviewsSection
        category="singer"
        title="Singer Headshots"
        highlight="Singer"
        subtitle="See how our AI turns your selfies into studio-quality singer headshots — in minutes."
        description="They look like a high-end studio shoot-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={singerPricing}
        title="Singer Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality singer headshots — without the $500+ cost."
        highlight="90% Less"
      />

      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={singerFaqs}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="singer"
        title="Your Studio-Quality Singer Headshots Are Minutes Away"
        highlight="Singer Headshots"
        ctaText="Get My Headshots Now"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
