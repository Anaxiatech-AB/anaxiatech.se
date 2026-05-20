# Handoff: Anaxiatech.se redesign + AI Consulting page

## Overview

A two-page redesign for **anaxiatech.se**:

1. **`index.html`** — Anaxiatech company landing page with **Crackz** as the lead product. Long-form single-page site (nav + anchored sections).
2. **`consulting.html`** — Dedicated AI Consulting page, linked from the main nav.

Audience: enterprise / defense / infrastructure decision-makers. Primary CTA on every section: email **theresia.lundgren@anaxiatech.se**.

The site replaces (or rewrites the structure of) the current anaxiatech.se. Visual style is dark-first, Catppuccin Mocha–derived, with an aqua-marine accent — matching the Crackz Design System.

## About the Design Files

The files in this bundle are **design references created in HTML/JSX prototypes**. They show the intended look, copy, layout, and behaviour — they are **not production code to copy directly**.

Your task is to **recreate these designs in the target codebase**:

- If anaxiatech.se already has a stack (the current site appears to be static HTML + plain CSS based on the live URL), use that stack and migrate the new structure in.
- If you want to rebuild from scratch, **a static-site framework is the right choice** here — Astro, Eleventy, or Next.js (static export). The current designs use React + Babel inline for prototyping speed; production should not use the in-browser Babel transformer.
- A small amount of React-style state is needed (one tab-switcher inside the Crackz product tour); that can be plain JS, Alpine.js, or a single React island — your call.

## Fidelity

**High-fidelity (hifi)**. Every value below is finalised:

- Exact colours (hex tokens, see `styles/tokens.css`)
- Type scale, weights, tracking
- Spacing scale (4-based)
- Radii, shadows, borders
- Copy is final-pass — please preserve it unless the client edits
- Responsive breakpoints are baked into the CSS

Recreate pixel-perfectly using the project's existing patterns and libraries.

## Pages & Sections

### Page 1: `index.html` (Anaxiatech home)

Order of sections, all anchored:

1. **Sticky nav** (64px tall, glass blur background)
   - Brand mark (small SVG lightning glyph) + "Anaxiatech.se"
   - Links: Crackz · AI Consulting · Services · Industries · Projects · About
   - Right-side CTA button: "Contact sales" → `#contact`

2. **Hero** (`<header id="top">`) — three variants exposed via the Tweaks panel; default = **split**
   - Eyebrow: "Anaxiatech AB · Stockholm"
   - H1: "Engineering systems that work — *above and below the surface*." (accent on the second clause)
   - Lede paragraph (2 sentences)
   - Two buttons: "Explore Crackz" (primary) · "AI consulting" (ghost, → `consulting.html`)
   - Three meta items (Founded / Domain / Delivery — last value reads "Product · Consulting")
   - Right column: square image of `assets/crackz-logo.png` with a `Detection · live` corner overlay (animated dot)

3. **Trusted-by strip** — single row of client names: SAAB Aurora · SAAB Missiles · Ericsson · Discovery+ / Warner · Sony Mobile · Telia · Vodafone

4. **Crackz featured product** (`<section id="crackz">`)
   - Product mark (small Crackz logo tile) + headline "Crackz." + sub-paragraph
   - Right column: lede + "Request a demo" / "See the product" buttons
   - **Stats band** (4 columns): 70% / 5× / 90%+ / $25–75K
   - **GUI tour** — 4 tabs (Project · Mask Editor · Training · Detection). Each tab swaps:
     - The screenshot (`assets/gui/*.png`)
     - The chrome bar title
     - The caption text + a 4-row metadata grid
   - **Workflow** — 4 numbered cards: Import / Annotate / Train / Detect (each with a CLI snippet)
   - **Deployment paths** — two cards: "Use pre-trained" (featured) / "Train custom"

5. **Consulting promo band** (`<section id="consulting" className="promo">`) — prominent feature between Crackz and Capabilities.
   - Eyebrow "AI Consulting · day job"
   - H2 with mixed roman + italic-accent: "Crackz is our product. *Consulting is what we do every day.*"
   - Two lede paragraphs (positioning + clearance/clients/price floor)
   - CTAs: "See AI consulting" → `consulting.html` (primary), "Email Theresia" → mailto (ghost)
   - Right column: 4 clickable engagement cards (Pilot / Production Sprint / Embedded / Strategy) each linking to anchors on consulting.html. Hover lifts border + nudges the arrow 4px.
   - Section background uses dual radial gradients (aqua + mauve tints) so the band reads as a distinct surface.

6. **Capabilities** (`<section id="capabilities">`) — 3×2 grid, 6 cards: AI & Automation, System & Solution Architecture, Platform & DevSecOps, Simulation & Digital Environments, Government & Defense, Drones / Autonomous / Mesh

