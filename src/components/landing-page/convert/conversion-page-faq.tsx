import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ImageFormat } from "@/data/image-formats";

interface ConversionPageFAQProps {
  input: ImageFormat;
  output: ImageFormat;
  faqs: Array<{ question: string; answer: string }>;
}

export default function ConversionPageFAQ({
  input,
  output,
  faqs,
}: ConversionPageFAQProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 md:py-24 ">
      <h2 className="font-mont mb-3 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
        FAQ
      </h2>
      <p className="font-open mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-gray-500 sm:text-base">
        Common questions about converting {input.label} to {output.label}.
      </p>

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
