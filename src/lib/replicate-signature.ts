// utils/replicate-signature.ts
import crypto from "crypto";

const REPLICATE_WEBHOOK_SECRET = process.env.REPLICATE_WEBHOOK_SECRET || "";

// Example header format (Replicate):
// webhook-id: <uuid>
// webhook-timestamp: <unix_seconds>
// webhook-signature: t=<ts>,v1=<sig>[,v1=<sig>...]

function parseSignatureHeader(header: string): string[] {
  if (!header) return [];
  // Split by comma or whitespace, then collect v1 or sha256 tokens
  const tokens = header.split(/[, ]+/).map((p) => p.trim());
  const signatures: string[] = [];
  for (const token of tokens) {
    const [k, v] = token.split("=");
    if (!k || !v) continue;
    const key = k.trim().toLowerCase();
    const val = v.trim();
    if (key === "v1" || key === "sha256") {
      signatures.push(val);
    }
  }
  return signatures;
}

export function verifyReplicateSignature(
  id: string,
  timestamp: string,
  signatureHeader: string,
  rawBody: string
): boolean {
  if (!REPLICATE_WEBHOOK_SECRET) return false;

  // Allow both "secret_<base64>" or just "<base64>"
  const secretPart = REPLICATE_WEBHOOK_SECRET.includes("_")
    ? REPLICATE_WEBHOOK_SECRET.split("_")[1]
    : REPLICATE_WEBHOOK_SECRET;

  const secretBytes = Buffer.from(secretPart, "base64");
  const signedContent = `${id}.${timestamp}.${rawBody}`;

  const computed = crypto
    .createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest("base64");

  const expected = parseSignatureHeader(signatureHeader);

  // Optional: drift check (5 minutes)
  const ts = Number(timestamp);
  if (Number.isFinite(ts)) {
    const driftSec = Math.abs(Date.now() / 1000 - ts);
    if (driftSec > 300) {
      return false;
    }
  }

  return expected.includes(computed);
}