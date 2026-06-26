import { cn } from "@/lib/utils";

const stats = [
  { value: "7.2M+", label: "AI headshots generated" },
  { value: "133K+", label: "Professionals served" },
  { value: "50+", label: "Countries worldwide" },
  { value: "4.9/5", label: "Verified average rating" },
  { value: "15 min", label: "Average delivery time" },
  { value: "2025", label: "Founded in San Francisco" },
];

/* In sm:grid-cols-3, indices 2 & 5 land in the 3rd column (light side on lg+) */
const LIGHT_COL = new Set([2, 5]);

export default function AboutMissionStatsSection() {
  return (
    <section>
      {/* ── Mission copy ── */}
      <div className="py-20 sm:py-28">
        <div className="mx-auto max-w-[90%]">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-sm">
            Our Mission
          </span>
          <h2 className="mt-4 font-mont text-3xl font-semibold leading-[1.15] tracking-tight text-pretty text-gray-900 sm:text-4xl lg:text-5xl">
            Professional Headshots for{" "}
            <span className="text-blue-500">Everyone</span>
          </h2>

          <div className="mt-10 grid max-w-xl grid-cols-1 gap-x-16 gap-y-8 lg:mt-14 lg:max-w-none lg:grid-cols-2">
            {/* Column 1 */}
            <div>
              <p className="text-lg leading-[1.75] text-gray-600 sm:text-xl/8">
                Your headshot matters. LinkedIn profiles with professional photos
                get{" "}
                <span className="font-semibold text-gray-900">
                  14x more views
                </span>
                . But professional headshots have always been expensive,
                time-consuming, and inconvenient.
              </p>
              <p className="mt-8 text-base/7 text-gray-600">
                And most AI tools? They don&apos;t look real. We believe a
                first-gen college student deserves the same professional image as
                a Fortune 500 CEO.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              {/* <p className="text-base/7 text-gray-600">
                That&apos;s why we built Headshot.AI&mdash;so anyone can look
                their best, no matter their budget, schedule, or location.
              </p> */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-7 py-6">
                <p className="text-[0.938rem] font-medium leading-relaxed text-blue-600 sm:text-base">
                  <strong>Our mission:</strong> Make professional headshots accessible to
                  everyone &mdash; regardless of budget, schedule, or location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats band ── */}
      {/* Below lg: solid navy | lg+: light gradient base with navy diagonal overlay */}
      <div className="relative isolate overflow-hidden bg-blue-950 lg:bg-gradient-to-b lg:from-blue-100 lg:to-blue-50 py-16 sm:py-20">
        {/* Navy diagonal panel — covers left 2/3 on lg+ for the split effect */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-y-0 right-[40%] -z-10 w-[200%] skew-x-[-30deg] bg-blue-950 shadow-xl shadow-blue-950/30 ring-1 ring-blue-900/20"
        />

        <div className="mx-auto max-w-[90%]">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
            {stats.map((stat, index) => {
              const onLight = LIGHT_COL.has(index);
              return (
                <div
                  key={stat.label}
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
                    {stat.label}
                  </dt>
                  <dd
                    className={cn(
                      "text-3xl font-semibold tracking-tight text-white sm:text-4xl",
                      onLight && "lg:text-gray-900"
                    )}
                  >
                    {stat.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
