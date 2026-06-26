"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import type { FormData } from "@/store/form-store";
import { getPricingDetails } from "@/data/one-time-pricing-details";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export interface CreatePaymentLinkResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function createPaymentLink(
  formData: FormData & { slug: string }
): Promise<CreatePaymentLinkResult> {
  try {
    const supabase = await createClient();

    // Anonymous checkout is allowed: if there's a signed-in user, we'll attach
    // their Stripe customer + user_id metadata. Otherwise Stripe Checkout will
    // collect the email and the webhook can reconcile the order to a user
    // account after payment.
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    // Get the price info based on selected plan. The DB row is preferred (it
    // has the canonical Stripe price ID). If the table isn't seeded yet we
    // fall back to the static pricing config so dev/test still reaches Stripe.
    const { data: priceData } = await supabase
      .from("prices")
      .select("*, products(*)")
      .eq("plan_name", formData.selectedPlan)
      .eq("interval", "one_time")
      .limit(1)
      .maybeSingle();

    const category = formData.slug.replace(/-headshots$/, "") || "professional";
    const fallbackPlan = getPricingDetails(category).plans.find(
      (p) => p.name.toLowerCase() === formData.selectedPlan,
    );

    if (!priceData && !fallbackPlan) {
      return {
        success: false,
        error: "Invalid plan selected",
      };
    }

    // Get the pack info; missing pack rows are also tolerated in dev so the
    // checkout still proceeds (we only need pack_id for metadata).
    const { data: packData } = await supabase
      .from("packs")
      .select("*")
      .eq("slug", formData.slug)
      .limit(1)
      .maybeSingle();

    // Resolve a Stripe customer for signed-in users. Anonymous shoppers go
    // through Checkout's built-in email + customer creation flow instead.
    let customerId: string | undefined;
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id, email")
        .eq("id", user.sub)
        .single();

      customerId = profile?.stripe_customer_id ?? undefined;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: profile?.email || user.email,
          metadata: {
            user_id: user.sub,
          },
        });
        customerId = customer.id;
        await supabase
          .from("profiles")
          .update({ stripe_customer_id: customerId })
          .eq("id", user.sub);
      }
    }

    const requestHeaders = await headers();
    const origin = requestHeaders.get("origin");

    // Use the fallback plan's headshot count + name to build a consistent
    // product description for either the DB-priced or price_data line item.
    const planForCopy = fallbackPlan ?? {
      name: formData.selectedPlan,
      headshots: priceData?.headshot_count ?? 0,
    } as { name: string; headshots: number };
    const productDescription = `Generate ${planForCopy.headshots} professional AI headshots. One-time purchase, no subscription.`;

    const useDbPrice = Boolean(priceData?.stripe_price_id);
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = useDbPrice
      ? { price: priceData!.stripe_price_id!, quantity: 1 }
      : {
          price_data: {
            currency: "usd",
            product_data: {
              name: planForCopy.name.charAt(0).toUpperCase() + planForCopy.name.slice(1),
              description: productDescription,
            },
            unit_amount: Math.round(fallbackPlan!.price * 100),
          },
          quantity: 1,
        };

    // Create checkout session for one-time payment
    const session = await stripe.checkout.sessions.create({
      ...(customerId
        ? { customer: customerId }
        : { customer_creation: "always" as const }),
      line_items: [lineItem],
      mode: "payment",
      // Multi-currency: Stripe automatically presents a local-currency option
      // (e.g. INR for shoppers in India) alongside the base USD price.
      adaptive_pricing: { enabled: true },
      // Ensure an Invoice is generated for one-time payments so it shows in Portal
      invoice_creation: {
        enabled: true,
      },
      // Send users back into the onboarding wizard's payment-success step
      // so they see a confirmation + their selections before continuing.
      // The Stripe webhook (when configured) records the order + kicks off
      // training in the background — the dashboard (linked from the success
      // step) will show generated headshots as soon as they're ready.
      success_url: `${origin}/generate/one-time/${formData.slug}?step=payment-success&payment=success&plan=${formData.selectedPlan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/generate/one-time/${formData.slug}?step=pricing`,
      allow_promotion_codes: true,
      metadata: {
        user_id: user?.sub ?? "",
        pack_id: packData?.id ?? "",
        price_id: priceData?.id ?? "",
        plan: formData.selectedPlan,
        slug: formData.slug,
      },
    });

    return {
      success: true,
      url: session.url!,
    };
  } catch (error) {
    console.error("Error creating payment link:", error);
    return {
      success: false,
      error: "Failed to create payment link",
    };
  }
}

// ---- Embedded Checkout (in-page payment with custom marketing panel) -------
export interface CreateEmbeddedCheckoutResult {
  success: boolean;
  clientSecret?: string;
  error?: string;
}

