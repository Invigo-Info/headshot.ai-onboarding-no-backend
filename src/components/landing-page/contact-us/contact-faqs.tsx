import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    title: "1. Account & Login Help",
    value: "account-login",
    questions: [
      {
        question: "Can I change the email associated with my account?",
        answer: (
          <>
            Currently, accounts are tied to the email address you used during checkout. If you need to update or correct your email, please contact us at <a className="underline" href="mailto:support@headshot.ai">support@headshot.ai</a> and our team will help you.
          </>
        ),
        value: "change-email",
      },
      {
        question: "How can I access my previously generated photos?",
        answer: (
          <>
            Log in to your account and visit your Dashboard. All your generated photos and AI headshots will be available for download till 30 days after generation.
          </>
        ),
        value: "access-photos",
      },
    ],
  },
  {
    title: "2. Order & Payment Issues",
    value: "order-payment",
    questions: [
      {
        question: "How does payment work on Headshot.AI?",
        answer: (
          <>
            Headshot.AI operates on a simple one-time payment model — no subscriptions, no recurring charges. You choose your preferred package (Starter, Basic or premium) and pay only once per order.
          </>
        ),
        value: "how-payment-works",
      },
      {
        question: "What payment methods do you accept?",
        answer: (
          <>
            We securely process all payments through Stripe, a leading global payment platform.
          </>
        ),
        value: "payment-methods",
      },
      {
        question: "How do I request a refund?",
        answer: (
          <>
            If you&apos;re not satisfied with your results, please contact <a className="underline" href="mailto:support@headshot.ai">support@headshot.ai</a> within 7 days of your order. Include your order number and a short note about your experience. Our team will review your case and issue a refund if eligible according to our Refund Policy.
          </>
        ),
        value: "refund-request",
      },
    ],
  },
  {
    title: "3. Photo Upload & Quality",
    value: "photo-upload-quality",
    questions: [
      {
        question: "What kind of photos should I upload for the best AI headshots?",
        answer: (
          <>
            Upload 6–12 clear selfies showing your face from different angles and expressions.
            <div className="mt-2 space-y-1">
              <div>✅ Use: natural light, simple backgrounds, and neutral expressions.</div>
              <div>🚫 Avoid: blurry photos, filters, hats, sunglasses, or dark lighting.</div>
            </div>
          </>
        ),
        value: "what-to-upload",
      },
      {
        question: "Can I upload group photos or cropped images?",
        answer: (
          <>
            It&apos;s best to upload solo photos where your face is clearly visible. Our AI can process images with backgrounds, but crowded or low-quality photos can affect the final result.
          </>
        ),
        value: "group-photos",
      },
      {
        question: "My AI results didn't match my look — what should I do?",
        answer: (
          <>
            The quality of your final results depends heavily on your uploaded images. Try uploading photos with consistent lighting and clearer visibility. You can also reach out to support if you&apos;d like a reprocess review.
          </>
        ),
        value: "results-mismatch",
      },
    ],
  },
  {
    title: "4. AI Editor & Enhancements",
    value: "ai-editor",
    questions: [
      {
        question: "What tools are available in the AI Editor?",
        answer: (
          <>
            Our AI Editor includes Background Changer, Magic Eraser, Image Upscaler, Color Correction, Face Restorer, Text Remover, Blemish Remover, and more. Each tool helps enhance your headshots professionally.
          </>
        ),
        value: "editor-tools",
      },
      {
        question: "How do I use the AI Editor tools?",
        answer: (
          <>
            After generating your headshots, go to your Dashboard and click on any image to open the editor. Select the tool you need from the toolbar and follow the on-screen instructions.
          </>
        ),
        value: "how-to-use-editor",
      },
    ],
  },
  {
    title: "5. Licensing & Usage Rights",
    value: "licensing-usage",
    questions: [
      {
        question: "Do I own the rights to my AI-generated photos?",
        answer: (
          <>
            Yes. Once generated, your images are 100% yours. You can use them freely for professional and personal purposes — including LinkedIn, company websites, resumes, and marketing materials.
          </>
        ),
        value: "own-rights",
      },
      {
        question: "Can Headshot.AI use my photos for marketing or training?",
        answer: (
          <>
            Only if you explicitly give consent. We respect your privacy and never use or share your images without permission.
          </>
        ),
        value: "marketing-consent",
      },
      {
        question: "How is my data protected?",
        answer: (
          <>
            All uploads and generated images are securely stored with industry-standard encryption. You can delete your data anytime from your account. Learn more in our Privacy Policy.
          </>
        ),
        value: "data-protection",
      },
    ],
  },
]

export default function ContactFAQs() {
  return (
    <div className="relative isolate bg-white" id="faqs">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} className="fill-white" />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
              </svg>
              <div
                aria-hidden="true"
                className="absolute top-[calc(100%-13rem)] -left-56 hidden transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))]"
              >
                <div
                  style={{
                    clipPath:
                      'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                  }}
                  className="aspect-1155/678 w-288.75 bg-linear-to-br from-[#80caff] to-[#4f46e5] opacity-10"
                />
              </div>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base text-gray-600">
              Before you reach out, you might find what you need below:
            </p>
            <ul className="mt-6 list-disc space-y-3 pl-6 text-gray-700">
              <li>
                <span className="font-medium">Account & Login Help</span> — manage subscriptions, or update your profile details.
              </li>
              <li>
                <span className="font-medium">Order & Payment Issues</span> — Learn how billing works, apply promo codes, or request refunds.
              </li>
              <li>
                <span className="font-medium">Photo Upload & Quality</span> — Best practices for photo uploads to ensure the best AI headshots.
              </li>
              <li>
                <span className="font-medium">AI Editor & Enhancements</span> — Learn how to use tools like Background Changer, Magic Eraser, and Image Upscaler.
              </li>
              <li>
                <span className="font-medium">Licensing & Usage Rights</span> — Understand how you can use your generated headshots professionally.
              </li>
            </ul>
          </div>
        </div>
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <Accordion type="single" className="w-full">
              {faqData.map((category) => (
                <AccordionItem key={category.value} value={category.value}>
                <AccordionTrigger className="text-left">
                    {category.title}
                </AccordionTrigger>
                <AccordionContent>
                  <Accordion type="single" collapsible>
                      {category.questions.map((faq) => (
                        <AccordionItem key={faq.value} className="ml-4" value={faq.value}>
                      <AccordionTrigger className="text-left">
                            Q: {faq.question}
                      </AccordionTrigger>
                          <AccordionContent>
                            {faq.answer}
                          </AccordionContent>
                    </AccordionItem>
                      ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
