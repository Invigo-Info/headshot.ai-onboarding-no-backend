import { Upload, RefreshCw, Download } from "lucide-react";
import type { ImageFormat } from "@/data/image-formats";

interface HowToConvertProps {
  input?: ImageFormat;
  output?: ImageFormat;
}

export default function HowToConvert({ input, output }: HowToConvertProps) {
  const isGeneric = !input || !output;

  const steps = [
    {
      number: "1",
      icon: Upload,
      title: isGeneric ? "Choose Your Images" : `Choose ${input.label} Images`,
      description: isGeneric
        ? "Upload one or more images by dragging them into the converter or clicking to select files. Any combination of JPG, PNG, WebP, AVIF, GIF, or HEIC works."
        : `Upload one or more ${input.label} images by dragging them into the converter or clicking to select files.`,
    },
    {
      number: "2",
      icon: RefreshCw,
      title: "Pick Your Format",
      description: isGeneric
        ? "Select the output format you need. The converter auto-detects your input format and shows available options. No settings to configure — we use optimized defaults."
        : `Select ${output.label} as the output format. The converter auto-detects your input format. No settings to configure — we use optimized defaults.`,
    },
    {
      number: "3",
      icon: Download,
      title: isGeneric ? "Download Instantly" : `Download ${output.label} Images`,
      description: isGeneric
        ? "Your converted images are ready in seconds. Download files individually or grab everything as a ZIP. Your originals stay untouched on your device."
        : `Your converted ${output.label} images are ready in seconds. Download files individually or grab everything as a ZIP. Your originals stay untouched.`,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
      <h2 className="font-mont mb-12 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
        {isGeneric
          ? "How to Convert Images"
          : `How to Convert ${input.label} to ${output.label}`}
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center text-center">
            <div className="relative mb-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50">
                <step.icon className="h-7 w-7 text-gray-700" strokeWidth={1.6} />
              </div>
              <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {step.number}
              </span>
            </div>
            <h3 className="font-mont mb-2 text-base font-semibold text-gray-900">
              {step.title}
            </h3>
            <p className="font-open max-w-[260px] text-sm leading-relaxed text-gray-500">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