export async function createEmbeddedCheckoutSession(
  formData: FormData & { slug: string }
): Promise<CreateEmbeddedCheckoutResult> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    const { data: priceData } = await supabase
      .from("prices")
      .select("*, products(*)")
      .eq("plan_name", formData.selectedPlan)
      .eq("interval", "one_time")
      .limit(1)
      .maybeSingle();

    const category = formData.slug.replace(/-headshots$/, "") || "professional";
    const fallbackPlan = getPricingDetails(category).plans.find(
      (p) => p.name.toLowerCase() === formData.selectedPlan,
    );

    if (!priceData && !fallbackPlan) {
      return { success: false, error: "Invalid plan selected" };
    }

    const { data: packData } = await supabase
      .from("packs")
      .select("*")
      .eq("slug", formData.slug)
      .limit(1)
      .maybeSingle();

    // Resolve a Stripe customer for signed-in users.
    let customerId: string | undefined;
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id, email")
        .eq("id", user.sub)
        .single();

      customerId = profile?.stripe_customer_id ?? undefined;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: profile?.email || user.email,
          metadata: { user_id: user.sub },
        });
        customerId = customer.id;
        await supabase
          .from("profiles")
          .update({ stripe_customer_id: customerId })
          .eq("id", user.sub);
      }
    }

    const requestHeaders = await headers();
    const origin = requestHeaders.get("origin");

    const planForCopy = fallbackPlan ?? ({
      name: formData.selectedPlan,
      headshots: priceData?.headshot_count ?? 0,
    } as { name: string; headshots: number });
    const productDescription = `Generate ${planForCopy.headshots} professional AI headshots. One-time purchase, no subscription.`;

    const useDbPrice = Boolean(priceData?.stripe_price_id);
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = useDbPrice
      ? { price: priceData!.stripe_price_id!, quantity: 1 }
      : {
          price_data: {
            currency: "usd",
            product_data: {
              name:
                planForCopy.name.charAt(0).toUpperCase() +
                planForCopy.name.slice(1),
              description: productDescription,
            },
            unit_amount: Math.round(fallbackPlan!.price * 100),
          },
          quantity: 1,
        };

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      ...(customerId
        ? { customer: customerId }
        : { customer_creation: "always" as const }),
      line_items: [lineItem],
      mode: "payment",
      adaptive_pricing: { enabled: true },
      invoice_creation: { enabled: true },
      allow_promotion_codes: true,
      // After payment, Stripe redirects back into the wizard's success step.
      return_url: `${origin}/generate/one-time/${formData.slug}?step=payment-success&payment=success&plan=${formData.selectedPlan}&session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        user_id: user?.sub ?? "",
        pack_id: packData?.id ?? "",
        price_id: priceData?.id ?? "",
        plan: formData.selectedPlan,
        slug: formData.slug,
      },
    });

    return { success: true, clientSecret: session.client_secret! };
  } catch (error) {
    console.error("Error creating embedded checkout session:", error);
    return { success: false, error: "Failed to start checkout" };
  }
}

// Subscription payment functions
export interface CreateSubscriptionLinkResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function createSubscriptionLink(
  billingPlan: "monthly" | "annual"
): Promise<CreateSubscriptionLinkResult> {
  try {
    const supabase = await createClient();

    // Get current user
    const { data, error: userError } = await supabase.auth.getClaims();
    const user = data?.claims;

    if (userError || !user) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Check if user already has an active subscription
    const { data: existingSubscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.sub)
      .eq("status", "active")
      .single();

    if (existingSubscription) {
      return {
        success: false,
        error: "You already have an active subscription",
      };
    }

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, email")
      .eq("id", user.sub)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile?.email || user.email,
        metadata: {
          user_id: user.sub,
        },
      });

      customerId = customer.id;

      // Update profile with customer ID
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.sub);
    }

    // Get the subscription price
    const planName = billingPlan === "annual" ? "yearly" : "weekly";
    const { data: priceData, error: priceError } = await supabase
      .from("prices")
      .select("*, products(*)")
      .eq("plan_name", planName)
      .eq("products.product_type", "subscription")
      .single();

    if (priceError || !priceData) {
      return {
        success: false,
        error: "Invalid subscription plan selected",
      };
    }

    if (!priceData.stripe_price_id) {
      return {
        success: false,
        error: "Stripe price ID not configured",
      };
    }

    const requestHeaders = await headers();
    const origin = requestHeaders.get("origin");

    // Create checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceData.stripe_price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/payment-status?type=subscription&plan=${planName}`,
      cancel_url: `${origin}/dashboard`,
      metadata: {
        user_id: user.sub,
        price_id: priceData.id,
        plan_name: planName,
      },
    });

    return {
      success: true,
      url: session.url!,
    };
  } catch (error) {
    console.error("Error creating subscription link:", error);
    return {
      success: false,
      error: "Failed to create subscription link",
    };
  }
}

