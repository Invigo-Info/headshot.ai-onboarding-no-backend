// Fallback attire/background options derived from the folders in
// public/assets/on-boarding/<slug>/{male,female}/{attire,background}/<key>/1.webp
// Used when the Supabase `packs` row doesn't have attire/background populated.

export type OnboardingFallback = {
  attire: string[]
  background: string[]
  womenOnly?: boolean
}

export const onboardingFallback: Record<string, OnboardingFallback> = {
  "actor-headshots": {
    attire: [],
    background: ["classic-b-and-w-studio", "dramatic", "outdoor", "studio"],
  },
  "architect-headshots": {
    attire: [],
    background: ["architect-workspace", "construction-site", "outdoor", "studio"],
  },
  "author-headshots": {
    attire: ["casual", "professional"],
    background: ["library", "outdoor", "studio", "writing-space"],
  },
  "ballet-dancer-headshots": {
    attire: [],
    background: ["ballet-studio", "dark-studio", "outdoor", "studio", "theatre"],
  },
  "beauty-pageant-headshots": {
    attire: [],
    background: ["nature", "outdoor", "studio", "urban-street"],
    womenOnly: true,
  },
  "black-and-white-headshots": {
    attire: ["casual", "professional", "smart-casual"],
    background: ["dark-studio", "studio"],
  },
  "business-headshots": {
    attire: ["business-casual", "business-professional"],
    background: ["boardroom", "city", "office", "studio"],
  },
  "casting-headshots": {
    attire: [],
    background: ["classic-b-and-w-studio", "dramatic", "outdoor", "studio"],
  },
  "ceo-headshots": {
    attire: ["business-casual", "business-professional"],
    background: ["boardroom", "city", "corporate-office", "keynote-speaker", "studio"],
  },
  "chef-headshots": {
    attire: [],
    background: ["culinary-workspace", "outdoor", "studio"],
  },
  "corporate-headshots": {
    attire: ["business-casual", "business-professional"],
    background: ["city", "nature", "office", "studio", "wall-and-bricks"],
  },
  "dancer-headshots": {
    attire: [],
    background: ["dance-studio", "dark-studio", "outdoor", "studio", "theatre", "theatrical"],
  },
  "data-analyst-headshots": {
    attire: ["business-casual", "business-professional", "smart-casual"],
    background: ["business-parks", "city", "office", "studio", "work-from-home"],
  },
  "dentist-headshots": {
    attire: ["scrubs", "white-coat"],
    background: ["dental-clinic", "outdoor", "studio"],
  },
  "doctor-headshots": {
    attire: ["business-casual", "business-professional", "scrubs", "white-coat"],
    background: ["hospital", "medical-office", "outdoor", "studio"],
  },
  "entrepreneur-headshots": {
    attire: ["business-casual", "business-professional"],
    background: ["boardroom", "city", "corporate-office", "keynote-speaker", "studio"],
  },
  "eras-headshots": {
    attire: ["business-professional", "professional", "white-coat"],
    background: ["hospital", "outdoor", "studio"],
  },
  "esthetician-headshots": {
    attire: [],
    background: ["outdoor", "spa-and-treatment-room", "studio"],
  },
  "executive-headshots": {
    attire: ["business-casual", "business-professional"],
    background: ["city", "nature", "office", "studio"],
  },
  "graduation-headshots": {
    attire: ["business-professional", "graduation-gown", "professional"],
    background: ["campus", "outdoor", "studio"],
  },
  "hair-stylist-headshots": {
    attire: [],
    background: ["outdoor", "salon-workspace", "studio"],
  },
  "hairdresser-headshots": {
    attire: [],
    background: ["outdoor", "salon-workspace", "studio"],
  },
  "interior-designer-headshots": {
    attire: [],
    background: ["interior-design-workspace", "outdoor", "studio"],
  },
  "lawyer-headshots": {
    attire: [],
    background: ["city", "law-office", "nature", "office", "outdoor", "studio"],
  },
  "linkedin-headshots": {
    attire: ["business-casual", "business-professional", "smart-casual"],
    background: ["city", "nature", "office", "studio", "wall-and-bricks"],
  },
  "makeup-artist-headshots": {
    attire: [],
    background: ["makeup-studio", "outdoor", "studio"],
  },
  "massage-therapist-headshots": {
    attire: [],
    background: ["outdoor", "spa-and-wellness", "studio"],
  },
  "model-headshots": {
    attire: [],
    background: ["dark-studio", "outdoor", "studio"],
  },
  "musician-headshots": {
    attire: [],
    background: ["dramatic", "music-recording-studio", "outdoor", "stage", "studio"],
  },
  "nail-technician-headshots": {
    attire: [],
    background: ["nail-salon", "outdoor", "studio"],
  },
  "nurse-headshots": {
    attire: [],
    background: ["hospital", "medical-office", "outdoor", "studio"],
  },
  "nurse-practitioner-headshots": {
    attire: ["business-casual", "business-professional", "scrubs", "white-coat"],
    background: ["hospital", "medical-office", "outdoor", "studio"],
  },
  "personal-trainer-headshots": {
    attire: [],
    background: ["indoor-gym", "outdoor-gym", "studio"],
  },
  "physician-headshots": {
    attire: [],
    background: ["hospital", "medical-office", "outdoor", "studio"],
  },
  physician: {
    attire: [],
    background: ["hospital", "medical-office", "outdoor", "studio"],
  },
  "professional-headshots": {
    attire: ["business-casual", "business-professional", "smart-casual"],
    background: ["city", "nature", "office", "studio", "wall-and-bricks"],
  },
  "professor-headshots": {
    attire: [],
    background: [
      "academic-and-research",
      "academic-outdoor",
      "campus",
      "lecture-and-teaching-spaces",
      "library",
      "studio",
    ],
  },
  "psychologist-headshots": {
    attire: ["casual", "professional"],
    background: ["outdoor", "studio", "therapy-office-setting"],
  },
  "realtor-headshots": {
    attire: [],
    background: ["city", "house", "nature", "office", "studio"],
  },
  "sales-executive-headshots": {
    attire: ["business-casual", "business-professional", "smart-casual"],
    background: ["city", "corporate-sales-environment", "office", "outdoor", "studio"],
  },
  "sales-manager-headshots": {
    attire: ["business-casual", "business-professional", "smart-casual"],
    background: ["city", "corporate-sales-environment", "office", "outdoor", "studio"],
  },
  "singer-headshots": {
    attire: [],
    background: ["dramatic", "music-recording-studio", "outdoor", "stage", "studio"],
  },
  "software-engineer-headshots": {
    attire: ["business-casual", "business-professional", "smart-casual"],
    background: [
      "business-parks",
      "city",
      "office",
      "studio",
      "wall-and-bricks",
      "work-from-home",
    ],
  },
  "surgeon-headshots": {
    attire: ["scrubs", "white-coat"],
    background: ["hospital", "outdoor", "studio", "surgical-room"],
  },
  "teacher-headshots": {
    attire: [],
    background: ["campus", "classroom", "studio"],
  },
  "theatrical-headshots": {
    attire: [],
    background: ["backstage-and-rehearsal", "dramatic", "outdoor", "studio", "theater-stage"],
  },
  "therapist-headshots": {
    attire: ["casual", "professional", "white-coat"],
    background: ["outdoor", "studio", "therapist-office"],
  },
  "yoga-teacher-headshots": {
    attire: [],
    background: ["indoor-yoga-studio", "outdoor-yoga-wellness", "studio"],
  },
}

export function prettifyKey(key: string): string {
  return key
    .split("-")
    .map((part) => {
      if (part.length <= 2) return part.toUpperCase()
      return part.charAt(0).toUpperCase() + part.slice(1)
    })
    .join(" ")
}
