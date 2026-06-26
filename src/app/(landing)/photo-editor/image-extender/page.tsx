import EditorFeaturesSection from "@/components/landing-page/editor-features";
import EditorPageHeroSection from "@/components/landing-page/photo-editor/editor-page-hero-section";
import EditorPageHowItWorks from "@/components/landing-page/photo-editor/editor-page-how-it-works";
import EditorPageWhyChoose from "@/components/landing-page/photo-editor/editor-page-why-choose";
import EditorPageUseCasesWithImages from "@/components/landing-page/photo-editor/editor-page-use-cases-with-images";
import { imageExtenderFaqs } from "@/data/faqs";

import { createPageMetadata } from "@/lib/seo";
import { OldFAQSection } from "@/components/landing-page/old-faq-section";

const logos = [
  "1.Instagram.png",
  "2.Youtube.png",
  "3.TikTok.png",
  "4.LinkedIn.png",
  "5.Canva.png",
  "6.Shopify.png",
  "7.Amazon.png",
  "8.Etsy.png",
  "9.Facebook.png",
  "10.Pinterest.png",
  "11.X-Twitter.png",
  "12.Figma.png",
  "13.Framer.png",
  "14.Behance.png",
  "15.Dribbble.png",
  "16.Notion.png",
  "17.Adobe Express.png",
  "18.Zillow.png",
  "19.Houzz.png",
  "20.AutoCAD.png",
  "21.SketchUp.png"
]

const keypoints = [
  "24,000+ Photos Extended",
  "Instant Results",
  "Privacy Protected",
  "Any Photo",
  "One Click",
  "100% Guarantee",
]

export const metadata = createPageMetadata({
  title: 'AI Photo Extender – Uncrop & Expand Images Seamlessly in Seconds',
  description: 'Effortlessly uncrop and expand photos in any direction with our AI Image Extender. Fill backgrounds naturally, fix awkward crops, and adjust aspect ratios in seconds - no editing skills needed.',
  canonicalPath: '/photo-editor/image-extender',
})

export default function ImageExtenderLandingPage() {
  return (
    <main className="flex flex-col">
      <EditorPageHeroSection
        title="AI Powered Image Extender – Instantly Expand Your Photos in Seconds"
        description="Effortlessly extend your photos in any direction with stunning, natural results. Our smart AI fills in backgrounds, fixes awkward crops, and adjusts aspect ratios - all with just one click. No editing skills required."
        imageOne="/assets/editor-page/image-extender/1b.jpg"
        imageTwo="/assets/editor-page/image-extender/1a.webp"
        trustedByText="Trusted by Thousands of Creators Worldwide"
        trustedByTexthighlight={["Thousands"]}
        category="image-extender"
        logos={logos}
        keypoints={keypoints}
      />
      <EditorPageHowItWorks
        description="It's as easy as 1-2-3!"
        steps={[
          {
            number: "1",
            title: "Upload Your Image",
            description:
              "Start by uploading any photo - portraits, landscapes, product shots, or anything else. We support all common formats like JPG, PNG, WEBP, and HEIC.",
          },
          {
            number: "2",
            title: "Let the AI Work Its Magic",
            description:
              "Our AI analyzes your photo's edges, lighting, and content, then generates new pixels that blend in naturally - creating a seamless extension as if it was always part of the original image.",
          },
          {
            number: "3",
            title: "Preview and Download",
            description:
              "Within seconds, your extended image is ready to preview and download. If you're not satisfied, you can retry with different directions or use your next free credit.",
          },
        ]}
      />
      <EditorPageWhyChoose
        items={[
          {
            title: "Seamless, Realistic Backgrounds",
            description:
              "Our AI doesn't just stretch or crop the photo. Instead, it adds natural-looking background details by studying your image, so the final result blends perfectly with the original - as if the extra space was always there.",
            ctaText: "Extend My Photo",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/image-extender/2b.jpg",
              afterSrc: "/assets/editor-page/image-extender/2a.webp",
            },
          },
          {
            title: "Smart, Automatic Expansion",
            description:
              "No need to pick sides, draw boxes, or adjust settings. With one click, our AI decides the best way to expand your photo, filling the empty areas naturally while keeping everything in harmony with your image.",
            ctaText: "Uncrop My Photo",
            ctaHref: "/login",
            media: {
              kind: "slider",
              beforeSrc: "/assets/editor-page/image-extender/3b.jpg",
              afterSrc: "/assets/editor-page/image-extender/3a.webp",
            },
          },
          {
            title: "Fast Results with No Editing Skills Needed",
            description:
              "Forget Photoshop or complicated editing tools. In just seconds, your extended photo is ready to download. Simple, fast, and accessible to everyone - even complete beginners.",
            ctaText: "Expand My Photo Now",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/image-extender/4b.jpg",
              afterSrc: "/assets/editor-page/image-extender/4a.webp",
            },
          },
        ]}
      />
      <EditorPageUseCasesWithImages
        title="Top Use Cases for the AI Image Extender"
        description="See how our AI-powered image extender transforms your photos for different needs. Click on each use case to explore real before and after examples."
        useCases={[
          {
            title: "Social Media Cleanup",
            description:
              "Fix awkward crops or give your photo more breathing room for platform specific dimensions - perfect for profile banners, stories, or carousels that demand wider or taller frames.",
            beforeSrc: "/assets/editor-page/image-extender/6b.jpg",
            afterSrc: "/assets/editor-page/image-extender/6a.webp",
            useCaseSlug: "Social Media",
          },
          {
            title: "E-commerce",
            description:
              "Expand product shots to fit marketplace guidelines or ad layouts, while keeping a clean, consistent background for professional storefronts that look polished and appealing.",
            beforeSrc: "/assets/editor-page/image-extender/9b.jpg",
            afterSrc: "/assets/editor-page/image-extender/9a.webp",
            useCaseSlug: "Ecommerce",
          },
          {
            title: "Portraits & Headshots",
            description:
              "Add extra space around faces to improve composition and framing - perfect for LinkedIn banners, YouTube thumbnails, resumes, or professional team profile photos.",
            beforeSrc: "/assets/editor-page/image-extender/7b.jpg",
            afterSrc: "/assets/editor-page/image-extender/7a.webp",
            useCaseSlug: "Portraits",
          },
          {
            title: "Design & Marketing",
            description:
              "Turn cropped or square images into flexible, customizable layouts that fit posters, ads, web banners, slides, and thumbnails - no reshoots or templates required.",
            beforeSrc: "/assets/editor-page/image-extender/8b.jpg",
            afterSrc: "/assets/editor-page/image-extender/8a.webp",
            useCaseSlug: "Design & Marketing",
          },
          {
            title: "Real Estate & Architecture",
            description:
              "Extend property photos by widening skies, lawns, or interiors, creating a more spacious, inviting feel for listings, brochures, websites, or digital tours.",
            beforeSrc: "/assets/editor-page/image-extender/5b.jpg",
            afterSrc: "/assets/editor-page/image-extender/5a.webp",
            useCaseSlug: "Real Estate",
          },
        ]}
      />
      <OldFAQSection faqData={imageExtenderFaqs}
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
