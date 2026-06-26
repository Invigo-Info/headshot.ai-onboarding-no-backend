import PricingSection from "@/components/landing-page/pricing-section";
import { CTASection } from "@/components/landing-page/cta-section";

import { createPageMetadata } from "@/lib/seo";
import { pricingData } from "@/data/one-time-pricing-details";
 
export const metadata = createPageMetadata({
  title: "Headshot.AI Pricing – Affordable Plans for Professional AI Headshots",
  description: "Discover Headshot.AI's affordable pricing plans. Create professional, studio-quality AI headshots instantly with flexible options for individuals - at a fraction of the cost and time.",
  canonicalPath: "/pricing",
});

export default function PricingPage() {
  return (
    <main className="flex flex-col pt-16">
      <PricingSection pricingDetails={pricingData.professional} />
      <CTASection />
    </main>
  );
}
