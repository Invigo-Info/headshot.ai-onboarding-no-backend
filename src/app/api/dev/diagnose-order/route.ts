import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

// Local-only diagnostic. Visit
// http://localhost:3000/api/dev/diagnose-order?slug=actor-headshots&plan=starter
// Returns 404 in production builds.
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  const plan = url.searchParams.get("plan");
  const trySimulateInsert = url.searchParams.get("trySimulateInsert") === "1";

  const supabase = await createClient();
  const admin = createAdminClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: claimsData } = await supabase.auth.getClaims();
  const claims = claimsData?.claims ?? null;
  const userId = claims?.sub ?? null;

  // Look up the most recent Stripe checkout sessions to inspect what
  // metadata actually got attached. This is the ground truth for what
  // the webhook handler sees.
  let recentStripeSessions: unknown = null;
  let stripeError: string | null = null;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-08-27.basil",
    });
    const sessions = await stripe.checkout.sessions.list({ limit: 5 });
    recentStripeSessions = sessions.data.map((s) => ({
      id: s.id,
      created: new Date(s.created * 1000).toISOString(),
      mode: s.mode,
      payment_status: s.payment_status,
      status: s.status,
      amount_total: s.amount_total,
      customer_email: s.customer_details?.email ?? null,
      metadata: s.metadata,
    }));
  } catch (e) {
    stripeError = e instanceof Error ? e.message : String(e);
  }

  const [
    { data: ordersForUser },
    { data: ordersAny },
    { data: packForSlug },
    { data: priceForPlan },
    { data: profileRow },
  ] = await Promise.all([
    userId
      ? admin
          .from("orders")
          .select("id, user_id, status, used, purchased_at, pack_id, price_id, stripe_checkout_session_id")
          .eq("user_id", userId)
          .order("purchased_at", { ascending: false })
          .limit(5)
      : Promise.resolve({ data: null }),
    admin
      .from("orders")
      .select("id, user_id, status, used, purchased_at, stripe_checkout_session_id")
      .order("purchased_at", { ascending: false })
      .limit(5),
    slug
      ? admin.from("packs").select("id, slug, title").eq("slug", slug).maybeSingle()
      : Promise.resolve({ data: null }),
    plan
      ? admin
          .from("prices")
          .select("id, plan_name, interval, headshot_count")
          .eq("plan_name", plan)
          .eq("interval", "one_time")
          .maybeSingle()
      : Promise.resolve({ data: null }),
    userId
      ? admin.from("profiles").select("id, email").eq("id", userId).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  let simulateInsertResult: unknown = null;
  if (trySimulateInsert && userId && packForSlug?.id && priceForPlan?.id) {
    const testSessionId = `cs_dev_diagnose_${Date.now()}`;
    const { data: inserted, error: insertErr } = await admin
      .from("orders")
      .insert({
        user_id: userId,
        pack_id: packForSlug.id,
        price_id: priceForPlan.id,
        status: "paid",
        qty: 1,
        used: false,
        purchased_at: new Date().toISOString(),
        editor_credits_granted: true,
        stripe_checkout_session_id: testSessionId,
      })
      .select()
      .single();

    if (insertErr) {
      simulateInsertResult = {
        ok: false,
        error: insertErr.message,
        code: insertErr.code,
        details: insertErr.details,
        hint: insertErr.hint,
      };
    } else {
      await admin.from("orders").delete().eq("id", inserted.id);
      simulateInsertResult = { ok: true, deletedTestRowId: inserted.id };
    }
  }

  return NextResponse.json(
    {
      authenticated: Boolean(userId),
      userId,
      userEmail: claims?.email ?? null,
      profileRow: profileRow ?? null,
      checkedSlug: slug,
      checkedPlan: plan,
      packExistsForSlug: Boolean(packForSlug),
      packRow: packForSlug ?? null,
      priceExistsForPlan: Boolean(priceForPlan),
      priceRow: priceForPlan ?? null,
      simulateInsertResult,
      recentStripeSessions,
      stripeError,
      ordersForUser: ordersForUser ?? [],
      ordersAnyRecent: ordersAny ?? [],
    },
    { status: 200 },
  );
}
