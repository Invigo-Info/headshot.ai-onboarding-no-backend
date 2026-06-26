import { ChevronDown, ExternalLink, Plus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { Faq } from "@/data/faqs";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

interface FAQSectionProps {
  /** Categorized FAQs — rendered as a nested accordion. */
  categories?: FAQCategory[];
  /** Flat FAQ list — rendered as a single-level accordion (no categories). */
  faqs?: FAQItem[];
  title?: string;
  description?: string;
  highlight?: string;
}

export function FAQSection({
  categories,
  faqs,
  title = defaultProps.title,
  description = defaultProps.description,
  highlight = defaultProps.highlight,
}: FAQSectionProps) {
  // Logic from original component to highlight specific text
  const lowerHighlight = highlight.toLowerCase();
  const parts = title.split(
    new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "i"),
  );

  return (
    <section className="sm:px-4 w-full max-w-[90%] mx-auto scroll-m-40" id="faq">
      <div className="mb-12 space-y-4">
        {/* <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block mb-3">
          FREQUENTLY ASKED QUESTIONS
        </span> */}

        {/* <Badge
          variant="outline"
          className="text-blue-600 border-blue-200 bg-blue-100 uppercase text-sm font-semibold px-4 py-1"
        >
          <Sparkle className="size-4 mr-2 fill-blue-500" /> FREQUENTLY ASKED
          QUESTIONS
        </Badge> */}

        <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block">
          FAQ
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont text-gray-900 leading-tight">
          {parts.map((part, index) => (
            <span key={index}>
              {part.toLowerCase() === lowerHighlight ? (
                <span className="text-blue-500">{part}</span>
              ) : (
                part
              )}
            </span>
          ))}
        </h2>
        <p className="text-gray-600 text-base xs:text-lg sm:text-xl lg:max-w-[75%] xl:max-w-full">
          {description}
        </p>
      </div>

      {faqs ? (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border border-gray-100 rounded-xl bg-gray-50/50 px-6"
            >
              <AccordionTrigger className="group text-base sm:text-lg font-medium cursor-pointer text-gray-900 [&>svg:last-child]:hidden py-5 hover:no-underline transition-all text-left">
                <span className="flex-1 mr-4">{faq.question}</span>
                <div className="shrink-0 text-gray-400">
                  <ChevronDown className="h-5 w-5 group-data-[state=open]:rotate-180 transition-all duration-300" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-600 pb-5 leading-relaxed whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Accordion type="multiple" className="w-full space-y-6">
          {categories?.map((category, catIndex) => (
            <AccordionItem
              key={catIndex}
              value={`category-${catIndex}`}
              className="border border-gray-100 rounded-xl bg-gray-50/50 px-6 py-2"
            >
              <AccordionTrigger className="text-xl font-semibold leading-7 text-gray-900 hover:no-underline py-0 cursor-pointer">
                {category.category}
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-2"
                >
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${catIndex}-${index}`}
                      className="border-b border-gray-200/60 last:border-0 px-0"
                    >
                      <AccordionTrigger className="group text-base sm:text-lg font-medium cursor-pointer text-gray-800 [&>svg:last-child]:hidden py-4 hover:no-underline transition-all text-left">
                        <span className="flex-1 mr-4">{faq.question}</span>
                        <div className="shrink-0 text-gray-400">
                          <Plus className="h-5 w-5 group-data-[state=open]:-rotate-45 transition-all duration-300" />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-gray-600 pb-4 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Contact Us Link */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100 pt-8">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-semibold text-gray-900">Still Have Questions?</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Our team is here to help 7 days a week — you can contact us anytime.
          </p>
        </div>
        <Button
          variant="default"
          className="rounded-full shrink-0 px-8"
          asChild
        >
          <Link href="/contact-us" className="flex items-center gap-2">
            Contact us
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

const defaultProps = {
  title: "Have a Question? We’re Here to Help",
  highlight: "Have a Question?",
  description:
    "Get answers to all your questions about AI Professional headshots - how they work, where to use them, and more. Still have questions? Our team is just a message away.",
};
