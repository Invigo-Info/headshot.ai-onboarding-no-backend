export interface PricingPlan {
  name: string
  price: number
  originalPrice: number
  pricePerHeadshot?: string
  headshots: number
  generationTime: string
  attires?: number | string | null
  backgrounds?: number | string | null
  resolution: string
  buttonText: string
  buttonVariant: 'default' | 'outline'
  popular?: boolean
  badge?: string
  badgeIsBlue?: boolean
  headshotsTooltip?: string
  generationTimeTooltip?: string
  attiresTooltip?: string
  backgroundsTooltip?: string
  resolutionTooltip?: string
}

export interface TableRow {
  label: string
  value_1: string | boolean
  value_2: string | boolean
}

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export interface PricingDetails {
  plans: PricingPlan[]
  table_details: TableRow[]
  category: string
  backgroundInfoText?: string
  attireInfoText?: string
  allPlansInclude?: string[]
  testimonials?: Testimonial[]
}

export const homePagePricing: PricingDetails = {
    plans: [
        {
            name: 'Starter',
            price: 25,
            originalPrice: 45,
            pricePerHeadshot: '$0.50',
            headshots: 50,
            generationTime: '45 Minutes generation time',
            attires: 'Choice of 1 outfit',
            backgrounds: 'Choice of 1 background',
            resolution: 'Standard resolution',
            buttonText: 'Select',
            buttonVariant: 'outline',
            headshotsTooltip: '50 AI headshots in multiple looks',
            generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
            attiresTooltip: 'Pick from multiple outfits tailored to your needs',
            backgroundsTooltip: 'Pick from multiple backgrounds tailored to your needs',
            resolutionTooltip: 'Good-quality headshots with standard detail'
        },
        {
            name: 'Basic',
            price: 33,
            originalPrice: 55,
            pricePerHeadshot: '$0.33',
            headshots: 100,
            generationTime: '30 Minutes generation time',
            attires: 'Choice of 2 outfits',
            backgrounds: 'Choice of 2 backgrounds',
            resolution: 'HD resolution',
            buttonText: 'Select',
            buttonVariant: 'default',
            popular: true,
            badge: 'Most Popular',
            headshotsTooltip: '100 AI headshots in multiple looks',
            generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
            attiresTooltip: 'Pick from multiple outfits tailored to your needs',
            backgroundsTooltip: 'Pick from multiple backgrounds tailored to your needs',
            resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
        },
        {
            name: 'Premium',
            price: 45,
            originalPrice: 79,
            pricePerHeadshot: '$0.23',
            headshots: 200,
            generationTime: '15 Minutes generation time',
            attires: 'Choice of multiple outfits',
            backgrounds: 'Choice of multiple backgrounds',
            resolution: 'High resolution',
            buttonText: 'Select',
            buttonVariant: 'outline',
            badge: '+Best Value',
            badgeIsBlue: true,
            headshotsTooltip: '200 AI headshots in multiple looks',
            generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
            attiresTooltip: 'Pick from multiple outfits tailored to your needs',
            backgroundsTooltip: 'Pick from multiple backgrounds tailored to your needs',
            resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
        },
    ],
    table_details: [
        {
            label: "Realistic — looks like you",
            value_1: true,
            value_2: true,
        },
        {
            label: "Studio-quality",
            value_1: true,
            value_2: true,
        },
        {
            label: "No photoshoot",
            value_1: true,
            value_2: false,
        },
        {
            label: "No dressing up",
            value_1: true,
            value_2: false,
        },
        {
            label: "Delivery time",
            value_1: "15–45 minutes",
            value_2: "2–7 days+",
        },
        {
            label: "Headshot count",
            value_1: "50–200",
            value_2: "10–20",
        },
        {
            label: "Outfits",
            value_1: "Multiple options",
            value_2: "1–2 options",
        },
        {
            label: "Backgrounds",
            value_1: "Multiple options",
            value_2: "1–2 options",
        },
        {
            label: "Price",
            value_1: "$25–$45 (one-time)",
            value_2: "$500–$1,300+ (per session)",
        },
        {
            label: "Full image rights",
            value_1: true,
            value_2: false,
        },
        {
            label: "Delete images anytime",
            value_1: true,
            value_2: false,
        },
        {
            label: "Fully private & secure",
            value_1: true,
            value_2: false,
        },
        {
            label: "100% money-back",
            value_1: true,
            value_2: false,
        },
    ],
    category: 'professional',
    allPlansInclude: [
        'Full HD, no watermarks',
        'Pick as many outfits and backgrounds as you want',
        'Use them anywhere you want',
        'Yours forever — download as many times as you want',
    ],
    testimonials: [
    {
      quote: "Studio lighting looked real and crisp, like an actual corporate shoot.",
      name: "David L.",
      role: "Financial Analyst"
    },
    {
      quote: "Clean office style headshot looked natural and perfectly matched my role.",
      name: "Jessica T.",
      role: "Marketing Manager"
    },
    {
      quote: "New headshot helped clients trust me faster during first introductions.",
      name: "Sabrina U.",
      role: "Financial Planner"
    },
    {
      quote: "Sharp city-backdrop portrait looked exactly like a professional photographer took it.",
      name: "Brandon C.",
      role: "Operations Director"
    },
    {
      quote: "Image felt natural and well lit, not stiff or overedited at all.",
      name: "Eric B.",
      role: "Account Manager"
    },
    {
      quote: "More recruiters replied after updating my profile with this polished headshot.",
      name: "Ashley P.",
      role: "Product Manager"
    },
    {
      quote: "Studio background and suit details looked clean, sharp, and incredibly realistic.",
      name: "Brian I.",
      role: "Corporate Attorney"
    },
    {
      quote: "Office style photo blended perfectly across LinkedIn, email, and internal tools.",
      name: "Nicole M.",
      role: "Software Engineer"
    },
    {
      quote: "Clients connected faster once my proposals showed a confident, clear headshot.",
      name: "Anthony D.",
      role: "Business Consultant"
    },
    {
      quote: "Lighting looked like a real studio setup, bright and evenly balanced.",
      name: "Marcus H.",
      role: "IT Manager"
    },
    {
      quote: "Polished, trustworthy image helped me stand out on my company directory.",
      name: "Ryan F.",
      role: "Tax Associate"
    },
    {
      quote: "New headshot improved first impressions with partners during presentations and pitches.",
      name: "Thomas E.",
      role: "Agency Owner"
    }
  ],
};

// Realtor Headshots
export const realtorPricing: PricingDetails = {
  plans: [
    {
      name: "Starter",
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: "45 mins generation time",
      backgrounds: 1,
      resolution: "Standard resolution",
      buttonText: "Select",
      buttonVariant: "outline",
    },
    {
      name: "Basic",
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: "30 mins generation time",
      backgrounds: 2,
      resolution: "Standard resolution",
      buttonText: "Select",
      buttonVariant: "default",
      popular: true,
      badge: "✨ 83% pick this plan",
    },
    {
      name: "Premium",
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: "15 mins generation time",
      backgrounds: "All backgrounds included",
      resolution: "Enhanced image resolution",
      buttonText: "Select",
      buttonVariant: "outline",
      badge: "+ Best Value",
      badgeIsBlue: true,
    },
  ],
  table_details: [
    {
      label: "Do it from home",
      value_1: true,
      value_2: false,
    },
    {
      label: "Time",
      value_1: "As Quick as 15 minutes",
      value_2: "2–7 days",
    },
    {
      label: "Headshots",
      value_1: "Up to 100",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "20+ styles",
      value_2: "1–2 outfits",
    },
    {
      label: "Backgrounds",
      value_1: "Unlimited",
      value_2: "1 only",
    },
    {
      label: "Cost",
      value_1: "$15–35",
      value_2: "$550–1500 Per Session",
    },
    {
      label: "Flexibility",
      value_1: "Easy to update",
      value_2: "New shoot needed",
    },
    {
      label: "Realtor Ready",
      value_1: "MLS, LinkedIn, websites & marketing",
      value_2: "Limited versatility",
    },
    {
      label: "Commercial Rights",
      value_1: "100% yours",
      value_2: "Often limited",
    },
    {
      label: "Privacy",
      value_1: "Auto-delete (7 & 30 days)",
      value_2: "Not guaranteed",
    },
    {
      label: "Refund",
      value_1: "Yes (98% satisfaction rate)",
      value_2: "Usually non-refundable",
    },
  ],
  category: "realtor",
  backgroundInfoText: "Select from studio, office, city, nature, house, city backdrops, and more",
}

// Corporate Headshots
export const corporatePricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, office, city, nature, wall and bricks',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, office, city, nature, wall and bricks',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, office, city, nature, wall and bricks',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'corporate',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section-old.tsx
  testimonials: [
    {
      quote: "Looked exactly like a real studio headshot, clean and sharp.",
      name: "Faith R.",
      role: "HR Specialist",
    },
    {
      quote: "Crisp lighting and natural office tones made my profile look legit.",
      name: "Aaron T.",
      role: "Corporate Manager",
    },
    {
      quote: "Quality felt pro level and boosted trust in my internal applications.",
      name: "Weston L.",
      role: "Corporate Applicant",
    },
    {
      quote: "Clients responded better once my headshot looked polished and trustworthy.",
      name: "Naomi C.",
      role: "Consultant",
    },
    {
      quote: "The clean boardroom style made the photo look truly professional.",
      name: "Gavin S.",
      role: "Project Coordinator",
    },
    {
      quote: "Studio style lighting made my LinkedIn look fresh and much more credible.",
      name: "Jenna P.",
      role: "Corporate Recruiter",
    },
    {
      quote: "New headshot helped clients warm up faster during calls and meetings.",
      name: "Valeria G.",
      role: "Client Success Rep",
    },
    {
      quote: "Looked like I actually hired a photographer, not AI at all.",
      name: "Ethan J.",
      role: "Account Executive",
    },
    {
      quote: "Sharper, brighter look helped my team see me as more confident.",
      name: "Riley A.",
      role: "Training Lead",
    },
    {
      quote: "Clients commented instantly once my photo looked cleaner and more polished.",
      name: "Carlos M.",
      role: "Senior Analyst",
    },
    {
      quote: "Office style background made everything feel natural and high quality.",
      name: "Lila F.",
      role: "Account Manager",
    },
    {
      quote: "Better headshot helped me make stronger first impressions with partners.",
      name: "Paige S.",
      role: "Strategy Associate",
    },
  ],
};


// LinkedIn Headshots

// export const linkedinPricing: PricingDetails = {
// 	plans: [
// 		{
// 			name: "Starter",
// price: 25,
// originalPrice: 35,
// headshots: 40,
// 			generationTime: "45 mins generation time",
// 			attires: 1,
// 			backgrounds: 1,
// 			resolution: "Standard resolution",
// 			buttonText: "Select",
// 			buttonVariant: "outline",
// 		},
// 		{
// 			name: "Basic",
// price: 35,
// originalPrice: 55,
// headshots: 100,
// 			generationTime: "30 mins generation time",
// 			attires: 2,
// 			backgrounds: 2,
// 			resolution: "Standard resolution",
// 			buttonText: "Select",
// 			buttonVariant: "default",
// 			popular: true,
// 			badge: "✨ 83% pick this plan",
// 		},
// 		{
// 			name: "Premium",
// price: 55,
// originalPrice: 75,
// headshots: 150,
// 			generationTime: "15 mins generation time",
// 			attires: "All attires included",
// 			backgrounds: "All backgrounds included",
// 			resolution: "Enhanced image resolution",
// 			buttonText: "Select",
// 			buttonVariant: "outline",
// 			badge: "+ Best Value",
// 			badgeIsBlue: true,
// 		},
// 	],
// 	table_details: [
// 		{
// 			label: "Do it from home",
// 			value_1: true,
// 			value_2: false,
// 		},
// 		{
// 			label: "Time",
// 			value_1: "As fast as 15 minutes",
// 			value_2: "2–7 days",
// 		},
// 		{
// 			label: "Headshots",
// 			value_1: "Up to 100",
// 			value_2: "10–20",
// 		},
// 		{
// 			label: "Outfits",
// 			value_1: "50+ styles",
// 			value_2: "1–2 outfits",
// 		},
// 		{
// 			label: "Backgrounds",
// 			value_1: "Unlimited",
// 			value_2: "1 only",
// 		},
// 		{
// 			label: "Cost",
// 			value_1: "$15–$35",
// 			value_2: "$450-$1200 per session",
// 		},
// 		{
// 			label: "Flexibility",
// 			value_1: "Easy to update",
// 			value_2: "New shoot needed",
// 		},
// 		{
// 			label: "LinkedIn Ready",
// 			value_1: "Optimized for profiles & resumes",
// 			value_2: "Limited versatility",
// 		},
// 		{
// 			label: "Commercial Rights",
// 			value_1: "100% yours",
// 			value_2: "Often limited",
// 		},
// 		{
// 			label: "Privacy",
// 			value_1: "Auto-delete (7 & 30 days)",
// 			value_2: "Not guaranteed",
// 		},
// 		{
// 			label: "Refund",
// 			value_1: "Yes (100% Refund)",
// 			value_2: "Usually non-refundable",
// 		},
// 	],
// 	category: "linkedin",
//     backgroundInfoText: "Select from studio, office, city, nature backdrops, and more",
//     attireInfoText: "Choose from business professional, casual, and smart casual outfit styles",
// }




// Architect Headshots
export const architectPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, architect workspace, outdoor, construction site',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, architect workspace, outdoor, construction site',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, architect workspace, outdoor, construction site',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'architect',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section.tsx
  testimonials: [
    {
      quote: "Doesn't look fake at all. Looks like a real photo because it basically is.",
      name: "Stephanie G.",
      role: "Interior Architecture Lead",
    },
    {
      quote: "Finally a photo I don't hate. Actually captured how I look relaxed.",
      name: "Robert H.",
      role: "Residential Architect",
    },
    {
      quote: "No editing needed. Clean background, good lighting, natural skin. Done.",
      name: "Nicole E.",
      role: "Healthcare Facility Planner",
    },
    {
      quote: "Tried it before hiring a photographer. Ended up not needing one at all.",
      name: "Jessica L.",
      role: "Landscape Architect",
    },
    {
      quote: "Not stiff like my old photos. Looks like me on a good day.",
      name: "Christopher Y.",
      role: "Studio Director",
    },
    {
      quote: "Can't believe I did this at home. Nobody knows the difference.",
      name: "Gregory V.",
      role: "Senior Designer",
    },
    {
      quote: "The result looked real. Not that weird smooth AI look I worried about.",
      name: "Elena R.",
      role: "Principal Architect",
    },
    {
      quote: "Best headshot I've had in 15 years. Weirdly the most accurate one.",
      name: "Linda P.",
      role: "Historic Preservation Architect",
    },
    {
      quote: "A client said I seemed trustworthy. That feedback was worth every penny.",
      name: "Raymond Q.",
      role: "Renovation Specialist",
    },
    {
      quote: "Our clients noticed the upgrade. Said we looked more established now.",
      name: "William N.",
      role: "Managing Partner",
    },
    {
      quote: "Residential clients need to feel comfortable first. This photo feels warm.",
      name: "Sarah J.",
      role: "Founding Principal",
    },
    {
      quote: "Updated the whole team's photos. Helped us stand out for a big proposal.",
      name: "Amanda Z.",
      role: "Associate Principal",
    },
  ],
};



