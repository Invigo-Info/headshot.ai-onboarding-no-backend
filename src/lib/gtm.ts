// Google Tag Manager dataLayer utility

type GTMEvent = {
  event: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: GTMEvent[];
  }
}

export function trackEvent(event: GTMEvent) {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  }
}

export function trackCTAClick({
  event,
  ctaText,
  ctaLocation,
  ctaVariant,
  category,
}: {
  event: string;
  ctaText: string;
  ctaLocation: "navbar" | "navbar_mobile" | "hero";
  ctaVariant: "primary" | "secondary";
  category?: string;
}) {
  trackEvent({
    event,
    cta_text: ctaText,
    cta_location: ctaLocation,
    cta_variant: ctaVariant,
    cta_destination: "/login",
    page_path: window.location.pathname,
    page_title: document.title,
    page_referrer: document.referrer,
    category: category || "professional",
    timestamp: new Date().toISOString(),
    viewport: window.innerWidth <= 768 ? "mobile" : window.innerWidth <= 1024 ? "tablet" : "desktop",
  });
}
