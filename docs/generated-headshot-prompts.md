# Generated Headshots → JSON Prompt Reference

This document explains **which JSON prompt produces each generated headshot**, how the
prompts are named and organized, and how to trace any generated image back to the exact
prompt file used to create it.

> Generation entry point: [`src/app/api/generate/preview/route.ts`](../src/app/api/generate/preview/route.ts)
> Prompt loader / text builder: [`src/lib/headshot-prompts.ts`](../src/lib/headshot-prompts.ts)
> Gemini call: [`src/lib/gemini-image.ts`](../src/lib/gemini-image.ts)

---

## 1. Where the prompts live

```
public/assets/prompts/
├── female/   → 150 JSON files
└── male/     → 150 JSON files
```

**Total: 300 structured prompt files.**

The gender selected in the flow ("woman"/"female" → `female`, everything else → `male`)
chooses the folder. See `resolveGenderFolder()` in `headshot-prompts.ts`.

---

## 2. Filename convention

Every prompt file follows this exact pattern:

```
professional_<gender>_<attire>_<background>_<NNN>.json
         │        │         │           │        │
         │        │         │           │        └─ sequence number 001–010
         │        │         │           └────────── background token
         │        │         └────────────────────── attire token
         │        └──────────────────────────────── "male" | "female"
         └───────────────────────────────────────── always "professional"
```

Example: `professional_female_business-casual_office_001.json`

The app parses these tokens by splitting the filename on `_`:

| Token index | Meaning      | Example            |
|-------------|--------------|--------------------|
| `0`         | category     | `professional`     |
| `1`         | gender       | `female`           |
| `2`         | **attire**   | `business-casual`  |
| `3`         | **background** | `office`         |
| `4`         | sequence     | `001`              |

---

## 3. Attire × Background matrix

There are **3 attires × 5 backgrounds = 15 combos per gender**, and **10 variations
(`_001`–`_010`) per combo** → 15 × 10 = **150 files per gender**.

**Attires (token 2)**
- `business-casual`
- `business-professional`
- `smart-casual`

**Backgrounds (token 3)**
- `city`
- `nature`
- `office`
- `studio`
- `wall-and-bricks`

The 15 combos (identical set for `female` and `male`):

| #  | Attire                | Background        | Files                                                   |
|----|-----------------------|-------------------|---------------------------------------------------------|
| 1  | business-casual       | city              | `professional_<g>_business-casual_city_001…010.json`        |
| 2  | business-casual       | nature            | `professional_<g>_business-casual_nature_001…010.json`      |
| 3  | business-casual       | office            | `professional_<g>_business-casual_office_001…010.json`      |
| 4  | business-casual       | studio            | `professional_<g>_business-casual_studio_001…010.json`      |
| 5  | business-casual       | wall-and-bricks   | `professional_<g>_business-casual_wall-and-bricks_001…010.json` |
| 6  | business-professional | city              | `professional_<g>_business-professional_city_001…010.json`      |
| 7  | business-professional | nature            | `professional_<g>_business-professional_nature_001…010.json`    |
| 8  | business-professional | office            | `professional_<g>_business-professional_office_001…010.json`    |
| 9  | business-professional | studio            | `professional_<g>_business-professional_studio_001…010.json`    |
| 10 | business-professional | wall-and-bricks   | `professional_<g>_business-professional_wall-and-bricks_001…010.json` |
| 11 | smart-casual          | city              | `professional_<g>_smart-casual_city_001…010.json`           |
| 12 | smart-casual          | nature            | `professional_<g>_smart-casual_nature_001…010.json`         |
| 13 | smart-casual          | office            | `professional_<g>_smart-casual_office_001…010.json`         |
| 14 | smart-casual          | studio            | `professional_<g>_smart-casual_studio_001…010.json`         |
| 15 | smart-casual          | wall-and-bricks   | `professional_<g>_smart-casual_wall-and-bricks_001…010.json`    |

*(`<g>` = `female` or `male`.)*

---

## 4. How a prompt is selected for each generated image

In `preview/route.ts`:

1. The user's selected `attire[]` and `background[]` are read from the request.
2. `selectPrompts()` loads only the JSON files whose **attire (token 2)** and
   **background (token 3)** match the selection.
3. The matched prompts are grouped by `"<attire>|<background>"` combo.
4. **One headshot is generated per selected combo**, iterated in `attire → background`
   order (outer loop = attire, inner loop = background).
5. For each combo the app tries its candidate prompts **in numeric order**
   (`_001` first, then `_002`, then `_003`) and uses the **first one that succeeds**.
   This fallback exists so a transient model decline on `_001` doesn't drop the
   whole combo.

So for a normal run, **generated image *N* uses the `_001` prompt of the *N*-th
selected combo** — falling back to `_002`/`_003` only if an earlier prompt failed.

