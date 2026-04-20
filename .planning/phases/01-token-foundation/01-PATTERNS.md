# Phase 1: Token Foundation - Pattern Map

**Mapped:** 2026-04-20
**Files analyzed:** 6 (1 new, 1 modified CSS, 4 modified HTML pages)
**Analogs found:** 6 / 6

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `css/tokens.css` | config | transform | `css/style.css` `:root` block (lines 9–23) | role-match — same flat CSS custom property pattern, different values |
| `css/style.css` | config | transform | `css/style.css` itself — full file is the analog; token references, layout utilities, and structural classes carry forward | self-analog — structural sections kept, `:root` values replaced |
| `index.html` | component | request-response | `index.html` `<head>` (lines 1–12) | exact — identical `<head>` pattern shared by all four pages |
| `bespoke.html` | component | request-response | `index.html` `<head>` (lines 1–12) | exact |
| `archive.html` | component | request-response | `index.html` `<head>` (lines 1–12) | exact |
| `commission.html` | component | request-response | `index.html` `<head>` (lines 1–12) | exact |

---

## Pattern Assignments

### `css/tokens.css` (config, transform)

**Analog:** `css/style.css` — `:root` block, lines 9–23

This is a NEW file. It extracts and replaces the existing `:root` block, converting values from the dark theme to the new ivory palette. The flat naming convention (`--bg`, `--text`, etc.) is already established — only values change, plus new tokens for the three-tier text system and SVG placeholder opacity.

**Existing `:root` pattern to replace** (`css/style.css` lines 9–23):
```css
:root {
  --bg:        #0a0806;
  --bg-card:   rgba(232,224,208,0.025);
  --gold:      #BA7517;
  --gold-light:#FAC775;
  --gold-dim:  rgba(186,117,23,0.4);
  --text:      #e8e0d0;
  --text-dim:  rgba(232,224,208,0.5);
  --text-faint:rgba(232,224,208,0.25);
  --border:    rgba(232,224,208,0.06);
  --border-gold:rgba(186,117,23,0.2);
  --serif:     'Playfair Display', 'Georgia', serif;
  --sans:      'Inter', -apple-system, 'Helvetica Neue', sans-serif;
  --ease:      cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

**New token values to write** (implement per decisions D-01 through D-14):
- `--bg`: off-white (#F8F6F3 range — exact hex at Claude's discretion)
- `--text`: near-black (#1A1A1A) — headings (D-03)
- `--text-secondary`: dark grey (#4A4A4A) — body copy (D-03)
- `--text-muted`: medium grey (#8A8A8A) — captions/labels (D-03)
- `--serif`: `'Cormorant Garamond', 'Georgia', serif`
- `--sans`: `'Jost', -apple-system, 'Helvetica Neue', sans-serif`
- `--ease`: luxury easing curve — 500ms+ timing (D-14, exact curve at Claude's discretion)
- Drop all `--gold`, `--gold-light`, `--gold-dim`, `--border`, `--border-gold`, `--bg-card` — no accent color (D-02), no visible borders (D-04)
- No `--border` token — whitespace separates sections (D-04)
- Add `--placeholder-opacity: 0.3` for SVG silhouette placeholders (D-10)

**File header pattern** (copy from `css/style.css` lines 1–5):
```css
/* ============================================================
   TTMD — Time Taken to Make a Dress
   Design Tokens
   ============================================================ */
```

---

### `css/style.css` (config, transform — modification)

**Analog:** `css/style.css` itself — full file

The file is modified in two ways: (1) the `:root` block is deleted entirely (it moves to `tokens.css`), and (2) all `var()` references to retired tokens must be updated to new token names.

**Token rename map** (every occurrence in the file):
| Old token | New token |
|-----------|-----------|
| `var(--bg)` | `var(--bg)` — name kept, value changes via tokens.css |
| `var(--text)` | `var(--text)` — name kept |
| `var(--text-dim)` | `var(--text-secondary)` |
| `var(--text-faint)` | `var(--text-muted)` |
| `var(--gold)` | remove or replace with `var(--text)` per context |
| `var(--gold-light)` | replace with `var(--text)` per context |
| `var(--gold-dim)` | replace with `var(--text-muted)` per context |
| `var(--border)` | remove border declarations entirely (D-04) |
| `var(--border-gold)` | remove border declarations entirely (D-04) |
| `var(--bg-card)` | remove or replace with `var(--bg)` per context |
| `var(--serif)` | `var(--serif)` — name kept, value changes |
| `var(--sans)` | `var(--sans)` — name kept, value changes |
| `var(--ease)` | `var(--ease)` — name kept, value changes |

**Sections to preserve structurally** (layout utilities, not visual tokens):

`.container` pattern (`css/style.css` lines 73–77):
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(24px, 4vw, 64px);
}
```

