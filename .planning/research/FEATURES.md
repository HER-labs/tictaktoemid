# Feature Landscape

**Domain:** Luxury bespoke fashion atelier — single-brand, no ecommerce, appointment-driven
**Project:** TTMD (Time Taken to Make a Dress), Singapore
**Researched:** 2026-04-16
**Constraint:** Static HTML/CSS/JS on Plesk — no server-side, no npm/build tools

---

## Table Stakes

Features visitors expect from a $20k+ atelier. Missing these = site reads as amateur or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Full-bleed hero with one declarative statement | Sets immediate positioning. Every reference site (Galia Lahav, Elie Saab, Vera Wang) opens with a single commanding image and minimal text. | Low | Photo + h1 + subline. Must work with placeholder until shoot. |
| Serif + sans-serif typography pairing | Industry standard luxury signal. Cormorant Garamond, Playfair Display, or EB Garamond for headings; Inter or similar for body. Mixed case (not all caps for body) reads as editorial. | Low | Already using Playfair + Inter. Keep it. |
| Warm neutral / ivory color system | White or cream backgrounds are bridal/couture convention. Dark gold-on-black reads as nightclub, not atelier. Quiet luxury = taupe, ivory, off-white as foundation. | Low | The whole redesign goal. --bg: #FAF8F4 type territory. |
| Generous whitespace — nothing cramped | Whitespace IS the luxury signal. Hermès, Chanel, The Row: each element has room to breathe. Under-spaced = budget brand. | Low | Applies to every section, every gap, every margin. |
| Single primary CTA per page | Luxury sites do not scatter "Buy Now" everywhere. One clear next action per context. For TTMD: WhatsApp initiation. | Low | Every commission button must resolve to wa.me link. |
| Mobile-first responsive layout | 60%+ of luxury site traffic is mobile. Brides and event planners browse on phones. Galia Lahav explicitly converts booking to full-screen mobile overlay. | Medium | All layout must be verified on 375px width minimum. |
| By-appointment positioning statement | All credible haute couture sites signal exclusivity through "By appointment only." This is a trust marker, not a barrier. | Low | Currently in hero-sub. Keep and emphasize. |
| Photography-first layout | Design frames photos — photos carry the narrative. Gowns photographed well create more desire than any copy. Before real photography: smart aspect-ratio placeholders (3:4 portrait) swap-ready. | Low-Med | Use CSS aspect-ratio containers so photo substitution requires only src change. |
| Process / making story | Craftsmanship storytelling replaces trust badges at this price point. Buyers need to understand what $20k buys. Standard in haute couture sites. | Med | The 5-chapter making journey on bespoke.html handles this. |
| Page-level SEO and Open Graph | Required for organic discovery ("bespoke gown Singapore", "couture atelier Singapore"). OG image needed for WhatsApp link previews — when a client shares the link, it must look premium. | Low | Meta tags + og:image per page. One branded OG image covers all. |
| Clear navigation to all 4 pages | Visitors must find Bespoke, Archive, Rental in two taps. Luxury sites use minimal nav (5 items max) that is always visible. | Low | Hamburger on mobile is fine if it opens fast. |
| Contact/WhatsApp reachability | WhatsApp CTA in header or nav, definitely in footer, on every conversion moment. Luxury brands (Lyon Luxe, Ricca Sposa, Cartier) use WhatsApp as primary channel. 95%+ open rates. | Low | wa.me/[number] links. No contact form needed in v1. |

---

## Differentiators