> **Number of images = number of selected combos = (#attires) × (#backgrounds).**
> Example: 2 attires × 3 backgrounds = **6 generated headshots**.

---

## 5. How to trace a generated image back to its prompt

The mapping is exposed in three places:

### a) API response
`POST /api/generate/preview` returns the prompt filenames, aligned to the image order:

```jsonc
{
  "images":  ["data:image/png;base64,…", "…"],   // index 0..N
  "prompts": [                                      // index 0..N (same order)
    "professional_female_business-casual_office_001.json",
    "professional_female_business-casual_studio_001.json"
  ]
}
```

`images[i]` was generated by `prompts[i]`.

### b) Server log
Each run logs the exact files used:

```
[preview] generated 6 image(s) (1 per attire×background combo) from prompts:
[ 'professional_female_business-casual_city_001.json',
  'professional_female_business-casual_nature_001.json',
  … ]
```

### c) Downloaded / emailed file order
The ZIP and email attachments are named in the **same order** as `prompts[]`:

```
<Name>_headshot_1.png   ← prompts[0]
<Name>_headshot_2.png   ← prompts[1]
<Name>_headshot_3.png   ← prompts[2]
…
```

So `<Name>_headshot_K.png` corresponds to `prompts[K-1]`.

---

## 6. Worked example — 2 attires × 3 backgrounds

**Selection**
- Gender: `female`
- Attire: `business-casual`, `business-professional`
- Background: `office`, `studio`, `city`

**Iteration order** (attire outer, background inner) → **6 images**:

| Image file               | Combo                                | Prompt file (first success)                                  |
|--------------------------|--------------------------------------|--------------------------------------------------------------|
| `<Name>_headshot_1.png`  | business-casual · office             | `professional_female_business-casual_office_001.json`        |
| `<Name>_headshot_2.png`  | business-casual · studio             | `professional_female_business-casual_studio_001.json`        |
| `<Name>_headshot_3.png`  | business-casual · city               | `professional_female_business-casual_city_001.json`          |
| `<Name>_headshot_4.png`  | business-professional · office       | `professional_female_business-professional_office_001.json`  |
| `<Name>_headshot_5.png`  | business-professional · studio       | `professional_female_business-professional_studio_001.json`  |
| `<Name>_headshot_6.png`  | business-professional · city         | `professional_female_business-professional_city_001.json`    |

> If `_001` for a combo failed (e.g. a transient model decline), that row instead
> used `_002` (or `_003`). The exact file is always in the API response `prompts[]`
> and the `[preview]` server log for that run.

---

## 7. Prompt JSON field reference

Each prompt file is a structured object. Fields are turned into a single
natural-language instruction by `promptToText()` before being sent to Gemini.

| Field          | Type            | Purpose                                                                 |
|----------------|-----------------|-------------------------------------------------------------------------|
| `subject`      | string          | Identity-lock instruction — match the uploaded reference face exactly.  |
| `attire`       | string          | The outfit (defines the **attire** token).                              |
| `grooming`     | string          | Hair / skin finish, preserving the reference look.                      |
| `pose`         | string          | Body angle, head tilt, crop, camera height.                             |
| `expression`   | string          | Facial expression / eye engagement.                                     |
| `location`     | string          | The setting (defines the **background** token).                         |
| `lighting`     | string          | Light direction, quality, catchlights.                                  |
| `camera`       | object          | `body`, `lens`, `aperture` — rendered as "Camera: …".                   |
| `style`        | string          | Overall photographic style.                                             |
| `color_grade`  | string          | White balance, skin-tone rendering, tonal palette.                      |
| `composition`  | string          | Crop, gridline placement, depth of field.                               |
| `mood`         | string[]        | Mood/keyword tags.                                                      |
| `quality`      | string          | Resolution / sharpness / realism directives.                            |
| `aspect_ratio` | string          | Authoring hint (e.g. `4:5`). **Note:** runtime overrides output to a square `1:1` frame via `imageConfig.aspectRatio` so the head isn't cropped. |

### Example file — `professional_female_business-casual_office_001.json`

```json
{
  "subject": "The person from the uploaded reference photograph. Match the reference exactly for face shape, skin tone, eye shape, eye color, nose structure, lip shape, jawline, ears, hair length, hair type, hair texture, and hair color …",
  "attire": "navy unstructured wool blazer over a crisp white silk camisole, refined fit and silhouette in a register suitable for professional profile editorial photography",
  "grooming": "polished professional editorial finish over the reference look …",
  "pose": "body angled 20 degrees camera-right … framed half-body crop from the upper hip up, eye-level camera",
  "expression": "refined warm closed-mouth slight smile carrying directory-credible approachability …",
  "location": "a softly blurred luxury executive office with layered architectural depth …",
  "lighting": "natural daylight from a large window at camera-front-left, soft and diffused …",
  "camera": { "body": "Canon EOS R5", "lens": "35mm f/1.8", "aperture": "f/2.8 — both eyes tack sharp …" },
  "style": "candid on-location professional photograph taken in a real working office …",
  "color_grade": "neutral on-location professional palette with healthy true-to-life skin tones …",
  "composition": "professional half-body crop from the upper hip up … eyes placed on the upper-third gridline …",
  "mood": ["professional", "female", "office", "business-casual", "credible", "trustworthy", "authentic"],
  "quality": "ultra high resolution, professional editorial quality, tack-sharp focus on both eyes …",
  "aspect_ratio": "4:5"
}
```

---

## 8. Quick-reference machine map (combos → file glob)

```json
{
  "genders": ["female", "male"],
  "attires": ["business-casual", "business-professional", "smart-casual"],
  "backgrounds": ["city", "nature", "office", "studio", "wall-and-bricks"],
  "variations_per_combo": 10,
  "filename_pattern": "professional_{gender}_{attire}_{background}_{NNN}.json",
  "selection_rule": "1 image per selected (attire × background) combo",
  "prompt_pick_order": ["_001", "_002", "_003"],
  "image_to_prompt": "images[i] was produced by prompts[i] (same order); downloaded as {Name}_headshot_{i+1}.png"
}
```
