# Phase 3: Homepage + Bespoke - Research

**Researched:** 2026-04-24
**Domain:** Static HTML/CSS/JS — CSS variable migration, scroll animation, hero CTA architecture
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Animation approach is Claude's discretion — somewhere between subtle and choreographed. Use editorial restraint appropriate for a luxury atelier. GSAP is loaded via CDN and available for sequencing where simple CSS reveals aren't sufficient.
- **D-02:** Craftsmanship clock counts up once per session only. First scroll-into-view triggers the animation; scrolling back shows the static final number. No localStorage persistence — re-animates on new sessions.
- **D-03:** Process steps, philosophy quote, featured commission, and CTA banner all use scroll-reveal fade-up animations on entry.
- **D-04:** Remove ALL orphaned dark-theme CSS. Strip out every reference to `--gold`, `--gold-light`, `--gold-dim`, `--border-gold`, `--border`, `--text-dim`, `--text-faint`, `--bg-card`, and any other undefined variables from the old theme. Replace with Phase 1 token equivalents from `tokens.css` or remove entirely.
- **D-05:** Remove all inline `<style>` blocks in index.html that reference orphaned variables. Move any salvageable styles to `css/style.css` using proper tokens.
- **D-06:** Desktop hero shows two CTAs: primary button opens WhatsApp (wa.me link with pre-filled message), secondary text link goes to commission.html for visitors who want more info first.
- **D-07:** Mobile hero shows WhatsApp CTA only — direct to wa.me link, no intermediate page. Zero friction on the primary device.
- **D-08:** Content copy is pending client review. Current homepage and bespoke page text ships as-is for now.
- **D-09:** Featured commission (Cathedral Gown) stats: 1,440 hours, 3,200 crystals, 8 fittings.
- **D-10:** Client preview via Plesk subdirectory at `timetakentomakedress.com/preview/`. Manual upload.

### Claude's Discretion

- Exact animation timing, easing, and stagger delays for scroll reveals
- Whether to use GSAP or native CSS for specific animations (GSAP available for complex sequencing)
- How to handle the hero overlay with the real gown photo (user adjusted to 6–20% opacity range)
- Chapter parallax effects on bespoke page (if any)
- Process step stagger timing
- Specific token values to replace orphaned dark-theme variables

### Deferred Ideas (OUT OF SCOPE)

- Process video for "How a Gown is Born" section — needs real video content from client
- Content updates based on client feedback after preview review
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HP-01 | Full-viewport hero section with brand wordmark, tagline, and WhatsApp CTA | Hero already rendered; needs CTA restructure (D-06/D-07) and orphaned variable cleanup |
| HP-02 | Live craftsmanship clock counter with animated count-up on first view | Clock exists in main.js and index.html; needs `.clock-number` variable cleanup, session-once behavior (D-02) confirmed by unobserve pattern |
| HP-03 | Philosophy quote section | Section exists; needs `--text-dim` → `--text-secondary` and `--gold-dim` → `--text-tertiary` substitution |
| HP-04 | Five-step process section | Section exists; needs grid variable cleanup and GSAP stagger opportunity |
| HP-05 | Featured commission section with editorial image placeholder and stats | Section exists; needs variable cleanup and placeholder class migration |
| HP-06 | CTA banner section linking to WhatsApp | `.cta-banner` class already in style.css; section already in index.html |
| BP-01 | Page hero with "The bespoke experience" framing | `.page-hero` exists in bespoke.html; needs dark gradient `#0d0905` removal |
| BP-02 | Five alternating image/text chapters | All five chapters exist; need variable cleanup |
| BP-03 | Fabric archive section with 4+ material cards | Four fabric cards exist; need `--bg-card` → `--bg-surface` and `--border-gold` cleanup |
| BP-04 | "Our promise" section (Singular, Unhurried, Hand-finished) | Three-cell promise grid exists; needs variable cleanup |
| BP-05 | CTA section linking to WhatsApp | `.cta-banner` section exists with "Start your journey" button |
| WA-03 | WhatsApp CTA on every page as primary conversion path | Both pages have WhatsApp links; hero CTA strategy needs D-06/D-07 implementation |
| AN-01 | Scroll-reveal animations on section entry (fade-up, 800ms ease-out) | `.reveal` class and IntersectionObserver exist; many sections missing `.reveal` class |
| AN-02 | Craftsmanship clock count-up animation on first view | `animateCounter` function exists; clock observer unobserves after trigger (correct) |
</phase_requirements>