// Teacher Headshots
// export const teacherPricing: PricingDetails = {
// 	plans: [
// 		{
// 			name: "Starter",
// price: 25,
// originalPrice: 35,
// headshots: 40,
// 			generationTime: "45 mins generation time",
// 			backgrounds: 1,
// 			resolution: "Standard resolution",
// 			buttonText: "Select",
// 			buttonVariant: "outline",
// 		},
// 		{
// 			name: "Basic",
// price: 35,
// originalPrice: 55,
// headshots: 100,
// 			generationTime: "30 mins generation time",
// 			backgrounds: 2,
// 			resolution: "Standard resolution",
// 			buttonText: "Select",
// 			buttonVariant: "default",
// 			popular: true,
// 			badge: "✨ 83% pick this plan",
// 		},
// 		{
// 			name: "Premium",
// price: 55,
// originalPrice: 75,
// headshots: 150,
// 			generationTime: "15 mins generation time",
// 			backgrounds: "All backgrounds included",
// 			resolution: "Enhanced image resolution",
// 			buttonText: "Select",
// 			buttonVariant: "outline",
// 			badge: "+ Best Value",
// 			badgeIsBlue: true,
// 		},
// 	],
// 	table_details: [
// 		{
// 			label: "Do it from home",
// 			value_1: true,
// 			value_2: false,
// 		},
// 		{
// 			label: "Time",
// 			value_1: "Ready in 15 minutes",
// 			value_2: "2–7 days",
// 		},
// 		{
// 			label: "Headshots",
// 			value_1: "Up to 100",
// 			value_2: "10–20",
// 		},
// 		{
// 			label: "Outfits",
// 			value_1: "30+ styles",
// 			value_2: "1–2 outfits",
// 		},
// 		{
// 			label: "Backgrounds",
// 			value_1: "Unlimited",
// 			value_2: "1 only",
// 		},
// 		{
// 			label: "Cost",
// 			value_1: "$15–$35",
// 			value_2: "$300–$550 per Session",
// 		},
// 		{
// 			label: "Flexibility",
// 			value_1: "Easy to update",
// 			value_2: "Requires a new shoot",
// 		},
// 		{
// 			label: "Educator Ready",
// 			value_1: "Perfect for websites, yearbooks, and directories",
// 			value_2: "Limited versatility",
// 		},
// 		{
// 			label: "Commercial Rights",
// 			value_1: "100% yours",
// 			value_2: "Often limited",
// 		},
// 		{
// 			label: "Privacy",
// 			value_1: "Auto-delete (7 & 30 days)",
// 			value_2: "Not guaranteed",
// 		},
// 		{
// 			label: "Refund",
// 			value_1: "Yes (98% satisfaction rate)",
// 			value_2: "Usually non-refundable",
// 		},
// 	],
// 	category: "teacher",
//     backgroundInfoText: "Select from studio, classroom, campus backdrops, and more",
// }


// ERAS Headshots
export const erasPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Professional, white coat',
      backgroundsTooltip: 'Studio, hospital, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Professional, white coat',
      backgroundsTooltip: 'Studio, hospital, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Professional, white coat',
      backgroundsTooltip: 'Studio, hospital, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'eras',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Headshot looks like I paid a photographer on hospital photo day.',
      name: 'Brian T.',
      role: 'MD/PhD Residency Applicant',
    },
    {
      quote: 'My white coat headshot feels like real hospital photo day quality.',
      name: 'Emily K.',
      role: 'Future Pediatrics Resident',
    },
    {
      quote: 'Turned my bad bathroom selfies into sharp, clean, studio level ERAS shots.',
      name: 'Maya N.',
      role: 'MS3, Future Pediatrician',
    },
    {
      quote: "Balanced lighting, no harsh shadows, so I don't look exhausted anymore.",
      name: 'Uma Z.',
      role: 'MS3, Planning Pediatrics',
    },
    {
      quote: 'Got a friendly yet serious look that fits both ERAS and clinic.',
      name: 'Victor A.',
      role: 'Future Med-Peds Resident',
    },
    {
      quote: 'My headshot blends right in with official hospital website photos now.',
      name: 'Wendy O.',
      role: 'Matched Pediatrics',
    },
    {
      quote: 'Turned one scrubs selfie into something like real hospital photo day.',
      name: 'Jenna P.',
      role: 'Future ICU Doc',
    },
    {
      quote: 'Serious surgery vibe without looking cold; exactly how I want perceived.',
      name: 'Amal S.',
      role: 'General Surgery Applicant',
    },
    {
      quote: 'Interviewer actually mentioned my polished ERAS photo during residency interview season.',
      name: 'Noah B.',
      role: 'Matched Internal Medicine',
    },
    {
      quote: 'Gave my IMG application a cleaner, US-style look programs clearly noticed.',
      name: 'Olivia F.',
      role: 'IMG, Internal Medicine',
    },
    {
      quote: "Made my DO application feel as polished as MD classmates' profiles.",
      name: 'Zachary V.',
      role: 'DO, PM&R Applicant',
    },
    {
      quote: 'Using the same headshot on ERAS and Zoom strengthened interview impressions.',
      name: 'Xavier I.',
      role: 'EM Applicant',
    },
  ],
};


// Graduation Headshots
export const graduationPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Graduation gown, professional',
      backgroundsTooltip: 'Studio, campus, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Graduation gown, professional',
      backgroundsTooltip: 'Studio, campus, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Graduation gown, professional',
      backgroundsTooltip: 'Studio, campus, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'graduation',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Cap and gown headshot looked like I booked an actual campus photographer.',
      name: 'Olivia S.',
      role: 'Graduating Senior, Biology Major',
    },
    {
      quote: 'The gown, tassel, and lighting looked completely real, my mom cried.',
      name: 'Faith M.',
      role: 'First-Generation College Graduate',
    },
    {
      quote: 'Turned random car selfies into a bright, clean graduation portrait.',
      name: 'Daniela T.',
      role: 'Communications Graduate',
    },
    {
      quote: 'Outdoor campus backdrop looked like the main quad at sunset, flawless.',
      name: 'Ruby A.',
      role: 'Liberal Arts Graduate',
    },
    {
      quote: 'My department page finally has a clean, well lit graduation headshot.',
      name: 'Owen E.',
      role: 'Mathematics Graduate',
    },
    {
      quote: 'Headshot matched faculty photos perfectly and still works great on LinkedIn.',
      name: 'Holly J.',
      role: 'Music Performance Graduate',
    },
    {
      quote: 'Soft, even lighting kept my eyes open and face calm, confident.',
      name: 'Bryce K.',
      role: 'Environmental Science Graduate',
    },
    {
      quote: 'Got one strong, timeless graduation image for resumes, profiles, and family.',
      name: 'Rowan M.',
      role: 'Economics Graduate',
    },
    {
      quote: 'After adding this headshot, I noticed more interviews and responses.',
      name: 'Xavier H.',
      role: 'Accounting Graduate',
    },
    {
      quote: 'Classmates and peers commented my updated profile suddenly looked very professional.',
      name: 'Jenna Z.',
      role: 'Graphic Design Graduate',
    },
    {
      quote: 'Relatives shared my headshot everywhere; I finally felt proudly represented.',
      name: 'Elise R.',
      role: 'First-Generation Graduate',
    },
    {
      quote: 'Everyone at the graduation party asked which studio we used.',
      name: 'Valerie H.',
      role: 'Nursing Graduate',
    },
  ],
};

export const hairdresserPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, salon workspace, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, salon workspace, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, salon workspace, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'hairdresser',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Headshot looked like a real salon photo with perfect lighting.',
      name: 'Amanda R.',
      role: 'Hairdresser',
    },
    {
      quote: 'Studio style image felt natural and matched my everyday salon vibe.',
      name: 'Shari T.',
      role: 'Hairdresser',
    },
    {
      quote: 'Clients booked faster after seeing my clean, polished new headshot.',
      name: 'Kelsey F.',
      role: 'Hairdresser',
    },
    {
      quote: 'Crisp salon style background made the picture look truly professional.',
      name: 'Luis M.',
      role: 'Hairdresser',
    },
    {
      quote: 'My new image looked exactly like me, warm and welcoming.',
      name: 'Hannah K.',
      role: 'Hairdresser',
    },
    {
      quote: 'More first time clients booked once my page looked trustworthy and friendly.',
      name: 'Jasmine E.',
      role: 'Hairdresser',
    },
    {
      quote: 'Lighting looked flawless, like a real studio session without the cost.',
      name: 'Rita D.',
      role: 'Hairdresser',
    },
    {
      quote: 'The shot blended perfectly with my salon brand and online pages.',
      name: 'Paige G.',
      role: 'Hairdresser',
    },
    {
      quote: 'Clients said my new photo helped them feel comfortable booking me.',
      name: 'Dana S.',
      role: 'Hairdresser',
    },
    {
      quote: 'The image came out clean and crisp, just like a pro shoot.',
      name: 'Marcus B.',
      role: 'Hairdresser',
    },
    {
      quote: "Outdoor style background looked natural and sharp, matching my salon’s vibe.",
      name: 'Megan V.',
      role: 'Hairdresser',
    },
    {
      quote: 'New headshot made my booking profile stand out to new clients.',
      name: 'Faith Z.',
      role: 'Hairdresser',
    },
  ],
};

export const hingePricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Standard variety',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'A solid mix of different styles and backgrounds',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'More variety',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'A broader mix of different styles and backgrounds',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Maximum variety',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'The widest selection of styles, outfits, and backgrounds',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'hinge',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: "The headshot quality rivals any professional photographer I've ever used.",
      name: 'Dharlene M.',
      role: '',
    },
    {
      quote: 'Crystal clear photos that make my profile stand out instantly.',
      name: 'Casey O.',
      role: '',
    },
    {
      quote: 'These polished headshots helped me finally get quality Hinge matches.',
      name: 'Josh S.',
      role: '',
    },
    {
      quote: 'Magazine quality headshots transformed my basic selfies completely overnight.',
      name: 'Ionut R.',
      role: '',
    },
    {
      quote: 'The lighting and sharpness in every headshot exceeded my expectations.',
      name: 'Krystian D.',
      role: '',
    },
    {
      quote: 'Professional headshots without the stiff, awkward feel of studio photos.',
      name: 'Meena M.',
      role: '',
    },
    {
      quote: 'Natural looking headshots that finally show the real, confident me.',
      name: 'Carole G.',
      role: '',
    },
    {
      quote: 'The headshot variety gave me perfect options for every profile slot.',
      name: 'Tana M.',
      role: '',
    },
    {
      quote: 'Stunning headshot quality that people genuinely think cost hundreds to produce.',
      name: 'Ann F.',
      role: '',
    },
    {
      quote: 'Flattering, authentic headshots that attract quality matches on Hinge now.',
      name: 'Oxana S.',
      role: '',
    },
    {
      quote: 'The AI created remarkably natural headshots from my casual everyday selfies.',
      name: 'Jon F.',
      role: 'Operations Manager',
    },
    {
      quote: 'Sharp, well lit headshots that make every prompt answer more believable.',
      name: 'Ra-Shelle T.',
      role: 'Product Designer',
    },
  ],
};


export const interiorDesignerPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, interior design workspace, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, interior design workspace, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, interior design workspace, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'interior-designer',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Clients thought I hired a photographer; these headshots look truly studio grade.',
      name: 'Maria P.',
      role: 'Residential Interior Designer',
    },
    {
      quote: 'Soft studio background and natural expression finally match my interior style.',
      name: 'Lila R.',
      role: 'Boutique Studio Owner',
    },
    {
      quote: 'First headshot that feels like me, not stiff or staged.',
      name: 'Sophie C.',
      role: 'Kitchen and Bath Designer',
    },
    {
      quote: 'My curls, freckles, and skin texture look real, not over smoothed.',
      name: 'Jasmine Q.',
      role: 'Eco-Friendly Interior Designer',
    },
    {
      quote: 'Daylight-style lighting and architectural backdrop beat my terrible studio fluorescents.',
      name: 'Trent G.',
      role: 'Loft Space Designer',
    },
    {
      quote: 'Background stays simple so my blazer texture and jewelry really stand out.',
      name: 'Bianca L.',
      role: 'Interior Decor Specialist',
    },
    {
      quote: 'Headshot design mirrors my minimalist branding; everything online finally feels cohesive.',
      name: 'Andre P.',
      role: 'Modern Interior Studio Owner',
    },
    {
      quote: 'Realistic room backdrops saved me renting styled studios for portraits.',
      name: 'Helena J.',
      role: 'Staging and Interior Designer',
    },
    {
      quote: 'New headshot on Houzz and Google brought more homeowners to my inbox.',
      name: 'Hannah L.',
      role: 'Residential Design Consultant',
    },
    {
      quote: 'Updated photo looks trustworthy, so more luxury clients actually book discovery calls.',
      name: 'Marcus D.',
      role: 'Luxury Condo Designer',
    },
    {
      quote: 'Polished portrait helps high end clients see my service as truly premium.',
      name: 'Elise K.',
      role: 'High-End Residential Designer',
    },
    {
      quote: 'Couples felt safer inviting me home after seeing my friendly headshot.',
      name: 'Tessa C.',
      role: 'Full-Service Interior Designer',
    },
  ],
};

// Actor Headshots
export const actorPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, classic B&W studio, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, classic B&W studio, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, classic B&W studio, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'actor',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Casting director praised how real these headshots looked on my profile.',
      name: 'Elise K.',
      role: 'TV Actress',
    },
    {
      quote: 'Studio style lighting looks natural and sharp, way better than my old shots.',
      name: 'Jordan M.',
      role: 'Film Actor',
    },
    {
      quote: 'Agent approved several images immediately because they looked clean and believable.',
      name: 'Chris B.',
      role: 'New Talent Actor',
    },
    {
      quote: 'New headshots helped me book faster since my pages finally look professional.',
      name: 'Kevin J.',
      role: 'Film & TV Actor',
    },
    {
      quote: 'Outdoor style images looked so real my agent asked who photographed me.',
      name: 'Ross C.',
      role: 'Dramatic Actor',
    },
    {
      quote: 'Lighting and skin tones feel authentic, not fake, perfect for casting platforms.',
      name: 'Amina J.',
      role: 'TV Actress',
    },
    {
      quote: 'Cleaner, realistic headshots made my online profiles stand out to casting teams.',
      name: 'Paige C.',
      role: 'Indie Film Actress',
    },
    {
      quote: 'Photos look like true studio shots, making my Actors Access page stronger.',
      name: 'Tyler H.',
      role: 'Theater & Film Actor',
    },
    {
      quote: 'Better looking profile brought more attention from casting and faster callbacks.',
      name: 'Damon F.',
      role: 'Commercial Actor',
    },
    {
      quote: 'Sharp, natural headshots helped my agent promote me with more confidence.',
      name: 'Kiera L.',
      role: 'TV/Film Actress',
    },
    {
      quote: 'Consistent, believable images made my submissions look polished and more competitive.',
      name: 'Lila P.',
      role: 'On-Camera Actress',
    },
    {
      quote: 'Realistic looks helped casting see my range clearly, improving my early responses.',
      name: 'Molly H.',
      role: 'Independent Actress',
    },
  ],
};


