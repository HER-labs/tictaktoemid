# Domain Pitfalls

**Domain:** Luxury bespoke fashion atelier — dark-to-light redesign
**Project:** TTMD (Time Taken to Make a Dress), Singapore
**Researched:** 2026-04-16

---

## Critical Pitfalls

Mistakes that cause rewrites, brand damage, or undermine the $15k–$50k positioning.

---

### Pitfall 1: Naive Color Variable Inversion

**What goes wrong:** Finding all dark-background color values and swapping them without auditing semantic intent. A `#1a1a1a` background becomes `#f5f5f5` fine — but a `color: #f0e8d0` warm text color inverted for a light theme can produce muddy, low-contrast body copy. Box shadows that worked as subtle elevation cues on dark surfaces become harsh, cheap-looking borders on ivory.

**Why it happens:** Developers do a search-and-replace on CSS custom properties without asking "what does this color *do*, not just what does it *look like*." Dark themes use light colors for text and dark for backgrounds; reversing both naively still breaks shadows, borders, and overlay states because those are additive, not symmetric.

**Consequences:**
- Body copy that fails WCAG 4.5:1 contrast at 400 weight (hairline serif at 16px on #FAF8F5 fails at anything lighter than ~#555)
- Hover states that were "lighten on dark" become invisible "lighten on light"
- Box shadows that were soft glows become hard outlines that signal low-budget WordPress templates
- Drop shadows on gold divider elements that were elegant on black become gaudy halos on ivory

**Warning signs:**
- Any CSS with `filter: invert()` or `mix-blend-mode: screen/multiply` used for decorative effects — these will break
- Gold text (`color: #C9A84C` or similar) anywhere it was used as a headline on dark — same hex on ivory fails contrast
- `box-shadow: 0 0 20px rgba(201,168,76,0.3)` (glow effect) — glows look correct on dark, cheap on light

**Prevention:**
1. Audit every CSS custom property semantically before migrating: name properties by intent (`--color-surface`, `--color-text-primary`) not by appearance (`--color-off-white`)
2. Run WebAIM contrast checker on every text/background pair in the new palette before building any component
3. Rebuild shadows from scratch for light theme: use `box-shadow: 0 2px 8px rgba(0,0,0,0.08)` (downward, diffuse, very low opacity) rather than inverting dark-theme glows
4. Treat hover states as "darken on light" (deepen the surface 5-8%) rather than "lighten on dark"

**Phase:** Address in Phase 1 (color system setup) — establish CSS custom properties with semantic naming before any component work begins.

---

### Pitfall 2: Gold on Ivory — The Contrast Trap

**What goes wrong:** The existing gold accent (#C9A84C or similar) that reads as rich and warm against near-black will fail WCAG contrast ratios against ivory backgrounds AND will visually "wash out" — losing the luxurious temperature contrast that made it effective.

**Why it happens:** Gold hex values typically have lightness values of 50-65% in HSL. Against a dark background (lightness ~8%), contrast ratio can exceed 8:1. Against ivory (lightness ~97%), contrast drops to approximately 1.4:1 — below even the decorative 3:1 threshold for large text.

**Consequences:**
- Gold used for price figures, section labels, or fine-print accents becomes unreadable
- Gold divider lines (1px) become invisible
- The luxury signifier that justified the dark theme carries no weight on the new palette

**Warning signs:**
- Any gold used as text color (not just decorative border/line) in the existing CSS
- Fine gold horizontal rules between sections
- Gold used in `::before`/`::after` pseudo-elements for decorative flourishes

**Prevention:**
1. On ivory backgrounds, use gold exclusively for decoration (borders, flourishes, icons) at sufficient size/weight — never for body text
2. For any text that must read as "gold," shift to deep antique brass (#7D5C1A or similar, ~35% HSL lightness) that maintains warm-metal feel while achieving 4.5:1+ contrast
3. Use gold as line-art (thin SVG flourishes, border accents, section dividers with sufficient height) where contrast matters less than visual resonance
4. The reference benchmarks (Chanel, The Row) use black typography exclusively — gold is accent, not communication

**Phase:** Address in Phase 1 (design tokens). Create a separate `--color-accent-gold-decorative` and `--color-accent-gold-text` token — the text variant must be the darker, accessible variant.

---

### Pitfall 3: Placeholder Images That Signal "Unfinished"

**What goes wrong:** Grey boxes, colored div placeholders, or generic stock photography look professionally unfinished on a $20k-commission site. The visitor's first subconscious read is "this brand can't afford real photography" — contradicting every typographic and copy claim about craft and exclusivity.

**Why it happens:** Developers reach for `background: #ccc` or services like `https://via.placeholder.com/800x600` because it's fast. On a dark site, grey boxes are less visible. On ivory, a grey box surrounded by warm cream reads as a broken layout.

**Consequences:**
- Destroys the emotional arc that the site is trying to build toward the WhatsApp CTA
- Visitors calibrate "premium" against the weakest visual element — one grey placeholder box resets the entire page's perceived value
- Potential clients in Singapore's luxury market (who have seen Chanel, Elie Saab web presences) will interpret placeholders as a startup with no portfolio

**Warning signs:**
- Any `background-color` placeholder that isn't part of an intentional editorial palette
- `<img>` tags with `src=""` or broken image icons
- Aspect ratio containers with no visual content

**Prevention:**
1. Use editorial color-field placeholders that feel intentional: warm ivory (#EDE9E3), pale blush (#E8DED4), deep charcoal (#2C2825) — these read as "art direction" not "missing image"
2. Set placeholder `aspect-ratio` to match the exact ratio of the final photograph (editorial portrait: 3:4, detail macro: 1:1, process wide: 16:9) so layout doesn't shift when real images arrive
3. Add a subtle CSS texture to placeholder containers: `background-image: repeating-linear-gradient(...)` at very low opacity creates a fabric-like surface
4. Place a centered fine-line SVG motif (a needle, a single stitch, a tailor's mark) inside each placeholder — transforms "missing" into "curated waiting state"
5. Add `data-image-slot="hero-portrait"` attributes to every placeholder for easy handoff to photographer and swap-in

**Phase:** Address in Phase 2 (component build). Establish placeholder system before building any image-containing component.

---

### Pitfall 4: Thin Serif Legibility on Warm Backgrounds

**What goes wrong:** Luxury typography benchmarks (Chanel, Galia Lahav) use thin-weight serifs at large display sizes. Transposed to body copy at 16px on ivory, the same typeface becomes illegible — hairline strokes disappear against warm off-white backgrounds, particularly on non-retina screens or budget Android devices common in Singapore's secondary market.

**Why it happens:** 80% of luxury fashion brands use thin serif typefaces in logos and headings, which achieves heritage signaling. But these same weights fail at reading sizes. The design is benchmarked against Retina MacBook screenshots, not the actual device mix of the audience.

**Consequences:**
- Visitors can't read the process description or pricing context
- Accessibility failures (WCAG 1.4.3) limit SEO indexability and expose the client to accessibility complaints
- On mobile (the primary device for WhatsApp-native Singapore audiences), thin serifs at 15px are physically painful to read

**Warning signs:**
- Using font-weight: 200 or 300 for anything under 28px
- Line heights under 1.6 for body text
- Letter-spacing positive values on body text (CAPITALS are correct, body text is not)

**Prevention:**
1. Establish a two-tier type system: Display (weight 300-400, sizes 40px+, tracking allowed) and Body (weight 400-500 minimum, sizes 15-18px, tight tracking)
2. For body text, use a different typeface than the display serif if necessary — Cormorant Garamond at 400 weight is legible; at 200 weight it is not
3. Test every text element at 1x pixel density (non-retina) and on a physical Android device before sign-off
4. Maintain minimum 4.5:1 contrast ratio for all body text; recommended target is 7:1 on a luxury site where "effortless reading" is a quality signal

**Phase:** Address in Phase 1 (typography tokens). Lock font weights and minimum sizes before any component work.

---

### Pitfall 5: WhatsApp as CTA Reads Cheap Without Proper Framing

**What goes wrong:** A floating green WhatsApp bubble widget in the bottom-right corner — the standard implementation — signals "small business" not "atelier." It places TTMD in the same visual category as a bubble tea shop or a freelance wedding photographer.

**Why it happens:** Most WhatsApp integration tutorials lead to generic floating chat widgets. The green WhatsApp branding is strongly associated with budget commerce in Singapore and the broader SEA market, where the platform is ubiquitous at all price points.

**Consequences:**
- The visitor arrives at the CTA psychologically prepared to pay $300, not $20,000
- Undermines the entire emotional journey built by typography, photography, and copy
- The WhatsApp widget as generic implementation is the wrong vessel for a luxury conversation

**Warning signs:**
- Any plan to use an off-the-shelf WhatsApp widget plugin or floating button
- Using WhatsApp's brand green (#25D366) anywhere in the visual language
- CTA button copy like "Chat with us on WhatsApp" or "Message us now"

**Prevention:**
1. Never use a floating WhatsApp bubble — it is a UX pattern designed for volume service, not bespoke luxury
2. Embed WhatsApp initiation as a link within a fully branded CTA block: a full-width ivory section with a black serif heading ("Begin Your Commission"), one to two lines of framing copy ("We receive a limited number of new commissions each year. Contact us directly to discuss your gown."), and a minimal black button ("Start a Private Conversation") that `href`s to `https://wa.me/[number]?text=...`
3. Pre-fill the WhatsApp message with a qualifying prompt: "Hello, I'd like to enquire about a bespoke commission with TTMD." — this signals to the atelier that the lead is qualified and signals to the visitor that this is a considered act, not impulse messaging
4. Use a brand-consistent icon (not WhatsApp's logo) or simply text-only button for the primary CTA — the WhatsApp attribution can appear as fine print ("We respond via WhatsApp")
5. Dior's case study confirms luxury brands can use WhatsApp effectively when the entry point is positioned as private/exclusive access, not a help chat widget

**Phase:** Address in Phase 3 (CTA and conversion). The framing copy around WhatsApp matters as much as the button design.

---

### Pitfall 6: Rental Page That Trains Visitors to Think "Affordable"

**What goes wrong:** A rental page (Truly Enamoured) placed in the same navigation and at the same visual weight as the bespoke offering creates cognitive anchoring. Visitors see "from $X/rental" before they see "$15k–$50k commission" and use the rental figure as a price anchor — making bespoke feel expensive rather than inevitable.

**Why it happens:** The strategy assumes rental visitors convert to bespoke commissioners. Research confirms this market expansion effect is real — but only when the tiers are clearly separated. When design language overlaps and prices coexist in the same visual hierarchy, the cheaper tier dilutes perception of the premium one.

**Consequences:**
- Research (Springer Journal of Brand Management) confirms rental offerings decrease brand credibility and brand leadership dimensions of luxury equity when not properly separated
- A visitor anchored at $300/rental price will not be emotionally primed for a $20k commission
- The rental page risks cannibalizing the bespoke pipeline rather than feeding it

**Warning signs:**
- Navigation that lists "Rental" and "Bespoke" as peer items at the same level
- Rental page sharing identical visual language and section structure as bespoke pages
- Rental pricing displayed without strong contextual framing around what bespoke represents

**Prevention:**
1. Position the rental navigation item as clearly secondary — footer link or a subdomain redirect, not primary nav parity
2. The rental page should aspire upward: lead with Truly Enamoured gown photography that is as beautiful as the bespoke work, then anchor with "Experience a TTMD gown. Commission your own." — every rental page touchpoint points toward bespoke
3. Never show rental prices on the same page or immediately adjacent to bespoke positioning
4. Frame rental as the entry tier explicitly: "Truly Enamoured is how many of our commissioned clients first discovered their TTMD gown" — this makes rental aspirational, not value-reducing
5. Use a visual language distinction: rental pages can be slightly more accessible (more color, more casual copy) while bespoke pages are the strictest expression of quiet luxury

**Phase:** Address in Phase 4 (rental page). The bespoke pages must be fully built and their positioning locked before the rental page is designed, so the rental page can be calibrated against them.

---

## Moderate Pitfalls

---

### Pitfall 7: Scroll Animations That Break on Mobile Safari

**What goes wrong:** The existing site uses scroll-reveal animations. Migrated to mobile Safari on iOS, Intersection Observer-based animations trigger incorrectly due to iOS Safari's dynamic viewport height (100vh is calculated at maximum height, ignoring the browser chrome), causing elements to animate too early or persist in a hidden/transformed state.

**Prevention:**
1. Use CSS `animation-timeline: scroll()` only where Safari support is confirmed, or provide a `@supports not (animation-timeline: scroll())` fallback that shows elements immediately without animation
2. Avoid `vh`-based animation triggers — use `IntersectionObserver` with `rootMargin` instead
3. Test on an actual iOS device (not Chrome DevTools emulation) before considering scroll animations complete
4. Apply `prefers-reduced-motion` media query to all animations — luxury audiences include high-net-worth individuals who may have accessibility needs, and honoring this preference is a signal of quality

**Phase:** Address during Phase 2 (component build) as each animated component is built.

---

### Pitfall 8: Pure #FFFFFF White vs. Warm Ivory

**What goes wrong:** Section backgrounds and component backgrounds drift to pure white (#FFFFFF) during development when CSS resets or component-level styles override the page background. The result is a patchwork of warm ivory and cold white that reads as inconsistent and unpolished rather than intentional variation.

**Prevention:**
1. Define the warm ivory as a CSS custom property at the `:root` level: `--color-surface-primary: #FAF8F4` (or similar warm variant — not `#FFFFF0` which is too yellow, not `#FFFFFF` which is too cold)
2. Set `background-color: var(--color-surface-primary)` on the `body` element and override only intentionally
3. Use a lint rule or visual audit checklist to catch any `background: white` or `background: #fff` or `background-color: white` in component stylesheets
4. Define contrast section backgrounds as `#F0EDE8` (slightly warmer/deeper) rather than pure white — maintains warmth while providing section differentiation

**Phase:** Address in Phase 1 as the first CSS token defined.

---

### Pitfall 9: "Empty Luxury" — White Space Without Editorial Weight

**What goes wrong:** Achieving quiet luxury through white space alone, without typographic and copy confidence to fill it with authority. The result is a site that feels sparse and unfinished rather than considered and restrained. Design research describes this as "flatness" — using a simplified palette as a substitute for thinking.

**Prevention:**
1. Every large white-space section must earn its silence with the element immediately before and after it — an oversized serif numeral, a single precise phrase in tracking capitals, or a photography detail
2. Use generous leading (1.8–2.0 for display text, 1.6 for body) as a white-space contributor — the space is within the typography, not just around it
3. The "craftsmanship clock" counter is a strong anchor against emptiness on the homepage — ensure it's visually weighty (large numerals, minimal label) so the empty space around it has something to frame

**Phase:** Review at Phase 2 (component build) and Phase 5 (full page assembly).

---

## Minor Pitfalls

---

### Pitfall 10: Image Swap Breaking Layouts

**What goes wrong:** When the professional photography arrives, placeholder aspect ratios don't match the delivered photography, causing layout reflows across the site.

**Prevention:**
1. Communicate required aspect ratios to the photographer before the shoot — provide a spec sheet
2. Use `object-fit: cover` on all image containers so ratio enforcement happens at the container level
3. Never size image containers to `auto` height — always lock aspect ratio via CSS `aspect-ratio` property

**Phase:** Address in Phase 2, document in handoff notes for photography brief.

---

### Pitfall 11: Open Graph Images That Look Low-Effort

**What goes wrong:** When the site is shared on WhatsApp (the primary CTA destination) or messaging apps, the Open Graph preview image uses the first image on the page — which may be a grey placeholder box. The WhatsApp share card then shows a grey rectangle with the site title.

**Prevention:**
1. Create a dedicated OG image for each page: a styled text-only card (ivory background, TTMD wordmark, page title in serif) at 1200x630px — does not require photography
2. Hardcode the OG image `<meta>` tag to this static asset on every page from the beginning, before photography exists
3. Test OG rendering via WhatsApp link preview on a real device before launch

**Phase:** Address in Phase 3 (SEO meta implementation). High priority because the primary referral channel IS WhatsApp.

---

### Pitfall 12: Static Site Deployment Drift

**What goes wrong:** Files deployed to Plesk via FTP get out of sync — an old CSS file is cached, a new HTML file references a renamed asset. No build process means no manifest, no cache-busting, no integrity checking.

**Prevention:**
1. Use query-string versioning on all linked assets: `style.css?v=20260417` — increment on every deploy
2. Maintain a single `deploy.md` file that lists every file to upload in order (CSS before HTML, assets before pages)
3. Test on `timetakentomakedress.com` in a private browser window (no cache) after every deploy

**Phase:** Address in Phase 5 (deployment). Create the versioning convention in Phase 1 and follow it from the start.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Color system setup (Phase 1) | Naive CSS variable inversion from dark theme | Audit semantically, rename all properties by intent, build from scratch |
| Typography tokens (Phase 1) | Thin serif at body sizes fails on non-retina | Lock weight minimums before any component work |
| Component build (Phase 2) | Gold text on ivory fails contrast | Use gold decoratively only; establish accessible brass for text |
| Placeholder system (Phase 2) | Grey boxes destroy luxury perception | Build editorial color-field placeholders with SVG motifs |
| Mobile scroll animations (Phase 2) | iOS Safari viewport/animation bugs | Test on device, use Intersection Observer, honor reduced-motion |
| WhatsApp CTA (Phase 3) | Floating widget signals cheap commerce | Bespoke CTA block, no floating bubble, pre-filled message |
| OG images (Phase 3) | WhatsApp share preview shows placeholder | Build text-only OG image immediately, hardcode meta tags |
| Rental page (Phase 4) | Rental pricing anchors visitors below bespoke | Build bespoke pages first, design rental to point upward |
| Full page assembly (Phase 5) | Empty luxury — space without weight | Each silence must be earned by adjacent element |
| Deployment (Phase 5) | Asset cache drift on Plesk FTP | Query-string versioning from Phase 1, deploy checklist |

---

## Sources

- WebAIM Contrast Guidelines: https://webaim.org/articles/contrast/
- CSS Shadows in Dark Mode (Tailwind discussion): https://github.com/tailwindlabs/tailwindcss/discussions/3177
- Lea Verou — Inverted Lightness Variables: https://lea.verou.me/blog/2021/03/inverted-lightness-variables/
- Chrome DevTools Scroll Animation Case Study: https://developer.chrome.com/blog/scroll-animation-performance-case-study
- Monotype — Fonts and Luxury Brands (Fashion): https://www.monotype.com/resources/expertise/fonts-and-luxury-brands-fashion
- Kate Male — 8 Luxury Brand Design Mistakes: https://www.katemale.com/blog/8-luxury-brand-design-mistakes/
- Springer — Luxury Brand Dilution and Rental: https://link.springer.com/article/10.1057/s41262-018-00144-4
- McKinsey — Rental, Ownership and Fashion Business Models: https://www.mckinsey.com/industries/retail/our-insights/the-end-of-ownership-for-fashion-products
- Hello Charles — Fashionette WhatsApp Marketing Case Study: https://www.hello-charles.com/success/fashionette
- 2jour-stylist — CTA in Luxury eCommerce: https://www.2jour-stylist.com/post/call-to-action-in-luxury-e-commerce
- CSS aspect-ratio (web.dev): https://web.dev/articles/aspect-ratio
