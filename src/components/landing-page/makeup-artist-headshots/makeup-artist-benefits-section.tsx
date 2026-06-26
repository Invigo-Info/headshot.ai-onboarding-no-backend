"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Linkedin,
  // Building2,
  Megaphone,
  // Calendar,
  Instagram,
  // MapPin,
  // Sparkles,
  CalendarCheck,
} from "lucide-react";

// --- Visual Mockups (Mini-components for the "small supporting visuals") ---

const OnlineProfilesVisual = () => (
  <div className="relative w-full max-w-[90%] aspect-[5/3] mx-auto mt-4">
    {/* Firm Bio Page Mockup */}
    <div className="absolute left-0 bottom-0 w-[45%] h-[90%] bg-white border border-gray-200 rounded-lg shadow-md flex flex-col p-3 transition-transform duration-300 hover:-translate-y-1">
      <div className="w-full h-2 bg-gray-100 mb-2 rounded-sm" />
      <div className="flex gap-2">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-md shrink-0" />
        <div className="space-y-1.5 w-full">
          <div className="w-full h-1.5 bg-gray-100 rounded-sm" />
          <div className="w-2/3 h-1.5 bg-gray-100 rounded-sm" />
          <div className="w-full h-1.5 bg-gray-100 rounded-sm" />
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="w-full h-1.5 bg-gray-50 rounded-sm" />
        <div className="w-full h-1.5 bg-gray-50 rounded-sm" />
        <div className="w-4/5 h-1.5 bg-gray-50 rounded-sm" />
      </div>
    </div>

    {/* LinkedIn Mockup */}
    <div className="absolute right-0 top-4 w-[60%] h-[60%] bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col p-4 z-10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-600 shrink-0" />
        <div className="space-y-2 w-full">
          <div className="w-3/4 h-2.5 bg-gray-200 rounded-sm" />
          <div className="w-1/2 h-2 bg-gray-100 rounded-sm" />
        </div>
        <Linkedin className="w-5 h-5 text-blue-600 ml-auto self-start" />
      </div>
      <div className="mt-4 space-y-1.5">
        <div className="w-full h-1.5 bg-gray-100 rounded-sm" />
        <div className="w-5/6 h-1.5 bg-gray-100 rounded-sm" />
      </div>
    </div>
  </div>
);

const ClientTouchpointsVisual = () => (
  <div className="relative w-full max-w-[90%] aspect-[5/3] mx-auto mt-4 flex items-center justify-center">
    {/* Email Signature */}
    <div className="w-[90%] bg-white border border-gray-200 rounded-lg shadow-md p-4 flex items-center gap-3 relative z-0 transition-transform duration-300 hover:scale-[1.02]">
      <div className="w-12 h-12 rounded-full bg-purple-100 shrink-0" />
      <div className="space-y-2 w-full">
        <div className="w-3/4 h-2 bg-gray-800 rounded-sm" />
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 opacity-50" />
        </div>
      </div>
    </div>

    {/* ID Card */}
    <div className="absolute -bottom-2 -right-0 w-[45%] aspect-[1.6] bg-white border border-gray-200 rounded-lg shadow-lg rotate-[-5deg] p-2 flex gap-2 items-center transition-transform duration-300 hover:rotate-0 hover:scale-105">
      <div className="w-1/3 h-full bg-purple-50 rounded-sm shrink-0" />
      <div className="space-y-1.5 w-full">
        <div className="w-full h-1.5 bg-gray-300 rounded-sm" />
        <div className="w-2/3 h-1.5 bg-gray-200 rounded-sm" />
      </div>
    </div>
  </div>
);

const MarketingVisual = () => (
  <div className="flex gap-4 items-center justify-center mt-4 w-full max-w-[90%] mx-auto">
    {/* Business Card 1 */}
    <div className="w-[48%] aspect-[1.6] bg-white border border-gray-200 rounded-lg shadow-md p-3 flex flex-col justify-center items-center gap-2 transition-transform duration-300 hover:-translate-y-1">
      <div className="w-10 h-10 rounded-full bg-green-500" />
      <div className="w-2/3 h-2 bg-gray-200 rounded-sm" />
    </div>

    {/* Business Card 2 */}
    <div className="w-[48%] aspect-[1.6] bg-white border border-gray-200 rounded-lg shadow-md p-3 flex flex-col justify-center items-center gap-2 transition-transform duration-300 hover:-translate-y-1 delay-75">
      <div className="w-10 h-10 rounded-full bg-green-500" />
      <div className="w-2/3 h-2 bg-gray-200 rounded-sm" />
    </div>
  </div>
);

// --- Main Component ---

interface BenefitsSectionProps {
  // Keeping props generic if needed
  title?: string;
  highlight: string;
  description?: string;
}

