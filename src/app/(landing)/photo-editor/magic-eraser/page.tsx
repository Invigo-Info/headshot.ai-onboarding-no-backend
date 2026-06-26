import EditorFeaturesSection from "@/components/landing-page/editor-features";
import { OldFAQSection } from "@/components/landing-page/old-faq-section";
import EditorPageHeroSection from "@/components/landing-page/photo-editor/editor-page-hero-section";
import EditorPageHowItWorks from "@/components/landing-page/photo-editor/editor-page-how-it-works";
import EditorPageWhyChoose from "@/components/landing-page/photo-editor/editor-page-why-choose";
import EditorPageUseCasesWithImages from "@/components/landing-page/photo-editor/editor-page-use-cases-with-images";
import { magicEraserFaqs } from "@/data/faqs";

import { createPageMetadata } from "@/lib/seo";

const logos = [
  "1.Instagram.png",
  "2.Youtube.png",
  "3.TikTok.png",
  "4.LinkedIn.png",
  "5.Canva.png",
  "6.Facebook.png",
  "7.Pinterest.png",
  "8.X-Twitter.png",
  "9.Figma.png",
  "10.Framer.png",
  "11.Vistaprint.png",
  "12.Shutterfly.png",
  "13.Printify.png",
  "14.Behance.png",
  "15.Dribbble.png",
  "16.Notion.png",
  "17.Adobe Express.png",
  "18.Zillow.png",
  "19.Houzz.png",
  "20.AutoCAD.png",
  "21.SketchUp.png",
  "22.Google-Slides.png",
  "23.Pitch.png",
  "24.Wix.png",
  "25.500Px.png",
  "26.SmugMug.png",
  "27.Flickr.png"
]

const keypoints = [
  "32,000+ Photos Retouched",
  "Instant Results",
  "Privacy Protected",
  "Any Photo",
  "One Click",
  "100% Guarantee",
]

export const metadata = createPageMetadata({
  title: 'AI Magic Eraser – Remove Objects, People & Text Instantly',
  description: 'Effortlessly remove unwanted objects, people, text, or watermarks with AI Magic Eraser. Brush, erase, and download clean, professional-quality photos in seconds - no editing skills required.',
  canonicalPath: '/photo-editor/magic-eraser',
})

export default function MagicEraserLandingPage() {
  return (
    <main className="flex flex-col">
      <EditorPageHeroSection
        title="Erase Anything Instantly with Our AI Magic Eraser"
        description="Clean up your photos like magic - instantly remove unwanted objects, people, text, watermarks, and more. No editing skills needed. Just upload, brush over the area, and let AI handle the rest."
        imageOne="/assets/editor-page/magic-eraser/1b.webp"
        imageTwo="/assets/editor-page/magic-eraser/1a.jpg"
        trustedByText="Trusted by Thousands of Creators and Photographers"
        trustedByTexthighlight={["Thousands"]}
        category="magic-eraser"
        logos={logos}
        keypoints={keypoints}
      />
      <EditorPageHowItWorks
        description="It’s as easy as 1-2-3!"
        steps={[
          {
            number: "1",
            title: "Choose Your Image",
            description:
              "Click to upload or simply drag and drop your photo. We support popular formats like JPG, JPEG, PNG - with no restrictions on resolution.",
          },
          {
            number: "2",
            title: "Highlight What You Want Gone",
            description:
              "Use the brush tool to paint over objects, people, or text you'd like to remove. Fine-tune the brush size for precision or speed.",
          },
          {
            number: "3",
            title: "Erase & Save Your Clean Image",
            description:
              "Click \"Erase\" to let the AI do its job. Not happy with the result? You can undo, reselect, or try again on the same spot for a better finish - then download your final image.",
          },
        ]}
      />
      <EditorPageWhyChoose
        items={[
          {
            title: "Erase It Like Magic",
            description:
              "Have you ever had difficulty editing out unwanted objects from your photos? Don't worry - our Magic Eraser makes the painstaking process simple. Just brush over the elements you don't want, and they'll disappear like they were never there.",
            ctaText: "Erase objects now",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/magic-eraser/2b.webp",
              afterSrc: "/assets/editor-page/magic-eraser/2a.jpg",
            },
          },
          {
            title: "Smart, AI-Powered Precision",
            description:
              "Our AI model delivers fast, flawless results effortlessly. Sit back, relax, and let the AI handle the details - removing distractions with precision in seconds. Say goodbye to wasted hours on poor edits or expensive professional designers.",
            ctaText: "Try AI eraser",
            ctaHref: "/login",
            media: {
              kind: "slider",
              beforeSrc: "/assets/editor-page/magic-eraser/3b.webp",
              afterSrc: "/assets/editor-page/magic-eraser/3a.jpg",
            },
          },
          {
            title: "Clean Up. Stand Out.",
            description:
              "Transform your portraits, product photos, or promotional pictures. Simplify the creative process by erasing eyesores to create the polished image you need to make that lasting impression.",
            ctaText: "Clean my image",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/magic-eraser/4b.webp",
              afterSrc: "/assets/editor-page/magic-eraser/4a.jpg",
            },
          },
        ]}
      />
      <EditorPageUseCasesWithImages
        title="Top Use Cases for the AI Magic Eraser"
        description="Discover how our AI-powered eraser tool transforms your images by instantly removing unwanted elements. Click on each use case to explore real before-and-after examples."
        useCases={[
          {
            title: "Travel",
            description: "Remove unwanted crowds, photo-bombers, or cluttered scenery to spotlight serene landscapes and memorable moments.",
            beforeSrc: "/assets/editor-page/magic-eraser/11b.webp",
            afterSrc: "/assets/editor-page/magic-eraser/11a.jpg",
            useCaseSlug: "Travel",
          },
          {
            title: "E-commerce",
            description: "Clean up product photos by erasing distracting backgrounds, props, or shadows for a polished, store-ready look.",
            beforeSrc: "/assets/editor-page/magic-eraser/6b.webp",
            afterSrc: "/assets/editor-page/magic-eraser/6a.jpg",
            useCaseSlug: "Product",
          },
          {
            title: "Watermark Removal",
            description: "Eliminate watermarks, logos, or text overlays from images for clean, reusable visual content (where permitted).",
            beforeSrc: "/assets/editor-page/magic-eraser/2b.webp",
            afterSrc: "/assets/editor-page/magic-eraser/2a.jpg",
            useCaseSlug: "Watermark",
          },
          {
            title: "Real Estate",
            description: "Clear out unsightly elements like cars, wires, or signage to present properties in their best light.",
            beforeSrc: "/assets/editor-page/magic-eraser/4b.webp",
            afterSrc: "/assets/editor-page/magic-eraser/4a.jpg",
            useCaseSlug: "Real Estate",
          },
          {
            title: "Photography",
            description: "Erase distractions, stray objects, or background noise to keep focus on the subject and improve visual clarity.",
            beforeSrc: "/assets/editor-page/magic-eraser/9b.webp",
            afterSrc: "/assets/editor-page/magic-eraser/9a.jpg",
            useCaseSlug: "Photography",
          },
          {
            title: "Social Media",
            description: "Polish content by removing clutter, photo-bombs, or off-brand elements for clean, attention-grabbing posts.",
            beforeSrc: "/assets/editor-page/magic-eraser/7b.webp",
            afterSrc: "/assets/editor-page/magic-eraser/7a.jpg",
            useCaseSlug: "Social Media",
          },
        ]}
      />
      <OldFAQSection faqData={magicEraserFaqs}
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
