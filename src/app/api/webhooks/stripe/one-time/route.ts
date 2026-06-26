/* eslint-disable @typescript-eslint/no-explicit-any */
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { addYears, toDateStr } from "@/lib/utils";
import { EDITOR_CREDITS_FOR_PAID_USERS } from "@/lib/constants";
import { Resend } from "resend";
import HeadshotPurchaseConfirmation from "@/components/email-templates/after-purchase-order";
import { siteMetaData } from "@/siteMetaData";

export const maxDuration = 120; // 2 minutes

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const resend =
  process.env.RESEND_API_KEY && new Resend(process.env.RESEND_API_KEY);

type EditorCredits = {
  v: number;
  paid_editor_credit_balance: number;
  paid_editor_credit_expires_on: string | null;
  free_editor_credit_usage_date: string | null;
  free_editor_credit_used_count: number;
};

function normalizeCredits(raw: any): EditorCredits {
  return {
    v: Number(raw?.v) || 1,
    paid_editor_credit_balance: Number(raw?.paid_editor_credit_balance) || 0,
    paid_editor_credit_expires_on:
      typeof raw?.paid_editor_credit_expires_on === "string"
        ? raw.paid_editor_credit_expires_on
        : null,
    free_editor_credit_usage_date:
      typeof raw?.free_editor_credit_usage_date === "string"
        ? raw.free_editor_credit_usage_date
        : null,
    free_editor_credit_used_count:
      Number(raw?.free_editor_credit_used_count) || 0,
  };
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === "payment" && session.payment_status === "paid") {
          await handleCompletedPayment(session);
        } else if (session.mode === "subscription") {
          // This should be handled by the subscription webhook
          console.log(
            "Subscription checkout completed, should be handled by subscription webhook"
          );
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", paymentIntent.id);
        // Handle failed payment if needed
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function sendPurchaseConfirmationEmail(
  userId: string,
  packId: string
): Promise<void> {
  if (!resend) {
    throw new Error(
      "RESEND_API_KEY missing; cannot send purchase confirmation email."
    );
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch recipient from profiles
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("id", userId)
    .single<{ email: string | null; full_name: string | null }>();

  if (profileError || !profile?.email) {
    throw new Error(
      `Profile email not found for user ${userId}: ${profileError?.message}`
    );
  }

  // Fetch pack slug
  const { data: pack, error: packError } = await supabase
    .from("packs")
    .select("slug")
    .eq("id", packId)
    .single<{ slug: string }>();

  let link = `${siteMetaData.baseUrl}/generate/one-time/${pack?.slug}?step=pricing`;

  if (packError || !pack?.slug) {
    // throw new Error(
    //   `Pack slug not found for pack ${packId}: ${packError?.message}`
    // );
    console.error(
      `Pack slug not found for pack ${packId}: ${packError?.message}`
    );
    link = `${siteMetaData.baseUrl}/dashboard`;
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Headshots AI <no-reply@headshot.ai>";

  const subject =
    "Your Headshot.ai order is confirmed - Let's create amazing headshots";

  await resend.emails.send({
    from: fromEmail,
    to: profile.email,
    subject,
    react: HeadshotPurchaseConfirmation({
      full_name: profile.full_name || "there",
      link,
    }),
  });
}

async function handleCompletedPayment(session: Stripe.Checkout.Session) {
  const supabase = await createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const userId = session.metadata?.user_id;
    let packId = session.metadata?.pack_id;
    let priceId = session.metadata?.price_id;
    const slug = session.metadata?.slug;
    const plan = session.metadata?.plan;
    const checkoutSessionId = session.id;

    if (!userId || !checkoutSessionId) {
      throw new Error("Missing required metadata in webhook (user_id/session id)");
    }

    // The checkout creator (payment-actions.ts) sends pack_id/price_id as "" when
    // the packs/prices table lookup returned null OR was ambiguous (e.g. duplicate
    // rows breaking .single()). Recover by looking them up from slug/plan, which
    // are always set. `.limit(1)` instead of `.single()` so duplicates don't crash.
    if (!packId && slug) {
      const { data: packRow } = await supabase
        .from("packs")
        .select("id")
        .eq("slug", slug)
        .limit(1)
        .maybeSingle();
      if (packRow?.id) packId = packRow.id;
    }
    if (!priceId && plan) {
      const { data: priceRow } = await supabase
        .from("prices")
        .select("id")
        .eq("plan_name", plan)
        .eq("interval", "one_time")
        .limit(1)
        .maybeSingle();
      if (priceRow?.id) priceId = priceRow.id;
    }

    if (!packId || !priceId) {
      throw new Error(
        `Missing pack_id/price_id after recovery (slug=${slug}, plan=${plan}). Seed packs/prices tables.`
      );
    }

    // Check if this checkout session has already been processed (idempotency check)
    const { data: existingOrder } = await supabase
      .from("orders")
      .select("id, editor_credits_granted")
      .eq("stripe_checkout_session_id", checkoutSessionId)
      .single();

    if (existingOrder) {
      console.log(
        `Order already exists for checkout session ${checkoutSessionId}, skipping duplicate processing`
      );

      // If credits weren't granted for some reason, grant them now
      if (!existingOrder.editor_credits_granted) {
        console.log(`Granting missing editor credits for order ${existingOrder.id}`);
        await grantEditorCredits(userId, existingOrder.id);

        // Update the order to mark credits as granted
        await supabase
          .from("orders")
          .update({ editor_credits_granted: true })
          .eq("id", existingOrder.id);
      }

      return; // Exit early to prevent duplicate processing
    }

    // Create order record with stripe_checkout_session_id for idempotency
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        pack_id: packId,
        price_id: priceId,
        status: "paid",
        qty: 1,
        used: false,
        purchased_at: new Date().toISOString(),
        editor_credits_granted: true,
        stripe_checkout_session_id: checkoutSessionId,
      })
      .select()
      .single();

    if (orderError || !order) {
      throw new Error(`Failed to create order record: ${orderError?.message}`);
    }

    // grant editor credits
    await grantEditorCredits(userId, order.id);

    // send purchase confirmation email
    try {
      await sendPurchaseConfirmationEmail(userId, packId);
    } catch (emailErr) {
      console.error("Failed to send purchase confirmation email:", emailErr);
      // Don't throw here - we don't want to fail the webhook due to email issues
    }

    console.log(`Successfully created order ${order.id} for user ${userId}`);
  } catch (error) {
    console.error("Error handling completed payment:", error);
    throw error;
  }
}

