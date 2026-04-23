# Phase 2: Shared Chrome — Pattern Map

**Mapped:** 2026-04-23
**Files analyzed:** 7 new/modified files
**Analogs found:** 7 / 7

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `index.html` (nav + footer update) | component | request-response | `index.html` (existing nav/footer blocks) | self — update in place |
| `bespoke.html` (nav + footer update) | component | request-response | `index.html` nav/footer blocks | exact role match |
| `archive.html` (nav + footer update) | component | request-response | `index.html` nav/footer blocks | exact role match |
| `commission.html` (nav + footer update) | component | request-response | `index.html` nav/footer blocks | exact role match |
| `css/style.css` (additions) | config/style | transform | `css/style.css` existing rules | self — append |
| `js/main.js` (additions) | utility | event-driven | `js/main.js` existing toggle block | self — update in place |
| `images/` directory tree | config | file-I/O | `img/placeholders/` (existing directory) | structural analog |

---

## Pattern Assignments

### `index.html`, `bespoke.html`, `archive.html`, `commission.html` — Nav block

**Analog:** `index.html` lines 346–356 (existing nav)

**Existing nav (to replace)** (`index.html` lines 346–356):
```html
<nav class="nav">
  <a href="index.html" class="nav-logo">T T M D</a>
  <ul class="nav-links">
    <li><a href="bespoke.html">Bespoke</a></li>
    <li><a href="archive.html">Archive</a></li>
    <li><a href="commission.html">Commission</a></li>
  </ul>
  <button class="nav-toggle" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>
```

**Canonical nav to use across all pages** (per D-01, D-02, D-05, SC-02, accessibility contract):
```html
<nav class="nav" role="navigation" aria-label="Main navigation">
  <!-- Skip link: first focusable element, visually hidden until focused -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <a href="index.html" class="nav-logo">Time Taken to Make a Dress</a>
  <ul class="nav-links" id="nav-overlay" role="list">
    <li><a href="bespoke.html">Bespoke</a></li>
    <li><a href="archive.html">Archive</a></li>
    <li><a href="rental.html">Rental</a></li>
    <li><a href="https://wa.me/65XXXXXXXX?text=Hello%20%E2%80%94%20I%27d%20like%20to%20discuss%20a%20bespoke%20commission%20for%20%5Boccasion%5D.">Contact</a></li>
    <!-- Mobile only: WhatsApp CTA at bottom of overlay (D-05) -->
    <li class="nav-overlay-cta">
      <a href="https://wa.me/65XXXXXXXX?text=Hello%20%E2%80%94%20I%27d%20like%20to%20discuss%20a%20bespoke%20commission%20for%20%5Boccasion%5D."
         class="btn-primary">Begin your commission</a>
      <!-- TODO: Replace 65XXXXXXXX with real WhatsApp number -->
    </li>
  </ul>
  <button class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-overlay">
    <span></span><span></span><span></span>
  </button>
</nav>
```

**Note:** The `nav-overlay-cta` list item is hidden on desktop via CSS and only visible inside the `.nav-links.open` mobile overlay. The `active` class on the current page link is set by `js/main.js` at runtime (line 116–121) — do not hardcode it in HTML.

**Note on `rental.html`:** The file does not exist yet (Phase 5). The href is correct now and browsers handle the 404 gracefully.

---

### `index.html`, `bespoke.html`, `archive.html`, `commission.html` — Footer block

**Analog:** `index.html` lines 499–530 (existing footer)

**Existing footer (to replace)** (`index.html` lines 499–530):
```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="nav-logo">T T M D</div>
        <div class="footer-address">
          337A Beach Road<br>
          Singapore<br>
          By appointment only
        </div>
      </div>
      <div class="footer-nav">
        <div class="footer-col">
          <div class="footer-col-title">Atelier</div>
          <a href="bespoke.html">Bespoke</a>
          <a href="archive.html">Archive</a>
          <a href="commission.html">Commission</a>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">Connect</div>
          <a href="#">Instagram</a>
          <a href="#">Pinterest</a>
          <a href="#">Email</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 Time Taken to Make a Dress</span>
      <span>Crafted by hand. Always.</span>
    </div>
  </div>
</footer>
```

**Canonical footer to use across all pages** (per D-11, D-12, D-13):
```html
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
          <a href="https://instagram.com/timetakentomakedress" target="_blank" rel="noopener noreferrer" class="footer-instagram-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
            Instagram
          </a>
          <!-- TODO: Replace 65XXXXXXXX with real WhatsApp number -->
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

**Removals required per D-11:** Delete `.footer-address` block (contains "337A Beach Road"). Replace with `.footer-tagline` paragraph.

---

### `index.html`, `bespoke.html`, `archive.html`, `commission.html` — WhatsApp CTA section

**Analog:** `index.html` lines 487–496 (existing `.cta-banner` section with `commission.html` link)

**Existing CTA (to update)** (`index.html` lines 487–496):
```html
<section class="cta-banner">
  <div class="container">
    <div class="eyebrow reveal">By appointment only</div>
    <h2 class="reveal" style="margin-top: 16px;">Your gown begins here</h2>
    <p class="body-text reveal">Every commission starts with a conversation...</p>
    <div class="reveal">
      <a href="commission.html" class="btn-primary">Request a consultation</a>
    </div>
  </div>
