# Phase 2: Shared Chrome — Research

**Researched:** 2026-04-23
**Domain:** Static HTML/CSS/JS — fixed navigation, mobile overlay, footer, WhatsApp CTA, image directory
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Navigation Bar**
- D-01: Brand appears as a text wordmark — "TIME TAKEN TO MAKE A DRESS" in Jost uppercase with wide letter-spacing. No logo image.
- D-02: Four nav links: Bespoke, Archive, Rental, Contact. "Contact" opens WhatsApp (wa.me link). Homepage reached by clicking the wordmark.
- D-03: Frosted glass effect throughout — starts semi-transparent (rgba with backdrop-blur), becomes more opaque on scroll. No fully-transparent or solid states. Already coded as `.nav` / `.nav.scrolled` pattern in style.css.
- D-04: Mobile hamburger opens a full-screen ivory overlay below the nav bar. Links stacked vertically with large touch targets.
- D-05: Mobile overlay includes a prominent WhatsApp CTA button at the bottom — every menu open is a conversion opportunity.

**WhatsApp CTA Component**
- D-06: Visual style is a full-width editorial banner — section-width block with compelling headline, subtext, and a dark button. No green, no WhatsApp branding, no floating bubble. Luxury magazine ad strip aesthetic.
- D-07: Pre-filled message is occasion-focused: "Hello — I'd like to discuss a bespoke commission for [occasion]."
- D-08: Button text varies by page context: Homepage → "Begin your commission", Bespoke → "Start your journey", Archive → "Enquire about a gown", Rental → "Enquire about rental".
- D-09: No persistent floating WhatsApp button anywhere. Only in-page editorial CTA blocks.
- D-10: On mobile, tapping the CTA opens WhatsApp directly via wa.me link — no intermediate confirmation sheet.

**Footer**
- D-11: Footer brand section includes text wordmark and tagline "Celebrating the time taken." No physical address.
- D-12: Instagram only for social links. One link, clean and focused.
- D-13: Footer navigation: Bespoke, Archive, Rental, Contact (WhatsApp).

**Image Directory Structure**
- D-14: Organized by role: `images/hero/`, `images/gowns/`, `images/process/`, `images/fabric/`, `images/rental/`.
- D-15: SVG placeholders live separately in `images/placeholders/`. Real photos go in role folders.
- D-16: Descriptive kebab-case naming: `hero-homepage.jpg`, `gown-bridal-01.jpg`.

**Mobile-First Priority**
- D-17: All shared chrome components must be designed mobile-first.

### Claude's Discretion
- Exact headline/subtext copy for the WhatsApp CTA banner (within the editorial tone)
- Tagline wording for the footer brand section
- Hamburger animation (bar → X transition timing)
- Footer responsive layout breakpoints
- Instagram icon style (outline vs filled, custom or Font Awesome)
- Exact number of image subdirectories beyond the five specified

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SC-01 | Fixed navigation bar with brand wordmark and page links, styled for ivory background | Nav CSS exists (style.css:68-148); needs content update: wordmark text, correct link labels (Bespoke/Archive/Rental/Contact), wa.me href on Contact |
| SC-02 | Mobile hamburger navigation with full-screen overlay | Toggle CSS exists (style.css:134-148, 297-313); JS toggle in main.js needs WhatsApp CTA in overlay and body scroll-lock; aria attributes need update |
| SC-03 | Site footer with navigation links and social links | Footer CSS exists (style.css:203-256); content update: remove address, add tagline, change columns to Pages/Connect, Instagram SVG + WhatsApp text link |
| SC-04 | Shared nav/footer implemented as reusable components across all pages | All 4 HTML files (index.html, bespoke.html, archive.html, commission.html) have divergent nav/footer; must be synchronized to identical HTML |
| IMG-03 | Image directory structure organized by role (hero, gowns, process, fabric, rental) | `images/` directory does not exist yet (only `img/placeholders/`); must create directory tree with `.gitkeep` files |
| IMG-04 | Easy photo swap workflow — drop images into directory, update src attributes | Code pattern: `<img src="images/hero/hero-homepage.jpg" alt="...">` inside `.placeholder` container; no backend needed |
| WA-01 | Branded WhatsApp CTA blocks (not green bubble widget) that maintain luxury feel | New `.cta-banner` component; HTML + CSS needed; uses `.btn-primary`, `--bg-surface` background, editorial copy |
| WA-02 | Pre-filled WhatsApp message that signals a qualified enquiry | wa.me URL with encoded pre-fill: `https://wa.me/65XXXXXXXX?text=Hello%20%E2%80%94%20I%27d%20like%20to%20discuss%20a%20bespoke%20commission%20for%20%5Boccasion%5D.` |
| AN-04 | Navigation scroll state change (transparent → solid on scroll) | JS exists (main.js:9-14) but threshold is `> 40`; UI-SPEC says `> 50`; minor update; CSS already coded |
</phase_requirements>

