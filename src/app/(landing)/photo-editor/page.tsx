import EditorFeaturesSection from "@/components/landing-page/editor-features";
import PhotoEditorHeroSection from "@/components/landing-page/photo-editor/main/photo-editor-hero-section";
import PhotoEditorOurAIFeatures from "@/components/landing-page/photo-editor/main/photo-editor-our-ai-features";
import { photoEditorFaqs } from "@/data/faqs";
import React from "react";
import PhotoEditorReviews from "@/components/landing-page/photo-editor/main/photo-editor-reviews";

import { OldFAQSection } from "@/components/landing-page/old-faq-section";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: 'AI Photo Editor – Edit, Enhance & Restore Photos Instantly',
  description: 'Instantly edit, enhance, and restore photos with AI. Remove objects, change backgrounds, fix imperfections, and upscale images - no editing skills needed.',
  canonicalPath: '/photo-editor',
})

const PhotoEditorLandingPage = () => {
  return (
    <main className="flex flex-col">
      <PhotoEditorHeroSection />
      <PhotoEditorOurAIFeatures />
      <PhotoEditorReviews />
      <EditorFeaturesSection 
      title="Discover More AI Photo Editing Tools"
      highlight="Photo Editing Tools"
      description="Take your photos to the next level with our smart, easy to use editing tools designed to enhance every detail."
      />
      <OldFAQSection faqData={photoEditorFaqs}
      title="Got a Question? We’re Here to Help Anytime"
      highlight="Got a Question?"
      description="Your satisfaction is our top priority. If you don’t find the answer here, our support team is always ready to help you get the most out of this tool."
      />
    </main>
  );
};

export default PhotoEditorLandingPage;