</section>
```

**Canonical CTA pattern (button label varies per page per D-08):**
```html
<section class="cta-banner">
  <div class="container">
    <div class="eyebrow reveal">By appointment only</div>
    <h2 class="reveal">Every gown begins with a conversation</h2>
    <p class="cta-subtext reveal">Tell us about your occasion, your vision, your timeline. We will take the time to make it extraordinary.</p>
    <div class="reveal">
      <!-- Button label per page:
           index.html      → "Begin your commission"
           bespoke.html    → "Start your journey"
           archive.html    → "Enquire about a gown"
           commission.html → "Enquire about rental"
      -->
      <!-- TODO: Replace 65XXXXXXXX with real WhatsApp number -->
      <a href="https://wa.me/65XXXXXXXX?text=Hello%20%E2%80%94%20I%27d%20like%20to%20discuss%20a%20bespoke%20commission%20for%20%5Boccasion%5D."
         class="btn-primary">Begin your commission</a>
    </div>
  </div>
</section>
```

**Change:** href moves from `commission.html` to `wa.me` link. The `.cta-banner` styles currently live in an inline `<style>` block in `index.html` (lines 306–318). They must be moved to `css/style.css` and the inline block removed. See style.css additions below.

---

### `css/style.css` — Additions for Phase 2

**Analog:** `css/style.css` existing patterns (same file, append pattern). Key analogs:
- `.btn-primary` block (lines 151–167) — same token usage pattern to copy for `.cta-banner`
- `.site-footer` block (lines 204–256) — same structure to extend with `.footer-tagline`
- `.nav-toggle span` block (lines 142–148) — same transition syntax for `.nav-overlay-cta`

**1. Promote `.cta-banner` from index.html inline style to style.css** (replaces lines 306–318 of index.html `<style>`):
```css
/* --- CTA Banner (WA-01) --- */
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

**2. Add `.footer-tagline` (D-11)** — extends existing `.footer-address` pattern (style.css line 219):
```css
/* Replaces .footer-address which is removed per D-11 */
.footer-tagline {
  font-size: 14px;
  font-weight: 300;
  color: var(--text-tertiary);
  line-height: 1.8;
  margin-top: 12px;
}
```

**3. Add `.footer-instagram-link` flex pattern** — extends `.footer-col a` (style.css line 239):
```css
.footer-instagram-link {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

**4. Add `.skip-link` (accessibility, SC-02):**
```css
/* --- Skip link (accessibility) --- */
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

**5. Add mobile overlay CTA and link sizing** — extends existing `@media (max-width: 768px)` block (style.css line 297):
```css
@media (max-width: 768px) {
  /* Add inside existing @media (max-width: 768px) block */
  .nav-links.open a {
    font-size: 16px;
    padding: 12px 0; /* 48px touch target with line-height */
  }
  .nav-overlay-cta {
    margin-top: auto; /* pushes CTA to bottom of flex column */
    width: 100%;
    list-style: none;
  }
  .nav-overlay-cta .btn-primary {
    display: block;
    text-align: center;
  }
  /* Hide overlay CTA on desktop */
}
@media (min-width: 769px) {
  .nav-overlay-cta { display: none; }
}
```

**6. Add `prefers-reduced-motion` global (accessibility):**
```css
/* --- Reduced motion (accessibility) --- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### `js/main.js` — Additions for Phase 2

**Analog:** `js/main.js` lines 17–33 (existing hamburger toggle block)

**Existing toggle** (lines 17–33 — to replace):
```javascript
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}
```

**Updated toggle with body scroll-lock, aria-expanded, Escape key, and closeOverlay helper:**
```javascript
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  const spans = toggle.querySelectorAll('span');

  function closeOverlay() {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
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
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeOverlay();
      toggle.focus(); // return focus to trigger element
    }
  });
}
```

**Also update:** Nav scroll threshold from `> 40` to `> 50` (line 12, per AN-04 / UI-SPEC):
```javascript
// Change: window.scrollY > 40  →  window.scrollY > 50
nav.classList.toggle('scrolled', window.scrollY > 50);
```

**Also update:** Smooth scroll close guard (line 107) to use `closeOverlay()` if overlay is open:
```javascript
// After closeOverlay is defined, update the smooth scroll handler:
if (navLinks && navLinks.classList.contains('open')) {
  closeOverlay(); // was: navLinks.classList.remove('open')
}
```

---

### `images/` directory tree

**Analog:** `img/placeholders/` (existing directory — 3 SVG files: `silhouette-hero.svg`, `silhouette-portrait.svg`, `silhouette-fabric.svg`)

**Migration note:** Zero existing HTML files reference `img/placeholders/` paths (confirmed by grep). This means the SVGs can be copied to `images/placeholders/` with no src-attribute updates required in existing HTML. Future HTML should use `images/placeholders/` paths.

**Directory structure to create** (D-14, D-15, IMG-03):
```
images/
  hero/           .gitkeep
  gowns/          .gitkeep
  process/        .gitkeep
  fabric/         .gitkeep
  rental/         .gitkeep
  placeholders/   silhouette-hero.svg (copied from img/placeholders/)
                  silhouette-portrait.svg (copied from img/placeholders/)
                  silhouette-fabric.svg (copied from img/placeholders/)
