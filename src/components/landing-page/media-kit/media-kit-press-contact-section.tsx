import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MediaKitPressContactSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 py-24 sm:py-32 mt-10 sm:mt-16">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-16 -right-16 h-96 w-96 rounded-full bg-white/5 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-[90%]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-sm">
            Press Contact
          </span>
          <h2 className="mt-4 font-mont text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Get in <span className="text-white">Touch</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80 sm:text-xl/relaxed">
            For press inquiries, interviews, or media requests &mdash; we
            respond within 24 hours, often faster.
          </p>

          {/* Email */}
          <a
            href="mailto:support@headshot.ai"
            className="mt-8 inline-block text-2xl font-semibold text-white underline decoration-white/30 underline-offset-4 transition-all duration-200 hover:decoration-white sm:text-3xl"
          >
            support@headshot.ai
          </a>

          {/* Secondary CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-white hover:bg-blue-50 text-blue-600 font-semibold text-base sm:text-lg px-6 py-6 sm:py-7 shadow-lg shadow-blue-900/20 hover:shadow-xl"
              asChild
            >
              <Link href="/contact-us" className="flex items-center">
                Contact Us <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
