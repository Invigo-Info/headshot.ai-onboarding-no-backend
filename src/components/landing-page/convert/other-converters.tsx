import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { POPULAR_FORMATS, type ImageFormat } from "@/data/image-formats";

interface OtherConvertersProps {
  currentInput: ImageFormat;
  currentOutput: ImageFormat;
}

export default function OtherConverters({
  currentInput,
  currentOutput,
}: OtherConvertersProps) {
  const otherFormats = POPULAR_FORMATS.filter(
    (f) => f.key !== currentInput.key && f.key !== currentOutput.key
  );

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
      <h2 className="font-mont mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
        Other {currentInput.label} Converters
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {otherFormats.map((format) => (
          <Link
            key={format.key}
            href={`/convert/${currentInput.key}-to-${format.key}`}
            className="group flex items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <span className="font-mont font-semibold">
              {currentInput.label}
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-gray-400 transition-colors group-hover:text-indigo-500" />
            <span className="font-mont font-semibold">{format.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
