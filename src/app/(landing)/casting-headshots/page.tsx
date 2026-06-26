// Core library and icon imports for the page.
import { Crown, Lock, Shield, Trash2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

// UI components for the casting headshots landing page.
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
import CastingBenefitsSection from "@/components/landing-page/casting-headshots/casting-benefits-section";
import { FAQSection } from "@/components/landing-page/faq-section";

// Static data and utility functions for the page content.
import { castingHeadshotsReviews } from "@/data/reviews";
import { castingPricing } from "@/data/one-time-pricing-details";
import { getLogosBySlug } from "@/data/trusted-logos";

const { logos } = getLogosBySlug("casting");
const keypoints = ["100% money-back", "Fully private & secure"];

// Custom steps data for Casting headshots - Updated content
const castingFaqCategories = [
  {
    category: "What Are AI Casting Headshots?",
    questions: [
      {
        question: "What is a casting headshot?",
        answer:
          "A casting headshot is a professional shoulders-up photo used for auditions, agent submissions, and casting platforms like Actors Access and Backstage.",
      },
      {
        question: "Why do casting headshots matter?",
        answer:
          "They're your first impression. A strong headshot gets you noticed, wins callbacks, and helps you book more auditions.",
      },
      {
        question: "What is an AI casting headshot?",
        answer:
          "It's a professional casting headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, styling, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Film actors, TV actors, theater performers, commercial actors, voice actors, models, and anyone who needs professional headshots for casting.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and genuine expressions.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper, more polished, and casting-ready.",
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
          "Yes. You can select one or more backgrounds: studio, dramatic, classic B&W studio, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for actors?",
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
        question: "Where can I use my casting headshots?",
        answer:
          "Actors Access, Backstage, Casting Networks, agent submissions, IMDb, Playbill, personal websites, self-tape thumbnails, business cards, and social media.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable for casting?",
        answer:
          "Yes, as long as the image accurately represents how you look. Casting directors want to see the real you — our AI headshots deliver that.",
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

const castingSteps: StepData[] = [
  {
    number: 1,
    title: "Choose Your Background",
    description:
      "Select one or more backgrounds: studio, dramatic, classic B&W studio, outdoor.",
    images: [
      "/assets/landing-page/casting/how-it-works/step-1/background/1.studio.webp",
      "/assets/landing-page/casting/how-it-works/step-1/background/2.dramatic.webp",
      "/assets/landing-page/casting/how-it-works/step-1/background/3.classic-b-and-w-studio.webp",
      "/assets/landing-page/casting/how-it-works/step-1/background/4.outdoor.webp",
    ],
    labels: ["Studio", "Dramatic", "Classic B&W Studio", "Outdoor"],
  },
  {
    number: 2,
    title: "Upload Your Casual Selfies",
    description:
      "Upload 8–12 chest-up selfies at eye level with good lighting and natural expressions. Use existing photos or take new ones. No need to worry about what you're wearing — everyday clothes are fine.",
    images: [
      "/assets/landing-page/casting/how-it-works/step-2/1.webp",
      "/assets/landing-page/casting/how-it-works/step-2/2.webp",
      "/assets/landing-page/casting/how-it-works/step-2/3.webp",
    ],
  },
  {
    number: 3,
    title: "Let Our AI Create Your Headshots",
    description:
      "In under 15 minutes, our AI turns your selfies into casting-ready headshots with natural looks and the backgrounds you've chosen.",
    images: ["/assets/landing-page/casting/how-it-works/step-3/1.webp"],
  },
  {
    number: 4,
    title: "Download Your Headshots",
    description:
      "Review your gallery of 150 casting headshots and download your favorites for instant use.",
    images: [
      "/assets/landing-page/casting/how-it-works/step-4/1.webp",
      "/assets/landing-page/casting/how-it-works/step-4/2.webp",
      "/assets/landing-page/casting/how-it-works/step-4/3.webp",
      "/assets/landing-page/casting/how-it-works/step-4/4.webp",
      "/assets/landing-page/casting/how-it-works/step-4/5.webp",
      "/assets/landing-page/casting/how-it-works/step-4/6.webp",
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
  title: "#1 AI Casting Headshot Generator | 15 Minutes",
  description:
    "Turn your selfies into studio quality casting headshots. Perfect for audition submissions and agency profiles. Rated 4.9/5 by thousands. Get yours now.",
  canonicalPath: '/casting-headshots',
});

export default function CastingHeadshotsPage() {
  return (
    <main className="flex flex-col space-y-24 sm:space-y-32 ">
      <HeroSection
        badgeText="#1 AI CASTING HEADSHOT GENERATOR"
        title="Get Professional Casting Headshots in 15 Minutes"
        highlight="15 Minutes"
        description="Turn your casual selfies into studio-quality casting headshots that look exactly like you. Over 90% less than studio prices."
        ctaText="Get My Headshots Now"
        logos={logos}
        keypoints={keypoints}
        category="casting"
        trustedByText="Over 175,200 AI headshots generated for 2,000+ actors"
        trustedByTexthighlight={["175,200", "2,000+"]}
        usedByText="Used by actors across the entertainment industry"
        showRating={true}
      />
      <HowItWorksSection
        mainTitle="Casual Selfies to Studio-Quality Casting Headshots"
        highlight="Selfies to Studio-Quality"
        subtitle="No photoshoot. No dressing up. Just four simple steps."
        steps={castingSteps}
      />
      <ReviewsSection
        reviews={castingHeadshotsReviews}
        title="Trusted by 2,000+ Performers"
        highlight="2,000+"
        subtitle="Read reviews from actors and performers using our headshots for casting calls, talent agencies, and audition submissions."
      />
      <CastingBenefitsSection
        title="Boost up to 3× More Callbacks and Casting Opportunities"
        highlight="3× More"
        description="Look camera-ready, versatile, and castable across casting platforms and talent profiles."
      />
      <GalleryReviewsSection
        category="casting"
        title="Casting Headshots"
        highlight="Casting"
        subtitle="See how our AI turns your selfies into studio-quality casting headshots — in minutes."
        description="They look like a professional photographer took them-but they're 100% AI-generated from your selfies."
      />
      <PricingSection
        pricingDetails={castingPricing}
        title="Casting Headshots — Over 90% Less Than Studio Prices"
        description="Get studio-quality casting headshots — without the $500+ cost."
        highlight="90% Less"
      />

      <DataSafetySection
        title="Private. Secure. In Your Control."
        highlight="Your Control"
        description="Your images are never shared or reused. You're always in control — delete them anytime."
        dataSafetyItems={dataSafetyItems}
      />
      <FAQSection
        categories={castingFaqCategories}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Learn how Headshot.AI works, delivery time, and pricing."
      />
      <CTASection
        category="casting"
        title="Your Studio-Quality Casting Headshots Are Minutes Away"
        highlight="Casting Headshots"
        ctaText="Get My Headshots Now"
      />

      {/* Floating CTA Button for mobile */}
      <FloatingCtaButton />
    </main>
  );
}
