"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Monitor,
  Users,
  Linkedin,
  Globe,
  Mail,
  MessageSquare,
  FileText,
  Presentation,
  CreditCard,
  Mic,
  Newspaper,
} from "lucide-react";

interface BenefitContent {
  label: string;
  text: string;
  icon: React.ReactNode;
}

interface BenefitCategory {
  title: string;
  icon: React.ReactNode;
  headerIconBg: string;
  content: BenefitContent[];
}

interface BenefitsSectionProps {
  title?: string;
  highlight?: string;
  description?: string;
  categories?: BenefitCategory[];
}

const defaultCategories: BenefitCategory[] = [
  {
    title: "Your Online Presence",
    icon: <Monitor className="w-6 h-6 text-blue-600" />,
    headerIconBg: "bg-blue-100",
    content: [
      {
        label: "LinkedIn & professional networking",
        text: "The #1 place our headshots end up. Make a strong first impression on recruiters, clients, and connections.",
        icon: <Linkedin className="w-5 h-5 text-blue-600" />,
      },
      {
        label: "Company About pages & team directories",
        text: "Look the part on your team page, founder bio, org chart, or personal portfolio.",
        icon: <Globe className="w-5 h-5 text-blue-600" />,
      },
      {
        label: "Email signatures",
        text: "Add a face to every email you send — clients, prospects, and colleagues remember faces.",
        icon: <Mail className="w-5 h-5 text-blue-600" />,
      },
      {
        label: "Slack, Zoom & Microsoft Teams",
        text: "The headshot your coworkers, clients, and prospects see every day at work.",
        icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
      },
    ],
  },
  {
    title: "Career & Business Moves",
    icon: <Briefcase className="w-6 h-6 text-purple-600" />,
    headerIconBg: "bg-purple-100",
    content: [
      {
        label: "Resumes & job applications",
        text: "Stand out from generic resumes and recruiter outreach with a studio-quality headshot at the top.",
        icon: <FileText className="w-5 h-5 text-purple-600" />,
      },
      {
        label: "Pitch decks & sales collateral",
        text: "A polished headshot on the team slide, founder bio page, or one-pager closes the gap between you and the deal.",
        icon: <Presentation className="w-5 h-5 text-purple-600" />,
      },
      {
        label: "Business cards & print",
        text: "High-resolution files print sharp on business cards, brochures, and signage.",
        icon: <CreditCard className="w-5 h-5 text-purple-600" />,
      },
    ],
  },
  {
    title: "Public Visibility & Press",
    icon: <Users className="w-6 h-6 text-green-600" />,
    headerIconBg: "bg-green-100",
    content: [
      {
        label: "Speaker bios & conference profiles",
        text: "Look pitch-ready for conference websites, event badges, and panel features.",
        icon: <Mic className="w-5 h-5 text-green-600" />,
      },
      {
        label: "Press features & author bios",
        text: "Always have a press-ready headshot on hand for journalists, publications, or book bylines.",
        icon: <Newspaper className="w-5 h-5 text-green-600" />,
      },
    ],
  },
];

const BenefitsSection = ({
  title = "Attract up to 3× More Views, Clicks & Opportunities",
  highlight = "3× More",
  description = "Look polished, confident, and professional — everywhere you show up.",
  categories = defaultCategories,
}: BenefitsSectionProps) => {
  return (
    <div className="px-4 max-w-full sm:max-w-[90%] mx-auto">
      <div className="">
        <div className="text-left space-y-4 mb-16">
          <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gray-400 block">
            Where People Use Them
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
                    <span className="text-blue-500 relative">{part}</span>
                  ) : (
                    part
                  )}
                </span>
              ));
            })()}
          </h2>

          <p className="text-gray-600 text-base xs:text-lg sm:text-xl max-w-3xl xl:max-w-full">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full bg-white"
            >
              <CardContent className="p-8 flex flex-col h-full">
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
                      <div className="mt-0.5 shrink-0">{item.icon}</div>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
