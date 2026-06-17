# AI Slam Vision Page — Design

**Date:** 2026-06-17
**Status:** Approved design, ready for implementation plan
**Site:** anaxiatech.se (Astro 4 static site)

## Context

Anaxiatech now has enough working software across two sibling products to
*show*, not just describe, how they fit together. Today the website
(`anaxiatech.se`) is a single long-scroll bilingual homepage where **Crackz**
(the AI defect-detection product) is the flagship section. The second product,
**survey_tool / Survey Ops** (a local-first marine survey data catalog & ingest
platform), only appears as a small "Survey Ops Portal" project card.

We want a dedicated page that tells the combined story: a marine survey
platform — **AI Slam** — where the *data foundation* (Survey Ops) feeds the
*detection engine* (Crackz). The page is the site's first standalone sub-page.

**Honesty constraint (important):** Both repos document this integration as a
*defined roadmap seam*, not a shipped feature — the codebases do not yet import
each other. Per the chosen framing, the page is written in an **aspirational
vision tone** ("where we're heading"), grounded in what each product genuinely
does today so it stays credible. The combined end-to-end flow is presented as
the AI Slam *direction*, not a current turnkey capability. A quiet roadmap
signal (a status pill, like the homepage's existing R&D badge) makes this clear
without undercutting the pitch.

**Outcome:** A polished, on-brand, bilingual (EN + SV) `/products/` page that
demos the Survey Ops × Crackz integration with real screenshots plus a custom
animated data-flow diagram — surfaced in the site nav as "AI Slam".

## Approach

- **New route, not a homepage section.** `/en/products/` and `/sv/products/`
  (trailing-slash convention). First multi-page route on the site.
- **Reuse the existing design system.** No new framework, no image generation.
  All structure uses existing classes (`.section`, `.wrap`, `.eyebrow`, `.h2`,
  `.lede`, `.industries`/`.industry`, `.workflow`, `.tour__window-chrome`,
  `.stats`, status pills, `.btn` variants). Only genuinely new CSS is the
  `.flow*` diagram and a few page-specific helpers, appended to `site.css`.
- **Graphics = screenshots + a hand-built CSS/SVG flow diagram.** Combines the
  real product screenshots already in `public/assets/` with an animated,
  token-driven data-flow diagram (no raster hero illustration).
- **Page-scoped i18n.** A self-contained typed `strings` object keyed by
  `'en' | 'sv'` in a new `src/i18n/products.ts`, imported by both page files.
  This keeps page copy bilingual in one place without bloating the homepage-
  shaped global `Translations` interface in `src/i18n/types.ts`.

## Page structure (top → bottom)

1. **Hero** — eyebrow `The vision · AI Slam` (SV: `Visionen · AI Slam`),
   headline e.g. *"Every survey, searchable. Every defect, detected."* with an
   aqua `<span class="accent">`; lede introducing the two-product platform.
   CTAs: primary "Talk to us" → `/{lang}#contact`, ghost "Explore Crackz" →
   `/{lang}#crackz`. Reuse `.hero` / `.hero__grid` / `.hero__ctas`.

2. **The two halves** — two bordered cards via the `.industries`/`.industry`
   pattern (2-up, collapsing to 1-up at mobile breakpoints):
   - **Survey Ops** — *data foundation*: resumable field upload, inbox +
     operator approval, project/capture catalog, USBL geotagging, Leaflet map
     view, natural-language RAG search with citations, offline-first (local
     Ollama, PostGIS + pgvector). Screenshot: `/assets/survey-ops.webp`.
   - **Crackz** — *detection engine*: pixel-level segmentation (cracks,
     corrosion, spalling), pre-trained or custom models, GeoJSON + audit-grade
     reports, 90%+ validation accuracy. Screenshot:
     `/assets/gui/detection_run_view.png`.
   Each card: real screenshot + short *factual, ships-today* feature list.

3. **The integration flow** (centerpiece) — a custom **animated CSS/SVG
   horizontal data-flow diagram** built from design tokens (no images). Nodes:
   `Field capture → Ingest & catalog → Geotagged frames → Crackz detection →
   Annotations back → Searchable knowledge`. Each node is a labeled chip with a
   mono index; connectors carry an animated flowing pulse. **Must respect
   `@media (prefers-reduced-motion: reduce)`** (no animation). Collapses to a
   vertical stack on mobile. Below the diagram: a short numbered `.workflow`
   strip (reuse `.workflow`/`.workflow__step`) explaining each handoff in prose.

4. **Seeing it together** — a `.tour`-style framed pairing using
   `.tour__window-chrome` (traffic-light dots + mono title): the Survey Ops map
   (`/assets/survey-ops-full.png`) beside a Crackz detection result
   (`/assets/gui/detection_run_view.png`). Caption: "Catalog on the left,
   detection on the right — one platform."

5. **Roadmap / vision band** — tight section (`.section--tight`, mantle
   background like the homepage industries band) stating this is the AI Slam
   direction; each product ships independently today. Include a quiet status
   pill (reuse `proj__status--rnd` styling) reading e.g. "Vision · in
   progress". Close with a contact CTA (reuse the `.cta` block or a simple
   `.hero__ctas`).

