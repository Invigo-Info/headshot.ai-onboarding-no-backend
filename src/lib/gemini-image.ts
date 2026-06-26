// Gemini image generation (server-only).
//
// Uses the Google Generative Language REST API directly with GEMINI_API_KEY.
// The model (default gemini-2.5-flash-image, aka "nano banana") accepts a text
// instruction plus one or more reference images and returns a generated image.

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models";

export interface ReferenceImage {
  /** Raw bytes (Buffer/Uint8Array) or an already-base64-encoded string. */
  data: Buffer | Uint8Array | string;
  mimeType: string;
}

export interface GeneratedImage {
  data: Buffer;
  mimeType: string;
}

function toBase64(data: Buffer | Uint8Array | string): string {
  if (typeof data === "string") return data;
  return Buffer.from(data).toString("base64");
}

interface GeminiInlineData {
  data?: string;
  mimeType?: string;
  mime_type?: string;
}
interface GeminiPart {
  text?: string;
  inlineData?: GeminiInlineData;
  inline_data?: GeminiInlineData;
}

/**
 * Generate a single image from reference photo(s) + a text prompt.
 * Throws on API errors or if the model returns no image.
 */
export async function generateImageWithGemini(
  references: ReferenceImage[],
  promptText: string,
  opts: {
    model?: string;
    signal?: AbortSignal;
    /**
     * Response modalities. Defaults to IMAGE-only. Passing ["TEXT","IMAGE"]
     * tends to coax an image out when IMAGE-only intermittently returns none,
     * and surfaces any refusal text for diagnostics.
     */
    modalities?: ("TEXT" | "IMAGE")[];
    /**
     * Output aspect ratio (e.g. "1:1"). When set, the model composes for that
     * frame so we don't have to crop afterwards — which is what was clipping
     * the top of subjects' heads. Defaults to "1:1" (square headshots).
     */
    aspectRatio?: string;
  } = {},
): Promise<GeneratedImage> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  const model =
    opts.model || process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";

  const parts: GeminiPart[] = [{ text: promptText }];
  for (const ref of references) {
    parts.push({
      inline_data: { mime_type: ref.mimeType, data: toBase64(ref.data) },
    });
  }

  const res = await fetch(
    `${GEMINI_ENDPOINT}/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig: {
          responseModalities: opts.modalities ?? ["IMAGE"],
          // Ask the model to compose for a square frame so the head is fully
          // contained with headroom and we avoid a post-crop that clips it.
          imageConfig: { aspectRatio: opts.aspectRatio ?? "1:1" },
        },
        // Loosen safety thresholds — headshot generation is benign, and the
        // defaults can intermittently suppress an image (IMAGE_OTHER).
        safetySettings: [
          "HARM_CATEGORY_HARASSMENT",
          "HARM_CATEGORY_HATE_SPEECH",
          "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "HARM_CATEGORY_DANGEROUS_CONTENT",
        ].map((category) => ({ category, threshold: "BLOCK_NONE" })),
      }),
      signal: opts.signal,
    },
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(
      `Gemini generateContent failed (${res.status}): ${errText.slice(0, 500)}`,
    );
  }

  const json = (await res.json()) as {
    candidates?: {
      content?: { parts?: GeminiPart[] };
      finishReason?: string;
      safetyRatings?: unknown;
    }[];
    promptFeedback?: unknown;
  };

  const candidate = json.candidates?.[0];
  const candidateParts = candidate?.content?.parts ?? [];
  let refusalText = "";
  for (const part of candidateParts) {
    const inline = part.inlineData || part.inline_data;
    if (inline?.data) {
      return {
        data: Buffer.from(inline.data, "base64"),
        mimeType: inline.mimeType || inline.mime_type || "image/png",
      };
    }
    if (part.text) refusalText = part.text;
  }

  // Surface everything Gemini told us about why it declined, so failures are
  // diagnosable (blockReason / safetyRatings often reveal the real cause).
  const diag = JSON.stringify({
    finishReason: candidate?.finishReason,
    promptFeedback: json.promptFeedback,
    safetyRatings: candidate?.safetyRatings,
  });
  throw new Error(
    `Gemini returned no image (finishReason=${candidate?.finishReason ?? "unknown"})` +
      (refusalText ? `: ${refusalText.slice(0, 160)}` : "") +
      ` ${diag.slice(0, 400)}`,
  );
}

/** Generate with a small retry budget for transient failures. */
export async function generateImageWithGeminiRetry(
  references: ReferenceImage[],
  promptText: string,
  opts: { model?: string; maxRetries?: number } = {},
): Promise<GeneratedImage> {
  const maxRetries = opts.maxRetries ?? 2;
  let lastErr: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // First attempt uses fast IMAGE-only; retries add TEXT so the model is
      // more likely to emit an image and we capture any refusal reason.
      return await generateImageWithGemini(references, promptText, {
        model: opts.model,
        modalities: attempt === 0 ? ["IMAGE"] : ["TEXT", "IMAGE"],
      });
    } catch (err) {
      lastErr = err;
      if (attempt < maxRetries) {
        const delay = 1000 * Math.pow(2, attempt) + Math.random() * 400;
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  throw lastErr instanceof Error
    ? lastErr
    : new Error("Gemini generation failed");
}