export const categories = [
  {
    title: "Social Media & Online Profiles",
    icon: <Instagram className="w-6 h-6 text-blue-600" />,
    headerIconBg: "bg-blue-100",
    content: [
      {
        label: "Instagram & TikTok",
        text: "Your profile photo is the first thing potential clients see. A polished headshot helps you stand out in a sea of beauty accounts and builds instant credibility.",
      },
      {
        label: "Facebook & Pinterest",
        text: "Clients often find MUAs through social search. A professional photo makes your profile look trustworthy and worth clicking.",
      },
      {
        label: "WhatsApp Business & DMs",
        text: "Most client conversations happen in DMs. A professional profile photo builds trust before you even reply.",
      },
    ],
    Visual: OnlineProfilesVisual,
  },
  {
    title: "Booking Platforms & Directories",
    icon: <CalendarCheck className="w-6 h-6 text-purple-600" />,
    headerIconBg: "bg-purple-100",
    content: [
      {
        label: "StyleSeat, Vagaro & GlossGenius",
        text: "Clients scroll through dozens of MUAs before booking. A sharp, trustworthy headshot helps you get picked over the competition.",
      },
      {
        label: "The Knot & WeddingWire",
        text: "Brides spend hours researching vendors. A professional photo makes you look established and worth the investment.",
      },
      {
        label: "Thumbtack, Yelp & Google Business",
        text: "Stand out in local search results with a headshot that looks polished and approachable — not like a random selfie.",
      },
    ],
    Visual: ClientTouchpointsVisual,
  },
  {
    title: "Marketing, Networking & Brand Opportunities",
    icon: <Megaphone className="w-6 h-6 text-green-600" />,
    headerIconBg: "bg-green-100",
    content: [
      {
        label: "Business Cards & Rate Cards",
        text: "Hand clients something memorable. A professional headshot reinforces your brand long after the appointment ends.",
      },
      {
        label: "Portfolio Website & About Page",
        text: 'Your "About Me" page needs a photo that matches the quality of your work. Show clients the artist behind the artistry.',
      },
      {
        label: "Referrals & Word-of-Mouth",
        text: "When past clients share your info, a polished headshot makes you look credible to their friends and family.",
      },
      {
        label: "Salon, Spa Teams & Brand Collaborations",
        text: "Whether you're on a salon team page or pitching to beauty brands, a high-quality headshot shows you're serious and ready to represent.",
      },
    ],
    Visual: MarketingVisual,
  },
];

const blackAndWhiteBenefitsSection = ({
  title = "Get up to 3× More Client Trust and Inquiries",
  highlight = "3× More",
  description = "Use our architect headshots to stand out everywhere clients see you-so more people notice you, trust you faster, and reach out.",
}: BenefitsSectionProps) => {
  return (
    <div className="px-4 max-w-full sm:max-w-[90%] mx-auto">
      <div className="">
        <div className="text-left space-y-4 mb-16">
          {/* <Badge
            variant="outline"
            className="text-blue-600 border-blue-200 bg-blue-100 uppercase text-sm font-semibold px-4 py-1"
          >
            <Sparkle className="size-4 mr-2 fill-blue-500" /> BENEFITS
          </Badge> */}

          <span className="text-sm sm:text-base font-semibold uppercase tracking-wider text-gray-500 block">
            USE CASES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont leading-tight">
            {(() => {
              const lowerHighlight = highlight.toLowerCase();
              const parts = title.split(
                new RegExp(
                  `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                  "i",
                ),
              );

              return parts.map((part, index) => (
                <span key={index}>
                  {part.toLowerCase() === lowerHighlight ? (
                    <span className={"text-blue-500 relative"}>
                      {part}{" "}
                      {/* <motion.div
                      className={`absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-1 bg-blue-200 rounded-full`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    /> */}
                    </span>
                  ) : (
                    part
                  )}
                </span>
              ));
            })()}
          </h2>

          {/* <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mont text-gray-900 leading-tight">
            {(() => {
              const lowerHighlight = highlight.toLowerCase();
              const parts = title.split(
                new RegExp(
                  `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                  "i"
                )
              );

              return parts.map((part, index) => (
                <span key={index}>
                  {part.toLowerCase() === lowerHighlight ? (
                    <span className={"text-blue-600"}>{part}</span>
                  ) : (
                    part
                  )}
                </span>
              ));
            })()}
          </h2> */}

          <p className="text-gray-600 text-base xs:text-lg sm:text-xl max-w-3xl xl:max-w-full">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            // const VisualComponent = category.Visual;
            return (
              <Card
                key={index}
                className="border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full bg-white"
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Icon Header */}
                  <div
                    className={`w-12 h-12 rounded-lg ${category.headerIconBg} flex items-center justify-center mb-6`}
                  >
                    {category.icon}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    {category.title}
                  </h3>

                  <ul className="space-y-6 flex-grow">
                    {category.content.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <div>
                          <span className="font-medium text-gray-900 block mb-1">
                            {item.label}
                          </span>
                          <span className="text-gray-600 text-sm leading-relaxed block">
                            {item.text}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Spacer to push visuals to bottom */}
                  {/* <div className="flex items-center justify-center">
                    <VisualComponent />
                  </div> */}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default blackAndWhiteBenefitsSection;
