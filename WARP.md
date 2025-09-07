# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is Nicole Mark's personal portfolio website - a modern, responsive site showcasing data science expertise, academic work, and professional experience. Built with Astro for optimal performance and deployed to GitHub Pages.

**Site Owner**: Nicole Lillian Mark - Data visualization developer, analytics consultant, and design engineer  
**Live Site**: https://nicolelily.github.io  
**Tech Stack**: Astro, Tailwind CSS, TypeScript  

## Development Commands

### Core Development Workflow
```bash
# Install dependencies
npm install

# Start development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro
```

### Development Server Details
- Development server runs on `http://localhost:4321`
- Hot module replacement (HMR) is configured for port 4322
- Server is configured to bind to all interfaces (`host: true`)

## Architecture & Code Structure

### Framework Architecture
- **Astro**: Static site generator with island architecture
- **Content Collections**: Blog posts managed via `src/content/blog/` with Zod schema validation
- **Component-based**: Reusable Astro components in `src/components/`
- **Layout System**: Single base layout (`src/layouts/Layout.astro`) with slot-based content

### Key Architectural Patterns

#### 1. Dark Mode Implementation
- Client-side theme switching with localStorage persistence
- Theme state managed in base Layout component
- CSS classes: `dark:` prefixes for dark mode styles
- Theme toggle functionality in Navigation component

#### 2. Navigation System
- Fixed navigation with backdrop blur effect
- Mobile-responsive with hamburger menu
- Smooth scrolling for anchor links implemented in JavaScript
- Active state management for current page

#### 3. Content Architecture
```
src/
├── components/          # Reusable UI components
│   └── Navigation.astro
├── content/            # Content collections
│   ├── config.ts       # Schema definitions
│   └── blog/           # Blog posts (Markdown)
├── layouts/            # Layout templates
│   └── Layout.astro    # Base layout with SEO, fonts, theme
├── pages/              # Route pages (file-based routing)
├── styles/             # Global styles
│   └── global.css      # Tailwind + custom component classes
```

#### 4. Styling Strategy
- **Tailwind CSS**: Utility-first approach with custom component classes
- **Global Components**: Defined in `global.css` (`@layer components`)
  - `.section-padding`, `.container`, `.btn-primary`, `.btn-secondary`
  - `.card`, `.section-title`, `.section-subtitle`
- **Design System**: Consistent spacing, colors, and typography
- **Responsive**: Mobile-first approach with breakpoints

### Content Management

#### Blog Posts
- Location: `src/content/blog/*.md`
- Schema validation via Zod in `src/content/config.ts`
- Required frontmatter fields: `title`, `description`, `pubDate`
- Optional fields: `updatedDate`, `heroImage`, `tags`, `author`, `draft`
- Author defaults to "Nicole L. Mark"

#### Page Structure
- **Homepage** (`index.astro`): Hero, About, Research, Portfolio sections
- **CV** (`cv.astro`): Professional experience and qualifications
- **Academic** (`academic.astro`): Research and academic work
- **Publications** (`publications.astro`): Academic papers and contributions
- **Portfolio** (`portfolio.astro`): Data visualization projects and apps
- **Blog** (`blog.astro`): Technical articles and insights
- **Media** (`media.astro`): Speaking engagements and appearances
- **Contact** (`contact.astro`): Professional contact information

## Deployment & Infrastructure

### GitHub Pages Deployment
- **Trigger**: Automatic on push to `main` branch
- **Workflow**: `.github/workflows/deploy.yml`
- **Node Version**: 20
- **Package Manager**: npm@latest
- **Build Action**: `withastro/action@v2`

### Site Configuration
- **Base URL**: https://nicolelily.github.io
- **Output**: Static generation
- **Build Target**: GitHub Pages compatible

## Content Guidelines

### Writing Blog Posts
1. Create new `.md` file in `src/content/blog/`
2. Include complete frontmatter with required fields
3. Use semantic Markdown structure
4. Tag appropriately for discoverability
5. Follow existing content style and tone

### Updating Professional Information
- **CV Updates**: Edit `src/pages/cv.astro` directly
- **Research/Academic**: Update `src/pages/academic.astro` and `src/pages/publications.astro`
- **Portfolio Projects**: Update `src/pages/portfolio.astro`
- **Bio Information**: Update homepage sections in `src/pages/index.astro`

## Technical Considerations

### Performance Optimizations
- Astro's island architecture minimizes JavaScript
- Font preloading configured in Layout.astro
- Tailwind CSS purging removes unused styles
- Image optimization via Astro's built-in features

### SEO & Accessibility
- Meta descriptions and titles configured per page
- Semantic HTML structure
- ARIA labels for interactive elements
- Proper heading hierarchy
- Focus management for mobile menu

### Browser Support
- Modern browsers with CSS Grid and Flexbox support
- CSS custom properties (CSS variables)
- ES6+ JavaScript features
- Progressive enhancement approach

## Common Development Patterns

### Adding New Pages
1. Create `.astro` file in `src/pages/`
2. Import and use base Layout
3. Include Navigation component
4. Follow established HTML structure and CSS classes
5. Update Navigation component with new route

### Creating Components
- Use `.astro` extension for Astro components
- Follow existing naming conventions (PascalCase)
- Include TypeScript interfaces for props when needed
- Use Tailwind classes following the established pattern

### Styling New Elements
- Prefer Tailwind utility classes
- Add custom component classes to `global.css` if reusable
- Follow dark mode pattern with `dark:` prefixes
- Maintain responsive design principles

## Contact Information Integration

The site represents:
- **Email**: nicoledesignsdata@pm.me
- **LinkedIn**: nicole-mark
- **GitHub**: nicolelily
- **ORCID**: 0000-0001-8383-274X
- **Personal**: Lives in coastal Delaware, dog owner (Instagram: @pittie_potato)
- **Academic**: Master's student at University of Colorado Boulder
- **Focus Areas**: Data ethics, AI societal impacts, information design for public health and social justice
