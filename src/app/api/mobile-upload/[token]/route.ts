import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Cross-device "upload from your phone" relay.
//
// The desktop wizard generates a random token, shows it as a QR pointing at
// /m/<token>, and polls GET here for new files. The phone POSTs photos which
// are stored in the private `mobile-uploads` bucket under <token>/<file>.
// Once the desktop has ingested a file it DELETEs it. The token is the only
// secret — keep it unguessable (UUID) and short-lived.

export const dynamic = "force-dynamic";

const BUCKET = "mobile-uploads";
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ALLOWED_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const admin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Token must look like a UUID-ish capability string — no slashes/traversal.
function isValidToken(token: string): boolean {
  return /^[a-zA-Z0-9-]{8,64}$/.test(token);
}

async function ensureBucket(): Promise<void> {
  // Idempotent: createBucket errors if it already exists, which we ignore.
  await admin.storage.createBucket(BUCKET, {
    public: false,
    fileSizeLimit: MAX_FILE_BYTES,
    allowedMimeTypes: ALLOWED_TYPES,
  });
}

// Phone uploads a single image.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  let file: File | null = null;
  try {
    const form = await request.formData();
    const value = form.get("image");
    if (value instanceof File) file = value;
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 413 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type" },
      { status: 415 },
    );
  }

  const ext = ALLOWED_EXT[file.type] || "jpg";
  const rand = Math.random().toString(36).slice(2, 10);
  const objectPath = `${token}/${Date.now()}-${rand}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const upload = () =>
    admin.storage.from(BUCKET).upload(objectPath, buffer, {
      contentType: file!.type,
      upsert: false,
    });

  let { error } = await upload();
  if (error && /bucket not found/i.test(error.message)) {
    await ensureBucket();
    ({ error } = await upload());
  }

  if (error) {
    console.error("mobile-upload POST failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true, path: objectPath });
}

// Desktop polls for files uploaded from the phone.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const { data, error } = await admin.storage.from(BUCKET).list(token, {
    limit: 50,
    sortBy: { column: "created_at", order: "asc" },
  });

  if (error) {
    // Bucket/prefix not created yet → simply no files.
    return NextResponse.json({ files: [] });
  }

  const objects = (data || []).filter((o) => o.id !== null); // skip folder placeholders

  const files = [] as {
    name: string;
    path: string;
    signedUrl: string;
    createdAt: string | null;
  }[];

  for (const obj of objects) {
    const path = `${token}/${obj.name}`;
    const { data: signed } = await admin.storage
      .from(BUCKET)
      .createSignedUrl(path, 60 * 10); // 10 minutes
    if (signed?.signedUrl) {
      files.push({
        name: obj.name,
        path,
        signedUrl: signed.signedUrl,
        createdAt: obj.created_at ?? null,
      });
    }
  }

  return NextResponse.json({ files });
}

// Desktop removes a file after it has been ingested.
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const path = new URL(request.url).searchParams.get("path");
  // Only allow deleting within this token's own folder.
  if (!path || !path.startsWith(`${token}/`)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const { error } = await admin.storage.from(BUCKET).remove([path]);
  if (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
