import { DynamicIcon, type IconName } from "lucide-react/dynamic";

interface FeaturesGridProps {
  benefits?: Array<{ title: string; description: string; icon: string }>;
}

function toKebabCase(name: string): IconName {
  return name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase() as IconName;
}

export default function FeaturesGrid({ benefits }: FeaturesGridProps) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
      <h2 className="font-mont mb-10 text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Why Choose Our Tool?
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-gray-200 hover:shadow-sm"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
              <DynamicIcon
                name={toKebabCase(benefit.icon)}
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            </div>
            <h3 className="font-mont mb-1.5 text-[15px] font-semibold text-gray-900">
              {benefit.title}
            </h3>
            <p className="font-open text-sm leading-relaxed text-gray-500">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
