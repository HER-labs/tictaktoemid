# Roadmap: TTMD — Time Taken to Make a Dress

## Overview

Six phases take TTMD from a broken WordPress installation to a production-ready warm ivory luxury site on Plesk. The journey begins with the design token foundation that makes everything else consistent, builds up the shared shell all pages share, delivers the two core narrative pages (Homepage and Bespoke), then adds the Archive gallery and Rental page as standalone conversion pages, and finishes with production hardening and deployment. Every phase delivers something verifiably functional before the next begins.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Token Foundation** - Design system tokens, typography, and image placeholder system established
- [ ] **Phase 2: Shared Chrome** - Navigation, footer, WhatsApp CTA components, and image workflow ready for all pages
- [ ] **Phase 3: Homepage + Bespoke** - Core narrative pages live with full animations and conversion CTAs
- [ ] **Phase 4: Archive Gallery** - Filterable gallery page with masonry grid and hover overlays
- [ ] **Phase 5: Rental Page** - Truly Enamoured rental page with bespoke upgrade pipeline
- [ ] **Phase 6: Production** - SEO, Open Graph, responsive QA, and live deployment to Plesk

## Phase Details

### Phase 1: Token Foundation
**Goal**: The design system is established so that every page built afterward pulls from consistent, swappable tokens
**Depends on**: Nothing (first phase)
**Requirements**: DS-01, DS-02, DS-03, DS-04, DS-05, IMG-01, IMG-02
**Success Criteria** (what must be TRUE):
  1. A CSS file of custom property tokens exists and a browser can import it, rendering warm ivory backgrounds and dark brass accent colors correctly
  2. The editorial serif / geometric sans pairing is loaded and renders at the right scale on mobile and desktop with no breakpoint overrides needed for type sizing
  3. All placeholder containers display a fine-line SVG motif on an ivory surface — no grey boxes visible anywhere
  4. Hover, focus, and active states visibly darken against the ivory background without any element disappearing into the background
**Plans**: 2 plans
Plans:
- [x] 01-01-PLAN.md — Design tokens, typography, and style.css transformation
- [x] 01-02-PLAN.md — SVG placeholder system with three silhouette variants
**UI hint**: yes

### Phase 2: Shared Chrome
**Goal**: Every page shares a consistent navigation bar, footer, WhatsApp CTA component, and image directory structure — the shell is reusable before any page content is built
**Depends on**: Phase 1
**Requirements**: SC-01, SC-02, SC-03, SC-04, IMG-03, IMG-04, WA-01, WA-02, AN-04
**Success Criteria** (what must be TRUE):
  1. The fixed navigation bar renders the brand wordmark and page links on an ivory background, and transitions from transparent to solid on scroll
  2. Tapping the hamburger on mobile opens a full-screen overlay with all nav links
  3. The footer renders with address, navigation links, and social links on every page
  4. The WhatsApp CTA component renders as a branded luxury block (not a green bubble) with a pre-filled enquiry message that opens WhatsApp when tapped
  5. Images can be swapped by dropping files into their role directory and updating one src attribute per image
**Plans**: 2 plans
Plans:
- [x] 01-01-PLAN.md — Design tokens, typography, and style.css transformation
- [ ] 01-02-PLAN.md — SVG placeholder system with three silhouette variants
**UI hint**: yes

### Phase 3: Homepage + Bespoke
**Goal**: The two core narrative pages are live and deliver the full emotional arc — visitor lands on the hero, feels the craft through process steps and the live clock, and can navigate to the bespoke chapter journey
**Depends on**: Phase 2
**Requirements**: HP-01, HP-02, HP-03, HP-04, HP-05, HP-06, BP-01, BP-02, BP-03, BP-04, BP-05, WA-03, AN-01, AN-02
**Success Criteria** (what must be TRUE):
  1. The homepage hero renders full-viewport with the brand wordmark, tagline, and a WhatsApp CTA that opens a pre-filled message
  2. The craftsmanship clock visibly counts up to the current total hours on first scroll-into-view and does not re-animate on repeated visits
  3. The five-step process section, philosophy quote, featured commission, and bottom CTA banner all render with scroll-reveal fade-up animations on entry
  4. The Bespoke page renders all five alternating image/text chapters, four or more fabric archive cards, the "Our promise" triptych, and a WhatsApp CTA
  5. Every section on both pages has a visible WhatsApp CTA as the primary conversion path
