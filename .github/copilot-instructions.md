# Anaxiatech AB Company Website - AI Coding Instructions

## Project Overview
This is a single-page company website for Anaxiatech AB, a Swedish IT contracting firm. The site is hosted on GitHub Pages with a custom domain (anaxiatech.se) and uses vanilla HTML/CSS/JS with Jekyll for static site generation.

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