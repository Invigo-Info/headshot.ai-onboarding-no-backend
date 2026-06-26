import EditorFeaturesSection from "@/components/landing-page/editor-features";
import { OldFAQSection } from "@/components/landing-page/old-faq-section";
import EditorPageHeroSection from "@/components/landing-page/photo-editor/editor-page-hero-section";
import EditorPageHowItWorks from "@/components/landing-page/photo-editor/editor-page-how-it-works";
import EditorPageWhyChoose from "@/components/landing-page/photo-editor/editor-page-why-choose";
import EditorPageUseCasesWithImages from "@/components/landing-page/photo-editor/editor-page-use-cases-with-images";
import { textRemoverFaqs } from "@/data/faqs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI Text Remover – Erase Captions, Watermarks & Text Instantly",
  description: "Remove unwanted text from any image in seconds with our AI Text Remover. Erase captions, watermarks, or annotations while keeping the background flawless - no editing skills required.",
  canonicalPath: '/photo-editor/text-remover',
});
export default function TextRemoverLandingPage() {
  return (
    <main className="flex flex-col">
      <EditorPageHeroSection
        title="Remove Text from Images Instantly with AI"
        description="Clean up your photos in seconds. Our smart AI text remover erases unwanted text - captions, watermarks, annotations - while keeping the background intact. No editing skills, no Photoshop. Just fast, flawless results."
        imageOne="/assets/editor-page/text-remover/1b.webp"
        imageTwo="/assets/editor-page/text-remover/1a.jpg"
        trustedByText="Trusted by Thousands of Creators Worldwide"
        trustedByTexthighlight={["Thousands"]}
        category="text-remover"
        logos={[
          "1.Instagram.png",
          "2.LinkedIn.png",
          "3.Pinterest.png",
          "4.Facebook.png",
          "5.TikTok.png",
          "6.Youtube.png",
          "7.X-Twitter.png",
          "8.Notion.png",
          "9.Adobe Express.png",
          "10.Figma.png",
          "11.Framer.png",
          "12.Behance.png",
          "13.Dribbble.png",
          "14.Shopify.png",
          "15.Amazon.png",
          "16.Etsy.png",
          "17.Wix.png",
          "18.Squarespace.png",
          "19.BigCommerce.png"
        ]}
        keypoints={[
          "70,000+ Photos Cleaned",
          "Instant Results",
          "Privacy Protected",
          "Any Photo",
          "One Click",
          "100% Guarantee",
        ]}
      />
      <EditorPageHowItWorks
        description="It's as easy as 1-2-3!"
        steps={[
          {
            number: "1",
            title: "Upload Your Image",
            description:
              "Start by uploading the image you'd like to clean up. We support JPG, PNG, WEBP, and HEIC files in any size - whether it's a screenshot, a scanned document, or a high-resolution photo.",
          },
          {
            number: "2",
            title: "Let the AI Remove the Text",
            description:
              "Once uploaded, our AI gets to work. It quickly detects and removes unwanted text - from watermarks to captions - and restores the empty space with background pixels that blend naturally into the image.",
          },
          {
            number: "3",
            title: "Download Your Clean Image",
            description:
              "In just a few seconds, your image is ready. Preview the result and download it instantly, no signup or manual editing needed.",
          },
        ]}
      />
      <EditorPageWhyChoose
        items={[
          {
            title: "Flawless Background Restoration",
            description:
              "Our AI doesn't just blur or paint over the text - it understands your image's textures, lighting, and patterns to recreate the background naturally. The result is a seamless edit that blends beautifully with the original image",
            ctaText: "Remove text now",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/text-remover/2b.webp",
              afterSrc: "/assets/editor-page/text-remover/2a.jpg",
            },
          },
          {
            title: "Works on Any Text, Any Image",
            description:
              "Whether it's typed, handwritten, bold, faint, or part of a complex layout - the tool handles all kinds of text across a wide variety of image types with high accuracy.",
            ctaText: "Try it on my image",
            ctaHref: "/login",
            media: {
              kind: "slider",
              beforeSrc: "/assets/editor-page/text-remover/3b.webp",
              afterSrc: "/assets/editor-page/text-remover/3a.jpg",
            },
          },
          {
            title: "Fast, Effortless, and No Editing Skills Needed",
            description:
              "No need for Photoshop or advanced tools. With just a few clicks, anyone can remove text like a pro - even complete beginners. It's fast, intuitive, and frustration-free.",
            ctaText: "Erase text now",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/text-remover/4b.webp",
              afterSrc: "/assets/editor-page/text-remover/4a.jpg",
            },
          },
        ]}
      />
      <EditorPageUseCasesWithImages
        title="Top Use Cases for the AI Text Remover"
        description="Discover how our AI text remover works across real scenarios. Explore each use case to see instant before and after results."
        useCases={[
          {
            title: "Social Media Cleanup",
            description:
              "Remove outdated captions, usernames, or embedded text before reposting or sharing images across platforms like Instagram, LinkedIn, or Pinterest.",
            beforeSrc: "/assets/editor-page/text-remover/7b.webp",
            afterSrc: "/assets/editor-page/text-remover/7a.jpg",
            useCaseSlug: "Social Media",
          },
          {
            title: "Document Editing & Scans",
            description:
              "Clean up scanned pages by erasing old annotations, signatures, or markings - perfect for students, lawyers, or anyone working with scanned paperwork.",
            beforeSrc: "/assets/editor-page/text-remover/5b.webp",
            afterSrc: "/assets/editor-page/text-remover/5a.jpg",
            useCaseSlug: "Documents",
          },
          {
            title: "Marketing & Design",
            description:
              "Edit product photos, banners, or infographics to remove placeholder text or rebrand existing visuals without needing original source files.",
            beforeSrc: "/assets/editor-page/text-remover/10b.webp",
            afterSrc: "/assets/editor-page/text-remover/10a.jpg",
            useCaseSlug: "Marketing",
          },
          {
            title: "Ecommerce & Product Photography",
            description:
              "Remove text labels or promotional overlays to reuse product images across different campaigns or platforms - while keeping the background flawless.",
            beforeSrc: "/assets/editor-page/text-remover/9b.webp",
            afterSrc: "/assets/editor-page/text-remover/9a.jpg",
            useCaseSlug: "Ecommerce",
          },
          {
            title: "Screenshots & Tutorials",
            description:
              "Eliminate personal info, app names, or text overlays from screenshots used in guides, videos, or client documentation.",
            beforeSrc: "/assets/editor-page/text-remover/2b.webp",
            afterSrc: "/assets/editor-page/text-remover/2a.jpg",
            useCaseSlug: "Screenshots",
          },
        ]}
      />
      <OldFAQSection faqData={textRemoverFaqs}
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
