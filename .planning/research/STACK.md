# Technology Stack: TTMD Static Site

**Project:** Time Taken to Make a Dress — Luxury Bespoke Gown Atelier
**Researched:** 2026-04-16
**Constraint:** Zero build tools. Pure static HTML/CSS/JS on Plesk hosting.

---

## Recommended Stack

### Core Approach

No framework. No preprocessor. No build step. This is a feature, not a limitation — it means
zero dependency rot, zero upgrade cycles, and a site that works forever on Plesk without touching
server config.

The discipline required: use CSS custom properties as the entire "framework." Structure CSS into
logical layers. Load external resources only from CDN with locked version numbers.

---

### Typography

**Decision: Cormorant Garamond (display) + Jost (body/UI)**

| Role | Font | Weights | Why |
|------|------|---------|-----|
| Display / headings | Cormorant Garamond | 300, 400, 500, 600 | Renaissance-derived, extreme stroke contrast, overtly editorial — closer to Didot than Playfair. Used in bridal and haute couture contexts for its literariness. 2M+ websites but far less mainstream than Playfair Display in fashion contexts. |
| Body / navigation / labels | Jost | 300, 400, 500 | Geometric sans-serif inspired by 1920s German type (Futura lineage). Larger x-height than Futura makes it more legible at small sizes. Clean and modern without being cold. Pairs with Cormorant's drama through contrast, not competition. |

**Why NOT Playfair Display:** 3.7M websites use it. It reads immediately as "wedding blog." Cormorant
is more distinctive, more editorial, and more aligned with the Chanel/The Row reference benchmarks.

**Why NOT Adobe Fonts / premium typefaces:** Zero license complexity. Self-hosting is not required
(Google Fonts is adequate). No build step.

**Google Fonts CDN — use display=swap and preconnect:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
```

**Confidence:** HIGH — Verified via Google Fonts specimen pages and multiple luxury branding sources.

---

### CSS Architecture

**Decision: Vanilla CSS with a strict custom property token system. No framework.**

Tailwind, Bootstrap, and utility-first frameworks all require a build step or add bloat inappropriate
for this aesthetic. The site's visual language is about restraint — the CSS architecture should match.

#### Token System (Root Variables)

Organize into four layers:

```css
:root {
  /* === COLOR TOKENS === */
  /* Surfaces */
  --color-base:        #FAF8F5;   /* Warm ivory — primary background */
  --color-surface-1:   #F5F2EE;   /* Slightly warmer for card backgrounds */
  --color-surface-2:   #EDE9E4;   /* Borders, dividers, subtle contrast */

  /* Typography */
  --color-ink-primary:   #1A1714;  /* Near-black warm — avoids cold blue-black */
  --color-ink-secondary: #6B6560;  /* Warm medium grey for captions, labels */
  --color-ink-muted:     #9C9490;  /* Placeholder text, disabled states */

  /* Accent (used sparingly — one CTA per section maximum) */
  --color-accent:        #C4A882;  /* Warm champagne — not gold, not beige */
  --color-accent-hover:  #B09570;  /* 10% darker for hover states */

  /* === TYPOGRAPHY TOKENS === */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'Jost', 'Helvetica Neue', Arial, sans-serif;

  /* Fluid type scale — scales between 375px and 1440px viewports */
  --text-xs:   clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem);  /* 12–14px */
  --text-sm:   clamp(0.875rem, 0.8rem  + 0.35vw, 1rem);      /* 14–16px */
  --text-base: clamp(1rem,     0.9rem  + 0.45vw, 1.125rem);  /* 16–18px */
  --text-md:   clamp(1.125rem, 1rem    + 0.55vw, 1.25rem);   /* 18–20px */
  --text-lg:   clamp(1.25rem,  1.1rem  + 0.75vw, 1.5rem);    /* 20–24px */
  --text-xl:   clamp(1.5rem,   1.2rem  + 1.2vw,  2rem);      /* 24–32px */
  --text-2xl:  clamp(2rem,     1.5rem  + 2vw,    3rem);       /* 32–48px */
  --text-3xl:  clamp(2.5rem,   1.8rem  + 3vw,    4.5rem);    /* 40–72px */
  --text-hero: clamp(3rem,     2rem    + 4.5vw,  6.5rem);    /* 48–104px */

  /* === SPACING TOKENS === */
  --space-xs:   0.5rem;    /* 8px */
  --space-sm:   1rem;      /* 16px */
  --space-md:   1.5rem;    /* 24px */
  --space-lg:   2.5rem;    /* 40px */
  --space-xl:   4rem;      /* 64px */
  --space-2xl:  6rem;      /* 96px */
  --space-3xl:  10rem;     /* 160px */

  /* Section breathing room — luxury requires generosity */
  --section-padding-y: clamp(4rem, 2rem + 6vw, 10rem);
  --section-padding-x: clamp(1.5rem, 4vw, 8rem);

  /* === MOTION TOKENS === */
  --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast:   200ms;
  --duration-base:   400ms;
  --duration-slow:   700ms;
  --duration-reveal: 1000ms;
}
```

**Rationale for warm near-black (#1A1714):** Pure #000000 on warm ivory reads as slightly cold
and jarring. The warm near-black feels more like ink on cream paper — which is precisely the
sensory reference the brand needs to evoke.

**Confidence:** HIGH — CSS custom properties require no tools, have full browser support (97%+),
and this token architecture is derived from established design systems methodology applied to
the specific palette.

---

### CSS File Architecture

Three files only. No preprocessor, no imports-within-imports complexity.

```
/css/
  tokens.css      ← All custom properties. Nothing else.
  base.css        ← Reset, typographic defaults, global layout primitives
  components.css  ← Page-specific patterns: hero, gallery, nav, CTA, etc.
