import Link from "next/link";
import { ArrowRight, Heart, Shield, Infinity, Sparkles } from "lucide-react";

const blocks = [
  {
    icon: Heart,
    title: "We built this for our users, then opened it to everyone.",
    description:
      "Headshot.AI started as an AI headshot platform. Our users kept running into the same problem: they needed to convert, resize, or reformat photos before or after their headshot sessions. So we built the image converter for them. Then we thought — why not just make it available to everyone? Good tools shouldn't sit behind a login gate collecting dust. So here it is, completely free, for anyone who needs it.",
  },
  {
    icon: Shield,
    title: "You deserve tools that actually respect you.",
    description:
      'Most "free" converters are built to frustrate you. They slap watermarks on your photos. They limit you to 3 conversions a day. They force you to watch ads before every download. They upload your personal photos to their servers without telling you. We built this converter the way we\'d want to use it ourselves — fast, private, unlimited, and with zero interruptions. Your photos stay on your device. No one sees them but you.',
  },
  {
    icon: Infinity,
    title: "Unlimited means unlimited.",
    description:
      'Convert 5 images or 5,000 its free. Every format, every combination, batch processing, ZIP downloads. No daily caps. No monthly limits. No feature walls. No "upgrade to Pro" pop-ups. The tool you\'re using right now is the full tool. There\'s nothing being held back.',
  },
  {
    icon: Sparkles,
    title: "Part of a complete image toolkit.",
    description:
      "The converter is just one piece of what we offer. If you ever need professional AI-generated headshots for LinkedIn, your company website, a portfolio, or a team page — Headshot.AI can turn a regular photo into a studio-quality headshot in minutes. Thousands of professionals already use it. The image converter and AI headshots work hand in hand: convert your formats here, create stunning headshots there. One platform, everything you need for your images.",
  },
];

export default function FreeForever() {
  return (
    <section className="bg-gray-50/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-mont mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
            Free Forever. No Catch.
          </h2>
          <p className="font-open text-base text-gray-500 sm:text-lg">
            We built this for you — and we mean that.
          </p>
        </div>

        {/* Content blocks */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-gray-200 hover:shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
                <block.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h3 className="font-mont mb-3 text-[15px] font-semibold leading-snug text-gray-900">
                {block.title}
              </h3>
              <p className="font-open text-sm leading-relaxed text-gray-500">
                {block.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA link */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="font-mont group inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
          >
            Explore AI Headshots
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
