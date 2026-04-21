# Requirements: TTMD — Time Taken to Make a Dress

**Defined:** 2026-04-17
**Core Value:** The site must make a visitor *feel* the time, patience, and craft invested in every gown — so that by the time they reach WhatsApp, the $20k price point feels inevitable.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Design System

- [x] **DS-01**: CSS custom property token system with warm ivory palette (primitives, semantics, component tokens)
- [x] **DS-02**: Typography pairing established — editorial serif for headings, geometric sans for body
- [x] **DS-03**: Dark brass accent color for text elements that passes WCAG AA on ivory backgrounds
- [x] **DS-04**: Responsive fluid typography using clamp() — no breakpoint overrides for type sizing
- [x] **DS-05**: Interaction states (hover, focus, active) designed for "darken on light" paradigm

### Shared Chrome

- [ ] **SC-01**: Fixed navigation bar with brand wordmark and page links, styled for ivory background
- [ ] **SC-02**: Mobile hamburger navigation with full-screen overlay
- [ ] **SC-03**: Site footer with address, navigation links, and social links
- [ ] **SC-04**: Shared nav/footer implemented as reusable components across all pages

### Homepage

- [ ] **HP-01**: Full-viewport hero section with brand wordmark, tagline, and WhatsApp CTA
- [ ] **HP-02**: Live craftsmanship clock counter with animated count-up on first view
- [ ] **HP-03**: Philosophy quote section
- [ ] **HP-04**: Five-step process section (Sketch → Toile → Fitting → Craft → Reveal)
- [ ] **HP-05**: Featured commission section with editorial image placeholder and stats
- [ ] **HP-06**: CTA banner section linking to WhatsApp

### Bespoke Page

- [ ] **BP-01**: Page hero with "The bespoke experience" framing
- [ ] **BP-02**: Five alternating image/text chapters (Consultation, Sketch, Toile, Craft, Reveal) with detail stats
- [ ] **BP-03**: Fabric archive section with 4+ material cards (name, origin, description)
- [ ] **BP-04**: "Our promise" section (Singular, Unhurried, Hand-finished)
- [ ] **BP-05**: CTA section linking to WhatsApp

### Archive Gallery

- [ ] **AG-01**: Page hero with archive framing and intro copy
- [ ] **AG-02**: Stats bar (commissions completed, hours of craft, countries, designs repeated)
- [ ] **AG-03**: Sticky filter bar (All, Bridal, Evening, Ceremonial, Editorial) with smooth transitions
- [ ] **AG-04**: Masonry-style gallery grid with editorial image placeholders
- [ ] **AG-05**: Hover overlay on gallery items showing gown name, occasion, hours, year
- [ ] **AG-06**: "View more" load-more button
- [ ] **AG-07**: CTA section linking to WhatsApp

### Rental Page

- [ ] **RP-01**: Page hero positioning Truly Enamoured as the rental arm of TTMD
- [ ] **RP-02**: Rental gown gallery with editorial image placeholders and occasion tags
- [ ] **RP-03**: Rental process section explaining how rental works (browse → book → wear → return)
- [ ] **RP-04**: Pricing indication or tier system for rental gowns
- [ ] **RP-05**: Bespoke upgrade section — editorial CTA block encouraging renters to commission their own gown
- [ ] **RP-06**: WhatsApp CTA for rental enquiries

### Image System

- [x] **IMG-01**: Smart placeholder system using CSS aspect-ratio containers with warm ivory surface tones
- [x] **IMG-02**: Placeholder containers display centered fine-line SVG motif (not grey blocks)
- [ ] **IMG-03**: Image directory structure organized by role (hero, gowns, process, fabric, rental)
- [ ] **IMG-04**: Easy photo swap workflow — drop images into directory, update src attributes

### WhatsApp CTA

- [ ] **WA-01**: Branded WhatsApp CTA blocks (not green bubble widget) that maintain luxury feel
- [ ] **WA-02**: Pre-filled WhatsApp message that signals a qualified enquiry
- [ ] **WA-03**: WhatsApp CTA appears on every page as the primary conversion path

### Animations

- [ ] **AN-01**: Scroll-reveal animations on section entry (fade-up, 800ms ease-out)
- [ ] **AN-02**: Craftsmanship clock count-up animation on first view
- [ ] **AN-03**: Smooth filter transitions on archive gallery
- [ ] **AN-04**: Navigation scroll state change (transparent → solid on scroll)

