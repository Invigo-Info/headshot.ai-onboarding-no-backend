"use client";
import { Badge } from "@/components/ui/badge";
import TrustedLogos from "../trusted-logos";
import { Star } from "lucide-react";

// Define synchronized image pairs

const logos = [
  "1.LinkedIn.png",
  "2.Indeed.png",
  "3.GlassDoor.png",
  "4.UpWork.png",
  "5.Fiverr.png",
  "6.Github.png",
  "7.AngelList-Venture.png",
  "8.Behance.png",
  "9.Dribbble.png",
  "10.Zoom.png",
  "11.Microsoft-Team.png",
  "12.Slack.png",
  "13.Google-WorkSpace.png",
  "14.BambooHR.png",
  "15.WorkDay.png",
  "16.ADP.png",
  "17.Gusto.png",
  "18.Monday.com.png",
  "19.Asana.png",
  "20.Trello.png",
  "21.Notion.png",
  "22.Wllfound.png",
];

export default function ReviewsHeroSection() {
  return (
    <div className="w-full flex flex-col bg-gradient-to-t from-blue-100/30 to-white pb-32">
      {/* Hero Content */}
      <main className="container mx-auto px-4 pt-4 text-center pb-0">
        {/* Top Badge */}

        <div className="flex justify-center mb-8 mt-2">
          <Badge className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-500 shadow-sm ring-1 ring-blue-100 sm:text-sm">
            💙 #1 AI HEADSHOT GENERATOR
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl xs:text-4xl md:text-5xl font-semibold tracking-tighter leading-tight text-gray-900 mb-4 max-w-4xl mx-auto">
          Trusted by
          <span className="bg-gradient-to-r from-blue-500 to-blue-400 text-transparent bg-clip-text inline-block">
            &nbsp;100,000+
          </span>
          &nbsp;Professionals
        </h1>

        {/* Subtitle */}
        <p className="text-sm xs:text-base sm:text-lg md:text-lg font-medium text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
          Real stories from people who transformed their first impression in
          just{" "}
          <span className="bg-gradient-to-r from-blue-500 to-blue-400 text-transparent bg-clip-text inline-block">
            15 minutes
          </span>
          .
        </p>
      </main>

      {/* Marquee Section */}

      {/* Trust Section */}
      <div className="text-center my-8 container mx-auto px-4">
        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-8">
          Over <span className="text-blue-500">7,200,000+</span> AI headshots
          generated for <span className="text-blue-500">133,000+</span>{" "}
          professionals.
        </p>
        {/* <p className="text-base sm:text-lg text-gray-500 mb-4 font-semibold">{usedByText}</p> */}
        {/* Company Logos */}
        <p className="text-gray-400 font-medium">
          Used by professionals everywhere
        </p>
        <TrustedLogos logos={logos} category={"professional"} />

        <div className="flex items-center justify-center space-x-2 space-y-2 flex-col sm:flex-row p-3 px-6 bg-yellow-50 border border-yellow-200 w-fit rounded-md mx-auto">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-500 text-yellow-500"
              />
            ))}
          </div>
          <span className="text-gray-700">
            Verified <strong>4.9/5</strong> Average Rating
          </span>
        </div>
      </div>
    </div>
  );
}