---

## Summary

Phase 2 is primarily a **content and integration task**, not a build-from-scratch task. The Phase 1 execution produced CSS for the nav, hamburger toggle, footer, buttons, and scroll reveals that is structurally complete. What is missing is: correct HTML content across all pages, JS behavior additions (body scroll-lock, overlay CTA, aria state), a new WhatsApp CTA component class, and the `images/` directory tree.

The principal risk is **content drift** — all four HTML files (index.html, bespoke.html, archive.html, commission.html) currently have divergent nav and footer markup. Index.html has three nav links and a physical address in the footer; bespoke.html and archive.html mirror that divergent state. Synchronizing them to a single canonical structure is the central task of SC-04. Because this is a static site with no templating, the synchronization must be done manually across all files.

The WhatsApp CTA component (WA-01/WA-02) needs a new `.cta-banner` CSS class (or a reuse of the existing pattern in index.html's `<style>` block promoted to style.css) and a reusable HTML block that is placed on each page with a page-specific button label. The `images/` directory tree (IMG-03/IMG-04) requires creating the folder structure and placeholder `.gitkeep` files so the swap workflow is ready even before photography arrives.

**Primary recommendation:** Plan three focused tasks — (1) update nav/footer HTML across all pages + JS fixes, (2) build and place the WhatsApp CTA component in style.css + each page, (3) create the images directory structure.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Fixed navigation bar | Browser / Client | — | Pure HTML/CSS/JS; no server layer exists (Plesk static hosting) |
| Mobile hamburger overlay | Browser / Client | — | JS toggle pattern, no server needed |
| Scroll state change (AN-04) | Browser / Client | — | `window.scrollY` listener in main.js |
| WhatsApp CTA component | Browser / Client | — | Static HTML block + wa.me URL; WhatsApp handles routing |
| Site footer | Browser / Client | — | Static HTML, replicated across pages |
| Image directory structure | CDN / Static | Browser / Client | Files served by Plesk static hosting; `<img src>` paths in HTML |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vanilla JS | ES2020 | Nav toggle, scroll state, aria management | No build tools; modern DOM APIs sufficient; already used in main.js |
| CSS custom properties | Living standard | Token-driven styling | Phase 1 established; all components pull from `--bg`, `--text`, `--ease` etc. |
| Intersection Observer API | Living standard | Scroll reveal (`.reveal`) | Already implemented in main.js; no library needed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| GSAP Core | 3.13.0 (CDN) | Animation engine | AN-04 scroll state is CSS-only; GSAP available if more complex sequencing needed |
| Google Fonts | latest | Cormorant Garamond + Jost | CDN-loaded, already in all HTML `<head>` tags |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vanilla JS nav toggle | Alpine.js | Alpine.js adds reactive state syntax but is unnecessary for a two-state toggle; project explicitly excludes it |
| Inline SVG for Instagram | Font Awesome CDN | Font Awesome adds 30–300KB; a single inline SVG is 200 bytes |
| Manual HTML duplication | Server-side includes | SSI requires server config (Plesk supports it but adds complexity and fragility for a simple static site) |

**Installation:** No npm packages. CDN URLs already in place via CLAUDE.md.

---

## Architecture Patterns

### System Architecture Diagram

```
User browser
    |
    v
[index.html / bespoke.html / archive.html / commission.html]
    |                        |
    v                        v
[<nav> block]          [<footer> block]
    |                        |
    v                        v
[css/tokens.css]       [css/tokens.css]
[css/style.css]        [css/style.css]
    |
    v
[js/main.js]
    |-- nav scroll listener --> .nav.scrolled CSS class
    |-- hamburger toggle    --> .nav-links.open CSS class + body scroll-lock
    |-- scroll reveal       --> .reveal.visible CSS class
    |
    v
[WhatsApp CTA .cta-banner block] (inline in each page body)
    |
    v
[wa.me URL] --> WhatsApp (external)
    |
[images/ directory]
    |-- hero/        --> <img src="images/hero/hero-homepage.jpg">
    |-- gowns/       --> <img src="images/gowns/gown-bridal-01.jpg">
    |-- process/     --> <img src="images/process/process-sketch.jpg">
    |-- fabric/      --> <img src="images/fabric/fabric-silk-organza.jpg">
    |-- rental/      --> <img src="images/rental/rental-gown-01.jpg">
    |-- placeholders/--> (existing SVGs from Phase 1 — move from img/placeholders/)
```

### Recommended Project Structure
```
/
├── css/
│   ├── tokens.css        # Design tokens (Phase 1, complete)
│   └── style.css         # Global + component styles (Phase 1 + Phase 2 additions)
├── js/
│   └── main.js           # Nav scroll, hamburger toggle, reveal observer (Phase 1 + Phase 2 additions)
├── images/
│   ├── hero/             # Full-width hero backgrounds (.gitkeep until photos arrive)
│   ├── gowns/            # Individual gown photographs (.gitkeep)
│   ├── process/          # Craftsmanship process shots (.gitkeep)
│   ├── fabric/           # Fabric close-ups (.gitkeep)
│   ├── rental/           # Rental gowns (.gitkeep)
│   └── placeholders/     # SVG silhouettes (moved from img/placeholders/)
├── img/
│   └── placeholders/     # LEGACY — migrate SVGs to images/placeholders/, keep for transition
├── index.html            # Homepage (nav + footer + CTA updated)
├── bespoke.html          # Bespoke page (nav + footer + CTA updated)
├── archive.html          # Archive page (nav + footer + CTA updated)
└── commission.html       # Commission/Contact page (nav + footer updated)
```

**Note on img/ vs images/:** The existing `img/placeholders/` directory holds Phase 1 SVGs. The Phase 2 decision (D-14/D-15) specifies an `images/` directory. The planner must decide whether to: (a) create `images/` as a new parallel tree and update `img/placeholders/` paths, or (b) move Phase 1 SVGs into `images/placeholders/`. Option (b) is cleaner but requires updating all existing `src` references.

### Pattern 1: Fixed Nav with Scroll State (AN-04)
**What:** Nav background transitions from 85% to 95% opacity on scroll via JS class toggle.
**When to use:** Only the nav bar.

**Existing CSS (style.css:68-88):**
```css
/* Source: css/style.css — verified [VERIFIED: codebase read] */
.nav {
  background: rgba(248,246,243,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: background 500ms var(--ease);
}
.nav.scrolled {
  background: rgba(248,246,243,0.95);
}
```

**Existing JS (main.js:9-14) — needs threshold update from 40 to 50:**
```javascript
// Source: js/main.js — verified [VERIFIED: codebase read]
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40); // UI-SPEC says > 50
}, { passive: true });
```

### Pattern 2: Hamburger Toggle with Overlay
**What:** Three CSS spans animate to X; `.nav-links.open` creates full-screen ivory overlay below nav.
**When to use:** Mobile breakpoint <= 768px.

**Existing JS (main.js:17-33):** Complete. Needs additions:
1. Add `document.body.style.overflow = 'hidden'` when open, remove when closed
2. Add `aria-expanded` toggle on the hamburger button
3. Add Escape key listener to close the overlay
4. Add WhatsApp CTA button at the bottom of the overlay HTML

**Existing CSS (style.css:297-313):**
```css
/* Source: css/style.css — verified [VERIFIED: codebase read] */
@media (max-width: 768px) {
  .nav-links.open {
    display: flex;
    flex-direction: column;
    position: fixed;
    inset: 72px 0 0 0;
    background: rgba(248,246,243,0.98);
    padding: 48px 32px;
    gap: 24px;
    z-index: 999;
  }
}
```

**Needs addition** — mobile overlay link sizing and CTA:
```css
@media (max-width: 768px) {
  .nav-links.open a {
    font-size: 16px;
    padding: 12px 0; /* ensures 48px touch target with line-height */
  }
  .nav-overlay-cta {
    margin-top: auto; /* pushes CTA to bottom of flex column */
    width: 100%;
  }
}
```

### Pattern 3: WhatsApp CTA Component (.cta-banner)
**What:** Full-width editorial section — ivory surface background, centered Cormorant headline, Jost subtext, `.btn-primary` button linked to wa.me URL.
**When to use:** Placed on every page once (Homepage, Bespoke, Archive, Rental).

**New CSS to add to style.css:**
```css
/* Source: UI-SPEC section 3 — verified [VERIFIED: 02-UI-SPEC.md read] */
.cta-banner {
  background: var(--bg-surface);
  padding: clamp(64px, 10vw, 140px) 0;
  text-align: center;
}
.cta-banner h2 {
  margin-bottom: 16px;
}
.cta-banner .cta-subtext {
  font-size: 14px;
  font-weight: 300;
  color: var(--text-secondary);
  line-height: 1.75;
  max-width: 480px;
  margin: 0 auto 32px;
}
```

**HTML pattern (varies button label by page):**
```html
<!-- Source: UI-SPEC copywriting contract — verified [VERIFIED: 02-UI-SPEC.md read] -->
<section class="cta-banner">
  <div class="container">
    <div class="eyebrow reveal">By appointment only</div>
    <h2 class="reveal">Every gown begins with a conversation</h2>
    <p class="cta-subtext reveal">Tell us about your occasion, your vision, your timeline. We will take the time to make it extraordinary.</p>
    <div class="reveal">
      <a href="https://wa.me/65XXXXXXXX?text=Hello%20%E2%80%94%20I%27d%20like%20to%20discuss%20a%20bespoke%20commission%20for%20%5Boccasion%5D."
         class="btn-primary">Begin your commission</a>
    </div>
  </div>
</section>
```

### Pattern 4: Image Directory with .gitkeep
**What:** Empty directories committed to git so the swap workflow is ready.
**When to use:** IMG-03/IMG-04 implementation.

```bash
mkdir -p images/hero images/gowns images/process images/fabric images/rental images/placeholders
touch images/hero/.gitkeep images/gowns/.gitkeep images/process/.gitkeep
touch images/fabric/.gitkeep images/rental/.gitkeep
# Move Phase 1 SVGs:
# cp img/placeholders/*.svg images/placeholders/
```

### Anti-Patterns to Avoid
- **Hard-coded rgba values:** The nav already uses `rgba(248,246,243,0.85)` directly instead of tokens. Do not extend this pattern — add a note but do not refactor existing values in this phase (scope creep risk). Future phase can tokenize opacity variants.
- **Duplicate .cta-banner styles in `<style>` blocks:** index.html currently has `.cta-banner` styles in an inline `<style>` tag. These must be moved to style.css so all pages share the single class. If left duplicated, a future style update breaks three of four pages.
- **Nav HTML variation across pages:** Each HTML file must have byte-for-byte identical nav and footer HTML (except the `active` class on the current page's link, which is set by JS). Any content difference between pages creates maintenance drift.
- **Broken aria on overlay:** The hamburger currently has `aria-label="Menu"` but no `aria-expanded`. Screen reader users cannot determine overlay state. This must be fixed in main.js alongside the overlay open/close logic.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Instagram icon SVG | Custom drawing from scratch | Inline SVG from Simple Icons or hand-traced | A 16px icon is 5-10 lines of SVG path data; no library needed |
| WhatsApp URL encoding | Custom JS encoder | Pre-encoded URL string | The pre-fill is static; encode once, paste as string literal |
| Body scroll lock | CSS `overflow: hidden` on html/body | `document.body.style.overflow` toggle | Simple one-liner; no library needed for this case |
| Accessibility focus trap in overlay | Custom focus trap loop | Focus trap is needed but simple: Tab cycles through overlay links only | 10-line JS; do not reach for a library |

**Key insight:** This phase is almost entirely HTML content work. The hard problems (layout, typography, animation) were solved in Phase 1. Resist the urge to introduce new CSS patterns — extend existing ones.

---

## Common Pitfalls

### Pitfall 1: Commission.html is a "Contact" proxy
**What goes wrong:** The current nav links point to `commission.html` for the "contact" link. D-02 says Contact opens WhatsApp via wa.me, not a page.
**Why it happens:** Phase 1 built commission.html as the contact form page; Phase 2 redesigns the CTA strategy.
**How to avoid:** Nav "Contact" link becomes `<a href="https://wa.me/...">Contact</a>`. commission.html still exists for direct URL access but is no longer the nav destination.
**Warning signs:** If a nav link points to `commission.html`, the D-02 decision was not applied.

### Pitfall 2: img/ vs images/ path mismatch
**What goes wrong:** Phase 1 SVG placeholders live in `img/placeholders/`. Phase 2 creates `images/` directory. If the HTML is updated to reference `images/placeholders/` but the SVGs are not moved, placeholders break.
**Why it happens:** Two different directory names created at two different phases.
**How to avoid:** Either (a) copy SVGs to `images/placeholders/` and update all existing `src` attributes, or (b) keep using `img/placeholders/` for SVGs and only use `images/` for photography role directories. Pick one and be consistent. Option (a) is cleaner for the long term.
**Warning signs:** A `.placeholder` container shows a broken image icon instead of the silhouette SVG.

### Pitfall 3: Footer address still present
**What goes wrong:** All three existing HTML pages (index.html, bespoke.html, archive.html) have a `.footer-address` with "337A Beach Road". D-11 says no physical address — the atelier is personal/home-visit.
**Why it happens:** Phase 1 was built before this decision was locked.
**How to avoid:** Remove `.footer-address` div from all pages; replace with the tagline paragraph as specified.
**Warning signs:** If "337A Beach Road" appears anywhere in footer HTML, the decision was missed.

### Pitfall 4: body scroll lock not removed on close
**What goes wrong:** If `document.body.style.overflow = 'hidden'` is set when the overlay opens but not cleared when it closes (or when Escape is pressed), the page becomes unscrollable after navigating via a mobile overlay link.
**Why it happens:** The overlay close path must mirror the open path; easy to miss the Escape key case.
**How to avoid:** Create a single `closeOverlay()` function that both the toggle button click and the Escape listener call. That function clears `document.body.style.overflow`.

### Pitfall 5: WhatsApp phone number placeholder
**What goes wrong:** The wa.me URL uses `65XXXXXXXX` as a placeholder. If this ships to production without the real number, no conversions occur.
**Why it happens:** The real WhatsApp number was not captured during planning.
**How to avoid:** Use a clearly visible `<!-- TODO: Replace 65XXXXXXXX with real WhatsApp number -->` comment adjacent to every wa.me URL. Flag in the verification checklist.

### Pitfall 6: Mobile overlay links have no active page indicator
**What goes wrong:** The JS active-page detection sets `.active` on `.nav-links a` elements by matching `href` to `window.location.pathname`. When the overlay is open on mobile, these same links should show the active state. If the JS selector is too narrow, mobile users see no visual indicator.
**Why it happens:** The active-page script runs once on DOMContentLoaded and applies to all `.nav-links a` regardless of desktop/mobile state — this is actually correct behavior. Verify the CSS `.active` style is visible at 16px overlay link size.

---

## Code Examples

### Canonical Nav HTML (to use identically across all pages)
```html
<!-- Source: 02-UI-SPEC.md + D-01/D-02 — [VERIFIED: codebase + context read] -->
<nav class="nav" role="navigation" aria-label="Main navigation">
  <!-- Skip link (first focusable element) -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <a href="index.html" class="nav-logo">Time Taken to Make a Dress</a>
  <ul class="nav-links" role="list">
    <li><a href="bespoke.html">Bespoke</a></li>
    <li><a href="archive.html">Archive</a></li>
    <li><a href="rental.html">Rental</a></li>
    <li><a href="https://wa.me/65XXXXXXXX?text=Hello%20%E2%80%94%20I%27d%20like%20to%20discuss%20a%20bespoke%20commission%20for%20%5Boccasion%5D.">Contact</a></li>
  </ul>
  <button class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-overlay">
    <span></span><span></span><span></span>
  </button>
</nav>
```

**Note:** The wordmark text in the existing code is `T T M D`. The UI-SPEC says "TIME TAKEN TO MAKE A DRESS". Verify with user which is canonical — both are valid but they differ. `T T M D` is the abbreviation; "TIME TAKEN TO MAKE A DRESS" is the full name. The UI-SPEC is more recent and explicit. [ASSUMED: "TIME TAKEN TO MAKE A DRESS" is preferred per UI-SPEC; confirm if abbreviation is acceptable]

### Mobile Overlay JS (additions to main.js hamburger toggle)
```javascript
// Source: UI-SPEC accessibility contract — [VERIFIED: 02-UI-SPEC.md read]
function closeOverlay() {
  navLinks.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  // Reset hamburger bars
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
}

toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.contains('open');
  if (isOpen) {
    closeOverlay();
  } else {
    navLinks.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Animate bars to X
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    closeOverlay();
    toggle.focus(); // return focus to trigger
  }
});
```

### Canonical Footer HTML
```html
<!-- Source: 02-UI-SPEC.md section 4 — [VERIFIED: 02-UI-SPEC.md read] -->
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="nav-logo">Time Taken to Make a Dress</div>
        <p class="footer-tagline">Celebrating the time taken.</p>
      </div>
      <nav class="footer-nav" aria-label="Footer navigation">
        <div class="footer-col">
          <div class="footer-col-title">Pages</div>
          <a href="bespoke.html">Bespoke</a>
          <a href="archive.html">Archive</a>
          <a href="rental.html">Rental</a>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">Connect</div>
          <a href="https://instagram.com/timetakentomakedress" target="_blank" rel="noopener" class="footer-instagram-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
            Instagram
          </a>
          <a href="https://wa.me/65XXXXXXXX?text=Hello%20%E2%80%94%20I%27d%20like%20to%20discuss%20a%20bespoke%20commission%20for%20%5Boccasion%5D.">WhatsApp</a>
        </div>
      </nav>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 Time Taken to Make a Dress</span>
      <span>Singapore</span>
    </div>
  </div>
</footer>
```

### Footer tagline CSS addition
```css
/* Source: UI-SPEC section 4 — [VERIFIED: 02-UI-SPEC.md read] */
.footer-tagline {
  font-size: 14px;
  font-weight: 300;
  color: var(--text-tertiary);
  line-height: 1.8;
  margin-top: 12px;
}
```

### Skip link CSS
```css
/* Source: UI-SPEC accessibility contract — [VERIFIED: 02-UI-SPEC.md read] */
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  background: var(--text);
  color: var(--bg);
  padding: 8px 16px;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  z-index: 9999;
  transition: top 200ms;
}
.skip-link:focus {
  top: 8px;
}
```

### reduced-motion media query (global addition to style.css)
```css
/* Source: UI-SPEC animation contract — [VERIFIED: 02-UI-SPEC.md read] */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Physical address in footer | No address (home-visit atelier) | D-11 (Phase 2 context) | Remove `.footer-address` div from all pages |
| `commission.html` as contact destination | WhatsApp (wa.me) as contact | D-02 (Phase 2 context) | Nav Contact link href changes |
| Three nav links (Bespoke, Archive, Commission) | Four nav links (Bespoke, Archive, Rental, Contact) | D-02 (Phase 2 context) | Add Rental, rename Commission to Contact with wa.me href |
| `img/placeholders/` directory | `images/[role]/` + `images/placeholders/` | D-14/D-15 (Phase 2 context) | New directory tree; potential path migration |

**Deprecated/outdated in current codebase:**
- `commission.html` nav label: Currently "Commission" — Phase 2 replaces with WhatsApp `Contact` link
- `.footer-address` block: Present in index.html, bespoke.html, archive.html — remove entirely
- `--gold-*` CSS variables referenced in index.html `<style>` block (e.g., `var(--gold-light)`, `var(--gold-dim)`, `var(--border-gold)`, `var(--text-dim)`, `var(--text-faint)`, `var(--border)`): These are **not in tokens.css**. They appear to be leftover from a previous dark/gold theme that was replaced in Phase 1. The homepage still uses them inline. Phase 2 should not extend this pattern — any new chrome components must use only tokens defined in tokens.css. The homepage hero cleanup is out of scope for Phase 2 but the nav and footer must not introduce these orphaned variables.

---

## Runtime State Inventory

> Step 2.5 assessment: This is not a rename/refactor/migration phase — it is a content build phase. However, one near-migration exists: the `img/placeholders/` → `images/placeholders/` path question.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — static site, no database | None |
| Live service config | None — Plesk static file hosting only | None |
| OS-registered state | None | None |
| Secrets/env vars | None — no API keys in codebase | None |
| Build artifacts / installed packages | `img/placeholders/` — 3 SVG files (silhouette-hero.svg, silhouette-portrait.svg, silhouette-fabric.svg) | If path migrated to `images/placeholders/`, update all `src` attributes in existing HTML that reference `img/placeholders/` |

**Path migration note:** A grep of existing HTML files should be run in the planning step to count how many `src="img/placeholders/..."` references exist before committing to a migration. If it is fewer than 10, migrate. If more, keep `img/` as-is and create `images/` as a parallel tree.

---

## Open Questions

1. **WhatsApp phone number**
   - What we know: wa.me URL placeholder `65XXXXXXXX` used throughout
   - What's unclear: The real Singapore WhatsApp number for the atelier
   - Recommendation: Use `65XXXXXXXX` in code with a `<!-- TODO -->` comment; add verification checklist item; do not block implementation

2. **Instagram handle**
   - What we know: Instagram link is needed (D-12)
   - What's unclear: The actual @handle and URL
   - Recommendation: Use `https://instagram.com/timetakentomakedress` as placeholder based on the domain name; confirm with client before production

3. **Nav wordmark: abbreviation vs full name**
   - What we know: Current code uses `T T M D`; UI-SPEC specifies "TIME TAKEN TO MAKE A DRESS"
   - What's unclear: Which is canonical — both appear in the Phase 2 artifacts
   - Recommendation: Use "TIME TAKEN TO MAKE A DRESS" per UI-SPEC (more recent, more explicit); [ASSUMED]

4. **rental.html page existence**
   - What we know: Nav D-02 specifies a Rental link; current nav has no Rental link; no `rental.html` file exists in the project root
   - What's unclear: Does `rental.html` exist? (Not seen in `ls` output)
   - Recommendation: Nav link to `rental.html` should be added; the page itself is Phase 5. For Phase 2, the href can point to a not-yet-created file — browsers handle 404 gracefully and the nav structure must be correct now.

5. **img/ directory retirement**
   - What we know: `img/placeholders/` holds Phase 1 SVGs; Phase 2 creates `images/` tree
   - What's unclear: Whether to migrate or maintain both directories
   - Recommendation: Copy SVGs to `images/placeholders/`, update all src attributes (low count — 3 SVG files), and note `img/` directory for future cleanup

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Static file serving (Plesk) | All pages | Assumed available | — | Local dev: open HTML files directly in browser |
| Google Fonts CDN | Typography | ✓ (CDN, internet required) | latest | System font fallbacks in `var(--serif)` and `var(--sans)` |
| GSAP CDN | AN-04 (if used) | ✓ (CDN, not needed for AN-04) | 3.13.0 | Native CSS transition handles AN-04; GSAP not required |
| WhatsApp (wa.me) | WA-01, WA-02 | ✓ (external service) | — | None — this is the primary conversion path |

**Missing dependencies with no fallback:** None.

**Note:** AN-04 (nav scroll state) is implemented with a CSS transition + JS class toggle. GSAP is available on CDN but is not needed for this animation. The existing `main.js` + `style.css` pattern handles it completely.

---

## Validation Architecture

nyquist_validation is enabled (config.json `workflow.nyquist_validation: true`).

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual browser verification (no automated test framework — static HTML site) |
| Config file | None |
| Quick run command | Open HTML file in browser, resize viewport |
| Full suite command | Test all 4 pages at 375px, 768px, 1440px viewport widths |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SC-01 | Nav bar renders wordmark + 4 links on ivory background | Manual visual | Open index.html in browser | N/A |
| SC-01 | Nav scrolled state transitions background opacity | Manual visual | Scroll > 50px on any page | N/A |
| SC-02 | Hamburger shows at <= 768px; tap opens full-screen overlay | Manual visual | Resize to 375px, tap hamburger | N/A |
| SC-02 | Overlay WhatsApp CTA button visible at bottom | Manual visual | Open overlay on mobile viewport | N/A |
| SC-02 | Escape key closes overlay | Manual keyboard | Open overlay, press Escape | N/A |
| SC-03 | Footer renders tagline, no address, correct columns | Manual visual | Scroll to footer on any page | N/A |
| SC-03 | Instagram link opens in new tab | Manual click | Click Instagram in footer | N/A |
| SC-04 | Nav HTML identical across all 4 pages | Code diff | `diff <(grep -A20 'class="nav"' index.html) <(grep -A20 'class="nav"' bespoke.html)` | N/A |
| IMG-03 | images/ directory tree exists with all 5 role subdirectories | File check | `ls images/` | N/A |
| IMG-04 | Drop image into role dir, update src, image renders | Manual visual | Place test image, update src | N/A |
| WA-01 | CTA banner renders as editorial block, no green/WhatsApp branding | Manual visual | View CTA section on any page | N/A |
| WA-02 | Tapping CTA opens WhatsApp with pre-filled message | Manual tap (mobile device) | Tap CTA button on real device | N/A |
| AN-04 | Nav background transitions on scroll | Manual visual | Scroll > 50px on any page | N/A |

**Note:** This is a static HTML project with no test runner. All validation is manual browser testing. The verification checklist (02-VERIFICATION.md) is the appropriate artifact for this phase, not automated test files.

### Wave 0 Gaps
None — no test framework to configure for a static HTML project.

---

## Security Domain

Security enforcement is enabled (config.json does not set `security_enforcement: false`).

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Static site, no auth |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | All pages public |
| V5 Input Validation | No | No form inputs in shared chrome |
| V6 Cryptography | No | No cryptographic operations |

### Known Threat Patterns for Static HTML

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Open redirect via external links | Spoofing | `rel="noopener noreferrer"` on all `target="_blank"` links (Instagram footer link) |
| WhatsApp URL pre-fill injection | Tampering | Pre-fill is static string literal, no user input — no risk in Phase 2; note for future phases with dynamic pre-fill |
| Clickjacking | Elevation of privilege | Not in scope for Phase 2; `X-Frame-Options` is a server-level concern for Plesk config (Phase 6) |

**Security actions for this phase:**
1. All `target="_blank"` links (Instagram) must include `rel="noopener noreferrer"` [VERIFIED: standard practice per MDN]
2. wa.me URL uses HTTPS — no action needed [ASSUMED: wa.me is HTTPS, verified by standard WhatsApp documentation]

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Nav wordmark "TIME TAKEN TO MAKE A DRESS" is preferred over "T T M D" per UI-SPEC | Code Examples | Wrong abbreviation in nav; cosmetic only, easy to fix |
| A2 | Instagram handle is `timetakentomakedress` | Code Examples | Wrong social link; placeholder comment mitigates, must confirm before launch |
| A3 | wa.me uses HTTPS | Security Domain | Low risk — wa.me is WhatsApp's documented URL scheme |
| A4 | rental.html does not exist yet | Open Questions | If it does exist, nav link is valid immediately; if not, 404 until Phase 5 |
| A5 | Copying SVGs from img/placeholders/ to images/placeholders/ is the correct migration approach | Architecture Patterns | If kept parallel, src attributes need no update; low consequence either way |

---

## Sources

### Primary (HIGH confidence)
- `css/tokens.css` — Token values verified directly [VERIFIED: codebase read]
- `css/style.css` — Nav, footer, button, placeholder CSS verified directly [VERIFIED: codebase read]
- `js/main.js` — Nav scroll state, hamburger toggle, reveal observer verified directly [VERIFIED: codebase read]
- `index.html`, `bespoke.html`, `archive.html` — Existing nav/footer HTML structure verified directly [VERIFIED: codebase read]
- `.planning/phases/02-shared-chrome/02-CONTEXT.md` — All locked decisions verified [VERIFIED: file read]
- `.planning/phases/02-shared-chrome/02-UI-SPEC.md` — Component specs, copy, accessibility contract verified [VERIFIED: file read]
- `.planning/REQUIREMENTS.md` — SC-01 through AN-04 verified [VERIFIED: file read]
- `CLAUDE.md` — Stack constraints, CDN URLs, performance budget verified [VERIFIED: system context]

### Secondary (MEDIUM confidence)
- WhatsApp wa.me URL scheme with pre-filled text — standard documentation pattern [ASSUMED: well-established]
- `rel="noopener noreferrer"` on `target="_blank"` links — MDN standard recommendation [ASSUMED: well-established]

### Tertiary (LOW confidence)
- Instagram handle `timetakentomakedress` — guessed from domain name, not verified [ASSUMED]

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified from codebase; no external libraries needed
- Architecture: HIGH — all CSS/JS patterns exist in codebase; only content additions required
- Pitfalls: HIGH — identified from direct code inspection of all 4 HTML files and main.js

**Research date:** 2026-04-23
**Valid until:** 2026-06-01 (stable static HTML patterns; no dependency on fast-moving ecosystem)
