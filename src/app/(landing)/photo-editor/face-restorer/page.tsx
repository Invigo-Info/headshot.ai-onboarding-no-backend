import EditorFeaturesSection from "@/components/landing-page/editor-features";
import { OldFAQSection } from "@/components/landing-page/old-faq-section";
import EditorPageHeroSection from "@/components/landing-page/photo-editor/editor-page-hero-section";
import EditorPageHowItWorks from "@/components/landing-page/photo-editor/editor-page-how-it-works";
import EditorPageWhyChoose from "@/components/landing-page/photo-editor/editor-page-why-choose";
import EditorPageUseCasesWithImages from "@/components/landing-page/photo-editor/editor-page-use-cases-with-images";
import { faceRestorationFaqs } from "@/data/faqs";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: 'AI Face Restoration – Repair Blurry Faces & Revive Natural Details',
  description: 'Restore blurry or damaged faces in seconds with AI Face Restoration. Sharpen features, reduce noise, and preserve true identity for clear, natural, high-resolution photos - no editing skills required.',
  canonicalPath: '/photo-editor/face-restorer',
})

const logos = [
  "1.Instagram.png",
  "2.Facebook.png",
  "3.TikTok.png",
  "4.Youtube.png",
  "5.Pinterest.png",
  "6.X-Twitter.png",
  "7.Snapchat.png",
  "8.Behance.png",
  "9.Dribbble.png",
  "10.Flickr.png",
  "11.500Px.png",
  "12.SmugMug.png",
  "13.Shutterstock.png",
  "14.GettyImages.png"
]

const keypoints = [
  "50,000+ Faces Restored",
  "Instant Results",
  "Privacy Protected",
  "Any Photo",
  "One Click",
  "100% Guarantee",
]

export default function FaceRestorerLandingPage() {
  return (
    <main className="flex flex-col">
      <EditorPageHeroSection
        title="Restore Faces Instantly with AI - Clear, Realistic, Authentic"
        description="Bring old, blurry, or damaged photos back to life with advanced AI restoration. Recover details, enhance realism, and preserve true identity - just upload and see the instant transformation."
        imageOne="/assets/editor-page/face-restorer/1b.webp"
        imageTwo="/assets/editor-page/face-restorer/1a.png"
        trustedByText="Trusted by Thousands of Creators and Photographers"
        trustedByTexthighlight={["Thousands"]}
        category="face-restorer"
        logos={logos}
        keypoints={keypoints}
      />
      <EditorPageHowItWorks
        description="It's as easy as 1-2-3!"
        steps={[
          {
            number: "1",
            title: "Upload Your Photo",
            description:
              "Select any image from your device whether it's a scanned print, a vintage portrait, or a low-quality selfie. We support all major formats including JPG, PNG, WEBP, and HEIC.",
          },
          {
            number: "2",
            title: "Let the AI Restore Instantly",
            description:
              "Our intelligent restoration engine analyzes the face, removes blur, repairs imperfections, and rebuilds lost details while preserving natural expressions and identity.",
          },
          {
            number: "3",
            title: "Preview and Download",
            description:
              "View your restored image immediately. If desired, adjust settings like fidelity or background enhancement, then download the high-quality result for sharing or printing.",
          },
        ]}
      />
      <EditorPageWhyChoose
        items={[
          {
            title: "Restore Natural Facial Details",
            description:
              "Revive faces with sharper features, realistic skin textures, and accurate expressions all without over-smoothing.",
            ctaText: "Restore My Photo",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/face-restorer/11b.webp",
              afterSrc: "/assets/editor-page/face-restorer/11a.png",
            },
          },
          {
            title: "Preserve True Identity",
            description:
              "Our AI ensures that every restored face maintains the person's original features and expressions. Enhancements are applied with precision so the result looks authentic, not artificially altered.",
            ctaText: "Enhance My Photo",
            ctaHref: "/login",
            media: {
              kind: "slider",
              beforeSrc: "/assets/editor-page/face-restorer/6b.webp",
              afterSrc: "/assets/editor-page/face-restorer/6a.png",
            },
          },
          {
            title: "Intelligent Detail Recovery",
            description:
              "From skin texture to fine hair strands, the tool rebuilds missing details, removes blur, and reduces noise. The restoration process balances sharpness with a natural finish, avoiding over-smoothing.",
            ctaText: "Recover My Photo",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/face-restorer/10b.webp",
              afterSrc: "/assets/editor-page/face-restorer/10a.png",
            },
          },
        ]}
      />
      <EditorPageUseCasesWithImages
        title="Top Use Cases for AI Face Restoration"
        description="See how our AI-powered face restoration brings photos back to life in different scenarios. Click on each use case to explore real before and after transformations."
        useCases={[
          {
            title: "Reviving Old Family Photos",
            description:
              "Bring cherished memories back to life by repairing faded, scratched, or low-resolution portraits. Perfect for scanned prints and vintage albums.",
            beforeSrc: "/assets/editor-page/face-restorer/2b.webp",
            afterSrc: "/assets/editor-page/face-restorer/2a.png",
            useCaseSlug: "Old Family",
          },
          {
            title: "Fix Blurry Social Media Shots",
            description:
              "Upgrade pixelated selfies or group shots into clear, share-worthy images that stand out on Instagram, Facebook, or LinkedIn.",
            beforeSrc: "/assets/editor-page/face-restorer/4b.webp",
            afterSrc: "/assets/editor-page/face-restorer/4a.png",
            useCaseSlug: "Social Media",
          },
          {
            title: "Restoring Professional Headshots",
            description:
              "Make resumes, LinkedIn profiles, and company bios look their best with crisp, natural-looking faces that convey professionalism.",
            beforeSrc: "/assets/editor-page/face-restorer/3b.webp",
            afterSrc: "/assets/editor-page/face-restorer/3a.png",
            useCaseSlug: "Headshots",
          },
          {
            title: "Improve Historical Images",
            description:
              "Restore faces in historical photographs for museums, documentaries, or genealogy projects while keeping an authentic look.",
            beforeSrc: "/assets/editor-page/face-restorer/9b.jpg",
            afterSrc: "/assets/editor-page/face-restorer/9a.png",
            useCaseSlug: "Historical",
          },
          {
            title: "Enhance Security Footage",
            description:
              "Clarify low-quality surveillance stills or video frames for investigative or security purposes, while maintaining realistic details.",
            beforeSrc: "/assets/editor-page/face-restorer/7b.webp",
            afterSrc: "/assets/editor-page/face-restorer/7a.png",
            useCaseSlug: "Security",
          },
        ]}
      />
      <OldFAQSection faqData={faceRestorationFaqs}
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
