import BackgroundSubPageHeroSection from "@/components/landing-page/photo-editor/background-changer/background-sub-page-hero-section";
import DiscoverMoreBackgrounds from "@/components/landing-page/photo-editor/background-changer/discover-more-backgrounds";
import EditorPageHowItWorks from "@/components/landing-page/photo-editor/editor-page-how-it-works";
import EditorPageWhyChoose from "@/components/landing-page/photo-editor/editor-page-why-choose";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import {
  blackBackgroundHowItWorks,
  purpleBackgroundHowItWorks,
  grayBackgroundHowItWorks,
  whiteBackgroundHowItWorks,
  blueBackgroundHowItWorks,
  yellowBackgroundHowItWorks,
  greenBackgroundHowItWorks,
  brownBackgroundHowItWorks,
  pinkBackgroundHowItWorks,
} from "./how-it-works-data";
import {
  blackBackgroundWhyChoose,
  purpleBackgroundWhyChoose,
  grayBackgroundWhyChoose,
  whiteBackgroundWhyChoose,
  blueBackgroundWhyChoose,
  yellowBackgroundWhyChoose,
  greenBackgroundWhyChoose,
  brownBackgroundWhyChoose,
  pinkBackgroundWhyChoose,
} from "./why-choose-data";
import {
  blackBackgroundFaqs,
  purpleBackgroundFaqs,
  grayBackgroundFaqs,
  whiteBackgroundFaqs,
  blueBackgroundFaqs,
  yellowBackgroundFaqs,
  greenBackgroundFaqs,
  brownBackgroundFaqs,
  pinkBackgroundFaqs,
} from "./background-faqs";
import {
  blackBackgroundKeypoints,
  purpleBackgroundKeypoints,
  grayBackgroundKeypoints,
  whiteBackgroundKeypoints,
  blueBackgroundKeypoints,
  yellowBackgroundKeypoints,
  greenBackgroundKeypoints,
  brownBackgroundKeypoints,
  pinkBackgroundKeypoints,
} from "./keypoints-data";
import EditorFeaturesSection from "@/components/landing-page/editor-features";
import { OldFAQSection } from "@/components/landing-page/old-faq-section";

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
  "23.Photobucket.png",
];

const allowedBackgrounds = [
  "black-background",
  "blue-background",
  "brown-background",
  "gray-background",
  "green-background",
  "pink-background",
  "purple-background",
  "white-background",
  "yellow-background",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ background: string }>;
}): Promise<Metadata> {
  const { background } = await params;
  const formattedName = background
    .replace(/-background$/, "")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return createPageMetadata({
    title: `${formattedName} Background Photo Editor - Change Photo Background | Headshot.AI`,
    description: `Change your photo background to ${formattedName.toLowerCase()} instantly with AI. Remove your current background and replace it with a clean ${formattedName.toLowerCase()} backdrop - no editing skills required.`,
    canonicalPath: `/photo-editor/background-changer/${background}`,
  });
}

export function generateStaticParams() {
  return allowedBackgrounds.map((background) => ({
    background: background,
  }));
}

const getHowItWorksSteps = (background: string) => {
  switch (background) {
    case "purple-background":
      return purpleBackgroundHowItWorks;
    case "gray-background":
      return grayBackgroundHowItWorks;
    case "white-background":
      return whiteBackgroundHowItWorks;
    case "blue-background":
      return blueBackgroundHowItWorks;
    case "yellow-background":
      return yellowBackgroundHowItWorks;
    case "green-background":
      return greenBackgroundHowItWorks;
    case "black-background":
      return blackBackgroundHowItWorks;
    case "brown-background":
      return brownBackgroundHowItWorks;
    case "pink-background":
      return pinkBackgroundHowItWorks;
    case "background-changer":
      return blackBackgroundHowItWorks;
    default:
      return blackBackgroundHowItWorks;
  }
};

const getWhyChooseItems = (background: string) => {
  switch (background) {
    case "purple-background":
      return purpleBackgroundWhyChoose(background);
    case "gray-background":
      return grayBackgroundWhyChoose(background);
    case "white-background":
      return whiteBackgroundWhyChoose(background);
    case "blue-background":
      return blueBackgroundWhyChoose(background);
    case "yellow-background":
      return yellowBackgroundWhyChoose(background);
    case "green-background":
      return greenBackgroundWhyChoose(background);
    case "black-background":
      return blackBackgroundWhyChoose(background);
    case "brown-background":
      return brownBackgroundWhyChoose(background);
    case "pink-background":
      return pinkBackgroundWhyChoose(background);
    default:
      return blackBackgroundWhyChoose(background);
  }
};

const getKeypoints = (background: string) => {
  switch (background) {
    case "purple-background":
      return purpleBackgroundKeypoints;
    case "gray-background":
      return grayBackgroundKeypoints;
    case "white-background":
      return whiteBackgroundKeypoints;
    case "blue-background":
      return blueBackgroundKeypoints;
    case "yellow-background":
      return yellowBackgroundKeypoints;
    case "green-background":
      return greenBackgroundKeypoints;
    case "black-background":
      return blackBackgroundKeypoints;
    case "brown-background":
      return brownBackgroundKeypoints;
    case "pink-background":
      return pinkBackgroundKeypoints;
    default:
      return blackBackgroundKeypoints;
  }
};

