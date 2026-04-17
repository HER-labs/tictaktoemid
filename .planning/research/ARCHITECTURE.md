# Architecture Patterns

**Domain:** Luxury bespoke fashion atelier — 5-page static HTML/CSS/JS site
**Researched:** 2026-04-16
**Confidence:** HIGH (patterns are well-established; no build tools or novel tech involved)

---

## Recommended Architecture

A flat static site with a CSS custom property token system as the single source of design truth, shared JS components via custom elements for nav/footer, and a content-addressable image directory that makes photo swaps a one-line operation.

```
ttmd-site/
|-- index.html
|-- bespoke.html
|-- archive.html
|-- rental.html            <- new page (replaces commission.html)
|-- 404.html               <- optional but valuable on Plesk
|
|-- css/
|   |-- tokens.css         <- Layer 1: all custom properties (THE source of truth)
|   |-- base.css           <- Layer 2: reset, body, typography scale
|   |-- layout.css         <- Layer 3: grid, spacing, section structure
|   |-- components.css     <- Layer 4: nav, cards, buttons, modals
|   |-- animations.css     <- Layer 5: scroll reveals, transitions
|   `-- pages/
|       |-- home.css       <- page-specific overrides only
|       |-- bespoke.css
|       |-- archive.css
|       `-- rental.css
|
|-- js/
|   |-- components/
|   |   |-- nav.js         <- custom element <site-nav>
|   |   `-- footer.js      <- custom element <site-footer>
|   |-- pages/
|   |   |-- home.js        <- craftsmanship clock, hero parallax
|   |   |-- archive.js     <- gallery filter logic
|   |   `-- bespoke.js     <- chapter scroll tracking
|   `-- main.js            <- shared init: scroll reveals, WhatsApp CTAs
|
|-- img/
|   |-- hero/              <- full-bleed hero images (1 per page, named by page)
|   |   |-- home.jpg
|   |   |-- bespoke.jpg
|   |   |-- archive.jpg
|   |   `-- rental.jpg
|   |-- gowns/             <- gallery images (named by gown ID + category)
|   |   |-- bridal/
|   |   |   |-- bridal-001.jpg
|   |   |   `-- bridal-002.jpg
|   |   |-- evening/
|   |   |-- ceremonial/
|   |   `-- editorial/
|   |-- process/           <- bespoke chapter images (named ch1 through ch5)
|   |   |-- ch1-consultation.jpg
|   |   |-- ch2-pattern.jpg
|   |   |-- ch3-toile.jpg
|   |   |-- ch4-embellishment.jpg
|   |   `-- ch5-fitting.jpg
|   |-- featured/          <- homepage featured commission(s)
|   |   `-- featured-001.jpg
|   `-- brand/             <- logo, og-image, favicon source
|       |-- logo.svg
|       |-- og-image.jpg   <- 1200x630, used across all Open Graph tags
|       `-- favicon.png
|
`-- .planning/             <- project docs, not deployed
```

---

## CSS Token Architecture

### The Three Layers

Use three tiers of CSS custom properties. This is the pattern recommended by modern design systems (Figma, Atlassian, Material). The critical rule: **nothing in components.css or pages/ ever references a hex value directly — only tokens.**

**Layer 1 — Primitives (raw values, never used directly in components)**

```css
/* css/tokens.css — Primitives */
:root {
  /* Ivory palette */
  --color-ivory-50:  #FDFAF5;
  --color-ivory-100: #FAF6ED;
  --color-ivory-200: #F5EDD8;
  --color-ivory-300: #EDE0C4;

  /* Neutral / typography */
  --color-charcoal-900: #1A1A18;
  --color-charcoal-700: #3D3D38;
  --color-charcoal-400: #8A8A80;
  --color-charcoal-200: #C8C8C0;

  /* Accent */
  --color-gold-500: #C9A96E;
  --color-gold-300: #E2C99A;

  /* Typography scale */
  --font-size-xs:   0.75rem;
  --font-size-sm:   0.875rem;
  --font-size-base: 1rem;
  --font-size-lg:   1.25rem;
  --font-size-xl:   1.5rem;
  --font-size-2xl:  2rem;
  --font-size-3xl:  3rem;
  --font-size-hero: clamp(3rem, 8vw, 7rem);

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Motion */
  --duration-fast:   150ms;
  --duration-base:   300ms;
  --duration-slow:   600ms;
  --duration-reveal: 900ms;
  --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-silk:  cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Layer 2 — Semantic tokens (intent-mapped, used in components)**

```css
/* css/tokens.css — Semantic (continues in same file, below primitives) */
:root {
  /* Surface */
  --surface-bg:        var(--color-ivory-50);
  --surface-warm:      var(--color-ivory-100);
  --surface-muted:     var(--color-ivory-200);
  --surface-overlay:   rgba(26, 26, 24, 0.6);

  /* Typography */
  --text-primary:      var(--color-charcoal-900);
  --text-secondary:    var(--color-charcoal-700);
  --text-muted:        var(--color-charcoal-400);
  --text-on-dark:      var(--color-ivory-50);

  /* Accent */
  --accent:            var(--color-gold-500);
  --accent-light:      var(--color-gold-300);

  /* Border */
  --border-hairline:   var(--color-charcoal-200);
  --border-muted:      var(--color-ivory-300);

  /* Nav */
  --nav-bg:            var(--surface-bg);
  --nav-text:          var(--text-primary);
  --nav-height:        4.5rem;

  /* Section */
  --section-padding-y: var(--space-24);
  --section-padding-x: var(--space-8);
  --section-max-width: 1280px;

  /* Card */
  --card-bg:           var(--surface-warm);
  --card-radius:       2px;
  --card-shadow:       0 2px 24px rgba(26, 26, 24, 0.06);

  /* CTA / WhatsApp button */
  --cta-bg:            var(--color-charcoal-900);
  --cta-text:          var(--color-ivory-50);
  --cta-hover-bg:      var(--color-charcoal-700);
}
```

**Why this matters for the dark-to-light migration:** The existing dark site uses hex values scattered through style.css. The refactor collapses all those values into tokens.css. Once tokens are defined, switching from dark to light is a single block change in tokens.css — not a find-and-replace across 2,000 lines.

**Future dark mode (v2):** Add a `[data-theme="dark"]` selector to tokens.css that re-maps semantic tokens to dark primitives. Zero component changes required because nothing outside tokens.css references a hex value.

---

## Component Boundaries

| Component | File | Responsibility | Communicates With |
|-----------|------|---------------|-------------------|
| `<site-nav>` | js/components/nav.js | Hamburger, scroll-aware opacity, active page state | main.js for scroll position |
| `<site-footer>` | js/components/footer.js | Links, WhatsApp CTA, copyright year | None |
| Scroll reveals | js/main.js | IntersectionObserver on `.reveal` elements | Applied globally |
| WhatsApp CTAs | js/main.js | All `.cta-whatsapp` links get correct href | None — pure DOM |
| Gallery filter | js/pages/archive.js | Filter buttons + CSS class toggling | None |
| Craftsmanship clock | js/pages/home.js | Real-time counter since atelier founding | None |
| Chapter tracker | js/pages/bespoke.js | Active chapter highlight as user scrolls | Scroll listener |
| Image placeholder | CSS + HTML attribute | `data-photo-slot` attribute, CSS aspect ratios | Replaced by real img src |

### Shared Component Pattern (no framework)

Use native Custom Elements for nav and footer — the two components that appear on every page. This eliminates the copy-paste maintenance problem without requiring a build step or server-side includes.

```html
<!-- Every page <head> includes: -->
<script type="module" src="/js/components/nav.js" defer></script>
<script type="module" src="/js/components/footer.js" defer></script>

<!-- In body, replace hard-coded nav with: -->
<site-nav></site-nav>

<!-- At end of body, replace hard-coded footer with: -->
<site-footer></site-footer>
```

```js
// js/components/nav.js — safe DOM construction, no innerHTML with dynamic content
class SiteNav extends HTMLElement {
  connectedCallback() {
    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.setAttribute('role', 'navigation');

    // Build nav using safe DOM methods
    // Active state: compare location.pathname to each link href
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    // ... build links, mark active, append to nav
    this.appendChild(nav);
  }
}
customElements.define('site-nav', SiteNav);
```

Note: Nav markup is authored by the developer, not from user input — security risk is low. However, using DOM creation methods rather than string injection is the correct pattern regardless.

**Alternative if Custom Elements feel like overkill for 5 pages:** Use `fetch()` to load a `partials/nav.html` file into a placeholder div on DOMContentLoaded. Simpler, but creates a flash of missing nav on slow connections. Custom Elements are preferred.

---

## Image Directory Structure and Photo Swap Workflow

### Naming Convention

All image filenames are lowercase, hyphen-separated, and describe their role — not their content. This makes swapping photos a one-filename change.

```
img/hero/home.jpg                  <- always this name, always this slot
img/process/ch1-consultation.jpg   <- chapter 1 hero, always this name
img/gowns/bridal/bridal-001.jpg    <- sequential, add bridal-009.jpg to extend gallery
```

### HTML Pattern for Easy Swaps

Use a `data-photo-slot` attribute and consistent aspect-ratio containers. When real photos arrive, only the `src` attribute changes — nothing else:

```html
<!-- Hero image — pre-shoot uses warm ivory placeholder via CSS -->
<figure class="photo-slot photo-slot--hero" data-photo-slot="hero-home">
  <img
    src="/img/hero/home.jpg"
    alt="TTMD atelier — bespoke gown detail"
    width="1920"
    height="1080"
    loading="eager"
  >
</figure>

<!-- Gallery item — lazy loaded, same slot pattern -->
<figure class="photo-slot photo-slot--gown" data-photo-slot="bridal-001">
  <img
    src="/img/gowns/bridal/bridal-001.jpg"
    alt="Bridal commission — TTMD 2024"
    width="800"
    height="1200"
    loading="lazy"
  >
</figure>
```

```css
/* Placeholder state — warm ivory fill until real photos arrive */
.photo-slot {
  position: relative;
  overflow: hidden;
  background-color: var(--surface-muted);
}

/* Aspect ratios enforce layout stability (no layout shift when image loads) */
.photo-slot--hero    { aspect-ratio: 16 / 9; }
.photo-slot--gown    { aspect-ratio: 3 / 4; }
.photo-slot--process { aspect-ratio: 4 / 3; }
.photo-slot--featured { aspect-ratio: 2 / 3; }

.photo-slot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--duration-slow) var(--ease-silk);
}

.photo-slot:hover img {
  transform: scale(1.03);
}
```

### Photo Swap Workflow (when real images arrive)

1. Export from Lightroom/Capture One at target dimensions (hero: 1920px wide, gowns: 800px wide)
2. Compress with Squoosh or ImageOptim — target: under 200KB for gallery, under 400KB for heroes
3. Rename to the exact slot name already in place (e.g. `bridal-001.jpg`, `home.jpg`)
4. SFTP the file to the matching `img/` subdirectory
5. No HTML edits needed — the `src` is already pointing to the correct filename

**Placeholder strategy for pre-shoot period:** Use the warm ivory CSS background on `.photo-slot` elements. This reads as intentional editorial whitespace, consistent with quiet luxury references (The Row, Loro Piana). Avoid gray placeholders — they read as broken.

---

## Data Flow

```
tokens.css
    |
    v (references via var())
base.css -> layout.css -> components.css -> animations.css
    |
    v (page-specific layer, linked after shared CSS)
pages/home.css, pages/bespoke.css, etc.
    |
    v (loaded in each HTML <head>)
index.html, bespoke.html, archive.html, rental.html
```

```
main.js (global init: scroll reveals, WhatsApp links)
    |
    +-- loaded on every page
    |
    +-- js/components/nav.js    <- Custom Element, renders nav
    +-- js/components/footer.js <- Custom Element, renders footer
    |
    `-- page-specific (only loaded on that page)
        +-- js/pages/home.js    <- clock, hero parallax
        +-- js/pages/archive.js <- filter logic
        `-- js/pages/bespoke.js <- chapter tracker
```

Each HTML page loads in this order:

1. Shared CSS: `tokens.css` -> `base.css` -> `layout.css` -> `components.css` -> `animations.css`
2. Page CSS: `css/pages/pagename.css`
3. `js/main.js` (type="module", defer)
4. `js/components/nav.js` + `js/components/footer.js` (type="module")
5. Page-specific JS: `js/pages/pagename.js` (type="module", defer)

---

## Deployment Strategy for Plesk

### Recommended: Git + Plesk Git Integration

Plesk Obsidian supports connecting a remote Git repository (GitHub/GitLab) and deploying to `httpdocs` automatically on push. This is the correct workflow — no manual FTP for code, auditable history, easy rollback.

**Setup steps:**

1. Push the site repo to GitHub (private repository)
2. Plesk admin: Websites & Domains -> Git -> Add Repository -> Remote Git Hosting
3. Enter repo URL in SSH format: `git@github.com:org/ttmd-site.git`
4. Copy the Plesk-generated SSH public key; add it as a Deploy Key in GitHub repo settings (read-only is sufficient)
5. Set Target Directory: `/httpdocs`
6. Set Deployment Mode: **Manual** (recommended for a client site — prevents accidental deploys on every push)
7. Optional: configure GitHub webhook pointing to the Plesk-generated webhook URL for push-triggered deploys

**Standard deploy workflow:**

```
git add .
git commit -m "swap hero photo for homepage"
git push origin main
# Then in Plesk: click "Pull Updates"
# OR with webhook: automatic on push
```

### SFTP for Photo-Only Updates

For photo swaps that don't involve code changes, SFTP directly to `/httpdocs/img/` using Cyberduck, Transmit, or FileZilla. This is faster than a full deploy and keeps git history clean of binary image commits.

| Task | Tool | Why |
|------|------|-----|
| Code changes | Git + Plesk | Auditable, rollback, team workflow |
| Photo swaps | SFTP to img/ | Faster than full deploy, no code change |
| Emergency single-file fix | SFTP direct | Break-glass only |

### .htaccess for Plesk (Apache)

Plesk runs Apache. Add this `.htaccess` to `httpdocs/`:

```apache
# Redirect www to non-www
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.timetakentomakedress\.com [NC]
RewriteRule ^(.*)$ https://timetakentomakedress.com/$1 [R=301,L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# Clean 404
ErrorDocument 404 /404.html

# Cache static assets aggressively (1 month)
<FilesMatch "\.(jpg|jpeg|png|gif|svg|webp|css|js|woff2)$">
  Header set Cache-Control "max-age=2592000, public"
</FilesMatch>
```

---

## Build Order (What Depends on What)

Each phase below produces a working, deployable state.

### Phase 1: Token Foundation
Build `css/tokens.css` with the full primitive + semantic token set for the ivory theme. Verify in browser.

**Dependency:** Every other CSS file references these tokens. This must exist before any other CSS work begins.

### Phase 2: Shared Chrome (nav + footer)
1. Build `js/components/nav.js` Custom Element
2. Build `js/components/footer.js` Custom Element
3. Remove duplicated nav/footer HTML from all existing pages
4. Replace with `<site-nav>` / `<site-footer>` tags

**Dependency:** Nav affects layout shifts and mobile breakpoints. Must exist before page-specific CSS is finalized.

### Phase 3: Global CSS Migration
1. Migrate `css/style.css` into `base.css` + `layout.css` + `components.css`
2. Extract page-specific `<style>` blocks from all HTML files into `css/pages/*.css`
3. Apply warm ivory theme by editing semantic tokens in `tokens.css`

**Dependency:** Do this as a batch after Phase 2 — touching every file at once avoids partial states.

### Phase 4: Homepage + Bespoke
1. Rebuild `index.html` with token-aware classes and ivory theme
2. Move craftsmanship clock to `js/pages/home.js`
3. Rebuild `bespoke.html` with 5-chapter structure and scroll tracking

**Dependency:** These pages carry the most brand weight. Polish before gallery.

### Phase 5: Archive Gallery
1. Rebuild `archive.html` with filter system
2. Set up `img/gowns/` directory with placeholder images
3. Wire `js/pages/archive.js` filter logic

**Dependency:** Gallery grid CSS (in `components.css`, Phase 3) must be complete.

### Phase 6: Rental Page (new)
1. Create `rental.html` using existing component patterns
2. Add Truly Enamoured content and bespoke upgrade CTA
3. Add to nav

**Dependency:** Shared chrome (Phase 2) and shared CSS (Phase 3) must be complete.

### Phase 7: Production
1. Add SEO meta and Open Graph to all pages (uses `img/brand/og-image.jpg`)
2. Create `404.html`
3. Add `.htaccess`
4. Connect Plesk Git integration
5. Deploy

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Page-level inline style blocks
**What goes wrong:** The existing site has page-specific CSS in `<style>` tags inside `<head>`. These cannot be cached by the browser, cannot be organized, and grow uncontrolled.
**Instead:** `css/pages/pagename.css` — separate file, linked from `<head>`, fully cacheable.

### Anti-Pattern 2: Hex values outside tokens.css
**What goes wrong:** One off-spec `#f0ede6` appears in components.css, then five more, then the ivory theme has 12 slightly different cream values with no relationship to each other.
**Instead:** Absolute rule — any color, spacing value, or type size used more than once lives in tokens.css. Nothing else.

### Anti-Pattern 3: Duplicated nav HTML across pages
**What goes wrong:** Changing one nav link requires editing 5 HTML files. One will be missed.
**Instead:** Custom Element pattern. One source of truth.

### Anti-Pattern 4: Flat image directory
**What goes wrong:** 40+ images named `image1.jpg`, `gown-final-v3.jpg`, `hero-NEW.jpg`. Impossible to know what slot they belong to without opening the HTML.
**Instead:** Subdirectory-per-role with semantic filenames tied to their HTML slots.

### Anti-Pattern 5: FTP for code deployments
**What goes wrong:** Local files diverge from server. No history. One missed file upload breaks the site.
**Instead:** Git to Plesk Git integration for all code changes. SFTP only for image-only updates.

---

## Sources

- Plesk Git deployment: [Using remote Git hosting — Plesk Obsidian docs](https://docs.plesk.com/en-US/obsidian/customer-guide/git-support/using-remote-git-hosting.75848/)
- CSS design token three-tier hierarchy: [Design tokens explained — Contentful](https://www.contentful.com/blog/design-token-system/)
- CSS custom properties theming architecture: [CSS-Tricks: Complete Guide to Dark Mode](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/)
- Static site folder structure conventions: [Folder Structure for Static Websites — rahulyadavdev.in](https://www.rahulyadavdev.in/articles/folder-structure-for-static-websites)
- Custom Elements for shared components: [Reusable HTML Components — freeCodeCamp](https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/)
- Native web component architecture: [Architecture through Component Colocation — Frontend Masters](https://frontendmasters.com/blog/architecture-through-component-colocation/)