// Executive Headshots
export const executivePricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, office, city, nature',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, office, city, nature',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, office, city, nature',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'executive',
  backgroundInfoText: 'Select from studio, office, city, nature backdrops, and more',
  attireInfoText: 'Choose from business professional and casual outfit styles',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Studio level lighting made my headshot look truly professional.',
      name: 'Howard C.',
      role: 'Chief Financial Officer',
    },
    {
      quote: 'Sharp, natural details that look exactly like a real photoshoot.',
      name: 'Colton R.',
      role: 'Senior Operations Executive',
    },
    {
      quote: 'Clean office background made my leadership profile look far more polished.',
      name: 'Kiara F.',
      role: 'Executive Creative Director',
    },
    {
      quote: 'Investors reacted positively right after I updated my headshot.',
      name: 'Valerie S.',
      role: 'Startup CEO',
    },
    {
      quote: 'Lighting and detail beat the results from my last in-person shoot.',
      name: 'Curtis L.',
      role: 'Senior Risk Executive',
    },
    {
      quote: "Looks professionally shot. My team even asked for the photographer’s name.",
      name: 'Howard C.',
      role: 'Chief Financial Officer',
    },
    {
      quote: 'More client responses on LinkedIn after switching to this headshot.',
      name: 'Alisha W.',
      role: 'Executive Recruiter',
    },
    {
      quote: 'My new image looks crisp and natural on every platform.',
      name: 'Tyson E.',
      role: 'Division CEO',
    },
    {
      quote: 'Photo quality boosted how serious my promotion announcement looked.',
      name: 'Greg D.',
      role: 'Regional General Manager',
    },
    {
      quote: 'Studio-clean shadows and colors without any of the usual photo hassles.',
      name: 'Georgia Q.',
      role: 'Senior Corporate Executive',
    },
    {
      quote: 'Partners said my updated headshot made our pitch deck feel more credible.',
      name: 'Desmond J.',
      role: 'Executive Integration Lead',
    },
    {
      quote: 'Professional clarity that instantly upgraded my entire leadership presence.',
      name: 'Blake N.',
      role: 'VP, Customer Experience',
    },
  ],
};

// Dating Ready Headshots
export const datingPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Standard variety',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'A solid mix of different styles and backgrounds',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'More variety',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'A broader mix of different styles and backgrounds',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Maximum variety',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'The widest selection of styles, outfits, and backgrounds',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'dating',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section-old.tsx
  testimonials: [
    {
      quote: "Got three compliments on my new photos in the first week alone.",
      name: "Terrence W.",
      role: "Sales Rep",
    },
    {
      quote: "The café backgrounds look so natural my sister thought I hired a photographer.",
      name: "Colleen M.",
      role: "Marketing Coordinator",
    },
    {
      quote: "Photos finally match my outdoorsy bio perfectly.",
      name: "Jolene P.",
      role: "Weekend Hiker",
    },
    {
      quote: "Just uploaded some regular selfies and got studio quality results back.",
      name: "Vernon D.",
      role: "Warehouse Supervisor",
    },
    {
      quote: "City street backgrounds give off main character energy.",
      name: "Quincy A.",
      role: "Freelance Designer",
    },
    {
      quote: "Coworker was convinced I'd gone to a professional studio.",
      name: "Zelda H.",
      role: "Office Manager",
    },
    {
      quote: "Soft lighting let my actual personality show through finally.",
      name: "Gilbert W.",
      role: "IT Analyst",
    },
    {
      quote: "Single mom with zero time. Had usable photos in no time.",
      name: "Dolores J.",
      role: "Pediatric Nurse",
    },
    {
      quote: "Glasses and curly hair photographed accurately. Dates recognize me instantly.",
      name: "Irving Z.",
      role: "High School Teacher",
    },
    {
      quote: "Golden hour lighting without waking up at 6am. Love it.",
      name: "Rashid K.",
      role: "Account Manager",
    },
    {
      quote: "Better results than two professional photoshoots I paid for.",
      name: "Esperanza R.",
      role: "Nonprofit Coordinator",
    },
    {
      quote: "Three different vibes from one batch, café, park, and studio.",
      name: "Mitchell Y.",
      role: "Software Developer",
    },
  ],
};


// Doctor Headshots
export const doctorPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'White coat, scrubs, business professional, business casual',
      backgroundsTooltip: 'Studio, hospital, medical office, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'White coat, scrubs, business professional, business casual',
      backgroundsTooltip: 'Studio, hospital, medical office, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'White coat, scrubs, business professional, business casual',
      backgroundsTooltip: 'Studio, hospital, medical office, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'doctor',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Looked like a true studio photo from simple home selfies.',
      name: 'Hector V.',
      role: 'Endocrinologist',
    },
    {
      quote: 'White coat images felt real and steady, perfect for patient trust.',
      name: 'Chloe M.',
      role: 'Family Medicine Physician',
    },
    {
      quote: 'Crisp hospital style shot impressed patients before our first telehealth visit.',
      name: 'Frank L.',
      role: 'Telemedicine Physician',
    },
    {
      quote: 'Studio quality lighting made my updated headshot look calm and confident.',
      name: 'Elena K.',
      role: 'Electrophysiologist',
    },
    {
      quote: 'Hospital background photos looked natural, like I stood in a real hallway.',
      name: 'Hailey M.',
      role: 'Internal Medicine Hospitalist',
    },
    {
      quote: 'Clean, sharp headshot helped new patients feel comfortable booking with me.',
      name: 'Logan W.',
      role: 'Pulmonologist',
    },
    {
      quote: 'Scrubs and white coat shots looked incredibly authentic for clinical profiles.',
      name: 'Brian T.',
      role: 'Emergency Medicine Physician',
    },
    {
      quote: "Realistic lighting made every image match our clinic's professional style.",
      name: 'Quinn B.',
      role: 'Gastroenterologist',
    },
    {
      quote: 'Warm, trustworthy photo noticeably improved how patients approached visits online.',
      name: 'Umar U.',
      role: 'Psychiatrist',
    },
    {
      quote: 'Office-background option looked genuinely photographed, not computer made.',
      name: 'Jason P.',
      role: 'Infectious Disease Physician',
    },
    {
      quote: 'Natural looking images helped new families feel welcome before stepping inside.',
      name: 'Yara Z.',
      role: 'Family Medicine Physician',
    },
    {
      quote: 'Clear, polished headshot made conference organizers highlight my profile instantly.',
      name: 'Zachary I.',
      role: 'Rheumatologist',
    },
  ],
};

// Author Headshots
export const authorPricing: PricingDetails = {
  plans: [
    {
      name: "Starter",
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: "45 Minutes generation time",
      attires: "Choice of 1 outfit",
      backgrounds: "Choice of 1 background",
      resolution: "Standard resolution",
      buttonText: "Select",
      buttonVariant: "outline",
      headshotsTooltip: "40 AI headshots in multiple looks",
      generationTimeTooltip: "Time to generate your headshots after uploading selfies",
      backgroundsTooltip: "Studio, library, writing space, outdoor",
      resolutionTooltip: "Good-quality headshots with standard detail",
      attiresTooltip: "Professional, casual",
    },
    {
      name: "Basic",
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: "30 Minutes generation time",
      attires: "Choice of 2 outfits",
      backgrounds: "Choice of 2 backgrounds",
      resolution: "HD resolution",
      buttonText: "Select",
      buttonVariant: "default",
      popular: true,
      badge: "⭐ 87% choose this",
      headshotsTooltip: "100 AI headshots in multiple looks",
      generationTimeTooltip: "Time to generate your headshots after uploading selfies",
      backgroundsTooltip: "Studio, library, writing space, outdoor",
      resolutionTooltip: "High-quality headshots with higher sharpness and detail",
      attiresTooltip: "Professional, casual",
    },
    {
      name: "Premium",
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: "15 Minutes generation time",
      attires: "Choice of multiple outfits",
      backgrounds: "Choice of multiple backgrounds",
      resolution: "High resolution",
      buttonText: "Select",
      buttonVariant: "outline",
      badge: "+Best Value",
      badgeIsBlue: true,
      headshotsTooltip: "150 AI headshots in multiple looks",
      generationTimeTooltip: "Time to generate your headshots after uploading selfies",
      backgroundsTooltip: "Studio, library, writing space, outdoor",
      resolutionTooltip: "Top-quality headshots with maximum detail and definition",
      attiresTooltip: "Professional, casual",
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'author',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section-old.tsx
  testimonials: [
    {
      quote: "My publisher approved it immediately. Said it was perfect for the cover.",
      name: "Rebecca M.",
      role: "Historical Fiction Author",
    },
    {
      quote: "My agent asked for the photographer's name. There wasn't one.",
      name: "Elaine K.",
      role: "Romance Writer",
    },
    {
      quote: "Writing group was completely fooled. They all signed up that week.",
      name: "Anthony B.",
      role: "Poetry Author",
    },
    {
      quote: "No weird smoothing. My gray beard and eye lines are all there.",
      name: "Howard K.",
      role: "Historical Nonfiction Author",
    },
    {
      quote: "High res enough for print covers. Met all my publisher's strict requirements.",
      name: "Gloria F.",
      role: "Young Adult Novelist",
    },
    {
      quote: "Texture and depth look professional. Shadows fall naturally on my face.",
      name: "Heather N.",
      role: "True Crime Author",
    },
    {
      quote: "The bookshelf background matched my literary fiction brand perfectly.",
      name: "Catherine D.",
      role: "Literary Fiction Author",
    },
    {
      quote: "Captured that cozy author vibe. Soft lighting nailed the feeling exactly.",
      name: "Brian E.",
      role: "Fantasy Novelist",
    },
    {
      quote: "Kids at school visits finally recognized me from my book cover.",
      name: "Jasmine L.",
      role: "Children's Book Author",
    },
    {
      quote: "Amazon sales picked up after I updated my author central photo.",
      name: "Priya V.",
      role: "Suspense Novelist",
    },
    {
      quote: "Subscribers actually replied saying I looked more approachable now.",
      name: "Danielle A.",
      role: "Lifestyle Author",
    },
    {
      quote: "Fans at my signing said the photo captured my personality perfectly.",
      name: "William H.",
      role: "Mystery Writer",
    },
  ],
};

// Ballet Dancer Headshots
export const balletDancerPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dark studio, ballet studio, theatre, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dark studio, ballet studio, theatre, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dark studio, ballet studio, theatre, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'ballet-dancer',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section-old.tsx
  testimonials: [
    {
      quote: "Studio pics look legit. Used one for auditions, no regrets.",
      name: "Isabella R.",
      role: "Corps de Ballet",
    },
    {
      quote: "Still looks like me. Freckles still there. Really happy.",
      name: "Jordan C.",
      role: "Apprentice",
    },
    {
      quote: "Just looks like someone with good equipment took my picture.",
      name: "Sierra V.",
      role: "Company Artist",
    },
    {
      quote: "That theatrical backdrop every dancer wants for auditions. Nailed it.",
      name: "Emma U.",
      role: "Soloist",
    },
    {
      quote: "Clean studio shot that doesn't distract. That's all I needed.",
      name: "Carlos M.",
      role: "Professional Dancer",
    },
    {
      quote: "4 callbacks from 6 submissions. Something definitely worked here.",
      name: "Aaliyah M.",
      role: "Junior Company",
    },
    {
      quote: "Updated my pic, suddenly got interviews. Companies that ignored me before.",
      name: "Harper E.",
      role: "Trainee",
    },
    {
      quote: "My skin looks like my skin, not some smoothed filter thing.",
      name: "Taylor H.",
      role: "Contemporary Ballet",
    },
    {
      quote: "Better than my $400 professional headshots from last year tbh.",
      name: "Olivia G.",
      role: "Principal Dancer",
    },
    {
      quote: "Ballet studio shots look professional enough for company auditions.",
      name: "Priya K.",
      role: "Pre-Professional Dancer",
    },
    {
      quote: "Got into programs that rejected me last year. Only changed photo.",
      name: "Kennedy I.",
      role: "Junior Company",
    },
    {
      quote: "Triple the callbacks since I switched. Should've done this earlier.",
      name: "Noah K.",
      role: "Company Artist",
    },
  ],
};

export const blackAndWhitePricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Professional, casual, smart casual',
      backgroundsTooltip: 'Studio, dark studio',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Professional, casual, smart casual',
      backgroundsTooltip: 'Studio, dark studio',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Professional, casual, smart casual',
      backgroundsTooltip: 'Studio, dark studio',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'black-and-white',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section-old.tsx
  testimonials: [
    {
      quote: "The black & white tones are rich, moody, and absolutely stunning.",
      name: "Margot E.",
      role: "Photographer",
    },
    {
      quote: "Switched to B&W and my LinkedIn profile views tripled instantly.",
      name: "Darren O.",
      role: "Management Consultant",
    },
    {
      quote: "Simple, elegant, timeless. The studio background is absolutely perfect.",
      name: "Riya V.",
      role: "UX Researcher",
    },
    {
      quote: "Color photos date fast. Black & white never does. Smart investment.",
      name: "Rochelle A.",
      role: "Financial Advisor",
    },
    {
      quote: "Feels like a magazine spread. The monochrome processing is gorgeous.",
      name: "Saoirse D.",
      role: "Brand Strategist",
    },
    {
      quote: "Better than my $700 studio shoot. The contrast is richer.",
      name: "Henrique A.",
      role: "Attorney",
    },
    {
      quote: "Colleagues asked who my photographer was. They didn't believe it's AI.",
      name: "Ingrid S.",
      role: "Marketing Director",
    },
    {
      quote: "That old Hollywood look, classic, glamorous, elegant, and refined.",
      name: "Valentina R.",
      role: "Interior Designer",
    },
    {
      quote: "The B&W gives gravitas. Clients take me more seriously now.",
      name: "Emeka O.",
      role: "Investment Banker",
    },
    {
      quote: "Not flat like cheap filters. Real grayscale depth and smooth gradients.",
      name: "Lakshmi N.",
      role: "Graphic Designer",
    },
    {
      quote: "B&W is unforgiving. Every detail shows. These still looked amazing.",
      name: "Zara O.",
      role: "Fashion Stylist",
    },
    {
      quote: "The classic B&W studio style has that timeless cinema quality.",
      name: "Tomás R.",
      role: "Dentist",
    },
  ],
};

export const bumblePricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Standard variety',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'A solid mix of different styles and backgrounds',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'More variety',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'A broader mix of different styles and backgrounds',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Maximum variety',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'The widest selection of styles, outfits, and backgrounds',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'bumble',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section-old.tsx
  // Note: Bumble testimonials have name only (no role)
  testimonials: [
    {
      quote: "These don't look AI-generated at all. Friends thought I hired someone.",
      name: "Janine K.",
      role: "",
    },
    {
      quote: "Professional quality without the awkwardness. Exactly what I needed.",
      name: "Dominique S.",
      role: "",
    },
    {
      quote: "I look approachable and relaxed instead of stiff. Big difference.",
      name: "Wade M.",
      role: "",
    },
    {
      quote: "The lighting and angles are better than most photographer shots.",
      name: "Sonia R.",
      role: "",
    },
    {
      quote: "Golden hour shots have this warm glow that looks completely natural.",
      name: "Chet W.",
      role: "",
    },
    {
      quote: "Just me with great lighting and a flattering angle. Perfect.",
      name: "Leanne D.",
      role: "",
    },
    {
      quote: "Face is centered, nothing awkward. Finally photos that look good.",
      name: "Vince A.",
      role: "",
    },
    {
      quote: "Park background, natural sunlight, genuine smile. Totally real looking.",
      name: "Monique H.",
      role: "",
    },
    {
      quote: "Soft, flattering lighting. Makes my skin look good without filters.",
      name: "Terrell N.",
      role: "",
    },
    {
      quote: "No stiff poses or awkward smiles. I look relaxed in every one.",
      name: "Yolanda F.",
      role: "",
    },
    {
      quote: "Better than my $350 photoshoot. More natural, more variety.",
      name: "Malcolm R.",
      role: "",
    },
    {
      quote: "Professional quality but completely believable as real candid shots.",
      name: "Candice L.",
      role: "",
    },
  ],
};

