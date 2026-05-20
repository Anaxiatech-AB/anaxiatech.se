# Astro Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace vanilla HTML/CSS/JS site with a two-page Astro static site implementing the Catppuccin Mocha + aqua design from the handoff bundle.

**Architecture:** Astro static export with Base.astro layout, two pages (index + consulting), one CrackzTour component with vanilla JS tab switcher, CSS from handoff bundle (variant rules stripped). GitHub Actions deploys `dist/` to `gh-pages` branch.

**Tech Stack:** Astro 4.x, vanilla JS (no framework runtime), CSS custom properties, GitHub Actions + peaceiris/actions-gh-pages

---

### Task 1: Create branch and scaffold Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `.gitignore` (update)

- [ ] **Step 1: Create feature branch**

```bash
git checkout -b feat/astro-redesign
```

- [ ] **Step 2: Scaffold Astro**

```bash
npm create astro@latest . -- --template minimal --no-install --no-git
```

If prompted, choose "minimal" template, TypeScript: no, git: no.

- [ ] **Step 3: Verify package.json was created, then install**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 4: Verify astro dev works**

```bash
npx astro dev --port 4321
```

Expected: Server starts at http://localhost:4321. Ctrl+C to stop.

- [ ] **Step 5: Commit scaffold**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore
git commit -m "feat(astro): scaffold astro project"
```

---

### Task 2: Configure Astro and update .gitignore

**Files:**
- Modify: `astro.config.mjs`
- Modify: `.gitignore`

- [ ] **Step 1: Write astro.config.mjs**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  base: '/',
  trailingSlash: 'never',
});
```

- [ ] **Step 2: Update .gitignore** — add these lines if not present:

```
dist/
node_modules/
.astro/
```

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs .gitignore
git commit -m "feat(astro): configure static output"
```

---

### Task 3: Copy assets from bundle to public/

**Files:**
- Create: `public/assets/gui/` (4 GUI screenshots)
- Create: `public/assets/` (crackz-logo.png, logo-icon.png)
- Create: `public/fonts/` (2 variable font TTFs)
- Move: `CNAME`, `favicon.ico` → `public/`

- [ ] **Step 1: Create public directory structure**

```bash
mkdir -p public/assets/gui public/fonts
```

- [ ] **Step 2: Copy GUI screenshots**

```powershell
Copy-Item "web-new\design_handoff_anaxiatech_site\assets\gui\project_summary_view.png" "public\assets\gui\"
Copy-Item "web-new\design_handoff_anaxiatech_site\assets\gui\mask_editor_view.png" "public\assets\gui\"
Copy-Item "web-new\design_handoff_anaxiatech_site\assets\gui\training_run_view.png" "public\assets\gui\"
Copy-Item "web-new\design_handoff_anaxiatech_site\assets\gui\detection_run_view.png" "public\assets\gui\"
```

- [ ] **Step 3: Copy brand assets**

```powershell
Copy-Item "web-new\design_handoff_anaxiatech_site\assets\crackz-logo.png" "public\assets\"
Copy-Item "web-new\design_handoff_anaxiatech_site\assets\logo-icon.png" "public\assets\"
```

- [ ] **Step 4: Copy fonts**

```powershell
Copy-Item "web-new\design_handoff_anaxiatech_site\fonts\SourceSans3-VariableFont_wght.ttf" "public\fonts\"
Copy-Item "web-new\design_handoff_anaxiatech_site\fonts\SourceSans3-Italic-VariableFont_wght.ttf" "public\fonts\"
```

- [ ] **Step 5: Copy CNAME and favicon**

```powershell
Copy-Item "CNAME" "public\CNAME"
Copy-Item "favicon.ico" "public\favicon.ico"
```

- [ ] **Step 6: Commit**

```bash
git add public/
git commit -m "feat(assets): copy fonts, images, CNAME to public/"
```

---

### Task 4: Create CSS files

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/site.css`

- [ ] **Step 1: Create src/styles/ directory**

```bash
mkdir -p src/styles
```

- [ ] **Step 2: Create tokens.css**

Copy `web-new/design_handoff_anaxiatech_site/styles/tokens.css` verbatim, but update the `@font-face` src paths to use `/fonts/` (public root) instead of `fonts/`:

File: `src/styles/tokens.css`

```css
/* Crackz Design System — Colors & Type */

@font-face {
  font-family: 'Source Sans 3';
  src: url('/fonts/SourceSans3-VariableFont_wght.ttf') format('truetype-variations'),
       url('/fonts/SourceSans3-VariableFont_wght.ttf') format('truetype');
  font-weight: 200 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Source Sans 3';
  src: url('/fonts/SourceSans3-Italic-VariableFont_wght.ttf') format('truetype-variations'),
       url('/fonts/SourceSans3-Italic-VariableFont_wght.ttf') format('truetype');
  font-weight: 200 900;
  font-style: italic;
  font-display: swap;
}

@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

:root {
  --bg-base:       #11111b;
  --bg-mantle:     #1e1e2e;
  --bg-crust:      #181825;
  --surface-0:     #313244;
  --surface-1:     #45475a;
  --surface-2:     #585b70;
  --fg-1:          #cdd6f4;
  --fg-2:          #a6adc8;
  --fg-3:          #6c7086;
  --fg-4:          #7f849c;
  --aqua:          #5eead4;
  --aqua-glow:     #89dceb;
  --blue:          #89b4fa;
  --mauve:         #cba6f7;
  --success:       #a6e3a1;
  --warning:       #f9e2af;
  --danger:        #f38ba8;
  --medium:        #fab387;
  --aqua-a13:      rgba(94, 234, 212, 0.13);
  --mauve-a13:     rgba(203, 166, 247, 0.13);
  --cyan-a20:      rgba(137, 220, 235, 0.20);
  --white-a04:     rgba(255, 255, 255, 0.04);
  --white-a08:     rgba(255, 255, 255, 0.08);
  --crack-result:  #1E3A1E;
  --error-bg:      #7F1D1D;
  --primary:       var(--aqua);
  --primary-hover: #34d3bb;
  --border:        var(--surface-1);
  --border-subtle: var(--surface-0);
  --bg-panel:      var(--bg-crust);
  --bg-content:    var(--bg-mantle);
  --bg-deep:       var(--bg-base);
  --font-sans:    'Source Sans 3', -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  --font-display: 'Source Sans 3', -apple-system, sans-serif;
  --font-mono:    'Source Code Pro', 'SF Mono', 'Consolas', 'Courier New', monospace;
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
  --weight-regular: 400;
  --weight-medium:  500;
  --weight-semi:    600;
  --weight-bold:    700;
  --weight-black:   800;
  --lh-tight:  1.15;
  --lh-snug:   1.30;
  --lh-normal: 1.50;
  --lh-relaxed:1.65;
  --tracking-tight:  -0.015em;
  --tracking-normal: 0;
  --tracking-wide:   0.08em;
  --tracking-wider:  0.12em;
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
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 5px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 999px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.30);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.50);
  --glow-aqua: 0 0 0 1px var(--aqua), 0 0 24px rgba(94, 234, 212, 0.35);
  --glow-cyan: 0 0 24px rgba(137, 220, 235, 0.40);
  --border-1: 1px solid var(--surface-1);
  --border-subtle-1: 1px solid var(--surface-0);
  --border-accent: 2px solid var(--aqua);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast:   120ms;
  --dur-medium: 200ms;
  --dur-slow:   320ms;
}

html, body {
  background: var(--bg-mantle);
  color: var(--fg-1);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  line-height: var(--lh-normal);
  -webkit-font-smoothing: antialiased;
}

.h-display {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--weight-bold);
  line-height: var(--lh-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--fg-1);
}
.h1 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  line-height: var(--lh-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--fg-1);
}
.h2 {
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  line-height: var(--lh-snug);
  color: var(--fg-1);
}
.h3 {
  font-size: var(--text-lg);
  font-weight: var(--weight-bold);
  line-height: var(--lh-snug);
  color: var(--fg-1);
}
.h4 {
  font-size: var(--text-md);
  font-weight: var(--weight-semi);
  color: var(--fg-1);
}
.p    { font-size: var(--text-sm); color: var(--fg-1); line-height: var(--lh-normal); }
.p-lg { font-size: var(--text-md); color: var(--fg-1); line-height: var(--lh-relaxed); }
.sub  { font-size: var(--text-sm); color: var(--fg-2); }
.hint { font-size: var(--text-xs); color: var(--fg-3); }
.code { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--fg-1); }

.section-label {
  font-size: 11px;
  font-weight: var(--weight-semi);
  color: var(--mauve);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

kbd, .kbd {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  background: var(--surface-0);
  border: 1px solid var(--surface-1);
  border-radius: var(--radius-sm);
  padding: 1px 6px;
  color: var(--fg-2);
}
```