## Files

**New:**
- `src/pages/en/products/index.astro` — EN page. Imports `Base`
  (`import Base from '../../../layouts/Base.astro'` — note the extra `../`
  depth) and `products` strings; renders shared markup with `lang="en"`.
- `src/pages/sv/products/index.astro` — SV page, identical markup, `lang="sv"`.
- `src/i18n/products.ts` — exports a typed `strings: Record<'en'|'sv', …>`
  object (a local interface for this page's copy; not part of `types.ts`).

To avoid duplicating the (long) markup across the two `.astro` files, prefer a
shared presentational component `src/components/AiSlam.astro` that takes
`lang` as a prop and pulls from `products.ts`; each page file then renders
`<Base …><AiSlam lang="en|sv" /></Base>`. (Mirrors how `CrackzTour.astro` is a
reusable component; keeps the two routes thin.)

**Modified:**
- `src/layouts/Base.astro` — add an "AI Slam" nav link → `/{lang}/products/` in
  both `.nav__links` (lines ~47–54) and the mobile menu (lines ~79–86). SV
  label: "AI Slam" (proper noun, same in both). Optionally add it to the
  footer Product column.
- `src/styles/site.css` — append new `.flow*` diagram styles + any page-
  specific helpers, following the existing BEM-ish, token-driven convention
  and the established responsive breakpoints (`880px`, `520px`).
- `public/sitemap.xml` — add `https://anaxiatech.se/en/products/` and
  `/sv/products/` entries with hreflang alternates, matching existing format.

## Reusable patterns to draw from

- Bordered product cards: `.industries`/`.industry` (homepage `#industries`).
- Window-chrome screenshot frame: `.tour__window-chrome` + `.tour__shot`
  (`src/components/CrackzTour.astro`).
- Workflow strip: `.workflow`/`.workflow__step` (homepage Crackz section).
- Status pill: `.proj__status` / `.proj__status--rnd` (homepage projects).
- Section scaffolding: `.section`, `.section--tight`, `.wrap`, `.eyebrow`,
  `.section-head`, `.h2`, `.lede`, `.accent`, `.btn--primary/--ghost/--outline`.
- Bilingual component pattern: `CrackzTour.astro` (reusable, static) + the SV
  homepage's use of a `t` strings object.

## Copy guardrails

- **Ships-today claims** (state as fact): Crackz detection/segmentation,
  pre-trained + custom models, GeoJSON/reports, 90%+ accuracy; Survey Ops
  ingest, inbox approval, catalog, USBL geotag, map view, RAG search, offline
  local LLM.
- **Vision/roadmap** (state as direction, not shipped): the *automatic*
  end-to-end handoff of geotagged frames into Crackz and detection results back
  into the catalog as annotations. Use future/aspirational phrasing.
- Reuse existing verified stats from the homepage (70% cost reduction, 5×
  faster, 90%+ accuracy, $25–75K savings) rather than inventing new numbers.

## Verification

1. `npm run dev`, open `http://localhost:4321/en/products/` and `/sv/products/`.
2. Confirm: all screenshots load; the flow diagram renders and the pulse
   animates; `prefers-reduced-motion` disables the animation (toggle OS setting
   or emulate in devtools); language switcher (EN ↔ SV) keeps you on the
   products page or degrades gracefully; nav "AI Slam" link works from both
   homepage and the new page.
3. Responsive check at ≤880px and ≤520px: two-up card grids and the flow
   diagram collapse to a single column without overflow.
4. `npm run build` completes with no errors (static output).
5. (Optional) Validate the sitemap XML is well-formed.

## Out of scope (YAGNI)

- No new global `Translations` keys / homepage i18n changes.
- No new raster/generated hero illustration.
- No backend, no real live integration code — this is a marketing page only.
- No restructuring of the existing homepage sections.