export async function checkPaymentStatus(userId: string, planName: string) {
  try {
    const supabase = await createClient();

    // Check for recent paid orders for this user and plan
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        prices!inner(plan_name)
      `
      )
      .eq("user_id", userId)
      .eq("status", "paid")
      .eq("used", false)
      .eq("prices.plan_name", planName)
      .order("purchased_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error checking payment status:", error);
      return { success: false, error: "Failed to check payment status" };
    }

    return {
      success: true,
      hasPaidOrder: orders && orders.length > 0,
      order: orders?.[0] || null,
    };
  } catch (error) {
    console.error("Error checking payment status:", error);
    return { success: false, error: "Failed to check payment status" };
  }
}

export async function getPriceInfo(planName: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("prices")
      .select("*")
      .eq("plan_name", planName)
      .eq("interval", "one_time")
      .single();

    if (error || !data) {
      return { success: false, error: "Price not found" };
    }

    return {
      success: true,
      price: {
        id: data.id,
        amount: data.amount_cents / 100, // Convert to dollars
        headshot_count: data.headshot_count,
        plan_name: data.plan_name,
      },
    };
  } catch (error) {
    console.error("Error getting price info:", error);
    return { success: false, error: "Failed to get price info" };
  }
}

// New billing-related functions

export interface CustomerPortalResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Create a Stripe customer portal session for subscription management
 */
export async function createCustomerPortalSession(): Promise<CustomerPortalResult> {
  try {
    const supabase = await createClient();

    // Get current user
    const { data, error: userError } = await supabase.auth.getClaims();
    const user = data?.claims;

    if (userError || !user) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Get user's Stripe customer ID
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.sub)
      .single();

    if (!profile?.stripe_customer_id) {
      return {
        success: false,
        error: "No Stripe customer found",
      };
    }

    const requestHeaders = await headers();
    const origin = requestHeaders.get("origin");

    // Create customer portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${origin}/billing`,
    });

    return {
      success: true,
      url: session.url,
    };
  } catch (error) {
    console.error("Error creating customer portal session:", error);
    return {
      success: false,
      error: "Failed to create customer portal session",
    };
  }
}




// Billing history: invoices and receipts for one-time purchases
export interface InvoiceItem {
  id: string;
  created: number;
  amount: number;
  currency: string;
  status: string;
  url?: string;
  number?: string | null;
}

export interface ReceiptItem {
  id: string;
  created: number;
  amount: number;
  currency: string;
  status: string;
  url?: string;
  description?: string | null;
}

export interface BillingHistoryResult {
  success: boolean;
  invoices: InvoiceItem[];
  receipts: ReceiptItem[];
  error?: string;
}

export async function getBillingHistory(): Promise<BillingHistoryResult> {
  try {
    const supabase = await createClient();

    const { data, error: userError } = await supabase.auth.getClaims();
    const user = data?.claims;

    if (userError || !user) {
      return { success: false, invoices: [], receipts: [], error: "Authentication required" };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.sub)
      .single();

    const customerId = profile?.stripe_customer_id;
    if (!customerId) {
      return { success: true, invoices: [], receipts: [] };
    }

    // Fetch invoices (only present if invoice_creation was enabled or subscriptions)
    const invoicesResp = await stripe.invoices.list({
      customer: customerId,
      limit: 20,
    });

    const invoices: InvoiceItem[] = invoicesResp.data.map((inv) => ({
      id: inv.id as string,
      created: (inv.created as number) ?? 0,
      amount: typeof inv.amount_due === 'number' ? inv.amount_due / 100 : 0,
      currency: (inv.currency ?? 'usd').toUpperCase(),
      status: inv.status ?? 'unknown',
      url: inv.hosted_invoice_url ?? inv.invoice_pdf ?? undefined,
      number: inv.number ?? null,
    }));

    // Note: Some one-time payments may not have invoices (prior to enabling
    // invoice_creation). We fetch recent payment intents as receipt fallbacks.

    // Fetch payment intents as fallback for one-time charges without invoices
    const paymentIntentsResp = await stripe.paymentIntents.list({
      customer: customerId,
      limit: 20,
      expand: ['data.latest_charge'],
    });

    const receipts: ReceiptItem[] = [];
    for (const pi of paymentIntentsResp.data) {
      const latestCharge =
        typeof pi.latest_charge === 'object'
          ? (pi.latest_charge as Stripe.Charge)
          : undefined;
      receipts.push({
        id: pi.id as string,
        created: pi.created as number,
        amount: typeof pi.amount === 'number' ? pi.amount / 100 : 0,
        currency: (pi.currency ?? 'usd').toUpperCase(),
        status: pi.status ?? 'unknown',
        url: latestCharge?.receipt_url ?? undefined,
        description: pi.description ?? null,
      });
    }

    return { success: true, invoices, receipts };
  } catch (error) {
    console.error("Error fetching billing history:", error);
    return { success: false, invoices: [], receipts: [], error: "Failed to fetch billing history" };
  }
}