```

**Image src pattern for production use** (IMG-04):
```html
<div class="placeholder placeholder--hero">
  <img src="images/hero/hero-homepage.jpg"
       alt="Atelier hero"
       width="1200" height="675"
       loading="lazy">
</div>
```

**Image src pattern for placeholder phase:**
```html
<div class="placeholder placeholder--hero">
  <img src="images/placeholders/silhouette-hero.svg" alt="" aria-hidden="true">
</div>
```

---

## Shared Patterns

### Token usage
**Source:** `css/tokens.css` (all 34 lines — full file is the reference)
**Apply to:** All new CSS additions in style.css
**Rule:** Never use raw color values in new CSS. Use only tokens defined in `tokens.css`:
- Colors: `var(--bg)`, `var(--bg-surface)`, `var(--text)`, `var(--text-secondary)`, `var(--text-tertiary)`
- Transition: `var(--ease)`, `var(--transition)` (= `500ms var(--ease)`)
- Spacing: `var(--space-xs)` through `var(--space-4xl)`

**Anti-pattern to avoid:** The existing `index.html` inline styles use `var(--gold-light)`, `var(--gold-dim)`, `var(--border-gold)`, `var(--text-dim)`, `var(--text-faint)`, `var(--border)` — these are NOT in `tokens.css` and are orphaned dark-theme variables. Do not use them in any Phase 2 additions.

### Transition pattern
**Source:** `css/style.css` lines 109, 147, 161, 178 (`.nav-links a`, `.nav-toggle span`, `.btn-primary`, `.btn-outline`)
**Apply to:** Any new interactive element
```css
transition: [property] 500ms var(--ease);
```

### External link security
**Source:** Research requirement (security domain)
**Apply to:** All `target="_blank"` links (Instagram footer link)
```html
<a href="..." target="_blank" rel="noopener noreferrer">...</a>
```

### Scroll reveal class
**Source:** `css/style.css` lines 187–201; `js/main.js` lines 36–47
**Apply to:** CTA banner child elements (eyebrow, h2, p, button wrapper)
```html
<div class="eyebrow reveal">...</div>
<h2 class="reveal">...</h2>
<p class="cta-subtext reveal">...</p>
<div class="reveal"><a class="btn-primary">...</a></div>
```

### WhatsApp URL pattern
**Source:** D-07, WA-02
**Apply to:** Every wa.me link across all files
```
https://wa.me/65XXXXXXXX?text=Hello%20%E2%80%94%20I%27d%20like%20to%20discuss%20a%20bespoke%20commission%20for%20%5Boccasion%5D.
```
Always accompany with `<!-- TODO: Replace 65XXXXXXXX with real WhatsApp number -->`.

### `<head>` block pattern
**Source:** `index.html` lines 1–12 and `bespoke.html` lines 1–12
**Apply to:** Ensure all four HTML files have identical link order
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/style.css">
```

---

## No Analog Found

No files are without a close match. All Phase 2 work extends existing patterns in the codebase.

---

## Critical Pitfalls for Planner

1. **`.cta-banner` lives in index.html inline `<style>` block (lines 306–318)** — must be removed from `<style>` and added to `style.css`. If left in both places, the style.css version is ignored on index.html.

2. **`.footer-address` must be deleted** from all four pages — contains "337A Beach Road" which contradicts D-11. Replace with `.footer-tagline`.

3. **Nav wordmark** must change from `T T M D` (current) to `Time Taken to Make a Dress` (UI-SPEC canonical) on all pages.

4. **`closeOverlay()` function** must be declared before both the click listener and the Escape listener use it. Declare it inside the `if (toggle && navLinks)` guard block before any event listeners.

5. **Nav "Contact" link** must point to `wa.me` URL, not `commission.html` (per D-02). commission.html still exists but is no longer the nav destination.

6. **`nav-overlay-cta` li** is hidden on desktop via `@media (min-width: 769px) { .nav-overlay-cta { display: none; } }`. Without this rule, the WhatsApp button appears in the desktop nav list.

---

## Metadata

**Analog search scope:** `/Users/justinlong/Documents/Clients/ttmd/ttmd-site/` (all HTML, CSS, JS files)
**Files read:** `index.html`, `bespoke.html`, `css/style.css`, `css/tokens.css`, `js/main.js`, `02-CONTEXT.md`, `02-RESEARCH.md`
**Pattern extraction date:** 2026-04-23