- [ ] **Step 3: Create site.css**

Copy `web-new/design_handoff_anaxiatech_site/styles/site.css` verbatim with these changes:
1. Replace `@import url("./tokens.css");` with nothing (tokens.css imported separately in layout)
2. Remove the three variant blocks:
   - `[data-accent="mauve"] { ... }` (lines 32-38)
   - `[data-accent="amber"] { ... }` (lines 39-44)
   - `[data-density="compact"] { ... }` (lines 46-49)
3. Remove `[data-layout="text-heavy"] ...` block (lines 1053-1056)
4. Remove `[data-layout="visual"] ...` block (lines 1059)
5. Fix image paths: change `url("../assets/` to `url("/assets/`

The `:root` section keeps all vars except the removed data-accent/density overrides. Everything else is verbatim.

- [ ] **Step 4: Commit**

```bash
git add src/styles/
git commit -m "feat(styles): add tokens.css and site.css from design bundle"
```

---

### Task 5: Create Base.astro layout

**Files:**
- Create: `src/layouts/Base.astro`

- [ ] **Step 1: Write Base.astro**

```astro
---
interface Props {
  title: string;
  description?: string;
  currentPage?: 'home' | 'consulting';
}
const { title, description = 'Anaxiatech AB — AI-driven defect detection for infrastructure and manufacturing.', currentPage = 'home' } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="icon" href="/favicon.ico" />
  <link rel="stylesheet" href="/src/styles/tokens.css" />
  <link rel="stylesheet" href="/src/styles/site.css" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
</head>
<body>
  <nav class="nav">
    <div class="wrap nav__inner">
      <a href="/" class="nav__brand">
        <span class="nav__brand-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
            <path d="M3 4 L11 12 L7 12 L17 21" />
            <path d="M14 3 L21 10" opacity="0.5" />
          </svg>
        </span>
        <span>Anaxiatech<span class="nav__brand-tld">.se</span></span>
      </a>
      <div class="nav__links">
        <a href="/#crackz">Crackz</a>
        <a href="/consulting" class:list={[{ 'is-current': currentPage === 'consulting' }]}>AI Consulting</a>
        <a href="/#capabilities">Services</a>
        <a href="/#industries">Industries</a>
        <a href="/#projects">Projects</a>
        <a href="/#about">About</a>
      </div>
      <div class="nav__cta">
        <button class="nav__hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <line x1="2" y1="5" x2="18" y2="5"/>
            <line x1="2" y1="10" x2="18" y2="10"/>
            <line x1="2" y1="15" x2="18" y2="15"/>
          </svg>
        </button>
        <a href="/#contact" class="btn btn--primary">Contact sales</a>
      </div>
    </div>
  </nav>

  <div id="mobile-menu" class="mobile-menu" aria-hidden="true">
    <div class="mobile-menu__inner">
      <div class="mobile-menu__header">
        <span class="mobile-menu__title">Menu</span>
        <button class="mobile-menu__close" aria-label="Close menu">✕</button>
      </div>
      <nav class="mobile-menu__links">
        <a href="/#crackz">Crackz</a>
        <a href="/consulting" class:list={[{ 'is-current': currentPage === 'consulting' }]}>AI Consulting</a>
        <a href="/#capabilities">Services</a>
        <a href="/#industries">Industries</a>
        <a href="/#projects">Projects</a>
        <a href="/#about">About</a>
        <a href="/#contact" class="btn btn--primary" style="margin-top: 12px;">Contact sales</a>
      </nav>
    </div>
  </div>

  <slot />

  <footer class="footer">
    <div class="wrap">
      <div class="footer__top">
        <div>
          <div class="footer__brand">Anaxiatech AB</div>
          <p class="kicker" style="margin-top: 10px; max-width: 38ch;">
            Engineering systems that work — above and below the surface. Stockholm-based.
          </p>
        </div>
        <div class="footer__col">
          <h5>Product</h5>
          <ul>
            <li><a href="/#crackz">Crackz</a></li>
            <li><a href="/#tour">Product tour</a></li>
            <li><a href="/#industries">Industries</a></li>
            <li><a href="/#contact">Pricing</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h5>Company</h5>
          <ul>
            <li><a href="/#about">About</a></li>
            <li><a href="/#projects">Projects</a></li>
            <li><a href="/#capabilities">Capabilities</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h5>Consulting</h5>
          <ul>
            <li><a href="/consulting#services">Services</a></li>
            <li><a href="/consulting#engagements">Engagements</a></li>
            <li><a href="/consulting#contact">Get in touch</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© {new Date().getFullYear()} Anaxiatech AB · Org.nr 556673-0056</span>
        <span>Crackz™ is a trademark of Anaxiatech AB</span>
      </div>
    </div>
  </footer>

  <script>
    // Mobile hamburger
    const btn = document.querySelector('.nav__hamburger') as HTMLButtonElement;
    const menu = document.getElementById('mobile-menu') as HTMLElement;
    const closeBtn = menu?.querySelector('.mobile-menu__close') as HTMLButtonElement;

    function openMenu() {
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    btn?.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    menu?.addEventListener('click', (e) => {
      if (e.target === menu) closeMenu();
    });
    menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  </script>
</body>
</html>
```

- [ ] **Step 2: Add mobile menu CSS** to `src/styles/site.css` (append at end):

```css
/* ── Mobile hamburger nav ──────────────────────────────────── */
.nav__hamburger {
  display: none;
  background: transparent;
  border: 1px solid var(--surface-1);
  border-radius: var(--radius-sm);
  color: var(--fg-2);
  padding: 6px 8px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}
@media (max-width: 840px) {
  .nav__hamburger { display: flex; }
  .nav__cta .btn--primary { display: none; }
}

.mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(17, 17, 27, 0.6);
  backdrop-filter: blur(4px);
}
.mobile-menu.is-open { display: flex; justify-content: flex-end; }
.mobile-menu__inner {
  width: min(320px, 85vw);
  height: 100%;
  background: var(--bg-crust);
  border-left: 1px solid var(--surface-0);
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 8px;
}
.mobile-menu__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.mobile-menu__title {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--fg-3);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}
.mobile-menu__close {
  background: transparent;
  border: 1px solid var(--surface-1);
  border-radius: var(--radius-sm);
  color: var(--fg-2);
  width: 28px; height: 28px;
  display: grid; place-items: center;
  font-size: 14px;
  cursor: pointer;
}
.mobile-menu__links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mobile-menu__links a {
  font-size: 17px;
  color: var(--fg-2);
  font-weight: var(--weight-medium);
  padding: 10px 8px;
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.mobile-menu__links a:hover { color: var(--fg-1); background: var(--white-a04); }
.mobile-menu__links a.is-current { color: var(--accent); }
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro src/styles/site.css
git commit -m "feat(layout): add Base.astro with nav, footer, mobile menu"
```

---

### Task 6: Create CrackzTour component

**Files:**
- Create: `src/components/CrackzTour.astro`

- [ ] **Step 1: Write CrackzTour.astro**

