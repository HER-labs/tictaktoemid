---
phase: 03-homepage-bespoke
plan: 03
subsystem: html
tags: [inline-style-removal, placeholder-migration, whatsapp-update, bespoke-cleanup]
dependency_graph:
  requires: [page-specific-styles-in-stylesheet]
  provides: [clean-bespoke-html]
  affects: [bespoke.html]
tech_stack:
  added: []
  patterns: [phase1-placeholder-system, section-heading-utility]
key_files:
  created: []
  modified:
    - bespoke.html
decisions:
  - "Kept all 4 WhatsApp links (nav contact, nav overlay CTA, CTA banner, footer) pointing to 6588567038"
metrics:
  duration: "2m 13s"
  completed: "2026-04-24T09:34:55Z"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 1
---

# Phase 03 Plan 03: Bespoke Page HTML Cleanup Summary

Removed all inline styles from bespoke.html, migrated 9 placeholder elements to Phase 1 pattern, replaced all WhatsApp placeholder numbers with real number, and applied section-heading utility class.

## What Was Done

### Task 1: Remove inline styles and update WhatsApp numbers (a6e83a6)
- Deleted entire inline `<style>` block (208 lines) including all orphaned dark-theme CSS
- Dark gradient `#0d0905` in `.page-hero::before` eliminated (not migrated -- CSS already in style.css from Plan 01)
- Replaced 4 occurrences of `65XXXXXXXX` with `6588567038` (nav contact, nav overlay CTA, CTA banner, footer)
- Removed 3 `TODO: Replace` comments referencing WhatsApp number

### Task 2: Migrate placeholder classes and fix section heading styles (0678150)
- Replaced 5 chapter image `placeholder-img` divs with `.placeholder .placeholder--portrait` pattern using `silhouette-portrait.svg`
- Replaced 4 fabric swatch `placeholder-img` divs with `.placeholder .placeholder--fabric` pattern using `silhouette-fabric.svg`
- Replaced inline `style="margin-top: 16px; margin-bottom: 8px;"` on 2 section h2 elements with `.section-heading` utility class

## Deviations from Plan

None -- plan executed exactly as written.

## Verification Results

| Check | Expected | Actual |
|-------|----------|--------|
| `<style>` tags | 0 | 0 |
| `65XXXXXXXX` occurrences | 0 | 0 |
| `placeholder-img` references | 0 | 0 |
| `placeholder--portrait` count | 5 | 5 |
| `placeholder--fabric` count | 4 | 4 |
| `wa.me/6588567038` count | >=3 | 4 |
| `#0d0905` references | 0 | 0 |
| Inline margin style on h2 | 0 | 0 |
| `section-heading` class usage | 2 | 2 |

## Known Stubs

None. All placeholders use the Phase 1 SVG placeholder system.

## Self-Check: PASSED
