<!-- GSD:project-start source:PROJECT.md -->
## Project

**TTMD — Time Taken to Make a Dress**

A luxury static website for TTMD, a Singapore-based bespoke gown atelier at 337A Beach Road. The site replaces a broken WordPress installation on Plesk hosting (timetakentomakedress.com) with a hand-coded HTML/CSS/JS site that communicates the craftsmanship, exclusivity, and price-point justification of $15k–$50k+ bespoke commissions. The visual language is warm ivory with minimal color — photography-first, editorial, quiet luxury.

**Core Value:** The site must make a visitor *feel* the time, patience, and craft invested in every gown — so that by the time they reach WhatsApp, the $20k price point feels inevitable.

### Constraints

- **Hosting**: Plesk — static HTML/CSS/JS only, no server-side rendering or API routes
- **Content**: No real photography yet — must use elegant placeholders that swap easily
- **Platform**: No build tools required — hand-coded, no npm/webpack/bundler dependency
- **Budget**: This is the foundational build, not the full $60k strategy — ship value fast
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Approach
### Typography
| Role | Font | Weights | Why |
|------|------|---------|-----|
| Display / headings | Cormorant Garamond | 300, 400, 500, 600 | Renaissance-derived, extreme stroke contrast, overtly editorial — closer to Didot than Playfair. Used in bridal and haute couture contexts for its literariness. 2M+ websites but far less mainstream than Playfair Display in fashion contexts. |
| Body / navigation / labels | Jost | 300, 400, 500 | Geometric sans-serif inspired by 1920s German type (Futura lineage). Larger x-height than Futura makes it more legible at small sizes. Clean and modern without being cold. Pairs with Cormorant's drama through contrast, not competition. |
### CSS Architecture
#### Token System (Root Variables)
### CSS File Architecture
### Animation
#### Tier 1: Native CSS Scroll-Driven Animations + Intersection Observer
- **CSS `animation-timeline: view()`** for fade-in-on-scroll effects
- **Intersection Observer API** for class-toggling reveals (20 lines of vanilla JS)
- No library needed for 80% of animations
#### Tier 2: GSAP v3.13 for Signature Animations
### Image Strategy
#### Placeholder Architecture (Pre-Photography Phase)
#### Production Image Delivery (Post-Photography Phase)
### WhatsApp CTA Integration
### Supporting Libraries (CDN-Loadable)
| Library | Version | CDN URL | Purpose | Load Condition |
|---------|---------|---------|---------|----------------|
| GSAP Core | 3.13.0 | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js` | Animation engine | All pages |
| GSAP ScrollTrigger | 3.13.0 | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js` | Scroll-triggered animations | All pages |
| GSAP SplitText | 3.13.0 | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js` | Character/word text reveals | Homepage, Bespoke page |
| Google Fonts | latest | See typography section above | Cormorant Garamond + Jost | All pages |
- jQuery — not needed, modern DOM APIs are sufficient
- Bootstrap / Tailwind — require build step or add CSS bloat
- AOS (Animate On Scroll) — GSAP covers its use case with more precision
- Alpine.js — no reactive state needed for this site
## Alternatives Considered
| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Display font | Cormorant Garamond | Playfair Display | Playfair is ubiquitous in wedding/lifestyle, reads as "template" |
| Display font | Cormorant Garamond | Bodoni Moda | Bodoni is heavier, more aggressive — right for magazine covers, not quiet luxury |
| Body font | Jost | Lato | Lato is warmer but less geometric precision; less alignment with the design benchmarks |
| Body font | Jost | Inter | Inter reads as "tech product UI" — wrong register for a $20k gown atelier |
| Animation | GSAP | AOS (Animate On Scroll) | AOS is simpler but produces generic agency-look animations; GSAP offers precision |
| Animation | GSAP | Native CSS only | Native lacks the sequencing control needed for clock/counter components |
| CSS | Custom tokens | Tailwind CDN | Tailwind CDN includes 3MB of utility classes; utility classes produce visually inconsistent output |
| Images | `<picture>` element | Cloudinary free tier | Cloudinary adds external dependency; Plesk serving is sufficient for a boutique site |
## Performance Budget
## Confidence Summary
| Area | Confidence | Basis |
|------|------------|-------|
| Typography pairing | HIGH | Google Fonts specimen verification + multiple luxury branding sources |
| CSS token architecture | HIGH | Standard practice, zero dependencies, verified via CSS spec |
| GSAP CDN URLs | HIGH | Verified via cdnjs.com (v3.13.0 confirmed) |
| Native scroll animations | MEDIUM | Safari 26 support confirmed in web sources; could not verify exact Safari release date from Apple directly |
| Image strategy | HIGH | `<picture>` element is W3C standard; Squoosh.app is Google-maintained |
| WhatsApp integration | HIGH | wa.me URL scheme is WhatsApp's documented standard |
## Sources
- [Cormorant Garamond — Google Fonts](https://fonts.google.com/specimen/Cormorant+Garamond)
- [Jost — Google Fonts](https://fonts.google.com/specimen/Jost)
- [Luxury Brand Typography: Lessons from Chanel, Dior](https://dirtylinestudio.com/luxury-brand-typography/)
- [GSAP v3.13 — cdnjs](https://cdnjs.com/libraries/gsap)
- [GSAP ScrollTrigger Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [CSS Scroll-Driven Animations — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [Picture element — web.dev](https://web.dev/learn/design/picture-element)
- [Image Optimization 2025: WebP/AVIF, srcset](https://aibudwp.com/image-optimization-in-2025-webp-avif-srcset-and-preload/)
- [CSS aspect-ratio — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio)
- [Intersection Observer API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Blurry Image Placeholders — Mux](https://www.mux.com/blog/blurry-image-placeholders-on-the-web)
- [Luxury Website Colors — Hook Agency](https://hookagency.com/blog/luxury-website-colors/)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