```astro
---
// No props — data is static
---

<div id="tour" class="tour">
  <div class="tour__head">
    <div>
      <span class="eyebrow">Product tour</span>
      <h3 class="h2" style="margin-top: 10px;">The desktop app, end to end.</h3>
    </div>
    <div class="tour__tabs" role="tablist">
      <button role="tab" aria-selected="true" data-tour-tab="summary" class="tour__tab active">
        <span class="glyph">▦</span>Project
      </button>
      <button role="tab" aria-selected="false" data-tour-tab="mask" class="tour__tab">
        <span class="glyph">✎</span>Mask Editor
      </button>
      <button role="tab" aria-selected="false" data-tour-tab="train" class="tour__tab">
        <span class="glyph">↗</span>Training
      </button>
      <button role="tab" aria-selected="false" data-tour-tab="detect" class="tour__tab">
        <span class="glyph">◉</span>Detection
      </button>
    </div>
  </div>

  <div class="tour__viewport">
    <!-- summary panel -->
    <div data-tour-panel="summary">
      <div class="tour__window-chrome">
        <div class="dots"><span></span><span></span><span></span></div>
        <span class="title mono">demo-project · crackz-gui v0.81.0</span>
      </div>
      <img class="tour__shot" src="/assets/gui/project_summary_view.png" alt="Project Summary" />
      <div class="tour__caption">
        <div>
          <h4>Project Summary</h4>
          <p>Single pane for project state — model config, training schedule, detection parameters and data paths. Everything reproducible from one YAML.</p>
        </div>
        <div class="tour__caption-meta">
          <div class="row"><span class="k">Backbone</span><span class="v">SegFormer-B2</span></div>
          <div class="row"><span class="k">Input</span><span class="v">512 × 512 px</span></div>
          <div class="row"><span class="k">Threshold</span><span class="v">0.50</span></div>
          <div class="row"><span class="k">Loss</span><span class="v">Combo (Dice + BCE)</span></div>
        </div>
      </div>
    </div>

    <!-- mask panel -->
    <div data-tour-panel="mask" hidden>
      <div class="tour__window-chrome">
        <div class="dots"><span></span><span></span><span></span></div>
        <span class="title mono">MASK_EDITOR · garaymc_cracks_train_0.jpg</span>
      </div>
      <img class="tour__shot" src="/assets/gui/mask_editor_view.png" alt="Mask Editor" />
      <div class="tour__caption">
        <div>
          <h4>Mask Editor</h4>
          <p>Brush-driven annotation built for production scale. 50–80% faster than CVAT on dense crack imagery, with mask propagation across image series.</p>
        </div>
        <div class="tour__caption-meta">
          <div class="row"><span class="k">Tool</span><span class="v">Brush 20px</span></div>
          <div class="row"><span class="k">Category</span><span class="v">Crack</span></div>
          <div class="row"><span class="k">Throughput</span><span class="v">~140 imgs/hr</span></div>
          <div class="row"><span class="k">Format</span><span class="v">PNG · binary or multi-class</span></div>
        </div>
      </div>
    </div>

    <!-- train panel -->
    <div data-tour-panel="train" hidden>
      <div class="tour__window-chrome">
        <div class="dots"><span></span><span></span><span></span></div>
        <span class="title mono">training · in progress</span>
      </div>
      <img class="tour__shot" src="/assets/gui/training_run_view.png" alt="Training Run" />
      <div class="tour__caption">
        <div>
          <h4>Training Run</h4>
          <p>Live training with live metrics — Epoch · Loss · Val F1 · IoU · ETA. Built on PyTorch Lightning; checkpoints record their annotation schema so incompatible models are flagged automatically.</p>
        </div>
        <div class="tour__caption-meta">
          <div class="row"><span class="k">Engine</span><span class="v">PyTorch Lightning</span></div>
          <div class="row"><span class="k">Encoders</span><span class="v">SegFormer B0–B5</span></div>
          <div class="row"><span class="k">Optimizer</span><span class="v">AdamW, lr 1e-3</span></div>
          <div class="row"><span class="k">GPU</span><span class="v">CUDA · ROCm · CPU</span></div>
        </div>
      </div>
    </div>

    <!-- detect panel -->
    <div data-tour-panel="detect" hidden>
      <div class="tour__window-chrome">
        <div class="dots"><span></span><span></span><span></span></div>
        <span class="title mono">detection · run preview</span>
      </div>
      <img class="tour__shot" src="/assets/gui/detection_run_view.png" alt="Detection Results" />
      <div class="tour__caption">
        <div>
          <h4>Detection Results</h4>
          <p>Galleries, summary tabs, severity buckets. Defect-detected cards are tinted in a dark green so flagged findings read at a glance across thousands of images — whether they're harbor pier scans or factory weld inspections.</p>
        </div>
        <div class="tour__caption-meta">
          <div class="row"><span class="k">Output</span><span class="v">Annotated PNG · GeoJSON</span></div>
          <div class="row"><span class="k">Severity</span><span class="v">High · Med · Low · Clean</span></div>
          <div class="row"><span class="k">Tiling</span><span class="v">Auto 512px overlap</span></div>
          <div class="row"><span class="k">Confidence</span><span class="v">Per-pixel + per-image</span></div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll<HTMLButtonElement>('[data-tour-tab]');
    const panels = document.querySelectorAll<HTMLElement>('[data-tour-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tourTab;

        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach(p => p.hidden = true);

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const panel = document.querySelector<HTMLElement>(`[data-tour-panel="${target}"]`);
        if (panel) panel.hidden = false;
      });
    });
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CrackzTour.astro
git commit -m "feat(component): add CrackzTour with vanilla JS tab switcher"
```

---

### Task 7: Create index.astro (main landing page)

**Files:**
- Create: `src/pages/index.astro`
- Delete: `src/pages/index.astro` (the scaffold default, replace it)

- [ ] **Step 1: Write src/pages/index.astro**

