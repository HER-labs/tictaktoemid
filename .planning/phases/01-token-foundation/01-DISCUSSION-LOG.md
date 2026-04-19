# Phase 1: Token Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-19
**Phase:** 01-token-foundation
**Areas discussed:** Ivory palette warmth, Token naming depth, Placeholder motif, Interaction states

---

## Ivory Palette Warmth

### Background warmth

| Option | Description | Selected |
|--------|-------------|----------|
| Warm parchment | Creamy, aged linen (#FAF7F2 range). Tactile, luxurious, bridal benchmarks. | |
| Cool crisp white | Clean bright white (#FFFFFF/#FAFAFA). Modern, gallery-like. | |
| Neutral off-white | Split the difference (#F8F6F3 range). Not vintage, not tech. | ✓ |

**User's choice:** Neutral off-white
**Notes:** None

### Accent color

| Option | Description | Selected |
|--------|-------------|----------|
| Dark brass | Muted aged brass (#8B6914). Quiet luxury. | |
| Keep current gold | Retain #BA7517. Brighter, more assertive. | |
| Near-black only | No gold/brass. Pure minimalism. | |

**User's choice:** No accent color at all — black and shades of grey only. Color comes from photography alone.
**Notes:** User clarified before selecting: "slight off white background, text in black of shades of grey only"

### Grey text tiers

| Option | Description | Selected |
|--------|-------------|----------|
| Three tiers | Near-black, dark grey, medium grey. Clean hierarchy. | ✓ |
| Two tiers | Just black and one grey. Maximum simplicity. | |
| Four tiers | Near-black, dark grey, medium grey, light grey for borders. | |

**User's choice:** Three tiers (#1A1A1A, #4A4A4A, #8A8A8A)
**Notes:** None

### Borders and dividers

| Option | Description | Selected |
|--------|-------------|----------|
| Light grey lines | Subtle 1px borders in #E5E3E0 range. | |
| No visible borders | Whitespace alone separates sections. | ✓ |
| You decide | Let Claude choose. | |

**User's choice:** No visible borders — whitespace only
**Notes:** None

---

## Token Naming Depth

### Token structure

| Option | Description | Selected |
|--------|-------------|----------|
| Flat & simple | Meaningful names like --bg, --text. ~10 tokens. | ✓ |
| Two-layer | Primitives + semantics. ~20 tokens. | |
| You decide | Let Claude pick. | |

**User's choice:** Flat & simple
**Notes:** None

### File organization

| Option | Description | Selected |
|--------|-------------|----------|
| Separate tokens.css | Dedicated css/tokens.css imported first. | ✓ |
| Keep in style.css | Tokens stay in :root of existing file. | |

**User's choice:** Separate tokens.css
**Notes:** None

---

## Placeholder Motif

### SVG motif style

| Option | Description | Selected |
|--------|-------------|----------|
| Dress silhouette | Minimal single-line gown outline. Context-specific. | ✓ |
| Needle & thread | Continuous-line needle with trailing thread. | |
| Abstract cross-hatch | Geometric cross-hatch or linen texture. | |
| You decide | Let Claude choose. | |

**User's choice:** Dress silhouette
**Notes:** None

### Variants

| Option | Description | Selected |
|--------|-------------|----------|
| One universal silhouette | Same everywhere. Simpler. | |
| 2-3 variants by context | Different outlines for hero, gallery, fabric. | ✓ |
| You decide | Let Claude determine. | |

**User's choice:** 2-3 variants by context
**Notes:** None

---

## Interaction States

### Hover/focus feel

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle opacity darken | Text darkens, links gain underline, buttons go full black. | ✓ |
| Underline reveals | No color change, thin underline slides in. | |
| Background tint | Faint grey background appears behind element. | |

**User's choice:** Subtle opacity darken
**Notes:** None

### Transition timing

| Option | Description | Selected |
|--------|-------------|----------|
| Medium (300ms) | Standard editorial feel. | |
| Slow luxury (500ms+) | Deliberately languid. "We don't rush." | ✓ |
| You decide | Let Claude set per interaction type. | |

**User's choice:** Slow luxury (500ms+)
**Notes:** None

---

## Claude's Discretion

- Exact hex values within specified ranges
- SVG silhouette artwork design
- Typography token specifics (weights, spacing, line-height)
- Easing curve choices
- Which CSS properties get transition timing

## Deferred Ideas

None — discussion stayed within phase scope
