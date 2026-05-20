# Anaxiatech.se Redesign — Astro Static Site

**Date:** 2026-05-20  
**Status:** Approved for implementation  
**Source:** `web-new/design_handoff_anaxiatech_site/` (Claude design handoff bundle)

---

## Goal

Replace the current vanilla HTML/CSS/JS single-page site with a two-page Astro static site that implements the high-fidelity design from the handoff bundle. Maintain GitHub Pages hosting at anaxiatech.se.

---

## Pages

### 1. `/` — Main landing (`src/pages/index.astro`)

Sections in order, all anchor-linked:

| # | Section | Anchor |
|---|---------|--------|
| 1 | Sticky nav | — |
| 2 | Hero (split variant) | `#top` |
| 3 | Trusted-by strip | — |
| 4 | Crackz featured product | `#crackz` |
| 5 | Consulting promo band | `#consulting-promo` |
| 6 | Capabilities | `#capabilities` |
| 7 | Industries | `#industries` |
| 8 | Projects | `#projects` |
| 9 | About | `#about` |
| 10 | Contact CTA | `#contact` |
| 11 | Footer | — |

### 2. `/consulting` — AI Consulting (`src/pages/consulting.astro`)

Sections in order:

| # | Section | Anchor |
|---|---------|--------|
| 1 | Sticky nav (AI Consulting marked current) | — |
| 2 | Hero with schematic visual | `#top` |
| 3 | Services grid (6 cards) | `#services` |
| 4 | Engagement models (3 cards) | `#engagements` |
| 5 | Process timeline (4 phases) | `#process` |
| 6 | Crackz case study card | `#case-study` |
| 7 | Stack matrix | `#stack` |
| 8 | FAQ (6 Q&A) | `#faq` |
| 9 | Contact CTA | `#contact` |
| 10 | Footer | — |

---

## Architecture

```
anaxiatech.se/
├── src/
│   ├── layouts/
│   │   └── Base.astro           ← <head>, sticky nav, footer
│   ├── pages/
│   │   ├── index.astro          ← main landing
│   │   └── consulting.astro     ← AI Consulting page
│   ├── components/
│   │   └── CrackzTour.astro     ← 4-tab GUI tour with vanilla JS switcher
│   └── styles/
│       ├── tokens.css           ← copied verbatim from bundle
│       └── site.css             ← copied verbatim (variant rules stripped)
├── public/
│   ├── assets/
│   │   ├── gui/                 ← 4 GUI tour screenshots (from bundle)
│   │   ├── crackz-logo.png
│   │   ├── crackz-splash.png
│   │   └── logo-icon.png
│   ├── fonts/
│   │   ├── SourceSans3-VariableFont_wght.ttf
│   │   └── SourceSans3-Italic-VariableFont_wght.ttf
│   ├── CNAME                    ← kept (anaxiatech.se)
│   └── favicon.ico              ← kept from current site
├── astro.config.mjs
├── package.json
└── .github/workflows/deploy.yml ← Astro build → gh-pages branch
```

**Astro config:** `output: 'static'`, `base: '/'`, `trailingSlash: 'never'`.

---

## Navigation

Top nav (64px, glass blur, sticky):

```
[BrandMark SVG] Anaxiatech.se   |  Crackz · Services · AI Consulting · Industries · Projects · About  |  [Contact sales →]
```

- "Services" links to `#capabilities` on `index.astro`
- "AI Consulting" links to `/consulting`
- "Contact sales" → `#contact` (primary CTA button, right-aligned)
- Below 840px: links collapse, hamburger button opens a drawer overlay
- Active page: "AI Consulting" gets `aria-current="page"` on the consulting page

**BrandMark:** inline SVG (two paths, from `app.jsx` `BrandMark` component — copy verbatim).

---

## Design System

All values from `tokens.css` — do not hard-code hex values.

**Key tokens:**
- Backgrounds: `--bg-base: #11111b`, `--bg-mantle: #1e1e2e`, `--bg-crust: #181825`
- Primary accent: `--aqua: #5eead4` (CTAs, active states, focus rings)
- Text: `--fg-1: #cdd6f4` (primary), `--fg-2: #a6adc8` (secondary)
- Section labels (uppercase eyebrows): `--mauve: #cba6f7`
- Font: Source Sans 3 (bundled, variable), Source Code Pro (Google Fonts, mono)

