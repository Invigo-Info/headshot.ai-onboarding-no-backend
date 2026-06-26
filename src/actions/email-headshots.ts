"use server";

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import HeadshotDeliveryEmail from "@/components/email-templates/headshots-ready";

// Email the generated headshots (as attachments) to the SIGNED-IN user's email.
//
// Best-effort + self-contained: returns { skipped: true } when there's no user
// email or Resend isn't configured, and { success: false } on any error — it
// NEVER throws, so the existing payment-success flow is unaffected.

export interface EmailHeadshotsPayload {
  images: string[]; // data URLs (or bare base64) of the generated headshots
  plan?: string;
  name?: string; // the given name the user entered in the flow
}

// Filesystem-safe slug of the user's name for attachment filenames.
function slugifyName(raw: string | undefined | null): string {
  const cleaned = (raw ?? "")
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "headshot-ai";
}

export interface EmailHeadshotsResult {
  success: boolean;
  skipped?: boolean;
  to?: string;
  error?: string;
  // Machine-readable reason so the UI can show an accurate message instead of a
  // generic "try again" for situations the user can't actually retry away.
  reason?: "not-configured" | "no-recipient" | "no-images" | "send-failed";
}

function toBase64(input: string): string {
  const m = /^data:.+?;base64,([\s\S]*)$/.exec(input);
  return m ? m[1] : input;
}

// Resend requires `email@x.com` or `Name <email@x.com>`. Defensively repair the
// most common .env typos: surrounding quotes and a missing closing ">".
function normalizeFrom(raw: string): string {
  let v = raw.trim().replace(/^["']|["']$/g, "");
  if (v.includes("<") && !v.includes(">")) v = `${v}>`;
  return v;
}

export async function emailGeneratedHeadshots(
  payload: EmailHeadshotsPayload,
): Promise<EmailHeadshotsResult> {
  try {
    const images = Array.isArray(payload.images) ? payload.images : [];
    if (images.length === 0)
      return { success: false, skipped: true, reason: "no-images" };

    // Check the email provider FIRST. If Resend isn't configured we can never
    // send, so report that precisely (and don't let an unrelated Supabase
    // hiccup below masquerade as a "send failed" the user can't fix).
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey)
      return { success: false, skipped: true, reason: "not-configured" };
    const resend = new Resend(apiKey);

    // Recipient = the signed-in user's email (the one they logged in with).
    // Isolate this so an auth/network error here is treated as "no recipient"
    // (a skip), not a hard send failure.
    let claims:
      | {
          email?: string;
          name?: string;
          user_metadata?: { full_name?: string; name?: string };
        }
      | undefined;
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getClaims();
      claims = data?.claims as typeof claims;
    } catch (authErr) {
      console.warn(
        "[email-headshots] could not resolve signed-in user:",
        authErr instanceof Error ? authErr.message : authErr,
      );
    }
    const to = claims?.email;
    if (!to)
      return { success: false, skipped: true, reason: "no-recipient" };

    const fromEmail = normalizeFrom(
      process.env.RESEND_FROM_EMAIL || "Headshots AI <onboarding@resend.dev>",
    );

    // Prefer the name the user typed in the flow; fall back to the account name.
    const fullName =
      payload.name?.trim() ||
      claims?.user_metadata?.full_name ||
      claims?.user_metadata?.name ||
      claims?.name;
    const firstName = (fullName || to.split("@")[0] || "there").split(" ")[0];
    const nameSlug = slugifyName(fullName);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const galleryUrl = siteUrl
      ? `${siteUrl}/my-headshots`
      : "https://headshot.ai/albums";

    // Cap attachments so the message stays within provider limits.
    const attachments = images.slice(0, 25).map((img, i) => ({
      filename: `${nameSlug}_headshot_${i + 1}.png`,
      content: Buffer.from(toBase64(img), "base64"),
    }));

    const { error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: "Your professional headshots are ready 🎉",
      react: HeadshotDeliveryEmail({ firstName, galleryUrl }),
      attachments,
    });

    if (error) {
      console.warn("[email-headshots] send failed:", error);
      return { success: false, error: String(error), reason: "send-failed" };
    }
    return { success: true, to };
  } catch (err) {
    console.warn(
      "[email-headshots] error (non-fatal):",
      err instanceof Error ? err.message : err,
    );
    return { success: false, reason: "send-failed" };
  }
}
