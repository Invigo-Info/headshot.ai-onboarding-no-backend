# Onboarding Workflow — Step-by-Step Functionality Reference

This document explains the **"create a headshot pack" onboarding wizard** end to end —
every step, what it collects, where that data goes, which server actions / APIs it calls,
how validation and navigation work, and how the generated headshots are produced,
unlocked, paid for, downloaded, emailed, and saved.

- **Route:** `/generate/one-time/[slug]?step=<step>`
- **Entry page:** [`src/app/(generate)/generate/one-time/[slug]/page.tsx`](../src/app/(generate)/generate/one-time/[slug]/page.tsx)
- **Orchestrator:** [`src/components/generate/main-steps.tsx`](../src/components/generate/main-steps.tsx) → [`form-layout.tsx`](../src/components/generate/form-layout.tsx)
- **State store:** [`src/store/form-store.ts`](../src/store/form-store.ts)

---

## 1. High-level flow

```
gender → attire → background → upload → preview → unlock → checkout → payment-success
  (name        (outfits)   (scenes)  (selfies)  (auth +    (pricing)  (Stripe     (download /
 + gender)                          + validate) reveal)              embedded)    email / save)
```

The active wizard order (from `baseStepOrder` in `form-store.ts`):

```
gender, attire, background, upload, preview, unlock, checkout, pricing, glasses, review, payment-success
```

> `pricing`, `glasses`, and `review` are **legacy** steps. The live flow goes
> `unlock → checkout → payment-success`; Stripe's redirect skips straight past
> pricing/glasses/review. They remain wired in the store for backward compatibility.

**Each step maps 1 selection → the AI prompt system:**
- `attire` and `background` choices become the tokens used to pick prompt JSON files
  (see [`docs/generated-headshot-prompts.md`](./generated-headshot-prompts.md)).
- 1 headshot is generated per **attire × background** combo.

---

## 2. Architecture & cross-cutting concerns

### 2.1 Routing & step gating
- The page is `force-dynamic`. It loads the **pack** by `slug` via `getPackBySlug()`,
  falling back to static `photoPacks` data if the DB row isn't seeded.
- **Anonymous users are allowed to start** the wizard. The auth gate is at the
  `preview` step.