export const hairStylistPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, salon workspace, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, salon workspace, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, salon workspace, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'hair-stylist',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'My photo looks like I actually went to a real studio.',
      name: 'Jasmine T.',
      role: 'Stylist',
    },
    {
      quote: 'Came out flattering without looking fake or overly edited at all.',
      name: 'Jordan P.',
      role: 'Editorial Hairstylist',
    },
    {
      quote: 'Two new clients booked because my photo looked friendly and approachable.',
      name: 'Marisol G.',
      role: 'Bridal Hair Stylist',
    },
    {
      quote: 'The salon background actually looks like a real working salon.',
      name: 'Priya S.',
      role: 'Balayage Specialist',
    },
    {
      quote: 'These look just as good as my $400 professional headshots.',
      name: 'Miguel A.',
      role: 'Creative Director',
    },
    {
      quote: 'My new headshot makes people feel like they already know me.',
      name: 'Samantha B.',
      role: 'Curl Specialist',
    },
    {
      quote: 'What came back looked like an actual professional photoshoot. Jaw dropped.',
      name: 'Layla K.',
      role: 'Stylist',
    },
    {
      quote: 'Made my skin look great without that weird airbrushed fake look.',
      name: 'Gabrielle R.',
      role: 'Hairstylist',
    },
    {
      quote: 'My booking rate went up right after I changed my photos.',
      name: 'Brandon E.',
      role: 'Barber and Stylist',
    },
    {
      quote: 'My mentor said my new headshot looks like magazine quality work.',
      name: 'Elijah T.',
      role: 'Stylist',
    },
    {
      quote: 'These actually show my personality. Not sure how but they nailed it.',
      name: 'Monica F.',
      role: 'Bridal Stylist',
    },
    {
      quote: 'Got three new regular clients within two weeks of updating photos.',
      name: 'Amara O.',
      role: 'Natural Hair Specialist',
    },
  ],
};

export const estheticianPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, spa and treatment room, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, spa and treatment room, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, spa and treatment room, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'esthetician',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Studio lighting made my skin glow exactly how clients expect.',
      name: 'Brianna C.',
      role: 'Clinical Esthetician',
    },
    {
      quote: 'Five new facial bookings within days of updating my photo.',
      name: 'Madison T.',
      role: 'Licensed Extraction Specialist',
    },
    {
      quote: 'Spa background looked like my actual treatment room. Perfect match.',
      name: 'Chelsea B.',
      role: 'Spa Esthetician',
    },
    {
      quote: 'Nervous acne clients now feel safe booking with me online.',
      name: 'Taylor V.',
      role: 'Acne Clearing Specialist',
    },
    {
      quote: 'Photo looks exactly like me. Professional but completely real.',
      name: 'Destiny W.',
      role: 'Licensed Skincare Therapist',
    },
    {
      quote: 'Soft spa background doubled my consultation form submissions instantly.',
      name: 'Alyssa J.',
      role: 'Corrective Skincare Esthetician',
    },
    {
      quote: 'Clean studio backdrop made my LED service flyers look premium.',
      name: 'Paige D.',
      role: 'LED & Facial Specialist',
    },
    {
      quote: 'Sharp enough to frame next to my license. So polished.',
      name: 'Morgan G.',
      role: 'Medical Esthetician',
    },
    {
      quote: 'Three new clients said my photo made them book.',
      name: 'Kayla R.',
      role: 'Brow Lamination Specialist',
    },
    {
      quote: 'Clinical backdrop matched our med spa aesthetic exactly. Finally unified.',
      name: 'Courtney X.',
      role: 'Med Spa Lead Esthetician',
    },
    {
      quote: 'Outdoor lifestyle shot captured my clean beauty vibe perfectly.',
      name: 'Kendall E.',
      role: 'Clean Beauty Esthetician',
    },
    {
      quote: 'Urban background communicates my holistic philosophy to ideal clients instantly.',
      name: 'Megan C.',
      role: 'Holistic Organic Esthetician',
    },
  ],
};

export const entrepreneurPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, corporate office, boardroom, keynote speaker, city',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, corporate office, boardroom, keynote speaker, city',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, corporate office, boardroom, keynote speaker, city',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'entrepreneur',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'The VC commented on how professional my materials looked.',
      name: 'Marcus T.',
      role: 'Tech Startup Founder',
    },
    {
      quote: 'My cofounder thought I did a real photoshoot.',
      name: 'Robert S.',
      role: 'Agency Co-Founder',
    },
    {
      quote: 'Got three inbound leads within a week of updating.',
      name: 'Priya M.',
      role: 'Consulting Founder',
    },
    {
      quote: 'Looks like I run things from a corner office downtown.',
      name: 'Chris W.',
      role: 'Financial Services Entrepreneur',
    },
    {
      quote: 'This one actually captures how I want to come across.',
      name: 'Stephanie V.',
      role: 'Marketing Agency Owner',
    },
    {
      quote: 'Prospects used to hesitate. Now they book calls faster.',
      name: 'Derek M.',
      role: 'Freelance Consultant',
    },
    {
      quote: "My mentor asked for my photographer's info. There wasn't one.",
      name: 'Daniel R.',
      role: 'App Developer & Founder',
    },
    {
      quote: 'Looks like I walked into a real studio for hours.',
      name: 'Gregory N.',
      role: 'Healthcare Startup Founder',
    },
    {
      quote: 'Saw a noticeable bump in bookings within two weeks.',
      name: 'Carlos M.',
      role: 'Business Strategy Consultant',
    },
    {
      quote: "Expected it to look fake. It doesn't. Looks completely real.",
      name: 'Gregory N.',
      role: 'Healthcare Startup Founder',
    },
    {
      quote: 'My whole brand finally looks intentional and cohesive now.',
      name: 'Christina H.',
      role: 'Brand Strategist',
    },
    {
      quote: 'People recognize me now. Conversations start so much faster.',
      name: 'James A.',
      role: 'Real Estate Tech Founder',
    },
  ],
};

export const dentistPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'White coat, scrubs',
      backgroundsTooltip: 'Studio, dental clinic, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'White coat, scrubs',
      backgroundsTooltip: 'Studio, dental clinic, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'White coat, scrubs',
      backgroundsTooltip: 'Studio, dental clinic, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'dentist',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'The clinic background looks exactly like my actual office.',
      name: 'Michelle D.',
      role: 'Cosmetic Dentist',
    },
    {
      quote: 'Patients comment that I look exactly like my picture now.',
      name: 'Emily V.',
      role: 'General Dentist',
    },
    {
      quote: 'Parents trust me before we even meet. First impressions matter.',
      name: 'Sarah E.',
      role: 'Pediatric Dentist',
    },
    {
      quote: 'Results are honestly just as good as a four-hundred-dollar shoot.',
      name: 'Brian W.',
      role: 'Oral Surgeon',
    },
    {
      quote: 'Colleagues asked which photographer I used. I just smiled.',
      name: 'Lauren T.',
      role: 'Cosmetic Dentist',
    },
    {
      quote: 'My white coat never photographed this clean and crisp before.',
      name: 'Rebecca J.',
      role: 'Oral Surgeon',
    },
    {
      quote: "Finally something I'm proud to display at dental conferences.",
      name: 'Nicole B.',
      role: 'TMJ Specialist',
    },
    {
      quote: 'Several new patients said it made them feel at ease.',
      name: 'Jennifer K.',
      role: 'Cosmetic Dentist',
    },
    {
      quote: 'My booking requests have definitely increased since updating my profile.',
      name: 'Michelle D.',
      role: 'Cosmetic Dentist',
    },
    {
      quote: 'Nervous patients finally scheduled that overdue appointment after seeing me.',
      name: 'Maria C.',
      role: 'Sedation Dentist',
    },
    {
      quote: 'Looks studio perfect. My patients notice the difference right away.',
      name: 'Rachel M.',
      role: 'General Dentist',
    },
    {
      quote: 'Skeptical at first. The final image captured every detail perfectly.',
      name: 'Lisa N.',
      role: 'Prosthodontist',
    },
  ],
};

export const dataAnalystPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, work from home, business parks, city',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, work from home, business parks, city',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, work from home, business parks, city',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'data-analyst',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section-old.tsx
  testimonials: [
    {
      quote: "Looks like I hired a professional photographer for a fraction of the cost.",
      name: "Marcus L.",
      role: "Senior Data Analyst",
    },
    {
      quote: "The office background is so realistic my manager asked where I took it.",
      name: "Brian C.",
      role: "Marketing Data Analyst",
    },
    {
      quote: "Leadership finally connects my face to my insights and dashboards.",
      name: "Jennifer T.",
      role: "Data Analytics Lead",
    },
    {
      quote: "Coworkers genuinely thought I went to a professional photo studio.",
      name: "Antonio G.",
      role: "Operations Data Analyst",
    },
    {
      quote: "The lighting and background look better than my colleague's $400 headshot.",
      name: "Samantha E.",
      role: "Revenue Data Analyst",
    },
    {
      quote: "Got the senior role I applied for after updating my profile photo.",
      name: "Christopher J.",
      role: "Senior BI Developer",
    },
    {
      quote: "My home office backdrop looks exactly like corporate headquarters now.",
      name: "Robert D.",
      role: "E-commerce Data Analyst",
    },
    {
      quote: "The smart casual option looks polished but still natural and approachable.",
      name: "Emily Z.",
      role: "Growth Data Analyst",
    },
    {
      quote: "Freelance clients take me seriously from the very first conversation now.",
      name: "Monica Y.",
      role: "Independent Data Consultant",
    },
    {
      quote: "Clean studio background that looks timeless and works on every platform.",
      name: "Gregory H.",
      role: "Pricing Analyst",
    },
    {
      quote: "Quality rivals what my coworker paid four hundred dollars for downtown.",
      name: "Heather I.",
      role: "Inventory Data Analyst",
    },
    {
      quote: "Three recruiters messaged me the same week I updated my photo.",
      name: "Andrew T.",
      role: "Risk Data Analyst",
    },
  ],
};

export const businessPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, office, boardroom, city',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, office, boardroom, city',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, office, boardroom, city',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'business',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section-old.tsx
  testimonials: [
    {
      quote: "Studio style shots looked real and clean, far better than my selfies.",
      name: "Serena K.",
      role: "Office Administrator",
    },
    {
      quote: "Office background looked completely natural, like a real on site photo session.",
      name: "Greg M.",
      role: "Financial Advisor",
    },
    {
      quote: "Lighting and detail felt authentic, much sharper than my past paid headshots.",
      name: "Dalton P.",
      role: "Sales Strategist",
    },
    {
      quote: "Crisp studio look made my website feel more polished and trustworthy.",
      name: "Theo J.",
      role: "Small Business Consultant",
    },
    {
      quote: "Natural expressions and clean lighting helped every shot look genuinely professional.",
      name: "Felix Y.",
      role: "Business Development",
    },
    {
      quote: "Business casual versions looked relaxed yet polished, nothing stiff or artificial at all.",
      name: "Faith O.",
      role: "Account Planner",
    },
    {
      quote: "Backgrounds blended seamlessly. Coworkers assumed I hired a real photographer.",
      name: "Corbin L.",
      role: "Business Operations Lead",
    },
    {
      quote: "Bright, clear images instantly upgraded every profile I updated this week.",
      name: "Tessa B.",
      role: "Business Advisor",
    },
    {
      quote: "New headshot boosted profile views and made recruiters respond faster.",
      name: "Isaac W.",
      role: "Business Development",
    },
    {
      quote: "Clients noticed the update immediately and started engaging with me more.",
      name: "Holly W.",
      role: "Startup Founder",
    },
    {
      quote: "Clean business headshot made my pitch deck feel stronger and more credible.",
      name: "Jonah B.",
      role: "Business Coach",
    },
    {
      quote: "Updated photo increased trust with clients and improved responses to my emails.",
      name: "Nicole F.",
      role: "Customer Success Coordinator",
    },
  ],
};

export const castingPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, classic B&W studio, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, classic B&W studio, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, classic B&W studio, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'casting',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section-old.tsx
  testimonials: [
    {
      quote: "Sent these to my dream agency. Signed within one week.",
      name: "Tanesha W.",
      role: "Newly Signed Actor",
    },
    {
      quote: "Zero callbacks for months. Three callbacks in just two weeks.",
      name: "Brendan O.",
      role: "TV Actor",
    },
    {
      quote: "Booked my first national commercial three weeks after getting these done.",
      name: "DeShawn M.",
      role: "Commercial Actor",
    },
    {
      quote: "Booked a recurring TV role two weeks after updating my headshots.",
      name: "Declan F.",
      role: "TV Actor",
    },
    {
      quote: "Four audition requests this month alone. Studio lighting makes eyes pop.",
      name: "Marcus T.",
      role: "Film Actor",
    },
    {
      quote: "Zero auditions last month. Four this month. Studio quality is legit.",
      name: "Dmitri V.",
      role: "Aspiring Actor",
    },
    {
      quote: "Casting director said my shot stood out from hundreds of submissions.",
      name: "Rosalinda V.",
      role: "Commercial Actor",
    },
    {
      quote: "Old agent dropped me. New headshots got me signed in a week.",
      name: "Tyrell W.",
      role: "Newly Signed Actor",
    },
    {
      quote: "Manager said best shots ever. Already booked two commercial spots.",
      name: "Destiny M.",
      role: "Commercial Actor",
    },
    {
      quote: "Stage background perfect for Shakespeare. Got called in for two shows.",
      name: "Yusuf A.",
      role: "Theater Actor",
    },
    {
      quote: "Updated Tuesday. Three audition requests by Friday. It just works.",
      name: "Shaniqua D.",
      role: "TV Actor",
    },
    {
      quote: "Booked three spots since updating my portfolio. Outdoor backgrounds look real.",
      name: "Marisol D.",
      role: "Commercial Actor",
    },
  ],
};

export const ceoPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, corporate office, boardroom, keynote speaker, city',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, corporate office, boardroom, keynote speaker, city',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual',
      backgroundsTooltip: 'Studio, corporate office, boardroom, keynote speaker, city',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'ceo',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section-old.tsx
  testimonials: [
    {
      quote: "Sent it to our PR team. They thought I went to a photographer.",
      name: "Priya N.",
      role: "CEO",
    },
    {
      quote: "Forbes used it. Nobody said anything. That's how you know it works.",
      name: "Lauren H.",
      role: "CEO",
    },
    {
      quote: "PR agency asked who did the photography. Told them AI. They didn't believe me.",
      name: "Carlos J.",
      role: "CEO",
    },
    {
      quote: "I zoomed in expecting something off. Nothing. The fabric, the collar, all real.",
      name: "Michael C.",
      role: "CEO",
    },
    {
      quote: "Employees said I look friendlier. Didn't realize how bad my old photo was.",
      name: "Gregory Y.",
      role: "CEO",
    },
    {
      quote: "Our designer thought we'd hired someone. We did not hire someone.",
      name: "Victoria A.",
      role: "CEO",
    },
    {
      quote: "Better than my $600 professional photo. The lighting looks more natural somehow.",
      name: "Michelle D.",
      role: "CEO",
    },
    {
      quote: "My assistant thought I snuck out for a photoshoot. I did not.",
      name: "Marcus T.",
      role: "CEO",
    },
    {
      quote: "Genuinely looks like a studio shot. Nobody questioned it.",
      name: "James K.",
      role: "CEO",
    },
    {
      quote: "Three clients commented. One said I looked more trustworthy. Okay then.",
      name: "Steven R.",
      role: "CEO",
    },
    {
      quote: "VC partners noticed. One said everything looked buttoned up. Headshot helped.",
      name: "Hari S.",
      role: "CEO",
    },
    {
      quote: "Finally look like I take myself seriously. Clients have actually commented.",
      name: "Amanda O.",
      role: "CEO",
    },
  ],
};

