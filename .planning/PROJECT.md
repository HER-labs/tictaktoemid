# TTMD — Time Taken to Make a Dress

## What This Is

A luxury static website for TTMD, a Singapore-based bespoke gown atelier at 337A Beach Road. The site replaces a broken WordPress installation on Plesk hosting (timetakentomakedress.com) with a hand-coded HTML/CSS/JS site that communicates the craftsmanship, exclusivity, and price-point justification of $15k–$50k+ bespoke commissions. The visual language is warm ivory with minimal color — photography-first, editorial, quiet luxury.

## Core Value

The site must make a visitor *feel* the time, patience, and craft invested in every gown — so that by the time they reach WhatsApp, the $20k price point feels inevitable.

## Requirements

### Validated

- ✓ Dark luxury aesthetic with gold accents — existing (will be redesigned to warm ivory)
- ✓ Homepage with hero, craftsmanship clock, process steps, featured commission — existing
- ✓ Bespoke page with 5-chapter making journey and fabric archive — existing
- ✓ Archive gallery with filters (bridal, evening, ceremonial, editorial) — existing
- ✓ Responsive navigation with mobile hamburger — existing
- ✓ Scroll-reveal animations — existing
- ✓ Live craftsmanship clock counter — existing

### Active

- [ ] Redesign entire color system from dark to warm ivory/off-white
- [ ] Minimal color approach — black typography, white space, photography leads
- [ ] Smart image placeholders ready for easy photo swap-in
- [ ] WhatsApp CTA as primary conversion path (all "commission" buttons → WhatsApp)
- [ ] Rental page with Truly Enamoured content and bespoke upgrade CTA
- [ ] Production-ready static site deployable to Plesk
- [ ] SEO meta tags and Open Graph for all pages
- [ ] Typography refinement for light backgrounds

### Out of Scope

- AI-powered pre-consultation (Claude API) — v2, after core site proves value
- Private client portal (Supabase) — v2, requires backend infrastructure
- Commission questionnaire form — deferred, WhatsApp handles intake for now
- Gown inspiration configurator — v2, depends on AI feature
- Video hero — requires professional video shoot, can be added later
- Next.js / Vercel migration — staying on Plesk with static files
- WordPress — broken, being replaced entirely

## Context

- **Current state**: 4-page static HTML/CSS/JS site with dark luxury aesthetic, all placeholder images, no backend
- **Hosting**: Plesk at timetakentomakedress.com (IP: 103.7.9.38), broken WordPress being replaced
- **Photography**: Professional shoot planned but not yet done — build with smart placeholders
- **Rental brand**: Truly Enamoured is the rental arm, currently a separate redirect
- **Strategy document**: `ttmd_strategy.html` contains the full $60k vision — this build is the foundational first phase
- **Design benchmarks**: Chanel (typography as luxury), Galia Lahav (atelier as hero), Elie Saab (macro embellishment), The Row (quiet luxury)

## Constraints

- **Hosting**: Plesk — static HTML/CSS/JS only, no server-side rendering or API routes
- **Content**: No real photography yet — must use elegant placeholders that swap easily
- **Platform**: No build tools required — hand-coded, no npm/webpack/bundler dependency
- **Budget**: This is the foundational build, not the full $60k strategy — ship value fast

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Warm ivory over dark theme | Client preference — aligns with bridal/haute couture conventions | — Pending |
| Minimal color, photography-first | Let the craft speak — like Chanel and The Row | — Pending |
| WhatsApp CTA over commission form | Simpler v1, direct personal contact for luxury tier | — Pending |
| Static HTML on Plesk over Next.js/Vercel | Client has existing Plesk hosting, no backend needed for v1 | — Pending |
| Include rental page in v1 | Rental audience is a bespoke pipeline — convert renters to commissioners | — Pending |
| Defer AI consultation to v2 | Focus on visual storytelling first, add tech differentiators later | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-17 after initialization*
