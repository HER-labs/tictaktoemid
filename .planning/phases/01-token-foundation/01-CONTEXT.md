# Phase 1: Token Foundation - Context

**Gathered:** 2026-04-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the CSS design token system (color, typography, spacing, interaction states) and smart image placeholder system. This is the visual foundation every page built in subsequent phases pulls from. No page content is built here — only the shared token file, typography loading, and placeholder component.

</domain>

<decisions>
## Implementation Decisions

### Color Palette
- **D-01:** Background is neutral off-white (#F8F6F3 range) — not warm parchment, not cool white
- **D-02:** No gold, brass, or accent color at all — palette is purely black and grey on off-white. Color comes exclusively from photography
- **D-03:** Three-tier grey text system: near-black (#1A1A1A) for headings, dark grey (#4A4A4A) for body, medium grey (#8A8A8A) for captions/labels
- **D-04:** No visible borders or dividers — whitespace alone separates sections

### Token Architecture
- **D-05:** Flat token naming — simple meaningful names like `--bg`, `--text`, `--text-secondary`. No primitive/semantic/component layers
- **D-06:** ~10 tokens total — keep it minimal and easy to hand-edit
- **D-07:** Tokens live in a separate `css/tokens.css` file, imported first by every page

### Placeholder System
- **D-08:** Placeholders use fine-line dress silhouette SVG motifs on the off-white surface — not grey blocks
- **D-09:** 2-3 silhouette variants by context (e.g., flowing gown for hero, structured gown for gallery, draped textile for fabric sections)
- **D-10:** Silhouettes rendered at ~30% opacity, centered in aspect-ratio containers

### Interaction States
- **D-11:** Hover/focus states use subtle opacity darkening — text darkens from secondary grey to near-black on hover
- **D-12:** Links reveal a thin underline on hover (no color change)
- **D-13:** Buttons darken from near-black to full black on hover
- **D-14:** All transitions use slow luxury timing (500ms+) — "we don't rush"

### Claude's Discretion
- Exact hex values within the specified ranges (off-white, grey tiers)
- Specific SVG silhouette artwork design
- Typography token values (font weights, letter-spacing, line-height) per CLAUDE.md spec (Cormorant Garamond + Jost)
- Easing curve choices for transitions
- Which CSS properties get transition timing

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design Direction
- `CLAUDE.md` §Typography — Cormorant Garamond (300, 400, 500, 600) + Jost (300, 400, 500) pairing with specific CDN loading
- `CLAUDE.md` §CSS Architecture — Token system structure and CSS file architecture
- `CLAUDE.md` §Animation — GSAP v3.13 CDN URLs and tier strategy
- `CLAUDE.md` §Image Strategy — Placeholder architecture for pre-photography phase

### Requirements
- `.planning/REQUIREMENTS.md` — DS-01 through DS-05, IMG-01, IMG-02

### Existing Code
- `css/style.css` — Current dark-theme implementation to be replaced; preserves structural patterns (clamp(), layout utilities, nav structure)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `css/style.css` `:root` block — structure can be adapted to new palette (flat custom property pattern already in place)
- Existing `clamp()` fluid typography — aligns with DS-04, can be carried forward with new font family values
- `.container`, `.section` layout utilities — structural CSS can persist, only visual tokens change

### Established Patterns
- Flat CSS custom properties in `:root` (no preprocessor, no layers) — confirmed as the approach
- CDN-loaded Google Fonts — will switch from Playfair+Inter to Cormorant Garamond+Jost
- Single `css/style.css` file — will split into `css/tokens.css` + `css/style.css`

### Integration Points
- Every HTML page's `<head>` needs `<link>` to `css/tokens.css` before `css/style.css`
- Google Fonts `<link>` in `<head>` needs to swap font families
- All color/font `var()` references throughout `style.css` and inline styles will reference new token names

</code_context>

<specifics>
## Specific Ideas

- The palette should feel like fine stationery — neutral, not warm, not cold
- "We don't rush" as a design principle — 500ms+ transitions make interactions feel intentional
- Photography is the only source of color — the token system is deliberately monochromatic
- Dress silhouette placeholders should feel like fashion sketches, not icons

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-token-foundation*
*Context gathered: 2026-04-19*
