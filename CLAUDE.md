# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Anaxiatech AB company website - a single-page static site hosted on GitHub Pages at anaxiatech.se. The site showcases AI, DevSecOps, simulation, and enterprise systems capabilities with focus on defense, infrastructure, and maritime industries.

**Tech Stack**: Vanilla HTML/CSS/JS, Jekyll (minimal), GitHub Pages
**Theme**: Dark professional theme with brown/gold accents (#8b4513 primary, #cd853f accent)
**No build process required** - open index.html directly or use local server

## Development Commands

### Local Development
```bash
# Open directly in browser
# Just double-click index.html, or:

# Python 3 local server
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server -p 8000
```

Then visit http://localhost:8000

### Deployment
Changes to `main` branch auto-deploy to https://anaxiatech.se via GitHub Pages (1-2 min deployment time).

### Validation
No automated tests. Manual validation required:
- Visual inspection across all sections
- Responsive testing (mobile/tablet/desktop)
- Browser console for JS errors
- Test all navigation links and smooth scrolling
- Verify contact form mailto functionality

## Architecture Overview

### Single-Page Application Pattern
The site uses client-side navigation with smooth scrolling between sections. All functionality is in three core files:

**index.html** - Single-page layout with semantic sections (hero, services, projects, clients, about, contact)
**assets/css/main.css** - Complete styling with CSS custom properties design system
**assets/js/main.js** - Core functionality (smooth scroll, navbar effects, animations, mobile menu)
**assets/js/contact-form.js** - Contact form with mailto fallback (see below)

### Contact Form Implementation (CRITICAL)

The contact form uses a **mailto fallback approach** instead of external services:

```javascript
// Opens user's email client with pre-filled subject/body
window.location.href = `mailto:theresia.lundgren@anaxiatech.se?subject=${subject}&body=${body}`;
```

**Why this matters**:
- No external dependencies or API keys needed
- Always works regardless of network/service status
- Includes spam filtering (crypto, bitcoin, loan, casino, viagra, pharmacy, multiple URLs)
- Field validation (name/company max 100 chars, message max 2000 chars)

**Trade-offs**:
- User must have email client configured
- Not as seamless as form services
- No server-side submission tracking

See `CONTACT_FORM_SETUP.md` for GitHub Issues API alternative (currently disabled).

### CSS Architecture

**Design System**: Comprehensive CSS custom properties at `:root` level
```css
--primary-color: #8b4513      /* Brown */
--accent-color: #cd853f       /* Peru/Gold */
--background-primary: #0d1117 /* Dark GitHub-style */
--text-primary: #f7fafc       /* Light text */
```

**Key Pattern**: Dark theme throughout with brown/earth tone accents (different from typical blue tech themes)

**Responsive Strategy**: Mobile-first with breakpoints at 768px (tablet) and 1024px (desktop)

**BEM-like naming**: `.hero-title`, `.product-card`, `.nav-container` - component-based but not strict BEM

### JavaScript Architecture

**Modular Functions Pattern**: Each feature is an `init*()` function called on DOMContentLoaded

```javascript
initSmoothScrolling()      // Smooth scroll with navbar offset calculation
initNavbarScrollEffect()   // Dynamic shadow based on scroll position
initContactForm()          // Form validation + mailto handling
initScrollAnimations()     // Intersection Observer for fade-in effects
initMobileMenu()          // Programmatically injected mobile nav
```

**Critical Detail - Navbar Offset**: Smooth scrolling accounts for fixed navbar height to prevent content being hidden behind it:
```javascript
const navbarHeight = document.querySelector('.navbar').offsetHeight;
const targetPosition = targetElement.offsetTop - navbarHeight;
```

**Intersection Observer Pattern**: Elements animate in on scroll using opacity/transform transitions. Elements start with `opacity: 0` and `translateY(20px)`, then transition to visible when entering viewport.

**Mobile Menu**: Entirely JavaScript-generated (button + styles injected at runtime). Not in HTML markup.

### Project-Specific Content Structure

**Three Major Projects**:
1. **Crackz** - AI infrastructure inspection (PyTorch, U-Net, Docker/K8s, Azure Batch)
2. **WreckGame** - Unreal Engine ROV simulation (C++, photogrammetry)
3. **Ocean Discovery** - M/S Estonia reinvestigation IT infrastructure

**Six Service Categories**: AI & Automation, System Architecture, Platform & DevSecOps, Simulation & Digital Environments, Mobile & IoT, Government & Defense

**Client Highlights**: Discovery+/Warner Brothers, SAAB (Aurora & Missiles), Ericsson, Ocean Discovery, Government agencies

## Important Constraints

### What NOT to Change
- **CNAME file** - Custom domain configuration (anaxiatech.se)
- **Section IDs** - Used for navigation (#home, #services, #projects, #clients, #about, #contact)
- **Jekyll theme** - Must stay "minimal" for GitHub Pages compatibility
- **No dependencies** - Site intentionally has no package.json, no npm modules, no frameworks

### Required Assets
Ensure these exist in `assets/images/`:
- `logo_icon.png` - Navbar logo
- `anaxia_ny_logga.png` - Hero section and OG image
- `crackz-logo.png` - Projects section
- `services/*.jpg` - Service card images (6 images)

### External Links Pattern
```html
<a href="external-url" rel="noopener noreferrer">Link</a>
```
Always use `rel="noopener noreferrer"` for security on external links opening in new tabs.

## Development Patterns

### Adding New Section
1. Add `<section id="new-section">` in index.html
2. Add nav link: `<li><a href="#new-section" class="nav-link">Label</a></li>`
3. Style with BEM-like classes in main.css using CSS custom properties
4. Test smooth scrolling and mobile responsiveness
5. Add to `initScrollAnimations()` if fade-in animation desired

### Updating Theme Colors
Modify CSS custom properties in `:root` (main.css lines 1-49). All colors derive from these variables:
- Primary: `--primary-color` (brown #8b4513)
- Accent: `--accent-color` (gold #cd853f)
- Backgrounds: `--background-primary`, `--background-secondary`, `--background-accent`
- Text: `--text-primary`, `--text-secondary`, `--text-muted`

**Accessibility**: Maintain WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)

### Form Modifications
If changing contact form behavior:
- Validation is split between main.js and contact-form.js (both validate on submit)
- Spam filters in `contact-form.js` lines 49-66
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Mailto fallback is the primary mechanism (lines 72-78)

## GitHub Pages Specifics

**Domain**: anaxiatech.se via CNAME + DNS A records at registrar
**SSL**: Automatically managed by GitHub Pages
**Jekyll Config**: `_config.yml` with minimal settings (title, email, description, baseurl)
**Excluded Files**: Gemfile, node_modules, vendor/* (see _config.yml lines 14-21)

**Deployment**: Automatic on push to `main`. No GitHub Actions workflow needed for deployment (GitHub Pages handles it). Check Actions tab if deployment issues occur.

## Code Conventions

### HTML
- Semantic HTML5: `<header>`, `<nav>`, `<section>`, `<footer>`
- 2-space indentation (but some areas use 4 - be consistent within files)
- Descriptive IDs matching section names
- ARIA attributes where applicable (especially for mobile menu)

### CSS
- Mobile-first: Base styles for mobile, `@media (min-width: 768px)` for larger screens
- Low specificity: Prefer classes over IDs for styling
- Logical property grouping: Layout → Typography → Colors → Effects
- All measurements use rem/em (except border-radius in px acceptable)

### JavaScript
- ES6+ syntax (const/let, arrow functions, template literals)
- No inline event handlers - use addEventListener
- Graceful degradation (check element existence before manipulation)
- Comment complex logic (see throttle function, Intersection Observer config)

## Contact & Collaboration

**Email**: theresia.lundgren@anaxiatech.se
**GitHub**: https://github.com/Anaxiatech-AB
**LinkedIn**: https://www.linkedin.com/in/theresialundgren/
**Location**: Stockholm, Sweden

**Notable Collaboration**: Ocean Discovery (offshore systems, M/S Estonia reinvestigation IT infrastructure)

## Quick Reference

| Task | Command/Action |
|------|----------------|
| Run locally | `python3 -m http.server 8000` |
| Test changes | Open http://localhost:8000, check all sections + console |
| Deploy | Push to `main` branch (auto-deploys in 1-2 min) |
| Update colors | Edit `:root` CSS variables in main.css |
| Add section | HTML section + nav link + CSS styles + test scrolling |
| Modify form | Edit contact-form.js spam filters or validation |
| Check deployment | Visit https://anaxiatech.se after 2 min |
