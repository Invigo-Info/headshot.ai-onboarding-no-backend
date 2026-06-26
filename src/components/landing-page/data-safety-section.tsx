import { Calendar, Globe, Lock, ShieldCheck } from "lucide-react";

const featureItems = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Delete when you want (or we do it for you)",
    description:
      "You can delete your data including your input images and created headshots at any time. We delete your data automatically 30 days after the headshots have been created.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Your images for your headshots only",
    description:
      "We train an individual AI for each individual photoshoot. Those images are not used for any other purpose or training. Your likeness is your property, not ours.",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Caring by not sharing",
    description:
      "We do not share your images with anybody or anything. We do not sell your data. We do not advertise you. You are of course free to share your headshots as you see fit.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Rock-solid security",
    description:
      "Access to all headshots is controlled by a password-less system, all data is encrypted in transit and stored only for the period required.",
  },
];

export interface DataSafetyItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface DataSafetySectionProps {
  label?: string;
  title?: string;
  highlight?: string;
  description?: string;
  dataSafetyItems?: DataSafetyItem[];
}

export default function DataSafetySection({
  label = "Privacy",
  title = "Your data is yours, and yours only",
  highlight = "Your data is yours,",
  description = "Throughout your journey on Invigo, your data is secure, in your control.",
  dataSafetyItems = featureItems,
}: DataSafetySectionProps) {
  return (
    <section
      className="px-4 max-w-full w-full sm:max-w-[90%] mx-auto scroll-m-40"
      id="privacy"
    >
      <div className="flex flex-col items-start text-left mb-12 space-y-4">
        {/* <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">
          PRIVACY
        </span> */}

        {/* <Badge
          variant="outline"
          className="text-blue-600 border-blue-200 bg-blue-100 uppercase text-sm font-semibold px-4 py-1"
        >
          <Sparkle className="size-4 mr-2 fill-blue-500" /> Privacy
        </Badge> */}
        <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block">
          {label}
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont text-gray-900 leading-tight">
          {(() => {
            const parts = title.split(highlight);
            return (
              <>
                {parts[0]}
                <span className="text-blue-500">{highlight}</span>
                {parts[1]}
              </>
            );
          })()}
        </h2>
        <p className="text-gray-600 text-base xs:text-lg sm:text-xl">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
        {dataSafetyItems.map((item) => (
          <div
            key={item.title}
            className="group flex flex-col items-start p-4 sm:p-8 rounded-xl border border-gray-300 bg-white hover:border-blue-500 transition-colors duration-300"
          >
            <div className="mb-5">
              {/* Logo-style icon badge for each privacy point */}
              <div className="inline-flex size-10 sm:size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                {item.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold leading-7 text-gray-900 mb-3">
              {item.title}
            </h3>
            <p className="text-base leading-7 text-gray-600 whitespace-pre-line">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