```astro
---
import Base from '../layouts/Base.astro';
import CrackzTour from '../components/CrackzTour.astro';
---
<Base title="Anaxiatech AB — AI Defect Detection Software" currentPage="home">

  <!-- Hero -->
  <header id="top" class="hero">
    <div class="wrap">
      <div class="hero__grid">
        <div class="hero__copy">
          <span class="eyebrow">Anaxiatech AB · Stockholm</span>
          <h1 class="h1 hero__title">
            Engineering systems that work — <span class="accent">above and below the surface.</span>
          </h1>
          <p class="lede hero__lede">
            We build AI-driven defect-detection software for infrastructure and manufacturing.
            Our flagship product, Crackz, is in production across harbors, bridges, factories
            and energy assets — reducing inspection costs by up to 70% while improving safety
            and consistency.
          </p>
          <div class="hero__ctas">
            <a href="#crackz" class="btn btn--primary">Explore Crackz</a>
            <a href="/consulting" class="btn btn--ghost">AI consulting</a>
          </div>
          <div class="hero__meta">
            <div class="hero__meta-item">
              <span class="label">Founded</span>
              <span class="value">2022 · Stockholm</span>
            </div>
            <div class="hero__meta-item">
              <span class="label">Domain</span>
              <span class="value">Infrastructure · Manufacturing</span>
            </div>
            <div class="hero__meta-item">
              <span class="label">Delivery</span>
              <span class="value">Product · Consulting</span>
            </div>
          </div>
        </div>
        <div class="hero__visual">
          <img src="/assets/crackz-logo.png" alt="Crackz brand imagery: cracked stone with electric teal lightning forming an X" />
          <div class="hero__visual-overlay">
            <span class="corner"><span class="dot"></span> Detection · live</span>
            <span class="ticks">
              <span></span><span></span><span></span><span></span><span></span><span></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Trusted-by strip -->
  <section class="strip">
    <div class="wrap strip__inner">
      <span class="strip__label">Trusted by</span>
      <div class="strip__items">
        <span>SAAB Aurora</span>
        <span class="dot">·</span>
        <span>SAAB Missiles</span>
        <span class="dot">·</span>
        <span>Ericsson</span>
        <span class="dot">·</span>
        <span>Discovery+ / Warner</span>
        <span class="dot">·</span>
        <span>Sony Mobile</span>
        <span class="dot">·</span>
        <span>Telia · Vodafone</span>
      </div>
    </div>
  </section>

  <!-- Crackz featured product -->
  <section id="crackz" class="section product">
    <div class="wrap">
      <div class="product__header">
        <div class="product__title">
          <span class="product__title-mark">
            <img src="/assets/crackz-logo.png" alt="" />
          </span>
          <div>
            <span class="eyebrow">Flagship product · v0.81</span>
            <h2>Crackz.</h2>
            <p class="product__sub">
              AI-powered defect detection — cracks, corrosion, surface flaws, weld defects.
              Built for harbor and bridge infrastructure; deployed across factories, energy assets
              and manufacturing QA. Desktop, web, and CLI from one source-available codebase.
            </p>
          </div>
        </div>
        <div class="product__copy">
          <p class="lede">
            Process thousands of inspection images in hours instead of weeks. Detect issues before
            they become critical. Document everything for the audit trail.
          </p>
          <div class="hero__ctas">
            <a href="#contact" class="btn btn--primary">Request a demo</a>
            <a href="#tour" class="btn btn--ghost">See the product</a>
          </div>
        </div>
      </div>

      <!-- Stats band -->
      <div class="stats">
        <div class="stats__item">
          <div class="stats__value">70<span class="unit">%</span></div>
          <div class="stats__label">Cost reduction</div>
          <div class="stats__caption">vs. traditional manual inspection cycles</div>
        </div>
        <div class="stats__item">
          <div class="stats__value">5<span class="unit">×</span></div>
          <div class="stats__label">Faster cycles</div>
          <div class="stats__caption">on harbor concrete · generalises to other surfaces</div>
        </div>
        <div class="stats__item">
          <div class="stats__value">90<span class="unit">%+</span></div>
          <div class="stats__label">Detection accuracy</div>
          <div class="stats__caption">on validation datasets, binary segmentation</div>
        </div>
        <div class="stats__item">
          <div class="stats__value">$25–75<span class="unit">K</span></div>
          <div class="stats__label">Annual savings</div>
          <div class="stats__caption">typical per inspection program</div>
        </div>
      </div>

      <!-- GUI Tour component -->
      <CrackzTour />

      <!-- Workflow -->
      <div class="workflow">
        <div class="workflow__step">
          <h4>Import</h4>
          <p>Drop in infrastructure, manufacturing or facility imagery. Automatic raw/train/val/test split, EXIF preserved end-to-end.</p>
          <div class="cmd"><span class="prompt">$</span>crackz import-images --src ./photos</div>
        </div>
        <div class="workflow__step">
          <h4>Annotate</h4>
          <p>Mask editor with brush, propagation across image series, and category-aware multi-class taxonomies.</p>
          <div class="cmd"><span class="prompt">›</span>Tools → Mask Editor</div>
        </div>
        <div class="workflow__step">
          <h4>Train</h4>
          <p>SegFormer-B2 by default; swap encoders, override hyperparameters at runtime. PyTorch Lightning underneath.</p>
          <div class="cmd"><span class="prompt">$</span>crackz train --epochs 20</div>
        </div>
        <div class="workflow__step">
          <h4>Detect</h4>
          <p>Run across thousands of images. Severity buckets, annotated PNGs, GeoJSON output ready for QGIS or GIS pipelines.</p>
          <div class="cmd"><span class="prompt">$</span>crackz detect run</div>
        </div>
      </div>

      <!-- Deployment paths -->
      <div class="paths">
        <article class="path path--featured">
          <span class="path__tag">Fastest path</span>
          <h3 class="h3">Use pre-trained models</h3>
          <p>Quick deployment with ready-made checkpoints. Suited to standard crack-detection scenarios across concrete and steel.</p>
          <ul>
            <li>Production-ready in days, not quarters</li>
            <li>Consistent results across sites and inspectors</li>
            <li>Zero training data required to start</li>
          </ul>
        </article>
        <article class="path">
          <span class="path__tag">Most accurate</span>
          <h3 class="h3">Train custom models</h3>
          <p>Maximum accuracy for your domain — bespoke imagery, unusual defect types, multi-class taxonomies.</p>
          <ul>
            <li>100 images for a pilot; 500+ for production-grade</li>
            <li>Domain-specific defect categories</li>
            <li>Active-learning loop to reduce annotation cost</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- Consulting promo band -->
  <section id="consulting-promo" class="promo">
    <div class="wrap promo__inner">
      <div class="promo__copy">
        <span class="eyebrow">AI Consulting · day job</span>
        <h2 class="promo__title">
          Crackz is our product. <span class="accent">Consulting is what we do every day.</span>
        </h2>
        <p class="promo__lede">
          Anaxiatech is led by a senior systems architect with 30+ years of experience.
          We take on focused AI engagements for organisations that need a serious answer to
          a serious question — defense, infrastructure, manufacturing, R&amp;D.
        </p>
        <p class="promo__lede" style="color: var(--fg-3);">
          Active Swedish security clearance · past clients include SAAB, Ericsson, Discovery+ / Warner.
          Fixed-scope pilots from €18,000 · production sprints from €65,000 · embedded retainers.
        </p>
        <div class="promo__ctas">
          <a href="/consulting" class="btn btn--primary">See AI consulting</a>
          <a href="mailto:theresia.lundgren@anaxiatech.se?subject=Consulting%20enquiry" class="btn btn--ghost">Email Theresia</a>
        </div>
      </div>

      <ul class="promo__list">
        <li>
          <a href="/consulting#engagements" style="display: contents; color: inherit;">
            <span class="ix">01</span>
            <span class="body">
              <strong>AI Pilot · 2 weeks</strong>
              <span>Proof on your data. One ML question, answered with numbers.</span>
            </span>
            <span class="arrow">→</span>
          </a>
        </li>
        <li>
          <a href="/consulting#engagements" style="display: contents; color: inherit;">
            <span class="ix">02</span>
            <span class="body">
              <strong>Production AI Sprint · 8 weeks</strong>
              <span>Ship a vertical slice of production ML — model, infra, UI.</span>
            </span>
            <span class="arrow">→</span>
          </a>
        </li>
        <li>
          <a href="/consulting#engagements" style="display: contents; color: inherit;">
            <span class="ix">03</span>
            <span class="body">
              <strong>Embedded AI Engineer · monthly</strong>
              <span>Senior ML capacity without hiring a new headcount.</span>
            </span>
            <span class="arrow">→</span>
          </a>
        </li>
        <li>
          <a href="/consulting#services" style="display: contents; color: inherit;">
            <span class="ix">04</span>
            <span class="body">
              <strong>AI strategy &amp; build/buy · 2 days</strong>
              <span>A defensible second opinion before you spend the budget.</span>
            </span>
            <span class="arrow">→</span>
          </a>
        </li>
      </ul>
    </div>
  </section>

  <!-- Capabilities -->
  <section id="capabilities" class="section">
    <div class="wrap">
      <div class="section-head">
        <div class="section-head__copy">
          <span class="eyebrow">What we build</span>
          <h2 class="h2">Engineering for systems that must not fail.</h2>
          <p class="lede">
            We're a small Stockholm team building production AI for defect detection — across
            infrastructure inspection, manufacturing QA, and energy assets. Crackz is the flagship;
            the capabilities behind it are available for engagement.
          </p>
        </div>
      </div>
      <div class="caps">
        <div class="cap">
          <span class="cap__index">01 / 06</span>
          <div class="cap__title">AI &amp; Automation</div>
          <div class="cap__body">Machine-learning pipelines, computer vision, and data analysis for industrial inspection and decision support. From image to insight.</div>
          <div class="cap__tags">
            <span class="cap__tag">PyTorch</span>
            <span class="cap__tag">Segmentation</span>
            <span class="cap__tag">MLOps</span>
            <span class="cap__tag">NLP</span>
          </div>
        </div>
        <div class="cap">
          <span class="cap__index">02 / 06</span>
          <div class="cap__title">System &amp; Solution Architecture</div>
          <div class="cap__body">Hands-on architecture for complex enterprise systems — microservices, domain-driven design, full-stack delivery across Java, Python, Go and modern frontends.</div>
          <div class="cap__tags">
            <span class="cap__tag">Microservices</span>
            <span class="cap__tag">DDD</span>
            <span class="cap__tag">API design</span>
          </div>
        </div>
        <div class="cap">
          <span class="cap__index">03 / 06</span>
          <div class="cap__title">Platform &amp; DevSecOps</div>
          <div class="cap__body">Cloud-native infrastructure, IaC and CI/CD for scalable, resilient systems. Secure GitOps, observability, hybrid and edge deployments across AWS, Azure and GCP.</div>
          <div class="cap__tags">
            <span class="cap__tag">AWS</span>
            <span class="cap__tag">Azure</span>
            <span class="cap__tag">GCP</span>
            <span class="cap__tag">Kubernetes</span>
          </div>
        </div>
        <div class="cap">
          <span class="cap__index">04 / 06</span>
          <div class="cap__title">Simulation &amp; Digital Environments</div>
          <div class="cap__body">Unreal Engine, photogrammetry and digital-twin pipelines for defense and offshore. Real-time rendering, underwater ROV simulation, interactive visualisation.</div>
          <div class="cap__tags">
            <span class="cap__tag">Unreal</span>
            <span class="cap__tag">C++</span>
            <span class="cap__tag">Photogrammetry</span>
          </div>
        </div>
        <div class="cap">
          <span class="cap__index">05 / 06</span>
          <div class="cap__title">Government &amp; Defense</div>
          <div class="cap__body">High-security contracting with active Swedish security clearance. Classified-systems development, audits and compliance, CTO and tech-lead consulting.</div>
          <div class="cap__tags">
            <span class="cap__tag">Cleared</span>
            <span class="cap__tag">Compliance</span>
            <span class="cap__tag">CTO</span>
          </div>
        </div>
        <div class="cap">
          <span class="cap__index">06 / 06</span>
          <div class="cap__title">Drones, Autonomous &amp; Mesh</div>
          <div class="cap__body">UAS / ROV system integration, sensor fusion, edge AI — paired with off-grid comms via Meshtastic / LoRa, APRS and HAM-bridged telemetry pipelines.</div>
          <div class="cap__tags">
            <span class="cap__tag">UAS</span>
            <span class="cap__tag">LoRa</span>
            <span class="cap__tag">APRS</span>
            <span class="cap__tag">Edge AI</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Industries -->
  <section id="industries" class="section section--tight" style="background: var(--bg-mantle); border-top: 1px solid var(--surface-0); border-bottom: 1px solid var(--surface-0);">
    <div class="wrap">
      <div class="section-head">
        <div class="section-head__copy">
          <span class="eyebrow">Where Crackz runs</span>
          <h2 class="h2">Built for the field, the line, and the audit.</h2>
        </div>
      </div>
      <div class="industries">
        <article class="industry">
          <div class="industry__top">
            <div class="industry__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 20h18" />
                <path d="M5 20V8h4v12" />
                <path d="M15 20V12h4v8" />
                <path d="M3 14l3-2 3 2" />
                <path d="M13 17l3-2 3 2" />
              </svg>
            </div>
            <span class="industry__name">Harbors &amp; Infrastructure</span>
          </div>
          <h4>Concrete deterioration across piers, docks, bridges and seawalls.</h4>
          <p>Drone and handheld imagery into measured, ranked defect patterns — without sending divers or rope-access teams in first. The use case Crackz was originally built for.</p>
          <div class="industry__metrics">
            <div class="industry__metric"><div class="num">5×</div><div class="lbl">Faster cycles</div></div>
            <div class="industry__metric"><div class="num">90%+</div><div class="lbl">Validation accuracy</div></div>
          </div>
        </article>
        <article class="industry">
          <div class="industry__top">
            <div class="industry__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12h20" />
                <path d="M4 12V8m4 4V6m4 6V4m4 8V6m4 6V8" />
                <path d="M2 18h20" />
              </svg>
            </div>
            <span class="industry__name">Manufacturing &amp; QA</span>
          </div>
          <h4>Surface-defect detection on production lines and finished goods.</h4>
          <p>Scratches, voids, weld defects, corrosion, paint failures, casting porosity. Trainable on your taxonomy — multi-class segmentation, not just crack/no-crack. Inline or post-process.</p>
          <div class="industry__metrics">
            <div class="industry__metric"><div class="num">Multi-class</div><div class="lbl">Per-pixel</div></div>
            <div class="industry__metric"><div class="num">Sub-second</div><div class="lbl">Inference</div></div>
          </div>
        </article>
        <article class="industry">
          <div class="industry__top">
            <div class="industry__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 20V10l5 3V7l5 4V4l8 16z" />
                <path d="M3 20h18" />
              </svg>
            </div>
            <span class="industry__name">Industrial &amp; Energy</span>
          </div>
          <h4>Chemical, refinery, wind, and rail asset integrity.</h4>
          <p>Remote analysis of imagery from maintenance teams, robotic inspectors, or autonomous drones. Predictive maintenance, condition-based renewal — instead of emergency response.</p>
          <div class="industry__metrics">
            <div class="industry__metric"><div class="num">~zero</div><div class="lbl">Confined entries</div></div>
            <div class="industry__metric"><div class="num">24/7</div><div class="lbl">Pipeline ready</div></div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Projects -->
  <section id="projects" class="section section--tight">
    <div class="wrap">
      <div class="section-head">
        <div class="section-head__copy">
          <span class="eyebrow">Adjacent work</span>
          <h2 class="h2">Other projects from the lab.</h2>
          <p class="lede">
            Crackz is the commercial product. These are the research and tooling efforts
            that feed back into it — marine archaeology, 3D mesh tooling, and other custom systems.
          </p>
        </div>
      </div>
      <div class="projects">
        <article class="proj">
          <div class="proj__head">
            <span class="proj__num">01</span>
            <span class="proj__status proj__status--live">In production</span>
          </div>
          <h3>Crackz</h3>
          <p>Commercial source-available AI defect-detection software — infrastructure and manufacturing. Desktop · web · CLI · Docker.</p>
          <ul class="proj__bullets">
            <li><span class="k">Domain</span> Infrastructure AI</li>
            <li><span class="k">Stack</span> PySide6 · PyTorch · Streamlit</li>
            <li><span class="k">License</span> Commercial source-available</li>
          </ul>
        </article>
        <article class="proj">
          <div class="proj__head">
            <span class="proj__num">02</span>
            <span class="proj__status proj__status--live">Active</span>
          </div>
          <h3>WreckGame</h3>
          <p>Unreal Engine ROV training environment for subsea operations. Photogrammetry-captured wreck sites, physics-accurate underwater dynamics, turbidity modelling — mission rehearsal without the boat.</p>
          <ul class="proj__bullets">
            <li><span class="k">Domain</span> Defense · Offshore training</li>
            <li><span class="k">Stack</span> Unreal Engine · C++</li>
            <li><span class="k">Status</span> In active development</li>
          </ul>
        </article>
        <article class="proj">
          <div class="proj__head">
            <span class="proj__num">03</span>
            <span class="proj__status proj__status--rnd">Partnership</span>
          </div>
          <h3>Ocean Discovery / SubBaltica</h3>
          <p>Long-running partnership with the two sister companies behind the M/S Estonia reinvestigation, the Kraveln (1524) scan, and BBC / Discovery deep-water assignments. We run their IT, camera, networking and 3D-reconstruction pipelines.</p>
          <ul class="proj__bullets">
            <li><span class="k">Domain</span> Subsea · Marine archaeology</li>
            <li><span class="k">Stack</span> Photogrammetry · Sensor fusion</li>
            <li><span class="k">Status</span> Ongoing</li>
          </ul>
        </article>
        <article class="proj">
          <div class="proj__head">
            <span class="proj__num">04</span>
            <span class="proj__status proj__status--live">Open source</span>
          </div>
          <h3>meshtop</h3>
          <p>Terminal monitor and APRS / GPS bridge for Meshtastic LoRa mesh networks. Off-grid comms tooling for maritime tracking, drone telemetry bridging, and HAM-bridged field operations.</p>
          <ul class="proj__bullets">
            <li><span class="k">Domain</span> Mesh radio · Field ops</li>
            <li><span class="k">Stack</span> Python · LoRa · APRS · BLE</li>
            <li><span class="k">Status</span> github.com/theresiasnow/meshtop</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- About -->
  <section id="about" class="section">
    <div class="wrap about">
      <div class="section-head__copy" style="align-self: start;">
        <span class="eyebrow">About Anaxiatech</span>
        <h2 class="h2">A Stockholm engineering studio.</h2>
      </div>
      <div class="about__copy">
        <p>
          Anaxiatech AB is a Swedish technology company — founded and led by Theresia Lundgren, a systems
          architect with 30+ years of experience across AI, DevSecOps and applied R&amp;D. We design and
          ship production software for problems where the wrong answer is expensive: infrastructure
          inspection, manufacturing QA, defense systems, marine archaeology.
        </p>
        <div class="about__signature">
          "Engineering systems that work — above and below the surface."
        </div>
        <p>
          Hands-on work, end to end: we write the model code, ship the desktop app, run the Azure Batch
          jobs, and sit with operators while they review the results. Past and current clients include
          SAAB, Ericsson, Discovery+ / Warner Brothers, and Swedish government agencies. Long-running
          technical partnership with Ocean Discovery AB and SubBaltica AB on subsea expeditions.
        </p>
        <div class="about__meta">
          <div class="about__meta-item">
            <span class="k">Based in</span>
            <span class="v">Stockholm · Västervik</span>
          </div>
          <div class="about__meta-item">
            <span class="k">Org. nr</span>
            <span class="v mono">556673-0056</span>
          </div>
          <div class="about__meta-item">
            <span class="k">Experience</span>
            <span class="v">30+ years</span>
          </div>
          <div class="about__meta-item">
            <span class="k">Lead product</span>
            <span class="v">Crackz</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact CTA -->
  <section id="contact" class="section section--tight">
    <div class="wrap">
      <div class="cta">
        <div class="cta__bg"></div>
        <div class="cta__inner">
          <div>
            <span class="eyebrow">Talk to us</span>
            <h2 class="h2" style="margin-top: 14px;">Bring Crackz into your inspection or QA program.</h2>
            <p class="cta__lede">
              Pricing, proof-of-concept projects, enterprise support, and on-prem licensing.
              We respond within one business day.
            </p>
          </div>
          <div class="cta__contact">
            <div>
              <div class="cta__contact-label">Email · Theresia Lundgren</div>
              <div class="cta__email">theresia.lundgren@anaxiatech.se</div>
            </div>
            <a href="mailto:theresia.lundgren@anaxiatech.se?subject=Crackz%20enterprise%20enquiry" class="btn btn--primary">
              Open in mail
            </a>
            <div class="cta__rows">
              <div class="cta__row"><span class="k">Based in</span><span>Stockholm · Västervik</span></div>
              <div class="cta__row"><span class="k">Response</span><span>Within 1 business day</span></div>
              <div class="cta__row"><span class="k">Licensing</span><span>Commercial source-available</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <style>
    html { scroll-behavior: smooth; }
  </style>

</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(page): add main landing page index.astro"
```

