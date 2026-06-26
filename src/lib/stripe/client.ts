import { loadStripe, type Stripe } from "@stripe/stripe-js";

// Browser-side Stripe.js singleton for Embedded Checkout. Loaded once and
// reused so the script isn't fetched on every render.
let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
    );
  }
  return stripePromise;
}
