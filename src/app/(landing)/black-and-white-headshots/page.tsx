// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the black and white headshots landing page.
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
import BlackAndWhiteBenefitsSection from "@/components/landing-page/black-and-white-headshots/black-and-white-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";

// Static data and utility functions for the page content.
import { blackAndWhiteHeadshotsReviews } from "@/data/reviews";
import { blackAndWhitePricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";
import { blackAndWhiteFaqs } from "@/data/faqs";

const { logos } = getLogosBySlug("black-and-white-headshots");

const keypoints = ["100% money-back", "Fully private & secure"];

const blackAndWhiteSteps: StepData[] = [
  {
    number: 1,
    title: "Pick Your Look",
    description:
      "Select one or more options:\n• Attire: professional, casual, smart casual\n• Background: studio, dark studio",
    images: [
      "/assets/landing-page/black-and-white/how-it-works/step-1/attire/1.professional.webp",
      "/assets/landing-page/black-and-white/how-it-works/step-1/attire/2.casual.webp",
      "/assets/landing-page/black-and-white/how-it-works/step-1/attire/3.smart-casual.webp",
      "/assets/landing-page/black-and-white/how-it-works/step-1/background/1.studio.webp",
      "/assets/landing-page/black-and-white/how-it-works/step-1/background/2.dark-studio.webp",
    ],
    labels: ["Professional", "Casual", "Smart Casual", "Studio", "Dark Studio"],
  },
  {
    number: 2,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/black-and-white/how-it-works/step-2/1.webp",
      "/assets/landing-page/black-and-white/how-it-works/step-2/2.webp",
      "/assets/landing-page/black-and-white/how-it-works/step-2/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Headshots",
    description:
      "In under 15 minutes, our AI turns your casual selfies into stunning black & white headshots with the attire and classic studio look you've chosen.",
    images: ["/assets/landing-page/black-and-white/how-it-works/step-3/1.webp"],
  },
  {
    number: 4,
    title: "Download Your Headshots",
    description:
      "Review your gallery of 150 black & white headshots and download your favorites for instant use.",
    images: [
      "/assets/landing-page/black-and-white/how-it-works/step-4/1.webp",
      "/assets/landing-page/black-and-white/how-it-works/step-4/2.webp",
      "/assets/landing-page/black-and-white/how-it-works/step-4/3.webp",
      "/assets/landing-page/black-and-white/how-it-works/step-4/4.webp",
      "/assets/landing-page/black-and-white/how-it-works/step-4/5.webp",
      "/assets/landing-page/black-and-white/how-it-works/step-4/6.webp",
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
  title: "#1 AI Black and White Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality black and white headshots. Perfect for portfolios and LinkedIn. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: '/black-and-white-headshots',
});

export default function BlackAndWhiteHeadshotsPage() {
  return (
    // [&>*:nth-last-child(2)]:mb-16
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI BLACK & WHITE HEADSHOT GENERATOR"
        title="Get Professional Black and White Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality black and white headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="black-and-white"
        trustedByText="Over 175,200 AI headshots generated for 2,000+ professionals"
        trustedByTexthighlight={["175,200", "2,000+"]}
        usedByText="Used by professionals across every industry"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Black and White Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={blackAndWhiteSteps}
      />
      <ReviewsSection
        reviews={blackAndWhiteHeadshotsReviews}
        title="Trusted by 2,000+ Creatives and Professionals"
        highlight="2,000+"
        subtitle="Read reviews from actors, artists, and professionals using our headshots for portfolios, profiles, and personal branding."
      />
      <BlackAndWhiteBenefitsSection
        title="Gain up to 2× More Profile Views and Engagement"
        highlight="2× More"
        description="Look striking, artistic, and memorable across portfolios, websites, and social media."
      />
      <GalleryReviewsSection
        category="black-and-white"
        title="Black and White Headshots"
        highlight="Black and White"
        subtitle="See how our AI turns your selfies into studio-quality black and white headshots — in minutes."
        description="They look like a professional photographer took them-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={blackAndWhitePricing}
        title="Black and White Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality black and white headshots — without the $500+ cost."
        highlight="90% Less"
      />

      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={blackAndWhiteFaqs}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="black-and-white"
        title="Your Studio-Quality Black and White Headshots Are Minutes Away"
        highlight="Black and White Headshots"
        ctaText="Get My Headshots Now"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
