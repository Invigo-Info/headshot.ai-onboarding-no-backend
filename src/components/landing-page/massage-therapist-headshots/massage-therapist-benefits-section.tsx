"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Linkedin, Megaphone, Heart } from "lucide-react";

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

const categories = [
  {
    title: "Online Profiles & Booking Platforms",
    icon: <Monitor className="w-6 h-6 text-blue-600" />,
    headerIconBg: "bg-blue-100",
    content: [
      {
        label: "Spa & Practice Websites",
        text: "Highlight your expertise with a clean, calming photo on your website, bio page, and team pages that makes clients feel comfortable before they even walk in.",
      },
      {
        label: "Google Business & Yelp",
        text: "Stand out in local search results with a warm, professional image that builds trust and gets more clicks than a logo or empty profile.",
      },
      {
        label: "MassageBook, Mindbody, Vagaro & Schedulicity",
        text: "Look polished on every booking platform where clients compare therapists. A professional headshot helps you get picked over the competition.",
      },
      {
        label: "AMTA & ABMP Directory Listings",
        text: "Make your association directory profile stand out with a credible, professional photo that attracts referrals.",
      },
    ],
    Visual: OnlineProfilesVisual,
  },
  {
    title: "Client Trust & First Impressions",
    icon: <Heart className="w-6 h-6 text-purple-600" />,
    headerIconBg: "bg-purple-100",
    content: [
      {
        label: "Online Booking Pages",
        text: "Put a face to your name on your booking page so new clients feel comfortable scheduling their first appointment with you.",
      },
      {
        label: "Social Media Profiles",
        text: "Use a consistent, professional photo across Instagram, Facebook, and LinkedIn to build recognition and trust with potential clients.",
      },
      {
        label: "Thumbtack, Nextdoor & Local Service Apps",
        text: "Get more inquiries on local service platforms where clients choose based on photos and reviews. A great headshot makes the difference.",
      },
    ],
    Visual: ClientTouchpointsVisual,
  },
  {
    title: "Marketing & Professional Growth",
    icon: <Megaphone className="w-6 h-6 text-green-600" />,
    headerIconBg: "bg-green-100",
    content: [
      {
        label: "Business Cards & Printed Materials",
        text: "Upgrade business cards, rack cards, and spa brochures with one polished photo that looks professional everywhere.",
      },
      {
        label: "Gift Certificates & Promotional Materials",
        text: "Add a personal touch to gift certificates, flyers, and special offers so clients connect your face with your services.",
      },
      {
        label: "Job Applications & Spa Interviews",
        text: "Include a professional headshot with résumés and applications when applying to spas, wellness centers, or cruise lines.",
      },
      {
        label: "AMTA/ABMP Profiles & CE Courses",
        text: "Look polished on your professional association profiles and continuing education submissions.",
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

          <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block">
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

        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category, index) => {
            // const VisualComponent = category.Visual;
            return (
              <Card
                key={index}
                className="w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.334rem)] border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col bg-white"
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Icon Header */}
                  <div
                    className={`w-12 h-12 rounded-lg ${category.headerIconBg} flex items-center justify-center mb-6`}
                  >
                    {category.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
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
