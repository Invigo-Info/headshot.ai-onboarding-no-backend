import { cn } from "@/lib/utils";

const facts = [
  { label: "Founded", value: "2025" },
  { label: "Headquarters", value: "San Francisco" },
  { label: "Headshots Generated", value: "7,200,000+" },
  { label: "Professionals Served", value: "133,000+" },
  { label: "Countries", value: "50+" },
  { label: "Average Rating", value: "4.9/5" },
];

/* On lg+ layout, indices 2 & 5 fall in the 3rd column (light side) */
const LIGHT_COL = new Set([2, 5]);

export default function MediaKitFactsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-blue-950 lg:bg-gradient-to-b lg:from-blue-100 lg:to-blue-50 py-16 sm:py-20">
      {/* Navy diagonal panel — covers left 2/3 on lg+ */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-y-0 right-[40%] -z-10 w-[200%] skew-x-[-30deg] bg-blue-950 shadow-xl shadow-blue-950/30 ring-1 ring-blue-900/20"
      />

      <div className="mx-auto max-w-[90%]">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
          {facts.map((fact, index) => {
            const onLight = LIGHT_COL.has(index);
            return (
              <div
                key={fact.label}
                className={cn(
                  "flex flex-col-reverse gap-y-2 border-l-2 pl-6",
                  onLight
                    ? "border-blue-400/30 lg:border-blue-500/50"
                    : "border-blue-400/30"
                )}
              >
                <dt
                  className={cn(
                    "text-sm text-blue-300/80",
                    onLight && "lg:text-gray-500"
                  )}
                >
                  {fact.label}
                </dt>
                <dd
                  className={cn(
                    "text-2xl font-semibold tracking-tight text-white sm:text-4xl",
                    onLight && "lg:text-gray-900"
                  )}
                >
                  {fact.value}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