`.section` pattern (`css/style.css` lines 79–82) — remove `border-bottom`:
```css
.section {
  padding: clamp(64px, 10vw, 140px) 0;
  /* border-bottom removed per D-04 */
}
```

`clamp()` fluid typography pattern (`css/style.css` lines 61–63) — carry forward, update font-family references:
```css
h1 { font-size: clamp(36px, 5.5vw, 72px); letter-spacing: -0.02em; }
h2 { font-size: clamp(28px, 3.5vw, 48px); letter-spacing: -0.01em; }
h3 { font-size: clamp(20px, 2vw, 28px); }
```

`.reveal` scroll animation pattern (`css/style.css` lines 207–222) — carry forward intact, transition timing will lengthen to 500ms+ per D-14:
```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Placeholder block to replace** (`css/style.css` lines 281–297):
Old pattern used a gradient + border + `data-label` text pseudo-element. New pattern (`css/tokens.css` + updated `style.css`) uses aspect-ratio containers with inline SVG silhouettes at `var(--placeholder-opacity)` opacity (D-08 through D-10). The `.placeholder-img` class remains the hook; its visual implementation changes.

**Hover/transition patterns to update** — nav links (`css/style.css` lines 123–151). Color transitions move from gold → grey spectrum; underline reveal pattern (thin line on hover, D-12) is preserved:
```css
.nav-links a {
  /* color transitions: text-muted → text on hover (D-11) */
  transition: color 0.5s var(--ease); /* 500ms per D-14 */
}
.nav-links a::after {
  /* underline reveal: opacity/width on hover (D-12) */
  background: var(--text);
}
```

Button darkening pattern (D-13) — `btn-primary` dark background darkens to full black on hover:
```css
.btn-primary:hover {
  background: #000000; /* darkens from near-black to full black */
}
```

---

### HTML pages: `index.html`, `bespoke.html`, `archive.html`, `commission.html` (`<head>` modification)

**Analog:** `index.html` lines 8–12 (identical pattern in all four pages)

**Current `<head>` CSS/font block** (lines 8–12 of every page):
```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
```

**New `<head>` CSS/font block** (replace the block above):
```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/style.css">
```

Rules:
- `tokens.css` MUST be linked before `style.css` so `var()` references resolve
- Font families swap from `Playfair+Display` + `Inter` to `Cormorant+Garamond` + `Jost` per CLAUDE.md weights
- Preconnect links remain — they apply to any Google Fonts request

**All four pages share the identical swap.** No page-specific `<head>` variation required.

---

## Shared Patterns

### Flat `:root` custom property convention
**Source:** `css/style.css` lines 9–23
**Apply to:** `css/tokens.css` (new file)

No preprocessor, no CSS layers, no primitive/semantic split. All tokens are a single flat `:root` block. Token names are short and meaningful (D-05, D-06). `tokens.css` is the only file that contains `:root` — `style.css` `:root` block is removed.

### `clamp()` fluid values
**Source:** `css/style.css` lines 61–63, 76–81, 91
**Apply to:** `css/style.css` (retained in modified file)

All responsive sizing uses `clamp(min, fluid, max)` — no media query breakpoints for font sizing. This pattern is unchanged; only font-family values updating.

### Transition timing convention
**Source:** `css/style.css` — `var(--ease)` used on lines 100, 130, 166, 180, 197, 265, 268
**Apply to:** All hover/focus states in `css/style.css`

The `--ease` token is already referenced everywhere. Updating the token value in `tokens.css` propagates the 500ms+ luxury timing (D-14) site-wide without touching individual rules. Where transition durations are hard-coded (e.g., `0.3s` on nav links line 130), update to `0.5s` to align with D-14.

### File header comment block
**Source:** `css/style.css` lines 1–5
**Apply to:** `css/tokens.css`

```css
/* ============================================================
   TTMD — Time Taken to Make a Dress
   [File description]
   ============================================================ */
```

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| SVG silhouette assets (inline or `img/`) | component | transform | No SVG illustration assets exist in the codebase. Silhouette artwork must be created from scratch per D-08, D-09. Three variants: flowing gown (hero), structured gown (gallery), draped textile (fabric sections). Rendered at 30% opacity in aspect-ratio containers (D-10). |

---

## Metadata

**Analog search scope:** `/css/`, `/js/`, `*.html` (root)
**Files scanned:** 7 (style.css, main.js, index.html, bespoke.html, archive.html, commission.html, ttmd_strategy.html)
**Pattern extraction date:** 2026-04-20