```

Load order in `<head>`:
```html
<link rel="stylesheet" href="/css/tokens.css">
<link rel="stylesheet" href="/css/base.css">
<link rel="stylesheet" href="/css/components.css">
```

This separation means the entire visual identity can be adjusted by editing tokens.css only —
no hunting through 3,000 lines of component CSS.

**Confidence:** HIGH — Standard CSS architecture practice, zero dependencies.

---

### Animation

**Strategy: Two-tier approach — CSS for reveals, GSAP for signature moments.**

#### Tier 1: Native CSS Scroll-Driven Animations + Intersection Observer

For scroll-reveal fades (the majority of animations), use native browser APIs:

- **CSS `animation-timeline: view()`** for fade-in-on-scroll effects
- **Intersection Observer API** for class-toggling reveals (20 lines of vanilla JS)
- No library needed for 80% of animations

Safari 26 added scroll-driven animation support (released 2025), making this viable across
all major browsers as of 2026. Use `@supports` wrapper as progressive enhancement for
older Safari:

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: fade-up linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
  }
}
```

For browsers without support, the Intersection Observer fallback handles reveals.

**Confidence:** MEDIUM — Safari 26 support confirmed in search results but I could not independently
verify exact Safari version number from Apple release notes. The @supports fallback mitigates risk.

#### Tier 2: GSAP v3.13 for Signature Animations

Use GSAP for: the craftsmanship clock counter, hero text character-by-character reveals, and
any timeline-sequenced entrance animations. These are moments where the native API lacks control.

GSAP became fully free (including all plugins like SplitText, ScrollTrigger) in April 2025.

```html
<!-- GSAP Core — load before closing </body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<!-- ScrollTrigger plugin -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<!-- SplitText plugin — for character/word reveals -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js"></script>
```

Register plugins immediately after:
```javascript
gsap.registerPlugin(ScrollTrigger, SplitText);
```

**Why GSAP over AOS/ScrollReveal:** AOS is simpler but produces generic "web agency" animations.
GSAP gives frame-accurate control over staggered sequences — critical for the craftsmanship
clock and editorial text reveals. AOS is appropriate for a portfolio site; GSAP is appropriate
for a brand that charges $20k per gown.

**Why CDN not npm:** No build tools available. GSAP's cdnjs hosting is stable and versioned.

**Confidence:** HIGH — CDN URLs verified via cdnjs.com. GSAP free-for-all confirmed via
multiple 2025 sources.

---

### Image Strategy

**Constraint:** No photography yet. No CDN. Images served directly from Plesk.

#### Placeholder Architecture (Pre-Photography Phase)

Use CSS aspect-ratio boxes as placeholders. They hold layout space, communicate the intended
composition ratio, and swap to real images with one attribute change:

```html
<!-- Portrait gown image placeholder — 3:4 ratio -->
<div class="img-placeholder img-placeholder--portrait" aria-hidden="true">
  <span class="img-placeholder__label">Commission No. 047</span>
</div>
```

