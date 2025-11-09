# Gothic E-Commerce Platform

**By DOT for YOU** - Handmade streetwear brand featuring custom 1-of-1 pieces with Gothic 2 and Diablo 2 inspired aesthetics.

## Project Vision

This is a 100% custom streetwear brand specializing in handmade pants and clothes. The platform immerses users in a retro gaming atmosphere inspired by Gothic 2 and Diablo 2, featuring AI-generated graphics and videos that recreate that mystical gaming experience.

## Main Menu Structure

1. **Nowa Kolekcja** (New Collection) - Currently disabled (no collections yet)
2. **Wczytaj Kolekcje** (Load Collections) - Present but crossed out
3. **For You** - Movement/brand story section with cutscene-style content
4. **Przedmioty** (Items) - **PRIMARY FOCUS**: Portfolio of all items (available/unavailable)
5. **Lookbook** - Best brand photos representing the aesthetic
6. **Zdjecia** (Photos) - Artistic photo section related to the brand

## Development Requirements

- **Button normalization**: Buttons should adjust width, not height, based on text content
- **Mobile responsiveness**: Full mobile optimization required
- **Asset verification**: All referenced assets must exist or have fallbacks

---

# Sacred Development Rules for Modern Astro

## 🏛️ **FUNDAMENTAL PRINCIPLES**

### **1. Island Architecture Sanctity**
- **Zero JS by Default**: Every component must be static unless explicitly hydrated
- **Strategic Hydration**: Use `client:*` directives only when absolutely necessary
- **Performance Hierarchy**: Prefer `client:load` → `client:idle` → `client:visible` → `client:only`
- **Server Islands**: Use `server:defer` for heavy, non-critical dynamic content

### **2. Content Collection Doctrine**
- **Structured Data**: All content must use Astro Content Collections for type safety
- **Type Safety**: Every content piece must have Zod schema validation
- **Single Source of Truth**: Eliminate conflicting data systems
- **Schema-First Design**: Design schemas before implementing content

### **3. Design Token Implementation**
- **Token-Based Architecture**: All styling must derive from design tokens
- **No Magic Numbers**: Absolutely no hardcoded values in components or CSS
- **Variable Consistency**: All tokens must be implemented as CSS variables
- **Theme Completeness**: Every theme file must be fully implemented

### **4. Color Variable Requirements**
```css
:root {
  --color-shadow-deep: #0A0A0A;
  --color-light: #FFFFFF;
  --color-dark: #1A1A1A;
}
```

### **5. CUBE CSS Implementation**
- **Global → Components → Utilities → Blocks**: Follow strict hierarchy
- **Minimal Inline Styles**: Move all component styles to appropriate CSS files
- **Component-Scoped**: Each component must have dedicated CSS file
- **Utility Enhancement**: Extend utilities, don't replace components

## 🛠️ **CODE QUALITY STANDARDS**

### **6. TypeScript Sanctity**
- **Strict Mode**: All TypeScript configurations must be strict
- **Interface-First**: Define interfaces before implementation
- **Type Safety**: No `any` types allowed
- **Generated Types**: Use Content Collection generated types

### **7. Asset Management Protocol**
- **Organized Structure**: Static assets in `/public/` with proper organization
- **Asset Verification**: All referenced assets must exist or have fallbacks
- **Optimization Pipeline**: Use Astro's built-in optimization for images
- **Lazy Loading**: Implement for all non-critical images and assets

### **8. Performance Requirements**
- **Critical CSS**: Extract and inline critical CSS for above-fold content
- **Code Splitting**: Implement proper code splitting for islands
- **Bundle Analysis**: Regular bundle size analysis and optimization
- **Image Optimization**: Use Astro's `<Image />` component everywhere

### **9. Component Architecture**
- **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
- **Slot-Based Design**: Use Astro slots for flexible content insertion
- **Fragment Components**: For complex slot content
- **Prop Interfaces**: Strict TypeScript interfaces for all props

