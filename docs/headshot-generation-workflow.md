# Generating AI Headshots — Detailed Workflow

This document explains **how AI headshots are generated** in the onboarding flow,
end to end: where generation is triggered, how the request is built, the full
server pipeline (prompt selection → concurrent generation → square output), the
async/concurrency model, caching, and what happens to the images afterward.

- **Generation API:** [`src/app/api/generate/preview/route.ts`](../src/app/api/generate/preview/route.ts)
- **Gemini client:** [`src/lib/gemini-image.ts`](../src/lib/gemini-image.ts)
- **Prompt loader/builder:** [`src/lib/headshot-prompts.ts`](../src/lib/headshot-prompts.ts)
- **Triggered from:** [`preview-step.tsx`](../src/components/generate/preview-step.tsx) and [`unlock-step.tsx`](../src/components/generate/unlock-step.tsx)

> Companion docs: [onboarding-workflow.md](./onboarding-workflow.md) (the full wizard)
> and [generated-headshot-prompts.md](./generated-headshot-prompts.md) (the prompt files).

---

## 1. Where generation fits in the onboarding flow

```
gender → attire → background → upload → preview → unlock → checkout → payment-success
                                          │           │
                                          └── generation happens here ──┘
                                   (client POSTs to /api/generate/preview,
                                    one headshot per attire×background combo)
```

The user's **selfies live in IndexedDB**, their **selections** (gender, attire[],
background[]) live in the Zustand store. The preview/unlock steps send these to the
generation API and cache the resulting headshots back into IndexedDB.

---

## 2. Is it async or sync? — Async + concurrent

Generation is **fully asynchronous** (Promise-based, non-blocking I/O) and runs a
**worker pool with a concurrency cap of 3**, so multiple headshots generate in
parallel.

```ts
const CONCURRENCY = 3;
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
```

| Level | Behavior |
|-------|----------|
| Across combos (the N images) | **Parallel** — up to 3 at a time via the worker pool |
| Per-combo prompt fallback (`_001 → _002 → _003`) | **Sequential** (next prompt only if previous fails) |
| Per-attempt tier escalation (IMAGE → TEXT+IMAGE → softened) | **Sequential** (escalate only on failure) |
| Each Gemini HTTP call | `await`ed — the worker yields while waiting |

**Timing example (2 attires × 3 backgrounds = 6 images):** ~19s with the pool of 3
(≈2 rounds × ~9.5s). Synchronously it would be ~57s. Raising `CONCURRENCY` is the
speed lever, at the cost of more Gemini rate-limit (429) risk.

---

## 3. Client-side preparation (before the request)

In the preview/unlock step effects:

1. Build a **`selectionKey`** = `JSON.stringify({ gender, attire, background, n uploads })`.
   If `formData.generatedPreviews` already match this key, **reuse the cached
   images** from IndexedDB and skip generation entirely.
2. Otherwise, for each uploaded selfie:
   - Load the `File` from IndexedDB.
   - **Downscale** it to a data URL via `fileToReferenceDataUrl` (max 768px,
     JPEG q0.85) to keep the request body small.
3. POST to `/api/generate/preview`:
   ```jsonc
   {
     "gender": "woman",
     "attire": ["business-casual", "business-professional"],
     "background": ["office", "studio", "city"],
     "images": ["data:image/jpeg;base64,…", ...]   // reference selfies
   }
   ```

---

## 4. The server pipeline (step by step)

`export const maxDuration = 300;` — long-running route. Constants:
`MAX_REFERENCES = 10`, `CONCURRENCY = 3`, `OUTPUT_SIZE = 1024`,
`MAX_PROMPTS_PER_COMBO = 3`.

### 4.1 Parse & validate the request
- Reads `gender`, `attire[]`, `background[]`, `images[]`.
- Rejects with **400** if no reference photos.
- Parses each reference (`data:` URL → `{ mimeType, data }`), capped at
  `MAX_REFERENCES` (10).

### 4.2 Select prompts for the selections
`selectPrompts(gender, { attire, background })`:
- Maps gender → folder (`female`/`male`).
- Loads only the JSON prompt files whose **attire token** (filename index 2) and
  **background token** (index 3) match the selections.
- If nothing matches, falls back to all prompts for the gender; if still none →
  **400** "No prompts found".