export const chefPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, culinary workspace, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, culinary workspace, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, culinary workspace, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'chef',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section-old.tsx
  testimonials: [
    {
      quote: "Kitchen backgrounds looked real and sharp, like a true studio session.",
      name: "Aaron B.",
      role: "Executive Chef",
    },
    {
      quote: "Chef coat details came out clean and natural in every shot.",
      name: "Bianca R.",
      role: "Pastry Chef",
    },
    {
      quote: "Lighting looked warm and real, better than my last studio shoot.",
      name: "Renee T.",
      role: "Restaurant Chef",
    },
    {
      quote: "Outdoor restaurant backdrop looked authentic and boosted trust on our site.",
      name: "Damon K.",
      role: "Head Chef",
    },
    {
      quote: "Photos looked exactly like me, crisp and believable without weird edits.",
      name: "Stephanie G.",
      role: "Chef/Owner",
    },
    {
      quote: "Clean, realistic lighting made my restaurant profile look instantly more polished.",
      name: "Coral S.",
      role: "Pastry Lead",
    },
    {
      quote: "Sharp kitchen style backgrounds made my catering brand feel more professional online.",
      name: "Lynn P.",
      role: "Catering Chef",
    },
    {
      quote: "Natural, true to life colors beat every photo I’ve taken in a real kitchen.",
      name: "Julia N.",
      role: "Station Chef",
    },
    {
      quote: "Guests trusted me more after updating my headshot on our booking page.",
      name: "Mira W.",
      role: "Chef/Owner",
    },
    {
      quote: "Clients said my new photo looked friendly and boosted confidence in my services.",
      name: "Dana C.",
      role: "Personal Chef",
    },
    {
      quote: "Private dinner clients booked faster once my profile looked clean and professional.",
      name: "Shania D.",
      role: "Private Chef",
    },
    {
      quote: "Press requests became easier because my new headshot feels real and approachable.",
      name: "Elise J.",
      role: "Restaurant Chef",
    },
  ],
};

export const dancerPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dark studio, dance studio, theatre, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dark studio, dance studio, theatre, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dark studio, dance studio, theatre, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true,
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true,
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false,
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+",
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20",
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options",
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)",
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false,
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false,
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false,
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false,
    },
  ],
  category: 'dancer',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  // NEW: Testimonials moved from hardcoded pricing-section-old.tsx
  // Note: Dancer testimonials have name only (no role field)
  testimonials: [
    {
      quote: "My agent thought I hired someone expensive. She was shocked.",
      name: "Gabrielle N.",
      role: "",
    },
    {
      quote: "These headshots show my actual skin tone accurately. Really appreciate that.",
      name: "Amara E.",
      role: "",
    },
    {
      quote: "I like these better than my $350 photoshoot honestly.",
      name: "Jasmine A.",
      role: "",
    },
    {
      quote: "Quality is great too, not just fast. Really impressed.",
      name: "Travis M.",
      role: "",
    },
    {
      quote: "The lighting is actually really good and looks legit professional.",
      name: "Aaliyah M.",
      role: "",
    },
    {
      quote: "My agent didn't even realize they weren't from a photographer.",
      name: "Maya L.",
      role: "",
    },
    {
      quote: "Uploaded a selfie on my lunch break. Had great photos by dinner.",
      name: "Jordan K.",
      role: "",
    },
    {
      quote: "Parents respond better now. I've gotten more student inquiries.",
      name: "Carlos R.",
      role: "",
    },
    {
      quote: "Bookings have been better since I updated my photos.",
      name: "Leah C.",
      role: "",
    },
    {
      quote: "Seriously looks like I was in an actual photo studio.",
      name: "Vanessa G.",
      role: "",
    },
    {
      quote: "Sent to 10 choreographers this month. Two responses already.",
      name: "Damien S.",
      role: "",
    },
    {
      quote: "Definitely seeing more inquiries this month after updating.",
      name: "Andre D.",
      role: "",
    },
  ],
};

export const nailTechnicianPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, nail salon, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, nail salon, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, nail salon, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'nail-technician',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Looked like a real studio shoot using only quick selfies I uploaded.',
      name: 'Alicia M.',
      role: 'Nail Artist',
    },
    {
      quote: "Photos looked natural and clean, far better than anything I've taken myself.",
      name: 'Dana R.',
      role: 'Nail Technician',
    },
    {
      quote: 'Final picture felt bright and polished, exactly like a true studio portrait.',
      name: 'Tori B.',
      role: 'Nail Artist',
    },
    {
      quote: 'New headshot boosted trust fast, and clients booked sooner after seeing it.',
      name: 'Josie P.',
      role: 'Nail Salon Owner',
    },
    {
      quote: 'Results looked like a proper salon shoot without me leaving the shop.',
      name: 'Kelly S.',
      role: 'Acrylic Nail Tech',
    },
    {
      quote: 'Image had clean lighting and depth, just like a professional studio setup.',
      name: 'Harper W.',
      role: 'Nail Technician',
    },
    {
      quote: "Quality looked surprisingly real, matching photos I'd expect from an actual photographer.",
      name: 'Deanna Q.',
      role: 'Nail Technician',
    },
    {
      quote: 'Clients commented immediately that my page felt more trustworthy with this photo.',
      name: 'Serena P.',
      role: 'Nail Design Artist',
    },
    {
      quote: 'Polished headshot looked exactly like something from a real nail studio.',
      name: 'Marcus T.',
      role: 'Gel Nail Specialist',
    },
    {
      quote: 'Loved how natural everything looked, with lighting that felt truly studio quality.',
      name: 'Carly J.',
      role: 'Acrylic Nail Specialist',
    },
    {
      quote: 'Photo came out clean and friendly, matching the look of a real portrait.',
      name: 'Naomi D.',
      role: 'Salon Nail Tech',
    },
    {
      quote: 'My booking pages felt more professional instantly, and clients mentioned the change.',
      name: 'Carmen V.',
      role: 'Nail Artist',
    },
  ],
};

export const nursePricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, hospital, medical office, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, hospital, medical office, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, hospital, medical office, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'nurse',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Looked like a real studio shoot, not selfies from nights.',
      name: 'Amanda R.',
      role: 'Registered Nurse',
    },
    {
      quote: 'Badge photo finally sharp, bright, and professional without hiring photographers.',
      name: 'Marcus L.',
      role: 'Staff Nurse',
    },
    {
      quote: 'Cleaner headshot helped recruiters notice my profile and message back.',
      name: 'Kelly S.',
      role: 'ICU Nurse',
    },
    {
      quote: 'Somehow looks rested and natural, not fake or overly smoothed.',
      name: 'Elena V.',
      role: 'Pediatric Nurse',
    },
    {
      quote: 'Way better than my own camera attempts, with real studio lighting.',
      name: 'Danielle K.',
      role: 'NICU Nurse',
    },
    {
      quote: 'Patients see a warm, trustworthy photo before visits, which eases anxiety.',
      name: 'Samuel W.',
      role: 'Telehealth RN',
    },
    {
      quote: 'New grad headshot looks crisp and grown-up, not like student selfies.',
      name: 'Jasmine B.',
      role: 'New Grad Nurse',
    },
    {
      quote: 'Families recognize me from the website photo and feel comfortable instantly.',
      name: 'Lillian P.',
      role: 'Family Practice Nurse',
    },
    {
      quote: 'Photo looks exactly like me, just better lighting and calmer expression.',
      name: 'Heather W.',
      role: 'Oncology RN',
    },
    {
      quote: 'Car selfies turned into a polished hospital style portrait I actually like.',
      name: 'Carmen H.',
      role: 'Float Pool Nurse',
    },
    {
      quote: 'Stronger headshot helped my resume stand out and attract more interviews.',
      name: 'Xavier M.',
      role: 'Telemetry Nurse',
    },
    {
      quote: "Teammates swore it was studio photography; nobody guessed it's AI.",
      name: 'Felicia N.',
      role: 'Labor & Delivery Nurse',
    },
  ],
};

export const nursePractitionerPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'White coat, scrubs, business professional, business casual',
      backgroundsTooltip: 'Studio, hospital, medical office, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'White coat, scrubs, business professional, business casual',
      backgroundsTooltip: 'Studio, hospital, medical office, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'White coat, scrubs, business professional, business casual',
      backgroundsTooltip: 'Studio, hospital, medical office, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'nurse-practitioner',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Headshot looked natural, like a real studio photo day online.',
      name: 'Ava M.',
      role: 'Nurse Practitioner',
    },
    {
      quote: 'Scrubs headshot looks sharp and real, perfect for my urgent care.',
      name: 'Marcus T.',
      role: 'Family Nurse Practitioner',
    },
    {
      quote: 'New headshot helps patients recognize me online and feel calmer.',
      name: 'Samuel C.',
      role: 'Family Nurse Practitioner',
    },
    {
      quote: 'Clean hospital style background looks real, like photos our staff photographer takes.',
      name: 'Trevor W.',
      role: 'Cardiology Nurse Practitioner',
    },
    {
      quote: 'Soft office lighting looks natural, not fake, and matches our clinic site.',
      name: 'Carly D.',
      role: 'Internal Medicine Nurse Practitioner',
    },
    {
      quote: 'Parents said my new photo felt calmer and more kid friendly.',
      name: 'Holly E.',
      role: 'Pediatric Nurse Practitioner',
    },
    {
      quote: 'Scrubs headshot actually looks like me, not stiff or overdone.',
      name: 'Kelvin R.',
      role: 'Family Nurse Practitioner',
    },
    {
      quote: 'Studio style headshot looks crisp and confident, much better than rushed selfies.',
      name: 'Beth A.',
      role: 'Surgical Nurse Practitioner',
    },
    {
      quote: 'Community patients recognized me faster online, which helped build local trust.',
      name: 'Jodie L.',
      role: 'Community Health Nurse Practitioner',
    },
    {
      quote: 'Hospital background and lighting looked true to life, like real credential photos.',
      name: 'Malik S.',
      role: 'Emergency Nurse Practitioner',
    },
    {
      quote: 'White coat headshot finally feels flattering and real, not staged or stiff.',
      name: 'Megan U.',
      role: 'Internal Medicine Nurse Practitioner',
    },
    {
      quote: 'Updated headshot improved engagement after talks; people recognized me from events.',
      name: 'Taryn C.',
      role: 'Public Health Nurse Practitioner',
    },
  ],
};

export const personalTrainerPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, indoor gym, outdoor gym',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, indoor gym, outdoor gym',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, indoor gym, outdoor gym',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'personal-trainer',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Looked exactly like a real gym photoshoot, clean and natural.',
      name: 'Angela P.',
      role: 'Certified Personal Trainer',
    },
    {
      quote: 'Studio lighting looked believable and matched my real training environment perfectly.',
      name: 'Roman S.',
      role: 'Strength and Conditioning Coach',
    },
    {
      quote: 'Outdoor training background felt authentic, like my actual sessions with clients.',
      name: 'Carina L.',
      role: 'Outdoor Bootcamp Coach',
    },
    {
      quote: 'Clients reached out more after seeing a friendly, clearer profile photo.',
      name: 'Marina K.',
      role: 'Functional Fitness Coach',
    },
    {
      quote: 'Photo looked natural and professional, not stiff like older paid shoots.',
      name: 'Denise Y.',
      role: 'Personal Trainer',
    },
    {
      quote: 'Lighting appeared realistic and matched my daily gym setting flawlessly.',
      name: 'Yvette S.',
      role: 'Strength Coach',
    },
    {
      quote: 'Studio backdrop looked clean and sharp, perfect for professional networking.',
      name: 'Russell J.',
      role: 'Corporate Fitness Trainer',
    },
    {
      quote: 'More class signups came in after updating my profile image.',
      name: 'Wyatt G.',
      role: 'HIIT Instructor',
    },
    {
      quote: "Gym style background blended naturally with my facility’s equipment and flooring.",
      name: 'Ben C.',
      role: 'Senior Personal Trainer',
    },
    {
      quote: 'The headshot looked like me on a good day, naturally lit.',
      name: 'Jorge E.',
      role: 'Strength Specialist',
    },
    {
      quote: 'Outdoor track shot matched my real coaching sessions with sprinters.',
      name: 'Celeste M.',
      role: 'Speed and Agility Coach',
    },
    {
      quote: 'New photo helped newcomers feel comfortable booking their first training session.',
      name: 'Farrah S.',
      role: 'One-on-One Personal Trainer',
    },
  ],
};

export const lawyerPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, office, outdoor, city, nature',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, office, outdoor, city, nature',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, office, outdoor, city, nature',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'lawyer',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Looks like a real studio shot without any hassle at all.',
      name: 'Carla M.',
      role: 'Family Law Attorney',
    },
    {
      quote: 'Clean, sharp office style photo that finally feels truly professional.',
      name: 'Amanda R.',
      role: 'Civil Litigation Attorney',
    },
    {
      quote: 'Lighting and suit look natural, like a photographer actually shot it.',
      name: 'Jason F.',
      role: 'Employment Attorney',
    },
    {
      quote: 'Consistent, polished portraits that made our whole firm look aligned.',
      name: 'Noah B.',
      role: 'Managing Partner',
    },
    {
      quote: 'Fresh, modern headshot that instantly upgraded my entire online presence.',
      name: 'Steven D.',
      role: 'Antitrust Counsel',
    },
    {
      quote: 'City style background feels authentic and far better than my old selfie.',
      name: 'Hannah O.',
      role: 'Appellate Lawyer',
    },
    {
      quote: 'Quality looks premium, and the expressions feel natural and relaxed.',
      name: 'Julia C.',
      role: 'Commercial Contracts Lawyer',
    },
    {
      quote: 'Crisp photo that fits every platform and looks professionally taken.',
      name: 'Valerie S.',
      role: 'Bankruptcy Attorney',
    },
    {
      quote: 'Clients said I look more approachable, which helped build trust faster.',
      name: 'Grace P.',
      role: 'Immigration Lawyer',
    },
    {
      quote: 'My new image boosted calls from local clients searching online.',
      name: 'Liam H.',
      role: 'Personal Injury Lawyer',
    },
    {
      quote: 'Updated headshot made nervous clients feel safer reaching out to me.',
      name: 'Tara N.',
      role: 'Plaintiff Attorney',
    },
    {
      quote: 'Sharper, friendlier photo helped new clients feel comfortable contacting my office.',
      name: 'Rosa Y.',
      role: 'Estate Planning Attorney',
    },
  ],
};

