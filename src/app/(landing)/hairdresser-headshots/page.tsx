// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the hairdresser headshots landing page.
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
import HairdresserBenefitsSection from "@/components/landing-page/hairdresser-headshots/hairdresser-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";

// Static data and utility functions for the page content.
import { hairdresserHeadshotsReviews } from "@/data/reviews";
import { hairdresserPricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";

const { logos } = getLogosBySlug("hairdresser");

const keypoints = ["100% money-back", "Fully private & secure"];

// Custom steps data for Hairdresser headshots - Updated content
const hairdresserFaqCategories = [
  {
    category: "What Are AI Hairdresser Headshots?",
    questions: [
      {
        question: "What is a hairdresser headshot?",
        answer:
          "A hairdresser headshot is a professional shoulders-up photo used on salon websites, social media, booking platforms, and marketing materials.",
      },
      {
        question: "Why do hairdresser headshots matter?",
        answer:
          "They shape first impressions, build trust, and help increase bookings, followers, and client inquiries.",
      },
      {
        question: "What is an AI hairdresser headshot?",
        answer:
          "It's a professional hairdresser headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Salon owners, freelance hairdressers, stylists, colorists, barbers, and beauty professionals.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No. Just wear whatever you have on — everyday clothes are fine. The AI automatically applies suitable attire to your headshots.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, salon workspace, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for hairdressers?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my hairdresser headshots?",
        answer:
          "Salon websites, Instagram, booking apps, Google Business profiles, business cards, promotional flyers, email signatures, and portfolio pages.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Clients want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

const hairdresserSteps: StepData[] = [
  {
    number: 1,
    title: "Choose Your Background",
    description:
      "Select one or more backgrounds: studio, salon workspace, outdoor.",
    images: [
      "/assets/landing-page/hairdresser/how-it-works/step-1/background/1.studio.webp",
      "/assets/landing-page/hairdresser/how-it-works/step-1/background/2.salon-workspace.webp",
      "/assets/landing-page/hairdresser/how-it-works/step-1/background/3.outdoor.webp",
    ],
    labels: ["Studio", "Salon Workspace", "Outdoor"],
  },
  {
    number: 2,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/hairdresser/how-it-works/step-2/1.webp",
      "/assets/landing-page/hairdresser/how-it-works/step-2/2.webp",
      "/assets/landing-page/hairdresser/how-it-works/step-2/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Headshots",
    description:
      "In under 15 minutes, our AI turns your selfies into studio-quality hairdresser headshots with professional attire and the backgrounds you've chosen.",
    images: ["/assets/landing-page/hairdresser/how-it-works/step-3/1.webp"],
  },
  {
    number: 4,
    title: "Download Your Headshots",
    description:
      "Review your gallery of 150 hairdresser headshots and download your favorites for instant use.",
    images: [
      "/assets/landing-page/hairdresser/how-it-works/step-4/1.webp",
      "/assets/landing-page/hairdresser/how-it-works/step-4/2.webp",
      "/assets/landing-page/hairdresser/how-it-works/step-4/3.webp",
      "/assets/landing-page/hairdresser/how-it-works/step-4/4.webp",
      "/assets/landing-page/hairdresser/how-it-works/step-4/5.webp",
      "/assets/landing-page/hairdresser/how-it-works/step-4/6.webp",
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
  title: "#1 AI Hairdresser Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality hairdresser headshots. Perfect for salon pages, LinkedIn and social media. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: "/hairdresser-headshots",
});

export default function HairdresserHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI HAIRDRESSER HEADSHOT GENERATOR"
        title="Get Professional Hairdresser Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality hairdresser headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="hairdresser"
        trustedByText="Over 78,900 AI headshots generated for 900+ hairdressers"
        trustedByTexthighlight={["78,900", "900+"]}
        usedByText="Used by hairdressers across the beauty industry"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Hairdresser Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={hairdresserSteps}
      />
      <ReviewsSection
        reviews={hairdresserHeadshotsReviews}
        title="Trusted by 900+ Hairdressers"
        highlight="900+"
        subtitle="Read reviews from hairdressers using our headshots for salon profiles, booking apps, and social media pages."
      />
      <HairdresserBenefitsSection
        title="Boost up to 2× More Client Bookings and Referrals"
        highlight="2× More"
        description="Win clients before they sit in your chair — across booking apps and social media."
      />
      <GalleryReviewsSection
        category="hairdresser"
        title="Hairdresser Headshots"
        highlight="Hairdresser"
        subtitle="See how our AI turns your selfies into studio-quality hairdresser headshots — in minutes."
        description="They look like a high-end studio shoot-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={hairdresserPricing}
        title="Hairdresser Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality hairdresser headshots — without the $500+ cost."
        highlight="90% Less"
      />

      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={hairdresserFaqCategories}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="hairdresser"
        title="Your Studio-Quality Hairdresser Headshots Are Minutes Away"
        highlight="Hairdresser Headshots"
        ctaText="Get My  Headshots"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
