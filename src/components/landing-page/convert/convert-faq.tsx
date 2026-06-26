import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How fast is the conversion?",
    answer:
      "1-3 seconds for most images. The converter runs in your browser, so there's no upload delay and no server queue. You drop a file in and the converted version is ready almost instantly. Batch jobs take proportionally longer, but individual files are nearly instant.",
  },
  {
    question: "Is this really free?",
    answer:
      "Yes. No paid version, no premium tier, no trial that expires. You get unlimited conversions across all 30 format combinations with no ads and no watermarks. We originally built this for our AI headshot users and decided to open it up to everyone. There's nothing held back.",
  },
  {
    question: "Are my files safe?",
    answer:
      "Your files never leave your device. The conversion happens entirely in your browser using client-side processing (no server uploads), no cloud storage, no third-party access. We physically cannot see your images because they're never transmitted anywhere.",
  },
  {
    question: "What formats are supported?",
    answer:
      "Six formats with 30 possible conversion combinations: JPG, PNG, WebP, AVIF, GIF, and HEIC. You can convert between any two of these formats. Each combination has a dedicated converter page with format-specific details.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "Yes, a free account is required. Signing up takes about 30 seconds. The account gives you full access to all conversion tools with no limits on file count, formats, or daily usage. There's no paid upgrade — the free account is the only account type.",
  },
  {
    question: "Can I convert multiple files at once?",
    answer:
      "Yes. Upload as many files as you need and the batch converter processes them all simultaneously. Download files individually or grab everything as a single ZIP. There's no limit on how many files you can convert per session, per day, or per month.",
  },
  {
    question: "Does it work on my phone?",
    answer:
      "Yes. The converter runs in any modern web browser — Chrome, Safari, Firefox, Edge on any device. iPhone, Android, iPad, laptop, desktop. No app to install. Just open the page and convert.",
  },
  {
    question: "Will the conversion change my original file?",
    answer:
      "No. The converter creates a new file in the format you choose. Your original image stays completely untouched on your device. You're always working with a copy, never the original.",
  },
  {
    question: "Which format should I use?",
    answer:
      "It depends on what you need the image for. JPG is best for photos you want to share everywhere. PNG is best for graphics, logos, and anything needing transparency. WebP is best for website images (smaller than JPG, supports transparency). AVIF is best for maximum compression with no quality loss. GIF is best for animations and universal compatibility. HEIC is best for Apple device storage. Each format page above has detailed guidance.",
  },
  {
    question: "How is this different from other online converters?",
    answer:
      "Three things. First, your files never leave your device — most other converters upload your images to their servers. Second, it's genuinely free with no limits, no ads, no watermarks, and no premium upsell. Third, we support 30 format combinations across 6 formats including AVIF and HEIC, which many converters still don't offer.",
  },
];

export default function ConvertFAQ() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      {/* Header */}
      <h2 className="font-mont mb-3 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
        Frequently Asked Questions
      </h2>
      <p className="font-open mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-gray-500 sm:text-base">
        Everything you need to know about the image converter.
      </p>

      {/* Questions */}
      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="rounded-xl border border-gray-100 bg-white px-6 py-1 transition-all duration-200 data-[state=open]:border-gray-200 data-[state=open]:shadow-sm"
          >
            <AccordionTrigger className="group cursor-pointer py-4 text-left hover:no-underline [&>svg:last-child]:hidden">
              <span className="font-mont flex-1 pr-4 text-[15px] font-semibold text-gray-900">
                {faq.question}
              </span>
              <div className="shrink-0 text-gray-400">
                <Plus className="h-4.5 w-4.5 transition-all duration-300 group-data-[state=open]:rotate-45" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="font-open pb-5 text-sm leading-relaxed text-gray-500">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
