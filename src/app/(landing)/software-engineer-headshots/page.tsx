// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the software-engineer headshots landing page.
import { CTASection } from "@/components/landing-page/cta-section";
import DataSafetySection, {
  type DataSafetyItem,
} from "@/components/landing-page/data-safety-section";
import FloatingCtaButton from "@/components/landing-page/floating-cta-button";
import GalleryReviewsSection from "@/components/landing-page/gallery-reviews-section";
import HowItWorksSection, {
  type StepData,
} from "@/components/landing-page/how-it-works";
import SoftwareEngineerBenefitsSection from "@/components/landing-page/software-engineer-headshots/software-engineer-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";
import HeroSection from "@/components/landing-page/hero-section";
import PricingSection from "@/components/landing-page/pricing-section";
import ReviewsSection from "@/components/landing-page/reviews-section";

// Static data and utility functions for the page content.
import { softwareEngineerHeadshotsReviews } from "@/data/reviews";
import { softwareEngineerPricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";
import { softwareEngineerFaqs } from "@/data/faqs";

const { logos } = getLogosBySlug("software-engineer");

const keypoints = ["100% money-back", "Fully private & secure"];

const softwareengineerSteps: StepData[] = [
  {
    number: 1,
    title: "Pick Your Look",
    description:
      "Select one or more options:\n• Attire: business professional, business casual, smart casual\n• Background: studio, office, work from home, business parks, city, wall and bricks",
    images: [
      "/assets/landing-page/software-engineer/how-it-works/step-1/attire/1.business-professional.webp",
      "/assets/landing-page/software-engineer/how-it-works/step-1/attire/2.business-casual.webp",
      "/assets/landing-page/software-engineer/how-it-works/step-1/background/1.studio.webp",
      "/assets/landing-page/software-engineer/how-it-works/step-1/background/2.office.webp",
      "/assets/landing-page/software-engineer/how-it-works/step-1/background/3.work-from-home.webp",
      "/assets/landing-page/software-engineer/how-it-works/step-1/background/4.business-parks.webp",
    ],
    labels: [
      "Business Professional",
      "Business Casual",
      "Studio",
      "Office",
      "Work From Home",
      "Business Parks",
    ],
  },
  {
    number: 2,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/software-engineer/how-it-works/step-2/1.webp",
      "/assets/landing-page/software-engineer/how-it-works/step-2/2.webp",
      "/assets/landing-page/software-engineer/how-it-works/step-2/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Headshots",
    description:
      "In under 15 minutes, our AI turns your casual selfies into studio-quality software engineer headshots in the attire and backgrounds you've chosen.",
    images: [
      "/assets/landing-page/software-engineer/how-it-works/step-3/1.webp",
    ],
  },
  {
    number: 4,
    title: "Download Your Headshots",
    description:
      "Review your gallery of 150 software engineer headshots and download your favorites for instant use.",
    images: [
      "/assets/landing-page/software-engineer/how-it-works/step-4/1.webp",
      "/assets/landing-page/software-engineer/how-it-works/step-4/2.webp",
      "/assets/landing-page/software-engineer/how-it-works/step-4/3.webp",
      "/assets/landing-page/software-engineer/how-it-works/step-4/4.webp",
      "/assets/landing-page/software-engineer/how-it-works/step-4/5.webp",
      "/assets/landing-page/software-engineer/how-it-works/step-4/6.webp",
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
  title: "#1 AI Software Engineer Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality software engineer headshots. Perfect for LinkedIn, GitHub and team pages. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: "/software-engineer-headshots",
});

export default function SoftwareEngineerHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI SOFTWARE ENGINEER HEADSHOT GENERATOR"
        title="Get Professional Software Engineer Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality software engineer headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="software-engineer"
        trustedByText="Over 333,000 AI headshots generated for 3,800+ software engineers"
        trustedByTexthighlight={["333,000", "3,800+"]}
        usedByText="Used by software engineers across the tech industry"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Software Engineer Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={softwareengineerSteps}
      />
      <ReviewsSection
        reviews={softwareEngineerHeadshotsReviews}
        title="Trusted by 3,800+ Software Engineers"
        highlight="3,800+"
        subtitle="Read reviews from software engineers using our headshots for tech profiles, portfolios, and career materials."
      />
      <SoftwareEngineerBenefitsSection
        title="Boost up to 4× More Recruiter Responses and Interview Callbacks"
        highlight="4× More"
        description="Get noticed faster on LinkedIn, GitHub, and company directories."
      />
      <GalleryReviewsSection
        category="software-engineer"
        title="Software Engineer Headshots"
        highlight="Software Engineer"
        subtitle="See how our AI turns your selfies into studio-quality software engineer headshots — in minutes."
        description="They look like a high-end studio shoot-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={softwareEngineerPricing}
        title="Software Engineer Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality software engineer headshots — without the $500+ cost."
        highlight="90% Less"
      />

      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={softwareEngineerFaqs}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="software-engineer"
        title="Your Studio-Quality Software Engineer Headshots Are Minutes Away"
        highlight="Software Engineer Headshots"
        ctaText="Get My Headshots Now"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