### 4.3 Group prompts into combos
Prompts are grouped by `"<attire>|<background>"`. The selected dimensions form the
combo list **in `attire → background` order** (outer loop attire, inner background):

```
business-casual|office, business-casual|studio, business-casual|city,
business-professional|office, business-professional|studio, business-professional|city
```

### 4.4 Build one job per combo (with prompt fallbacks)
Each job carries up to `MAX_PROMPTS_PER_COMBO` (3) candidate prompts for that combo
(`_001`, `_002`, `_003`) and a reference image (round-robin across uploaded photos):

```ts
type Job = { label: string; prompts: HeadshotPrompt[]; ref: ReferenceImage };
```

> **# of images generated = # of combos = (#attire) × (#background).**
> e.g. 2 × 3 = **6 headshots** (1 per combo).

### 4.5 Run the concurrent worker pool
- A shared `queue` holds all jobs; `results[]` is pre-allocated (null per combo).
- **3 workers** run via `Promise.all`. Each worker loops: `queue.shift()` →
  `await generateForCombo(job)` → store at `results[index]` → repeat.
- Per-combo failures are caught (logged, counted) so one bad combo never aborts
  the others.

### 4.6 `generateForCombo` — per-combo prompt fallback + square normalize
For each candidate prompt in order:
1. `generateOne(ref, prompt.data)` → a generated image.
2. **Normalize to an exact 1024×1024 square** with sharp
   (`fit: "cover", position: "top"`), falling back to the raw image if resize fails.
3. Return on the first success; otherwise try the next prompt. If all fail → throw.

### 4.7 `generateOne` — tiered escalation per attempt
Tries 3 tiers in order (stops at first success), varying the request because a
reference can make the model silently decline (`IMAGE_OTHER`):

| Tier | Prompt | Modalities |
|------|--------|------------|
| 1 | strict | `["IMAGE"]` |
| 2 | strict | `["TEXT","IMAGE"]` |
| 3 | **softened** | `["TEXT","IMAGE"]` |