---

## Summary

Phase 3 is a polish-and-wire phase on two pages that already exist structurally. Both `index.html` and `bespoke.html` have full HTML content including all required sections. The gap is threefold: (1) all page-specific styles live in inline `<style>` blocks referencing eight orphaned CSS variables from the dark theme (`--gold`, `--gold-light`, `--gold-dim`, `--border-gold`, `--border`, `--text-dim`, `--text-faint`, `--bg-card`) that do not exist in the current `tokens.css`; (2) the hero CTA on the homepage uses `btn-outline` pointing to `commission.html` instead of the required WhatsApp link with desktop/mobile split; (3) several sections lack `.reveal` class assignments or have them on container elements that won't stagger properly.

The design system from Phase 1 (`tokens.css`, `style.css`) provides exactly five color tokens, the `--border-subtle` token needs to be added, and the UI-SPEC provides a precise variable-to-token mapping table that covers every orphaned reference. The existing scroll-reveal infrastructure in `main.js` and the craftsmanship clock counter are both functional and correct. GSAP is loaded but unused — it is available for optional enhancement of the process step stagger and chapter entrances.

**Primary recommendation:** Work in three sequential passes: (1) add `--border-subtle` token to `tokens.css`, then migrate all inline styles to `css/style.css` with orphaned variables replaced; (2) restructure hero CTAs per D-06/D-07; (3) audit and add `.reveal` classes for all sections that need scroll-reveal entry animations.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Scroll reveal animations | Browser/Client | — | IntersectionObserver + CSS class toggling runs entirely in the browser with no server involvement |
| Craftsmanship clock | Browser/Client | — | JavaScript date math and requestAnimationFrame, pure client-side |
| Hero CTA routing | Browser/Client | — | `<a>` href targets — WhatsApp wa.me or bespoke.html, no server logic |
| CSS variable token system | CDN/Static | — | Served as static file from Plesk; consumed by browser renderer |
| GSAP animation enhancement | Browser/Client | CDN/Static | GSAP loaded from cdnjs; executes in browser |
| Inline style migration | CDN/Static | — | Moving CSS from HTML `<style>` blocks to `css/style.css` static file |
| Placeholder image system | CDN/Static | — | SVG files in `img/placeholders/`; referenced by CSS |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vanilla HTML/CSS/JS | N/A (W3C) | Page structure, styling, behavior | No build tools; Plesk static hosting constraint |
| Cormorant Garamond + Jost | Google Fonts latest | Typography system | Established in Phase 1; loaded via Google Fonts CDN |
| GSAP Core | 3.13.0 | Animation engine | Loaded via cdnjs CDN on all pages; already in HTML |
| GSAP ScrollTrigger | 3.13.0 | Scroll-triggered animations | Companion to GSAP Core; available CDN |
| GSAP SplitText | 3.13.0 | Character/word text reveals | Available if desired for clock or quote |

[VERIFIED: codebase — GSAP CDN links exist in index.html and bespoke.html. Version 3.13.0 confirmed in CLAUDE.md and per prior Phase 1 research.]

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| IntersectionObserver API | Browser native | Class-toggle scroll reveals | Default; already implemented in main.js |
| CSS `@keyframes` | Browser native | Hero entry sequence (fadeUp, scrollPulse) | Already implemented; no library needed |
| `requestAnimationFrame` | Browser native | Clock counter animation | Already implemented in `animateCounter()` |

### No New Dependencies
No new libraries are required for this phase. All required animation infrastructure exists. GSAP enhancement is progressive — it will wrap existing behavior, not replace it.

---

## Architecture Patterns

### System Architecture Diagram