Features that set TTMD apart from other Singapore bridal/couture sites. Not expected, but create measurable brand distinction.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Craftsmanship clock counter | Live counter showing total hours of craft invested across all TTMD commissions. Tactile expression of the brand name. No other local atelier has this. | Low | Already exists. Preserve and refine for ivory theme. |
| Named commission archive (not generic "gallery") | Presenting work as a curated archive with names/seasons signals fashion house positioning, not just portfolio. Reference: Elie Saab "Collections" vs generic gallery. | Low | Rename archive.html sections with season/year labels. |
| Rental-to-bespoke upgrade path (Truly Enamoured) | Rental visitors are warm leads — they've already decided on occasion dress at premium level. Explicit upgrade CTA ("Your event, your gown — made for you") converts renters to commissioners. No competitor site does this explicitly. | Med | Rental page needs a dedicated bespoke upgrade section, not just a footer link. |
| "Time" as the editorial concept throughout | The brand name is the value proposition. Every page should reinforce time as the differentiator: hours per gown, weeks of fittings, months from first meeting to delivery. Competitors don't frame luxury through time. | Low | Copy and micro-copy strategy, not a technical feature. |
| Fabric archive / material storytelling | Showing sourced fabrics (provenance, mill, weight) before they become gowns elevates perceived craft. Rare in Singapore atelier sites — most just show finished work. | Med | Already in bespoke.html. Develop with placeholder swatches. |
| 5-chapter making journey narrative | Editorial long-form section walking through the commission process. Creates pre-qualification — only committed clients read all of it. Filters out price-shoppers before WhatsApp. | Med | Already exists. Refine for ivory theme and typography. |
| Scroll-reveal animations (restrained) | Luxury motion = slow, purposeful. Gentle fade-up reveals as sections enter viewport. Not kinetic — more like turning pages. Differentiates from static templates. | Low | Already in main.js. Audit: ensure timing is 600-800ms, easing is ease-out, no bouncing. |
| Editorial-format rental page | Truly Enamoured's page is essentially a shop catalog. An editorial approach (story of the rental, "borrow a piece of TTMD history") is distinct and reinforces atelier identity, not rental-shop identity. | Med | Rental page structure: hero, gown stories, occasions, bespoke upgrade CTA. |
| Warm tone photography art direction guidance | Before the shoot: annotated placeholder sections showing art direction intent (light direction, body positioning, background tone). Ensures photographer brief aligns with site needs. | Low | In-code comments / placeholder labels serve this purpose. |
| Craftsmanship detail micro-photography slots | Dedicated spaces for close-up shots of beading, draping, hand-finishing. These images do price-point justification work that no copy can match. | Low | CSS containers sized for square or 4:5 aspect ratio detail shots. |

---

## Anti-Features

Things to explicitly NOT build. Each has a reason — building these would actively harm the brand or waste build time.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Shopping cart / "Add to wishlist" | Sends the message that a $30k gown is a catalog item. Destroys exclusivity positioning. No haute couture house has a cart. | Nothing. Remove if vestigially present. The absence of a cart IS the luxury signal. |
| Commission/contact form with many fields | Forms feel bureaucratic at this tier. Requiring name/email/phone/occasion/budget/date before human contact filters out real clients (who may not know their budget). WhatsApp is the right tool here. | wa.me link with a pre-filled message: "Hi, I'd like to discuss a commission." |
| Price list or price range on site | Displaying $15k–$50k invites comparison shopping and sticker shock without context. Reference: Hermès, Chanel — "Price Upon Request" or no price at all. | Let price emerge in WhatsApp conversation after desire is built. |
| Pop-ups (exit intent, newsletter, cookies) | Pop-ups signal e-commerce. Luxury sites do not interrupt. Especially jarring on mobile where they cover the full screen. | Email list (if needed later) captured via a single quiet "join our circle" line in footer. |
| Social proof widgets (testimonials with photos, star ratings) | Review stars and testimonial carousels are retail patterns. Luxury brands do not use them — trust is communicated through scarcity and craft presentation, not crowd opinion. | One or two pull-quotes in editorial style (no stars, no photos of clients, no names unless with explicit permission). |
| Live chat bubble (Intercom, Crisp, etc.) | Third-party chat widgets are visual noise that clash with a curated aesthetic and add script weight. | WhatsApp CTA button is cleaner and more personal. |
| Countdown timers / "Only 2 slots left" urgency | Scarcity manipulation is mass-market. Genuine scarcity (by appointment, limited annual commissions) should be stated once as brand positioning, not as a sales tactic. | State slot count once in the bespoke page: "TTMD takes [N] commissions per year." |
| Blog / editorial content management system | A CMS adds backend complexity not possible on Plesk static hosting. Editorial content belongs on the site itself, in the archive and bespoke pages. | Hand-code any editorial additions as HTML. v2 could use a flat-file CMS if needed. |
| Instagram feed embed | Auto-populated IG feeds become stale, slow to load, and depend on API tokens that expire. They also look templated. | Link to Instagram profile in footer. Curate specific images manually if needed. |
| Video hero (autoplay background video) | Requires professional video shoot (not yet done) and adds significant file weight on a shared Plesk host. | Photo hero now. Video is explicitly out of scope until shoot is done. |
| Infinite scroll in archive gallery | Pagination or "load more" gives the archive a sense of editorial volume without requiring all images to load. Infinite scroll performs poorly with full-resolution fashion images. | Use CSS grid with a "View all" toggle or simple show/hide for extended archive. |
| Third-party booking system embeds (Calendly, etc.) | Calendly and similar embed widgets are visually off-brand, introduce third-party dependencies, and compete with WhatsApp as the intended channel. | WhatsApp for all scheduling in v1. |

