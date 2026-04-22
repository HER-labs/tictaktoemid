# Phase 2: Shared Chrome - Context

**Gathered:** 2026-04-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the reusable shell that every page shares: fixed navigation bar, mobile hamburger overlay, site footer, WhatsApp CTA component, and image directory structure. No page-specific content is built here — only the shared components and asset organization that all pages pull from.

</domain>

<decisions>
## Implementation Decisions

### Navigation Bar
- **D-01:** Brand appears as a text wordmark — "TIME TAKEN TO MAKE A DRESS" in Jost uppercase with wide letter-spacing. No logo image.
- **D-02:** Four nav links: Bespoke, Archive, Rental, Contact. "Contact" opens WhatsApp (wa.me link). Homepage reached by clicking the wordmark.
- **D-03:** Frosted glass effect throughout — starts semi-transparent (rgba with backdrop-blur), becomes more opaque on scroll. No fully-transparent or solid states. Already coded as `.nav` / `.nav.scrolled` pattern in style.css.
- **D-04:** Mobile hamburger opens a full-screen ivory overlay below the nav bar. Links stacked vertically with large touch targets.
- **D-05:** Mobile overlay includes a prominent WhatsApp CTA button at the bottom — every menu open is a conversion opportunity.

### WhatsApp CTA Component
- **D-06:** Visual style is a full-width editorial banner — section-width block with compelling headline, subtext, and a dark button. No green, no WhatsApp branding, no floating bubble. Luxury magazine ad strip aesthetic.
- **D-07:** Pre-filled message is occasion-focused: "Hello — I'd like to discuss a bespoke commission for [occasion]." Signals a qualified lead with intent.
- **D-08:** Button text varies by page context: Homepage → "Begin your commission", Bespoke → "Start your journey", Archive → "Enquire about a gown", Rental → "Enquire about rental".
- **D-09:** No persistent floating WhatsApp button anywhere. Only in-page editorial CTA blocks. Floating elements read as mass-market.
- **D-10:** On mobile, tapping the CTA opens WhatsApp directly via wa.me link — no intermediate confirmation sheet.

### Footer
- **D-11:** Footer brand section includes the text wordmark and a short tagline (e.g., "Celebrating the time taken."). No physical address — the atelier is personal/mobile, they come to the client's home.
- **D-12:** Instagram only for social links — primary visual platform for haute couture. One link, clean and focused.
- **D-13:** Footer navigation mirrors the main nav: Bespoke, Archive, Rental, Contact (WhatsApp). Consistent, no surprises.

### Image Directory Structure
- **D-14:** Organized by role: `images/hero/`, `images/gowns/`, `images/process/`, `images/fabric/`, `images/rental/`. Each folder maps to a page section.
- **D-15:** SVG placeholders live separately in `images/placeholders/`. Real photos go in their role folders. Clean separation — when photos arrive, never touch the placeholder folder.
- **D-16:** Descriptive kebab-case naming: `hero-homepage.jpg`, `gown-bridal-01.jpg`, `process-sketch.jpg`. Self-documenting filenames.

### Mobile-First Priority
- **D-17:** Most clients will view on mobile. All shared chrome components must be designed mobile-first. Touch targets, readability, and WhatsApp tap-through are priority over desktop polish.

### Claude's Discretion
- Exact headline/subtext copy for the WhatsApp CTA banner (within the editorial tone)
- Tagline wording for the footer brand section
- Hamburger animation (bar → X transition timing)
- Footer responsive layout breakpoints
- Instagram icon style (outline vs filled, custom or Font Awesome)
- Exact number of image subdirectories beyond the five specified (if edge cases arise)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `css/tokens.css` — Design tokens (color, typography, spacing, easing). All shared chrome components pull from these tokens.
- `css/style.css` — Existing nav, footer, button, and placeholder CSS patterns. Phase 2 builds on and extends these existing styles.
- `CLAUDE.md` §Typography — Cormorant Garamond + Jost pairing, Google Fonts CDN loading
- `CLAUDE.md` §WhatsApp CTA Integration — wa.me URL scheme and pre-filled message format
- `CLAUDE.md` §Animation — GSAP v3.13 CDN URLs for nav scroll animation (AN-04)

### Requirements
- `.planning/REQUIREMENTS.md` — SC-01 through SC-04, IMG-03, IMG-04, WA-01, WA-02, AN-04

### Prior Phase Context
- `.planning/phases/01-token-foundation/01-CONTEXT.md` — Token decisions: off-white background, monochromatic palette, three-tier grey text, 500ms+ transitions, no borders

### Existing Code
- `index.html` — Current page structure with old dark-theme hero styles that need updating to use shared chrome components
- `bespoke.html`, `archive.html`, `commission.html` — Other pages that will adopt the shared nav/footer

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.nav` CSS block (style.css:68-83) — Frosted glass nav with backdrop-blur already coded. Needs scroll state JS and link content.
- `.nav-links` CSS (style.css:98-133) — Link styling with hover underline animation already in place.
- `.nav-toggle` CSS (style.css:134-148) — Hamburger toggle structure exists, needs JS for open/close behavior.
- `.site-footer` CSS (style.css:203-256) — Full footer layout with brand, nav columns, and bottom bar. Needs content and social link additions.
- `.btn-primary` / `.btn-outline` CSS (style.css:150-180) — Button styles ready for WhatsApp CTA component.
- `.placeholder` CSS (style.css:258-295) — Placeholder system with hero/portrait/fabric variants ready for the image directory.
- `.reveal` CSS (style.css:186-201) — Scroll reveal animation classes ready for CTA sections.

### Established Patterns
- 768px mobile breakpoint — nav collapses to hamburger, footer stacks vertically
- 500ms transitions with `var(--ease)` — all interactive elements use this timing
- Jost uppercase + wide tracking for nav/label elements
- No visible borders — whitespace-only separation (from Phase 1 D-04)

### Integration Points
- Every HTML page `<head>` already links `tokens.css` + `style.css` (set up in Phase 1)
- Nav and footer HTML must be replicated identically across `index.html`, `bespoke.html`, `archive.html`, `commission.html`
- `js/main.js` exists (4.3KB) — nav scroll state JS and hamburger toggle JS would go here
- Image `src` attributes in HTML will reference the new `images/` directory structure

</code_context>

<specifics>
## Specific Ideas

- Most clients view on mobile — mobile-first priority for all shared components
- The atelier is now personal/home-visit — no physical address in footer or anywhere
- "Contact" nav link should open WhatsApp, not a contact page
- WhatsApp CTA should feel like a magazine ad strip, not a tech widget
- Every menu open on mobile = conversion opportunity (CTA button in overlay)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-shared-chrome*
*Context gathered: 2026-04-22*
