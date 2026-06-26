import EditorFeaturesSection from "@/components/landing-page/editor-features";
import { OldFAQSection } from "@/components/landing-page/old-faq-section";
import EditorPageHeroSection from "@/components/landing-page/photo-editor/editor-page-hero-section";
import EditorPageHowItWorks from "@/components/landing-page/photo-editor/editor-page-how-it-works";
import EditorPageWhyChoose from "@/components/landing-page/photo-editor/editor-page-why-choose";
import EditorPageUseCasesWithImages from "@/components/landing-page/photo-editor/editor-page-use-cases-with-images";
import { photoRestorationFaqs } from "@/data/faqs";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: 'AI Photo Restoration – Repair, Enhance & Colorize Old Photos Instantly',
  description: 'Restore old, faded, or damaged photos in seconds with AI Photo Restoration. Fix scratches, sharpen details, and add natural color to black-and-white images - no editing skills required.',
  canonicalPath: '/photo-editor/photo-restoration',
})

const logos = [
"1.Instagram.png",
"2.TikTok.png",
"3.Youtube.png",
"4.Facebook.png",
"5.Pinterest.png",
"6.Shutterfly.png",
"7.Snapfish.png",
"8.Printify.png",
"9.Photobucket.png",
"10.Mixbook.png",
"11.Vistaprint.png",
"12.Zazzle.png",
"13.Blurb.png",
"14.Chatbooks.png",
"15.Mpix.png",
"16.X-Twitter.png",
"17.Etsy.png",
"18.Shopify.png",
"19.Amazon.png"
  ]