**Typography:**
- H1 hero: `clamp(40px, 6vw, 88px)`, `line-height: 0.96`, `letter-spacing: -0.025em`
- Section H2: `clamp(32px, 4.4vw, 56px)`, `line-height: 1.02`
- Crackz wordmark: `clamp(48px, 7vw, 96px)`, weight 800

**Buttons:**
- Primary: filled `--aqua`, text `--bg-base` (dark on light), hover `--primary-hover`
- Ghost: transparent, `1px solid var(--surface-1)`, hover `var(--white-a04)` bg
- Link-style: aqua text, arrow `→` translates 3px on hover

---

## Crackz GUI Tour (`CrackzTour.astro`)

Four tabs: **Project · Mask Editor · Training · Detection**

Each tab shows:
- Screenshot (`assets/gui/*.png`)
- Chrome bar title
- Caption headline + body
- 4-row metadata grid

**Tab data** (ported from `TOUR_SHOTS` in `app.jsx`):

| id | tab | screenshot |
|----|-----|------------|
| summary | Project | `project_summary_view.png` |
| mask | Mask Editor | `mask_editor_view.png` |
| train | Training | `training_run_view.png` |
| detect | Detection | `detection_run_view.png` |

**Switching logic:** vanilla JS in a `<script>` block. On `DOMContentLoaded`, attach click handlers to tab buttons. Active tab: `background: var(--aqua-a13)`, `color: var(--aqua)`. Panels toggled via `hidden` attribute (no CSS class toggling needed).

No framework JS shipped. ~25 lines.

---

## Interactions

- **Anchor scrolling:** plain `href="#id"` links, `scroll-behavior: smooth` on `html`
- **Sticky nav:** `backdrop-filter: blur(14px)`, `rgba(17,17,27,0.78)` bg, bottom border `--surface-0`
- **Card hover:** border lifts from `--surface-0` → `--surface-1`, bg lifts to `--surface-0` (capabilities cards)
- **Consulting engagement cards:** hover lifts border + nudges arrow 4px
- **Live dot (hero overlay):** `@keyframes pulse` at 2.4s — only ambient animation
- **Email links:** `mailto:theresia.lundgren@anaxiatech.se?subject=<URL-encoded>`

---

## Responsive

| Breakpoint | Behaviour |
|-----------|-----------|
| 880px | Most grids → single or 2-column |
| 840px | Nav links collapse → hamburger drawer |
| 720px | Hero stacks; case-study card stacks; FAQ rows collapse |
| 520px | Workflow + stack matrix → single column |

Mobile hamburger: button injected in nav right side (below 840px), opens a `<dialog>` or positioned drawer with all nav links.

---

## Build & Deploy

**GitHub Actions** (`.github/workflows/deploy.yml`):
1. Checkout
2. `npm ci`
3. `npx astro build`
4. Deploy `dist/` to `gh-pages` branch using `peaceiris/actions-gh-pages`

GitHub Pages: serve from `gh-pages` branch root. CNAME file in `public/` ensures custom domain survives deploys.

---

## Content Decisions

| Item | Decision |
|------|----------|
| Consulting URL | `/consulting` |
| Prices | EUR (as designed) |
| Trusted-by | Text wordmarks only (SAAB Aurora · SAAB Missiles · Ericsson · Discovery+/Warner · Sony Mobile · Telia · Vodafone) |
| "Services" nav | Points to `#capabilities` section |
| Footer socials | LinkedIn + GitHub (kept from current site) |
| Org.nr | 556673-0056 (in About + Footer, both pages) |
| Crackz™ | Trademark notice in footer |

---

## What's Stripped vs. Kept from Bundle

**Strip:**
- `tweaks-panel.jsx` entirely
- Hero variants `full` and `type` (`.hero--full`, `.hero--type` CSS blocks)
- `[data-accent="*"]` rules except default aqua
- `[data-density="compact"]` rules
- `[data-layout="*"]` rules
- `EDITMODE-BEGIN/END` comment blocks

**Keep verbatim:**
- All copy (every paragraph, label, CTA string)
- All tokens in `tokens.css`
- All non-variant CSS in `site.css`
- Four GUI screenshots
- Font files

---

## Out of Scope

- `/projects/crackz` deep page
- Server-side form handling (mailto remains primary contact)
- Analytics / tracking
- CMS integration