```css
.img-placeholder {
  background-color: var(--color-surface-2);
  position: relative;
  overflow: hidden;
}
.img-placeholder--portrait  { aspect-ratio: 3 / 4; }
.img-placeholder--landscape { aspect-ratio: 16 / 9; }
.img-placeholder--square    { aspect-ratio: 1; }

/* Subtle grain texture — feels intentional, not broken */
.img-placeholder::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.4;
}
```

**Swap mechanism:** When real photography arrives, replace `<div class="img-placeholder">` with
`<picture>` element. No layout changes required — aspect-ratio is defined on the wrapper, not
the img element.

#### Production Image Delivery (Post-Photography Phase)

Use the `<picture>` element with AVIF → WebP → JPEG fallback chain. Pre-convert all images to
WebP and AVIF before upload to Plesk (use Squoosh.app — free, browser-based, no install):

```html
<picture>
  <source
    srcset="/img/gown-047-800w.avif 800w, /img/gown-047-1600w.avif 1600w"
    type="image/avif"
    sizes="(max-width: 768px) 100vw, 50vw"
  >
  <source
    srcset="/img/gown-047-800w.webp 800w, /img/gown-047-1600w.webp 1600w"
    type="image/webp"
    sizes="(max-width: 768px) 100vw, 50vw"
  >
  <img
    src="/img/gown-047-800w.jpg"
    alt="Ivory silk gown with hand-applied lace, Commission No. 047"
    loading="lazy"
    decoding="async"
    width="800"
    height="1067"
  >
</picture>
```

**Target file sizes:** Hero images under 200KB (AVIF), gallery thumbnails under 50KB (WebP).
At luxury quality the photography deserves generous compression — do not over-compress.

**Tool for conversion:** [Squoosh.app](https://squoosh.app) — browser-based, free, produces
AVIF/WebP/JPEG with precise quality control. No software install.

**Confidence:** HIGH — `<picture>` element is a well-established standard. Squoosh.app is
a Google-maintained tool.

---

### WhatsApp CTA Integration

No library needed. Direct wa.me link with pre-filled message:

```html
<a
  href="https://wa.me/6512345678?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20a%20bespoke%20commission."
  class="btn btn--primary"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Open WhatsApp to begin your bespoke commission enquiry"
>
  Begin Your Commission
</a>
```

Update phone number to TTMD's actual Singapore WhatsApp number during implementation.

**Confidence:** HIGH — wa.me URL scheme is documented by WhatsApp Business.

---

### Supporting Libraries (CDN-Loadable)

| Library | Version | CDN URL | Purpose | Load Condition |
|---------|---------|---------|---------|----------------|
| GSAP Core | 3.13.0 | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js` | Animation engine | All pages |
| GSAP ScrollTrigger | 3.13.0 | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js` | Scroll-triggered animations | All pages |
| GSAP SplitText | 3.13.0 | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js` | Character/word text reveals | Homepage, Bespoke page |
| Google Fonts | latest | See typography section above | Cormorant Garamond + Jost | All pages |

**Deliberately excluded:**
- jQuery — not needed, modern DOM APIs are sufficient
- Bootstrap / Tailwind — require build step or add CSS bloat
- AOS (Animate On Scroll) — GSAP covers its use case with more precision
- Alpine.js — no reactive state needed for this site

---

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

---

## Performance Budget

Without a CDN, performance depends on:
1. Image file size (largest contributor — see image strategy above)
2. Font loading (mitigated with `display=swap` and preconnect)
3. GSAP (3 files, total ~120KB minified — acceptable)

Target: Lighthouse Performance score 85+ on mobile. The key is images — keep them under budget.

---

## Confidence Summary

| Area | Confidence | Basis |
|------|------------|-------|
| Typography pairing | HIGH | Google Fonts specimen verification + multiple luxury branding sources |
| CSS token architecture | HIGH | Standard practice, zero dependencies, verified via CSS spec |
| GSAP CDN URLs | HIGH | Verified via cdnjs.com (v3.13.0 confirmed) |
| Native scroll animations | MEDIUM | Safari 26 support confirmed in web sources; could not verify exact Safari release date from Apple directly |
| Image strategy | HIGH | `<picture>` element is W3C standard; Squoosh.app is Google-maintained |
| WhatsApp integration | HIGH | wa.me URL scheme is WhatsApp's documented standard |

---

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
