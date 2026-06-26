import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import PhotoEditorComparePanel from "./photo-editor-compare-panel";
import TrustedLogos from "@/components/landing-page/trusted-logos";

const usedBy = [
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

const keypoints = [
  "150,000+ Photo Edits",
  "Done in Seconds",
  "Privacy Protected",
  "Works on Any Photo",
  "No Editing Skills",
];

const PhotoEditorHeroSection = () => {
  return (
    <div className="relative flex flex-col items-center overflow-hidden ">
      <div className="w-full flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 py-8 xl:py-0 px-4 xs:px-8 sm:px-12 md:px-16 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
          {/* Top Badge */}
          <Badge
            variant="secondary"
            className="flex items-center gap-1.5 rounded-[12px] bg-blue-50 border-blue-200 text-black px-4 py-2 text-xs sm:text-sm md:text-base font-semibold uppercase mb-4"
          >
            💙 THE #1 RANKED AI PHOTO EDITOR
          </Badge>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold tracking-tight leading-tight text-gray-900 mb-4">
            Smart AI Photo Editing, Transform Your Images Instantly
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-700 mb-4 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Edit, enhance, and perfect your photos in just a few clicks. Whether
            you’re cleaning up imperfections, replacing backgrounds, or
            restoring memories, our AI tools make professional-level editing
            accessible to everyone. no professional editing skills required!
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white p-6 sm:p-8 !px-12 text-lg font-semibold rounded-lg mb-4 transition-all duration-200 shadow-lg hover:shadow-xl"
            asChild
          >
            <Link href="/login">
              Start Editing Now
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>

          <div className="flex flex-col items-center justify-center overflow-x-scroll lg:overflow-x-hidden no-scrollbar w-full">
            <div className="flex w-fit justify-start items-center gap-4 mx-auto lg:flex-wrap">
              {keypoints.map((point, index) => (
                <div
                  key={index}
                  className="whitespace-nowrap flex items-center gap-2"
                >
                  <Check className="size-4 text-green-600" />
                  <span className="font-medium text-gray-700 text-sm md:text-base">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Before/After Cards */}
        <PhotoEditorComparePanel />
      </div>
      {/* Logos row - simplified placeholder */}
      <div className="text-center my-8 sm:my-12 container mx-auto px-4">
        <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-8 font-semibold">
          Trusted by Thousands of
          <span className="text-blue-600 font-semibold">
            &nbsp;Professionals & Creators&nbsp;
          </span>{" "}
          Worldwide
        </p>

        {/* Company Logos */}
        {/* <div className="flex justify-center items-center gap-8 opacity-60 flex-wrap">
          <div className="text-gray-500 font-bold">ESSENCE</div>
          <div className="text-gray-500 font-bold">EXANTE</div>
          <div className="text-gray-500 font-bold">FOODCHAIN</div>
          <div className="text-gray-500 font-bold">Carnikar</div>
          <div className="text-gray-500 font-bold">WOKISA</div>
          <div className="text-gray-500 font-bold">InContext</div>
          <div className="text-gray-500 font-bold">LEHIONEN</div>
          <div className="text-gray-500 font-bold">Lenovo</div>
        </div> */}
        <TrustedLogos logos={usedBy}  category="photo-editor" editorPage={true} />
      </div>
    </div>
  );
};

export default PhotoEditorHeroSection;