### Production

- [ ] **PR-01**: SEO meta tags (title, description, canonical) on all pages
- [ ] **PR-02**: Open Graph tags with branded OG image for social/WhatsApp sharing
- [ ] **PR-03**: Responsive design tested on mobile, tablet, and desktop
- [ ] **PR-04**: Deployed to Plesk at timetakentomakedress.com
- [ ] **PR-05**: Favicon and touch icons

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### AI Consultation

- **AI-01**: Claude API-powered pre-consultation where clients upload mood boards and occasion details
- **AI-02**: AI generates first-pass design brief and aesthetic vocabulary
- **AI-03**: Gown inspiration configurator with silhouette/neckline/embellishment selection

### Client Portal

- **CP-01**: Supabase-backed private client portal, password-per-commission
- **CP-02**: Real-time progress photography uploaded by the atelier
- **CP-03**: Private messaging thread with the designer

### Commission Form

- **CF-01**: Full consultation questionnaire with silhouette, formality, budget, vision fields
- **CF-02**: Form submission to backend API with 48-hour response SLA

### Video

- **VD-01**: Cinematic full-screen hero video of atelier at work
- **VD-02**: Scroll-triggered video chapters in the bespoke process

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce / shopping cart | Luxury positioning — absence of cart IS the signal |
| Price display | Bespoke pricing is per-commission, displaying prices cheapens the brand |
| Blog / news section | Content marketing deferred — focus on conversion pages |
| Client testimonials / reviews | Rating systems read as mass-market; social proof comes from the archive |
| Pop-ups or modals | Anti-pattern for luxury — intrusive, cheapens experience |
| Cookie consent banner | Static site with no tracking — not required |
| WordPress | Broken, being replaced entirely with static HTML/CSS/JS |
| Next.js / Vercel | Staying on Plesk with static files — no server-side rendering needed |
| Build tools (npm, webpack) | Zero dependency — hand-coded, CDN-loaded resources only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DS-01 | Phase 1 | Complete |
| DS-02 | Phase 1 | Complete |
| DS-03 | Phase 1 | Complete |
| DS-04 | Phase 1 | Complete |
| DS-05 | Phase 1 | Complete |
| IMG-01 | Phase 1 | Complete |
| IMG-02 | Phase 1 | Complete |
| SC-01 | Phase 2 | Pending |
| SC-02 | Phase 2 | Pending |
| SC-03 | Phase 2 | Pending |
| SC-04 | Phase 2 | Pending |
| IMG-03 | Phase 2 | Pending |
| IMG-04 | Phase 2 | Pending |
| WA-01 | Phase 2 | Pending |
| WA-02 | Phase 2 | Pending |
| AN-04 | Phase 2 | Pending |
| HP-01 | Phase 3 | Pending |
| HP-02 | Phase 3 | Pending |
| HP-03 | Phase 3 | Pending |
| HP-04 | Phase 3 | Pending |
| HP-05 | Phase 3 | Pending |
| HP-06 | Phase 3 | Pending |
| BP-01 | Phase 3 | Pending |
| BP-02 | Phase 3 | Pending |
| BP-03 | Phase 3 | Pending |
| BP-04 | Phase 3 | Pending |
| BP-05 | Phase 3 | Pending |
| WA-03 | Phase 3 | Pending |
| AN-01 | Phase 3 | Pending |
| AN-02 | Phase 3 | Pending |
| AG-01 | Phase 4 | Pending |
| AG-02 | Phase 4 | Pending |
| AG-03 | Phase 4 | Pending |
| AG-04 | Phase 4 | Pending |
| AG-05 | Phase 4 | Pending |
| AG-06 | Phase 4 | Pending |
| AG-07 | Phase 4 | Pending |
| AN-03 | Phase 4 | Pending |
| RP-01 | Phase 5 | Pending |
| RP-02 | Phase 5 | Pending |
| RP-03 | Phase 5 | Pending |
| RP-04 | Phase 5 | Pending |
| RP-05 | Phase 5 | Pending |
| RP-06 | Phase 5 | Pending |
| PR-01 | Phase 6 | Pending |
| PR-02 | Phase 6 | Pending |
| PR-03 | Phase 6 | Pending |
| PR-04 | Phase 6 | Pending |
| PR-05 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 49 total
- Mapped to phases: 49
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-17*
*Last updated: 2026-04-17 after roadmap creation*
