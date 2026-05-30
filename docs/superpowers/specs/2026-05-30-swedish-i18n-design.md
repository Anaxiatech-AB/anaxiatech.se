# Swedish i18n — Design Spec

**Date:** 2026-05-30  
**Status:** Approved

## Overview

Add a Swedish-language version of the anaxiatech.se site using Astro's built-in i18n routing. Both locales live at symmetric URLs (`/en/`, `/sv/`). The root `/` always redirects to `/en/` by default, but if the user has previously selected Swedish (stored in a cookie), they are sent to `/sv/` instead.

---

## URL Structure

```
/          → redirect to /en/ (default) or /sv/ (if lang cookie = 'sv')
/en/       → English site
/sv/       → Swedish site
```

- No locale prefix on the root; English is the default.
- Root redirect is handled by `src/pages/index.astro` as a client-side meta-refresh (GitHub Pages is static — no server-side redirects).

---

## File Structure

```
src/
  pages/
    index.astro          ← root redirect page (reads cookie, sends to /en/ or /sv/)
    en/
      index.astro        ← English content (current index.astro moved here)
    sv/
      index.astro        ← Swedish content (translated)
  layouts/
    Base.astro           ← gains `lang` and `currentPath` props; adds hreflang, lang switcher
  components/
    CrackzTour.astro     ← unchanged (no translatable text)
  i18n/
    en.ts                ← all English strings as a typed object
    sv.ts                ← all Swedish strings as a typed object
```

---

## Astro i18n Config

```js
// astro.config.mjs
export default defineConfig({
  output: 'static',
  base: '/',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sv'],
    routing: 'manual',
  },
});
```

`routing: 'manual'` gives full control over redirect behavior so the root page can read the cookie before deciding where to send the user.

---

## Root Redirect Page

`src/pages/index.astro` contains no visible content — just a `<script>` that reads `document.cookie` for `lang=sv` and redirects accordingly:

```js
const lang = document.cookie.match(/lang=([^;]+)/)?.[1];
window.location.replace(lang === 'sv' ? '/sv' : '/en');
```

A `<noscript>` meta-refresh to `/en` serves as fallback.

---

## Base Layout Changes

`Base.astro` gains two props:

- `lang: 'en' | 'sv'` — sets `<html lang="...">` and drives switcher active state
- `currentPath: string` — used to build the alternate-locale URL (always `'/en'` or `'/sv'`)

**hreflang tags** added to `<head>`:
```html
<link rel="alternate" hreflang="en" href="https://anaxiatech.se/en" />
<link rel="alternate" hreflang="sv" href="https://anaxiatech.se/sv" />
<link rel="alternate" hreflang="x-default" href="https://anaxiatech.se/en" />
```

**Language switcher** in nav, top-right before "Contact sales":
```
[ EN · SV ]  [ Contact sales ]
```
Active locale is highlighted (white), inactive is muted. Each is a link to the other locale's page. Clicking sets the `lang` cookie (1-year expiry) client-side.

---

## String Architecture

All user-facing strings are extracted into `src/i18n/en.ts` and `src/i18n/sv.ts` as a single deeply-typed object. The page files import the correct locale's strings object and pass values into markup — no runtime i18n library, no dynamic imports.

Example shape:
```ts
export const t = {
  nav: { crackz: 'Crackz', consulting: 'Consulting', contact: 'Contact sales' },
  hero: { eyebrow: '...', title: '...', lede: '...' },
  // ...
}
```

TypeScript ensures both locale files export the same shape (enforced via a shared `Translations` interface).

---

## Translation Guidelines

- Professional B2B Swedish — not literal machine translation
- Proper nouns unchanged: Crackz, Anaxiatech, SAAB, Ericsson, Ocean Discovery, etc.
- Technical terms unchanged where standard in Swedish professional contexts: AI, ML, ROV, DevSecOps, API, etc.
- Engagement model names (AI Pilot, Production AI Sprint, Embedded AI Engineer) stay in English as product names

---

## SEO

- `<html lang="sv">` on Swedish page
- `hreflang` alternate tags on both pages pointing to each other and `x-default`
- Swedish page has Swedish `<title>` and `<meta name="description">`

---

## Cookie

- Name: `lang`
- Values: `'en'` | `'sv'`
- Expiry: 1 year
- Set client-side by the language switcher click handler in `Base.astro`
- Not sensitive — no httpOnly required

---

## Out of Scope

- Third language support (structure supports it but not designed for it now)
- Server-side redirects (GitHub Pages is static)
- Separate domain per locale (e.g., `anaxiatech.com` for English)
- CMS-driven translations
