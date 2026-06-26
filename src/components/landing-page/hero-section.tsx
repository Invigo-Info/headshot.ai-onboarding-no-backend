/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import ImageTransitionCarousel from "./image-transition-carousel";
import TrustedLogos from "./trusted-logos";
import HeroCTAButton from "./hero-cta-button";

// Define professional logos array
const usedBy = [
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

const mainPoints = [
  "2,500+ Professionals",
  "15–45 mins delivery",
  "$15–$35",
  "20+ styles",
  "Unlimited backgrounds",
  "MLS-optimized",
  "Private & secure",
  "100% refund",
];

// Helper function to highlight multiple words/phrases in text
const highlightText = (
  text: string,
  highlights: string[],
  className: string = "text-blue-500",
) => {
  if (!highlights.length) return text;

  // Create regex pattern for all highlights
  const pattern = highlights
    .map((highlight) => highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  const parts = text.split(new RegExp(`(${pattern})`, "i"));

  return parts.map((part, index) => {
    const isHighlighted = highlights.some(
      (highlight) => part.toLowerCase() === highlight.toLowerCase(),
    );

    return (
      <span key={index}>
        {isHighlighted ? <span className={className}>{part}</span> : part}
      </span>
    );
  });
};

// Types
interface HeroSectionProps {
  badgeText?: string;
  title: string;
  highlight: string;
  category: string;
  logos: string[];
  keypoints: string[];
  description: string;
  trustedByText: string;
  trustedByTexthighlight: string[];
  usedByText: string;
  ctaText?: string;
  showRating?: boolean;
  ratingScore?: string;
  ratingText?: string;
}

export default function HeroSection({
  badgeText = defaultProps.badgeText || "4.9/5 from 2,000+ reviews",
  title = defaultProps.title,
  highlight = defaultProps.highlight,
  category = defaultProps.category,
  logos = defaultProps.logos,
  keypoints = defaultProps.keypoints,
  description = defaultProps.description,
  trustedByText = defaultProps.trustedByText,
  trustedByTexthighlight = defaultProps.trustedByTexthighlight,
  usedByText = defaultProps.usedByText,
  ctaText = defaultProps.ctaText || "Create My Headshots Now",
  showRating = defaultProps.showRating || false,
  ratingScore = defaultProps.ratingScore || "4.9/5",
  ratingText = defaultProps.ratingText || "Average Rating",
}: HeroSectionProps) {
  return (
    <div className="w-full flex flex-col bg-gradient-to-b from-blue-50/80 via-blue-50/30 to-white overflow-hidden ">
      {/* Hero Content */}
      <main className="container mx-auto px-4 pt-6 text-center pb-0 space-y-6 mb-6">
        {/* Top Badge */}
        <div className="flex justify-center pt-6 sm:pt-10">
          {/* <Badge
            variant="secondary"
            className="bg-blue-50 border-blue-200 text-black px-2 xs:px-4 py-2 text-sm sm:text-base font-semibold"
          >
            💙 {badgeText}
          </Badge> */}

          <Badge className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-500 shadow-sm ring-1 ring-blue-100 sm:text-sm">
            <span className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </span>
            {badgeText ? "" + badgeText : "4.9/5 from 2,000+ reviews"}
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl xs:text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-gray-900 max-w-4xl mx-auto">
          {highlightText(title, [highlight], "text-blue-500")}
        </h1>

        {/* Subtitle */}
        <p
          className="text-base xs:text-lg sm:text-xl font-medium text-gray-600 max-w-3xl mx-auto leading-relaxed
        "
        >
          {description}
        </p>

        {/* CTA Button */}
        <HeroCTAButton ctaText={ctaText} category={category} />

        <div className="flex flex-col items-center justify-center overflow-x-scroll lg:overflow-x-hidden no-scrollbar w-full">
          <div className="flex w-fit justify-start lg:justify-center items-center gap-4 mx-auto lg:flex-wrap">
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
      </main>

      {/* Marquee Section */}

      <ImageTransitionCarousel category={category} />

      {/* Trust Section */}
      <div className="text-center my-8 container mx-auto px-4 pb-8 space-y-8">
        <p className="text-base sm:text-lg text-gray-700">
          {highlightText(
            trustedByText,
            trustedByTexthighlight,
            "text-blue-500 font-bold",
          )}
        </p>
        <p className="text-base sm:text-lg text-gray-500 font-semibold">
          {usedByText}
        </p>

        {/* Company Logos */}
        <TrustedLogos logos={logos} category={category} />

        {/* Verified Rating */}
        {showRating && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-500 text-yellow-500"
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Verified</span>
              <span className="text-blue-600 font-bold">{ratingScore}</span>
              <span className="text-gray-700">{ratingText}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const defaultProps: HeroSectionProps = {
  title: "Professional Headshots in minutes - No studio needed",
  highlight: "Headshots",
  category: "professional",
  logos: usedBy,
  keypoints: mainPoints,
  description:
    "Stand out on resumes, job portals, and team bios with our polished AI-generated headshots. No need to dress up-our AI styles your look and background professionally, with results ready in under 15 minutes.",
  trustedByText:
    "Trusted by over 1,000,000 professionals and teams. 25,000,000+ headshots generated to date.",
  trustedByTexthighlight: ["1,000,000", "teams", "25,000,000+"],
  usedByText: "Used by professionals at",
  showRating: false,
  ratingScore: "4.9/5",
  ratingText: "Average Rating",
};
