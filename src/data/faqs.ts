interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

export const mainLandingPageFaqs: FAQCategory[] = [
    {
        category: "What are AI Headshots?",
        questions: [
            {
                question: "What is a headshot?",
                answer:
                    "A professional photo of your face and shoulders used for LinkedIn, resumes, company websites, and more.",
            },
            {
                question: "What is an AI headshot?",
                answer:
                    "A professional headshot created from your casual selfies using AI. It looks like a real studio photo.",
            },
            {
                question: "How is this different from a traditional photoshoot?",
                answer:
                    "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
            },
            {
                question: 'Do AI headshots look fake or "AI"?',
                answer:
                    "No. They're designed to look like real studio photos with natural lighting and detail.",
            },
            {
                question: "Will I still look like myself?",
                answer:
                    "Yes. You still look like you — the image is simply sharper and more polished.",
            },
        ],
    },
    {
        category: "Who is Headshot.AI for?",
        questions: [
            {
                question: "Who is Headshot.AI for?",
                answer:
                    "Anyone who needs professional headshots — job seekers, executives, doctors, lawyers, realtors, actors, students, and more.",
            },
            {
                question: "What types of headshots do you offer?",
                answer:
                    "50+ types including LinkedIn, corporate, medical, dating, graduation, and more.",
            },
            {
                question: "What if I don't see my exact need listed?",
                answer:
                    "Our attire and background options are flexible enough to fit anyone — just pick what looks right for you.",
            },
        ],
    },
    {
        category: "How Headshot.AI Works",
        questions: [
            {
                question: "How does the process work?",
                answer:
                    "Choose your outfit → choose your background → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
            },
            {
                question: "How long does it take?",
                answer:
                    "Your headshots are ready in 15–45 minutes, depending on your package.",
            },
            {
                question: "Do I need to create an account to get started?",
                answer:
                    "Yes. An account is required to upload selfies and create your headshots.",
            },
            {
                question: "What kind of selfies should I upload?",
                answer:
                    "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
            },
            {
                question: "What should I avoid in my selfies?",
                answer:
                    "Group shots, covered faces, dark or blurry images, hats, sunglasses, headphones, side angles, or looking away.",
            },
            {
                question: "Do I need to dress up?",
                answer:
                    "No, just wear whatever you have on — everyday clothes are fine. The AI automatically applies your selected attire to the headshots.",
            },
            {
                question: "Can I choose my outfit?",
                answer:
                    "Yes. Pick as many as you like from multiple outfit options tailored to your needs — like suits, blazers, business casual, smart casual, scrubs, white coats, and more.",
            },
            {
                question: "Can I choose my background?",
                answer:
                    "Yes. Pick as many as you like from multiple background options tailored to your needs — like studio, office, city, outdoors, nature, hospital, boardroom, and more.",
            },
            {
                question: "What devices can I use to create my headshots?",
                answer: "Any device with a browser: phone, tablet, laptop, or desktop.",
            },
        ],
    },
    {
        category: "Packages & Pricing",
        questions: [
            {
                question: "What packages do you offer?",
                answer:
                    "Starter ($25), Basic ($35), and Premium ($55). One-time payment.",
            },
            {
                question: "How many headshots do I get?",
                answer: "Starter: 40. Basic: 100. Premium: 150.",
            },
            {
                question: "What's the difference between the packages?",
                answer:
                    "More headshots, more outfit and background options, higher resolution, and faster delivery as you go up.",
            },
            {
                question: "Is this a subscription?",
                answer: "No. One-time payment. No hidden fees.",
            },
            {
                question: "What payment methods do you accept?",
                answer: "Credit cards, debit cards, and PayPal.",
            },
            {
                question: "What's your refund policy?",
                answer:
                    "If you're not satisfied, we'll rerun your headshots or refund you. It's a 100% money-back guarantee.",
            },
        ],
    },
    {
        category: "Quality & Results",
        questions: [
            {
                question: "What resolution are the headshots?",
                answer:
                    "Starter: standard resolution. Basic: HD resolution. Premium: highest resolution./ Starter: 512x512. Basic: 1024x1024. Premium: 2048x2048.",
            },
            {
                question: "What file format do I receive?",
                answer: "JPG. Ready to use anywhere.",
            },
            {
                question: "Can I download all headshots or just favorites?",
                answer: "Both. Your choice.",
            },
        ],
    },
    {
        category: "Using Your Headshots",
        questions: [
            {
                question: "Where can I use my headshots?",
                answer:
                    "LinkedIn, resumes, company websites, email signatures, business cards, dating apps, social media, and more.",
            },
            {
                question: "Do I own the rights to my headshots?",
                answer: "Yes. Full commercial rights. Use them anywhere.",
            },
            {
                question: "Is it okay to use AI headshots professionally?",
                answer: "Yes, as long as they accurately represent you.",
            },
        ],
    },
    {
        category: "Editing Your Headshots",
        questions: [
            {
                question: "Can I edit my headshots after they're generated?",
                answer:
                    "Most people love their headshots as-is. But if you want to fine-tune anything, our AI Photo Editor is there for background swaps, blemish removal, or resolution upgrades.",
            },
            {
                question: "Can I regenerate my headshots if I don't like them?",
                answer: "Yes. Contact us and we'll rerun them.",
            },
        ],
    },
    {
        category: "Privacy & Security",
        questions: [
            {
                question: "Do you train your AI on my selfies or headshots?",
                answer: "No. Your images are never used to train any AI models.",
            },
            {
                question: "Do you share or sell my images?",
                answer:
                    "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
            },
            {
                question: "Can I delete my selfies and headshots?",
                answer:
                    "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
            },
            {
                question: "Is my data secure?",
                answer:
                    "Yes. We follow strict security standards and comply with GDPR and CCPA.",
            },
        ],
    },
];

// Flat FAQ list for the main landing page — rendered without category grouping.
export const homePageFaqs: FAQItem[] = [
    {
        question: "Will the headshots actually look like me?",
        answer:
            "Yes. Every headshot is created from your own selfies — your real face, your real features. They actually look like the real you. Most customers are surprised by how accurately the AI captures them. Just upload your selfies and see for yourself.",
    },
    {
        question: "Who is Headshot.AI for?",
        answer:
            "Job seekers, employees, founders, freelancers, consultants, executives — anyone who needs a polished headshot for work. If you've ever needed a photo for LinkedIn, a resume, or a website, this is for you.",
    },
    {
        question: "Do I need studio shots or special equipment?",
        answer:
            "No. Any selfies work — bathroom mirror shots, vacation photos, regular phone pictures. As long as we can see your face clearly, our AI handles the rest. No studio, no lighting setup, no photographer needed.",
    },
    {
        question: "What kind of selfies should I upload?",
        answer:
            "Recent selfies (last 6 months) where your face and shoulders are clearly visible, you're facing the camera, and nothing covers your face. Match how you normally look — same hair, beard, glasses. Skip group shots, side angles, sunglasses, hats, or anything blurry.",
    },
    {
        question: "Do I need to dress up for the selfies?",
        answer:
            "No. Wear whatever you have on — pajamas, gym clothes, anything. The AI puts you in your chosen outfit in the final headshots. The selfies are just so the AI can learn your face.",
    },
    {
        question: "Can I choose my outfits and backgrounds?",
        answer:
            "Yes. Pick as many as you want — outfits include business professional, business casual, and smart casual. Backgrounds include studio, office, city, nature, and walls.",
    },
    {
        question: "How many headshots will I see?",
        answer:
            "Each plan gives you a different number — 50 with Starter, 100 with Basic, and 200 with Premium. You'll see a free preview of your headshots before deciding which plan to unlock.",
    },
    {
        question: "What if I don't love any of the headshots?",
        answer:
            "You don't pay. We let you preview your headshots for free. If they're not what you wanted, just walk away.",
    },
    {
        question: "What's included in each plan?",
        answer:
            "Every plan gives you Full HD headshots (no watermarks), as many outfits and backgrounds as you want, the freedom to use them anywhere, and yours forever — download as many times as you want. Plus a 100% Money-Back Guarantee. The only difference between plans is how many headshots you get.",
    },
    {
        question: "Do I own the headshots?",
        answer:
            "Yes — once you download, the headshots are fully yours. You get full commercial use and you own them forever.",
    },
    {
        question: "Where can I use my headshots?",
        answer:
            "Anywhere. LinkedIn, your resume, About page, Slack, Zoom, Microsoft Teams, business cards, email signatures, speaker bios, pitch decks, press features — anywhere you need a studio-quality headshot.",
    },
    {
        question: "Is it okay to use an AI headshot at work or on LinkedIn?",
        answer:
            "Yes — as long as it looks like the real you. Recruiters, clients, and colleagues want to see you, not a glamour shot of someone else. Our AI keeps your real face and features, so what people see online is what they'll meet in person.",
    },
    {
        question: "How long does it take?",
        answer:
            "AI generation takes seconds. From upload to your final headshots is under 5 minutes total. No appointments, no waiting days for edited photos — just upload your selfies and your headshots are ready.",
    },
    {
        question:
            "Will my headshots be high enough quality for print or large displays?",
        answer:
            "Yes. Every plan gives you Full HD files that work for everything from a small LinkedIn thumbnail to a large conference banner or printed materials.",
    },
    {
        question: "Is this a subscription?",
        answer:
            "No. It's a one-time payment for the plan you pick. Pay once, own your headshots forever. No recurring fees, no surprises.",
    },
    {
        question: "What happens to my selfies?",
        answer:
            "Your selfies stay private. We never sell or share them, and we never use them to train our AI. They're only used to make your headshots — and the final headshots belong to you.",
    },
    {
        question: "What if I'm not happy with my downloaded headshots?",
        answer:
            "You're protected by our 100% Money-Back Guarantee. If you're not happy, just reach out — we'll either redo your headshots or refund you in full. Your choice.",
    },
];

