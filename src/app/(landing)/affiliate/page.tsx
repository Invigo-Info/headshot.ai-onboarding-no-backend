import { createPageMetadata } from "@/lib/seo";
import AffiliateHeroSection from "@/components/landing-page/affiliate/affiliate-hero-section";
import AffiliateHowItWorksSection from "@/components/landing-page/affiliate/affiliate-how-it-works-section";
import AffiliateWhyJoinSection from "@/components/landing-page/affiliate/affiliate-why-join-section";
import AffiliatePerfectForSection from "@/components/landing-page/affiliate/affiliate-perfect-for-section";
import AffiliateCommissionSection from "@/components/landing-page/affiliate/affiliate-commission-section";
import { FAQSection } from "@/components/landing-page/faq-section";
import AffiliateCtaSection from "@/components/landing-page/affiliate/affiliate-cta-section";

const affiliateFaqs = [
  {
    category: "Joining the Affiliate Program",
    questions: [
      {
        question: "How do I join the affiliate program?",
        answer:
          'Click "Become an Affiliate" and fill out the application. We review applications within 1\u20132 business days.',
      },
      {
        question: "Is there a cost to join?",
        answer: "No. The program is completely free to join.",
      },
    ],
  },
  {
    category: "Payments & Payouts",
    questions: [
      {
        question: "How do I get paid?",
        answer:
          "Payouts are sent monthly via PayPal or Stripe, once you reach the $50 minimum threshold.",
      },
      {
        question: "When do I get paid?",
        answer:
          "Commissions are paid on the 15th of each month for the previous month\u2019s earnings.",
      },
      {
        question: "Do I earn on repeat customers?",
        answer:
          "You earn on the first purchase from each referred customer.",
      },
    ],
  },
  {
    category: "Tracking & Performance",
    questions: [
      {
        question: "How do I track my earnings?",
        answer:
          "Log into your affiliate dashboard to see clicks, conversions, and commissions in real time.",
      },
      {
        question: "What\u2019s the cookie duration?",
        answer:
          "60 days. If someone clicks your link and purchases within 60 days, you get the commission.",
      },
    ],
  },
  {
    category: "Promotion Guidelines",
    questions: [
      {
        question: "Can I promote on social media?",
        answer:
          "Yes. Share your link on any platform \u2014 YouTube, Instagram, TikTok, Twitter, LinkedIn, Facebook, or anywhere else.",
      },
      {
        question: "Can I use paid ads?",
        answer:
          'Yes, with some restrictions. You cannot bid on branded keywords like "Headshot.AI" or run ads that could be confused with official Headshot.AI advertising. Contact us if you have questions.',
      },
    ],
  },
  {
    category: "Support",
    questions: [
      {
        question: "What if I have questions?",
        answer:
          "Email us at affiliates@headshot.ai. We\u2019re happy to help.",
      },
    ],
  },
];

export const metadata = createPageMetadata({
  title: "Headshot.AI Affiliate Program | Earn Commissions",
  description:
    "Join the Headshot.AI affiliate program and earn commissions promoting the #1 AI headshot generator. Easy sign-up, high payouts. Apply now.",
  canonicalPath: "/affiliate",
});

export default function AffiliatePage() {
  return (
    <main className="flex flex-col">
      {/* ─────────────────── HERO ─────────────────── */}
      <AffiliateHeroSection />

      {/* ─────────────────── HOW IT WORKS ─────────────────── */}
      <AffiliateHowItWorksSection />

      {/* ─────────────────── WHY JOIN ─────────────────── */}
      <AffiliateWhyJoinSection />

      {/* ─────────────────── PERFECT FOR ─────────────────── */}
      <AffiliatePerfectForSection />

      {/* ─────────────────── COMMISSION ─────────────────── */}
      <AffiliateCommissionSection />

      {/* ─────────────────── FAQ ─────────────────── */}
      <FAQSection
        categories={affiliateFaqs}
        title="Your Questions, Answered"
        highlight="Answered"
        description="Everything you need to know about the Headshot.AI affiliate program 2014 from signing up to getting paid."
      />

      {/* ─────────────────── CTA ─────────────────── */}
      <AffiliateCtaSection />
    </main>
  );
}
