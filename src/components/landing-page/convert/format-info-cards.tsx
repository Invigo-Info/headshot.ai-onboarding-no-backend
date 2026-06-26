import { FileType } from "lucide-react";
import type { ImageFormat } from "@/data/image-formats";

interface FormatInfoCardsProps {
  input: ImageFormat;
  output: ImageFormat;
}

function FormatCard({ format }: { format: ImageFormat }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50">
        <FileType className="h-5 w-5 text-gray-600" strokeWidth={1.8} />
      </div>
      <h3 className="font-mont mb-1 text-lg font-bold text-gray-900">
        What is a {format.label}?
      </h3>
      <p className="font-open mb-3 text-sm font-medium text-indigo-600">
        {format.fullName}
      </p>
      <p className="font-open text-sm leading-relaxed text-gray-500">
        {format.description}
      </p>
    </div>
  );
}

export default function FormatInfoCards({
  input,
  output,
}: FormatInfoCardsProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
      <h2 className="font-mont mb-10 text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        What Are These Formats?
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormatCard format={input} />
        <FormatCard format={output} />
      </div>
    </section>
  );
}
