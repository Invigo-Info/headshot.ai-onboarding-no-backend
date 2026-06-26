import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AffiliateCtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 py-24 sm:py-32 mt-24 sm:mt-32">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-16 -right-16 h-96 w-96 rounded-full bg-white/5 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-[90%] text-center">
        <h2 className="font-mont text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to <span className="text-white">Start Earning</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/80 sm:text-xl/relaxed">
          Join thousands of affiliates earning commissions with Headshot.AI.
        </p>
        <div className="mt-10">
          <Button
            size="lg"
            className="bg-white hover:bg-blue-50 text-blue-600 font-semibold text-lg sm:text-xl px-6 py-6 sm:py-8 shadow-lg shadow-blue-900/20 hover:shadow-xl"
            asChild
          >
            <Link href="/contact-us" className="flex items-center">
              Become an Affiliate{" "}
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
