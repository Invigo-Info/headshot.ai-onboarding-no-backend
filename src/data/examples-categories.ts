export interface ExampleCard {
  background: string;
  attire: string;
  beforeImage: string;
  afterImage: string;
}

export interface ExampleCategory {
  key: string;
  label: string;
  headline: string;
  cards: ExampleCard[];
}

function buildCards(
  key: string,
  cards: Array<{ background: string; attire: string }>
): ExampleCard[] {
  return cards.map((card, i) => ({
    ...card,
    beforeImage: `/assets/landing-page/${key}/before-n-after/${i + 1}a.webp`,
    afterImage: `/assets/landing-page/${key}/before-n-after/${i + 1}b.webp`,
  }));
}

export const exampleCategories: ExampleCategory[] = [
  {
    key: "professional",
    label: "Professional",
    headline: "Professional Headshot Transformations",
    cards: buildCards("professional", [
      { background: "Studio", attire: "Business Professional" },
      { background: "Office", attire: "Business Casual" },
      { background: "Nature", attire: "Business Professional" },
      { background: "Wall & Brick", attire: "Smart Casual" },
      { background: "Studio", attire: "Business Casual" },
      { background: "City", attire: "Business Professional" },
    ]),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    headline: "LinkedIn Headshot Transformations",
    cards: buildCards("linkedin", [
      { background: "Studio", attire: "Business Professional" },
      { background: "Office", attire: "Business Professional" },
      { background: "Nature", attire: "Business Casual" },
      { background: "City", attire: "Business Professional" },
      { background: "Wall & Brick", attire: "Smart Casual" },
      { background: "Studio", attire: "Business Casual" },
    ]),
  },
  {
    key: "corporate",
    label: "Corporate",
    headline: "Corporate Headshot Transformations",
    cards: buildCards("corporate", [
      { background: "Studio", attire: "Business Professional" },
      { background: "Office", attire: "Business Professional" },
      { background: "City", attire: "Business Professional" },
      { background: "Nature", attire: "Business Casual" },
      { background: "Wall & Brick", attire: "Business Professional" },
      { background: "Studio", attire: "Business Casual" },
    ]),
  },
  {
    key: "executive",
    label: "Executive",
    headline: "Executive Headshot Transformations",
    cards: buildCards("executive", [
      { background: "Studio", attire: "Business Professional" },
      { background: "Boardroom", attire: "Business Professional" },
      { background: "Office", attire: "Business Professional" },
      { background: "City", attire: "Business Professional" },
      { background: "Studio", attire: "Business Casual" },
      { background: "Boardroom", attire: "Business Professional" },
    ]),
  },
  {
    key: "business",
    label: "Business",
    headline: "Business Headshot Transformations",
    cards: buildCards("business", [
      { background: "Studio", attire: "Smart Casual" },
      { background: "Office", attire: "Business Professional" },
      { background: "City", attire: "Business Professional" },
      { background: "Nature", attire: "Business Casual" },
      { background: "Wall & Brick", attire: "Smart Casual" },
      { background: "Studio", attire: "Business Casual" },
    ]),
  },
  {
    key: "doctor",
    label: "Doctor",
    headline: "Doctor Headshot Transformations",
    cards: buildCards("doctor", [
      { background: "Studio", attire: "White Coat" },
      { background: "Hospital", attire: "White Coat" },
      { background: "Medical Office", attire: "Scrubs" },
      { background: "Outdoor", attire: "Business Professional" },
      { background: "Studio", attire: "Business Casual" },
      { background: "Hospital", attire: "Scrubs" },
    ]),
  },
  {
    key: "lawyer",
    label: "Lawyer",
    headline: "Lawyer Headshot Transformations",
    cards: buildCards("lawyer", [
      { background: "Studio", attire: "Business Professional" },
      { background: "Office", attire: "Business Professional" },
      { background: "City", attire: "Business Professional" },
      { background: "Nature", attire: "Business Casual" },
      { background: "Outdoor", attire: "Business Professional" },
      { background: "Studio", attire: "Business Professional" },
    ]),
  },
  {
    key: "actor",
    label: "Actor",
    headline: "Actor Headshot Transformations",
    cards: buildCards("actor", [
      { background: "Studio", attire: "Commercial" },
      { background: "Stage", attire: "Theatrical" },
      { background: "Studio", attire: "Character" },
      { background: "Outdoor", attire: "Commercial" },
      { background: "Studio", attire: "Theatrical" },
      { background: "Outdoor", attire: "Commercial" },
    ]),
  },
  {
    key: "nurse",
    label: "Nurse",
    headline: "Nurse Headshot Transformations",
    cards: buildCards("nurse", [
      { background: "Studio", attire: "Scrubs" },
      { background: "Hospital", attire: "White Coat" },
      { background: "Medical Office", attire: "Scrubs" },
      { background: "Outdoor", attire: "Professional" },
      { background: "Studio", attire: "Scrubs" },
      { background: "Hospital", attire: "Professional" },
    ]),
  },
  {
    key: "teacher",
    label: "Teacher",
    headline: "Teacher Headshot Transformations",
    cards: buildCards("teacher", [
      { background: "Studio", attire: "Professional" },
      { background: "Classroom", attire: "Professional" },
      { background: "Campus", attire: "Smart Casual" },
      { background: "Studio", attire: "Business Casual" },
      { background: "Classroom", attire: "Business Casual" },
      { background: "Campus", attire: "Professional" },
    ]),
  },
  {
    key: "graduation",
    label: "Graduation",
    headline: "Graduation Headshot Transformations",
    cards: buildCards("graduation", [
      { background: "Studio", attire: "Graduation Gown" },
      { background: "Campus", attire: "Professional" },
      { background: "Studio", attire: "Professional" },
      { background: "Outdoor", attire: "Graduation Gown" },
      { background: "Campus", attire: "Graduation Gown" },
      { background: "Studio", attire: "White Coat" },
    ]),
  },
  {
    key: "dating",
    label: "Dating",
    headline: "Dating Photo Transformations",
    cards: buildCards("dating", [
      { background: "Studio", attire: "Smart Casual" },
      { background: "Nature", attire: "Casual" },
      { background: "Outdoor", attire: "Casual" },
      { background: "Urban", attire: "Smart Casual" },
      { background: "Studio", attire: "Casual" },
      { background: "Nature", attire: "Smart Casual" },
    ]),
  },
  {
    key: "model",
    label: "Model",
    headline: "Model Headshot Transformations",
    cards: buildCards("model", [
      { background: "Studio", attire: "Fashion" },
      { background: "Outdoor", attire: "Editorial" },
      { background: "Studio", attire: "Commercial" },
      { background: "Urban", attire: "Streetwear" },
      { background: "Studio", attire: "Minimalist" },
      { background: "Nature", attire: "Editorial" },
    ]),
  },
  {
    key: "ceo",
    label: "CEO",
    headline: "CEO Headshot Transformations",
    cards: buildCards("ceo", [
      { background: "Studio", attire: "Business Professional" },
      { background: "Boardroom", attire: "Business Professional" },
      { background: "Office", attire: "Business Professional" },
      { background: "City", attire: "Business Professional" },
      { background: "Studio", attire: "Business Casual" },
      { background: "Boardroom", attire: "Business Professional" },
    ]),
  },
  {
    key: "entrepreneur",
    label: "Entrepreneur",
    headline: "Entrepreneur Headshot Transformations",
    cards: buildCards("entrepreneur", [
      { background: "Studio", attire: "Smart Casual" },
      { background: "Office", attire: "Business Casual" },
      { background: "City", attire: "Business Professional" },
      { background: "Nature", attire: "Casual" },
      { background: "Studio", attire: "Business Professional" },
      { background: "Urban", attire: "Smart Casual" },
    ]),
  },
  {
    key: "surgeon",
    label: "Surgeon",
    headline: "Surgeon Headshot Transformations",
    cards: buildCards("surgeon", [
      { background: "Studio", attire: "White Coat" },
      { background: "Hospital", attire: "Scrubs" },
      { background: "Medical Office", attire: "White Coat" },
      { background: "Studio", attire: "Business Professional" },
      { background: "Hospital", attire: "White Coat" },
      { background: "Studio", attire: "Scrubs" },
    ]),
  },
  {
    key: "dentist",
    label: "Dentist",
    headline: "Dentist Headshot Transformations",
    cards: buildCards("dentist", [
      { background: "Studio", attire: "White Coat" },
      { background: "Dental Office", attire: "Scrubs" },
      { background: "Studio", attire: "Business Professional" },
      { background: "Medical Office", attire: "White Coat" },
      { background: "Studio", attire: "Business Casual" },
      { background: "Dental Office", attire: "White Coat" },
    ]),
  },
  {
    key: "therapist",
    label: "Therapist",
    headline: "Therapist Headshot Transformations",
    cards: buildCards("therapist", [
      { background: "Studio", attire: "Business Casual" },
      { background: "Office", attire: "Smart Casual" },
      { background: "Nature", attire: "Business Casual" },
      { background: "Studio", attire: "Professional" },
      { background: "Outdoor", attire: "Smart Casual" },
      { background: "Studio", attire: "Business Casual" },
    ]),
  },
];
