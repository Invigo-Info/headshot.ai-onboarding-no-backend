import EditorFeaturesSection from "@/components/landing-page/editor-features";
import { OldFAQSection } from "@/components/landing-page/old-faq-section";
import EditorPageHeroSection from "@/components/landing-page/photo-editor/editor-page-hero-section";
import EditorPageHowItWorks from "@/components/landing-page/photo-editor/editor-page-how-it-works";
import EditorPageWhyChoose from "@/components/landing-page/photo-editor/editor-page-why-choose";
import EditorPageUseCasesWithImages from "@/components/landing-page/photo-editor/editor-page-use-cases-with-images";
import { blemishRemoverFaqs } from "@/data/faqs";

import { createPageMetadata } from "@/lib/seo";

const logos =   [
  "1.Instagram.png",
  "2.TikTok.png",
  "3.Youtube.png",
  "4.LinkedIn.png",
  "5.Facebook.png",
  "6.Pinterest.png",
  "7.X-Twitter.png",
  "8.tinder.png",
  "9.Bumble.png",
  "10.Hinge.png",
  "11.Okcupid.png",
  "12.Match.png",
  "13.Grindr.png",
  "14.eHarmony.png",
  "15.Zillow.png"
  ]

const keypoints = [
  "60,000+ Faces Retouched",
  "Instant Results",
  "Privacy Protected",
  "Any Photo",
  "One Click",
  "100% Guarantee",
]
 
export const metadata = createPageMetadata({
  title: 'AI Blemish Remover – Instantly Clear Pimples, Scars & Dark Spots',
  description: 'Get flawless, natural-looking skin in seconds with our AI Blemish Remover. Erase pimples, acne scars, freckles, and dark spots - no filters or editing skills needed.',
  canonicalPath: '/photo-editor/blemish-remover',
})

export default function BlemishRemoverLandingPage() {
  return (
    <main className="flex flex-col">
      <EditorPageHeroSection
        title="Flawless Skin in Seconds with 1-Click AI Blemish Remover"
        description="Say goodbye to pimples, acne scars, and dark spots. Our AI-powered blemish remover gives you smooth, natural-looking skin instantly - no filters, no editing skills needed."
        imageOne="/assets/editor-page/blemish-remover/1b.webp"
        imageTwo="/assets/editor-page/blemish-remover/1a.jpeg"
        trustedByText="Trusted by Thousands to Look Their Best Online"
        trustedByTexthighlight={["Thousands"]}
        category="blemish-remover"
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
              "Get started by uploading your photo from your device. The tool supports all major image formats, ensuring smooth compatibility with mobile or camera photos.",
          },
          {
            number: "2",
            title: "Let the AI Work Its Magic",
            description:
              "Once your image is uploaded, our advanced AI instantly goes to work-analyzing your photo, detecting blemishes like pimples, acne scars, and dark spots, and seamlessly replacing them with natural-looking skin tones and textures.",
          },
          {
            number: "3",
            title: "Review and Download",
            description:
              "Review your image. Want to go further? Use additional tools like Object Remover or Background Changer to perfect your photo. Once you're satisfied, download your polished image in high resolution.",
          },
        ]}
      />
      <EditorPageWhyChoose
        items={[
          {
            title: "Instant, Natural Results",
            description:
              "Get flawless skin in seconds - no filters, no fuss. The AI delivers professional-looking edits while preserving your natural skin texture and tone.",
            ctaText: "Improve Your Skin Now",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/blemish-remover/2b.webp",
              afterSrc: "/assets/editor-page/blemish-remover/2a.jpg",
            },
          },

          {
            title: "AI-Powered Skin Correction",
            description:
              "This isn't just basic blurring. Our intelligent AI detects blemishes-like acne, freckles, scars, and dark spots-and reconstructs smooth, clear skin by intelligently sampling surrounding areas. The result? Seamless, natural-looking retouching.",
            ctaText: "Try Blemish Remover Now",
            ctaHref: "/login",
            media: {
              kind: "slider",
              beforeSrc: "/assets/editor-page/blemish-remover/4b.webp",
              afterSrc: "/assets/editor-page/blemish-remover/4a.jpg",
            },
          },
          {
            title: "Effortless Photo Retouching",
            description:
              "Whether it's a selfie, portrait, or close-up, you can remove imperfections like pimples and uneven tone with just one click. No design or editing skills required.",
            ctaText: "Try It Now",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/blemish-remover/5b.webp",
              afterSrc: "/assets/editor-page/blemish-remover/5a.jpeg",
            },
          },

          {
            title: "Safe, Secure & Private",
            description:
              "All photo processing is done securely. Your images are never stored longer than necessary and are not used for training or shared with third parties.",
            ctaText: "Fix My Photo in 1 Click",
            ctaHref: "/login",
            media: {
              kind: "collage4",
              images: [
                "/assets/editor-page/blemish-remover/6b.webp",
                "/assets/editor-page/blemish-remover/6a.jpg",
                "/assets/editor-page/blemish-remover/7b.webp",
                "/assets/editor-page/blemish-remover/7a.jpeg",
              ],
            },
          },
        ]}
      />
      <EditorPageUseCasesWithImages
        title="Top Use Cases for AI Blemish Remover"
        description="See how our AI-powered skin correction can make your photos shine across different contexts. Click on each use case to explore real before and after examples."
        useCases={[
          {
            title: "Social Media",
            description:
              "Polish your selfies, reels, and thumbnails for Instagram, TikTok, YouTube, and more. Stand out with flawless skin that looks natural - no heavy filters.",
            beforeSrc: "/assets/editor-page/blemish-remover/2b.webp",
            afterSrc: "/assets/editor-page/blemish-remover/2a.jpg",
            useCaseSlug: "Social Media",
          },
          {
            title: "Everyday Memories",
            description:
              "Fix blemishes in family photos, travel shots, or group selfies. Make your personal moments picture-perfect.",
            beforeSrc: "/assets/editor-page/blemish-remover/4b.webp",
            afterSrc: "/assets/editor-page/blemish-remover/4a.jpg",
            useCaseSlug: "Everyday Memories",
          },
          {
            title: "Dating",
            description:
              "First impressions matter. Clean up your Tinder, Bumble, or Hinge photos with one click to put your best face forward.",
            beforeSrc: "/assets/editor-page/blemish-remover/5b.webp",
            afterSrc: "/assets/editor-page/blemish-remover/5a.jpeg",
            useCaseSlug: "Dating",
          },
          {
            title: "Professional",
            description:
              "Perfect for LinkedIn profiles, resumes, and company bios. Look confident and approachable in every professional setting.",
            beforeSrc: "/assets/editor-page/blemish-remover/6b.webp",
            afterSrc: "/assets/editor-page/blemish-remover/6a.jpeg",
            useCaseSlug: "Professional",
          },
          {
            title: "Creators",
            description:
              "Showcase polished portraits on Behance, Dribbble, Canva, or Adobe Express with studio-quality retouching.",
            beforeSrc: "/assets/editor-page/blemish-remover/7b.webp",
            afterSrc: "/assets/editor-page/blemish-remover/7a.jpeg",
            useCaseSlug: "Creators",
          },
        ]}
      />
      <OldFAQSection faqData={blemishRemoverFaqs}
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
