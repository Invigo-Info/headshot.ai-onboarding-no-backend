import EditorFeaturesSection from "@/components/landing-page/editor-features";
import { OldFAQSection } from "@/components/landing-page/old-faq-section";
import EditorPageHeroSection from "@/components/landing-page/photo-editor/editor-page-hero-section";
import EditorPageHowItWorks from "@/components/landing-page/photo-editor/editor-page-how-it-works";
import EditorPageWhyChoose, { WhyChooseItem } from "@/components/landing-page/photo-editor/editor-page-why-choose";
import DiscoverMoreBackgrounds from "@/components/landing-page/photo-editor/background-changer/discover-more-backgrounds";
import { backgroundChangerFaqs } from "@/data/faqs";

import { createPageMetadata } from "@/lib/seo";

const logos = [
  "1.LinkedIn.png",
"2.Instagram.png",
"3.Youtube.png",
"4.TikTok.png",
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
"18.UpWork.png",
"19.Fiverr.png",
"20.Flickr.png",
"21.500Px.png",
"22.SmugMug.png",
"23.Photobucket.png"
];

const keypoints = [
  "75,000+ Backgrounds Changed",
  "Done in Seconds",
  "Privacy Protected",
  "Works on Any Photo",
  "No Editing Skills",
]

const howItWorksSteps = [
  {
    number: "1",
    title: "Upload Your Photo",
    description:
      "Select the image you'd like to enhance-just drag and drop or upload from your device. We support PNG, JPG, HEIC, and WEBP formats in all common dimensions.",
  },
  {
    number: "2",
    title: "Pick a Background",
    description:
      "Our smart AI instantly detects the subject in your photo, removes the existing background, and gives you access to a variety of curated backdrops to choose from - Solid Colors, Studio Light, Dark Studio Light, Abstract, City, Nature and Office",
  },
  {
    number: "3",
    title: "Save Your New Image",
    description:
      "In just seconds, your updated photo is ready. Review the preview and download a high-resolution version to use anywhere you like.",
  },
]

const whyChooseItems: WhyChooseItem[] = [
          {
            title: "Make Your Headshots Stand Out",
            description:
              "Ditch dull and distracting backgrounds. Our AI-powered tool transforms ordinary headshots into polished, professional visuals by placing your subject in high-quality, eye-catching settings-perfect for resumes, LinkedIn, portfolios, and more.",
            ctaText: "update background",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/background-changer/2a.jpg",
              afterSrc: "/assets/editor-page/background-changer/2b.webp",
            },
          },

          {
            title: "Backgrounds That Match Your Brand",
            description:
              "Every background tells a story. Choose from curated backdrops-professional, creative, or natural-that align with your personal brand, industry, and goals.",
            ctaText: "Try It Now",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/background-changer/4a.jpg",
              afterSrc: "/assets/editor-page/background-changer/4b.webp",
            },
          },
          {
            title: "Create in Seconds, Not Hours",
            description:
              "No need for complex editing tools. With just a few clicks, our AI does the work-so you can generate multiple polished versions in minutes. Fast, flexible, and stress-free.",
            ctaText: "Try It Now",
            ctaHref: "/login",
            media: {
              kind: "collage4",
              images: [
                "/assets/editor-page/background-changer/6a.jpg",
                "/assets/editor-page/background-changer/6b.webp",
                "/assets/editor-page/background-changer/5a.jpg",
                "/assets/editor-page/background-changer/5b.webp",
              ],
            },
          },
          {
            title: "Secure & Hassle-Free",
            description:
              "Upload with confidence. Your photos are processed securely, never used for AI training, and remain private-so you control your images and protect your identity.",
            ctaText: "Try It Now",
            ctaHref: "/login",
            media: {
              kind: "beforeAfter",
              beforeSrc: "/assets/editor-page/background-changer/7a.jpg",
              afterSrc: "/assets/editor-page/background-changer/7b.webp",
            },
          },
        ]
 
export const metadata = createPageMetadata({
  title: 'AI Background Changer – Remove & Replace Photo Backgrounds Instantly',
  description: 'Change photo backgrounds in seconds with AI Background Changer. Remove distractions and replace them with professional backdrops - solid colors, studio, nature, city, office, and more - no editing skills required.',
  canonicalPath: '/photo-editor/background-changer',
})


export default function BackgroundChangerLandingPage() {
  return (
    <main className="flex flex-col">
      <EditorPageHeroSection
        title="Instantly Remove & Replace Backgrounds with AI"
        description="Easily remove or replace photo backgrounds using our smart AI tool. Choose from a range of preset styles or solid colors. no manual editing skills required."
        imageOne="/assets/editor-page/background-changer/1a.jpg"
        imageTwo="/assets/editor-page/background-changer/1b.webp"
        trustedByText="Trusted by Thousands of Creators Worldwide"
        trustedByTexthighlight={["Creators"]}
        category="background-changer"
        logos={logos}
        keypoints={keypoints}
      />
      <DiscoverMoreBackgrounds />
      <EditorPageHowItWorks
        steps={howItWorksSteps}
        description="It’s as easy as 1-2-3!"
      />
      <EditorPageWhyChoose
        items={whyChooseItems}
      />
      <OldFAQSection faqData={backgroundChangerFaqs}
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
