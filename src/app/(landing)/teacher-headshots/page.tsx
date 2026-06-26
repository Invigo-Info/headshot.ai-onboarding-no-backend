// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the teacher headshots landing page.
import { CTASection } from "@/components/landing-page/cta-section";
import DataSafetySection, {
  type DataSafetyItem,
} from "@/components/landing-page/data-safety-section";
import FloatingCtaButton from "@/components/landing-page/floating-cta-button";
import GalleryReviewsSection from "@/components/landing-page/gallery-reviews-section";
import HowItWorksSection, {
  type StepData,
} from "@/components/landing-page/how-it-works";
import TeacherBenefitsSection from "@/components/landing-page/teacher-headshots/teacher-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";
import HeroSection from "@/components/landing-page/hero-section";
import PricingSection from "@/components/landing-page/pricing-section";
import ReviewsSection from "@/components/landing-page/reviews-section";

// Static data and utility functions for the page content.
import { teacherHeadshotsReviews } from "@/data/reviews";
import { teacherPricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";
import { teacherFaqs } from "@/data/faqs";

const { logos } = getLogosBySlug("teacher");

const keypoints = ["100% money-back", "Fully private & secure"];

const teacherSteps: StepData[] = [
  {
    number: 1,
    title: "Choose Your Background",
    description: "Select one or more backgrounds: studio, classroom, campus.",
    images: [
      "/assets/landing-page/teacher/how-it-works/step-1/background/1.studio.webp",
      "/assets/landing-page/teacher/how-it-works/step-1/background/2.classroom.webp",
      "/assets/landing-page/teacher/how-it-works/step-1/background/3.campus.webp",
    ],
    labels: ["Studio", "Classroom", "Campus"],
  },
  {
    number: 2,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/teacher/how-it-works/step-2/1.webp",
      "/assets/landing-page/teacher/how-it-works/step-2/2.webp",
      "/assets/landing-page/teacher/how-it-works/step-2/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Headshots",
    description:
      "In under 15 minutes, our AI turns your selfies into studio-quality teacher headshots with professional attire and the backgrounds you've chosen.",
    images: ["/assets/landing-page/teacher/how-it-works/step-3/1.webp"],
  },
  {
    number: 4,
    title: "Download Your Headshots",
    description:
      "Review your gallery of 150 teacher headshots and download your favorites for instant use.",
    images: [
      "/assets/landing-page/teacher/how-it-works/step-4/1.webp",
      "/assets/landing-page/teacher/how-it-works/step-4/2.webp",
      "/assets/landing-page/teacher/how-it-works/step-4/3.webp",
      "/assets/landing-page/teacher/how-it-works/step-4/4.webp",
      "/assets/landing-page/teacher/how-it-works/step-4/5.webp",
      "/assets/landing-page/teacher/how-it-works/step-4/6.webp",
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
  title: "#1 AI Teacher Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality teacher headshots. Perfect for LinkedIn, staff pages and school sites. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: "/teacher-headshots",
});

export default function TeacherHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI TEACHER HEADSHOT GENERATOR"
        title="Get Professional Teacher Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality teacher headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="teacher"
        trustedByText="Over 438,100 AI headshots generated for 5,000+ teachers"
        trustedByTexthighlight={["438,100", "5,000+"]}
        usedByText="Used by teachers across all grade levels"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Teacher Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={teacherSteps}
      />
      <ReviewsSection
        reviews={teacherHeadshotsReviews}
        title="Trusted by 5,000+ Teachers"
        highlight="5,000+"
        subtitle="Read reviews from teachers using our headshots for school profiles, parent communications, and education platforms."
      />
      <TeacherBenefitsSection
        title="Increase up to 2× More Professional Recognition and Career Opportunities"
        highlight="2× More"
        description="Build trust with parents and administrators across faculty pages and school communications."
      />
      <GalleryReviewsSection
        category="teacher"
        title="Teacher Headshots"
        highlight="Teacher"
        subtitle="See how our AI turns your selfies into studio-quality teacher headshots — in minutes."
        description="They look like a high-end studio shoot-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={teacherPricing}
        title="Teacher Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality teacher headshots — without the $500+ cost."
        highlight="90% Less"
      />

      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={teacherFaqs}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="teacher"
        title="Your Studio-Quality Teacher Headshots Are Minutes Away"
        highlight="Teacher Headshots"
        ctaText="Get My Headshots Now"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