7. **Industries** (`<section id="industries">`, mantle bg) — 3 cards: Harbors & Infrastructure, Manufacturing & QA, Industrial & Energy. Each has icon + metric pair.

8. **Projects** (`<section id="projects">`) — 2-column grid, 4 cards (Crackz pinned as 01): Crackz · WreckGame · Ocean Discovery / SubBaltica · meshtop

9. **About** (`<section id="about">`) — two-column: section title + biography. Includes the signature pull-quote: *"Engineering systems that work — above and below the surface."*. About-meta grid: Based in (Stockholm · Västervik), Org. nr (556673-0056), Experience (30+ years), Lead product (Crackz).

10. **Contact CTA** (`<section id="contact">`) — full-bleed card with `assets/crackz-logo.png` darkened background, headline + lede on the left, glassmorphic contact card on the right with the email and "Open in mail" button.

11. **Footer** — 4-column: brand + tagline · Product · Company · Resources · Copyright row (Org.nr 556673-0056 · Crackz™ trademark).

### Page 2: `consulting.html` (AI Consulting)

Same nav (with "AI Consulting" marked current). Sections:

1. **Hero** — eyebrow "Anaxiatech AI consulting", H1 "Senior AI engineering, *for the problems where the wrong answer is expensive.*", lede, two buttons. Right column is a **schematic visual** (not a photo): grid-paper background + four labeled "lane" pills (CV-01 Computer vision pilots · LLM-02 LLM & agent integration · PRD-03 Production ML sprints · EMB-04 Embedded AI engineer), with the top pill marked as active. Meta row below: Focus / Team / Clearance.

2. **Services** (`<section id="services">`) — 2-column grid, 6 cards. Each card: number, title, one-line tagline (accent colour), body paragraph, "What you walk away with" 2-column deliverables list.

3. **Engagement models** (`<section id="engagements">`, mantle bg) — 3 cards. Middle card is featured (accent border, "Most teams start here" tag). Each has: title, sub, price block (From €X · period), checklist, "Discuss this" button.

4. **Process** — 4-phase horizontal timeline with circle markers, dashed line behind. Phase columns: Discover (Week 0) → Prototype (Weeks 1–2) → Productionise (Weeks 3–7) → Handover (Week 8+).

5. **Case study** (mantle bg) — 2-column hero card: left is `assets/crackz-logo.png` as cover-bg with a "Case study · 2022 – present" tag; right is body copy with three accent-coloured metric tiles (3 yrs / 4 surfaces / 90%+) and a "Read more about Crackz" button linking back to `index.html#crackz`.

6. **Stack matrix** — 4 columns of named tech lists (Models & training / LLMs & agents / Inference & infra / Languages), each row tagged "core" or "support".

7. **FAQ** — 6 Q/A rows, two-column inside each row (question left, answer right).

8. **Contact CTA** — same shape as on `index.html`.

9. **Footer** — same structure, "Consulting" column instead of "Resources".

## Design Tokens

All values are in `styles/tokens.css` as CSS custom properties on `:root`. Use these directly; **do not hard-code hex values.**

### Colours

```css
/* Backgrounds (deepest → highest) */
--bg-base:       #11111b;
--bg-mantle:     #1e1e2e;
--bg-crust:      #181825;

/* Surfaces */
--surface-0:     #313244;   /* cards, inputs */
--surface-1:     #45475a;   /* borders, dividers */
--surface-2:     #585b70;   /* disabled */

/* Text */
--fg-1:          #cdd6f4;   /* primary */
--fg-2:          #a6adc8;   /* secondary */
--fg-3:          #6c7086;   /* hints */
--fg-4:          #7f849c;   /* very muted */

/* Accents */
--aqua:          #5eead4;   /* PRIMARY accent — used for CTAs, focus, active */
--aqua-glow:     #89dceb;
--blue:          #89b4fa;
--mauve:         #cba6f7;   /* uppercase section labels */

/* Semantic */
--success:       #a6e3a1;
--warning:       #f9e2af;
--danger:        #f38ba8;
--medium:        #fab387;

/* Tints */
--aqua-a13:      rgba(94, 234, 212, 0.13);
--mauve-a13:     rgba(203, 166, 247, 0.13);
--white-a04:     rgba(255, 255, 255, 0.04);
--white-a08:     rgba(255, 255, 255, 0.08);
```

### Typography

Bundled font (in `fonts/`):

- **Source Sans 3** — variable, 200–900, upright + italic. Used for body and display (display = same face at weight 700–800 with tighter tracking).
- **Source Code Pro** — loaded from Google Fonts. Mono.

```css
--font-sans:    'Source Sans 3', -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
--font-display: 'Source Sans 3', -apple-system, sans-serif;
--font-mono:    'Source Code Pro', 'SF Mono', 'Consolas', 'Courier New', monospace;
```