- `MainSteps` reads `?step=` from the URL and calls `validateStep(step)`:
  - If the step's prerequisites aren't met, it `router.replace()`s to the
    `redirectTo` step (so you can't deep-link past incomplete steps).
  - A loading spinner shows during validation to prevent content flash.
- `FormLayout` renders the matching step component via a `switch (currentStep)`,
  plus the sticky header (logo, progress bar, Back button, step counter).

### 2.2 State — Zustand store (`form-store.ts`)
- `formData` holds all selections; persisted to **localStorage** under key `ohfs`,
  **AES-GCM encrypted** via the Web Crypto API (`createEncryptedStorage`).
- Only `formData` is persisted (not `currentStep`/`packData`).
- **Pack switch detection:** `setSlug()` compares `lastSlug`; on change it resets
  pack-specific fields (attire, background, plan, uploads, previews) and clears
  IndexedDB.
- Key helpers: `getStepOrder`, `getNextStep`, `getStepNumber`, `validateStep`,
  `isStepCompleted`, `getNextIncompleteStep`.

### 2.3 Storage — IndexedDB for image blobs
- `imageStorage` (class `ImageStorage`) stores actual `File` blobs in IndexedDB
  (`headshot-images` DB, `images` store), keyed by id.
- Only **metadata** (`StoredPhoto`: id/name/type/size) lives in Zustand; the bytes
  live in IndexedDB so reloads don't lose uploads and request bodies stay small.
- Used for: uploaded selfies **and** generated preview headshots.

### 2.4 `formData` fields (the data model)
| Field | Set by step | Meaning |
|-------|-------------|---------|
| `name` | gender | User's given name (used for ZIP/email filenames). |
| `gender` | gender | `man` / `woman` / `other` → prompt folder. |
| `attire[]` | attire | Selected outfit keys. |
| `background[]` | background | Selected scene keys. |
| `uploadedImages[]` | upload | `StoredPhoto` metadata of **accepted** selfies. |
| `generatedPreviews[]` | preview/unlock | IndexedDB ids of generated headshots. |
| `generatedPreviewsKey` | preview/unlock | Selection signature the previews were made for (cache key). |
| `selectedPlan` | unlock | `starter` / `basic` / `premium`. |
| `consent`, `glassesPreference`, hair/age/etc. | legacy steps | Unused in the active flow. |

---

## 3. Step-by-step breakdown

### STEP 1 — `gender` · "Tell us about yourself"
**File:** [`gender-step.tsx`](../src/components/generate/gender-step.tsx)

- **Collects:** `name` (text input) + `gender` (Male/Female/Other radio cards).
- **Right panel:** a rotating before/after showcase — cross-fades through 15 pairs
  (`Na.webp` after, `Nb.webp` before thumbnail) every 3.5s in a shuffled order.
- **`womenOnly` packs:** if `onboardingFallback[slug].womenOnly`, only "Female" shows.
- **Validation (`canContinue`):** name non-empty **and** gender selected.
- **On Continue:** writes to store live (`updateFormData`) and routes to the next
  step via `getNextStep("gender")`.
- **Completion rule:** `isStepCompleted("gender")` = `name.trim()` && `gender`.

---

### STEP 2 — `attire` · "Select your attire"
**File:** [`attire-step.tsx`](../src/components/generate/attire-step.tsx)

- **Collects:** `attire[]` — multi-select from 3 options:
  `business-professional`, `business-casual`, `smart-casual`.
- These keys map directly to the prompt filename **attire token**.
- **Reference images:** `/assets/on-boarding/<slug>/<female|male>/attire/<key>/1.webp`
  (gender chooses the folder).
- **UI:** card grid, check badge on selected, live "N selected" counter, sticky CTA.
- **Validation:** at least one attire selected.
- **Completion rule:** `attire.length > 0`.

---

### STEP 3 — `background` · "Select your backgrounds"
**File:** [`background-step.tsx`](../src/components/generate/background-step.tsx)

- **Collects:** `background[]` — multi-select from 5 options:
  `studio`, `office`, `city`, `nature`, `wall-and-bricks`.
- These keys map to the prompt filename **background token**.
- **Reference images:** `/assets/on-boarding/<slug>/<folder>/background/<key>/1.webp`.
- **Validation / completion:** at least one background selected.

> **Generation math:** images generated = `#attire × #background` combos.
> e.g. 2 attires × 3 backgrounds → **6 headshots**.

---

### STEP 4 — `upload` · Upload your selfies
**File:** [`upload-step.tsx`](../src/components/generate/upload-step.tsx)

The most complex step. Responsibilities:

1. **File intake** — local picker **and** a phone hand-off:
   - Generates a one-time token + QR code pointing at `/m/<token>` (mobile upload
     page). Photos uploaded on the phone are polled and ingested onto the desktop
     automatically (de-duplicated via `consumedPathsRef`).
2. **Client-side file validation** (`validateFile`): ≤10MB; types JPEG/JPG/PNG/WEBP.
3. **Storage:** each accepted file is downscaled, stored in IndexedDB, and shown in
   a grid. Metadata mirrored to `statusesRef` for synchronous sequential ingestion.
4. **AI photo validation** (`analyzeImage` server action — see §4.1):
   - Runs through a **concurrency-limited queue** (max 3 at a time).
   - Each image: `analyzing` → `accepted` / `rejected` / `error`.
   - **Retries up to 3×** on transient failures; still-failing photos end in
     `error` (treated as **not accepted** — fail-closed).
   - Accepted photos get a green **"Accepted"** badge.
5. **Photo Requirements dialog** (`PhotoRequirementsDialog`): good/bad example
   galleries for 5 rules (diverse photos, face clearly visible, nothing covering
   the face / no sunglasses, recent & true to life, keep it professional).
6. **On Continue:** filters to **accepted-only** photos and writes them to
   `uploadedImages` — so generation only ever uses validated photos:
   ```ts
   updateFormData({ uploadedImages: imageStatuses.filter(s => s.status === "accepted").map(s => s.storedPhoto) })
   ```
- **Completion rule:** `uploadedImages.length >= MIN_ACCEPTED_IMAGES`.

---

### STEP 5 — `preview` · Auth gate + watermarked reveal
**File:** [`preview-step.tsx`](../src/components/generate/preview-step.tsx)

This step has **two modes**, switched on `userId`:

**A) Not signed in → account gate**
- Left: "Create an account to continue" with **Continue with Google**
  (`SignInWithGoogleAction`) and **magic-link email** (`signInWithMagicLink`).
