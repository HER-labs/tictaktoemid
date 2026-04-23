---
phase: 02-shared-chrome
plan: "02"
subsystem: html-pages
tags: [nav, footer, cta, whatsapp, accessibility, shared-chrome]
dependency_graph:
  requires: [02-01]
  provides: [canonical-nav, canonical-footer, cta-banner]
  affects: [index.html, bespoke.html, archive.html, commission.html]
tech_stack:
  added: []
  patterns: [canonical-html-synchronization, skip-link, aria-nav, whatsapp-cta]
key_files:
  created: []
  modified:
    - index.html
    - bespoke.html
    - archive.html
    - commission.html
decisions:
  - "Contact nav link points to wa.me URL, not commission.html — WhatsApp is the primary conversion path"
  - "CTA banner replaces page-specific bespoke-cta/archive-cta sections with canonical cta-banner class"
  - "Footer .footer-address removed in favour of .footer-tagline per user instruction (no street address)"
  - "commission.html CTA button label is 'Enquire about rental' per plan spec D-08"
metrics:
  duration: "~8 minutes"
  completed: "2026-04-23T12:21:24Z"
  tasks_completed: 1
  tasks_total: 2
  files_modified: 4
---

# Phase 02 Plan 02: Shared Chrome Synchronization Summary

All 4 HTML pages now share byte-for-byte identical canonical nav and footer markup, with per-page WhatsApp CTA banners and full accessibility attributes.

## Tasks Completed

| Task | Description | Commit | Status |
|------|-------------|--------|--------|
| 1 | Update nav, footer, and CTA on all 4 HTML pages | 57e2f90 | Complete |
| 2 | Human verification checkpoint | — | Awaiting |

## What Was Built

**Canonical nav** applied to all 4 pages:
- Wordmark changed from "T T M D" to "Time Taken to Make a Dress"
- 4 nav links: Bespoke, Archive, Rental, Contact (Contact → wa.me URL)
- Skip link (`href="#main-content"`) as first nav child
- `role="navigation"`, `aria-label="Main navigation"` on `<nav>`
- `id="nav-overlay"`, `role="list"` on `<ul>`
- Mobile overlay CTA button (`nav-overlay-cta` li) with "Begin your commission"
- `aria-expanded="false"`, `aria-controls="nav-overlay"` on hamburger button

**Canonical footer** applied to all 4 pages:
- Wordmark changed from "T T M D" to "Time Taken to Make a Dress"
- `.footer-address` replaced with `.footer-tagline` ("Celebrating the time taken.")
- "Atelier" column renamed to "Pages"; Commission link replaced with Rental
- Instagram link with inline SVG icon, `target="_blank" rel="noopener noreferrer"`
- WhatsApp text link added
- Footer bottom right changed from "Crafted by hand. Always." to "Singapore"
- `role="contentinfo"` on `<footer>`, `aria-label="Footer navigation"` on inner `<nav>`

**CTA banners** — canonical markup with page-specific button labels:
- index.html: "Begin your commission"
- bespoke.html: "Start your journey" (replaced old `.bespoke-cta` section)
- archive.html: "Enquire about a gown" (replaced old `.archive-cta` section)
- commission.html: "Enquire about rental" (added before footer — none existed)

**index.html inline styles cleaned:** `.cta-banner`, `.cta-banner h2`, `.cta-banner .body-text` rules removed from `<head>` `<style>` block (these live in `css/style.css` from Plan 01).

## Deviations from Plan

None — plan executed exactly as written. All user manual changes (no street address, hero image, clock values) were preserved; only nav, footer, and CTA blocks were touched.

## Known Stubs

- All `wa.me` URLs use placeholder `65XXXXXXXX` — each instance is annotated with `<!-- TODO: Replace 65XXXXXXXX with real WhatsApp number -->`. This is intentional and documented in the plan.
- `rental.html` is referenced in nav and footer but does not yet exist as a page — this is expected for Phase 2; the page will be created in a future phase.

## Threat Flags

| Flag | File | Description |
|------|------|-------------|
| threat_flag: external-link | index.html, bespoke.html, archive.html, commission.html | Instagram link opens new tab — mitigated with `rel="noopener noreferrer"` (T-02-01) |

## Self-Check

### Files exist:
- index.html: present and modified
- bespoke.html: present and modified
- archive.html: present and modified
- commission.html: present and modified

### Commits exist:
- 57e2f90: feat(02-02): synchronize canonical nav, footer, and CTA across all 4 HTML pages

## Self-Check: PASSED
