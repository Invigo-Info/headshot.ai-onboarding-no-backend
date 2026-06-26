// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the bumble headshots landing page.
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
import BumbleBenefitsSection from "@/components/landing-page/bumble-headshots/bumble-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";

// Static data and utility functions for the page content.
import { bumbleHeadshotsReviews } from "@/data/reviews";
import { bumblePricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";

const { logos } = getLogosBySlug("bumble");

const keypoints = ["100% money-back", "Fully private & secure"];

// Custom steps data for Bumble headshots - Updated content
const bumbleFaqCategories = [
  {
    category: "What Are AI Bumble Headshots?",
    questions: [
      {
        question: "What is a Bumble headshot?",
        answer:
          "A Bumble headshot is a profile picture designed to help you stand out on Bumble, attract quality matches, and start real conversations.",
      },
      {
        question: "Why do Bumble headshots matter?",
        answer:
          "They're your first impression. Great photos get more right swipes, more matches, and more messages.",
      },
      {
        question: "What is an AI Bumble headshot?",
        answer:
          "It's a natural, high-quality Bumble photo created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip the awkward posing, outfit planning, and scheduling. You upload selfies, and the AI creates your headshots for you — with a variety of looks built in.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Anyone looking for love online — whether you're new to Bumble or just need better photos.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more flattering.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Upload 8–12 selfies → Headshot.AI automatically creates your headshots with different looks → you download your favorites.",
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
        question: "What kind of backgrounds and looks will I get?",
        answer:
          "You'll get a variety automatically — coffee shop vibes, golden hour sunsets, city streets, nature settings, clean studio shots, brick walls, and more. Plus different outfits from casual to smart casual.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for Bumble users?",
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
          "Higher packages give you more headshots (40, 100, or 150), more variety in looks and backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
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
        question: "Which dating apps can I use my headshots on?",
        answer:
          "All of them! Bumble, Tinder, Hinge, Coffee Meets Bagel, Happn, OkCupid, Match, or any other dating app. Plus social media and anywhere else you want great photos.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer: "Yes. You have full rights and can use your images anywhere.",
      },
      {
        question: "Is using AI headshots on Bumble acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Matches want to see the real you — our AI headshots deliver that.",
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

const bumbleSteps: StepData[] = [
  {
    number: 1,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/bumble/how-it-works/step-1/1.webp",
      "/assets/landing-page/bumble/how-it-works/step-1/2.webp",
      "/assets/landing-page/bumble/how-it-works/step-1/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Looks",
    description:
      "In under 15 minutes, our AI transforms your selfies into stunning Bumble headshots with different outfits, settings, and vibes — all designed to help you stand out and make real connections.",
    images: ["/assets/landing-page/bumble/how-it-works/step-2/1.webp"],
  },
  {
    number: 4,
    title: "Download Your Favorites",
    description:
      "Pick your best photos and download them for instant use on Bumble — or any other dating app.",
    images: [
      "/assets/landing-page/bumble/how-it-works/step-4/1.webp",
      "/assets/landing-page/bumble/how-it-works/step-4/2.webp",
      "/assets/landing-page/bumble/how-it-works/step-4/3.webp",
      "/assets/landing-page/bumble/how-it-works/step-4/4.webp",
      "/assets/landing-page/bumble/how-it-works/step-4/5.webp",
      "/assets/landing-page/bumble/how-it-works/step-4/6.webp",
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
  title: "#1 AI Bumble Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality Bumble headshots. Perfect for profiles that look natural and stand out. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: '/bumble-headshots',
});

export default function BumbleHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI BUMBLE HEADSHOT GENERATOR"
        title="Get Bumble Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality Bumble headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="bumble"
        trustedByText="Over 78,900 AI headshots generated for 900+ singles"
        trustedByTexthighlight={["78,900", "900+"]}
        usedByText="As seen in"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Bumble Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={bumbleSteps}
      />
      <ReviewsSection
        reviews={bumbleHeadshotsReviews}
        title="Trusted by 900+ Bumble Users"
        highlight="900+"
        subtitle="Read reviews from singles using our headshots to get more matches, better conversations, and real connections."
      />
      <BumbleBenefitsSection
        title="Attract up to 2× More Matches and Quality Conversations"
        highlight="2× More"
        description="Look warm, approachable, and authentic on your Bumble profile."
      />
      <GalleryReviewsSection
        category="bumble"
        title="Bumble Headshots"
        highlight="Bumble"
        subtitle="See how our AI turns your selfies into studio-quality Bumble headshots — in minutes."
        description="They look like a professional photographer took them-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={bumblePricing}
        title="Bumble Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality Bumble headshots — without the $500+ cost."
        highlight="90% Less"
      />
      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={bumbleFaqCategories}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="bumble"
        title="Your Studio-Quality Bumble Headshots Are Minutes Away"
        highlight="Bumble Headshots"
        ctaText="Get My Headshots Now"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