- The resume path `?step=preview` is passed so Supabase returns the user right back
  here after auth (`/auth/callback?next=…`).
- Right: a 5-minute **"preparing" countdown** ring (`PreparingTimer`, rAF-driven).

**B) Signed in → `PreviewReveal`**
- **Generates (or loads cached) watermarked previews:**
  - Builds a `selectionKey` from `{gender, attire, background, n uploads}`.
    If `generatedPreviews` already match this key, reuses them (no re-generation).
  - Otherwise downscales each uploaded selfie to a data URL (`fileToReferenceDataUrl`,
    max 768px) and POSTs to **`/api/generate/preview`** (see §4.2).
  - Stores returned images in IndexedDB, saves their ids to `generatedPreviews` +
    `generatedPreviewsKey`.
- **Display:** grid of previews, each overlaid with a **tiled diagonal
  "HEADSHOT.AI" watermark** (`WatermarkOverlay`). Loading shows spinners; errors
  distinguish `PHOTOS_DECLINED` (→ "Use different photos") from transient failures
  (→ "Try again").
- **CTA "Unlock My Headshots"** → next step (`unlock`).
- **Completion rule:** `preview` completes as soon as the user advances.

---

### STEP 6 — `unlock` · Pricing (3 tiers)
**File:** [`unlock-step.tsx`](../src/components/generate/unlock-step.tsx)

- **Three plans** (`PLAN_META`): **Starter** ($25/40), **Basic** ($35/100, badge
  "87% choose this", highlighted), **Premium** ($55/150, "+Best Value").
- **Live overrides:** on mount it calls, per plan:
  - `checkPaymentStatus(userId, planId)` → marks already-**purchased** plans
    (locks the others, pre-selects the paid one).
  - `getPriceInfo(planId)` → overrides static price + headshot count from Stripe/DB.
- **Background generation:** same cached-or-generate preview logic as the preview
  step (so previews exist for the right-side showcase and for post-payment).
- **Right showcase (desktop):** vertical marquee of the user's generated headshots
  (or fallback examples) with a **scroll-position center-zoom** effect
  (rAF read-then-write; respects `prefers-reduced-motion`). Mobile shows a static
  2-row grid.
- **On Continue (`handleContinue`):**
  - saves `selectedPlan`;
  - if the plan is already **paid** → jump straight to `payment-success`;
  - else → go to `checkout`.
- **Completion rule:** `selectedPlan` set.

---

### STEP 7 — `checkout` · Embedded Stripe payment
**File:** [`checkout-step.tsx`](../src/components/generate/checkout-step.tsx)
**Server action:** `createEmbeddedCheckoutSession` ([`payment-actions.ts`](../src/actions/payment-actions.ts))

- **Left:** Stripe **Embedded Checkout** (`<EmbeddedCheckoutProvider>` +
  `<EmbeddedCheckout>`), whose `fetchClientSecret` calls
  `createEmbeddedCheckoutSession({ ...formData, slug })`.
- **`createEmbeddedCheckoutSession`** (server):
  - Resolves the price from the `prices` DB row, **falling back** to static
    `getPricingDetails()` pricing if not seeded.
  - For signed-in users, finds/creates a **Stripe customer** and stores
    `stripe_customer_id` on the profile. Anonymous shoppers use
    `customer_creation: "always"`.
  - Creates a `ui_mode: "embedded"` session (`mode: "payment"`, adaptive pricing,
    invoice creation, promo codes) with a **`return_url`** back to
    `?step=payment-success&session_id={CHECKOUT_SESSION_ID}`, and metadata
    (`user_id`, `pack_id`, `price_id`, `plan`, `slug`).
  - Returns `client_secret`.
