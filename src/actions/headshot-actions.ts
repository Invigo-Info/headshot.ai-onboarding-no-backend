"use server";

import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

// Persistence for the onboarding-generated (Gemini) headshots so the user can
// see them later in the dashboard.
//
// IMPORTANT: every export here is BEST-EFFORT and fully self-contained. If
// Supabase isn't configured, the user isn't signed in, or anything throws, the
// functions return gracefully ({ success: false } / []) and NEVER throw — so
// the running onboarding flow (which works entirely client-side) is unaffected.
//
// Backend setup required to activate this (see supabase-setup/onboarding-headshots.sql):
//   1. A private storage bucket named `onboarding-headshots`.
//   2. A table `onboarding_headshots` (user_id, storage_path, plan, attire,
//      background, prompt_file, session_id, created_at).

const BUCKET = "onboarding-headshots";

function adminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  // Untyped on purpose so the not-yet-in-types `onboarding_headshots` table is
  // usable without editing database.types.ts.
  return createAdminClient(url, key);
}

function parseDataUrl(input: string): { mime: string; buffer: Buffer } | null {
  const m = /^data:(.+?);base64,([\s\S]*)$/.exec(input);
  if (m) return { mime: m[1], buffer: Buffer.from(m[2], "base64") };
  // Bare base64 — assume PNG.
  try {
    return { mime: "image/png", buffer: Buffer.from(input, "base64") };
  } catch {
    return null;
  }
}

export interface SaveHeadshotsPayload {
  sessionId?: string;
  plan?: string;
  attire?: string[];
  background?: string[];
  // Each image as a data URL (or bare base64), optionally with the prompt file.
  images: { data: string; promptFile?: string }[];
}

export interface SaveHeadshotsResult {
  success: boolean;
  count?: number;
  skipped?: boolean;
  error?: string;
}

/**
 * Upload the generated headshots to Supabase storage + record rows, scoped to
 * the signed-in user. Best-effort: returns { skipped: true } when there's no
 * user / no Supabase, and { success: false } on any failure — never throws.
 */
export async function saveGeneratedHeadshots(
  payload: SaveHeadshotsPayload,
): Promise<SaveHeadshotsResult> {
  try {
    const images = Array.isArray(payload.images) ? payload.images : [];
    if (images.length === 0) return { success: false, skipped: true };

    // Identify the user via the normal (cookie-bound) client.
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const userId = data?.claims?.sub as string | undefined;
    if (!userId) return { success: false, skipped: true };

    const admin = adminClient();
    if (!admin) return { success: false, skipped: true };

    const sessionId = (payload.sessionId || "session").replace(
      /[^a-zA-Z0-9_-]/g,
      "",
    );

    const rows: Record<string, unknown>[] = [];
    for (let i = 0; i < images.length; i++) {
      const parsed = parseDataUrl(images[i].data);
      if (!parsed) continue;
      const ext = (parsed.mime.split("/")[1] || "png").replace("jpeg", "jpg");
      const path = `${userId}/${sessionId}/headshot_${i + 1}.${ext}`;

      const { error: uploadError } = await admin.storage
        .from(BUCKET)
        .upload(path, parsed.buffer, {
          contentType: parsed.mime,
          upsert: true,
        });
      if (uploadError) {
        console.warn("[headshots] upload failed", uploadError.message);
        continue;
      }

      rows.push({
        user_id: userId,
        storage_path: path,
        plan: payload.plan ?? null,
        attire: payload.attire ?? null,
        background: payload.background ?? null,
        prompt_file: images[i].promptFile ?? null,
        session_id: payload.sessionId ?? null,
      });
    }

    if (rows.length === 0) return { success: false };

    const { error: insertError } = await admin
      .from("onboarding_headshots")
      .insert(rows);
    if (insertError) {
      console.warn("[headshots] insert failed", insertError.message);
      return { success: false, error: insertError.message };
    }

    return { success: true, count: rows.length };
  } catch (err) {
    console.warn(
      "[headshots] saveGeneratedHeadshots error (non-fatal):",
      err instanceof Error ? err.message : err,
    );
    return { success: false };
  }
}

export interface UserHeadshot {
  id: string;
  url: string;
  plan: string | null;
  attire: string[] | null;
  background: string[] | null;
  promptFile: string | null;
  createdAt: string;
}

/**
 * Fetch the signed-in user's saved headshots (signed URLs). Returns [] for
 * anonymous users, missing Supabase, or any error — never throws.
 */
export async function getUserHeadshots(): Promise<UserHeadshot[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const userId = data?.claims?.sub as string | undefined;
    if (!userId) return [];

    const admin = adminClient();
    if (!admin) return [];

    const { data: rows, error } = await admin
      .from("onboarding_headshots")
      .select("id, storage_path, plan, attire, background, prompt_file, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error || !rows) return [];

    const result: UserHeadshot[] = [];
    for (const row of rows as Record<string, unknown>[]) {
      const path = row.storage_path as string;
      const { data: signed } = await admin.storage
        .from(BUCKET)
        .createSignedUrl(path, 60 * 60);
      if (!signed?.signedUrl) continue;
      result.push({
        id: String(row.id),
        url: signed.signedUrl,
        plan: (row.plan as string) ?? null,
        attire: (row.attire as string[]) ?? null,
        background: (row.background as string[]) ?? null,
        promptFile: (row.prompt_file as string) ?? null,
        createdAt: String(row.created_at),
      });
    }
    return result;
  } catch (err) {
    console.warn(
      "[headshots] getUserHeadshots error (non-fatal):",
      err instanceof Error ? err.message : err,
    );
    return [];
  }
}
