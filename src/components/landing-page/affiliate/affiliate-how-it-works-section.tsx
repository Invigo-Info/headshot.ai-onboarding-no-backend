import { ClipboardCheck, Share2, BadgeDollarSign } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Apply & Get Approved",
    description:
      "Fill out a quick application. Once approved, you\u2019ll get access to your affiliate dashboard and unique referral link.",
  },
  {
    number: "02",
    icon: Share2,
    title: "Share Your Link",
    description:
      "Promote Headshot.AI on your website, blog, social media, YouTube, email list, or anywhere your audience hangs out.",
  },
  {
    number: "03",
    icon: BadgeDollarSign,
    title: "Earn Commissions",
    description:
      "When someone clicks your link and purchases, you earn 30% of the sale. Track everything in real time from your dashboard.",
  },
];

export default function AffiliateHowItWorksSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[90%]">
        {/* Header */}
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 sm:text-base">
            HOW IT WORKS
          </span>
          <h2 className="mt-4 font-mont text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Three Simple Steps to{" "}
            <span className="text-blue-500">Start Earning</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
          {/* Connecting line — desktop only */}
          <div className="absolute top-[72px] right-[calc(16.67%+32px)] left-[calc(16.67%+32px)] hidden h-px lg:block">
            <div className="h-full w-full border-t-2 border-dashed border-blue-200" />
          </div>

          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                {/* Number + Icon */}
                <div className="relative mx-auto h-36 w-36">
                  <span className="absolute -top-1 right-2 select-none font-mont text-8xl font-bold text-blue-50">
                    {step.number}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                      <step.icon className="size-7" strokeWidth={1.8} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="mt-2 font-mont text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-base/relaxed text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