- **Right:** marketing panel — "665,000+" stat, a gallery of **only the user's own
  generated headshots** (`shots.slice(0,8)`, pulse placeholders when empty), 4.9/5
  verified rating, a testimonial, and `TrustedLogos`.
- **Completion rule:** `selectedPlan` set (reached after plan choice).

---

### STEP 8 — `payment-success` · Delivery
**File:** [`payment-success-step.tsx`](../src/components/generate/payment-success-step.tsx)

Reached via Stripe's `return_url`. Always allowed by `validateStep` (Stripe skips
the intermediate steps). On load it:

1. **Reveals unlocked headshots** — same generated images, now shown **without the
   watermark**, loaded from IndexedDB.
2. **Best-effort Supabase save** (once per session, idempotent via
   `sessionStorage` key `headshots-saved:<sessionId>`):
   `saveGeneratedHeadshots()` ([`headshot-actions.ts`](../src/actions/headshot-actions.ts))
   uploads to the `onboarding-headshots` bucket + inserts rows so the dashboard
   `/my-headshots` page can show them. No-ops if Supabase/login isn't configured.
3. **Best-effort auto-email** (once per session, key `headshots-emailed:<sessionId>`):
   `emailGeneratedHeadshots({ images, plan, name })`
   ([`email-headshots.ts`](../src/actions/email-headshots.ts)) — emails the ZIP-named
   attachments to the signed-in user. No-ops if Resend/login isn't configured.
4. **Order Details + Your Selections** summary cards.
5. **Download (sticky CTA) "Download My Headshots":** builds a **ZIP** (JSZip) from
   IndexedDB, named after the user — folder `"<Name>-headshots/"`, files
   `"<Name>_headshot_N.png"`, archive `"<Name>-headshots.zip"`.
6. **Manual "Email My Headshots" button:** resend / fallback for the auto-email,
   with accurate messaging for "not configured" / "not signed in" cases.

---

### Legacy steps (not in the live path)
- **`pricing`** ([`pricing-step.tsx`](../src/components/generate/pricing-step.tsx)) —
  older hosted-redirect pricing screen (uses `createPaymentLink`, hosted Stripe
  Checkout). Superseded by `unlock` + embedded `checkout`.
- **`glasses`** ([`glasses-step.tsx`](../src/components/generate/glasses-step.tsx)) —
  glasses preference; not collected in the front-loaded flow.
- **`review`** ([`review-step.tsx`](../src/components/generate/review-step.tsx)) —
  consent + selection review.
- **`form-wizard.tsx`** — an older numeric-step wizard shell; replaced by
  `form-layout.tsx`.
- Demographic steps (`age`, `hair-*`, `ethnicity`, `body-type`) exist as components
  but are dropped from `baseStepOrder`.

---

## 4. The engines behind the steps

### 4.1 Photo validation — `analyzeImage`
**File:** [`upload-actions.ts`](../src/actions/upload-actions.ts)

- Sends the (resized) image to **Gemini** (`gemini-2.5-flash`) with a strict JSON
  `responseSchema` → `{ isAccepted, reason }`, `temperature: 0.1`.
- **Accept-by-default** with hard-fail reasons: no face, multiple people, face too
  small, severe blur/lighting, **occlusion incl. ANY sunglasses/tinted glasses**,
  extreme pose, obvious AI/heavy edits, explicit content, duplicates.
- **No API key →** fail-open (accept) so dev isn't blocked.
- **On error →** fail-closed (`success:false`) so the client retries, and an
  unverifiable photo is treated as **not accepted**.

### 4.2 Headshot generation — `/api/generate/preview`
**File:** [`preview/route.ts`](../src/app/api/generate/preview/route.ts) · helpers
[`headshot-prompts.ts`](../src/lib/headshot-prompts.ts), [`gemini-image.ts`](../src/lib/gemini-image.ts)

- Input: `{ gender, attire[], background[], images[] }` (reference data URLs).
- `selectPrompts()` loads JSON prompts matching the attire/background tokens, grouped
  by combo. **One job per attire × background combo**, with `_001 → _002 → _003`
  prompt fallback.