```
Browser
  │
  ├── index.html / bespoke.html (HTML structure)
  │     └── <head> loads:
  │           ├── css/tokens.css   (5 color tokens + typography + spacing)
  │           ├── css/style.css    (shared chrome + utilities + reveal + cta-banner)
  │           └── [inline <style>] → REMOVE: migrate to css/style.css
  │
  ├── css/style.css (expanded this phase)
  │     ├── .hero / .hero-wordmark / .hero-cta    ← migrated from index.html
  │     ├── .clock-section / .clock-number        ← migrated from index.html
  │     ├── .philosophy / .process-grid           ← migrated from index.html
  │     ├── .featured-grid / .featured-meta       ← migrated from index.html
  │     ├── .page-hero / .chapter / .chapter-num  ← migrated from bespoke.html
  │     ├── .fabric-card / .promise-grid          ← migrated from bespoke.html
  │     └── --border-subtle token (new in tokens.css)
  │
  ├── js/main.js (unchanged behavior, potentially enhanced)
  │     ├── IntersectionObserver → .reveal → .visible
  │     ├── Clock IntersectionObserver → animateCounter() → unobserve
  │     └── [optional] GSAP ScrollTrigger for process steps / chapters
  │
  └── WhatsApp CTAs
        ├── Desktop hero: btn-primary (wa.me) + text link (bespoke.html) [D-06]
        └── Mobile hero: btn-primary only (wa.me), secondary hidden via CSS [D-07]
```

### Recommended Project Structure

No structural changes needed. All files exist:

```
/
├── index.html          (homepage — inline styles removed this phase)
├── bespoke.html        (bespoke — inline styles removed this phase)
├── css/
│   ├── tokens.css      (add --border-subtle)
│   └── style.css       (receive migrated page-specific styles)
├── img/
│   ├── homepage_white_dramatic_gown.png
│   └── placeholders/
│       ├── silhouette-hero.svg
│       ├── silhouette-portrait.svg
│       └── silhouette-fabric.svg
└── js/
    └── main.js         (unchanged or GSAP additions)
```

### Pattern 1: Orphaned Variable Replacement

**What:** Every inline style referencing undefined dark-theme variables must be replaced with the exact token mapping documented in the UI-SPEC.
**When to use:** During CSS migration pass.

Mapping table (from 03-UI-SPEC.md — verified against tokens.css):

```css
/* Source: 03-UI-SPEC.md Color table — verified against css/tokens.css */

/* Before (undefined):          After (defined token): */
var(--gold-light)           →   var(--text)             /* #1A1A1A */
var(--gold-dim)             →   var(--text-tertiary)    /* #8A8A8A */
var(--gold)                 →   var(--text-secondary)   /* #4A4A4A */
var(--text-dim)             →   var(--text-secondary)   /* #4A4A4A */
var(--text-faint)           →   var(--text-tertiary)    /* #8A8A8A */
var(--border)               →   var(--border-subtle)    /* rgba(26,26,26,0.08) — NEW TOKEN */
var(--border-gold)          →   var(--text-tertiary)    /* #8A8A8A */
var(--bg-card)              →   var(--bg-surface)       /* #F2EFEB */

/* Hardcoded rgba gold values: */
rgba(186,117,23,0.04)       →   rgba(26,26,26,0.03)    /* hover tint */
rgba(186,117,23,0.015)      →   rgba(26,26,26,0.01)    /* hero texture — or remove */
rgba(186,117,23,0.1)        →   rgba(26,26,26,0.06)    /* chapter-num watermark */
rgba(186,117,23,0.03)       →   rgba(26,26,26,0.03)    /* promise hover */
```

New token to add to `css/tokens.css`:

```css
/* Source: 03-UI-SPEC.md — New Token Required section */
--border-subtle: rgba(26, 26, 26, 0.08);
```

### Pattern 2: Hero CTA Desktop/Mobile Split

**What:** Desktop shows two CTAs; mobile shows one. Controlled by CSS visibility at 768px breakpoint, no JavaScript.
**When to use:** Hero section restructure.

```html
<!-- Source: 03-CONTEXT.md D-06, D-07 -->
<div class="hero-cta">
  <!-- Primary: WhatsApp on both desktop and mobile -->
  <a href="https://wa.me/6588567038?text=Hello%20%E2%80%94%20I%27d%20like%20to%20discuss%20a%20bespoke%20commission%20for%20%5Boccasion%5D."
     class="btn-primary">Begin your commission</a>

  <!-- Secondary: visible on desktop only (hide on mobile via CSS) -->
  <a href="bespoke.html" class="hero-secondary-cta">Learn about our process</a>
</div>
```