export const linkedinPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, city, nature, wall and bricks',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, city, nature, wall and bricks',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, and smart casual',
      backgroundsTooltip: 'Studio, office, city, nature, and wall and bricks',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'linkedin',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Profile views tripled and recruiters finally started messaging me.',
      name: 'Dawne W.',
      role: 'HR Manager',
    },
    {
      quote: 'Colleagues asked which studio I used. They never guessed it was AI.',
      name: 'Tara N.',
      role: 'Marketing Coordinator',
    },
    {
      quote: 'Studio background looks more natural than my $400 professional photoshoot did.',
      name: 'Brett M.',
      role: 'Account Executive',
    },
    {
      quote: 'Office background with business professional attire fooled my manager completely.',
      name: 'Dina',
      role: 'Project Manager',
    },
    {
      quote: 'Brick wall background gives my freelance profile a creative, approachable vibe.',
      name: 'Casey O.',
      role: 'UX Designer',
    },
    {
      quote: 'Office background and business casual finally made me fit in professionally.',
      name: 'Steph',
      role: 'Management Consultant',
    },
    {
      quote: 'I never photograph well but these actually made me look great.',
      name: 'Meena M-S',
      role: 'Product Manager',
    },
    {
      quote: 'Updated my photo and my InMail response rate doubled overnight.',
      name: 'Rudy L.',
      role: 'Enterprise Sales Rep',
    },
    {
      quote: 'City background with business professional looks sharp and completely natural.',
      name: 'Jon F.',
      role: 'Real Estate Agent',
    },
    {
      quote: 'Textured wall and business casual. Now people actually compliment my photo.',
      name: 'Mary F.',
      role: 'Graphic Designer',
    },
    {
      quote: 'Nature background with smart casual is perfect for my personal brand.',
      name: 'Yemanya',
      role: 'Life Coach',
    },
    {
      quote: 'Best $35 I ever spent. One good headshot changes everything.',
      name: 'Max',
      role: 'Business Analyst',
    },
  ],
};

export const makeupArtistPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, makeup studio, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, makeup studio, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, makeup studio, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'makeup-artist',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Skin texture looks realistic, not that weird airbrushed plastic look.',
      name: 'Terrence W.',
      role: 'Film & TV Makeup Artist',
    },
    {
      quote: 'The eye color and detail came through beautifully in this photo.',
      name: 'Lucia F.',
      role: 'Freelance Makeup Artist',
    },
    {
      quote: 'A bride booked me for her entire party after seeing it.',
      name: 'Cassandra L.',
      role: 'On-Location Bridal MUA',
    },
    {
      quote: 'Soft, flattering lighting without that obvious ring light glare I hate.',
      name: 'Valentina R.',
      role: 'Theatrical Makeup Artist',
    },
    {
      quote: 'My contour and highlight show up perfectly. Cheekbones look sculpted.',
      name: 'Kendra Y.',
      role: 'Corporate Event MUA',
    },
    {
      quote: 'A bridal blog featured my work and used this new headshot.',
      name: 'Dominic A.',
      role: 'Celebrity Makeup Artist',
    },
    {
      quote: 'My blending skills actually show. You can tell I know makeup.',
      name: 'Gianna E.',
      role: 'Fashion Makeup Artist',
    },
    {
      quote: 'My signature red lip came through perfectly. True to life color.',
      name: 'Fatima Q.',
      role: 'Skincare & Makeup Artist',
    },
    {
      quote: 'A skincare brand reached out to collaborate after seeing my profile.',
      name: 'Zara B.',
      role: 'Beauty Brand Makeup Artist',
    },
    {
      quote: 'Clean studio backdrop puts all the focus on my face and artistry.',
      name: 'Elise T.',
      role: 'Editorial Makeup Artist',
    },
    {
      quote: 'Portfolio and headshot finally match. Everything looks high end and cohesive.',
      name: 'Natasha S.',
      role: 'High Fashion MUA',
    },
    {
      quote: 'A wedding planner added me to her exclusive vendor referral list.',
      name: 'Jared L.',
      role: 'On-Set Makeup Artist',
    },
  ],
};

export const massageTherapistPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, spa and wellness, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, spa and wellness, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, spa and wellness, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'massage-therapist',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Spa background looks exactly like my actual treatment room.',
      name: 'Brianna H.',
      role: 'LMT',
    },
    {
      quote: "Husband couldn't believe I didn't go to a real studio.",
      name: 'Heather Q.',
      role: 'Prenatal Massage Therapist',
    },
    {
      quote: 'Two new clients said my photo helped them decide to book.',
      name: 'Alicia R.',
      role: 'Prenatal Massage Therapist',
    },
    {
      quote: 'Soft lighting and calming tones match my brand exactly.',
      name: 'Nicole A.',
      role: 'LMT',
    },
    {
      quote: 'My photo finally matches the doctors on our referral network.',
      name: 'Tamika B.',
      role: 'LMT',
    },
    {
      quote: 'Chronic pain clients feel confident booking with me now.',
      name: 'Oscar F.',
      role: 'Myofascial Release Therapist',
    },
    {
      quote: 'Nature background feels authentic to what I actually offer clients.',
      name: 'Christina V.',
      role: 'LMT',
    },
    {
      quote: 'Clean and professional without looking stiff or corporate.',
      name: 'Diana S.',
      role: 'Shiatsu Massage Therapist',
    },
    {
      quote: 'Spa style background makes my small studio feel polished and upscale.',
      name: 'Jasmine O.',
      role: 'Spa Massage Therapist',
    },
    {
      quote: 'These headshots made my new practice look instantly established.',
      name: 'Victor N.',
      role: 'LMT',
    },
    {
      quote: 'The quality genuinely surprised both me and my husband.',
      name: 'Heather Q.',
      role: 'Prenatal Massage Therapist',
    },
    {
      quote: 'Inquiries jumped right after I updated my profiles.',
      name: 'Laura I.',
      role: 'CMT',
    },
  ],
};

export const modelPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dark studio, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dark studio, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dark studio, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'model',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Lighting and texture looked exactly like my real agency test shots.',
      name: 'Olivia P.',
      role: 'Fashion Model',
    },
    {
      quote: 'Studio backdrop looked authentic, with shadows matching real seamless paper sessions.',
      name: 'Riya V.',
      role: 'Catalog Model',
    },
    {
      quote: 'My freckles stayed visible, giving a truthful look agencies always appreciate.',
      name: 'Kaylee N.',
      role: 'Curve Model',
    },
    {
      quote: 'Beach background felt natural, with sunlight matching real swimwear shoot conditions.',
      name: 'Connor E.',
      role: 'Swimwear Model',
    },
    {
      quote: 'Close-crop details stayed sharp, perfect for beauty submissions needing clarity.',
      name: 'Faith L.',
      role: 'Beauty Model',
    },
    {
      quote: 'Natural shadows and skin tones made these shots feel completely believable.',
      name: 'Mia G.',
      role: 'Lifestyle Model',
    },
    {
      quote: 'The gray studio setup looked identical to backgrounds photographers actually use.',
      name: 'Hailey M.',
      role: 'Studio Model',
    },
    {
      quote: 'A client booked me after seeing this clean, confident new headshot.',
      name: 'Zach H.',
      role: 'Beauty Model',
    },
    {
      quote: 'A boutique reached out quickly after I updated my portfolio shot.',
      name: 'Brittany F.',
      role: 'Print Model',
    },
    {
      quote: 'A skincare brand approved my look immediately after receiving this updated headshot.',
      name: 'Derek H.',
      role: 'Commercial Model',
    },
    {
      quote: 'Urban street backdrop blended perfectly, matching locations I shoot in regularly.',
      name: 'Simon B.',
      role: 'Fashion Model',
    },
    {
      quote: 'A fitness recruiter contacted me soon after I changed my profile photo.',
      name: 'Nia A.',
      role: 'Fitness Model',
    },
  ],
};

export const musicianPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, music recording studio, stage, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail',
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, music recording studio, stage, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail',
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, music recording studio, stage, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition',
    },
  ],
  table_details: [
    {
      label: 'Realistic — looks like you',
      value_1: true,
      value_2: true,
    },
    {
      label: 'Studio-quality',
      value_1: true,
      value_2: true,
    },
    {
      label: 'No photoshoot',
      value_1: true,
      value_2: false,
    },
    {
      label: 'No dressing up',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delivery time',
      value_1: '15–45 minutes',
      value_2: '2–7 days+',
    },
    {
      label: 'Headshot count',
      value_1: '40–150',
      value_2: '10–20',
    },
    {
      label: 'Outfits',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Backgrounds',
      value_1: 'Multiple options',
      value_2: '1–2 options',
    },
    {
      label: 'Price',
      value_1: '$25–$55 (one-time)',
      value_2: '$500–$1,300+ (per session)',
    },
    {
      label: 'Full image rights',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Delete images anytime',
      value_1: true,
      value_2: false,
    },
    {
      label: 'Fully private & secure',
      value_1: true,
      value_2: false,
    },
    {
      label: '100% money-back',
      value_1: true,
      value_2: false,
    },
  ],
  category: 'musician',
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee',
  ],
  testimonials: [
    {
      quote: 'Studio quality shots made my EPK look like a real pro team.',
      name: 'Carlos T.',
      role: 'Hip-Hop Artist',
    },
    {
      quote: 'Lighting looked natural and clean, way better than my last photoshoot.',
      name: 'Fiona R.',
      role: 'Singer-Songwriter',
    },
    {
      quote: 'My press kit finally looks legit, and venues take me seriously now.',
      name: 'Brianna S.',
      role: 'Indie Singer',
    },
    {
      quote: 'Stage style backgrounds looked real enough that my band thought they were.',
      name: 'Jenna K.',
      role: 'Alt-Rock Vocalist',
    },
    {
      quote: 'Fans immediately noticed how polished my new profile photo looked.',
      name: 'Gabe L.',
      role: 'Pop Vocalist',
    },
    {
      quote: 'Crisp studio style shots made my festival submission look far more professional.',
      name: 'Chase R.',
      role: 'Touring Bassist',
    },
    {
      quote: 'Recording studio backgrounds looked completely real and matched my music brand perfectly.',
      name: 'Parker J.',
      role: 'Indie Producer',
    },
    {
      quote: 'My conductor complimented the clean, studio level quality of the new photos.',
      name: 'Ethan P.',
      role: 'Violinist',
    },
    {
      quote: 'These shots made my Apple Music profile look polished and trustworthy.',
      name: 'Olivia C.',
      role: 'Country Singer',
    },
    {
      quote: 'The natural colors and lighting made my curls look beautifully real.',
      name: 'Kylee D.',
      role: 'R&B Singer',
    },
    {
      quote: 'Studio-look images made my website relaunch feel sharp and professional overnight.',
      name: 'Xander K.',
      role: 'Metal Guitarist',
    },
    {
      quote: 'Clear, realistic shots helped my booking agent update my EPK instantly.',
      name: 'Sasha L.',
      role: 'Jazz Vocalist',
    },
  ],
};

export const surgeonPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'White coat, scrubs',
      backgroundsTooltip: 'Studio, surgical room, hospital, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'White coat, scrubs',
      backgroundsTooltip: 'Studio, surgical room, hospital, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'White coat, scrubs',
      backgroundsTooltip: 'Studio, surgical room, hospital, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "surgeon",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Looked like real hospital photos, not something made from quick selfies.",
      name: "Alex R.",
      role: "General Surgeon"
    },
    {
      quote: "White coat images felt natural and clean, like a proper onsite shoot.",
      name: "Priya S.",
      role: "Vascular Surgeon"
    },
    {
      quote: "The scrubs background looked authentic and matched my usual work setting.",
      name: "Maya L.",
      role: "Trauma Surgeon"
    },
    {
      quote: "Studio shots looked professionally lit, far better than my old photographer.",
      name: "Elena D.",
      role: "Breast Surgeon"
    },
    {
      quote: "Images looked crisp on every platform, even our hospital directory.",
      name: "Naomi B.",
      role: "Thoracic Surgeon"
    },
    {
      quote: "Photos looked bright and realistic, perfect for my academic faculty page.",
      name: "Harris J.",
      role: "Surgical Researcher"
    },
    {
      quote: "White coat shot came out clean and believable, like a real session.",
      name: "Denise R.",
      role: "Pediatric Trauma Surgeon"
    },
    {
      quote: "Scrubs option looked natural and professional, no awkward lighting anywhere.",
      name: "Cole B.",
      role: "Acute Care Surgeon"
    },
    {
      quote: "Patients said the new photo felt warm and trustworthy right away.",
      name: "Marcus G.",
      role: "Colorectal Surgeon"
    },
    {
      quote: "New headshot helped patients feel more comfortable before meeting me.",
      name: "Serena H.",
      role: "Foot & Ankle Surgeon"
    },
    {
      quote: "Improved my online presence; recruiters responded more after updating it.",
      name: "Rina J.",
      role: "Minimally Invasive Surgeon"
    },
    {
      quote: "Patients noticed the update and said I looked more approachable.",
      name: "Grant S.",
      role: "Hand Surgeon"
    }
  ]
};

export const teacherPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, classroom, campus',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, classroom, campus',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, classroom, campus',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "teacher",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Looked exactly like a real studio headshot, clean and natural.",
      name: "Grace P.",
      role: "Reading Intervention Teacher"
    },
    {
      quote: "Parents said my new photo felt warm, real, and trustworthy instantly.",
      name: "Wendy T.",
      role: "1st Grade Teacher"
    },
    {
      quote: "Soft, balanced lighting made my headshot look like a true pro session.",
      name: "Victor P.",
      role: "High School Band Teacher"
    },
    {
      quote: "Parents connected faster because my profile finally looked friendly and real.",
      name: "Derek L.",
      role: "Elementary PE Teacher"
    },
    {
      quote: "Campus background looked authentic and natural. Better than any photographer I’ve used.",
      name: "Emily R.",
      role: "Special Education Teacher"
    },
    {
      quote: "Students said it looked just like me, only clearer and more polished.",
      name: "Jason F.",
      role: "Virtual Teacher"
    },
    {
      quote: "Clear, natural lighting made my teacher portfolio photo look genuinely professional.",
      name: "Dana E.",
      role: "Student Teacher"
    },
    {
      quote: "Parents responded better this year after seeing a more approachable headshot.",
      name: "Wendy T.",
      role: "1st Grade Teacher"
    },
    {
      quote: "Studio style photo looked sharp and real. Even printed perfectly on our badges.",
      name: "Logan W.",
      role: "Music Teacher"
    },
    {
      quote: "Clean, authentic classroom backdrop made my bio look instantly more credible.",
      name: "Tyler C.",
      role: "Social Studies Teacher"
    },
    {
      quote: "Kids said the new photo made online class feel more personal.",
      name: "Jason F.",
      role: "Virtual Teacher"
    },
    {
      quote: "Parents recognized me right away thanks to a clearer, more natural photo.",
      name: "Alexis M.",
      role: "3rd Grade Teacher"
    }
  ]
};

