import { ArrowRightLeft, Images } from "lucide-react";
import type { ImageFormat } from "@/data/image-formats";

interface CTASectionProps {
  input?: ImageFormat;
  output?: ImageFormat;
  description?: string;
}

export default function CTASection({ input, output, description }: CTASectionProps) {
  const isGeneric = !input || !output;

  return (
    <section className="bg-gray-50/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:flex-row lg:gap-16">
        {/* Illustration */}
        <div className="flex w-full shrink-0 items-center justify-center lg:w-[340px]">
          <div className="relative flex h-56 w-full max-w-[340px] items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white">
            <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-indigo-50" />
            <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-indigo-50/70" />
            {isGeneric ? (
              <div className="relative flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Images className="h-7 w-7" strokeWidth={1.6} />
                </div>
                <ArrowRightLeft className="h-5 w-5 text-gray-400" />
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Images className="h-7 w-7" strokeWidth={1.6} />
                </div>
              </div>
            ) : (
              <div className="relative flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <span className="font-mont text-sm font-bold">
                    .{input.key}
                  </span>
                </div>
                <ArrowRightLeft className="h-5 w-5 text-gray-400" />
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <span className="font-mont text-sm font-bold">
                    .{output.key}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Text */}
        <div className="text-center lg:text-left">
          <h2 className="font-mont mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            {isGeneric
              ? "Free Online Image Converter"
              : `Free ${input.label} to ${output.label} Online Converter`}
          </h2>
          <p className="font-open max-w-xl text-base leading-relaxed text-gray-500">
            {isGeneric
              ? "Convert any image format online instantly and effortlessly. No need for any installation or plugins. Simply upload your files and download the converted images in seconds. Our converter handles all the heavy lifting so you can focus on what matters."
              : description
                ? description
                : `Convert ${input.label} to ${output.label} online instantly and effortlessly. No need for any installation or plugins for the ${input.label} to ${output.label} conversion process. Simply upload your ${input.label} files and download the converted ${output.label} images in seconds. Our converter handles all the heavy lifting so you can focus on what matters.`}
          </p>
        </div>
      </div>
    </section>
  );
}
