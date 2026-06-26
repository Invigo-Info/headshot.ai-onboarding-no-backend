import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FormatInfo {
  key: string;
  label: string;
  fullName: string;
  description: string;
  conversions: { label: string; slug: string }[];
}

const formats: FormatInfo[] = [
  {
    key: "jpg",
    label: "JPG (JPEG)",
    fullName: "Joint Photographic Experts Group",
    description:
      "The most common image format for photos and web images. JPG uses lossy compression to keep file sizes small while maintaining good visual quality. Works everywhere — every device, browser, app, and printer on the planet supports JPG. Best for photographs, social media images, and email attachments.",
    conversions: [
      { label: "JPG → PNG", slug: "jpg-to-png" },
      { label: "JPG → WebP", slug: "jpg-to-webp" },
      { label: "JPG → AVIF", slug: "jpg-to-avif" },
    ],
  },
  {
    key: "png",
    label: "PNG",
    fullName: "Portable Network Graphics",
    description:
      "The go-to format when quality and transparency matter. PNG uses lossless compression, meaning zero quality loss — every pixel stays exactly as it is. The tradeoff is larger file sizes compared to JPG. Best for logos, screenshots, icons, graphics with text, and anything that needs a transparent background.",
    conversions: [
      { label: "PNG → JPG", slug: "png-to-jpg" },
      { label: "PNG → WebP", slug: "png-to-webp" },
      { label: "PNG → AVIF", slug: "png-to-avif" },
    ],
  },
  {
    key: "webp",
    label: "WebP",
    fullName: "WebP (developed by Google)",
    description:
      "The modern web standard for images. WebP produces files 25-35% smaller than JPG and supports transparency like PNG — the best of both worlds. Over 97% of browsers support WebP. Best for website images, web apps, and anywhere page speed matters.",
    conversions: [
      { label: "WebP → JPG", slug: "webp-to-jpg" },
      { label: "WebP → PNG", slug: "webp-to-png" },
      { label: "WebP → AVIF", slug: "webp-to-avif" },
    ],
  },
  {
    key: "avif",
    label: "AVIF",
    fullName: "AV1 Image File Format",
    description:
      "The newest and most efficient image format available. AVIF files are up to 50% smaller than JPG and 20-30% smaller than WebP with no visible quality difference. Browser support is growing fast at ~93%. Best for high-performance websites and anyone who wants the smallest possible file sizes without sacrificing quality.",
    conversions: [
      { label: "AVIF → JPG", slug: "avif-to-jpg" },
      { label: "AVIF → PNG", slug: "avif-to-png" },
      { label: "AVIF → WebP", slug: "avif-to-webp" },
    ],
  },
  {
    key: "gif",
    label: "GIF",
    fullName: "Graphics Interchange Format",
    description:
      "The universal format for animations, memes, and simple graphics. GIF is limited to 256 colors per frame, so it's not ideal for photographs, but its animation support and absolute universal compatibility keep it relevant. Every device and platform made in the last 30 years supports GIF.",
    conversions: [
      { label: "GIF → JPG", slug: "gif-to-jpg" },
      { label: "GIF → PNG", slug: "gif-to-png" },
      { label: "GIF → WebP", slug: "gif-to-webp" },
    ],
  },
  {
    key: "heic",
    label: "HEIC",
    fullName: "High Efficiency Image Container",
    description:
      "Apple's default photo format on iPhones and iPads since 2017. HEIC files are roughly half the size of JPG with equal or better quality. The catch: limited support outside the Apple ecosystem. If you've ever tried to open an iPhone photo on Windows and couldn't, HEIC is why.",
    conversions: [
      { label: "HEIC → JPG", slug: "heic-to-jpg" },
      { label: "HEIC → PNG", slug: "heic-to-png" },
      { label: "HEIC → WebP", slug: "heic-to-webp" },
    ],
  },
];

export default function SupportedFormats() {
  return (
    <section className="bg-gray-50/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        {/* Header */}
        <h2 className="font-mont mb-3 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          6 Formats. 30 Conversions. One Tool.
        </h2>
        <p className="font-open mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-gray-500 sm:text-base">
          Every major image format — covered. Pick any combination below, or
          just drop your file and choose a format.
        </p>

        {/* Format cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {formats.map((format) => (
            <div
              key={format.key}
              className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-gray-200 hover:shadow-sm"
            >
              {/* Format badge + full name */}
              <div className="mb-3 flex items-end justify-between gap-3">
              
                <span className="font-open text-xs font-medium tracking-wide text-gray-400 uppercase">
                  {format.fullName}
                </span>
                  <span className="font-mont inline-flex items-center rounded bg-indigo-50 px-2 py-1 text-sm font-bold text-blue-500">
                  .{format.key}
                </span>
              </div>

              {/* Label */}
              <h3 className="font-mont mb-2 text-base font-semibold text-gray-900">
                {format.label}
              </h3>

              {/* Description */}
              <p className="font-open mb-4 text-sm leading-relaxed text-gray-500">
                {format.description}
              </p>

              {/* Popular conversions */}
              <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
                <span className="font-open mr-1 text-xs font-medium text-gray-400">
                  Popular:
                </span>
                {format.conversions.map((conv) => (
                  <Link
                    key={conv.slug}
                    href={`/convert/${conv.slug}`}
                    className="font-mont inline-flex items-center gap-1 rounded-md bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {conv.label}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