## 🏪 **E-COMMERCE ARCHITECTURE**

### **10. Product Data Structure**
```typescript
// REQUIRED: Product Schema Structure
interface Product {
  id: number;
  status: "Available" | "Unavailable";
  product_name: string;
  size_eu: string;
  collection: string;
  type: string;
  price_pln: number;
  fabric: string;
  base: string | null;
  website_des: string;
  images: string[];
}
```

### **11. Content Collection for Products**
- **Single Product Source**: Use `images_index.json` as Content Collection
- **Type Safety**: Generate TypeScript interfaces from product data
- **Validation**: Implement Zod schemas for product validation
- **Query Optimization**: Use Astro's `getCollection()` with filters

### **12. Routing Architecture**
- **Dynamic Routes**: `/products/[slug]` for individual products
- **Category Pages**: `/collections/[collection]` for product categories
- **Search Results**: `/search?q=query` for search functionality
- **Pagination**: Implement proper pagination for large collections

## 🎨 **GOTHIC DESIGN SYSTEM**

### **13. Gothic Theming Requirements**
- **Dark Theme Default**: Gothic dark theme as primary aesthetic
- **Typography Hierarchy**: Cinzel for headers, serif for body text
- **Asset Integration**: All assets must follow Gothic aesthetic
- **Interactive Consistency**: Uniform hover states and transitions

### **14. Animation Standards**
- **Reduced Motion**: Respect `prefers-reduced-motion`
- **GPU Acceleration**: Use `transform` and `opacity` for animations
- **Animation Tokens**: Define animation durations and easing in tokens
- **Loading States**: Proper loading states for all async operations

## 📊 **SEO & ACCESSIBILITY**

### **15. Semantic HTML Structure**
- **Proper Heading Hierarchy**: Single `<h1>` per page, logical sequence
- **Landmark Elements**: Use `<main>`, `<nav>`, `<section>`, `<article>`
- **Image Alt Text**: Descriptive alt text for all images
- **Link Context**: Meaningful link text, not "click here"

### **16. Modern SEO Implementation**
- **Meta Tags**: Complete meta tags for all pages
- **Structured Data**: JSON-LD for products and e-commerce data
- **Open Graph**: Social media optimization
- **Sitemap**: Automatic sitemap generation

### **17. Accessibility Requirements**
- **WCAG 2.1 AA**: Minimum accessibility standard
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and roles
- **Color Contrast**: WCAG AA contrast ratios

### **18. SACRED CONTENT PROHIBITION**
- **ABSOLUTELY NO GOTHIC CONTENT**: Never generate Gothic-themed descriptions, stories, or atmospheric content
- **NO FANTASY NARRATIVES**: No epic tales, mystical backstories, or dramatic storytelling
- **PLAIN LANGUAGE ONLY**: Use simple, direct, factual descriptions
- **LOREM IPSUM FALLBACK**: If content must be generated, use lorem ipsum placeholder text
- **REAL DATA ONLY**: Use only actual collection names from data files (One Peace, Rusty Oil, Anarchy, Sandy Oil)
- **NO THEMATIC EXAGGERATION**: Describe items as clothing/pants, not as mystical artifacts
- **PROFESSIONAL TONE**: Maintain straightforward, business-like communication

### **19. OFFICIAL DOCUMENTATION SACRED RULE**
- **FOLLOW ONLY OFFICIAL DOCS**: Never apply personal knowledge or "best practices" not from official documentation
- **NO CUSTOM COMPONENTS**: Never create custom components when official ones exist
- **WEBP ONLY**: Use only WebP format for images
- **ZERO BULLSHIT**: No loading animations, no custom containers, no experimental features
- **ASTRO DOCS AUTHORITY**: https://docs.astro.build/en/guides/images/ is the only source of truth
- **NO GENERATIVE ASSUMPTIONS**: Never assume how Astro works - check official docs first
- **SIMPLISTIC APPROACH**: Use the simplest solution that works according to official documentation