---

### Task 8: Create consulting.astro page

**Files:**
- Create: `src/pages/consulting.astro`

- [ ] **Step 1: Write src/pages/consulting.astro**

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="AI Consulting — Anaxiatech AB" description="Senior AI engineering for the problems where the wrong answer is expensive. Computer vision, LLM integration, production ML." currentPage="consulting">

  <!-- Hero -->
  <header id="top" class="cons-hero">
    <div class="wrap">
      <div class="cons-hero__grid">
        <div class="cons-hero__copy">
          <span class="eyebrow">Anaxiatech AI consulting</span>
          <h1 class="h1 cons-hero__title">
            Senior AI engineering, <span class="accent">for the problems where the wrong answer is expensive.</span>
          </h1>
          <p class="lede">
            We're the team that built Crackz. We take on AI consulting engagements in computer vision,
            LLM integration, and production ML — for organisations that need a serious answer to a
            serious question. No staff augmentation. No PowerPoint. Working models, shipped.
          </p>
          <div class="hero__ctas">
            <a href="#engagements" class="btn btn--primary">See engagement models</a>
            <a href="#contact" class="btn btn--ghost">Talk to us</a>
          </div>
          <div class="cons-hero__meta">
            <div class="cons-hero__meta-item">
              <span class="label">Focus</span>
              <span class="value">Applied AI / ML</span>
            </div>
            <div class="cons-hero__meta-item">
              <span class="label">Team</span>
              <span class="value">Stockholm · EU remote</span>
            </div>
            <div class="cons-hero__meta-item">
              <span class="label">Clearance</span>
              <span class="value">Swedish gov, active</span>
            </div>
          </div>
        </div>

        <div class="cons-hero__visual">
          <div class="cons-hero__visual-head">
            <span><span class="dot"></span>Available · Q3 2026</span>
            <span>04 / 04 lanes</span>
          </div>
          <div class="cons-hero__visual-body">
            <div class="cons-pill is-active">
              <span class="num">CV-01</span>
              <span class="label">Computer vision pilots</span>
              <span class="tail">2 wks</span>
            </div>
            <div class="cons-pill">
              <span class="num">LLM-02</span>
              <span class="label">LLM &amp; agent integration</span>
              <span class="tail">2–6 wks</span>
            </div>
            <div class="cons-pill">
              <span class="num">PRD-03</span>
              <span class="label">Production ML sprints</span>
              <span class="tail">8 wks</span>
            </div>
            <div class="cons-pill">
              <span class="num">EMB-04</span>
              <span class="label">Embedded AI engineer</span>
              <span class="tail">Monthly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Services grid -->
  <section id="services" class="section">
    <div class="wrap">
      <div class="section-head">
        <div class="section-head__copy">
          <span class="eyebrow">What we do</span>
          <h2 class="h2">Six AI engagements, done at production depth.</h2>
          <p class="lede">
            Every service below has shipped to a paying customer. We don't list capabilities we haven't
            taken all the way through to deployment, retraining, and the next-quarter review.
          </p>
        </div>
      </div>
      <div class="services">
        <article class="service">
          <div class="service__head">
            <span class="service__num">01</span>
            <div class="service__title-block">
              <h3 class="service__title">Production segmentation &amp; detection</h3>
              <div class="service__one">From research notebook to model that runs every Tuesday at 03:00.</div>
            </div>
          </div>
          <p class="service__body">We've shipped real-world segmentation pipelines processing thousands of inspection and QA images per run. We know where the failure modes are: dataset shift, label noise, overconfident models on rare classes, ONNX export gotchas, why your A100 is sitting idle.</p>
          <div class="service__deliver">
            <span class="service__deliver-label">What you walk away with</span>
            <ul>
              <li>Model architecture</li><li>Training loops</li>
              <li>Eval harness</li><li>Active learning</li>
              <li>ONNX / CUDA / ROCm</li><li>Production inference</li>
            </ul>
          </div>
        </article>
        <article class="service">
          <div class="service__head">
            <span class="service__num">02</span>
            <div class="service__title-block">
              <h3 class="service__title">AI for inspection &amp; QA</h3>
              <div class="service__one">Computer vision for the things that matter when they break.</div>
            </div>
          </div>
          <p class="service__body">Defect detection, crack and corrosion segmentation, weld and casting inspection, surface-finish QA. The vertical we know cold — Crackz is the public version. We can build the private version for your domain in 8–12 weeks.</p>
          <div class="service__deliver">
            <span class="service__deliver-label">What you walk away with</span>
            <ul>
              <li>Crack · corrosion · spalling</li><li>Multi-class taxonomies</li>
              <li>GPS / EXIF traceability</li><li>Severity scoring</li>
              <li>Audit-grade reports</li><li>On-prem or cloud</li>
            </ul>
          </div>
        </article>
        <article class="service">
          <div class="service__head">
            <span class="service__num">03</span>
            <div class="service__title-block">
              <h3 class="service__title">LLM &amp; agent integration</h3>
              <div class="service__one">Practical RAG and tool-use, not demoware.</div>
            </div>
          </div>
          <p class="service__body">Where LLMs actually earn their keep: structured extraction from technical reports, RAG over engineering knowledge bases, agentic workflows for code review and triage. We pick the model that fits, not the one in the press release.</p>
          <div class="service__deliver">
            <span class="service__deliver-label">What you walk away with</span>
            <ul>
              <li>RAG pipelines</li><li>Tool use · MCP</li>
              <li>Prompt caching</li><li>Eval harnesses</li>
              <li>pgvector / Chroma</li><li>Anthropic · OpenAI · Ollama</li>
            </ul>
          </div>
        </article>
        <article class="service">
          <div class="service__head">
            <span class="service__num">04</span>
            <div class="service__title-block">
              <h3 class="service__title">MLOps &amp; model lifecycle</h3>
              <div class="service__one">The boring infrastructure that decides if it ships.</div>
            </div>
          </div>
          <p class="service__body">Training pipelines that retrain on schedule, evaluation that catches regressions before users do, deployment that survives the model getting bigger every six months. Azure Batch, Lightning Studios, self-hosted runners for sensitive data.</p>
          <div class="service__deliver">
            <span class="service__deliver-label">What you walk away with</span>
            <ul>
              <li>Azure Batch training</li><li>Model registry</li>
              <li>Eval gating</li><li>Continuous retraining</li>
              <li>TensorBoard · W&amp;B</li><li>On-prem GPU clusters</li>
            </ul>
          </div>
        </article>
        <article class="service">
          <div class="service__head">
            <span class="service__num">05</span>
            <div class="service__title-block">
              <h3 class="service__title">AI strategy &amp; build/buy</h3>
              <div class="service__one">A senior second opinion before you spend the budget.</div>
            </div>
          </div>
          <p class="service__body">Should you fine-tune, RAG, prompt, or just buy the API? Two-day discovery engagements for technical leaders who need a defensible answer for the board. We map the option space, cost each path, and write up the recommendation.</p>
          <div class="service__deliver">
            <span class="service__deliver-label">What you walk away with</span>
            <ul>
              <li>Use-case discovery</li><li>Build vs. buy analysis</li>
              <li>Cost modelling</li><li>Vendor evaluation</li>
              <li>Roadmap</li><li>Hiring plan</li>
            </ul>
          </div>
        </article>
        <article class="service">
          <div class="service__head">
            <span class="service__num">06</span>
            <div class="service__title-block">
              <h3 class="service__title">Simulation &amp; synthetic data</h3>
              <div class="service__one">Unreal-based environments where real data is scarce.</div>
            </div>
          </div>
          <p class="service__body">For domains where you can't easily collect a thousand labelled images — underwater, defense, hazardous, pre-production manufacturing — we generate it. Photogrammetry-driven training data, ROV simulation, reinforcement-learning environments.</p>
          <div class="service__deliver">
            <span class="service__deliver-label">What you walk away with</span>
            <ul>
              <li>Unreal Engine</li><li>Photogrammetry</li>
              <li>Domain randomisation</li><li>Synthetic datasets</li>
              <li>Sim-to-real transfer</li><li>RL environments</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Engagement models -->
  <section id="engagements" class="section section--tight" style="background: var(--bg-mantle); border-top: 1px solid var(--surface-0); border-bottom: 1px solid var(--surface-0);">
    <div class="wrap">
      <div class="section-head">
        <div class="section-head__copy">
          <span class="eyebrow">How we engage</span>
          <h2 class="h2">Three ways to bring AI in.</h2>
          <p class="lede">
            Fixed-scope, fixed-price for the first phase. Continue on a retainer if it's working. We don't
            do staff augmentation, hourly billing, or open-ended scopes.
          </p>
        </div>
      </div>
      <div class="engagements">
        <article class="eng">
          <span class="eng__num">Model 01</span>
          <h3 class="eng__title">AI Pilot</h3>
          <p class="eng__sub">A focused two-week proof on your data. We pick one ML question, we answer it with numbers.</p>
          <div class="eng__price">
            <div class="eng__price-value"><span class="from">From</span>€18,000</div>
            <div class="eng__price-note">Fixed scope · 2 weeks</div>
          </div>
          <ul class="eng__list">
            <li>Discovery + use-case scoping</li>
            <li>Working prototype on your data</li>
            <li>Quantified results: precision, recall, F1, latency, cost</li>
            <li>Recommendation: ship / iterate / abandon</li>
            <li>Source code and trained weights, yours to keep</li>
          </ul>
          <a href="#contact" class="btn btn--ghost">Discuss this</a>
        </article>
        <article class="eng eng--feat">
          <span class="eng__num">Model 02</span>
          <h3 class="eng__title">Production AI Sprint</h3>
          <p class="eng__sub">An eight-week engagement to ship a vertical slice of production ML — model, infra, and a UI to drive it.</p>
          <div class="eng__price">
            <div class="eng__price-value"><span class="from">From</span>€65,000</div>
            <div class="eng__price-note">8 weeks · deliverable</div>
          </div>
          <ul class="eng__list">
            <li>Everything in AI Pilot</li>
            <li>Production inference (cloud or on-prem)</li>
            <li>Retraining pipeline + eval gating</li>
            <li>Operator-facing UI or API</li>
            <li>Documentation + handover</li>
            <li>Two weeks of post-launch support</li>
          </ul>
          <a href="#contact" class="btn btn--primary">Discuss this</a>
        </article>
        <article class="eng">
          <span class="eng__num">Model 03</span>
          <h3 class="eng__title">Embedded AI Engineer</h3>
          <p class="eng__sub">Ongoing senior ML capacity for teams that need depth without hiring a new headcount.</p>
          <div class="eng__price">
            <div class="eng__price-value"><span class="from">From</span>€12,000</div>
            <div class="eng__price-note">Monthly retainer</div>
          </div>
          <ul class="eng__list">
            <li>Dedicated senior ML engineer</li>
            <li>Sprint planning + model reviews</li>
            <li>Architecture office hours</li>
            <li>On-call for production incidents</li>
            <li>Roadmap input</li>
            <li>Quarterly review and renewal</li>
          </ul>
          <a href="#contact" class="btn btn--ghost">Discuss this</a>
        </article>
      </div>
    </div>
  </section>

  <!-- Process timeline -->
  <section id="process" class="section section--tight">
    <div class="wrap">
      <div class="section-head">
        <div class="section-head__copy">
          <span class="eyebrow">How we work</span>
          <h2 class="h2">Four phases, no surprises.</h2>
          <p class="lede">
            Every AI engagement runs through the same shape, whether it's a two-week Pilot or a twelve-month
            embedded relationship. Predictable rhythm is part of the deliverable.
          </p>
        </div>
      </div>
      <div class="process">
        <div class="phase">
          <div class="phase__marker">01</div>
          <span class="phase__name">Discover</span>
          <h4 class="phase__title">Frame the question</h4>
          <p class="phase__body">One call to find the actual ML question hiding inside the business question. We say no if it shouldn't be an ML problem.</p>
          <span class="phase__time">Week 0</span>
        </div>
        <div class="phase">
          <div class="phase__marker">02</div>
          <span class="phase__name">Prototype</span>
          <h4 class="phase__title">Train &amp; evaluate</h4>
          <p class="phase__body">Working model on your data with honest numbers — precision, recall, F1, calibration, where it fails and why.</p>
          <span class="phase__time">Weeks 1–2</span>
        </div>
        <div class="phase">
          <div class="phase__marker">03</div>
          <span class="phase__name">Productionise</span>
          <h4 class="phase__title">Ship &amp; integrate</h4>
          <p class="phase__body">Inference pipeline, retraining, eval gating, monitoring. The boring half that decides if the model survives a quarter in production.</p>
          <span class="phase__time">Weeks 3–7</span>
        </div>
        <div class="phase">
          <div class="phase__marker">04</div>
          <span class="phase__name">Handover</span>
          <h4 class="phase__title">Embed &amp; document</h4>
          <p class="phase__body">Documentation, runbooks, two weeks of warranty support, and an optional retainer for the first retraining cycle.</p>
          <span class="phase__time">Week 8+</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Crackz case study -->
  <section id="case-study" class="section section--tight" style="background: var(--bg-mantle); border-top: 1px solid var(--surface-0); border-bottom: 1px solid var(--surface-0);">
    <div class="wrap">
      <div class="section-head">
        <div class="section-head__copy">
          <span class="eyebrow">Proof of work</span>
          <h2 class="h2">The same team built Crackz.</h2>
          <p class="lede">
            Our flagship product is also our biggest case study. Three years of decisions about model
            architecture, desktop UI, deployment, licensing, and support — most of which we'd make again.
          </p>
        </div>
      </div>
      <div class="case">
        <div class="case__media">
          <span class="case__media-tag">Case study · 2022 – present</span>
        </div>
        <div class="case__body">
          <h3>Crackz — AI defect detection for infrastructure &amp; manufacturing</h3>
          <p>
            From research notebook to commercial source-available product. SegFormer-based segmentation
            pipeline, PySide6 desktop application with mask editor, Streamlit web dashboard, CLI, Docker
            images, Azure Batch deployment, and a documentation site that asset owners and line
            operators actually read.
          </p>
          <p>
            Crackz is in production with infrastructure managers and manufacturing teams across Northern
            Europe, reducing inspection cost by up to 70% and producing audit-grade documentation that
            wasn't possible with manual workflows.
          </p>
          <div class="case__meta">
            <div class="case__meta-item">
              <span class="v">3 yrs</span>
              <span class="k">From spike to ship</span>
            </div>
            <div class="case__meta-item">
              <span class="v">4 surfaces</span>
              <span class="k">Desktop · web · CLI · Docker</span>
            </div>
            <div class="case__meta-item">
              <span class="v">90%+</span>
              <span class="k">Detection accuracy</span>
            </div>
          </div>
          <div style="margin-top: auto; padding-top: 16px;">
            <a href="/#crackz" class="btn btn--ghost">Read more about Crackz</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Stack matrix -->
  <section id="stack" class="section section--tight">
    <div class="wrap">
      <div class="section-head">
        <div class="section-head__copy">
          <span class="eyebrow">Tools of the trade</span>
          <h2 class="h2">The stack we know cold.</h2>
          <p class="lede">
            These are the technologies we've shipped to production with paying customers. We don't gate
            engagements on stack — but if you're already here, we can skip the warm-up phase.
          </p>
        </div>
      </div>
      <div class="stack">
        <div class="stack__col">
          <div class="stack__title">Models &amp; training</div>
          <ul class="stack__list">
            <li><span>PyTorch Lightning</span><span class="pri">core</span></li>
            <li><span>SegFormer (B0–B5)</span><span class="pri">core</span></li>
            <li><span>U-Net (20+ encoders)</span><span class="pri">core</span></li>
            <li><span>Hugging Face</span><span class="pri">core</span></li>
            <li><span>scikit-learn</span><span class="pri" style="color: var(--fg-3);">support</span></li>
            <li><span>OpenCV · Polars</span><span class="pri" style="color: var(--fg-3);">support</span></li>
          </ul>
        </div>
        <div class="stack__col">
          <div class="stack__title">LLMs &amp; agents</div>
          <ul class="stack__list">
            <li><span>Claude (Anthropic)</span><span class="pri">core</span></li>
            <li><span>OpenAI APIs</span><span class="pri">core</span></li>
            <li><span>MCP · tool use</span><span class="pri">core</span></li>
            <li><span>pgvector · Chroma</span><span class="pri">core</span></li>
            <li><span>LangChain · LlamaIndex</span><span class="pri" style="color: var(--fg-3);">support</span></li>
            <li><span>Ollama (local)</span><span class="pri" style="color: var(--fg-3);">support</span></li>
          </ul>
        </div>
        <div class="stack__col">
          <div class="stack__title">Inference &amp; infra</div>
          <ul class="stack__list">
            <li><span>ONNX Runtime</span><span class="pri">core</span></li>
            <li><span>Azure Batch</span><span class="pri">core</span></li>
            <li><span>Docker (CPU + GPU)</span><span class="pri">core</span></li>
            <li><span>Self-hosted runners</span><span class="pri">core</span></li>
            <li><span>TensorBoard · W&amp;B</span><span class="pri" style="color: var(--fg-3);">support</span></li>
            <li><span>Kubernetes</span><span class="pri" style="color: var(--fg-3);">support</span></li>
          </ul>
        </div>
        <div class="stack__col">
          <div class="stack__title">Languages</div>
          <ul class="stack__list">
            <li><span>Python 3.13</span><span class="pri">core</span></li>
            <li><span>TypeScript</span><span class="pri">core</span></li>
            <li><span>C++ (Unreal, Qt)</span><span class="pri">core</span></li>
            <li><span>YAML / Pydantic</span><span class="pri" style="color: var(--fg-3);">support</span></li>
            <li><span>SQL</span><span class="pri" style="color: var(--fg-3);">support</span></li>
            <li><span>Go · Java</span><span class="pri" style="color: var(--fg-3);">support</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="section section--tight">
    <div class="wrap">
      <div class="section-head">
        <div class="section-head__copy">
          <span class="eyebrow">Frequently asked</span>
          <h2 class="h2">The questions that come up early.</h2>
        </div>
      </div>
      <div class="faq">
        <div class="faq__item">
          <h4>Is my problem actually an ML problem?</h4>
          <p>Often no. The two-week AI Pilot exists partly to answer this honestly. Plenty of "AI projects" are better solved by a rules engine, a different sensor, or fixing the upstream data quality. If that's the answer, we'll say so — it's cheaper for you and saves a quarter of disappointment.</p>
        </div>
        <div class="faq__item">
          <h4>How much data do we need?</h4>
          <p>For segmentation / detection: 100 labelled images for a viable pilot, 200–300 for decent accuracy, 500+ for production-grade on a single class. Multi-class taxonomies need more. We can also generate synthetic data via Unreal-based simulation when real data is scarce or hazardous to collect.</p>
        </div>
        <div class="faq__item">
          <h4>Do you sign NDAs?</h4>
          <p>Yes. We default to a mutual NDA before any data or model weights are shared. Discovery calls don't require one — we don't need your IP to tell you if we're a fit.</p>
        </div>
        <div class="faq__item">
          <h4>Can you work on classified or air-gapped systems?</h4>
          <p>Yes — the lead has active Swedish security clearance and we run engagements behind firewalls and on customer hardware regularly. We're set up for it: source-available delivery, self-hosted runners, on-prem deployment patterns we use day-to-day.</p>
        </div>
        <div class="faq__item">
          <h4>Who owns the trained model?</h4>
          <p>You do. Trained weights, training data, fine-tunes, prompts, agents, evals — yours. We retain rights to general patterns, internal tooling, and any pre-existing components we bring in. Specifics in the engagement contract.</p>
        </div>
        <div class="faq__item">
          <h4>Will you teach our team while you build?</h4>
          <p>Yes — knowledge transfer is part of every engagement. We pair with your engineers, code in the open, write the docs while we work, and leave behind a model your team can retrain six months later without us.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact CTA -->
  <section id="contact" class="section section--tight">
    <div class="wrap">
      <div class="cta">
        <div class="cta__bg"></div>
        <div class="cta__inner">
          <div>
            <span class="eyebrow">Start the conversation</span>
            <h2 class="h2" style="margin-top: 14px;">One discovery call, no NDA required.</h2>
            <p class="cta__lede">
              Tell us about the problem in 2–3 sentences. If it's a fit, we'll schedule a 30-minute
              discovery call within the week. If it isn't, we'll usually know someone who is.
            </p>
          </div>
          <div class="cta__contact">
            <div>
              <div class="cta__contact-label">Email · Theresia Lundgren</div>
              <div class="cta__email">theresia.lundgren@anaxiatech.se</div>
            </div>
            <a href="mailto:theresia.lundgren@anaxiatech.se?subject=Consulting%20enquiry" class="btn btn--primary">
              Open in mail
            </a>
            <div class="cta__rows">
              <div class="cta__row"><span class="k">Engagements</span><span>2 wks – 12+ months</span></div>
              <div class="cta__row"><span class="k">Response</span><span>Within 1 business day</span></div>
              <div class="cta__row"><span class="k">Based in</span><span>Stockholm · Västervik</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <style>
    html { scroll-behavior: smooth; }
  </style>

