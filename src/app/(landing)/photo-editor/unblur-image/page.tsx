import EditorFeaturesSection from "@/components/landing-page/editor-features";
import { OldFAQSection } from "@/components/landing-page/old-faq-section";
import EditorPageHeroSection from "@/components/landing-page/photo-editor/editor-page-hero-section";
import EditorPageHowItWorks from "@/components/landing-page/photo-editor/editor-page-how-it-works";
import EditorPageWhyChoose from "@/components/landing-page/photo-editor/editor-page-why-choose";
import EditorPageUseCasesWithImages from "@/components/landing-page/photo-editor/editor-page-use-cases-with-images";
import { imageUnblurFaqs } from "@/data/faqs";

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
  "20.Google-Slides.png",
  "21.Pitch.png",
  "22.Wix.png",
  "23.500Px.png",
  "24.SmugMug.png",
  "25.Flickr.png"
]

const keypoints = [
  "36,000+ Photos Unblurred",
  "Instant Results",
  "Privacy Protected",
  "Any Photo",
  "One Click",
  "100% Guarantee",
]

export const metadata = createPageMetadata({
  title: 'AI Unblur Image – Restore Sharpness & Fix Blurry Photos Instantly',
  description: 'Fix blurry photos in seconds with AI Unblur Image tool. Restore clarity, sharpen details, and reduce noise for sharp, professional-quality results - no editing skills required.',
  canonicalPath: '/photo-editor/unblur-image',
})

export default function ImageUnblurLandingPage() {
  return (
    <main className="flex flex-col">
      <EditorPageHeroSection
        title="Fix Blurry Photos Instantly with Our AI Blur Remover"
        description="Turn blurry photos into clear ones in seconds. Our AI-powered tool removes blur, sharpens details, and enhances image quality - no editing skills required. Just upload and let the magic happen effortlessly."
        imageOne="/assets/editor-page/unblur-image/1b.png"
        imageTwo="/assets/editor-page/unblur-image/1a.webp"
        trustedByText="Trusted by Thousands of Creators Worldwide"
        trustedByTexthighlight={["Thousands"]}
        category="unblur-image"
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
              "Start by selecting a photo from your device. Our tool supports all major image formats and lets you upload multiple files at once. If you've already uploaded images to your account, simply choose one and click Unblur Image to begin the transformation.",
          },
          {
            number: "2",
            title: "Let the AI Work Its Magic",
            description:
              "Within seconds, our advanced AI will analyze and sharpen your image - correcting blur from camera shake or poor focus. It restores fine details and turns unclear photos into sharp, professional-quality visuals. No manual editing needed.",
          },
          {
            number: "3",
            title: "Review & Download",
            description:
              "Preview the enhanced result. Want to fine-tune it further? Use our built-in editing tools to enhance features, remove unwanted elements, or make other adjustments. When you're satisfied with the result, just download your newly improved image - it's that simple!",
          },
        ]}
      />
      <EditorPageWhyChoose
        items={[
          {
            title: "Restore Sharpness Instantly",
            description:
              "No more blurry or pixelated images! Unlike traditional editing software that demands time and technical skill, our AI tool fixes blur in just one click. Upload your image and get a crisp, high-resolution result instantly.",
            ctaText: "Unblur My Image",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/unblur-image/2b.png",
              afterSrc: "/assets/editor-page/unblur-image/2a.webp",
            },
          },
          {
            title: "Reveal the True Quality",
            description:
              "Struggling with soft or blurry portraits? Whether it's for a professional profile or a casual selfie, our AI restores natural sharpness to faces and backgrounds - so your photos look their absolute best.",
            ctaText: "Fix My Photo",
            ctaHref: "/login",
            media: {
              kind: "slider",
              beforeSrc: "/assets/editor-page/unblur-image/3b.png",
              afterSrc: "/assets/editor-page/unblur-image/3a.webp",
            },
          },
          {
            title: "Recover What Matters Most",
            description:
              "Blurry shots happen - from camera shake, low light, or pixelation. Our AI restores fine details and clarity in seconds. Want more? Use built-in editing tools to swap backgrounds, remove distractions, and polish your photos to perfection.",
            ctaText: "Enhance Details",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/unblur-image/4b.png",
              afterSrc: "/assets/editor-page/unblur-image/4a.webp",
            },
          },
        ]}
      />
      <EditorPageUseCasesWithImages
        title="Top Use Cases for the AI Blur Remover"
        description="See how our AI-powered blur remover transforms blurry images across different scenarios. Click on each use case to explore real before-and-after examples."
        useCases={[
          {
            title: "Portrait Photography",
            description:
              "Not every photo turns out the way you hoped - especially when the camera shakes or focus slips. Whether it's a family picture, graduation shot, or a selfie, our blur remover tool helps you restore clarity and turn your portraits into polished, high-quality images instantly.",
            beforeSrc: "/assets/editor-page/unblur-image/11b.png",
            afterSrc: "/assets/editor-page/unblur-image/11a.webp",
            useCaseSlug: "Photography",
          },
          {
            title: "Products",
            description:
              "Ecommerce success relies on sharp, professional visuals. If your product photos come out blurry due to lighting or rushed shooting, our AI can fix them in seconds. You'll save time and ensure your product listings look credible and conversion-ready.",
            beforeSrc: "/assets/editor-page/unblur-image/6b.png",
            afterSrc: "/assets/editor-page/unblur-image/6a.webp",
            useCaseSlug: "Product",
          },
          {
            title: "Marketing",
            description:
              "Blurry graphics can undermine your brand's credibility. Use our tool to sharpen visuals used in presentations, ad campaigns, or social media posts - so every piece of content reflects your brand's quality and professionalism.",
            beforeSrc: "/assets/editor-page/unblur-image/12b.png",
            afterSrc: "/assets/editor-page/unblur-image/12a.webp",
            useCaseSlug: "Marketing",
          },
          {
            title: "Travel",
            description:
              "Captured an unforgettable moment - only to find it blurred? Don't let it go to waste. Restore your travel, wedding, or event photos with our deblurring tool and keep those memories preserved in crystal-clear quality.",
            beforeSrc: "/assets/editor-page/unblur-image/2b.png",
            afterSrc: "/assets/editor-page/unblur-image/2a.webp",
            useCaseSlug: "Travel",
          },
          {
            title: "Content",
            description:
              "Whether you're creating YouTube thumbnails, Instagram posts, or digital art, image clarity matters. Our AI helps you fix blurry visuals before publishing - so your content looks sharp, polished, and ready to stand out in any feed.",
            beforeSrc: "/assets/editor-page/unblur-image/8b.png",
            afterSrc: "/assets/editor-page/unblur-image/8a.webp",
            useCaseSlug: "Content",
          },
        ]}
      />
      <OldFAQSection faqData={imageUnblurFaqs}
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
