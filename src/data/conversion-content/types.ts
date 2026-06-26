export interface ConversionContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    subheadline: string;
  };
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  ctaContent: string;
  whenToConvert: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}
