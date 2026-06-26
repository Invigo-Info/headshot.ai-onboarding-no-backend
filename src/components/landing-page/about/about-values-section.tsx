import {
  Eye,
  Target,
  Zap,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Realistic Quality",
    description:
      'If it looks "AI-generated," we haven\'t done our job. Natural expressions, realistic lighting, details that make you look like you  \u2014  just more polished.',
  },
  {
    icon: Target,
    title: "Tailored Results",
    description:
      "Attire, backgrounds, and lighting designed for your industry  \u2014  whether you're a lawyer, doctor, realtor, or executive.",
  },
  {
    icon: Zap,
    title: "Simplicity",
    description:
      "Upload selfies. Pick your look. Get headshots in 15 minutes. No learning curve. No complicated steps.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description:
      "Your images are never sold, shared, or used to train AI. Delete anytime.",
  },
  {
    icon: BadgeCheck,
    title: "Honest Guarantee",
    description:
      "Not happy? We rerun your headshots or refund you. No questions. No fine print.",
  },
];

export default function AboutValuesSection() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50/60">
      <div className="max-w-[90%] mx-auto">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="col-span-2 space-y-5">
            <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont tracking-tight text-gray-900 leading-tight">
              Built on <span className="text-blue-500">Values</span> That
              Matter
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Every decision we make is guided by these principles — from the
              technology we build to the way we treat your data.
            </p>
          </div>

          <dl className="col-span-3 grid grid-cols-1 gap-x-10 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-14">
            {values.map((value) => (
              <div key={value.title} className="relative pl-10">
                <dt className="font-semibold text-gray-900">
                  <value.icon
                    aria-hidden="true"
                    className="absolute top-0.5 left-0 size-5 text-blue-500"
                  />
                  {value.title}
                </dt>
                <dd className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {value.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