Type scale (the site uses fluid `clamp()` heavily — see `styles/site.css` for the exact `clamp()` values per element):

```css
--text-xs:   11px;
--text-sm:   12px;
--text-base: 13px;
--text-md:   14px;
--text-lg:   16px;
--text-xl:   20px;
--text-2xl:  24px;
--text-3xl:  32px;
--text-4xl:  48px;
--text-5xl:  72px;
```

H1 in hero: `clamp(40px, 6vw, 88px)`, `line-height: 0.96`, `letter-spacing: -0.025em`.

Section H2: `clamp(32px, 4.4vw, 56px)`, `line-height: 1.02`, `letter-spacing: -0.022em`.

Crackz wordmark in the product header: `clamp(48px, 7vw, 96px)`, weight 800 (`--weight-black`).

### Tracking & line-heights

```css
--tracking-tight:  -0.015em;
--tracking-wide:    0.08em;   /* used on uppercase section labels (.eyebrow) */
--tracking-wider:   0.12em;

--lh-tight:   1.15;
--lh-snug:    1.30;
--lh-normal:  1.50;
--lh-relaxed: 1.65;
```

### Spacing

4-based scale. Use the tokens, not raw px:

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

Section vertical padding: `--section-pad-y: 120px` (default), `--section-pad-y-tight: 72px`. The compact density variant reduces these to 80 / 48.

### Radii

```css
--radius-xs:   2px;
--radius-sm:   4px;   /* inputs, badges */
--radius-md:   5px;   /* buttons */
--radius-lg:   8px;   /* cards, welcome card */
--radius-xl:   12px;  /* hero CTA card */
--radius-full: 999px;
```

### Shadows

Used sparingly. Cards are flat with a `1px solid var(--surface-1)` border, not a shadow.

```css
--shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.30);
--shadow-md:  0 4px 12px rgba(0, 0, 0, 0.35);
--shadow-lg:  0 12px 32px rgba(0, 0, 0, 0.50);   /* only on the GUI tour viewport */
--glow-aqua:  0 0 0 1px var(--aqua), 0 0 24px rgba(94, 234, 212, 0.35);
```

### Motion

```css
--ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out:  cubic-bezier(0.65, 0, 0.35, 1);
--dur-fast:    120ms;
--dur-medium:  200ms;
--dur-slow:    320ms;
```

Hover: lift by one surface step (`SURFACE0` → `SURFACE1`). No scale transforms, no shadow bloom.

Single ambient animation: the live-dot pulse on the hero overlay (`@keyframes pulse`, 2.4s).

## Interactions & Behaviour

### Sticky nav
- Sticky to top, `backdrop-filter: blur(14px)`, semi-transparent `rgba(17, 17, 27, 0.78)` background. Bottom border in `--surface-0`.

### Anchor scrolling
- All in-page links use plain `href="#id"`. Optional smooth-scroll polyfill is fine.

### Crackz GUI tour (the only stateful UI on the main page)
- 4 tabs, segmented control look.
- Active tab gets `background: var(--aqua-a13)` and `color: var(--aqua)`.
- Switching tabs swaps the image, chrome title, caption headline, caption body, and the 4-row metadata grid below the image.
- Tab data is in `app.jsx` in the `TOUR_SHOTS` array — port that data structure into your stack.

### Buttons
- Primary: filled `--aqua`, hover to `--primary-hover`. Text colour is `--bg-base` (dark on light), not white.
- Ghost: transparent, `1px solid var(--surface-1)`, hover background `var(--white-a04)`.
- Link-style: aqua text, no background, with an arrow `→` that translates 3px on hover.

### Cards
- All cards: `padding: 14–32px` (per-section), `border-radius: 8px`, `border: 1px solid var(--surface-0)`, `background: var(--bg-mantle)`.
- Hover: border tightens to `var(--surface-1)`, background lifts to `var(--surface-0)` (capability cards only).

### Email links
Every `mailto:` link uses the format:
```
mailto:theresia.lundgren@anaxiatech.se?subject=<URL-encoded subject>
```

### Responsive

Breakpoints inline in `styles/site.css`:

- `880px` — most grids collapse to single column or 2-column (services, capabilities, paths).
- `720px` — hero stacks; case-study card stacks; FAQ rows collapse.
- `520px` — workflow + stack matrix go single-column.

Mobile spec: nav links hide below 840px (a hamburger menu is out of scope for the prototype — add one in your stack if you want it; otherwise the right-side CTA button remains).

## State

The only stateful UI on the main page is the **Crackz product tour tab switcher**:

```js
const [active, setActive] = useState("summary");
// click handler on each tab: setActive(tab.id)
// the displayed shot/caption/meta are derived from TOUR_SHOTS.find(s => s.id === active)
```

