import EditorFeaturesSection from "@/components/landing-page/editor-features";
import { OldFAQSection } from "@/components/landing-page/old-faq-section";
import EditorPageHeroSection from "@/components/landing-page/photo-editor/editor-page-hero-section";
import EditorPageHowItWorks from "@/components/landing-page/photo-editor/editor-page-how-it-works";
import EditorPageWhyChoose from "@/components/landing-page/photo-editor/editor-page-why-choose";
import EditorPageUseCasesWithImages from "@/components/landing-page/photo-editor/editor-page-use-cases-with-images";
import { imageUpscalerFaqs } from "@/data/faqs";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: 'AI Image Upscaler – Enlarge & Sharpen Photos Up to 10× Instantly',
  description: 'Upscale low-resolution images up to 10× with AI Image Upscaler. Enhance sharpness, reduce noise, and get crisp, high-resolution results in seconds - no editing skills required.',
  canonicalPath: '/photo-editor/image-upscaler',
})

export default function ImageUpscalerLandingPage() {
  return (
    <main className="flex flex-col">
      <EditorPageHeroSection
        title="Enhance Photo Resolution Instantly with AI - Upscale Up to 10×"
        description="Turn low-quality or small images into crisp, high-resolution photos with our advanced AI Image upscaler. Enlarge images up to 10× without losing sharpness or detail. Simply upload your photo, and our AI transforms it in seconds."
        imageOne="/assets/editor-page/image-upscaler/2b.jpg"
        imageTwo="/assets/editor-page/image-upscaler/2a.jpg"
        trustedByText="Trusted by Thousands of Creators and Photographers"
        trustedByTexthighlight={["Thousands"]}
        category="image-upscaler"
        logos={[
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
        ]}
        keypoints={[
          "50,000+ Images Upscaled",
          "Instant Results",
          "Privacy Protected",
          "Any Photo",
          "One Click",
          "100% Guarantee"
        ]}
      />
      <EditorPageHowItWorks
        description="It’s as easy as 1-2-3!"
        steps={[
          {
            number: "1",
            title: "Upload Your Image",
            description:
              "Start by uploading a photo from your device - whether it's a portrait, landscape, product shot, or digital artwork. We support all major formats like JPG, PNG, WEBP, and HEIC.",
          },
          {
            number: "2",
            title: "Let the AI Upscale Instantly",
            description:
              "Our intelligent AI analyzes your image and enhances it by adding realistic pixel data. The result is a higher-resolution version that looks sharper, clearer, and more professional - all in just seconds.",
          },
          {
            number: "3",
            title: "Preview, Edit, and Download",
            description:
              "Preview your enhanced image instantly. Use built-in tools to refine details or remove distractions if needed. Once you're satisfied, download your high-resolution photo - perfect for web, print, or personal use.",
          },
        ]}
      />
      <EditorPageWhyChoose
        items={[
          {
            title: "Sharper Details, Instantly",
            description:
              "Bring your photos to life with vivid clarity. Our AI intelligently analyzes and enhances textures, edges, and fine details, turning blurry or soft images into crisp, professional-quality visuals.",
            ctaText: "Upscale My Image",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/image-upscaler/4b.jpg",
              afterSrc: "/assets/editor-page/image-upscaler/4a.jpg",
            },
          },

          {
            title: "Seamless High-Resolution Upscaling",
            description:
              "Whether you're preparing images for large-format printing or high-definition screens, our upscaler expands image dimensions while maintaining sharpness - no pixelation, no compromise. Ideal for banners, posters, and digital displays.",
            ctaText: "Try The Upscaler",
            ctaHref: "/login",
            media: {
              kind: "slider",
              beforeSrc: "/assets/editor-page/image-upscaler/6b.jpg",
              afterSrc: "/assets/editor-page/image-upscaler/6a.jpg",
            },
          },
          {
            title: "Enhanced Visual Quality",
            description:
              "Go beyond resolution. Our technology reduces noise, smoothens imperfections, and restores lost features - giving your images a polished, refined look. Perfect for portfolios, product showcases, portraits, and creative projects.",
            ctaText: "Enhance Quality",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/image-upscaler/8b.jpg",
              afterSrc: "/assets/editor-page/image-upscaler/8a.jpg",
            },
          },
        ]}
      />
      <EditorPageUseCasesWithImages
        title="Top Use Cases for the Image Upscaler"
        description="See how our AI-powered Image Upscaler enhances photos for every need. Click a use case to explore real before and after examples"
        useCases={[
          {
            title: "Old Photos",
            description:
              "Users can breathe new life into blurry, pixelated, or outdated images - from old family pictures to vintage uploads. The upscaler enhances resolution and detail, making them look crisp and modern.",
            beforeSrc: "/assets/editor-page/image-upscaler/12b.webp",
            afterSrc: "/assets/editor-page/image-upscaler/12a.jpg",
            useCaseSlug: "Old Photos",
          },
          {
            title: "Prints",
            description:
              "Perfect for artists, photographers, and designers looking to print images in large formats (like posters, banners, or canvases) without losing clarity. The tool increases resolution to match professional printing standards.",
            beforeSrc: "/assets/editor-page/image-upscaler/2b.jpg",
            afterSrc: "/assets/editor-page/image-upscaler/2a.jpg",
            useCaseSlug: "Prints",
          },
          {
            title: "E-commerce",
            description:
              "Online sellers can upscale product images for listings, ads, and catalogs. High-resolution photos attract more buyers by showcasing products in sharp detail, improving trust and conversions.",
            beforeSrc: "/assets/editor-page/image-upscaler/1b.jpg",
            afterSrc: "/assets/editor-page/image-upscaler/1a.jpg",
            useCaseSlug: "E-commerce",
          },
          {
            title: "Social Media",
            description:
              "Content creators and marketers can upgrade visuals for Instagram, LinkedIn, YouTube thumbnails, and more. The tool ensures every post looks polished and stands out - even if the original image quality was poor.",
            beforeSrc: "/assets/editor-page/image-upscaler/8b.jpg",
            afterSrc: "/assets/editor-page/image-upscaler/8a.jpg",
            useCaseSlug: "Social Media",
          },
          {
            title: "Presentations",
            description:
              "Designers, architects, photographers, and other creatives can use the upscaler to refine images for client decks, portfolios, websites, or pitch presentations - ensuring every visual makes a strong impression.",
            beforeSrc: "/assets/editor-page/image-upscaler/11b.jpg",
            afterSrc: "/assets/editor-page/image-upscaler/11a.jpg",
            useCaseSlug: "Presentations",
          },
        ]}
      />
      <OldFAQSection faqData={imageUpscalerFaqs}
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