</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/consulting.astro
git commit -m "feat(page): add consulting page consulting.astro"
```

---

### Task 9: Wire CSS imports in Base.astro (fix paths)

Astro processes CSS through its own pipeline. `<link>` tags in Base.astro won't resolve `src/styles/` paths at runtime.

- [ ] **Step 1: Change Base.astro CSS imports from `<link>` to Astro's `import`**

In `src/layouts/Base.astro`, replace:
```astro
  <link rel="stylesheet" href="/src/styles/tokens.css" />
  <link rel="stylesheet" href="/src/styles/site.css" />
```
with (in the frontmatter `---` block):
```astro
import '../styles/tokens.css';
import '../styles/site.css';
```

And remove the two `<link>` lines from the `<head>`.

- [ ] **Step 2: Test build**

```bash
npx astro build
```

Expected: `dist/` created, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "fix(styles): import CSS via Astro pipeline not link tags"
```

---

### Task 10: Add GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write deploy.yml** (replaces existing contact-form workflow — create a new file, keep old one)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [feat/astro-redesign, main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - run: npx astro build

      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: anaxiatech.se
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions deploy workflow for Astro"
```

---

### Task 11: Local smoke test

- [ ] **Step 1: Start dev server**

```bash
npx astro dev --port 4321
```

- [ ] **Step 2: Check main landing page at http://localhost:4321**

Verify:
- Dark Catppuccin Mocha background (not white)
- Nav with all links: Crackz · AI Consulting · Services · Industries · Projects · About · [Contact sales]
- Hero renders with image and overlay dot animation
- Trusted-by strip visible
- Crackz section: logo, stats, GUI tour tabs switch correctly
- Consulting promo band
- Capabilities 3×2 grid
- Industries 3-column cards
- Projects 2×2 grid
- About section with meta grid
- Contact CTA with background image
- Footer with 4 columns

- [ ] **Step 3: Check consulting page at http://localhost:4321/consulting**

Verify:
- "AI Consulting" nav link is highlighted (aqua underline)
- Hero with schematic visual (pills/lanes)
- Services 2×3 grid
- Engagement models (middle card featured/aqua border)
- Process timeline 4 phases
- Crackz case study card (split layout)
- Stack matrix 4 columns
- FAQ rows
- Contact CTA

- [ ] **Step 4: Check mobile at 375px viewport width**

Verify:
- Nav links hidden, hamburger button visible
- Hamburger opens drawer overlay
- Hero stacks single column
- All grids single column

- [ ] **Step 5: Check console for errors**

No JS errors. No 404s for assets.

- [ ] **Step 6: Stop dev server (Ctrl+C)**

---

### Task 12: Push branch and open PR

- [ ] **Step 1: Push branch**

```bash
git push -u origin feat/astro-redesign
```

- [ ] **Step 2: Open PR**

```bash
gh pr create \
  --title "feat: Astro redesign — Catppuccin Mocha, two-page site" \
  --body "$(cat <<'EOF'
