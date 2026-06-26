import {
  TrendingUp,
  Cookie,
  BarChart3,
  Zap,
  Megaphone,
  Headset,
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "High Commissions",
    description:
      "Earn 30% on every sale \u2014 one of the highest rates in the industry.",
  },
  {
    icon: Cookie,
    title: "60-Day Cookie Window",
    description:
      "Your referrals have 60 days to purchase. If they buy anytime within that window, you get credited.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description:
      "See clicks, conversions, and earnings instantly in your affiliate dashboard.",
  },
  {
    icon: Zap,
    title: "Fast Payouts",
    description: "Get paid monthly via PayPal or Stripe. No waiting around.",
  },
  {
    icon: Megaphone,
    title: "Marketing Resources",
    description:
      "Access banners, landing pages, email templates, and copy to help you convert.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description:
      "Questions? Our affiliate team is here to help you succeed.",
  },
];

export default function AffiliateWhyJoinSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[90%]">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {/* Left column — header */}
          <div className="col-span-2 space-y-5">
            <span className="block text-sm font-semibold uppercase tracking-wider text-gray-500 sm:text-base">
              Why Join
            </span>
            <h2 className="font-mont text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Built for Creators, Marketers, and{" "}
              <span className="text-blue-500">Pros</span>
            </h2>
            <p className="text-base leading-relaxed text-gray-600 sm:text-lg">Everything you need to start earning — competitive commissions, real-time analytics, and a dedicated team supporting your success.</p>
          </div>

          {/* Right column — benefits list */}
          <dl className="col-span-3 grid grid-cols-1 gap-x-10 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-14">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="relative pl-10">
                <dt className="font-semibold text-gray-900">
                  <benefit.icon
                    aria-hidden="true"
                    className="absolute left-0 top-0.5 size-5 text-blue-500"
                  />
                  {benefit.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {benefit.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
