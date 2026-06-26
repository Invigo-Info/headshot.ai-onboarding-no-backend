import ContactHeroSection from '@/components/landing-page/contact-us/contact-hero-section'
import ContactForm from '@/components/landing-page/contact-us/contact-form'
import ContactFAQs from '@/components/landing-page/contact-us/contact-faqs'
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Support | Headshot.AI",
  description: "Have questions about Headshot.AI? Our support team is here to help 7 days a week. Get help with payments, refunds, or any issues. Contact us now.",
  canonicalPath: "/contact-us",
});

const ContactPage = () => {
  return (
    <main className="flex flex-col">
        <ContactHeroSection />
        <ContactFAQs />
        <ContactForm />
    </main>
  )
}

export default ContactPage
