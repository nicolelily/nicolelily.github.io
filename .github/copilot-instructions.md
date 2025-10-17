# AI Coding Instructions - Nicole L. Mark Portfolio

## Project Overview

This is an Astro-powered portfolio website for a data scientist, featuring a blog system, portfolio showcases, and Tableau visualizations. The site uses Tailwind CSS with a custom dark theme and deploys to GitHub Pages.

## Architecture & Key Patterns

### Content Collections Structure

- Blog posts live in `src/content/blog/` as Markdown with frontmatter schema defined in `src/content/config.ts`
- Required frontmatter: `title`, `description`, `pubDate`, optional: `tags`, `heroImage`, `draft`
- Blog routing uses dynamic `[slug].astro` with `getStaticPaths()` for static generation

### Component Architecture

- **Layout.astro**: Base layout with dark theme (`class="dark"`), Inter font, custom scrollbars
- **Navigation.astro**: Fixed nav with mobile hamburger menu, uses `nav-link` and `mobile-nav-link` classes
- **TableauEmbed.astro**: Specialized component for embedding Tableau visualizations with metadata

### Styling System

- **Theme**: Dark-first design with custom brand colors in `tailwind.config.js`
- **Brand colors**: `brand-primary` (#005975 teal), `brand-secondary` (#B01469 magenta), `brand-accent` (#DAFE00 lime)
- **Custom classes**: `.section-padding`, `.container`, `.btn-primary/.btn-secondary`, `.card`, `.section-title`
- **Global styles**: Custom scrollbar, smooth scroll, typography utilities in `src/styles/global.css`

### Page Structure

- Static pages in `src/pages/`: `index.astro`, `cv.astro`, `portfolio.astro`, `tableau.astro`, etc.
- All pages import `Layout.astro` and `Navigation.astro` as standard pattern
- Hero sections use `bg-gradient-to-br from-gray-900 to-gray-800` consistently

## Development Workflows

### Local Development

```bash
npm run dev          # Start dev server (port 4321)
npm run build        # Production build
npm run preview      # Preview production build
```

### Content Management

- **Blog posts**: Create in `src/content/blog/` with date-prefixed filename format: `YYYY-MM-DD--slug.md`
- **Blog migration**: Use `scripts/blog-migration/import.mjs` for Medium/Substack imports
  ```bash
  node scripts/blog-migration/import.mjs medium --input /path/to/export --out src/content/blog
  ```

### Deployment

- Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on main branch pushes
- Uses `@withastro/action` with Node 20
- Site configured for `nicolelily.github.io` domain

## Key File Locations

### Core Configuration

- `astro.config.mjs`: Site config, Tailwind integration, GitHub Pages setup
- `tailwind.config.js`: Custom brand colors, typography plugin
- `src/content/config.ts`: Blog schema definition

### Critical Components

- `src/layouts/Layout.astro`: Base HTML structure, meta tags, font loading
- `src/components/Navigation.astro`: Site navigation with mobile support
- `src/components/TableauEmbed.astro`: Tableau visualization embedding

### Content Patterns

- `src/pages/blog/[slug].astro`: Dynamic blog post rendering with related posts
- `src/content/blog/*.md`: Blog content with consistent frontmatter schema

## Project-Specific Conventions

### Naming & Organization

- Blog posts use date-prefixed slugs: `2025-04-27--post-title.md`
- Component props use TypeScript interfaces exported as `Props`
- CSS custom properties follow `brand-*` naming for colors

### Styling Patterns

- Consistent section structure: `<section class="section-padding">` → `<div class="container">`
- Cards use `.card` class for consistent gray-800 background with border
- Navigation links use `.nav-link` (desktop) and `.mobile-nav-link` (mobile) classes

### Content Embedding

- Tableau visualizations via `TableauEmbed.astro` with rich metadata (tags, data sources, tools)
- Academic papers referenced with BibTeX files in `public/files/`
- Images and assets served from `public/` directory

### Development Tools

- Blog migration scripts in `scripts/blog-migration/` for content import workflows
- Validation script: `scripts/blog-migration/validate.mjs` for content checking

## Integration Points

- **Astro Content Collections**: Schema-validated markdown content
- **Tailwind + Typography**: Prose styling for blog content
- **GitHub Actions**: Automated deployment pipeline
- **External embeds**: Tableau Public visualizations, academic content

When making changes, maintain the dark theme aesthetic, follow the established component patterns, and ensure mobile responsiveness with the existing breakpoint system.
