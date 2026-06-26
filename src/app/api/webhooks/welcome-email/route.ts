import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeEmail from "@/components/email-templates/welcome-email";
import { createClient } from "@supabase/supabase-js";

const INTERNAL_SECRET = process.env.INTERNAL_WEBHOOK_SECRET;

const resend =
  process.env.RESEND_API_KEY && new Resend(process.env.RESEND_API_KEY);

interface UserCreatedPayload {
  type: "INSERT";
  table: string;
  schema: string;
  record: {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
    aud: string;
    role: string;
  };
  old_record: null;
}

async function sendWelcomeEmail(
  userId: string,
  userEmail: string
): Promise<void> {
  if (!resend) {
    throw new Error("RESEND_API_KEY missing; cannot send welcome email.");
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get user profile to get full name
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", userId)
    .single<{ full_name: string | null }>();

  if (profileError && profileError.code !== "PGRST116") {
    // PGRST116 is "not found"
    console.error("Error fetching profile for welcome email:", profileError);
  }

  const fullName = profile?.full_name || userEmail.split("@")[0]; // fallback to email prefix

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Headshots AI <no-reply@headshot.ai>";

  await resend.emails.send({
    from: fromEmail,
    to: userEmail,
    subject:
      "Welcome to Headshot.ai - Your new professional headshot is just minutes away",
    react: WelcomeEmail({ full_name: fullName }),
  });
}

export async function POST(request: NextRequest) {
  try {
    // Simple shared-secret auth
    const authHeader = request.headers.get("x-webhook-token") || "";
    if (!INTERNAL_SECRET || authHeader !== INTERNAL_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // return NextResponse.json({ ok: true }, { status: 200 });

    const payload = (await request.json()) as UserCreatedPayload;

    // Only handle INSERT events on auth.users table
    if (
      payload.type !== "INSERT" ||
      payload.table !== "users" ||
      payload.schema !== "auth"
    ) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const { id: userId, email: userEmail } = payload.record;

    if (!userId || !userEmail) {
      console.error("Invalid user data in webhook payload:", payload);
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }

    // Send welcome email asynchronously
    try {
      await sendWelcomeEmail(userId, userEmail);
    } catch (emailErr) {
      console.error("Failed to send welcome email:", emailErr);
      // Don't return error - webhook should succeed even if email fails
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("welcome email webhook error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
