import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const keypoints = [
  "30% commission per sale",
  "60-day cookie window",
  "Payouts via PayPal or Stripe",
];

export default function AffiliateHeroSection() {


  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/30 to-white py-24 sm:py-32 lg:py-40">
      {/* Decorative blurred background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-blue-50/70 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[90%]">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
         
            <Badge className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-500 shadow-sm ring-1 ring-blue-100 sm:text-sm">
              💙 #1 AI HEADSHOT GENERATOR
            </Badge>

          {/* Headline */}
          <h1
            className={`mt-8 font-mont text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl/tight transition-all duration-700 delay-100 ease-out`}
          >
            <span className="text-blue-500">Earn Money</span> Promoting AI
            Headshots
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-6 text-lg text-gray-600 sm:text-xl/relaxed transition-all duration-700 delay-200 ease-out`}
          >
            Join our affiliate program and earn commissions every time someone
            you refer gets their headshots.
          </p>

          {/* Keypoints */}
          <div
            className={`mt-10 flex flex-wrap justify-center gap-3 transition-all duration-700 delay-300 ease-out`}
          >
            {/* {keypoints.map((point) => (
              <span
                key={point}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-100"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-blue-500">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
                {point}
              </span>
            ))} */}

                    <div className="flex flex-col items-center justify-center overflow-x-scroll lg:overflow-x-hidden no-scrollbar w-full">
              <div className="flex w-fit justify-start lg:justify-center items-center gap-4 mx-auto lg:flex-wrap">
                {keypoints.map((point, index) => (
                  <div
                    key={index}
                    className="whitespace-nowrap flex items-center gap-2"
                  >
                    <Check className="size-4 text-green-600" />
                    <span className="font-medium text-gray-700 text-sm md:text-base">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div
            className={`mt-12 transition-all duration-700 delay-[400ms] ease-out`}
          >
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg sm:text-xl px-6 py-6 sm:py-8 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
              asChild
            >
              <Link href="/contact-us" className="flex items-center">
                Become an Affiliate{" "}
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