There's no auth, no fetch, no form submission. The contact CTA is a `mailto:` link.

## Assets

All assets are committed in this bundle under `assets/`.

| File | Source | Use |
|---|---|---|
| `assets/crackz-logo.png` | Crackz Design System | Hero visual, Contact CTA background, Case study (consulting) background, Crackz section header thumbnail |
| `assets/crackz-splash.png` | Crackz Design System | Available, not used by default — alternate hero option |
| `assets/logo-icon.png` | Crackz Design System | Legacy / alternate brand mark — not used in current layout |
| `assets/icon-run.png` · `icon-train.png` · `icon-settings.png` · `icon-refresh.png` | Crackz Design System | Available — not used in current layout |
| `assets/gui/project_summary_view.png` | Crackz docs | GUI tour — "Project" tab |
| `assets/gui/mask_editor_view.png` | Crackz docs | GUI tour — "Mask Editor" tab |
| `assets/gui/training_run_view.png` | Crackz docs | GUI tour — "Training" tab |
| `assets/gui/detection_run_view.png` | Crackz docs | GUI tour — "Detection" tab |
| `fonts/SourceSans3-VariableFont_wght.ttf` | Google Fonts (SIL OFL) | Brand face — upright |
| `fonts/SourceSans3-Italic-VariableFont_wght.ttf` | Google Fonts (SIL OFL) | Brand face — italic |

The brand-mark SVG in the top-left nav is inline in the JSX (`BrandMark` / `ConsBrandMark`) — copy the path data verbatim.

## Files in this bundle

```
design_handoff_anaxiatech_site/
├── README.md               ← this file
├── index.html              ← entry point for main landing
├── consulting.html         ← entry point for AI Consulting
├── app.jsx                 ← main page React component (Hero, Crackz, Industries, …)
├── consulting.jsx          ← consulting page React component
├── tweaks-panel.jsx        ← in-prototype Tweaks panel — IGNORE for production
├── styles/
│   ├── site.css            ← all styling
│   └── tokens.css          ← design tokens (variables)
├── fonts/                  ← bundled Source Sans 3
└── assets/                 ← images, GUI screenshots
```

### What to ignore

- **`tweaks-panel.jsx`** and the `<TweaksPanel>` block at the bottom of each `App()` — this is in-prototype UI for the user to flip between hero variants / accents / densities. **Do not ship it in production.** Pick one hero variant and one accent (defaults: `heroVariant: "split"`, `accent: "aqua"`) and remove the panel.
- The hero variants `full` and `type` (full-bleed background image, oversized type) are unused if you ship the default split layout. The CSS for them is in `site.css` (`.hero--full`, `.hero--type`) — feel free to delete those rule blocks.
- The `EDITMODE-BEGIN/END` JSON comment blocks in the JSX files exist for the prototype host; delete them in production.

### What to keep verbatim

- All copy (every paragraph, every label, every CTA string)
- All tokens in `tokens.css`
- The CSS rules in `site.css` that aren't variant-related (everything outside `.hero--full`, `.hero--type`, `[data-accent="*"]` other than the default aqua, `[data-density="compact"]`, `[data-layout="*"]`)
- The four GUI screenshots — they are the product proof

## Production checklist

- [ ] Replace in-browser Babel with build-time JSX (Vite / Astro / Next)
- [ ] Strip the Tweaks panel and its JSX import
- [ ] Pin one hero variant (`split` is the default and what was reviewed)
- [ ] Inline-load the brand mark SVG, not raster
- [ ] Add a mobile hamburger / drawer for the nav (currently hidden below 840px)
- [ ] Use static-page hosting (Netlify / Vercel / Cloudflare Pages)
- [ ] Set up forwarded `theresia.lundgren@anaxiatech.se` if it isn't already
- [ ] OG image: use `assets/crackz-logo.png` (1024×1024) — already referenced in the design system
- [ ] Favicon: derive from `assets/logo-icon.png` (Spartan helmet alt mark) OR use a cropped Crackz lightning glyph
- [ ] Verify Org.nr **556673-0056** appears in About + Footer of both pages

## Open questions for the client

1. Should the consulting page be at `/consulting` or `/ai-consulting`? Nav label currently reads "AI Consulting".
2. Currency: prices on the consulting page are in EUR. Confirm or convert to SEK / USD as appropriate.
3. The trusted-by strip lists past client names (SAAB, Ericsson, etc). Confirm permission to use these as logos / wordmarks publicly. If logos are restricted, leave as text wordmarks as designed.
4. Add a `/projects/crackz` deep page? Currently Crackz lives as a section on the main page only.
5. Add LinkedIn / GitHub social links in the footer? The live site references both.

— Generated handoff bundle, ready for Claude Code implementation.
