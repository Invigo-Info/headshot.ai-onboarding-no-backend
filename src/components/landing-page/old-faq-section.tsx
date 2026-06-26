import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface OldFAQSectionProps {
  faqData: {
    question: string;
    answer: string | React.ReactNode;
  }[];
  title?: string;
  description?: string;
  highlight?: string;
}

export function OldFAQSection({
  faqData,
  title = defaultProps.title,
  description = defaultProps.description,
  highlight = defaultProps.highlight,
}: OldFAQSectionProps) {
  // Logic from original component to highlight specific text
  const lowerHighlight = highlight.toLowerCase();
  const parts = title.split(
    new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "i")
  );

  return (
    <section className="py-24 sm:px-4 w-full max-w-[90%] mx-auto" id="faq">
      <div className="mb-12">
        <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block mb-3">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
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
        <p className="text-lg text-gray-600 lg:max-w-[75%]">{description}</p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqData.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-b border-gray-200 px-0"
          >
            <AccordionTrigger className="group text-lg sm:text-lg font-medium cursor-pointer text-gray-900 [&>svg:last-child]:hidden py-5 hover:no-underline transition-all">
              <span className="text-left flex-1 mr-4">{faq.question}</span>
              <div className="shrink-0 text-gray-900">
                <Plus className="h-6 w-6 group-data-[state=open]:-rotate-45 transition-all duration-300" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pb-6 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

const defaultProps = {
  title: "Have a Question? We’re Here to Help",
  highlight: "Have a Question?",
  description:
    "Get answers to all your questions about AI Professional headshots - how they work, where to use them, and more. Still have questions? Our team is just a message away.",
};