export const datingPhotosFaqs: FAQCategory[] = [
  {
    category: "What Are AI Dating Headshots?",
    questions: [
      {
        question: "What is a dating headshot?",
        answer:
          "A dating headshot is a profile picture used on dating apps like Tinder, Bumble, Hinge, and others to attract matches and start conversations.",
      },
      {
        question: "Why do dating headshots matter?",
        answer:
          "They're your first impression. Great photos get more right swipes, more matches, and more messages.",
      },
      {
        question: "What is an AI dating headshot?",
        answer:
          "It's a natural, high-quality dating photo created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip the awkward posing, outfit planning, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Anyone looking for love online - whether you're new to dating apps or just need better photos.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you - the image is simply sharper and more flattering.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Upload 8–12 selfies → Headshot.AI automatically creates your headshots with different looks → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No. Just wear whatever you have on - everyday clothes are fine. The AI automatically applies suitable attire to your headshots.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for dating profiles?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium - each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more variety in looks and backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Which dating apps can I use my headshots on?",
        answer:
          "All of them! Tinder, Bumble, Hinge, Coffee Meets Bagel, Happn, OkCupid, Match, or any other dating app. Plus LinkedIn, social media, and anywhere else you want great photos.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer: "Yes. You have full rights and can use your images anywhere.",
      },
      {
        question: "Is using AI headshots on dating apps acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Matches want to see the real you - our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const realEstateFaqs: FAQCategory[] = [
  {
    category: "What Are AI Real Estate Agent Headshots?",
    questions: [
      {
        question: "What is a real estate agent headshot?",
        answer:
          "A real estate agent headshot is a professional shoulders-up photo used on brokerage websites, Zillow, Realtor.com, yard signs, and marketing materials.",
      },
      {
        question: "Why do real estate agent headshots matter?",
        answer:
          "They shape first impressions, build trust, and help increase listing inquiries, client calls, and closed deals.",
      },
      {
        question: "What is an AI real estate agent headshot?",
        answer:
          "It's a professional real estate agent headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Real estate agents, brokers, team leaders, property managers, mortgage lenders, and real estate professionals.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No. Just wear whatever you have on — everyday clothes are fine. The AI automatically applies suitable attire to your headshots.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, office, house, city, nature.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question:
          "What packages does Headshot.AI offer for real estate agents?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my real estate agent headshots?",
        answer:
          "Brokerage websites, Zillow, Realtor.com, yard signs, business cards, listing flyers, email signatures, social media, and promotional materials.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Clients want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const linkedinFaqs: FAQCategory[] = [
  {
    category: "What Are AI LinkedIn Headshots?",
    questions: [
      {
        question: "What is a LinkedIn headshot?",
        answer:
          "A LinkedIn headshot is a professional shoulders-up photo used on your LinkedIn profile, company page, and other professional platforms.",
      },
      {
        question: "Why do LinkedIn headshots matter?",
        answer:
          "They shape first impressions, build trust, and help you get up to 14× more profile views and connection requests.",
      },
      {
        question: "What is an AI LinkedIn headshot?",
        answer:
          "It's a professional LinkedIn headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Job seekers, executives, salespeople, entrepreneurs, consultants, freelancers, recruiters, and anyone who wants to look their best on LinkedIn.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your outfit → choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No, just wear whatever you have on — everyday clothes are fine. The AI automatically applies your selected attire to the headshots.",
      },
      {
        question: "Can I choose my outfit?",
        answer:
          "Yes. You can select one or more outfits: business professional, business casual, smart casual.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, office, city, nature, wall and bricks.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for LinkedIn?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more outfits and backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my LinkedIn headshots?",
        answer:
          "Your LinkedIn profile photo — which appears across the platform whenever you apply for jobs, publish articles, comment on posts, or show up in search results.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable on LinkedIn?",
        answer:
          "Yes, as long as the image accurately represents you. Recruiters and connections want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const doctorFaqs: FAQCategory[] = [
  {
    category: "What Are AI Doctor Headshots?",
    questions: [
      {
        question: "What is a doctor headshot?",
        answer:
          "A doctor headshot is a professional shoulders-up photo used on hospital websites, medical practice sites, healthcare directories, LinkedIn, and other professional materials.",
      },
      {
        question: "Why do doctor headshots matter?",
        answer:
          "They shape first impressions, build patient trust, and help boost credibility with colleagues, referral networks, and speaking opportunities.",
      },
      {
        question: "What is an AI doctor headshot?",
        answer:
          "It's a professional doctor headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Physicians, surgeons, specialists, primary care doctors, residents, fellows, medical directors, and healthcare professionals.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your outfit → choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No, just wear whatever you have on — everyday clothes are fine. The AI automatically applies your selected attire to the headshots.",
      },
      {
        question: "Can I choose my outfit?",
        answer:
          "Yes. You can select one or more outfits: white coat, scrubs, business professional, business casual.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, hospital, medical office, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for doctors?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more outfits and backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my doctor headshots?",
        answer:
          "Hospital websites, practice websites, healthcare directories, LinkedIn, Healthgrades, Zocdoc, Doximity, medical journals, conference bios, telemedicine profiles, referral materials, and academic publications.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Patients and colleagues want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const teacherFaqs: FAQCategory[] = [
  {
    category: "What Are AI Teacher Headshots?",
    questions: [
      {
        question: "What is a teacher headshot?",
        answer:
          "A teacher headshot is a professional shoulders-up photo used on school websites, staff directories, LinkedIn, and other educational materials.",
      },
      {
        question: "Why do teacher headshots matter?",
        answer:
          "They shape first impressions, build trust, and help you connect with students, parents, and school communities.",
      },
      {
        question: "What is an AI teacher headshot?",
        answer:
          "It's a professional teacher headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Student teachers, substitute teachers, classroom teachers, department heads, curriculum specialists, and school administrators.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No. Just wear whatever you have on — everyday clothes are fine. The AI automatically applies suitable attire to your headshots.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, classroom, campus.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for teachers?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my teacher headshots?",
        answer:
          "School websites, staff directories, LinkedIn, job applications, parent newsletters, classroom doors, conference bios, and education portfolios.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Students and parents want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const graduationFaqs: FAQCategory[] = [
  {
    category: "What Are AI Graduation Headshots?",
    questions: [
      {
        question: "What is a graduation headshot?",
        answer:
          "A graduation headshot is a professional shoulders-up photo taken to celebrate completing a degree or diploma — used for announcements, yearbooks, LinkedIn, and keepsakes.",
      },
      {
        question: "Why do graduation headshots matter?",
        answer:
          "They capture one of life's biggest milestones. A polished graduation photo lets you share your achievement proudly and makes a strong first impression as you enter your career.",
      },
      {
        question: "What is an AI graduation headshot?",
        answer:
          "It's a professional graduation headshot created from your casual selfies using Headshot.AI — no cap, gown, or photoshoot needed.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, rental fees, posing, and scheduling. You upload selfies, and the AI creates your headshots — complete with cap and gown or professional attire.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "High school seniors, college graduates, master's and PhD students, parents ordering for their graduates, and anyone celebrating an educational milestone.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail. The cap and gown look completely authentic.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper, polished, and dressed in graduation attire.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your attire → choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to own a cap and gown?",
        answer:
          "No! That's the magic. The AI adds graduation attire for you. Just wear casual clothes in your selfies.",
      },
      {
        question: "Can I choose my outfit?",
        answer:
          "Yes. You can select one or more outfits: graduation gown, professional.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, campus, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for graduates?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more attire and backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my graduation headshots?",
        answer:
          "Announcements, yearbooks, LinkedIn, resumes, job applications, social media, party invitations, framed prints, thank-you cards, and grad school applications.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Family, friends, and employers want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const corporateFaqs: FAQCategory[] = [
  {
    category: "What Are AI Corporate Headshots?",
    questions: [
      {
        question: "What is a corporate headshot?",
        answer:
          "A corporate headshot is a professional shoulders-up photo used on company websites, LinkedIn, team pages, and other business materials.",
      },
      {
        question: "Why do corporate headshots matter?",
        answer:
          "They shape first impressions, build trust with clients and colleagues, and help you look credible and approachable in professional settings.",
      },
      {
        question: "What is an AI corporate headshot?",
        answer:
          "It's a professional corporate headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Executives, managers, team leads, sales professionals, marketers, engineers, consultants, and anyone who needs a polished professional image.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your outfit → choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No, just wear whatever you have on — everyday clothes are fine. The AI automatically applies your selected attire to the headshots.",
      },
      {
        question: "Can I choose my outfit?",
        answer:
          "Yes. You can select one or more outfits: business professional, business casual.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, office, city, nature, wall and bricks.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question:
          "What packages does Headshot.AI offer for corporate professionals?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more outfits and backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my corporate headshots?",
        answer:
          "Company websites, team pages, LinkedIn, Slack, email signatures, business cards, pitch decks, conference materials, press releases, and resumes.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Clients and colleagues want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const actorFaqs: FAQCategory[] = [
  {
    category: "What Are AI Actor Headshots?",
    questions: [
      {
        question: "What is an actor headshot?",
        answer:
          "An actor headshot is a professional shoulders-up photo used for casting submissions, talent agencies, and acting profiles.",
      },
      {
        question: "Why do actor headshots matter?",
        answer:
          "They shape first impressions, build trust, and help increase callbacks, auditions, and bookings.",
      },
      {
        question: "What is an AI actor headshot?",
        answer:
          "It's a professional actor headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Aspiring actors, working actors, commercial actors, theatrical actors, film and TV actors, voice actors, and background actors.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No. Just wear whatever you have on — everyday clothes are fine. The AI automatically applies suitable attire to your headshots.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, dramatic, classic B and W studio, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for actors?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my actor headshots?",
        answer:
          "Casting submissions, talent agency profiles, Actors Access, Backstage, Casting Networks, IMDb, personal websites, social media, comp cards, and printed headshots.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Casting directors want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const lawyerFaqs: FAQCategory[] = [
  {
    category: "What Are AI Lawyer Headshots?",
    questions: [
      {
        question: "What is a lawyer headshot?",
        answer:
          "A lawyer headshot is a professional shoulders-up photo used on firm sites, LinkedIn, directories, and other legal materials.",
      },
      {
        question: "Why do lawyer headshots matter?",
        answer:
          "They shape first impressions, build trust, and help increase clicks, calls, and consultations.",
      },
      {
        question: "What is an AI lawyer headshot?",
        answer:
          "It's a professional lawyer headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Law students, solo lawyers, firm lawyers, in-house counsel, government lawyers, mediators, and arbitrators.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No. Just wear whatever you have on — everyday clothes are fine. The AI automatically applies suitable attire to your headshots.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, office, outdoor, city, nature.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for lawyers?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my lawyer headshots?",
        answer:
          "Firm websites, bio pages, LinkedIn, legal directories, email signatures, business cards, brochures, CLE materials, media features, and resumes.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Clients and collaborators want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const executiveFaqs: FAQCategory[] = [
  {
    category: "What Are AI Executive Headshots?",
    questions: [
      {
        question: "What is an executive headshot?",
        answer:
          "An executive headshot is a professional shoulders-up photo used on company websites, LinkedIn, investor materials, and other leadership profiles.",
      },
      {
        question: "Why do executive headshots matter?",
        answer:
          "They shape first impressions, build trust with stakeholders, and project the confidence and competence expected at the leadership level.",
      },
      {
        question: "What is an AI executive headshot?",
        answer:
          "It's a professional executive headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "CEOs, CFOs, COOs, CMOs, VPs, Directors, Managing Directors, Board Members, Founders, and senior leaders across all industries.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your outfit → choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No, just wear whatever you have on — everyday clothes are fine. The AI automatically applies your selected attire to the headshots.",
      },
      {
        question: "Can I choose my outfit?",
        answer:
          "Yes. You can select one or more outfits: business professional, business casual.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, office, city, nature.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for executives?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more outfits and backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my executive headshots?",
        answer:
          "Company websites, executive bios, LinkedIn, board materials, investor decks, press releases, conference profiles, keynote presentations, media features, and personal brand materials.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Stakeholders and colleagues want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const erasFaqs: FAQCategory[] = [
  {
    category: "What Are AI ERAS Headshots?",
    questions: [
      {
        question: "What is an ERAS headshot?",
        answer:
          "An ERAS headshot is a professional shoulders-up photo used on your residency application through the Electronic Residency Application Service.",
      },
      {
        question: "Why do ERAS headshots matter?",
        answer:
          "Your photo is the first thing program directors see. A polished, professional headshot creates a strong first impression and helps you stand out.",
      },
      {
        question: "What is an AI ERAS headshot?",
        answer:
          "It's a professional ERAS-ready headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Medical students applying through ERAS, DO students, IMG applicants, and anyone needing professional medical headshots.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your outfit → choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No, just wear whatever you have on — everyday clothes are fine. The AI automatically applies your selected attire to the headshots.",
      },
      {
        question: "Can I choose my outfit?",
        answer:
          "Yes. You can select one or more outfits: professional, white coat.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, hospital, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for ERAS?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more outfits and backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my ERAS headshots?",
        answer:
          "Your ERAS application, NRMP profile, Doximity, LinkedIn, residency program websites, personal statements, CVs, and any professional communication.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable for ERAS?",
        answer:
          "Yes, as long as the image accurately represents you. Program directors want to see the real you — our AI headshots deliver that with professional polish.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const blackAndWhiteFaqs: FAQCategory[] = [
  {
    category: "What Are AI Black & White Headshots?",
    questions: [
      {
        question: "What is a black & white headshot?",
        answer:
          "A black & white headshot is a professional shoulders-up photo with no color—just shades of black, white, and gray. It's a timeless, classic style used for portfolios, profiles, and branding.",
      },
      {
        question: "Why choose black & white over color?",
        answer:
          "Black & white headshots feel timeless and elegant. They remove distractions, highlight facial features, and work beautifully in both print and digital formats. They also stand out in feeds full of color photos.",
      },
      {
        question: "What is an AI black & white headshot?",
        answer:
          "It's a professional black & white headshot created from your casual selfies using Headshot.AI—with expert-level lighting, contrast, and tonal quality.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates stunning black & white headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Creatives, executives, entrepreneurs, actors, authors, musicians, consultants, and anyone who wants a timeless, professional look.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail. The black & white processing adds classic depth and contrast.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you—the image is simply sharper, more polished, and beautifully converted to black & white.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your attire style → upload 8–12 selfies → Headshot.AI creates your black & white headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No, just wear whatever you have on—everyday clothes are fine. The AI automatically applies your selected attire to the headshots.",
      },
      {
        question: "Can I choose my outfit?",
        answer:
          "Yes. You can select one or more outfits: professional, casual, smart casual.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, dark studio.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question:
          "What packages does Headshot.AI offer for black & white headshots?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium—each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more attire options, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my black & white headshots?",
        answer:
          "LinkedIn, portfolio websites, creative platforms, business cards, press kits, author bios, speaking events, social profiles, and anywhere you want a timeless look.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Will black & white headshots work for professional use?",
        answer:
          "Absolutely. Black & white headshots are widely accepted and often preferred for their classic, professional appearance. They work across every industry.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const hairStylistFaqs: FAQCategory[] = [
  {
    category: "What Are AI Hair Stylist Headshots?",
    questions: [
      {
        question: "What is a hair stylist headshot?",
        answer:
          "A hair stylist headshot is a professional shoulders-up photo used on salon websites, booking platforms, social media, and other beauty industry materials.",
      },
      {
        question: "Why do hair stylist headshots matter?",
        answer:
          "They shape first impressions, build trust, and help you attract clients, bookings, and career opportunities.",
      },
      {
        question: "What is an AI hair stylist headshot?",
        answer:
          "It's a professional hair stylist headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Cosmetology students, junior stylists, senior stylists, salon owners, colorists, and freelance hair artists.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No. Just wear whatever you have on — everyday clothes are fine. The AI automatically applies suitable attire to your headshots.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, salon workspace, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for hair stylists?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my hair stylist headshots?",
        answer:
          "Salon websites, booking platforms, LinkedIn, Google Business profiles, social media, business cards, portfolio lookbooks, and press features.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Clients want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const nailTechnicianFaqs: FAQCategory[] = [
  {
    category: "What Are AI Nail Technician Headshots?",
    questions: [
      {
        question: "What is a nail technician headshot?",
        answer:
          "A nail technician headshot is a professional shoulders-up photo used on salon websites, social media, booking platforms, and marketing materials.",
      },
      {
        question: "Why do nail technician headshots matter?",
        answer:
          "They shape first impressions, build trust, and help increase bookings, followers, and client inquiries.",
      },
      {
        question: "What is an AI nail technician headshot?",
        answer:
          "It's a professional nail technician headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Nail technicians, manicurists, pedicurists, nail artists, salon owners, and beauty professionals.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No. Just wear whatever you have on — everyday clothes are fine. The AI automatically applies suitable attire to your headshots.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, nail salon, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for nail technicians?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my nail technician headshots?",
        answer:
          "Salon websites, Instagram, booking apps, Google Business profiles, business cards, promotional flyers, email signatures, and portfolio pages.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Clients want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const yogaTeacherFaqs: FAQCategory[] = [
  {
    category: "What Are AI Yoga Teacher Headshots?",
    questions: [
      {
        question: "What is a yoga teacher headshot?",
        answer:
          "A yoga teacher headshot is a professional shoulders-up photo used on studio websites, social media, class booking platforms, and wellness directories.",
      },
      {
        question: "Why do yoga teacher headshots matter?",
        answer:
          "They shape first impressions, build trust, and help increase class bookings, followers, and student inquiries.",
      },
      {
        question: "What is an AI yoga teacher headshot?",
        answer:
          "It's a professional yoga teacher headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Yoga instructors, studio owners, meditation teachers, wellness coaches, retreat leaders, and mindfulness practitioners.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No. Just wear whatever you have on — everyday clothes are fine. The AI automatically applies suitable attire to your headshots.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, indoor yoga studio, outdoor yoga wellness.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for yoga teachers?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my yoga teacher headshots?",
        answer:
          "Studio websites, class booking apps, Instagram, wellness directories, Google Business profiles, business cards, retreat flyers, email signatures, and teacher bios.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Students want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const therapistFaqs: FAQCategory[] = [
  {
    category: "What Are AI Therapist Headshots?",
    questions: [
      {
        question: "What is a therapist headshot?",
        answer:
          "A therapist headshot is a professional shoulders-up photo used on practice websites, therapy directories, LinkedIn, and other professional materials.",
      },
      {
        question: "Why do therapist headshots matter?",
        answer:
          "They shape first impressions, build client trust, and help boost credibility with referral sources, insurance panels, and professional networks.",
      },
      {
        question: "What is an AI therapist headshot?",
        answer:
          "It's a professional therapist headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Therapists, counselors, psychotherapists, licensed clinical social workers, marriage and family therapists, mental health counselors, and aspiring mental health professionals.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your outfit → choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No, just wear whatever you have on — everyday clothes are fine. The AI automatically applies your selected attire to the headshots.",
      },
      {
        question: "Can I choose my outfit?",
        answer:
          "Yes. You can select one or more outfits: professional, casual, white coat.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, therapist office, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for therapists?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more outfits and backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my therapist headshots?",
        answer:
          "Practice websites, Psychology Today, TherapyDen, GoodTherapy, LinkedIn, insurance panel applications, referral materials, telehealth profiles, professional association pages, speaking engagements, and email signatures.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Clients and referral sources want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const theatricalFaqs: FAQCategory[] = [
  {
    category: "What Are AI Theatrical Headshots?",
    questions: [
      {
        question: "What is a theatrical headshot?",
        answer:
          "A theatrical headshot is a professional shoulders-up photo used for casting calls, auditions, agency submissions, and playbill bios.",
      },
      {
        question: "Why do theatrical headshots matter?",
        answer:
          "They shape first impressions, show your range, and help you get called in for the right roles.",
      },
      {
        question: "What is an AI theatrical headshot?",
        answer:
          "It's a professional theatrical headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, hair and makeup, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Stage actors, musical theatre performers, film and TV actors, voice actors, drama students, and anyone who auditions.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more casting-ready.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, costume makeup, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up or do stage makeup?",
        answer:
          "No. Just wear whatever you have on — everyday clothes are fine. The AI automatically applies suitable attire to your headshots.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, dramatic, theater stage, backstage and rehearsal, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for performers?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my theatrical headshots?",
        answer:
          "Actors Access, Backstage, Casting Networks, agency submissions, playbills, IMDb, LinkedIn, personal websites, business cards, postcards, resumes, and social media.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable in the industry?",
        answer:
          "Yes, as long as the image accurately represents you. Casting directors want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const surgeonFaqs: FAQCategory[] = [
  {
    category: "What Are AI Surgeon Headshots?",
    questions: [
      {
        question: "What is a surgeon headshot?",
        answer:
          "A surgeon headshot is a professional shoulders-up photo used on hospital websites, LinkedIn, medical directories, and other professional materials.",
      },
      {
        question: "Why do surgeon headshots matter?",
        answer:
          "They shape first impressions, build trust, and help increase patient confidence, referrals, and appointment requests.",
      },
      {
        question: "What is an AI surgeon headshot?",
        answer:
          "It's a professional surgeon headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Medical students, surgical residents, fellows, attending surgeons, department heads, and private practice surgeons.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your outfit → choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No, just wear whatever you have on — everyday clothes are fine. The AI automatically applies your selected attire to the headshots.",
      },
      {
        question: "Can I choose my outfit?",
        answer: "Yes. You can select one or more outfits: white coat, scrubs.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, surgical room, hospital, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for surgeons?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more outfits and backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my surgeon headshots?",
        answer:
          "Hospital websites, physician profiles, LinkedIn, Healthgrades, Zocdoc, Doximity, medical directories, email signatures, business cards, conference materials, journal submissions, and resumes.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Patients and colleagues want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const softwareEngineerFaqs: FAQCategory[] = [
  {
    category: "What Are AI Software Engineer Headshots?",
    questions: [
      {
        question: "What is a software engineer headshot?",
        answer:
          "A software engineer headshot is a professional shoulders-up photo used on LinkedIn, GitHub, company websites, and other professional materials.",
      },
      {
        question: "Why do software engineer headshots matter?",
        answer:
          "They shape first impressions, build professional credibility, and help boost visibility with recruiters, hiring managers, and tech communities.",
      },
      {
        question: "What is an AI software engineer headshot?",
        answer:
          "It's a professional software engineer headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Software engineers, developers, full-stack engineers, frontend and backend developers, DevOps engineers, data engineers, engineering managers, and aspiring tech professionals.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your outfit → choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No, just wear whatever you have on — everyday clothes are fine. The AI automatically applies your selected attire to the headshots.",
      },
      {
        question: "Can I choose my outfit?",
        answer:
          "Yes. You can select one or more outfits: business professional, business casual, smart casual.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, office, work from home, business parks, city, wall and bricks.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question:
          "What packages does Headshot.AI offer for software engineers?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more outfits and backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my software engineer headshots?",
        answer:
          "LinkedIn, GitHub, company websites, personal portfolio sites, tech blogs, conference bios, Slack and Teams profiles, job applications, speaker submissions, open source project pages, and email signatures.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Recruiters and colleagues want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const singerFaqs: FAQCategory[] = [
  {
    category: "What Are AI Singer Headshots?",
    questions: [
      {
        question: "What is a singer headshot?",
        answer:
          "A singer headshot is a professional shoulders-up photo used on streaming platforms, EPKs, social media, and other music industry materials.",
      },
      {
        question: "Why do singer headshots matter?",
        answer:
          "They shape first impressions, build credibility, and help increase streams, bookings, and fan engagement.",
      },
      {
        question: "What is an AI singer headshot?",
        answer:
          "It's a professional singer headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Solo artists, band members, session singers, choir members, voice-over artists, musical theatre performers, and singers at any stage of their career.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No. Just wear whatever you have on — everyday clothes are fine. The AI automatically applies suitable attire to your headshots.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, dramatic, music recording studio, stage, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for singers?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my singer headshots?",
        answer:
          "Streaming platforms, artist pages, social media, EPKs, press kits, booking platforms, album artwork, merchandise, media features, and LinkedIn.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Fans and industry pros want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const salesManagerFaqs: FAQCategory[] = [
  {
    category: "What Are AI Sales Manager Headshots?",
    questions: [
      {
        question: "What is a sales manager headshot?",
        answer:
          "A sales manager headshot is a professional shoulders-up photo used on company websites, LinkedIn, sales decks, and other business materials.",
      },
      {
        question: "Why do sales manager headshots matter?",
        answer:
          "They shape first impressions, build trust, and help increase prospect engagement, client confidence, and deal closures.",
      },
      {
        question: "What is an AI sales manager headshot?",
        answer:
          "It's a professional sales manager headshot created from your casual selfies using Headshot.AI.",
      },
      {
        question: "How is this different from a traditional photoshoot?",
        answer:
          "You skip studio visits, posing, dressing up, and scheduling. You upload selfies, and the AI creates your headshots for you.",
      },
      {
        question: "Who is Headshot.AI for?",
        answer:
          "Sales managers, regional sales directors, account executives, sales team leads, business development managers, and aspiring sales leaders.",
      },
      {
        question: 'Do AI headshots look "AI" or fake?',
        answer:
          "No. They're designed to look like real studio photos with natural lighting and detail.",
      },
      {
        question: "Will I still look like myself in the AI headshots?",
        answer:
          "Yes. You still look like you — the image is simply sharper and more polished.",
      },
    ],
  },
  {
    category: "How Headshot.AI Works",
    questions: [
      {
        question: "How does the process work?",
        answer:
          "Choose your outfit → choose your backgrounds → upload 8–12 selfies → Headshot.AI creates your headshots → you download your favorites.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your headshots are ready in 15–45 minutes, depending on your package.",
      },
      {
        question: "What kind of selfies should I upload?",
        answer:
          "Upload chest-up selfies at eye level with good lighting and natural expressions. For best results, use recent photos (last 6 months) and include a variety of expressions.",
      },
      {
        question: "What should I avoid in my selfies?",
        answer:
          "Avoid group shots, covered faces, dark or blurry images, AI-made photos, revealing outfits, hats, sunglasses, headphones, side angles, or looking away.",
      },
      {
        question: "Do I need to dress up?",
        answer:
          "No, just wear whatever you have on — everyday clothes are fine. The AI automatically applies your selected attire to the headshots.",
      },
      {
        question: "Can I choose my outfit?",
        answer:
          "Yes. You can select one or more outfits: business professional, business casual, smart casual.",
      },
      {
        question: "Can I choose my background?",
        answer:
          "Yes. You can select one or more backgrounds: studio, office, corporate sales environment, city, outdoor.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    questions: [
      {
        question: "What packages does Headshot.AI offer for sales managers?",
        answer:
          "Three one-time packages: Starter, Basic, and Premium — each designed for different photo needs and budgets.",
      },
      {
        question: "How much does it cost?",
        answer: "Packages range from $25–$55 as a one-time payment.",
      },
      {
        question: "What's the difference between the packages?",
        answer:
          "Higher packages give you more headshots (40, 100, or 150), more outfits and backgrounds, higher resolution, and faster delivery (45, 30, or 15 minutes).",
      },
      {
        question: "What if I don't like my headshots?",
        answer:
          "We'll rerun them or refund you. It's a 100% money-back guarantee.",
      },
    ],
  },
  {
    category: "Using Your Headshots",
    questions: [
      {
        question: "Where can I use my sales manager headshots?",
        answer:
          "Company websites, team pages, LinkedIn, sales decks, proposal documents, CRM profiles, email signatures, business cards, conference badges, and resumes.",
      },
      {
        question: "Do I own the rights to my headshots?",
        answer:
          "Yes. You have full commercial rights and can use your images anywhere.",
      },
      {
        question: "Is the use of AI headshots acceptable?",
        answer:
          "Yes, as long as the image accurately represents you. Prospects, clients, and colleagues want to see the real you — our AI headshots deliver that.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Do you train your AI on my selfies or headshots?",
        answer:
          "No. Your selfies and headshots are never used to train any AI models.",
      },
      {
        question: "Do you share or sell my selfies or headshots?",
        answer:
          "No. Your images are never sold, shared, or reused. They're only used to create your headshots.",
      },
      {
        question: "Can I delete my selfies and headshots?",
        answer:
          "Yes. You can delete your images anytime. Selfies auto-delete after 7 days, and headshots auto-delete after 30 days if you don't remove them sooner.",
      },
    ],
  },
];

export const backgroundChangerFaqs: FAQItem[] = [
  {
    question: "What is the AI Background Changer, and what does it do?",
    answer: "Our AI detects the main subject in your photo and replaces the background with high-quality alternatives. It's designed for profile photos, headshots, and portraits used in professional or creative settings."
  },
  {
    question: "Do I need a specific plan to use the Background Changer?",
    answer: "All users get 2 free background change credits per day. After 24 hours, credits reset. Some plans include extra free credits with headshots-please check your plan details for full access."
  },
  {
    question: "What types of backgrounds are available, and can I upload my own?",
    answer: "Choose from solid colors, nature scenes, office spaces, cityscapes, abstract designs, and studio backdrops. Uploading your own background isn't available yet but is being explored for higher-tier plans."
  },
  {
    question: "Does the tool work on any image, and will results look natural?",
    answer: "Yes. For best results, use high-resolution photos with neutral lighting. Our AI adjusts shadows, tones, and edges to blend naturally. Avoid images with extreme lighting for optimal results."
  },
  {
    question: "Is manual editing required, and how long does it take?",
    answer: "No manual editing is needed. The entire process is fully automated. The AI typically processes each image in 5–15 seconds, depending on photo complexity and server load."
  },
  {
    question: "Can I change the background of an image I've already edited?",
    answer: "Yes. You can re-edit previously uploaded or edited images anytime. Simply select the photo from your gallery and apply a new background using available credits."
  },
  {
    question: "What resolution and formats are supported?",
    answer: "Final images are exported in high resolution, suitable for print and digital use. Supported upload formats include PNG, JPG, HEIC, and WEBP up to 120MB."
  },
  {
    question: "What if the tool fails to remove the background correctly?",
    answer: "You can retry with another image or contact support. Our AI improves continuously. Images with high contrast between subject and background typically deliver the best results."
  },
  {
    question: "Are downloads watermark-free, and can I use them for business?",
    answer: "Final downloads on paid plans are watermark-free. Trial or unsupported plans may include watermarks. Commercial use is allowed if your plan includes usage rights-check your plan for details."
  },
  {
    question: "Are my images stored or used for training your AI?",
    answer: "No. Images are processed securely and saved only to your account for convenience. You can delete them anytime. They are never used to train our AI models."
  }
]

export const photoEditorFaqs: FAQItem[] = [
  {
    question: "Do I need to create an account or sign up to use the tool?",
    answer:
      "Yes. You'll need to sign up before editing. Free accounts get 2 credits per day, which refresh every 24 hours. Paid plans include more credits as listed on our pricing page.",
  },
  {
    question: "Do the edited images have a watermark?",
    answer: "No, your downloaded edits won't have any watermarks.",
  },
  {
    question: "Will the AI automatically make all changes, or can I adjust results manually?",
    answer:
      "You're in control. Our powerful AI can do all the work for you, or you can fine-tune the results to match your exact vision.",
  },
  {
    question: "What file formats are supported by your editing tools?",
    answer: "We support JPG, PNG, HEIC, and WEBP formats for upload and download.",
  },
  {
    question: "What do you do with my data and photos after editing?",
    answer:
      "Your images are processed securely and stored in your account for convenience. You can delete them anytime. We do not sell your data or use your photos to train our AI.",
  },
  {
    question: "Do I need image editing skills to use your platform?",
    answer: "No. All tools are fully automated using AI - no manual tracing, erasing, or advanced skills required.",
  },
  {
    question: "Will my original image be preserved after editing?",
    answer: "Yes. Your original file remains unchanged so you can always revert to it.",
  },
  {
    question: "Does your AI Editor reduce the file size or quality of my images?",
    answer: "No. We maintain the highest possible quality and resolution based on your input image.",
  },
  {
    question: "Can I use the edited images for commercial projects?",
    answer:
      "Yes. You can use your edited images for both personal and commercial purposes, including branding, social media, marketing, and client work.",
  },
  {
    question: "How long does it take to process an image?",
    answer: "Most edits are ready in 5–15 seconds, depending on image size and complexity.",
  },
  {
    question: "Can I preview edits before downloading the final version?",
    answer: "Yes. You'll see a preview of the edits before you confirm and download.",
  },
  {
    question: "Is there a maximum file size or resolution I can upload?",
    answer: "Yes. You can upload images up to 120MB and 8,000×8,000px for smooth processing.",
  },
  {
    question: "Is there a daily or monthly limit on how many images I can edit?",
    answer: "Free accounts get 2 credits per day. Paid plan limits are shown on the pricing page and include with more credits.",
  },
];

export const blemishRemoverFaqs: FAQItem[] = [
  {
    question: "What is the Blemish Remover tool and what does it do?",
    answer: "The Blemish Remover is an AI-powered photo enhancement tool that automatically detects and removes skin imperfections like pimples, acne scars, dark spots, and freckles. It recreates smooth, natural-looking skin using nearby texture - all in just a few seconds.",
  },
  {
    question: "Do I need an account, and are there free usage limits?",
    answer: "No account is required to get started. You can use the tool with 2 free image credits per day without registering. If you need to process more images or unlock premium features, check out our flexible plans on the Pricing Page.",
  },
  {
    question: "How do I use the tool, and do I need editing experience?",
    answer: "Using the tool is simple: upload an image (one at a time), click on Blemish Remover, and let the AI process it automatically. After review, you can make further edits or download your image. No design or technical skills are required - it's built for everyone.",
  },
  {
    question: "What image formats are supported?",
    answer: "The tool supports all major formats including JPG, JPEG, PNG, WEBP, and HEIC, making it suitable for both mobile photos and high-resolution camera shots.",
  },
  {
    question: "What kinds of photos and blemishes can the tool handle?",
    answer: "The tool works on a wide range of photos, from selfies to portraits. It automatically removes blemishes like acne, pimples, scars, freckles, and dark spots across the entire image. Results may vary depending on photo quality, lighting, and skin visibility. For more targeted edits, you can use the Magic Eraser tool.",
  },
  {
    question: "How fast is it, and what's the output quality?",
    answer: "Processing usually takes just a few seconds, depending on image resolution and file size. The final results are downloadable in high resolution, making them perfect for social media, printing, or professional use.",
  },
  {
    question: "What if I want to make more edits after removing blemishes?",
    answer: "After blemish removal, you can keep editing with other tools like Background Remover, Magic Eraser, or additional edit features to fine-tune your photo before downloading.",
  },
  {
    question: "Will the edited results look realistic?",
    answer: "Yes. The AI is designed to preserve natural skin tone, texture, and lighting, ensuring that your retouched photo looks authentic - not over-edited.",
  },
  {
    question: "Are my photos secure and private?",
    answer: "Absolutely. Your images are processed securely and are not stored longer than necessary. We do not use your content for AI training, and your photos are never shared with third parties.",
  },
  {
    question: "Can I use this tool for commercial work?",
    answer: "Yes. The tool is suitable for ecommerce product photos, client projects, content creation, and more - as long as you have the rights to the original images.",
  }
]

export const imageUpscalerFaqs: FAQItem[] = [
  {
    question: "What is the Image Upscaler tool and what does it do?",
    answer: "The Image Upscaler is an AI-powered tool that increases image resolution by intelligently adding pixels. It enhances clarity, sharpness, and overall quality - turning pixelated or low-resolution photos into professional-grade visuals."
  },
  {
    question: "What image formats are supported?",
    answer: "The tool supports all major image formats, including JPG, JPEG, PNG, WEBP, HEIC, and more. You can also upload multiple images at once for batch processing."
  },
  {
    question: "Can I upscale any photo, and will the AI change how it looks?",
    answer: "Yes, you can upscale any photo, but results may vary. The tool works best on genuinely low-resolution images. While the AI enhances sharpness and detail, it preserves the original look and feel - you'll get a cleaner, sharper version of your image, not a drastically altered one."
  },
  {
    question: "Do I need an account to use the Image Upscaler?",
    answer: "Yes, a quick sign-up is required to access your 2 free image credits per day. Once registered, you can start using the AI immediately. For additional credits or higher-resolution downloads, you can upgrade to one of our affordable plans."
  },
  {
    question: "How long does it take to upscale an image?",
    answer: "Usually just a few seconds. For larger or higher-resolution images, the process may take up to a minute or two at most."
  },
  {
    question: "Will the file size change after upscaling?",
    answer: "Yes. Since the tool increases resolution by adding pixels, the enhanced image typically has a larger file size compared to the original."
  },
  {
    question: "Can I edit the image after upscaling, and do I need editing skills?",
    answer: "Absolutely. After upscaling, you can use the built-in Edit option to enhance details, remove objects, or apply adjustments before downloading the final version. No editing experience is required - the tool is intuitive and beginner-friendly."
  },
  {
    question: "What makes this Image Upscaler special?",
    answer: "Unlike basic resizers, our tool uses advanced AI to add detail, reduce noise, and improve sharpness. This results in professional-quality visuals suitable for digital displays, prints, portfolios, ecommerce, and more."
  },
  {
    question: "Can I use the upscaler for commercial projects and large prints?",
    answer: "Yes! The AI-enhanced resolution makes it ideal for ecommerce listings, marketing materials, creative projects, posters, and banners. It prevents pixelation while expanding image dimensions, ensuring your visuals look sharp in both digital and print formats."
  },
  {
    question: "Are my uploaded images secure?",
    answer: "Yes. All uploaded images are processed securely and not stored longer than necessary. Your files remain private and are never shared or used for AI training."
  },
  {
    question: "What if I'm not happy with the result?",
    answer: "You can re-upload and upscale the image again, or use additional tools like detail enhancement or object removal to refine the result. Flexibility is built into the workflow to help you get the best outcome."
  }
]


export const imageUnblurFaqs: FAQItem[] = [
  {
    question: "What is this AI Image Unblurring tool and what does it do?",
    answer:
      "Our AI-powered Image Unblurring tool automatically enhances blurry, out-of-focus, or pixelated images. It restores sharpness, reduces noise, and brings back detail - giving you a high-quality, clear version of your photo in seconds.",
  },
  {
    question: "Do I need an account to use it?",
    answer:
      "Yes, signing up is required to access the AI editing tools. Once registered, you'll receive 2 free image credits per day to try out features like image unblurring. For more credits and full access, you can explore our affordable plans on the pricing page.",
  },
  {
    question: "How do I use the tool and how long does it take?",
    answer:
      "Simply upload an image from your device (or pick one already in your account) and click Unblur Image. The AI will automatically enhance it by removing blur and sharpening details - no editing experience needed. The process typically takes just a few seconds, depending on the resolution and size of the uploaded image.",
  },
  {
    question: "What file formats and uploads are supported?",
    answer:
      "Our tool supports all major image formats including JPG, JPEG, PNG, WEBP, and HEIC. You can also upload multiple images at once for faster editing and workflow efficiency.",
  },
  {
    question: "Can I unblur text in an image?",
    answer:
      "Not at the moment. The tool currently focuses on enhancing photos and visual content. Support for text unblurring is under development and will be added in a future update.",
  },
  {
    question: "What results can I expect?",
    answer:
      "Our AI works well on most blurry or unfocused images, correcting issues like camera shake or poor focus. If you're not satisfied, you can reprocess the same image or try again. However, if the blur is too severe and the subject is completely unrecognizable, full recovery may not be possible.",
  },
  {
    question: "Do I need editing skills, and how is this different from traditional photo editors?",
    answer:
      "No skills required! Unlike manual photo editors that demand time and expertise, our tool uses advanced AI to restore sharpness with a single click. It's fast, automatic, and designed to be user-friendly for everyone.",
  },
  {
    question: "Can I make further edits after unblurring?",
    answer:
      "Yes. After unblurring, you can continue refining your photo with additional tools - such as background removal, object erasing, or detail enhancement - for even better results.",
  },
  {
    question: "Is this tool good for social media or profile pictures?",
    answer:
      "Absolutely. Whether it's a selfie, headshot, or product photo, the AI unblurring tool is perfect for sharpening visuals for LinkedIn, Instagram, Facebook, and more.",
  },
  {
    question: "Can I use this tool for business or commercial projects?",
    answer:
      "Yes. Many users rely on it for ecommerce, ads, content creation, and professional photography. Just make sure you have the rights to edit the images you upload.",
  },
  {
    question: "Is my uploaded image data secure?",
    answer:
      "Yes, your privacy is important to us. All images are processed securely and not stored longer than necessary. We do not use your photos for AI training or share them externally.",
  },
];

export const photoRestorationFaqs: FAQItem[] = [
  {
    question: "What does the AI Photo Restoration tool do?",
    answer: "Our AI automatically repairs and enhances old or damaged photos by correcting imperfections, restoring details, and reviving faded colors - no editing skills required."
  },
  {
    question: "How is this different from traditional photo editing?",
    answer: "Unlike manual editing that takes time and skill, our AI detects flaws and restores photos in seconds - no brushes, layers, or downloads needed."
  },
  {
    question: "What types of damage can it fix?",
    answer: "The AI can repair scratches, fading, discoloration, water stains, creases, minor tears, and even reconstruct missing parts with realistic details."
  },
  {
    question: "Can it improve blurry or low-quality photos?",
    answer: "Yes! AI often enhances soft or blurry areas - especially faces and textures - making photos look sharper and clearer."
  },
  {
    question: "Can I restore black-and-white photos?",
    answer: "Absolutely. You can either keep them B&W or apply AI colorization to give them a natural, modern look."
  },
  {
    question: "Do I need an account to try it?",
    answer: "No account needed - you get free daily credits. Upgrade anytime for high-res downloads, more uploads, and extra features."
  },
  {
    question: "Which image formats are supported?",
    answer: "You can upload JPG, JPEG, PNG, WEBP, and TIFF files - suitable for both smartphone captures and scanned prints."
  },
  {
    question: "How long does it take?",
    answer: "Most restorations are done in seconds, even for high-resolution photos."
  },
  {
    question: "Can I adjust or fine-tune the results?",
    answer: "Yes. After auto-restoration, you can remove backgrounds, erase objects, upscale resolution, or tweak brightness - all in one tool."
  },
  {
    question: "Is my data safe?",
    answer: "Yes. All photos are processed securely and deleted after a short period. We never use or share your images for training."
  },
  {
    question: "Can I use it for commercial work?",
    answer: "Definitely. Many photographers, e-commerce sellers, and creators use our tool for business purposes - just ensure you own the image rights."
  }
]

export const magicEraserFaqs: FAQItem[] = [
  {
    question: "What is this tool and what does it do?",
    answer: "Our Magic Eraser is an AI-powered tool that removes unwanted elements - like objects, people, text, or clutter - from any image. Just brush over what you want to erase, and the tool intelligently fills in the background to make it look like it was never there."
  },
  {
    question: "Do I need an account to use it?",
    answer: "No, you can get started right away. We offer 2 free image credits per day, so you can try the tool without registering. For more daily usage and premium features, we offer paid plans, which you can view on our pricing page."
  },
  {
    question: "How do I use it, and do I need editing skills?",
    answer: "It's incredibly simple: upload your image, brush over anything you want removed, hit \"Erase\", and download your clean photo. You can undo or refine your selection any time - no editing skills required."
  },
  {
    question: "What image formats are supported?",
    answer: "We support all common formats including JPG, JPEG, PNG, WEBP, and HEIC. You can upload anything from smartphone selfies to professional, high-resolution images."
  },
  {
    question: "How long does it take to erase something?",
    answer: "In most cases, just a few seconds. Our AI engine works fast, even on high-resolution photos, delivering seamless results almost instantly."
  },
  {
    question: "What if I make mistakes or run out of credits?",
    answer: "You can undo or re-erase any area, but each erase counts as a credit. You get 2 free credits per day, which reset every 24 hours. If you need more, you can upgrade to a paid plan for additional credits and perks."
  },
  {
    question: "Can I erase multiple things in one image?",
    answer: "Yes. You can erase multiple elements at once or in sequence. Just brush over each one and click erase - the AI will intelligently remove each selected area while preserving the rest of the photo."
  },
  {
    question: "Can I use it for text, watermarks, or commercial projects?",
    answer: "Yes, the tool can remove text, logos, and watermarks - but only if you have permission to modify the image. Many freelancers, e-commerce sellers, and marketers also use it for commercial projects. Always make sure you have the rights to edit."
  },
  {
    question: "Will the results look realistic on all kinds of images?",
    answer: "Yes. Our AI is designed to blend erased areas seamlessly with the background, making edits look natural. It works well on everything from portraits and selfies to product shots and real estate photos. While results vary by image, most edits are virtually unnoticeable."
  },
  {
    question: "Is my image data safe?",
    answer: "Yes, we take privacy seriously. Uploaded images are processed securely and not stored longer than necessary. We never use your photos for training or share them externally."
  }
];

export const imageExtenderFaqs: FAQItem[] = [
  {
    question: "What is the AI Image Extender and what does it do?",
    answer:
      "The Image Extender is an AI-powered tool that expands the background of your photos automatically. It helps fix tight crops, improve framing, and adjust aspect ratios. The AI fills in missing space with natural details so your photo looks complete.",
  },
  {
    question: "Do I need an account to use it?",
    answer:
      "Yes. Signing up gives you 2 free image extensions per day. You can upgrade anytime for more credits and high-resolution downloads.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support all popular formats: JPG, JPEG, PNG, WEBP, and HEIC. From smartphone snaps to professional high-resolution photos, our tool can handle them.",
  },
  {
    question: "How long does it take to extend an image?",
    answer:
      "Usually just a few seconds. Even large, high-resolution photos are processed almost instantly, so your extended image is ready right away.",
  },
  {
    question: "What if I don't like the result? Will it look natural?",
    answer:
      "Yes - the AI is trained to match your photo's lighting, texture, and background for seamless results. If you're not satisfied, you can retry the same image multiple times until you get the look you want (each attempt uses 1 credit).",
  },
  {
    question: "What happens when I run out of free credits?",
    answer:
      "You get 2 free credits every 24 hours. If you need more, you can upgrade to a paid plan for higher limits, faster processing, and high-resolution downloads.",
  },
  {
    question: "What types of photos can I use this on?",
    answer:
      "The tool works with almost any photo - portraits, selfies, product shots, real estate, or social media images. It's perfect for LinkedIn, Instagram, YouTube thumbnails, Etsy product listings, and more.",
  },
  {
    question: "Is my image data secure?",
    answer:
      "Yes. Your photos are processed securely and never stored longer than necessary. We don't use them for training or share them with third parties.",
  },
  {
    question: "Can I use the tool for commercial work?",
    answer:
      "Absolutely. Many users rely on it for e-commerce, ads, design, and professional projects. Just make sure you have the rights to use and modify the original image.",
  },
];

export const colorCorrectionFaqs: FAQItem[] = [
  {
    question: "What is this tool and how do I use it?",
    answer: "Our Color Correction tool is an AI-powered photo editor that automatically fixes color imbalances in your images. Simply upload your photo, and the AI will adjust elements like exposure, contrast, saturation, temperature, white balance, and shadows to deliver natural-looking, well-balanced results. No manual adjustments or editing skills needed.",
  },
  {
    question: "Do I need an account or subscription?",
    answer: "Yes, you'll need to sign up and log in to access our AI Editing Tools. We offer 2 free image credits per day under our Free plan. Your credits reset every 24 hours, giving you daily access without a paid subscription. For more credits and advanced features, you can explore our premium plans.",
  },
  {
    question: "What image formats are supported?",
    answer: "We support all major formats including JPG, PNG, WEBP, and HEIC, with full compatibility across different image dimensions.",
  },
  {
    question: "How long does color correction take?",
    answer: "For smaller images, the process usually takes just a few seconds. Larger, high-resolution photos may take up to a couple of minutes. Either way, the process is fast, efficient, and fully automated.",
  },
  {
    question: "Can this tool fix any image, even dull, flat, or poorly lit ones?",
    answer: "Our tool works on most images. It enhances vibrancy and saturation, making dull or grayish photos pop with life. However, for photos with extreme overexposure or underexposure, full correction may not be possible if details are too distorted or lost.",
  },
  {
    question: "Can it fix exposure, lighting, and white balance issues automatically?",
    answer: "Yes! The tool balances highlights, shadows, and brightness to restore detail in overexposed or high-contrast images. It also detects and removes unnatural color casts by correcting temperature and tint for a natural white balance.",
  },
  {
    question: "What types of photos work best with this tool?",
    answer: "Our AI Color Correction works great for portraits, product photos, landscapes, and travel shots - enhancing skin tones, sharpening details, restoring natural colors, and fixing harsh lighting.",
  },
  {
    question: "What makes this color correction tool different?",
    answer: "Unlike basic filters, our tool uses advanced AI to analyze lighting, temperature, shadows, and contrast. It intelligently brings out vibrancy, balances tones, and fixes exposure issues to create realistic, polished results - without looking over-edited.",
  },
  {
    question: "Is my image data safe?",
    answer: "Yes. Your photos are processed securely and never stored longer than necessary. We don't use them for training or share them with third parties.",
  },
];

export const textRemoverFaqs: FAQItem[] = [
  {
    question: "What is the AI Text Remover tool and what does it do?",
    answer:
      "Our Text Remover is an AI-powered tool that removes unwanted text - captions, watermarks, annotations, or labels - from any image. The AI detects the text, erases it, and fills the empty space with background pixels that blend naturally with the rest of the image.",
  },
  {
    question: "Do I need an account or sign up to use it?",
    answer:
      "No account is required to get started. You can use the tool for free with 2 image credits per day. For more credits, faster processing, or HD exports, check out our paid plans on the pricing page.",
  },
  {
    question: "How do I use this tool? Do I need editing skills?",
    answer:
      "Just upload your image, brush over the text you want to remove, and click Erase. The AI removes the text and restores the background in seconds. You don't need Photoshop or editing skills - anyone can use it.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support all common formats including JPG, JPEG, PNG, WEBP, and HEIC - whether it's a screenshot, a scanned document, or a high-resolution photo.",
  },
  {
    question: "Can I remove more than one text area at a time?",
    answer:
      "Yes! You can highlight multiple text areas in a single image before clicking Erase. The AI will process all selected regions in one image.",
  },
  {
    question: "Will the background look natural after removing text?",
    answer:
      "In most cases, yes. The AI is trained to match textures, lighting, and patterns. The result looks like the text was never there - no blurs or smudges.",
  },
  {
    question: "Can it remove handwritten or stylized text?",
    answer:
      "Yes. The AI works with both typed and handwritten text and can handle most fonts and handwriting styles, as long as the background is reasonably consistent.",
  },
  {
    question: "Can I undo or reprocess if I'm not happy with the result?",
    answer:
      "Absolutely. You can retry removal by adjusting your brush selection and reprocessing the image. Each attempt uses 1 credit.",
  },
  {
    question: "How long does it take to process an image?",
    answer:
      "Just a few seconds. Even high-resolution images are processed quickly and returned for preview almost instantly.",
  },
  {
    question: "Can I use it to remove watermarks or logos?",
    answer:
      "Yes - but only if you own the image or have permission to edit it. The tool is not intended for removing copyrighted watermarks or violating usage rights.",
  },
  {
    question: "Can I use the results for social media, marketing, or commercial work?",
    answer:
      "Definitely. From Instagram posts to ads, product shots, email campaigns, and client presentations, you're free to use the results for commercial work - as long as you have the rights to edit the original image.",
  },
  {
    question: "Is my image data private and secure?",
    answer:
      "Yes. All images are processed securely and not stored after completion. Your content isn't shared or used for AI training.",
  },
];

export const faceRestorationFaqs: FAQItem[] = [
  {
    question: "What is the AI Face Restoration tool and what does it do?",
    answer:
      "The AI Face Restoration tool repairs and enhances faces in old, blurry, or damaged photos. It removes blur, restores missing details, and improves clarity while keeping the person's natural appearance intact.",
  },
  {
    question: "Do I need an account to use this tool?",
    answer:
      "Yes. You'll need to sign up and log in to access our AI editing features. Free accounts include daily image credits, and you can upgrade for more credits or higher-resolution downloads.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support JPG, JPEG, PNG, WEBP, HEIC, and more covering all common formats from smartphones, cameras, and scans.",
  },
  {
    question: "How do I use the AI Face Restoration tool?",
    answer:
      "Simply upload your image, choose your restoration settings, and let the AI process it. In seconds, you'll see a restored version ready to preview and download. No photo editing skills required.",
  },
  {
    question: "How long does it take to restore a face?",
    answer:
      "Most images are processed in just a few seconds. Larger or more complex photos may take up to a minute.",
  },
  {
    question: "Can I restore multiple faces in a single photo?",
    answer:
      "Yes. The tool automatically detects and restores all visible faces, so group photos can be enhanced in one go.",
  },
  {
    question: "How accurate are the results, and can I adjust the restoration?",
    answer:
      "Our AI preserves identity as accurately as possible, with a Fidelity slider to adjust results. High Fidelity keeps features close to the original, while Low Fidelity applies stronger enhancements. For very blurry or damaged photos, the AI recovers details where possible and may reconstruct features for a natural look.",
  },
  {
    question: "Does the tool also improve the background?",
    answer:
      "Yes. By default, the background is subtly enhanced to match the restored face. You can turn this on or off before downloading.",
  },
  {
    question: "Is it good enough for printing large photos?",
    answer:
      "Absolutely. Combine restoration with our AI upscaling feature for high-resolution, print-ready images without pixelation.",
  },
  {
    question: "Can I use the tool for commercial purposes?",
    answer:
      "Yes. You can restore images for professional use, including headshots, portfolios, marketing materials, or client projects.",
  },
  {
    question: "Are my uploaded images secure?",
    answer:
      "Yes. All files are processed securely and deleted after processing. Your images are never used for AI training or shared with third parties.",
  },
  {
    question: "What if I'm not happy with the result?",
    answer:
      "You can adjust the Fidelity setting, re-upload the image, or combine restoration with other tools like upscaling or color correction for the best outcome.",
  },
];

