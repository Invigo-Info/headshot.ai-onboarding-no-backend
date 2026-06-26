// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the graduation headshots landing page.
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
import GraduationBenefitsSection from "@/components/landing-page/graduation-headshots/graduation-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";

// Static data and utility functions for the page content.
import { graduationHeadshotsReviews } from "@/data/reviews";
import { graduationPricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";
import { graduationFaqs } from "@/data/faqs";

const { logos } = getLogosBySlug("graduation");

const keypoints = ["100% money-back", "Fully private & secure"];

const graduationSteps: StepData[] = [
  {
    number: 1,
    title: "Pick Your Look",
    description:
      "Select one or more options:\n• Attire: graduation gown, professional\n• Background: studio, campus, outdoor",
    images: [
      "/assets/landing-page/graduation/how-it-works/step-1/attire/1.graduation-gown.webp",
      "/assets/landing-page/graduation/how-it-works/step-1/attire/2.professional.webp",
      "/assets/landing-page/graduation/how-it-works/step-1/background/1.studio.webp",
      "/assets/landing-page/graduation/how-it-works/step-1/background/2.campus.webp",
      "/assets/landing-page/graduation/how-it-works/step-1/background/3.outdoor.webp",
    ],
    labels: ["Graduation Gown", "Professional", "Studio", "Campus", "Outdoor"],
  },
  {
    number: 2,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/graduation/how-it-works/step-2/1.webp",
      "/assets/landing-page/graduation/how-it-works/step-2/2.webp",
      "/assets/landing-page/graduation/how-it-works/step-2/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Headshots",
    description:
      "In under 15 minutes, our AI turns your casual selfies into stunning graduation headshots in the attire and backgrounds you've chosen.",
    images: ["/assets/landing-page/graduation/how-it-works/step-3/1.webp"],
  },
  {
    number: 4,
    title: "Download Your Headshots",
    description:
      "Review your gallery of 150 graduation headshots and download your favorites for instant use.",
    images: [
      "/assets/landing-page/graduation/how-it-works/step-4/1.webp",
      "/assets/landing-page/graduation/how-it-works/step-4/2.webp",
      "/assets/landing-page/graduation/how-it-works/step-4/3.webp",
      "/assets/landing-page/graduation/how-it-works/step-4/4.webp",
      "/assets/landing-page/graduation/how-it-works/step-4/5.webp",
      "/assets/landing-page/graduation/how-it-works/step-4/6.webp",
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
  title: "#1 AI Graduation Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality graduation headshots. Perfect for announcements, alumni pages and resumes. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: "/graduation-headshots",
});

export default function GraduationHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI GRADUATION HEADSHOT GENERATOR"
        title="Get Graduation Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality graduation headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="graduation"
        trustedByText="Over 262,800 AI headshots generated for 3,000+ graduates"
        trustedByTexthighlight={["262,800", "3,000+"]}
        usedByText="Used by graduates from top universities"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Graduation Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={graduationSteps}
      />
      <ReviewsSection
        reviews={graduationHeadshotsReviews}
        title="Trusted by 3,000+ Graduates"
        highlight="3,000+"
        subtitle="Read reviews from students using our headshots for announcements, LinkedIn, and career launches."
      />
      <GraduationBenefitsSection
        title="Boost up to 2× More Compliments and Career Opportunities"
        highlight="2× More"
        description="Look polished and confident across graduation announcements, LinkedIn, and job applications."
      />
      <GalleryReviewsSection
        category="graduation"
        title="Graduation Headshots"
        highlight="Graduation"
        subtitle="See how our AI turns your selfies into studio-quality graduation headshots — in minutes."
        description="They look like a professional photographer took them-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={graduationPricing}
        title="Graduation Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality graduation headshots — without the $500+ cost."
        highlight="90% Less"
      />

      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={graduationFaqs}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="graduation"
        title="Your Studio-Quality Graduation Headshots Are Minutes Away"
        highlight="Graduation Headshots"
        ctaText="Get My Headshots Now"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
