---
phase: 03-homepage-bespoke
plan: 01
subsystem: css
tags: [css-migration, token-replacement, dark-theme-cleanup]
dependency_graph:
  requires: []
  provides: [border-subtle-token, page-specific-styles-in-stylesheet]
  affects: [index.html, bespoke.html]
tech_stack:
  added: []
  patterns: [css-token-system, external-stylesheet-migration]
key_files:
  created: []
  modified:
    - css/tokens.css
    - css/style.css
decisions:
  - "Used rgba(26,26,26,0.08) for --border-subtle token to match warm ivory palette"
  - "Fixed hero background image path to ../img/ for external CSS file context"
metrics:
  duration: "2m 45s"
  completed: "2026-04-24T09:30:15Z"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 2
---

# Phase 03 Plan 01: CSS Migration & Token Replacement Summary

Migrated all page-specific inline CSS from index.html and bespoke.html into css/style.css, replacing every orphaned dark-theme variable with Phase 1 token equivalents and adding the --border-subtle token.

## What Was Done

### Task 1: Add --border-subtle token (c203267)
- Added `--border-subtle: rgba(26, 26, 26, 0.08)` to tokens.css after the color block
- All existing tokens preserved unchanged

### Task 2: Migrate page-specific CSS with token replacements (6534982)
- Moved 514 lines of CSS from inline style blocks to css/style.css
- Replaced all orphaned dark-theme variables:
  - `var(--gold-light)` -> `var(--text)`
  - `var(--gold-dim)` -> `var(--text-tertiary)`
  - `var(--gold)` -> `var(--text-secondary)` (process-icon stroke)
  - `var(--text-dim)` -> `var(--text-secondary)`
  - `var(--text-faint)` -> `var(--text-tertiary)`
  - `var(--border)` -> `var(--border-subtle)`
  - `var(--border-gold)` -> `var(--text-tertiary)`
  - `var(--bg-card)` -> `var(--bg-surface)`
- Replaced hardcoded rgba gold values with neutral equivalents
- Removed `.page-hero::before` dark gradient rule (not migrated)
- Excluded `.video-badge` rule (being deleted in Plan 02)
- Added `.hero-secondary-cta` class (desktop-only, hidden on mobile per D-06/D-07)
- Added `.section-heading` utility class
- Added page-specific responsive rules at 900px, 768px, 600px, 480px breakpoints
- Organized sections: Hero, Clock, Philosophy, Process, Featured Commission, Page Hero, Chapters, Fabric Archive, Promise, Utilities

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed hero background image relative path**
- **Found during:** Task 2
- **Issue:** The inline style in index.html used `url('img/homepage_white_dramatic_gown.png')` which resolves relative to the HTML file. When moved to css/style.css (in the css/ subdirectory), the path would break.
- **Fix:** Changed to `url('../img/homepage_white_dramatic_gown.png')` to resolve correctly from the CSS file location.
- **Files modified:** css/style.css
- **Commit:** 6534982

## Verification Results

| Check | Result |
|-------|--------|
| `var(--gold` in style.css | 0 occurrences |
| `var(--border-gold)` in style.css | 0 occurrences |
| `var(--text-dim)` in style.css | 0 occurrences |
| `var(--text-faint)` in style.css | 0 occurrences |
| `var(--bg-card)` in style.css | 0 occurrences |
| `#0d0905` in style.css | 0 occurrences |
| `--border-subtle` in tokens.css | Present |
| `.hero-secondary-cta` in style.css | Present |
| `.section-heading` in style.css | Present |
| `.page-hero::before` in style.css | Not present (correct) |
| `.video-badge` in style.css | Not present (correct) |
| `@keyframes fadeUp` in style.css | Present |
| `@keyframes scrollPulse` in style.css | Present |
| style.css line count | 906 (min 500) |

## Known Stubs

None. All migrated CSS uses valid token references.

## Self-Check: PASSED
