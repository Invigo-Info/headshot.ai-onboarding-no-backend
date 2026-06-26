import Image from "next/image";
import { cn } from "@/lib/utils";

const audience = [
  {
    title: "Content Creators",
    description: "YouTubers, TikTokers, Instagram influencers",
    image: "/assets/affiliate-page/Content Creator.webp",
  },
  {
    title: "Bloggers & Writers",
    description: "Career, photography, business, and tech niches",
    image: "/assets/affiliate-page/Bloggers & Writers.webp",
  },
  {
    title: "Career Coaches",
    description: "Help clients look professional online",
    image: "/assets/affiliate-page/Career Coaches.webp",
  },
  {
    title: "Photographers",
    description: "Offer an AI alternative to your audience",
    image: "/assets/affiliate-page/Photographers.webp",
  },
  {
    title: "LinkedIn Experts",
    description: "Help professionals upgrade their profiles",
    image: "/assets/affiliate-page/LinkedIn Experts.webp",
  },
  {
    title: "Recruiters & HR Pros",
    description: "Share with job seekers and candidates",
    image: "/assets/affiliate-page/Recruiters & HR Pros.webp",
  },
  {
    title: "Web Designers",
    description: "Recommend to clients who need headshots",
    image: "/assets/affiliate-page/Web Designers.webp",
  },
  {
    title: "Marketing Agencies",
    description: "Add to your service stack",
    image: "/assets/affiliate-page/Marketing Agencies.webp",
  },
];

const PlusDecorator = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn(
      "absolute z-10 size-3",
      "before:absolute before:inset-0 before:m-auto before:h-px before:bg-gray-300",
      "after:absolute after:inset-0 after:m-auto after:w-px after:bg-gray-300",
      className
    )}
  />
);

export default function AffiliatePerfectForSection() {
  return (
    <section className="bg-gray-50/70 py-20 sm:py-28">
      <div className="mx-auto max-w-[90%]">
        {/* Header */}
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 sm:text-base">
            WHO IT&apos;S FOR
          </span>
          <h2 className="mt-4 font-mont text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            <span className="text-blue-500">Perfect</span> For
          </h2>
        </div>

        {/* Bento grid */}
        <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20">
          {/* Corner plus decorators */}
          <PlusDecorator className="-translate-x-[calc(50%-0.5px)] -translate-y-[calc(50%-0.5px)]" />
          <PlusDecorator className="right-0 -translate-y-[calc(50%-0.5px)] translate-x-[calc(50%-0.5px)]" />
          <PlusDecorator className="bottom-0 -translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]" />
          <PlusDecorator className="bottom-0 right-0 translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]" />

          <div className="overflow-hidden rounded-2xl border border-gray-200/70">
            <div className="grid grid-cols-1 gap-px bg-gray-200/70 sm:grid-cols-2 lg:grid-cols-4">
              {audience.map((item) => (
                <div
                  key={item.title}
                  className="group bg-white transition-colors duration-300 hover:bg-gray-50/80"
                >
                  <div className="space-y-4 p-5 sm:p-6">
                    {/* Headshot image */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={`${item.title} headshot example`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                      />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="font-mont text-sm font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
