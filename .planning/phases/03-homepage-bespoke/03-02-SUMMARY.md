---
phase: 03-homepage-bespoke
plan: 02
subsystem: html
tags: [inline-style-removal, hero-cta, whatsapp-integration, placeholder-migration, reveal-stagger]
dependency_graph:
  requires: [03-01]
  provides: [clean-homepage-html, whatsapp-hero-cta, staggered-process-reveals]
  affects: [index.html]
tech_stack:
  added: []
  patterns: [placeholder-svg-pattern, reveal-stagger-pattern, whatsapp-deep-link]
key_files:
  created: []
  modified:
    - index.html
decisions:
  - "Kept single inline style='margin-top: 32px' on featured CTA div as acceptable one-off layout value (not a D-05 violation)"
  - "Hero secondary CTA links to commission.html per plan (not bespoke.html as in PATTERNS.md alternate)"
metrics:
  duration: "2m 54s"
  completed: "2026-04-24T09:35:20Z"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 1
---

# Phase 03 Plan 02: Homepage HTML Cleanup Summary

Removed all inline styles from index.html, restructured hero CTA for WhatsApp-first conversion, migrated placeholders to Phase 1 SVG pattern, and added staggered reveal animations to process steps.

## What Was Done

### Task 1: Remove inline styles and video badge, restructure hero CTA (2274f78)
- Removed entire inline `<style>` block (314 lines of CSS) -- all styles now served from css/style.css
- Removed video badge element (`<div class="video-badge">`) -- deferred v2 feature (VD-01)
- Restructured hero CTA: primary btn-primary links to WhatsApp (wa.me/6588567038), secondary text link to commission.html (hidden on mobile via .hero-secondary-cta CSS)
- Replaced all 3 occurrences of placeholder `65XXXXXXXX` with real WhatsApp number `6588567038`
- Removed 3 TODO comment lines about WhatsApp number replacement
- Result: 5 total wa.me/6588567038 links (nav contact, nav overlay, hero, CTA banner, footer)

### Task 2: Fix placeholder classes and reveal stagger assignments (c20a11e)
- Migrated featured commission image from `placeholder-img` to `placeholder placeholder--portrait` with SVG source
- Moved `.reveal` from `.process-grid` container to each individual `.process-step`
- Added `reveal-delay-1` through `reveal-delay-4` on steps 2-5 for staggered animation
- Replaced inline `style="margin-top: 16px; margin-bottom: 8px;"` on both section h2 elements with `.section-heading` utility class

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

| Check | Expected | Result |
|-------|----------|--------|
| `<style>` tags in index.html | 0 | 0 |
| `video-badge` references | 0 | 0 |
| `65XXXXXXXX` placeholders | 0 | 0 |
| `placeholder-img` references | 0 | 0 |
| `wa.me/6588567038` occurrences | 4+ | 5 |
| `process-grid` without `reveal` class | yes | yes |
| `process-step reveal` count | 5 | 5 |
| Section h2s with `section-heading` class | 2 | 2 |
| Inline style on h2 elements | 0 | 0 |

## Known Stubs

None. All markup references valid CSS classes and real WhatsApp number.

## Self-Check: PASSED