**Plans**: 2 plans
Plans:
- [ ] 01-01-PLAN.md — Design tokens, typography, and style.css transformation
- [ ] 01-02-PLAN.md — SVG placeholder system with three silhouette variants
**UI hint**: yes

### Phase 4: Archive Gallery
**Goal**: Visitors can browse all commissioned gowns, filter by occasion, and feel the breadth of the atelier's output before reaching out
**Depends on**: Phase 3
**Requirements**: AG-01, AG-02, AG-03, AG-04, AG-05, AG-06, AG-07, AN-03
**Success Criteria** (what must be TRUE):
  1. The archive page renders a stats bar with commissions completed, hours of craft, countries represented, and designs repeated
  2. Clicking or tapping a filter (Bridal, Evening, Ceremonial, Editorial) visibly transitions the gallery to show only matching items — non-matching items disappear smoothly
  3. Hovering or long-pressing a gallery item reveals an overlay showing the gown name, occasion, hours, and year
  4. The "View more" button loads additional gallery items without a full page reload
  5. A WhatsApp CTA renders at the bottom of the archive page
**Plans**: 2 plans
Plans:
- [ ] 01-01-PLAN.md — Design tokens, typography, and style.css transformation
- [ ] 01-02-PLAN.md — SVG placeholder system with three silhouette variants
**UI hint**: yes

### Phase 5: Rental Page
**Goal**: The Truly Enamoured rental page is live and positioned as a pipeline into bespoke commissions — rental visitors can enquire and are encouraged to commission their own gown
**Depends on**: Phase 4
**Requirements**: RP-01, RP-02, RP-03, RP-04, RP-05, RP-06
**Success Criteria** (what must be TRUE):
  1. The rental page hero clearly frames Truly Enamoured as the rental arm of TTMD
  2. The rental gown gallery renders with editorial placeholders and occasion tags
  3. The rental process section explains all four steps (browse, book, wear, return) in readable order
  4. Pricing tiers or indication are visible — visitors know approximately what rental costs before enquiring
  5. The bespoke upgrade block presents a compelling editorial CTA encouraging renters to commission their own gown, with a WhatsApp link
**Plans**: 2 plans
Plans:
- [ ] 01-01-PLAN.md — Design tokens, typography, and style.css transformation
- [ ] 01-02-PLAN.md — SVG placeholder system with three silhouette variants
**UI hint**: yes

### Phase 6: Production
**Goal**: The site is hardened for live traffic — SEO metadata on every page, social sharing cards working, responsive across all devices, and deployed to Plesk at timetakentomakedress.com
**Depends on**: Phase 5
**Requirements**: PR-01, PR-02, PR-03, PR-04, PR-05
**Success Criteria** (what must be TRUE):
  1. Every page has a unique, descriptive title tag, meta description, and canonical URL
  2. Sharing a page URL on WhatsApp or a social platform renders a branded preview card with the correct OG image, title, and description
  3. All four pages render without layout breakage on a 375px mobile, a 768px tablet, and a 1440px desktop
  4. The site is live at timetakentomakedress.com and all pages load without 404s or broken asset references
  5. A favicon and touch icon display correctly in browser tabs and on iOS home screens

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Token Foundation | 0/TBD | Not started | - |
| 2. Shared Chrome | 0/TBD | Not started | - |
| 3. Homepage + Bespoke | 0/TBD | Not started | - |
| 4. Archive Gallery | 0/TBD | Not started | - |
| 5. Rental Page | 0/TBD | Not started | - |
| 6. Production | 0/TBD | Not started | - |
