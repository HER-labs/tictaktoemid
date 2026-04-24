# Phase 3: Homepage + Bespoke - Context

**Gathered:** 2026-04-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Finalize the two core narrative pages — homepage and bespoke — so they deliver the full emotional arc. The homepage takes visitors from hero landing through craftsmanship clock, process steps, featured commission, to WhatsApp CTA. The bespoke page walks through five chapters of the commission journey, fabric archive, and "Our promise" triptych. Both pages already have working HTML content from prior phases; this phase polishes animations, removes orphaned dark-theme styles, and ensures every section drives toward WhatsApp conversion.

</domain>

<decisions>
## Implementation Decisions

### Scroll Animations
- **D-01:** Animation approach is Claude's discretion — somewhere between subtle and choreographed. Use editorial restraint appropriate for a luxury atelier. GSAP is loaded via CDN and available for sequencing where simple CSS reveals aren't sufficient.
- **D-02:** Craftsmanship clock counts up once per session only. First scroll-into-view triggers the animation; scrolling back shows the static final number. No localStorage persistence — re-animates on new sessions.
- **D-03:** Process steps, philosophy quote, featured commission, and CTA banner all use scroll-reveal fade-up animations on entry (per success criteria).

### Dark Theme Cleanup
- **D-04:** Remove ALL orphaned dark-theme CSS. Strip out every reference to `--gold`, `--gold-light`, `--gold-dim`, `--border-gold`, `--border`, `--text-dim`, `--text-faint`, `--bg-card`, and any other undefined variables from the old theme. Replace with Phase 1 token equivalents from `tokens.css` or remove entirely.
- **D-05:** Remove all inline `<style>` blocks in index.html that reference orphaned variables. Move any salvageable styles to `css/style.css` using proper tokens.

### Hero CTA Strategy
- **D-06:** Desktop hero shows two CTAs: primary button opens WhatsApp (wa.me link with pre-filled message), secondary text link goes to commission.html for visitors who want more info first.
- **D-07:** Mobile hero shows WhatsApp CTA only — direct to wa.me link, no intermediate page. Zero friction on the primary device.

### Content
- **D-08:** Content copy is pending client review. Current homepage and bespoke page text ships as-is for now. Client will review via preview URL and provide feedback for a content update pass.
- **D-09:** Featured commission (Cathedral Gown) stats: 1,440 hours, 3,200 crystals, 8 fittings. Keep unless client says otherwise.

### Preview Deployment
- **D-10:** Client preview via Plesk subdirectory at `timetakentomakedress.com/preview/`. Upload static files to a `/preview/` folder on the existing hosting. Manual upload via Plesk file manager or FTP.

### Claude's Discretion
- Exact animation timing, easing, and stagger delays for scroll reveals
- Whether to use GSAP or native CSS for specific animations (GSAP available for complex sequencing)
- How to handle the hero overlay with the real gown photo (user adjusted to 6-20% opacity range)
- Chapter parallax effects on bespoke page (if any)
- Process step stagger timing
- Specific token values to replace orphaned dark-theme variables

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `css/tokens.css` — Design tokens (color, typography, spacing, easing). All replacements for orphaned dark-theme variables come from here.
- `css/style.css` — Shared styles including `.reveal`, `.cta-banner`, `.clock-*`, `.process-*`, `.placeholder-img` classes
- `CLAUDE.md` §Animation — GSAP v3.13 CDN URLs, Intersection Observer for class-toggling reveals
- `CLAUDE.md` §Typography — Cormorant Garamond + Jost pairing

### Prior Phase Context
- `.planning/phases/01-token-foundation/01-CONTEXT.md` — Token decisions: off-white background, monochromatic palette, three-tier grey text, 500ms+ transitions, no borders
- `.planning/phases/02-shared-chrome/02-CONTEXT.md` — Shared chrome decisions: WhatsApp CTA editorial style, mobile-first, no floating buttons

### Existing Code
- `index.html` — Homepage with hero (real gown photo), clock, process, featured commission, CTA. Has orphaned inline styles to clean up.
- `bespoke.html` — Bespoke page with 5 chapters, fabric archive, promise triptych. Has orphaned dark-theme references.
- `js/main.js` — Nav scroll, hamburger toggle, craftsmanship clock (12hrs/day, 6 days/week since 2010), counter animation, scroll reveals

### Requirements
- `.planning/REQUIREMENTS.md` — HP-01 through HP-06, BP-01 through BP-05, WA-03, AN-01, AN-02

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.reveal` CSS class + Intersection Observer in main.js — fade-up on scroll, 12% threshold
- `.clock-section` / `.clock-number` / `#craft-clock` — craftsmanship clock with count-up animation already working
- `.process-grid` / `.process-step` — five-step process layout with icons, descriptions, hours
- `.chapter` / `.chapter.reversed` — alternating image/text layout for bespoke chapters
- `.fabric-card` / `.fabric-grid` — fabric archive card layout with swatch, name, origin, description
- `.promise-grid` / `.promise-cell` — triptych layout for "Our promise" section
- `.cta-banner` CSS class — editorial CTA banner (added in Phase 2)
- `.featured-grid` — featured commission layout with image and stats

### Established Patterns
- 768px mobile breakpoint — consistent across all pages
- 500ms transitions with `var(--ease)` — luxury timing
- `.eyebrow` class for section labels (Jost uppercase, wide tracking)
- `.body-text` class for paragraph content
- `reveal-delay-1` through `reveal-delay-4` for staggered reveals

### Integration Points
- `main.js` already handles clock animation, scroll reveals, and nav behavior
- Hero background image set via inline CSS (`img/homepage_white_dramatic_gown.png`)
- GSAP loaded via CDN on all pages but not yet used — available for enhanced animations

</code_context>

<specifics>
## Specific Ideas

- Mobile hero should go directly to WhatsApp — no intermediate commission page
- Desktop hero gets both WhatsApp button (primary) and commission page link (secondary)
- Client needs to review content before final — preview at Plesk subdirectory
- The atelier does private house calls — "We come to you" messaging in footer (already implemented)
- Process step hours have been updated (x4 from original): Sketch ~160, Toile ~120, Fitting ~180, Craft ~880, Reveal ~100

</specifics>

<deferred>
## Deferred Ideas

- Process video for "How a Gown is Born" section — needs real video content from client
- Content updates based on client feedback after preview review

</deferred>

---

*Phase: 03-homepage-bespoke*
*Context gathered: 2026-04-24*