### **20. IMAGE USAGE SACRED RULE**
- **UNDERSTAND THE SYSTEM FIRST**: Always analyze the existing image system before making changes
- **PUBLIC/ IMAGES**: Images in `public/` directory are served as-is with NO processing - this is correct
- **SRC/ IMAGES**: Images in `src/` directory get optimized and transformed - only use if you need optimization
- **PLAIN IMG TAGS**: Use standard `<img>` tags for images in `/public/` directory
- **PROPER ATTRIBUTES**: Always include `src`, `alt`, `width`, `height`, and `loading` attributes
- **LAZY LOADING**: Use `loading="lazy"` for below-fold images, `loading="eager"` for hero images
- **NO CUSTOM WRAPPERS**: Never wrap images in custom containers with `[data-astro-cid-x]` attributes
- **SEMANTIC HTML**: Images must be in appropriate semantic contexts

### **21. SYSTEM ANALYSIS SACRED RULE**
- **NEVER CHANGE WORKING SYSTEM**: If the current system works, don't "fix" it without understanding
- **DOCUMENTATION + REALITY**: Follow official docs AND understand how the current system actually works
- **ASK FOR CLARITY**: When in doubt about the system, ask instead of assuming
- **PRESERVE EXISTING STRUCTURES**: Maintain current file organization and data sources
- **INCREMENTAL CHANGES**: Only make changes that improve the system without breaking existing functionality

---

# ASTRO FRAMEWORK

# Astro

> Astro is an all-in-one web framework for building websites. 

- Astro uses island architecture and server-first design to reduce client-side JavaScript overhead and ship high performance websites.
- Astro’s friendly content-focused features like content collections and built-in Markdown support make it an excellent choice for blogs, marketing, and e-commerce sites amongst others.
- The `.astro` templating syntax provides powerful server rendering in a format that follows HTML standards and will feel very familiar to anyone who has used JSX.
- Astro supports popular UI frameworks like React, Vue, Svelte, Preact, and Solid through official integrations.
- Astro is powered by Vite, comes with a fast development server, bundles your JavaScript and CSS for you, and makes building websites feel fun.

## Documentation Sets

- [Abridged documentation](https://docs.astro.build/llms-small.txt): a compact version of the documentation for Astro, with non-essential content removed
- [Complete documentation](https://docs.astro.build/llms-full.txt): the full documentation for Astro
- [API Reference](https://docs.astro.build/_llms-txt/api-reference.txt): terse, structured descriptions of Astro’s APIs
- [How-to Recipes](https://docs.astro.build/_llms-txt/how-to-recipes.txt): guided examples of adding features to an Astro project
- [Build a Blog Tutorial](https://docs.astro.build/_llms-txt/build-a-blog-tutorial.txt): a step-by-step guide to building a basic blog with Astro
- [Deployment Guides](https://docs.astro.build/_llms-txt/deployment-guides.txt): recipes for how to deploy an Astro website to different services
- [CMS Guides](https://docs.astro.build/_llms-txt/cms-guides.txt): recipes for how to use different content management systems in an Astro project
- [Backend Services](https://docs.astro.build/_llms-txt/backend-services.txt): advice on how to integrate backend services like Firebase, Sentry, and Supabase in an Astro project
- [Migration Guides](https://docs.astro.build/_llms-txt/migration-guides.txt): advice on how to migrate a project built with another tool to Astro
- [Additional Guides](https://docs.astro.build/_llms-txt/additional-guides.txt): guides to e-commerce, authentication, testing, and digital asset management in Astro projects

## Notes

- The complete documentation includes all content from the official documentation
- The content is automatically generated from the same source as the official documentation

## Optional

- [The Astro blog](https://astro.build/blog/): the latest news about Astro development