async function grantEditorCredits(userId: string, orderId: string) {
  const supabase = await createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Concurrency-safe profile update with optimistic locking
  for (let attempt = 0; attempt < 4; attempt++) {
    const { data: profile, error: pErr } = await supabase
      .from("profiles")
      .select("id, editor_credits, updated_at")
      .eq("id", userId)
      .single();

    if (pErr || !profile) throw pErr ?? new Error("Profile not found");

    const now = new Date();
    const todayStr = toDateStr(now);
    const newExpiryStr = toDateStr(addYears(now, 1)); // 1 year expiry

    const ec = normalizeCredits(profile.editor_credits);

    // If existing paid credits expired, reset
    if (
      ec.paid_editor_credit_balance > 0 &&
      ec.paid_editor_credit_expires_on &&
      new Date(ec.paid_editor_credit_expires_on) <= new Date(todayStr)
    ) {
      ec.paid_editor_credit_balance = 0;
      ec.paid_editor_credit_expires_on = null;
    }

    // Grant
    ec.paid_editor_credit_balance += EDITOR_CREDITS_FOR_PAID_USERS; // 50 credits grant for paid users

    // Set expiry to the later of existing expiry or now + 1y
    if (!ec.paid_editor_credit_expires_on) {
      ec.paid_editor_credit_expires_on = newExpiryStr;
    } else {
      const currentExp = new Date(ec.paid_editor_credit_expires_on);
      const candidate = new Date(newExpiryStr);
      ec.paid_editor_credit_expires_on =
        currentExp > candidate ? toDateStr(currentExp) : newExpiryStr;
    }
    const { error: updErr, data: upd } = await supabase
      .from("profiles")
      .update({
        editor_credits: ec,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .eq("updated_at", profile.updated_at)
      .select("id");

    if (!updErr && upd?.length) {
      // Log the grant event
      const { error: insErr } = await supabase
        .from("editor_credit_events")
        .insert({
          user_id: userId,
          event_type: "grant",
          bucket: "paid",
          amount: EDITOR_CREDITS_FOR_PAID_USERS,
          origin_type: "order",
          origin_id: orderId,
          state_after: ec as any,
          created_at: new Date().toISOString(),
        });

      if (insErr) throw insErr;
      return;
    }

    // retry on race
    await new Promise((r) => setTimeout(r, 60 * (attempt + 1)));
  }

  throw new Error("Failed to grant credits due to concurrent updates");
}