- `generateOne()` calls **Gemini image** (`gemini-2.5-flash-image`) with tiered
  fallbacks (modality, then softened prompt) and `safetySettings: BLOCK_NONE`.
- Output normalized to a **square 1024×1024** (model returns 1:1 via
  `imageConfig.aspectRatio` so heads aren't cropped; sharp is a safety-net crop
  biased to the top).
- Returns `{ images[], prompts[] }` (aligned 1:1) and logs the prompt files used.

### 4.3 Payment helpers (`payment-actions.ts`)
- `createEmbeddedCheckoutSession` — in-page embedded checkout (active).
- `createPaymentLink` — hosted-redirect checkout (legacy `pricing` step).
- `checkPaymentStatus(userId, plan)` — looks for a paid, unused `orders` row.
- `getPriceInfo(plan)` — live price + headshot count from the `prices` table.
- Plus subscriptions, customer portal, and billing history (used elsewhere).

### 4.4 Delivery actions
- `saveGeneratedHeadshots` / `getUserHeadshots`
  ([`headshot-actions.ts`](../src/actions/headshot-actions.ts)) — Supabase persistence
  for the dashboard. Best-effort, guarded.
- `emailGeneratedHeadshots` ([`email-headshots.ts`](../src/actions/email-headshots.ts)) —
  Resend email with attachments. Checks the Resend key first, isolates the
  Supabase recipient lookup, returns precise `reason` codes; never throws.

---

## 5. Auth, persistence & resumability
- **Anonymous start, gated reveal:** the wizard runs anonymously until `preview`,
  where Google/magic-link auth is required to see results.
- **Resume after auth:** the `?step=preview` resume path round-trips through Supabase
  so users land back on the reveal.
- **Local persistence:** selections survive reloads via encrypted localStorage;
  image bytes survive via IndexedDB.
- **Idempotency:** Supabase-save and auto-email each run once per Stripe session via
  `sessionStorage` keys.
- **Caching:** previews are regenerated only when the `selectionKey`
  (gender+attire+background+upload count) changes.

---

## 6. Required environment (for the full flow)
| Var | Used by |
|-----|---------|
| `GEMINI_API_KEY` | photo validation + headshot generation |
| `GEMINI_IMAGE_MODEL` / `GEMINI_TEXT_MODEL` | optional model overrides |
| `STRIPE_SECRET_KEY` | checkout session creation |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | embedded checkout (client) |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` | auth, prices, orders, storage |
| `RESEND_API_KEY` / `RESEND_FROM_EMAIL` | emailing headshots |
| `NEXT_PUBLIC_SITE_URL` | gallery link in emails |

> The flow is designed to **degrade gracefully**: it runs fully client-side (IndexedDB
> + localStorage) and the Supabase/Resend backends no-op when unconfigured.

---

## 7. File map

| Concern | File |
|---------|------|
| Entry page | `src/app/(generate)/generate/one-time/[slug]/page.tsx` |
| Orchestrator / step gate | `src/components/generate/main-steps.tsx` |
| Layout + step router | `src/components/generate/form-layout.tsx` |
| Step: gender | `src/components/generate/gender-step.tsx` |
| Step: attire | `src/components/generate/attire-step.tsx` |
| Step: background | `src/components/generate/background-step.tsx` |
| Step: upload | `src/components/generate/upload-step.tsx` |
| Step: preview | `src/components/generate/preview-step.tsx` |
| Step: unlock (pricing) | `src/components/generate/unlock-step.tsx` |
| Step: checkout | `src/components/generate/checkout-step.tsx` |
| Step: payment-success | `src/components/generate/payment-success-step.tsx` |
| State store | `src/store/form-store.ts` |
| Photo validation | `src/actions/upload-actions.ts` |
| Headshot generation API | `src/app/api/generate/preview/route.ts` |
| Prompt loader / builder | `src/lib/headshot-prompts.ts` |
| Gemini image client | `src/lib/gemini-image.ts` |
| Payment / Stripe | `src/actions/payment-actions.ts` |
| Email delivery | `src/actions/email-headshots.ts` |
| Supabase persistence | `src/actions/headshot-actions.ts` |
| Prompt reference | `docs/generated-headshot-prompts.md` |
```