const getFaqs = (background: string) => {
  switch (background) {
    case "purple-background":
      return purpleBackgroundFaqs;
    case "gray-background":
      return grayBackgroundFaqs;
    case "white-background":
      return whiteBackgroundFaqs;
    case "blue-background":
      return blueBackgroundFaqs;
    case "yellow-background":
      return yellowBackgroundFaqs;
    case "green-background":
      return greenBackgroundFaqs;
    case "black-background":
      return blackBackgroundFaqs;
    case "brown-background":
      return brownBackgroundFaqs;
    case "pink-background":
      return pinkBackgroundFaqs;
    default:
      return blackBackgroundFaqs;
  }
};

const getTitle = (background: string) => {
  switch (background) {
    case "purple-background":
      return "AI Purple Background Changer – Add Stylish, Modern Backdrops";
    case "gray-background":
      return "AI Grey Background Changer – Add Neutral, Professional Backdrops";
    case "white-background":
      return "AI White Background Changer – Add Clean, Modern Backdrops Instantly";
    case "blue-background":
      return "AI Blue Background Changer – Add Crisp Blue Backdrops Instantly";
    case "yellow-background":
      return "AI Yellow Background Changer – Add Bright, Eye-Catching Backdrops";
    case "green-background":
      return "AI Green Background Changer – Add Fresh, Clean Backdrops Instantly";
    case "black-background":
      return "AI Black Background Changer – Add Sleek, Professional Backdrops";
    case "brown-background":
      return "AI Brown Background Changer – Add Warm, Natural Backdrops";
    case "pink-background":
      return "AI Pink Background Changer – Add Trendy, Creative Backdrops";
    default:
      return "Background Changer";
  }
};

const getDescription = (background: string) => {
  switch (background) {
    case "purple-background":
      return "Add a bold purple background to your photos instantly. Replace distractions and create stylish, high-resolution images for fashion or branding.";
    case "gray-background":
      return "Instantly replace messy backdrops with a sleek grey background. Add a modern, professional look for LinkedIn, business, or product photos.";
    case "white-background":
      return "Replace cluttered backdrops with a flawless white background. Add clarity and create polished photos for e-commerce, resumes, and headshots.";
    case "blue-background":
      return "Instantly replace dull backdrops with a sharp blue background. Create vibrant, high-resolution photos for portraits, products, and social media.";
    case "yellow-background":
      return "Instantly replace backdrops with a bold yellow background. Add energy and make subjects pop with high-resolution, professional-quality images.";
    case "green-background":
      return "Add a vibrant green background instantly with AI. Replace messy backdrops and get crisp, high-quality photos for portraits, products, and branding.";
    case "black-background":
      return "Add a sleek black background to your photos in seconds. Replace distractions and download polished, high-resolution results instantly.";
    case "brown-background":
      return "Add a polished brown background to any photo instantly. Replace cluttered backdrops and create warm, professional, high-resolution images.";
    case "pink-background":
      return "Instantly add a pink background to any photo. Choose light pink, hot pink, or custom shades for stylish, professional results - no skills needed.";
    default:
      return "Change or remove the background of your photo with our AI-powered tool. Just upload your photo and let our editor handle the rest.";
  }
};

export default async function BackgroundChangerSubPage(props: {
  params: Promise<{ background: string }>;
}) {
  const params = await props.params;
  const background = params.background;

  if (!allowedBackgrounds.includes(background)) {
    return notFound();
  }

  return (
    <div className="flex flex-col">
      <BackgroundSubPageHeroSection
        title={getTitle(background)}
        description={getDescription(background)}
        background={background.replace("-background", "")}
        keypoints={getKeypoints(background)}
        logos={logos}
        trustedByText="Trusted by Thousands of Creators Worldwide"
        trustedByTexthighlight={["Creators"]}
      />
      <DiscoverMoreBackgrounds />
      <EditorPageHowItWorks steps={getHowItWorksSteps(background)} description="It’s as easy as 1-2-3!" />

      <EditorPageWhyChoose
        title={`Why choose our ${background.replace(
          "-background",
          ""
        )} background changer?`}
        items={getWhyChooseItems(background)}
      />
      <OldFAQSection
        faqData={getFaqs(background)}
        title="Got a Question? We’re Here to Help Anytime"
        highlight="Got a Question?"
        description="Your satisfaction is our top priority. If you don’t find the answer here, our support team is always ready to help you get the most out of this tool."
      />
      <EditorFeaturesSection
        title="Discover More AI Photo Editing Tools"
        highlight="AI Photo Editing Tools"
        description="Take your photos to the next level with our smart, easy to use editing tools designed to enhance every detail."
      />
    </div>
  );
}