## Summary
- Replaces vanilla HTML/CSS/JS site with Astro static export
- Implements Catppuccin Mocha + aqua design from handoff bundle
- Two pages: main landing (/) and AI Consulting (/consulting)
- Mobile hamburger nav below 840px
- CrackzTour component with vanilla JS tab switcher (no framework runtime)
- GitHub Actions deploy to gh-pages branch

## Test plan
- [ ] Dev server runs with no errors
- [ ] Main landing: all 9 sections render correctly
- [ ] Consulting page: all 8 sections render correctly, "AI Consulting" nav active
- [ ] GUI tour tabs switch correctly (4 tabs)
- [ ] Mobile: hamburger opens/closes at 840px breakpoint
- [ ] Build: `npx astro build` completes without errors
- [ ] After merge to main: site deploys to anaxiatech.se via gh-pages workflow

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 3: Assign Copilot reviewer**

```bash
gh pr edit <number> --add-reviewer copilot
```

---

## Self-Review

**Spec coverage:**
- ✅ Two pages: index.astro + consulting.astro
- ✅ Nav: Crackz · Services · AI Consulting · Industries · Projects · About · Contact sales
- ✅ Mobile hamburger below 840px
- ✅ CrackzTour: 4 tabs, vanilla JS switcher, `hidden` attribute toggling
- ✅ Trusted-by strip (text wordmarks)
- ✅ Design tokens and site.css from bundle, variant rules stripped
- ✅ Font paths updated for Astro public/ routing
- ✅ CNAME in public/ (survives gh-pages deploys)
- ✅ GitHub Actions deploy workflow
- ✅ All content verbatim from handoff (EUR prices, org.nr, copy)

**Potential issues:**
- `case__media` uses `background-image: url("../assets/crackz-logo.png")` — in site.css this path is relative. Task 4 Step 3 fixes this to `/assets/crackz-logo.png`.
- `cta__bg` uses same relative URL — same fix applies.
- Astro TypeScript for `<script>` blocks: the `as HTMLButtonElement` casts require `lang="ts"` or will silently fail. Use `as unknown as HTMLButtonElement` or omit casts if TypeScript is disabled.
