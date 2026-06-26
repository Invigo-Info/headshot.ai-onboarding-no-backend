import fs from "fs/promises";
import path from "path";

// Headshot prompt JSON files live under public/assets/prompts/<gender>/.
// Each file is a structured prompt object (subject, attire, pose, lighting…).
// We read them at request time on the server and turn them into a single
// natural-language instruction for Gemini image generation.

export type GenderFolder = "male" | "female";

export interface HeadshotPrompt {
  /** Source filename, e.g. professional_female_business-casual_office_001.json */
  file: string;
  /** Parsed JSON prompt object. */
  data: Record<string, unknown>;
}

const PROMPTS_DIR = path.join(process.cwd(), "public", "assets", "prompts");

/** Map the onboarding gender value ("man"/"woman"/"other") to a prompt folder. */
export function resolveGenderFolder(gender: string | null | undefined): GenderFolder {
  const g = (gender || "").toLowerCase();
  if (g === "woman" || g === "female" || g === "f") return "female";
  return "male";
}

/**
 * Read the JSON prompts for a gender, optionally filtered to the user's chosen
 * attire and background. Filenames are
 * `professional_<gender>_<attire>_<background>_NNN.json`, so we parse the
 * attire (index 2) and background (index 3) tokens to match the selections.
 *
 * - Empty/omitted `attire`/`background` means "no filter on that dimension".
 * - `limit` caps the count for cheaper test runs.
 */
export async function selectPrompts(
  gender: string,
  opts: { attire?: string[]; background?: string[]; limit?: number } = {},
): Promise<HeadshotPrompt[]> {
  const folder = resolveGenderFolder(gender);
  const dir = path.join(PROMPTS_DIR, folder);

  let files: string[];
  try {
    files = (await fs.readdir(dir)).filter((f) => f.endsWith(".json")).sort();
  } catch (err) {
    console.error(`Failed to list prompts in ${dir}`, err);
    return [];
  }

  const attireSet =
    opts.attire && opts.attire.length > 0 ? new Set(opts.attire) : null;
  const backgroundSet =
    opts.background && opts.background.length > 0
      ? new Set(opts.background)
      : null;

  if (attireSet || backgroundSet) {
    files = files.filter((file) => {
      const parts = file.replace(/\.json$/, "").split("_");
      const attire = parts[2];
      const background = parts[3];
      if (attireSet && !attireSet.has(attire)) return false;
      if (backgroundSet && !backgroundSet.has(background)) return false;
      return true;
    });
  }

  const chosen =
    typeof opts.limit === "number" ? files.slice(0, opts.limit) : files;

  const prompts: HeadshotPrompt[] = [];
  for (const file of chosen) {
    try {
      const raw = await fs.readFile(path.join(dir, file), "utf8");
      // Some prompt files are saved UTF-8 with a BOM, which breaks JSON.parse.
      const clean = raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw;
      prompts.push({ file, data: JSON.parse(clean) as Record<string, unknown> });
    } catch (err) {
      console.error(`Failed to read/parse prompt ${file}`, err);
    }
  }
  return prompts;
}

function labelize(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Convert a structured JSON prompt into a single instruction string for the
 * Gemini image model, given one or more reference photos of the subject.
 */
export function promptToText(
  data: Record<string, unknown>,
  opts: { soften?: boolean } = {},
): string {
  // The strict identity-locking header gives the best likeness but can
  // intermittently make the model decline (finishReason IMAGE_OTHER) for some
  // reference photos. `soften` swaps in gentler wording used as a retry tier so
  // a preview is still produced when the strict prompt is refused.
  const header = opts.soften
    ? [
        "Create ONE photorealistic professional headshot portrait of the person in the reference photo(s).",
        "Keep their general likeness — face, skin tone, hair, and overall look.",
      ]
    : [
        "Generate ONE photorealistic professional headshot of the exact person shown in the reference photo(s).",
        "Preserve their identity precisely: same face shape, skin tone, eye shape and color, nose, lips, jawline, hair, and any distinguishing features. Do not beautify or alter their identity.",
      ];
  const lines: string[] = [...header];

  const stringFields = [
    "subject",
    "attire",
    "grooming",
    "pose",
    "expression",
    "location",
    "lighting",
    "style",
    "color_grade",
    "composition",
    "mood",
    "quality",
    "aspect_ratio",
  ];

  for (const key of stringFields) {
    const value = data[key];
    if (!value) continue;
    if (typeof value === "string") {
      lines.push(`${labelize(key)}: ${value}`);
    } else if (Array.isArray(value)) {
      lines.push(`${labelize(key)}: ${value.join(", ")}`);
    }
  }

  const camera = data["camera"];
  if (camera && typeof camera === "object") {
    const c = camera as Record<string, unknown>;
    const cameraStr = [c.body, c.lens, c.aperture]
      .filter((v) => typeof v === "string")
      .join(", ");
    if (cameraStr) lines.push(`Camera: ${cameraStr}`);
  }

  // Framing guardrails — the #1 visible defect was the top of the head being
  // cut off. Force a head-and-shoulders crop with clear headroom and the whole
  // head inside the frame, centred, on a square 1:1 canvas.
  lines.push(
    "Framing: square 1:1 head-and-shoulders portrait. Show the ENTIRE head — the full hair and the top of the head must be visible with comfortable empty headroom (margin) above the hair. Do NOT crop or cut off the top of the head, the forehead, or the hair. Center the face in the upper-middle of the frame and include the shoulders and upper chest. Keep the whole head well within the borders.",
  );

  lines.push(
    "Output only the final photograph. No text, captions, watermark, logo, or border.",
  );

  return lines.join("\n");
}