```css
/* In migrated css/style.css */
.hero-secondary-cta {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  text-decoration: underline;
  text-underline-offset: 4px;
  margin-top: 16px;
  display: block;
}

@media (max-width: 768px) {
  .hero-secondary-cta { display: none; }
}
```

### Pattern 3: Scroll Reveal Class Assignment

**What:** Elements requiring scroll-reveal fade-up must carry `.reveal` (and optionally `.reveal-delay-N`). The observer fires once.
**When to use:** Audit of both pages to identify missing `.reveal` assignments.

Known gaps found in audit of existing HTML:

**index.html:**
- `<section class="section">` wrapping The Process — the section itself has no `.reveal`; individual inner elements do. Process grid `.reveal` is on the container — this means all five steps reveal simultaneously. For staggered reveals, each `.process-step` needs individual `.reveal` + `.reveal-delay-N`.
- Featured commission section: `<section class="section">` has no reveal — only inner elements.

**bespoke.html:**
- `<section class="chapter reveal">` — chapter sections correctly have `.reveal`.
- Fabric grid stagger: cards correctly have `.reveal-delay-1` through `.reveal-delay-4`.
- Promise grid: `.promise-grid reveal` — all three cells reveal simultaneously (acceptable, matches `.process-grid` pattern).

### Pattern 4: Placeholder Class Migration

**What:** `index.html` and `bespoke.html` use `.placeholder-img` with `data-label` (old pattern). The new pattern from Phase 1 is `.placeholder .placeholder--{variant}` with an SVG img child.
**When to use:** Wherever placeholder containers appear on both pages.

```html
<!-- OLD (currently in index.html, bespoke.html): -->
<div class="featured-image placeholder-img" data-label="Editorial photography"></div>

<!-- NEW (Phase 1 pattern from 01-02-SUMMARY.md): -->
<div class="placeholder placeholder--portrait">
  <img src="img/placeholders/silhouette-portrait.svg" alt="">
</div>
```

Variant mapping:
- Chapter images (portrait aspect): `placeholder--portrait`
- Fabric swatches (square): `placeholder--fabric`
- Featured commission image (portrait): `placeholder--portrait`

[VERIFIED: codebase — `css/style.css` contains `.placeholder`, `.placeholder--hero`, `.placeholder--portrait`, `.placeholder--fabric` classes. SVG files confirmed in `img/placeholders/`. Old `.placeholder-img` class NOT defined in style.css, only in dead inline code.]

### Pattern 5: GSAP Progressive Enhancement

