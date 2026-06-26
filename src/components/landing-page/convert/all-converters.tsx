import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { POPULAR_FORMATS } from "@/data/image-formats";

export default function AllConverters() {
  const conversions = POPULAR_FORMATS.flatMap((input) =>
    POPULAR_FORMATS.filter((output) => output.key !== input.key).map(
      (output) => ({
        input,
        output,
        slug: `${input.key}-to-${output.key}`,
      })
    )
  );

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
      <h2 className="font-mont mb-3 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
        Popular Image Converters
      </h2>
      <p className="font-open mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-gray-500 sm:text-base">
        Choose from any of the popular format conversions below to get started.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {conversions.map(({ input, output, slug }) => (
          <Link
            key={slug}
            href={`/convert/${slug}`}
            className="group flex items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <span className="font-mont font-semibold">{input.label}</span>
            <ArrowRight className="h-3.5 w-3.5 text-gray-400 transition-colors group-hover:text-indigo-500" />
            <span className="font-mont font-semibold">{output.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