export const theatricalPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, theater stage, backstage and rehearsal, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, theater stage, backstage and rehearsal, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, theater stage, backstage and rehearsal, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "theatrical",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "These theatrical shots nail the drama casting directors want to see.",
      name: "Marcus T.",
      role: "Stage Actor"
    },
    {
      quote: "The studio shots are stunning. Best my agent has ever seen.",
      name: "Derek W.",
      role: "Broadway Hopeful"
    },
    {
      quote: "Booked three callbacks after uploading these to my portfolio.",
      name: "Jasmine R.",
      role: "Theatre Actress"
    },
    {
      quote: "Better quality than my four hundred dollar professional photo session.",
      name: "Raymond C.",
      role: "Theatre Major"
    },
    {
      quote: "The shots captured intensity and vulnerability auditions demand.",
      name: "Keisha D.",
      role: "Drama Student"
    },
    {
      quote: "These headshots actually convey energy, presence, and real emotion.",
      name: "Andre P.",
      role: "Shakespeare Company Member"
    },
    {
      quote: "Signed with a new agency partly because of these headshots.",
      name: "Christina E.",
      role: "Professional Actress"
    },
    {
      quote: "Stage lighting backdrop made my features really stand out beautifully.",
      name: "Damien D.",
      role: "Dinner Theatre Actor"
    },
    {
      quote: "The theatrical shots captured real emotion, not stiff AI poses.",
      name: "Priscilla T.",
      role: "Stage Performer"
    },
    {
      quote: "Casting directors have noticed my elegant, classic stage look now.",
      name: "Meredith C.",
      role: "Classical Theatre Actress"
    },
    {
      quote: "These headshots show range and emotion in every single shot.",
      name: "Nicole J.",
      role: "Theatre Arts Major"
    },
    {
      quote: "The performance backdrop adds incredible depth to my portfolio shots.",
      name: "Alicia N.",
      role: "Regional Theatre Performer"
    }
  ]
};

export const therapistPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Professional, casual, white coat',
      backgroundsTooltip: 'Studio, therapist office, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Professional, casual, white coat',
      backgroundsTooltip: 'Studio, therapist office, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Professional, casual, white coat',
      backgroundsTooltip: 'Studio, therapist office, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "therapist",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Studio look felt real and warm on my Psychology Today page.",
      name: "Megan R.",
      role: "Licensed Therapist"
    },
    {
      quote: "Clean office style photo that looked exactly like a real shoot.",
      name: "Marcus L.",
      role: "Mental Health Counselor"
    },
    {
      quote: "Natural lighting made my headshot look calm and truly like me.",
      name: "Hana W.",
      role: "LCSW"
    },
    {
      quote: "Clients said my new photo felt more welcoming before our sessions.",
      name: "Ivana G.",
      role: "Mental Health Counselor"
    },
    {
      quote: "Therapy room background looked natural and blended perfectly with my website.",
      name: "Claire D.",
      role: "LMHC"
    },
    {
      quote: "Soft studio style looked polished without feeling stiff or fake.",
      name: "Diego F.",
      role: "Therapist"
    },
    {
      quote: "New photo instantly made intake clients feel safer reaching out.",
      name: "Janelle P.",
      role: "LPC"
    },
    {
      quote: "Warm office background created a believable, professional look in minutes.",
      name: "Ravi M.",
      role: "Psychotherapist"
    },
    {
      quote: "Updated headshot helped clients connect faster during first telehealth meetings.",
      name: "Paige M.",
      role: "Licensed Therapist"
    },
    {
      quote: "Outdoor background looked authentic and matched my counseling brand well.",
      name: "Felicia D.",
      role: "LMHC"
    },
    {
      quote: "Realistic lighting helped me look relaxed, not posed or edited.",
      name: "Olivia K.",
      role: "Mental Health Counselor"
    },
    {
      quote: "Better first impressions led to more new clients visiting my profile.",
      name: "Reed A.",
      role: "LCSW"
    }
  ]
};

export const tinderPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Standard variety',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'A solid mix of different styles and backgrounds',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'More variety',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'A broader mix of different styles and backgrounds',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Maximum variety',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'The widest selection of styles, outfits, and backgrounds',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "tinder",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Skin texture looks authentic. No plastic AI smoothing anywhere.",
      name: "Tobias H.",
      role: ""
    },
    {
      quote: "These headshots compete with actual professional photographer results.",
      name: "Kofi L.",
      role: ""
    },
    {
      quote: "Sharp focus, proper exposure, real photography standards met.",
      name: "Eoghan N.",
      role: ""
    },
    {
      quote: "Soft lighting eliminates unflattering shadows under eyes and chin.",
      name: "Colm B.",
      role: ""
    },
    {
      quote: "Background blur looks like actual camera bokeh not AI smudging.",
      name: "Cedric Y.",
      role: ""
    },
    {
      quote: "Still looks like me just with proper lighting and composition.",
      name: "Renata S.",
      role: ""
    },
    {
      quote: "No uncanny valley weirdness. Features are accurate and proportional.",
      name: "Renata S.",
      role: ""
    },
    {
      quote: "Clean studio background, even lighting, sharp focus on eyes.",
      name: "Clifton R.",
      role: ""
    },
    {
      quote: "Golden hour lighting on my face looks like a real outdoor shoot.",
      name: "Kwame J.",
      role: ""
    },
    {
      quote: "Natural expression captured. Not that frozen smile I usually have.",
      name: "Saoirse K.",
      role: ""
    },
    {
      quote: "City backgrounds look authentic not pasted. Depth of field is realistic.",
      name: "Tricia O.",
      role: ""
    },
    {
      quote: "Color accuracy impressed me. Skin tone actually matches reality.",
      name: "Griffin J.",
      role: ""
    }
  ]
};

export const yogaTeacherPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, indoor yoga studio, outdoor yoga wellness',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, indoor yoga studio, outdoor yoga wellness',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, indoor yoga studio, outdoor yoga wellness',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "yoga-teacher",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Headshot finally looks natural and calm, not posed or stiff.",
      name: "Elena M.",
      role: "Workshop & Retreat Leader"
    },
    {
      quote: "Clear, studio style photo that actually matches how I look teaching.",
      name: "Grace T.",
      role: "Yoga Teacher"
    },
    {
      quote: "Clients booked faster once my profile photo looked warm and trustworthy.",
      name: "Talia Z.",
      role: "Family Yoga Instructor"
    },
    {
      quote: "Soft studio background made my photo feel real, grounded, and relaxed.",
      name: "Nolan G.",
      role: "Trauma-Informed Yoga Teacher"
    },
    {
      quote: "Looks like a true studio shoot, even from quick phone selfies.",
      name: "Leo V.",
      role: "Hatha Yoga Teacher"
    },
    {
      quote: "More students joined after seeing a friendly, welcoming photo on ClassPass.",
      name: "Carmen J.",
      role: "Multi-Studio Yoga Instructor"
    },
    {
      quote: "Natural lighting and calm colors finally reflect my actual in-class vibe.",
      name: "Amber L.",
      role: "Vinyasa Yoga Teacher"
    },
    {
      quote: "Sharply detailed headshot that feels real, simple, and totally authentic.",
      name: "Wendy Q.",
      role: "Evening Flow Instructor"
    },
    {
      quote: "Retreat signups increased once my site showed a clear, inviting photo.",
      name: "Kelsey P.",
      role: "Yoga Retreat Host"
    },
    {
      quote: "Realistic studio backdrop makes my image blend perfectly with my branding.",
      name: "Viktor C.",
      role: "Senior Yoga Teacher"
    },
    {
      quote: "Students said my new picture looks calm, open, and truly like me.",
      name: "Imani D.",
      role: "Community Yoga Teacher"
    },
    {
      quote: "Clear, grounded photo helped new clients feel safe booking private sessions.",
      name: "Jonah S.",
      role: "Prenatal Yoga Instructor"
    }
  ]
};

export const professionalPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Pick from multiple outfits tailored to your needs',
      backgroundsTooltip: 'Pick from multiple backgrounds tailored to your needs',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Pick from multiple outfits tailored to your needs',
      backgroundsTooltip: 'Pick from multiple backgrounds tailored to your needs',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Pick from multiple outfits tailored to your needs',
      backgroundsTooltip: 'Pick from multiple backgrounds tailored to your needs',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "professional",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Studio lighting looked real and crisp, like an actual corporate shoot.",
      name: "David L.",
      role: "Financial Analyst"
    },
    {
      quote: "Clean office style headshot looked natural and perfectly matched my role.",
      name: "Jessica T.",
      role: "Marketing Manager"
    },
    {
      quote: "New headshot helped clients trust me faster during first introductions.",
      name: "Sabrina U.",
      role: "Financial Planner"
    },
    {
      quote: "Sharp city-backdrop portrait looked exactly like a professional photographer took it.",
      name: "Brandon C.",
      role: "Operations Director"
    },
    {
      quote: "Image felt natural and well lit, not stiff or overedited at all.",
      name: "Eric B.",
      role: "Account Manager"
    },
    {
      quote: "More recruiters replied after updating my profile with this polished headshot.",
      name: "Ashley P.",
      role: "Product Manager"
    },
    {
      quote: "Studio background and suit details looked clean, sharp, and incredibly realistic.",
      name: "Brian I.",
      role: "Corporate Attorney"
    },
    {
      quote: "Office style photo blended perfectly across LinkedIn, email, and internal tools.",
      name: "Nicole M.",
      role: "Software Engineer"
    },
    {
      quote: "Clients connected faster once my proposals showed a confident, clear headshot.",
      name: "Anthony D.",
      role: "Business Consultant"
    },
    {
      quote: "Lighting looked like a real studio setup, bright and evenly balanced.",
      name: "Marcus H.",
      role: "IT Manager"
    },
    {
      quote: "Polished, trustworthy image helped me stand out on my company directory.",
      name: "Ryan F.",
      role: "Tax Associate"
    },
    {
      quote: "New headshot improved first impressions with partners during presentations and pitches.",
      name: "Thomas E.",
      role: "Agency Owner"
    }
  ]
};

export const professorPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, academic and research, library, lecture and teaching spaces, campus, academic outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, academic and research, library, lecture and teaching spaces, campus, academic outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, academic and research, library, lecture and teaching spaces, campus, academic outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "professor",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Headshots looked like real campus portraits with natural lighting and detail.",
      name: "Emma L.",
      role: "Associate Professor of Sociology"
    },
    {
      quote: "They looked exactly like images taken by our actual university photographer.",
      name: "Sabrina T.",
      role: "Professor of History"
    },
    {
      quote: "These headshots felt genuine and crisp which made my whole profile stronger.",
      name: "Nina K.",
      role: "Associate Professor of Chemistry"
    },
    {
      quote: "Students reached out more because the new headshots felt warm and real.",
      name: "Mark S.",
      role: "Senior Lecturer in Philosophy"
    },
    {
      quote: "The set looked professional enough for conferences and perfectly matched campus settings.",
      name: "Leah C.",
      role: "Assistant Professor of Political Science"
    },
    {
      quote: "Colleagues thought the headshots came from a studio because they looked so natural.",
      name: "Victor D.",
      role: "Associate Professor of Chemistry"
    },
    {
      quote: "Students connected faster since the updated images matched my real classroom presence.",
      name: "Jon A.",
      role: "Lecturer in Psychology"
    },
    {
      quote: "The headshots blended perfectly with our departmental style and looked truly authentic.",
      name: "Patricia F.",
      role: "Professor of Sociology"
    },
    {
      quote: "The images looked clear and consistent which made them ideal for my dossier.",
      name: "Celia M.",
      role: "Associate Professor of English"
    },
    {
      quote: "My lab recruits responded better once my updated headshots looked approachable.",
      name: "Marisol A.",
      role: "Professor of Neuroscience"
    },
    {
      quote: "The portraits matched real academic spaces so well they felt naturally taken.",
      name: "Calvin J.",
      role: "Professor of History"
    },
    {
      quote: "My online students said the clearer headshots made me feel more familiar.",
      name: "Nadia Y.",
      role: "Professor of Sociology"
    }
  ]
};

export const psychologistPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Professional, casual',
      backgroundsTooltip: 'Studio, therapy office setting, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Professional, casual',
      backgroundsTooltip: 'Studio, therapy office setting, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Professional, casual',
      backgroundsTooltip: 'Studio, therapy office setting, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "psychologist",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Outdoor portrait felt inviting, which helped teens relax before first sessions.",
      name: "Spencer K.",
      role: "School Psychologist"
    },
    {
      quote: "Studio background looked natural and steady, perfect for my therapy style.",
      name: "Courtney A.",
      role: "Clinical Psychologist"
    },
    {
      quote: "New image made anxious clients feel safer choosing me from large directories.",
      name: "Henry S.",
      role: "Telehealth Psychologist"
    },
    {
      quote: "Calm office setting made the headshot feel genuine and very professional.",
      name: "Malik D.",
      role: "Child and Adolescent Psychologist"
    },
    {
      quote: "Updated photo looked clean, modern, and much more natural than past shoots.",
      name: "Kendra L.",
      role: "Clinical Counselor"
    },
    {
      quote: "Office background delivered a soft, calm feeling I wanted clients to see.",
      name: "Sierra N.",
      role: "Therapist"
    },
    {
      quote: "Clients said the warm photo helped them feel comfortable starting therapy.",
      name: "Marcus L.",
      role: "Licensed Psychologist"
    },
    {
      quote: "Therapy room backdrop felt real and matched the atmosphere of my practice.",
      name: "Grant Y.",
      role: "Licensed Therapist"
    },
    {
      quote: "Studio look captured a grounded tone that fits trauma focused work well.",
      name: "Ethan C.",
      role: "Trauma Therapist"
    },
    {
      quote: "Outdoor lighting made the image feel warm, relaxed, and completely authentic.",
      name: "Dipika N.",
      role: "Counseling Psychologist"
    },
    {
      quote: "Final images looked polished yet real, just how I like appearing.",
      name: "Megan R.",
      role: "Clinical Psychologist"
    },
    {
      quote: "Several new clients mentioned the friendly photo when scheduling their first visit.",
      name: "Diego B.",
      role: "Counseling Psychologist"
    }
  ]
};

export const realEstateAgentPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, office, house, city, nature',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, office, house, city, nature',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, office, house, city, nature',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "real-estate-agent",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Studio style shots looked real and boosted my overall brand feel.",
      name: "Sofia L.",
      role: "Residential Agent"
    },
    {
      quote: "Clean house backgrounds looked natural and made my listings feel sharper.",
      name: "Megan T.",
      role: "Real Estate Agent"
    },
    {
      quote: "Lighting looked truly professional, far better than my last photographer.",
      name: "Logan M.",
      role: "Real Estate Agent"
    },
    {
      quote: "New headshot felt so real that my team thought it was studio.",
      name: "Justin K.",
      role: "Realtor"
    },
    {
      quote: "Clients trusted me faster after updating my Zillow photo with this.",
      name: "Paige C.",
      role: "Buyer & Seller Agent"
    },
    {
      quote: "More buyers reached out once my profile picture looked polished and warm.",
      name: "Henry P.",
      role: "Real Estate Consultant"
    },
    {
      quote: "House-style background looked authentic and fit perfectly with my marketing.",
      name: "Lauren F.",
      role: "Luxury Real Estate Agent"
    },
    {
      quote: "Studio version looked crisp and natural, even printed large for signs.",
      name: "Patrick Y.",
      role: "Realtor"
    },
    {
      quote: "My updated headshot drew more interest from new online buyers.",
      name: "Daniel R.",
      role: "Realtor"
    },
    {
      quote: "Cleaner, sharper photo made open house visitors say I looked more professional.",
      name: "Brianna J.",
      role: "Real Estate Advisor"
    },
    {
      quote: "Realistic office backdrop made me look confident without feeling overly formal.",
      name: "Hannah S.",
      role: "Buyer Agent"
    },
    {
      quote: "Quality looked so real that clients commented before we even met.",
      name: "Trevor L.",
      role: "Listing Specialist"
    }
  ]
};