export default function PhotoRestorationLandingPage() {
  return (
    <main className="flex flex-col">
      <EditorPageHeroSection
        title="AI Photo Restoration - Bring Old Memories Back to Life"
        description="Turn back time with our AI-powered photo restoration. Revive faded, scratched, or torn photos, restore original details, and even add natural color to black and white memories - all in one click."
        imageOne="/assets/editor-page/photo-restoration/1b.webp"
        imageTwo="/assets/editor-page/photo-restoration/1a.jpg"
        trustedByText="Trusted by Thousands of Creators & Photographers Worldwide"
        trustedByTexthighlight={["Thousands"]}
        category="photo-restoration"
        logos={logos}
        keypoints={[
          "52,000+ Photos Restored",
          "Instant Results",
          "Privacy Protected",
          "Any Photo",
          "One Click",
          "100% Guarantee"
        ]}
      />
      <EditorPageHowItWorks
        description="It's as easy as 1-2-3!"
        steps={[
          {
            number: "1",
            title: "Upload Your Photos",
            description:
              "Start by uploading any photo directly from your device - whether it's a scanned print, black-and-white portrait, or color photo that's faded with time. Our platform supports all major file formats and even lets you upload multiple images at once for batch restoration.",
          },
          {
            number: "2",
            title: "Let AI Revive Your Photo",
            description:
              "Once uploaded, our powerful AI gets to work. It scans for common types of damage like creases, discoloration, fading, and scratches. Then it automatically reconstructs the damaged areas, enhances clarity, and breathes new life into your photo - all in a matter of seconds.",
          },
          {
            number: "3",
            title: "Preview and Download",
            description:
              "Review the restored result instantly. Want to do more? Use our editing tools to remove backgrounds, eliminate unwanted objects, or apply optional colorization. When you're happy, simply download your enhanced image and share or print it with pride.",
          },
        ]}
      />
      <EditorPageWhyChoose
        items={[
          {
            title: "AI Colorization for Faded or B&W Photos",
            description:
              "Transform old, faded, or black-and-white photos into full-color memories. Our AI intelligently analyzes the photo's context to predict accurate, natural colors - from realistic skin tones to vintage clothing and scenic backgrounds. Perfect for bringing history to life.",
            ctaText: "Restore my photo",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/photo-restoration/2b.webp",
              afterSrc: "/assets/editor-page/photo-restoration/2a.jpg",
            },
          },
          {
            title: "Restore Sharpness and Image Quality",
            description:
              "Photos that have lost clarity over time? We've got you covered. The tool enhances fine details, sharpens facial features and textures, and reduces blur - giving you a high-quality version that looks crisp and vibrant.",
            ctaText: "Enhance my photo",
            ctaHref: "/login",
            media: {
              kind: "slider",
              beforeSrc: "/assets/editor-page/photo-restoration/3b.webp",
              afterSrc: "/assets/editor-page/photo-restoration/3a.jpg",
            },
          },
          {
            title: "Fix Damage from Aging and Wear",
            description:
              "From scratches and tears to water stains and paper folds, the AI identifies all signs of aging and deterioration. It then rebuilds missing or damaged sections, delivering a beautifully restored image that feels fresh while preserving its original charm.",
            ctaText: "Repair my photo",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/photo-restoration/4b.webp",
              afterSrc: "/assets/editor-page/photo-restoration/4a.jpg",
            },
          },
        ]}
      />
      <EditorPageUseCasesWithImages
        title="Top Use Cases for AI Photo Restoration"
        description="See how our AI-powered photo restoration brings images back to life. Explore each use case below and experience stunning before and after transformations in action."
        useCases={[
          {
            title: "Family Albums",
            description:
              "Family Albums & Ancestry Projects. Restore treasured family portraits and historical photos with AI, preserving fading memories across generations for sharing, printing, and safekeeping.",
            beforeSrc: "/assets/editor-page/photo-restoration/9b.webp",
            afterSrc: "/assets/editor-page/photo-restoration/9a.jpg",
            useCaseSlug: "Family",
          },
          {
            title: "Social Media",
            description:
              "Social Media & Storytelling. Turn old photos into engaging before-and-after posts for Instagram, TikTok, or Facebook - perfect for storytelling, memory sharing, and viral content.",
            beforeSrc: "/assets/editor-page/photo-restoration/11b.webp",
            afterSrc: "/assets/editor-page/photo-restoration/11a.jpg",
            useCaseSlug: "Social Media",
          },
          {
            title: "Archives",
            description:
              "Documentaries, Archives & Museums. Revive archival photos and vintage visuals by repairing and colorizing them for exhibitions, books, museums, and digital preservation projects.",
            beforeSrc: "/assets/editor-page/photo-restoration/7b.webp",
            afterSrc: "/assets/editor-page/photo-restoration/7a.jpg",
            useCaseSlug: "Archives",
          },
          {
            title: "E-Commerce",
            description:
              "E-Commerce & Product Heritage. Enhance old product images, packaging photos, and brand heritage materials with AI restoration for modern marketing, rebranding, and heritage campaigns.",
            beforeSrc: "/assets/editor-page/photo-restoration/6b.webp",
            afterSrc: "/assets/editor-page/photo-restoration/6a.jpg",
            useCaseSlug: "ECommerce",
          },
          {
            title: "Gifting & Personalized Prints",
            description:
              "Transform restored photos into one-of-a-kind gifts - from framed prints to calendars and photo books - preserving memories in lasting keepsakes.",
            beforeSrc: "/assets/editor-page/photo-restoration/8b.webp",
            afterSrc: "/assets/editor-page/photo-restoration/8a.jpg",
            useCaseSlug: "Gifting",
          },
        ]}
      />
      <OldFAQSection     faqData={photoRestorationFaqs}
      title="Got a Question? We’re Here to Help Anytime"
      highlight="Got a Question?"
      description="Your satisfaction is our top priority. If you don’t find the answer here, our support team is always ready to help you get the most out of this tool."
      />
       <EditorFeaturesSection 
      title="Discover More AI Photo Editing Tools"
      highlight="Photo Editing Tools"
      description="Take your photos to the next level with our smart, easy to use editing tools designed to enhance every detail."
      />
    </main>
  );
}
