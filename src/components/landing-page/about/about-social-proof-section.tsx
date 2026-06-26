"use client";

import TrustedLogos from "@/components/landing-page/trusted-logos";
import { mainLandingLogos, ceoLogos } from "@/data/trusted-logos";

// Curated press/media logos from the CEO category
// const featuredInLogos = [
//   "15.Forbes.png",
//   "19.Bloomberg.png",
//   "21.Business-Insider.png",
//   "22.Inc.png",
//   "23.Fast Company.png",
//   "12.Product-Hunt.png",
//   "18.TED.png",
//   "17.Harvard-Business-Review-(HBR).png",
//   "20.Yahoo-Finance.png",
// ];

export default function AboutSocialProofSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-r from-gray-100/80 to-blue-50/60">
      <div className="max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 gap-16 text-center">
          {/* As Seen In */}
          <div className="space-y-6">
            <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block">
              As Seen In
            </span>
            <TrustedLogos logos={ceoLogos} category="ceo" />
          </div>

          {/* Trusted By Professionals */}
          <div className="space-y-6">
            <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block">
              Trusted by 133,000+ Professionals on
            </span>
            <TrustedLogos logos={mainLandingLogos} category="professional" />
          </div>
        </div>
      </div>
    </section>
  );
}