export const salesExecutivePricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, corporate sales environment, city, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, corporate sales environment, city, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, corporate sales environment, city, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "sales-executive",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Headshot looked studio real and made my profile feel instantly credible.",
      name: "Michael R.",
      role: "Senior Sales Executive"
    },
    {
      quote: "Crisp lighting and clean office backdrop made my picture look truly professional.",
      name: "Lauren B.",
      role: "Software Sales Executive"
    },
    {
      quote: "Realistic suit and soft background helped me appear polished on every platform.",
      name: "Jason L.",
      role: "Regional Sales Director"
    },
    {
      quote: "New photo felt real and natural, not something made on a computer.",
      name: "Brandon E.",
      role: "Enterprise SaaS Seller"
    },
    {
      quote: "Clean, sharp headshot boosted replies and made first calls start smoother.",
      name: "Hannah K.",
      role: "SMB Account Manager"
    },
    {
      quote: "Studio quality look made my LinkedIn stand out and attract better leads.",
      name: "Christopher J.",
      role: "Enterprise Sales Executive"
    },
    {
      quote: "Natural lighting and modern office scene made my image look authentically shot.",
      name: "Megan D.",
      role: "Territory Sales Manager"
    },
    {
      quote: "Realistic blazer and background gave me confidence for every client meeting.",
      name: "Tyler N.",
      role: "B2B Sales Executive"
    },
    {
      quote: "Updated photo helped clients trust me faster on first introduction calls.",
      name: "Kayla H.",
      role: "Local Territory Manager"
    },
    {
      quote: "Sharper image made my outreach feel more credible and improved email engagement.",
      name: "Olivia G.",
      role: "Business Development Representative"
    },
    {
      quote: "Authentic, clean headshot helped our deck impress leadership during key pitch.",
      name: "Alicia J.",
      role: "Enterprise Account Manager"
    },
    {
      quote: "Professional looking headshot helped new accounts warm up before our first meeting.",
      name: "Rachel V.",
      role: "Account Executive"
    }
  ]
};

export const salesManagerPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, corporate sales environment, city, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, corporate sales environment, city, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, corporate sales environment, city, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "sales-manager",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Headshot looks like a real studio shoot, not hurried office photo.",
      name: "Hailey G.",
      role: "Corporate Sales Manager"
    },
    {
      quote: "Lighting looks natural and even, way better than past photographer sessions.",
      name: "Jillian M.",
      role: "Sales Team Lead"
    },
    {
      quote: "New photo finally matches our polished leadership page and branding online.",
      name: "Spencer F.",
      role: "Channel Sales Manager"
    },
    {
      quote: "Crisp, clear image on LinkedIn and Salesforce, no more blurry selfie.",
      name: "Morgan E.",
      role: "Territory Sales Manager"
    },
    {
      quote: "Office background feels authentic, like it was taken inside our headquarters.",
      name: "Logan S.",
      role: "Inside Sales Manager"
    },
    {
      quote: "Clean, modern headshot that actually looks like me on good days.",
      name: "Ashley K.",
      role: "Sales Manager"
    },
    {
      quote: "Printed great on conference badge and looked sharp in event app.",
      name: "Lindsay R.",
      role: "Sales Manager"
    },
    {
      quote: "Looks professional on every platform, from email signature to company site.",
      name: "Colin W.",
      role: "National Sales Manager"
    },
    {
      quote: "Prospects mentioned my photo looked professional, which helped start warmer conversations.",
      name: "Kayla V.",
      role: "Enterprise Sales Manager"
    },
    {
      quote: "Clients recognized me instantly from my profile picture at onsite meetings.",
      name: "Derek H.",
      role: "Regional Sales Manager"
    },
    {
      quote: "More positive replies after updating headshot; outreach feels less like spam.",
      name: "Tyler K.",
      role: "Account Development Manager"
    },
    {
      quote: "Team and cross-functional partners take me more seriously with this photo.",
      name: "Grant Y.",
      role: "Enterprise Sales Manager"
    }
  ]
};

export const singerPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, music recording studio, stage, outdoor',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, music recording studio, stage, outdoor',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      backgroundsTooltip: 'Studio, dramatic, music recording studio, stage, outdoor',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "singer",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Studio backgrounds looked real enough that people asked who photographed me.",
      name: "Mia R.",
      role: "Touring Singer"
    },
    {
      quote: "Lighting felt natural, like a real session inside an actual recording studio.",
      name: "Serena V.",
      role: "Session Singer"
    },
    {
      quote: "Even quick phone selfies became clean shots that looked truly professional.",
      name: "Marcus J.",
      role: "Soul Singer"
    },
    {
      quote: "Press used my new studio shot instantly because it looked authentic.",
      name: "Aaron P.",
      role: "Country Singer"
    },
    {
      quote: "Fans thought I hired a photographer after seeing my updated promo photos.",
      name: "Trent L.",
      role: "Alternative Singer"
    },
    {
      quote: "Producer responded faster after seeing my polished headshot on the pitch.",
      name: "Jordan F.",
      role: "Singer-Songwriter"
    },
    {
      quote: "My agent approved the update immediately since the photos looked casting ready.",
      name: "Jamie L.",
      role: "Commercial Vocalist"
    },
    {
      quote: "These headshots looked like real stage photos with natural lighting and depth.",
      name: "Wesley R.",
      role: "Rock Singer"
    },
    {
      quote: "Magazine accepted my image with no edits because it looked professional.",
      name: "Elise M.",
      role: "Touring Vocalist"
    },
    {
      quote: "Fans noticed the upgrade right away and said my visuals felt stronger.",
      name: "Vivienne C.",
      role: "Live Performer"
    },
    {
      quote: "My Patreon members commented that my new headshot looked incredibly polished.",
      name: "Gianna T.",
      role: "Vocal Creator"
    },
    {
      quote: "The cleaner headshot helped my audition reel get better attention from directors.",
      name: "Devon K.",
      role: "Classical Vocalist"
    }
  ]
};

export const softwareEngineerPricing: PricingDetails = {
  plans: [
    {
      name: 'Starter',
      price: 25,
      originalPrice: 35,
      headshots: 40,
      generationTime: '45 Minutes generation time',
      attires: 'Choice of 1 outfit',
      backgrounds: 'Choice of 1 background',
      resolution: 'Standard resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      headshotsTooltip: '40 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, work from home, business parks, city, wall and bricks',
      resolutionTooltip: 'Good-quality headshots with standard detail'
    },
    {
      name: 'Basic',
      price: 35,
      originalPrice: 55,
      headshots: 100,
      generationTime: '30 Minutes generation time',
      attires: 'Choice of 2 outfits',
      backgrounds: 'Choice of 2 backgrounds',
      resolution: 'HD resolution',
      buttonText: 'Select',
      buttonVariant: 'default',
      popular: true,
      badge: '⭐ 87% choose this',
      headshotsTooltip: '100 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, work from home, business parks, city, wall and bricks',
      resolutionTooltip: 'High-quality headshots with higher sharpness and detail'
    },
    {
      name: 'Premium',
      price: 55,
      originalPrice: 75,
      headshots: 150,
      generationTime: '15 Minutes generation time',
      attires: 'Choice of multiple outfits',
      backgrounds: 'Choice of multiple backgrounds',
      resolution: 'High resolution',
      buttonText: 'Select',
      buttonVariant: 'outline',
      badge: '+Best Value',
      badgeIsBlue: true,
      headshotsTooltip: '150 AI headshots in multiple looks',
      generationTimeTooltip: 'Time to generate your headshots after uploading selfies',
      attiresTooltip: 'Business professional, business casual, smart casual',
      backgroundsTooltip: 'Studio, office, work from home, business parks, city, wall and bricks',
      resolutionTooltip: 'Top-quality headshots with maximum detail and definition'
    }
  ],
  table_details: [
    {
      label: "Realistic — looks like you",
      value_1: true,
      value_2: true
    },
    {
      label: "Studio-quality",
      value_1: true,
      value_2: true
    },
    {
      label: "No photoshoot",
      value_1: true,
      value_2: false
    },
    {
      label: "No dressing up",
      value_1: true,
      value_2: false
    },
    {
      label: "Delivery time",
      value_1: "15–45 minutes",
      value_2: "2–7 days+"
    },
    {
      label: "Headshot count",
      value_1: "40–150",
      value_2: "10–20"
    },
    {
      label: "Outfits",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Backgrounds",
      value_1: "Multiple options",
      value_2: "1–2 options"
    },
    {
      label: "Price",
      value_1: "$25–$55 (one-time)",
      value_2: "$500–$1,300+ (per session)"
    },
    {
      label: "Full image rights",
      value_1: true,
      value_2: false
    },
    {
      label: "Delete images anytime",
      value_1: true,
      value_2: false
    },
    {
      label: "Fully private & secure",
      value_1: true,
      value_2: false
    },
    {
      label: "100% money-back",
      value_1: true,
      value_2: false
    }
  ],
  category: "software-engineer",
  allPlansInclude: [
    'One-time payment — no subscriptions',
    'Full image rights — use anywhere',
    '100% money-back guarantee'
  ],
  testimonials: [
    {
      quote: "Studio style office photo looked real, friends assumed I hired photographer.",
      name: "Aaron M.",
      role: "Software Engineer"
    },
    {
      quote: "Uploaded selfies between stand-ups, got sharp, clean headshots minutes later.",
      name: "Bella R.",
      role: "Frontend Engineer"
    },
    {
      quote: "Saved me from rescheduling, conference speaker page now looks truly professional.",
      name: "Carlos D.",
      role: "Backend Engineer"
    },
    {
      quote: "Home office background feels natural and real, even my manager was fooled.",
      name: "Dana S.",
      role: "Senior Software Engineer"
    },
    {
      quote: "Even after long nights coding, photos look bright, rested, and professional.",
      name: "Hannah B.",
      role: "Software Engineer"
    },
    {
      quote: "Soft office lighting looks authentic, perfect for conference submission headshots and profiles.",
      name: "Natalie H.",
      role: "Software Engineer"
    },
    {
      quote: "Expected average results, got crisp, natural looking angles that upgraded every profile.",
      name: "Riley G.",
      role: "ML Engineer"
    },
    {
      quote: "Conference badge photo looked sharp and friendly, helped me start conversations.",
      name: "Trevor L.",
      role: "Software Engineer"
    },
    {
      quote: "New headshot boosted responses from recruiters, portfolio and resume feel credible.",
      name: "Isaac C.",
      role: "Full-Stack Engineer"
    },
    {
      quote: "Tech campus background looks modern, clean, and surprisingly real, not cheesy stock.",
      name: "Wendy M.",
      role: "Frontend Developer"
    },
    {
      quote: "Started with grainy car selfies, still ended up with sharp, polished headshot.",
      name: "Zach E.",
      role: "Full-Stack Engineer"
    },
    {
      quote: "Clean, trustworthy headshot helped remote startup clients feel comfortable working together.",
      name: "Brandon U.",
      role: "Software Engineer"
    }
  ]
};

// Export all pricing data
export const pricingData = {
  professional: professionalPricing,
  realtor: realtorPricing,
  corporate: corporatePricing,
  linkedin: linkedinPricing,
  lawyer: lawyerPricing,
  teacher: teacherPricing,
  eras: erasPricing,
  graduation: graduationPricing,
  actor: actorPricing,
  executive: executivePricing,
  dating: datingPricing,
  doctor: doctorPricing,
  architect: architectPricing,
  author: authorPricing,
  balletdancer: balletDancerPricing,
  blackandwhite: blackAndWhitePricing,
  hairdresser: hairdresserPricing,
  hinge: hingePricing,
  interiordesigner: interiorDesignerPricing,
  bumble: bumblePricing,
  hairstylist: hairStylistPricing,
  esthetician: estheticianPricing,
  entrepreneur: entrepreneurPricing,
  dentist: dentistPricing,
  dataanalyst: dataAnalystPricing,
  business: businessPricing,
  casting: castingPricing,
  ceo: ceoPricing,
  chef: chefPricing,
  dancer: dancerPricing,
  nailtechnician: nailTechnicianPricing,
  nurse: nursePricing,
  nursepractitioner: nursePractitionerPricing,
  personaltrainer: personalTrainerPricing,
  makeupartist: makeupArtistPricing,
  massagetherapist: massageTherapistPricing,
  model: modelPricing,
  musician: musicianPricing,
  surgeon: surgeonPricing,
  theatrical: theatricalPricing,
  therapist: therapistPricing,
  tinder: tinderPricing,
  yogateacher: yogaTeacherPricing,
  professor: professorPricing,
  psychologist: psychologistPricing,
  realestateagent: realEstateAgentPricing,
  salesexecutive: salesExecutivePricing,
  salesmanager: salesManagerPricing,
  singer: singerPricing,
  softwareengineer: softwareEngineerPricing,
}

export const getPricingDetails = (category: string): PricingDetails => {
  const normalizedCategory = category.toLowerCase().replace(/-/g, '');

  switch (normalizedCategory) {
    case 'dating':
      return pricingData.dating;
    case 'doctor':
      return pricingData.doctor;
    case 'lawyer':
      return pricingData.lawyer;
    case 'teacher':
      return pricingData.teacher;
    case 'realtor':
      return pricingData.realtor;
    case 'corporate':
      return pricingData.corporate;
    case 'linkedin':
      return pricingData.linkedin;
    case 'executive':
      return pricingData.executive;
    case 'actor':
      return pricingData.actor;
    case 'graduation':
      return pricingData.graduation;
    case 'eras':
      return pricingData.eras;
    case 'architect':
      return pricingData.architect;
    case 'author':
      return pricingData.author;
    case 'balletdancer':
      return pricingData.balletdancer;
    case 'blackandwhite':
      return pricingData.blackandwhite;
    case 'hairdresser':
      return pricingData.hairdresser;
    case 'hinge':
      return pricingData.hinge;
    case 'interiordesigner':
      return pricingData.interiordesigner;
    case 'bumble':
      return pricingData.bumble;
    case 'hairstylist':
      return pricingData.hairstylist;
    case 'esthetician':
      return pricingData.esthetician;
    case 'entrepreneur':
      return pricingData.entrepreneur;
    case 'dentist':
      return pricingData.dentist;
    case 'dataanalyst':
      return pricingData.dataanalyst;
    case 'business':
      return pricingData.business;
    case 'casting':
      return pricingData.casting;
    case 'ceo':
      return pricingData.ceo;
    case 'chef':
      return pricingData.chef;
    case 'dancer':
      return pricingData.dancer;
    case 'nailtechnician':
      return pricingData.nailtechnician;
    case 'nurse':
      return pricingData.nurse;
    case 'nursepractitioner':
      return pricingData.nursepractitioner;
    case 'personaltrainer':
      return pricingData.personaltrainer;
    case 'makeupartist':
      return pricingData.makeupartist;
    case 'massagetherapist':
      return pricingData.massagetherapist;
    case 'model':
      return pricingData.model;
    case 'musician':
      return pricingData.musician;
    case 'surgeon':
      return pricingData.surgeon;
    case 'theatrical':
      return pricingData.theatrical;
    case 'therapist':
      return pricingData.therapist;
    case 'tinder':
      return pricingData.tinder;
    case 'yogateacher':
      return pricingData.yogateacher;
    case 'professor':
      return pricingData.professor;
    case 'psychologist':
      return pricingData.psychologist;
    case 'realestateagent':
      return pricingData.realestateagent;
    case 'salesexecutive':
      return pricingData.salesexecutive;
    case 'salesmanager':
      return pricingData.salesmanager;
    case 'singer':
      return pricingData.singer;
    case 'softwareengineer':
      return pricingData.softwareengineer;
    case 'professional':
    default:
      return pricingData.professional;
  }
};