// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the yoga-teacher headshots landing page.
import { CTASection } from "@/components/landing-page/cta-section";
import DataSafetySection, {
  type DataSafetyItem,
} from "@/components/landing-page/data-safety-section";
import FloatingCtaButton from "@/components/landing-page/floating-cta-button";
import GalleryReviewsSection from "@/components/landing-page/gallery-reviews-section";
import HowItWorksSection, {
  type StepData,
} from "@/components/landing-page/how-it-works";
import YogaTeacherBenefitsSection from "@/components/landing-page/yoga-teacher-headshots/yoga-teacher-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";
import HeroSection from "@/components/landing-page/hero-section";
import PricingSection from "@/components/landing-page/pricing-section";
import ReviewsSection from "@/components/landing-page/reviews-section";

// Static data and utility functions for the page content.
import { yogaTeacherHeadshotsReviews } from "@/data/reviews";
import { yogaTeacherPricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";
import { yogaTeacherFaqs } from "@/data/faqs";

const { logos } = getLogosBySlug("yoga-teacher");

const keypoints = ["100% money-back", "Fully private & secure"];

const yogateacherSteps: StepData[] = [
  {
    number: 1,
    title: "Choose Your Background",
    description:
      "Select one or more backgrounds: studio, indoor yoga studio, outdoor yoga wellness.",
    images: [
      "/assets/landing-page/yoga-teacher/how-it-works/step-1/background/1.studio.webp",
      "/assets/landing-page/yoga-teacher/how-it-works/step-1/background/2.indoor-yoga-studio.webp",
      "/assets/landing-page/yoga-teacher/how-it-works/step-1/background/3.outdoor-yoga-Wellness.webp",
    ],
    labels: ["Studio", "Indoor Yoga Studio", "Outdoor Yoga Wellness"],
  },
  {
    number: 2,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/yoga-teacher/how-it-works/step-2/1.webp",
      "/assets/landing-page/yoga-teacher/how-it-works/step-2/2.webp",
      "/assets/landing-page/yoga-teacher/how-it-works/step-2/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Headshots",
    description:
      "In under 15 minutes, our AI turns your selfies into studio-quality yoga teacher headshots with professional attire and the backgrounds you've chosen.",
    images: ["/assets/landing-page/yoga-teacher/how-it-works/step-3/1.webp"],
  },
  {
    number: 4,
    title: "Download Your Headshots",
    description:
      "Review your gallery of 150 yoga teacher headshots and download your favorites for instant use.",
    images: [
      "/assets/landing-page/yoga-teacher/how-it-works/step-4/1.webp",
      "/assets/landing-page/yoga-teacher/how-it-works/step-4/2.webp",
      "/assets/landing-page/yoga-teacher/how-it-works/step-4/3.webp",
      "/assets/landing-page/yoga-teacher/how-it-works/step-4/4.webp",
      "/assets/landing-page/yoga-teacher/how-it-works/step-4/5.webp",
      "/assets/landing-page/yoga-teacher/how-it-works/step-4/6.webp",
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
  title: "#1 AI Yoga Teacher Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality yoga teacher headshots. Perfect for studio sites and wellness platforms. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: "/yoga-teacher-headshots",
});

export default function YogaTeacherHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI YOGA TEACHER HEADSHOT GENERATOR"
        title="Get Professional Yoga Teacher Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality yoga teacher headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="yoga-teacher"
        trustedByText="Over 96,400 AI headshots generated for 1,100+ yoga teachers"
        trustedByTexthighlight={["96,400", "1,100+"]}
        usedByText="Used by yoga teachers across the wellness industry"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Yoga Teacher Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={yogateacherSteps}
      />
      <ReviewsSection
        reviews={yogaTeacherHeadshotsReviews}
        title="Trusted by 1,100+ Yoga Teachers"
        highlight="1,100+"
        subtitle="Read reviews from yoga teachers using our headshots for studio profiles, wellness platforms, and class bookings."
      />
      <YogaTeacherBenefitsSection
        title="Increase up to 2× More Class Bookings and Student Loyalty"
        highlight="2× More"
        description="Radiate calm and confidence across studio profiles and wellness apps."
      />
      <GalleryReviewsSection
        category="yoga-teacher"
        title="Yoga Teacher Headshots"
        highlight="Yoga Teacher"
        subtitle="See how our AI turns your selfies into studio-quality yoga teacher headshots — in minutes."
        description="They look like a high-end studio shoot-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={yogaTeacherPricing}
        title="Yoga Teacher Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality yoga teacher headshots — without the $500+ cost."
        highlight="90% Less"
      />

      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={yogaTeacherFaqs}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="yoga-teacher"
        title="Your Studio-Quality Yoga Teacher Headshots Are Minutes Away"
        highlight="Yoga Teacher Headshots"
        ctaText="Get My Headshots Now"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
