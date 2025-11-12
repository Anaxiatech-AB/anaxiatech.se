# Anaxiatech AB Company Website - AI Coding Instructions

## Project Overview
This is a single-page company website for Anaxiatech AB, a Swedish IT contracting firm. The site is hosted on GitHub Pages with a custom domain (anaxiatech.se) and uses vanilla HTML/CSS/JS with Jekyll for static site generation.

## Build and Validation

### Local Development
This is a static website with no build step required:
1. Clone the repository
2. Open `index.html` directly in a web browser, OR
3. Use a local HTTP server for full functionality:
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if http-server is installed)
   npx http-server -p 8000
   ```
4. Visit `http://localhost:8000` in your browser

### Validation
Since this is a static site with no automated tests, validate changes by:
1. **Visual inspection**: Open the site in a browser and check all sections
2. **Responsive testing**: Test on mobile, tablet, and desktop viewports
3. **HTML validation**: Use W3C validator or browser dev tools
4. **Link checking**: Verify all internal and external links work
5. **Asset loading**: Ensure all images, CSS, and JS files load correctly
6. **Cross-browser testing**: Test in Chrome, Firefox, Safari, and Edge

### GitHub Pages Deployment
- Changes to `main` branch are automatically deployed to https://anaxiatech.se
- Deployment is handled by GitHub Pages (no CI/CD configuration needed)
- Changes typically appear within 1-2 minutes after merge

## Architecture & Key Components

### Site Structure
- **Single-page application** with smooth scrolling navigation between sections
- **Static hosting**: GitHub Pages with Jekyll (minimal theme)
- **Custom domain**: anaxiatech.se via CNAME file and DNS A records
- **Responsive design**: Mobile-first CSS using CSS custom properties

### Core Sections (in `index.html`)
1. **Hero**: Swedish technology contractors with 30+ years experience
2. **Services**: Three main offerings (Fullstack, DevOps/Cloud, Security/Networking)
3. **Technology**: Modern tech stack showcase
4. **About**: Company background and statistics
5. **Contact**: Email contact (theresia.lundgren@anaxiatech.se)

## Development Patterns

### CSS Architecture (`assets/css/main.css`)
- **CSS Custom Properties**: Comprehensive design system with color, typography, and spacing variables
- **BEM-like naming**: Component-based class naming (`.hero-title`, `.product-card`, `.nav-container`)
- **Design tokens**: Uses `--primary-color: #1a365d`, `--accent-color: #3182ce` throughout
- **Responsive breakpoints**: Mobile-first approach with progressive enhancement

### JavaScript Functionality (`assets/js/main.js`)
- **Smooth scrolling**: Automatic navigation with navbar height offset calculation
- **Scroll effects**: Dynamic navbar styling and intersection observer animations
- **Form handling**: Contact form validation and submission (if implemented)
- **Mobile menu**: Responsive navigation toggle

### Content Strategy
- **Professional tone**: Enterprise-focused messaging for Swedish B2B market
- **Service focus**: Three core areas (development, DevOps, security) with detailed feature lists
- **Local identity**: Emphasizes Swedish location and 30+ years experience
- **GitHub integration**: Links to organization profile for technical credibility

## Required Assets
Ensure these files exist in `assets/images/`:
- `logo.svg` - Company logo (400x400px)
- `hero-diagram.svg` - Hero section illustration
- `og-image.svg` - Social media preview image

## DNS & Hosting Configuration
- **Custom domain**: Configured in GitHub Pages repository settings (anaxiatech.se)
- **DNS setup**: Handled at domain registrar with GitHub Pages A records
- **SSL**: Automatically managed by GitHub Pages
- **Jekyll config**: Minimal setup in `_config.yml` with company metadata

## Development Workflow
1. **Local testing**: Open `index.html` directly or use local server
2. **Asset management**: All resources in `assets/` directory with organized subdirectories
3. **Content updates**: Modify sections directly in `index.html`
4. **Style changes**: Update CSS custom properties for consistent theming
5. **Domain changes**: Configure through GitHub Pages repository settings

