import type { ImageFormat } from "@/data/image-formats";

interface WhenToConvertProps {
  input: ImageFormat;
  output: ImageFormat;
  items: Array<{ title: string; description: string }>;
}

export default function WhenToConvert({ input, output, items }: WhenToConvertProps) {
  return (
    <section className="bg-gray-50/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="font-mont mb-10 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          When Should You Convert {input.label} to {output.label}?
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                {/* <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50">
                  <Lightbulb className="h-5 w-5 text-gray-600" strokeWidth={1.8} />
                </div> */}
                <span className="font-mont text-base font-bold text-indigo-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-mont mb-2 text-lg font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="font-open text-sm leading-relaxed text-gray-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