**What:** GSAP enhances the existing CSS reveal baseline. Must check `prefers-reduced-motion` and gracefully no-op when GSAP doesn't load.
**When to use:** Process step stagger, chapter scroll entrance (Claude's discretion).

```javascript
// Source: CLAUDE.md §Animation, GSAP docs — pattern for reduced motion guard
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typeof gsap !== 'undefined' && !prefersReduced) {
  // GSAP enhancement
  gsap.registerPlugin(ScrollTrigger);

  // Process step stagger example
  gsap.from('.process-step', {
    scrollTrigger: {
      trigger: '.process-grid',
      start: 'top 80%',
      once: true
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out'
  });
}
// Fallback: CSS .reveal class handles it if GSAP absent
```

### Pattern 6: `.page-hero` Dark Gradient Removal

**What:** `bespoke.html` `.page-hero::before` uses `background: linear-gradient(180deg, #0d0905 0%, var(--bg) 100%)` — a hardcoded near-black color from the dark theme.
**When to use:** Bespoke page cleanup.

```css
/* BEFORE (bespoke.html inline <style>): */
.page-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #0d0905 0%, var(--bg) 100%);
  z-index: -1;
}

/* AFTER: Remove the ::before pseudo-element entirely.
   The page-hero sits on var(--bg) (#F8F6F3) naturally.
   A subtle top-border variant can use border-bottom: 0.5px solid var(--border-subtle) */
```

### Pattern 7: `.video-badge` Removal

**What:** The `.video-badge` element is a placeholder for a future feature (VD-01, deferred to v2). The UI-SPEC explicitly removes it.
**When to use:** index.html hero cleanup.

Remove from index.html:
```html
<!-- REMOVE this entire element: -->
<div class="video-badge">Full-screen video · Atelier at work</div>
```

Remove from inline styles:
```css
/* REMOVE this entire rule block: */
.video-badge { ... }
```

### Anti-Patterns to Avoid

- **Leaving any `var(--gold*)`, `var(--border)`, `var(--text-dim)`, `var(--text-faint)`, or `var(--bg-card)` in style.css after migration:** These variables are undefined in tokens.css — they silently fall back to browser default (usually empty/transparent). The visual breakage is subtle and easy to miss.
- **Using `.reveal` on a grid container when you want staggered children:** The observer fires once for the container, giving all children the same delay. Attach `.reveal` + `.reveal-delay-N` to each child element individually for stagger.
- **Replacing hero CTA `btn-outline` with `btn-primary` without also updating the href:** The current hero CTA points to `commission.html` with `btn-outline`. Both the class AND the href need updating.
- **Adding `localStorage` to the clock:** D-02 explicitly forbids this. Session-only re-animation via `clockObserver.unobserve()` is already correct in main.js.
- **Inline styles remaining after migration:** The goal of D-05 is zero `<style>` blocks in both HTML files. Partial migration leaves the old orphaned variables still active.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animation | Custom scroll listener with pixel math | IntersectionObserver (already in main.js) | IO is composited, does not block main thread; already battle-tested in codebase |
| Counter easing | Custom math | Existing `animateCounter()` ease-out cubic | Already implemented, proven, matches design |
| Variable substitution | Manual search-and-replace via JS at runtime | CSS custom properties with correct values | CSS runtime performance, no JS overhead |
| Mobile/desktop CTA visibility | JavaScript viewport check | CSS media query at 768px breakpoint | CSS-only is zero-JS, works before paint |
| GSAP reduced-motion | Separate animation off-switch | `window.matchMedia('prefers-reduced-motion')` guard | Browser preference respected; style.css already covers CSS side |

**Key insight:** The animation infrastructure already works. This phase is about variable correctness and element wiring, not building new animation systems.

---

## Common Pitfalls

### Pitfall 1: Silent CSS Variable Fallback to Empty
**What goes wrong:** Browsers silently apply no style (or "initial value") when a CSS variable is referenced but undefined. Colors disappear without error.
**Why it happens:** `--gold-light` is used as a color value. When undefined, the property is treated as "invalid at computed-value time" and the inherited value applies — for `color`, that means inheriting from parent, which may mask the bug.
**How to avoid:** After migration, do a grep for `var(--gold`, `var(--border)`, `var(--text-dim)`, `var(--text-faint)`, `var(--bg-card)` in all CSS files. Any hit is a remaining bug.
**Warning signs:** Text elements that should be `--text` (#1A1A1A) appear lighter than expected.

### Pitfall 2: Stagger Reveal on Grid Container vs. Children
**What goes wrong:** `.process-grid` has `.reveal` — when it enters the viewport, the entire grid fades up as one. Individual steps do not stagger.
**Why it happens:** IntersectionObserver observes the element with `.reveal`, not its children.
**How to avoid:** Add `.reveal` individually to each `.process-step`, with `.reveal-delay-1` through `.reveal-delay-4` on steps 2–5 (step 1 has no delay). Remove `.reveal` from the grid container.
**Warning signs:** All process steps appear simultaneously with no sequential reveal.

### Pitfall 3: Hero Scroll Hint Gradient References Orphaned Variable
**What goes wrong:** `.scroll-line` uses `linear-gradient(to bottom, var(--gold-dim), transparent)` — `--gold-dim` is undefined.
**Why it happens:** Inline style block in index.html never got migrated.
**How to avoid:** Replace with `linear-gradient(to bottom, var(--text-tertiary), transparent)`.

### Pitfall 4: Bespoke Chapter `direction: rtl` and Stacking Context
**What goes wrong:** `.chapter.reversed` uses `direction: rtl` for visual flipping. On mobile, `direction: ltr` is re-applied. This is a non-standard layout trick that can cause z-index and text alignment surprises if child elements have `position: absolute`.
**Why it happens:** `direction: rtl` reverses the inline-direction of block children, which visually flips column order in a two-column grid without reordering in DOM.
**How to avoid:** The existing pattern already has `.chapter.reversed > * { direction: ltr; }` which restores text direction for content. Do not add absolute-positioned children inside `.chapter.reversed` without testing.

### Pitfall 5: `placeholder-img` vs `.placeholder .placeholder--variant` Confusion
**What goes wrong:** The old `.placeholder-img` class has no CSS definition in `style.css` (it was removed in Phase 1). Elements using it render as unstyled divs with no background color or aspect-ratio.
**Why it happens:** Phase 1 replaced the class name. Phase 2 and 3 HTML was not updated.
**How to avoid:** Replace all `.placeholder-img` usages in index.html and bespoke.html with the new `.placeholder .placeholder--{variant}` pattern plus an SVG img child.

### Pitfall 6: `commission.html` Referenced but Likely Doesn't Exist
**What goes wrong:** The secondary hero CTA on desktop points to `commission.html`. This file may not exist — checking archive.html and other files confirms no `commission.html` was built in prior phases.
**Why it happens:** Phase ordering — commission page is not in the v1 roadmap (it's replaced by WhatsApp).
**How to avoid:** Verify `commission.html` exists before linking. If absent, the secondary link destination should be `bespoke.html` instead (per D-06 — "commission.html for visitors who want more info first" — bespoke IS the info page).

---

## Runtime State Inventory

Step 2.5: SKIPPED. This is not a rename/refactor/migration phase — it is a page polish and CSS cleanup phase with no stored data, live service config, or OS-registered state to audit.

---

## Environment Availability

Step 2.6: SKIPPED. This phase is purely static file editing (HTML, CSS, JS). No external tools, services, CLIs, runtimes, databases, or package managers are required beyond a text editor. Deployment is manual FTP/Plesk file manager upload.

---

## Validation Architecture

`nyquist_validation` is enabled in `.planning/config.json`.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None — static HTML/CSS/JS, no automated test runner |
| Config file | None |
| Quick run command | Open index.html and bespoke.html in browser, visually inspect |
| Full suite command | Check both pages at 375px, 768px, 1200px viewport widths |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HP-01 | Hero renders full-viewport with wordmark, tagline, WhatsApp CTA | visual | `open index.html` | ✅ |
| HP-02 | Clock counts up on first scroll-into-view; static on scroll-back | visual/manual | Scroll to clock, scroll back, repeat | ✅ |
| HP-03 | Philosophy quote section renders with correct styling | visual | `open index.html` | ✅ |
| HP-04 | Five-step process section renders with scroll-reveal fade-up | visual/manual | Scroll to process grid | ✅ |
| HP-05 | Featured commission renders with image placeholder and stats | visual | `open index.html` | ✅ |
| HP-06 | CTA banner renders with WhatsApp link | visual + link check | Click "Begin your commission" in CTA banner | ✅ |
| BP-01 | Bespoke page hero renders correctly on ivory background (no dark gradient) | visual | `open bespoke.html` | ✅ |
| BP-02 | Five chapters render alternating image/text layout | visual | `open bespoke.html`, scroll through chapters | ✅ |
| BP-03 | Fabric archive shows 4 cards with correct styling | visual | `open bespoke.html`, scroll to fabric section | ✅ |
| BP-04 | Promise triptych renders 3 cells | visual | `open bespoke.html`, scroll to promise section | ✅ |
| BP-05 | Bespoke CTA banner links to WhatsApp | visual + link check | Click "Start your journey" | ✅ |
| WA-03 | WhatsApp CTA visible on both pages | visual | Check hero + CTA banner on both pages | ✅ |
| AN-01 | Scroll reveals trigger on entry, fade-up 800ms | visual/manual | Scroll through both pages | ✅ |
| AN-02 | Clock count-up fires once per session | visual/manual | Hard-reload, scroll to clock; verify re-animates on new tab | ✅ |

### Grep Verification Checks (automated)
These can be run as pass/fail checks at verification time:

```bash
# Verify no orphaned variables remain in CSS output
grep -r "var(--gold\|var(--border)\|var(--text-dim)\|var(--text-faint)\|var(--bg-card)" css/style.css
# Expected output: no matches

# Verify no inline <style> blocks remain in HTML files
grep -c "<style>" index.html bespoke.html
# Expected output: index.html:0, bespoke.html:0

# Verify --border-subtle token exists
grep "border-subtle" css/tokens.css
# Expected output: --border-subtle: rgba(26, 26, 26, 0.08);

# Verify placeholder-img class not used (all migrated to .placeholder)
grep "placeholder-img" index.html bespoke.html
# Expected output: no matches
```

### Sampling Rate
- **Per task commit:** Open affected page in browser, confirm visual correctness
- **Per wave merge:** Run all four grep checks above; open both pages at 375px + 1200px viewports
- **Phase gate:** All grep checks return zero matches; both pages render correctly at mobile and desktop

### Wave 0 Gaps
None — no test framework to install, no test files to create. Visual inspection and grep checks serve as validation.

---

## Security Domain

Phase 3 has no user input, no forms, no authentication, and no dynamic data. WhatsApp links use the `wa.me` scheme (existing pattern from Phase 2). No ASVS categories apply.

---

## Code Examples

### Complete Variable Replacement Cheatsheet

```css
/* Source: 03-UI-SPEC.md — verified against css/tokens.css */

/* Text color replacements: */
color: var(--gold-light);    /* → */ color: var(--text);
color: var(--gold-dim);      /* → */ color: var(--text-tertiary);
color: var(--gold);          /* → */ color: var(--text-secondary);
color: var(--text-dim);      /* → */ color: var(--text-secondary);
color: var(--text-faint);    /* → */ color: var(--text-tertiary);

/* Border replacements: */
border: 0.5px solid var(--border);      /* → */ border: 0.5px solid var(--border-subtle);
border-top: 0.5px solid var(--border);  /* → */ border-top: 0.5px solid var(--border-subtle);
border-right: 0.5px solid var(--border); /* → */ border-right: 0.5px solid var(--border-subtle);
border-bottom: 0.5px solid var(--border); /* → */ border-bottom: 0.5px solid var(--border-subtle);
border-color: var(--border-gold);        /* → */ border-color: var(--text-tertiary);

/* Background replacements: */
background: var(--bg-card);  /* → */ background: var(--bg-surface);

/* Inline rgba gold values: */
rgba(186,117,23,0.04)   /* → */ rgba(26,26,26,0.03)
rgba(186,117,23,0.015)  /* → */ rgba(26,26,26,0.01) or remove
rgba(186,117,23,0.1)    /* → */ rgba(26,26,26,0.06)
rgba(186,117,23,0.03)   /* → */ rgba(26,26,26,0.03)
```

### Clock Observer Pattern (correct session-once behavior)

```javascript
/* Source: js/main.js — existing and correct */
const clockObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(clockEl, 0, parseInt(clockEl.textContent.replace(/,/g, '')), 2000);
      clockObserver.unobserve(entry.target); // fires once per session
    }
  });
}, { threshold: 0.3 });
clockObserver.observe(clockSection);
```

No changes required. This correctly satisfies D-02.

### Hero Scroll Hint — Fixed Gradient

```css
/* After migration to style.css */
.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--text-tertiary), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}
```

### GSAP Reduced Motion Guard Template

```javascript
/* Source: CLAUDE.md §Animation — GSAP available but requires reduced-motion guard */
if (typeof gsap !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);
  // GSAP enhancements here
}
// CSS .reveal fallback always active regardless
```

### chapter-num Watermark (Correct Replacement)

```css
/* After migration: */
.chapter-num {
  font-family: var(--serif);
  font-size: clamp(60px, 8vw, 100px);
  font-weight: 300;
  color: rgba(26, 26, 26, 0.06); /* was rgba(186,117,23,0.1) — same weight, monochromatic */
  line-height: 1;
  margin-bottom: 16px;
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Dark-theme variables (`--gold`, `--border`, etc.) | Monochromatic tokens (`--text`, `--text-secondary`, `--border-subtle`) | Phase 1 | All inline styles referencing old variables are broken; visually masked by inheritance |
| `.placeholder-img` + `data-label` + CSS gradient | `.placeholder .placeholder--{variant}` + SVG img | Phase 1 | Old class no longer has CSS definition; elements render as plain divs |
| `btn-outline` hero CTA → commission.html | `btn-primary` hero CTA → wa.me WhatsApp | Phase 3 (this) | Hero conversion path now direct to WhatsApp |
| Unified hero CTA (any device) | Desktop: two CTAs / Mobile: one CTA | Phase 3 (this) | Mobile visitors get direct WhatsApp path, zero friction |

**Deprecated/outdated:**
- `commission.html` as a CTA destination: Not built in v1 roadmap. Desktop secondary CTA should link to `bespoke.html`.
- `.video-badge` element: Deferred to v2 (VD-01). Remove in this phase.
- All `<style>` blocks in HTML files: Migrated to `css/style.css` in this phase.

---

## Open Questions

1. **Does `commission.html` exist?**
   - What we know: It is referenced as the desktop secondary CTA destination (D-06). The file is not in the v1 roadmap and no phase creates it.
   - What's unclear: Was it created manually or does it exist as a stub?
   - Recommendation: Verify with `ls commission.html`. If absent, redirect secondary CTA to `bespoke.html`. The bespoke page IS the "more info" destination.

2. **Hero background image overlay opacity**
   - What we know: User adjusted to "6–20% opacity range" (Claude's discretion). Current implementation uses `linear-gradient(180deg, rgba(10,8,6,0.06) 0%, rgba(10,8,6,0.2) 100%)` — already in that range.
   - What's unclear: Whether the near-black rgba values should shift toward the ivory palette (rgba(248,246,243,...)) for a more on-tone overlay.
   - Recommendation: The current gradient is functionally correct. If the photography is ivory-toned (as `homepage_white_dramatic_gown.png` suggests), the near-black overlay adds subtle depth without dramatically altering the image. Keep as-is unless visual testing reveals otherwise.

3. **Process step stagger strategy**
   - What we know: Current `.process-grid` has one `.reveal` on the container — all five steps reveal simultaneously. D-01 gives Claude discretion on stagger approach.
   - What's unclear: Whether GSAP stagger or CSS delay classes should be used.
   - Recommendation: Use CSS `.reveal-delay-N` classes on each `.process-step` for zero-dependency simplicity. If GSAP is also being loaded for chapters, unify to GSAP stagger for consistency. Either approach is correct.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `commission.html` does not exist as a built page | Open Questions, Hero CTA Pattern | If it exists as a stub, the secondary CTA link destination choice changes |
| A2 | The existing hero overlay gradient (rgba near-black values in range 0.06–0.2) is within the "6–20% opacity" intent | Open Questions | If not, overlay needs rgba value adjustment |

---

## Sources

### Primary (HIGH confidence)
- `css/tokens.css` — All five active color tokens, typography, spacing, easing tokens (read directly from codebase)
- `css/style.css` — `.reveal`, `.cta-banner`, `.btn-primary`, `.btn-outline`, `.placeholder` classes (read directly from codebase)
- `js/main.js` — Clock observer, counter animation, scroll reveal implementation (read directly from codebase)
- `index.html` — All current inline styles, orphaned variables, HTML structure (read directly from codebase)
- `bespoke.html` — All current inline styles, chapter structure, orphaned variables (read directly from codebase)
- `.planning/phases/03-homepage-bespoke/03-CONTEXT.md` — All locked decisions D-01 through D-10 (read directly)
- `.planning/phases/03-homepage-bespoke/03-UI-SPEC.md` — Complete variable mapping table, animation contract, layout contract (read directly)
- `.planning/phases/01-token-foundation/01-02-SUMMARY.md` — Placeholder system pattern established in Phase 1 (read directly)

### Secondary (MEDIUM confidence)
- `CLAUDE.md` — GSAP v3.13 CDN URLs, animation strategy, technology stack constraints

### Tertiary (LOW confidence)
- None — all claims verified from codebase or project documentation

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries; all verified in codebase
- Architecture: HIGH — all patterns derived from existing code and UI-SPEC
- Variable mapping: HIGH — every replacement mapped in UI-SPEC, verified against tokens.css
- Pitfalls: HIGH — derived from direct code audit (placeholder-img, commission.html, orphaned vars)

**Research date:** 2026-04-24
**Valid until:** Indefinite for this phase scope — static codebase, no external library versions changing