## Company Branding
- **Colors**: Professional blue theme (#1a365d primary, #3182ce accent)
- **Typography**: Inter font family throughout
- **Voice**: Professional, experienced, Swedish technology expertise
- **Contact**: Single point of contact via theresia.lundgren@anaxiatech.se

## Code Conventions

### HTML
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<section>`, `<footer>`)
- Maintain proper indentation (2 spaces)
- Include appropriate `aria-*` attributes for accessibility
- Use descriptive IDs for navigation anchors (matching section names)

### CSS
- Follow existing BEM-like naming conventions
- Use CSS custom properties (variables) for colors, spacing, and typography
- Mobile-first responsive design (start with mobile styles, add desktop with media queries)
- Keep specificity low - prefer classes over IDs for styling
- Group related properties logically (layout, typography, colors, effects)

### JavaScript
- Use modern ES6+ syntax
- Write vanilla JavaScript (no framework dependencies)
- Add comments for complex logic
- Handle edge cases and errors gracefully
- Use `addEventListener` for event handling (no inline handlers)

### Assets
- Place all images in `assets/images/`
- Use SVG format for logos and icons (better scaling and smaller file size)
- Optimize images before committing (compress PNGs/JPEGs)
- Use descriptive filenames (e.g., `hero-diagram.svg`, not `img1.svg`)

## File Scoping

### HTML Changes (`index.html`)
When editing the main HTML file:
- Preserve existing section IDs (used for navigation)
- Maintain the single-page structure
- Keep meta tags updated (title, description, OG tags)
- Ensure all sections remain accessible via navigation

### CSS Changes (`assets/css/main.css`)
When editing styles:
- Update CSS custom properties at the `:root` level for theme changes
- Test responsive breakpoints at 768px (tablet) and 1024px (desktop)
- Preserve existing class names (may be referenced in JavaScript)
- Maintain consistent spacing using the spacing scale variables

### JavaScript Changes (`assets/js/main.js`)
When editing scripts:
- Test smooth scrolling functionality after changes
- Verify mobile menu toggle works
- Check scroll-based animations and navbar effects
- Ensure no console errors in browser dev tools

## Common Tasks

### Adding a New Section
1. Add HTML section with unique ID in `index.html`
2. Add navigation link in the `<nav>` element
3. Add styling in `assets/css/main.css` following existing patterns
4. Test navigation and smooth scrolling
5. Verify responsive behavior on mobile

### Updating Colors
1. Modify CSS custom properties in `:root` selector
2. Primary color: `--primary-color`
3. Accent color: `--accent-color`
4. Test contrast ratios for accessibility (WCAG AA: 4.5:1 for text)

### Adding Images
1. Place in `assets/images/` directory
2. Use descriptive filename
3. Reference in HTML with relative path: `assets/images/filename.svg`
4. Add appropriate `alt` text for accessibility

## What to Avoid

- **Don't add build tools or frameworks**: This is intentionally a simple static site
- **Don't modify the CNAME file**: Custom domain configuration is managed separately
- **Don't remove existing navigation links**: They correspond to section IDs
- **Don't use absolute URLs for assets**: Use relative paths for portability
- **Don't introduce jQuery or other libraries**: Site uses vanilla JavaScript only
- **Don't change the Jekyll theme**: Using minimal theme for GitHub Pages compatibility
- **Don't hardcode viewport dimensions**: Use responsive CSS with media queries
- **Don't add dependencies**: No package.json, no npm modules, keep it simple

## Security Considerations

- **No sensitive data**: Never commit API keys, credentials, or secrets
- **External links**: Use `rel="noopener noreferrer"` for links opening in new tabs
- **Contact form**: If adding forms, use client-side validation and secure endpoints
- **HTTPS only**: Site is served over HTTPS by GitHub Pages (don't use mixed content)

## Accessibility Guidelines

- Maintain ARIA labels for interactive elements
- Ensure color contrast ratios meet WCAG AA standards (4.5:1 for normal text)
- Provide `alt` text for all images
- Support keyboard navigation (tab order should be logical)
- Test with screen readers if adding new interactive features