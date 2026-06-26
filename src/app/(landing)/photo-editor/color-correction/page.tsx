import EditorFeaturesSection from "@/components/landing-page/editor-features";
import { OldFAQSection } from "@/components/landing-page/old-faq-section";
import EditorPageHeroSection from "@/components/landing-page/photo-editor/editor-page-hero-section";
import EditorPageHowItWorks from "@/components/landing-page/photo-editor/editor-page-how-it-works";
import EditorPageWhyChoose from "@/components/landing-page/photo-editor/editor-page-why-choose";
import EditorPageUseCasesWithImages from "@/components/landing-page/photo-editor/editor-page-use-cases-with-images";
import { colorCorrectionFaqs } from "@/data/faqs";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: 'AI Color Correction – Fix Lighting & Enhance Vibrant Tones Instantly',
  description: 'Revive dull photos in seconds with AI Color Correction. Automatically fix exposure, contrast, and white balance to restore natural tones and vibrant, professional-quality images - no editing skills required.',
  canonicalPath: '/photo-editor/color-correction',
})

const logos = [
  "1.Instagram.png",
  "2.TikTok.png",
  "3.Facebook.png",
  "4.Youtube.png",
  "5.Pinterest.png",
  "6.X-Twitter.png",
  "7.Shopify.png",
  "8.Amazon.png",
  "9.Etsy.png",
  "10.Ebay.png",
  "11.WooCommerce.png",
  "12.Unsplash.png",
  "13.Flickr.png",
  "14.LinkedIn.png",
  "15.Zoom.png",
  "16.Airbnb.png",
  "17.Zillow.png",
  "18.Houzz.png"
]

const keypoints = [
  "70,000+ Photos Enhanced",
  "Instant Results",
  "Privacy Protected",
  "Any Photo",
  "One Click",
  "100% Guarantee",
]

export default function ColorCorrectionLandingPage() {
  return (
    <main className="flex flex-col">
      <EditorPageHeroSection
        title="Fix Colors Instantly with Smart AI Color Correction"
        description="Upload your photo and let our AI instantly correct colors, balance exposure, and restore natural tones. No sliders, no editing skills - just flawless, true-to-life results in seconds."
        imageOne="/assets/editor-page/color-correction/1b.jpg"
        imageTwo="/assets/editor-page/color-correction/1a.webp"
        trustedByText="Trusted by Thousands of Creators Worldwide"
        trustedByTexthighlight={["Thousands"]}
        category="color-correction"
        logos={logos}
        keypoints={keypoints}
      />
      <EditorPageHowItWorks
        description="It’s as easy as 1-2-3!"
        steps={[
          {
            number: "1",
            title: "Upload Your Image",
            description:
              "Simply upload the photo you want to edit. We support all image dimensions, and the tool accepts both PNG and JPG formats.",
          },
          {
            number: "2",
            title: "Let the AI Work Its Magic",
            description:
              "Our intelligent color correction system automatically adjusts key image properties such as saturation, temperature, contrast, exposure, and shadows. No sliders, no guesswork - just one click.",
          },
          {
            number: "3",
            title: "Download Your Edited Image",
            description:
              "Once the AI finishes processing, you can immediately download the improved version of your photo. It's that simple.",
          },
        ]}
      />
      <EditorPageWhyChoose
        items={[
          {
            title: "Bring Colors to Life",
            description:
              "Say goodbye to dull, lifeless images. Our tool enhances saturation and brings out vivid tones in your subjects and backgrounds for a more captivating visual experience.",
            ctaText: "Make My Photos Vibrant",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/color-correction/6b.jpg",
              afterSrc: "/assets/editor-page/color-correction/6a.webp",
            },
          },
          {
            title: "Balance Lighting Like a Pro",
            description:
              "Remove unwanted color casts caused by poor lighting. The tool adjusts your image's temperature and tint to deliver a well-balanced, neutral look.",
            ctaText: "Balance My Lighting",
            ctaHref: "/login",
            media: {
              kind: "slider",
              beforeSrc: "/assets/editor-page/color-correction/9b.jpg",
              afterSrc: "/assets/editor-page/color-correction/9a.webp",
            },
          },
          {
            title: "Smart Exposure & Contrast Repair",
            description:
              "Our AI intelligently manages brightness, shadows, and highlights to eliminate washed-out areas or overly dark patches - ideal for restoring detail and balance.",
            ctaText: "Fix My Exposure",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/color-correction/4b.jpg",
              afterSrc: "/assets/editor-page/color-correction/4a.webp",
            },
          },
        ]}
      />
      <EditorPageUseCasesWithImages
        title="Top Use Cases for the AI Color Correction Tool"
        description="See how our AI-powered color correction tool transforms images across different scenarios. Click on each use case to explore real before and after examples."
        useCases={[
          {
            title: "Social Media Content",
            description:
              "Make your Instagram, TikTok, or Facebook images stand out with vibrant, scroll-stopping visuals. Great for influencers, creators, and brands alike.",
            beforeSrc: "/assets/editor-page/color-correction/11b.jpg",
            afterSrc: "/assets/editor-page/color-correction/11a.webp",
            useCaseSlug: "Social Media",
          },
          {
            title: "Product Photos",
            description:
              "Bring your ecommerce listings to life by making your products look sharper, more colorful, and visually appealing - all without manual editing.",
            beforeSrc: "/assets/editor-page/color-correction/10b.jpg",
            afterSrc: "/assets/editor-page/color-correction/10a.webp",
            useCaseSlug: "Product",
          },
          {
            title: "Nature & Landscape Shots",
            description:
              "Enhance the beauty of meadows, trees, skies, and flora. Restore the natural colors of outdoor scenes and make your travel memories truly pop.",
            beforeSrc: "/assets/editor-page/color-correction/4b.jpg",
            afterSrc: "/assets/editor-page/color-correction/4a.webp",
            useCaseSlug: "Nature",
          },
          {
            title: "Portraits & Headshots",
            description:
              "Elevate your selfies or professional portraits. This tool improves skin tone, enhances eyes, and fixes lighting for a polished, natural finish.",
            beforeSrc: "/assets/editor-page/color-correction/7b.jpg",
            afterSrc: "/assets/editor-page/color-correction/7a.webp",
            useCaseSlug: "Portraits",
          },
          {
            title: "Travel Photography",
            description:
              "Bring your travel photos to life by correcting harsh lighting or dull skies. Perfect for blog posts, scrapbooks, or printing memorable moments.",
            beforeSrc: "/assets/editor-page/color-correction/3b.jpg",
            afterSrc: "/assets/editor-page/color-correction/3a.webp",
            useCaseSlug: "Travel",
          },
        ]}
      />
      <OldFAQSection faqData={colorCorrectionFaqs}
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
