import {
  Image as ImageIcon,
  Camera,
  Monitor,
  Palette,
  Download,
  Package,
} from "lucide-react";
import Link from "next/link";

const downloads = [
  {
    icon: Package,
    title: "Full Media Kit",
    description: "Complete .zip with all assets below",
    format: "ZIP",
    href: "#",
  },
  {
    icon: ImageIcon,
    title: "Logo Pack",
    description: "PNG, SVG, EPS in light & dark versions",
    format: "ZIP",
    href: "#",
  },
  {
    icon: Camera,
    title: "Sample Headshots",
    description: "AI-generated examples for editorial use",
    format: "ZIP",
    href: "#",
  },
  {
    icon: Monitor,
    title: "Product Screenshots",
    description: "Homepage, editor, and results gallery",
    format: "ZIP",
    href: "#",
  },
  {
    icon: Palette,
    title: "Brand Guidelines",
    description: "Colors, typography, and usage rules",
    format: "PDF",
    href: "#",
  },
];

export default function MediaKitDownloadsSection() {
  return (
    <section id="downloads" className="py-20 sm:py-28 bg-gray-50/60">
      <div className="mx-auto max-w-[90%]">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-sm">
            Brand Assets
          </span>
          <h2 className="mt-4 font-mont text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            <span className="text-blue-500">Download</span> Assets
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-gray-600 sm:text-lg">
            Grab our logos, screenshots, and brand guidelines. All assets are
            free for editorial use.
          </p>
        </div>

        {/* Downloads grid */}
        <div className="mx-auto mt-14 max-w-3xl space-y-4 sm:mt-16">
          {downloads.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-100 sm:p-6"
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500 transition-colors duration-300 group-hover:bg-blue-500 group-hover:text-white sm:size-12">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-gray-400 transition-colors duration-300 group-hover:text-blue-500">
                <span className="hidden sm:inline">{item.format}</span>
                <Download className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