### 4.8 The Gemini image call
`generateImageWithGemini(references, promptText, opts)` POSTs to:
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent
```
with:
- `contents`: the prompt text + inline reference image(s).
- `generationConfig.responseModalities`: the tier's modalities.
- **`generationConfig.imageConfig.aspectRatio: "1:1"`** → the model composes for a
  **square frame** (so the head isn't cropped — see §6).
- `safetySettings`: all categories `BLOCK_NONE` (headshots are benign; defaults can
  intermittently suppress an image).

It returns the first inline image part, or throws with diagnostics
(`finishReason`, `promptFeedback`, `safetyRatings`) if none.

### 4.9 Assemble the response
- `chosen` = all non-null results.
- If **zero** succeeded, classify the failure:
  - mostly bare `IMAGE_OTHER` → **422 `PHOTOS_DECLINED`** ("use clearer photos").
  - otherwise → **502 `GENERATION_FAILED`** ("try again").
- Logs the exact prompt files used, then returns:
  ```jsonc
  { "images": ["data:image/png;base64,…", ...], "prompts": ["..._001.json", ...] }
  ```
  `images[i]` ↔ `prompts[i]` (same order).

---

## 5. The prompt → image mapping

- Filenames: `professional_<gender>_<attire>_<background>_<NNN>.json`.
- One image per combo, using `_001` first (then `_002`/`_003` on failure).
- The authoritative per-run mapping is the response's `prompts[]` array + the
  `[preview] generated N image(s) … from prompts:` server log.
- Full details: [generated-headshot-prompts.md](./generated-headshot-prompts.md).

---

## 6. Square 1:1 output (the head-cropping fix)

Earlier, non-square Gemini output was squared with `position: "attention"`, which
trimmed the headroom and **clipped the top of the head**. Fixed by:

1. **Requesting a square frame from Gemini** (`imageConfig.aspectRatio: "1:1"`) so
   the model composes head-and-shoulders with headroom and returns a true
   1024×1024 — the post-crop becomes a no-op.
2. **Prompt framing guardrails** — "show the ENTIRE head with headroom; do not crop
   the top of the head."
3. **Safety-net crop biased to the top** (`position: "top"`) if a non-square frame
   ever slips through, so the head is kept rather than clipped.

---

## 7. Caching & persistence

- **Generation cache:** if `generatedPreviewsKey === selectionKey`, the previously
  generated images are reused from IndexedDB — no regeneration unless the
  gender/attire/background/upload-count signature changes.
- **Storage:** each returned image is turned into a `File`, stored in IndexedDB
  under a `gen-…` id, and the ids saved to `formData.generatedPreviews`.
- These same images are later shown **watermarked** (preview), then **without
  watermark** after payment, and bundled into the **download ZIP** / **email**.

---

## 8. After generation

| Stage | What happens to the images |
|-------|----------------------------|
| Preview reveal | Shown with a tiled **"HEADSHOT.AI" watermark** overlay |
| Unlock showcase | Used in the right-side scrolling marquee |
| Checkout panel | Shown in the marketing gallery (user's own headshots only) |
| Payment success | Shown **without watermark**; downloadable as a **ZIP** named after the user (`<Name>-headshots/<Name>_headshot_N.png`); auto/manual **emailed** as attachments; best-effort **saved to Supabase** for the dashboard |

---

## 9. Failure handling & resilience

- **`IMAGE_OTHER`** (transient model decline): handled by the tiered escalation +
  per-combo prompt fallback + over-provisioning. A combo only fails if all its
  prompts × all tiers fail.
- **No early-stop:** one failing combo never aborts the rest (each worker catches
  its own errors).
- **`PHOTOS_DECLINED` (422)** vs **`GENERATION_FAILED` (502)**: the client shows
  "use different photos" vs "try again" accordingly.
- **Resize failure:** falls back to the raw generated image (never loses a success).
- **Vercel note:** the route declares `maxDuration = 300`, but on the **Hobby plan
  the function cap is 60s** — very large selections (e.g. 15 images) can time out
  there. Upgrade to Pro or select fewer combos.

---

## 10. Configuration reference

| Constant / setting | Value | Where | Meaning |
|--------------------|-------|-------|---------|
| `MAX_REFERENCES` | 10 | route | Max uploaded selfies used |
| `CONCURRENCY` | 3 | route | Parallel generations |
| `OUTPUT_SIZE` | 1024 | route | Square output px |
| `MAX_PROMPTS_PER_COMBO` | 3 | route | Prompt fallbacks per combo |
| `maxDuration` | 300 | route | Server time budget (capped to plan limit) |
| Image model | `gemini-2.5-flash-image` | gemini-image | Generation model |
| `aspectRatio` | `1:1` | gemini-image | Square framing |
| `safetySettings` | `BLOCK_NONE` | gemini-image | Avoid benign suppression |
| Reference downscale | 768px / q0.85 | preview/unlock step | Smaller request body |

### Environment
| Var | Purpose |
|-----|---------|
| `GEMINI_API_KEY` | **Required** — image generation |
| `GEMINI_IMAGE_MODEL` | Optional model override (default `gemini-2.5-flash-image`) |

> Generation needs **only `GEMINI_API_KEY`** — no Supabase/Stripe required to
> produce the headshots themselves.

---

## 11. End-to-end summary

```
selfies (IndexedDB) + selections (gender, attire[], background[])
        │
        ▼  client downscales references, POST /api/generate/preview
selectPrompts → group by attire×background combo → 1 job/combo (3 prompt fallbacks)
        │
        ▼  async worker pool (3 parallel)
generateForCombo → generateOne (3 tiers) → Gemini (gemini-2.5-flash-image, 1:1, BLOCK_NONE)
        │
        ▼  sharp normalize → exact 1024×1024 square (top-biased safety crop)
{ images[], prompts[] }  ←  aligned 1:1
        │
        ▼  client stores in IndexedDB (cached by selectionKey)
watermarked preview → unlock → checkout → payment-success (download ZIP / email / save)
```

| File | Role |
|------|------|
| `src/app/api/generate/preview/route.ts` | Orchestrates the whole generation pipeline |
| `src/lib/gemini-image.ts` | Calls the Gemini image model (square, safety, tiers) |
| `src/lib/headshot-prompts.ts` | Loads/filters prompt JSON, builds the instruction text |
| `src/components/generate/preview-step.tsx` | Triggers generation, shows watermarked reveal |
| `src/components/generate/unlock-step.tsx` | Triggers/caches generation, showcase |
| `src/components/generate/payment-success-step.tsx` | Download ZIP / email / save |
```