---

## Feature Dependencies

```
Photography placeholders → Real photography
  Photography placeholders MUST be smart (aspect-ratio containers, data-src attributes)
  so swapping real images requires only src changes, not layout restructuring.

Rental page → Bespoke upgrade CTA → WhatsApp
  Rental page value is only realized if it ends in a bespoke inquiry.
  The upgrade path must be explicit, not a footer afterthought.

Process/making journey → Price point justification → WhatsApp CTA
  The 5-chapter narrative earns the right to ask for inquiry.
  WhatsApp CTA must appear AFTER craft content, not before.

Archive filters → Archive content
  Filters (bridal, evening, ceremonial, editorial) only work if each item is tagged.
  HTML data attributes are the static-friendly approach: data-category="bridal"

Scroll-reveal animations → Intersection Observer API
  JS-based reveals require IntersectionObserver. Already implemented in main.js.
  Ensure graceful fallback (items visible) if JS fails.

OG image → Consistent branding
  One shared OG image (1200x630px, ivory bg, TTMD wordmark) covers all pages.
  Page-specific OG images are nice-to-have but not required for v1.
```

---

## MVP Recommendation

The v1 build (this milestone) should prioritize:

1. **Warm ivory color system** — the redesign foundation everything else depends on
2. **Photography-first layout with smart placeholders** — 3:4 portrait containers, swap-ready
3. **WhatsApp CTA as the single conversion path** — remove the commission form, replace with wa.me
4. **Rental page with bespoke upgrade section** — Truly Enamoured content + explicit upgrade CTA
5. **SEO + OG tags on all 4 pages** — one branded OG image, meta descriptions per page
6. **Restrained scroll-reveal animations** — audit existing ones, tune timing to 600–800ms

Defer to v2:
- **AI pre-consultation** — listed as out of scope, confirmed
- **Private client portal** — backend required, out of scope
- **Video hero** — needs shoot first
- **Gown inspiration configurator** — depends on AI feature

---

## Page-Level Feature Map

### Homepage (index.html)
- Hero: full-bleed, single image, 2-line statement, WhatsApp CTA
- Craftsmanship clock counter (retain, restyle for ivory)
- "The making" teaser: 3 process steps (link to Bespoke page)
- Latest commission: one featured gown, editorial caption
- CTA band: "Begin your commission" → WhatsApp
- Footer: navigation, WhatsApp link, address, Instagram link

### Bespoke (bespoke.html)
- Page hero: craft positioning statement
- 5-chapter making journey (long-form editorial scroll)
- Fabric archive / material section
- Craftsmanship detail photography slots
- Final CTA: WhatsApp inquiry

### Archive (archive.html)
- Filter bar: bridal / evening / ceremonial / editorial (data-attribute JS filter)
- Masonry or 2–3 column grid, 3:4 portrait images
- Each item: gown name/season, category label, lightbox on click
- Lightbox: full-screen image, minimal caption, close button
- No pagination needed for v1 if archive < 30 items

### Rental (rental.html — NEW)
- Hero: Truly Enamoured positioning, warm editorial tone
- Rental gown grid: curated selection (not full catalog)
- "How rental works" — 3 steps
- Occasion context: "For the gala / For the ceremony / For the photoshoot"
- Bespoke upgrade section: explicit "your own TTMD gown" narrative + WhatsApp CTA
- Footer with same site-wide elements

---

## Sources

- Galia Lahav website analysis (live fetch, April 2026): appointment-first conversion, 3:4 gallery aspect ratios, mobile sticky footer CTA
- Truly Enamoured website analysis (live fetch, April 2026): Cormorant Garamond typography, warm neutral palette (#E4BFB6), consultation-over-transaction model
- PremiumCoding — "The New Language of Luxury Website Design" (2025): editorial platform over sales channel, content-first architecture
- Trivision — "Quiet Luxury Branding Trends 2025": ivory/taupe palette standards, whitespace as luxury signal, clean editorial photography
- IIAD — "Why Some Websites Just Feel Expensive": serif typography, negative space research (20% comprehension improvement), motion choreography
- Hellomerx — "WhatsApp Clienteling for Luxury Retail": 95%+ open rates, appointment-booking via WhatsApp, Cartier case study
- Web Almanac 2024 performance data: LCP lazy-loading pitfall, image optimization patterns
