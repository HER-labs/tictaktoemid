---
phase: 03-homepage-bespoke
plan: 04
subsystem: js
tags: [gsap, animation, progressive-enhancement, scroll-reveal]
dependency_graph:
  requires: [03-02, 03-03]
  provides: [gsap-process-stagger, gsap-chapter-entrance]
  affects: [index.html, bespoke.html, js/main.js]
tech_stack:
  added: [gsap-3.13.0, gsap-scrolltrigger-3.13.0]
  patterns: [progressive-enhancement, reduced-motion-guard, cdn-loaded-library]
key_files:
  created: []
  modified:
    - js/main.js
    - index.html
    - bespoke.html
decisions:
  - "Process steps use 120ms stagger for crisp sequential reveal"
  - "Chapter content slides from text side (right normal, left reversed) at 40px offset"
  - "Chapter images fade without translation for calmer reveal"
  - "power2.out easing for editorial luxury feel"
  - "CSS .reveal classes removed from process steps when GSAP takes over to prevent double-animation"
metrics:
  duration: "8m 42s"
  completed: "2026-04-24T09:57:08Z"
  tasks_completed: 1
  tasks_total: 2
  files_modified: 3
---

# Phase 03 Plan 04: GSAP Progressive Enhancement Summary

GSAP ScrollTrigger progressive enhancement for process step stagger and bespoke chapter entrance animations with reduced-motion guard and CSS fallback preservation.

## What Was Done

### Task 1: Add GSAP progressive enhancement to main.js (75bcdf2)

**Step 0 -- GSAP CDN script tags:**
- Neither index.html nor bespoke.html had GSAP script tags
- Added `gsap.min.js` and `ScrollTrigger.min.js` CDN scripts before `main.js` in both HTML files

**Step 1 -- GSAP enhancement block in main.js:**
- Added at end of DOMContentLoaded callback, after "Active nav link" block
- `prefers-reduced-motion` media query check gates all GSAP code
- `typeof gsap !== 'undefined'` and `typeof ScrollTrigger !== 'undefined'` guards prevent errors when CDN fails

**Process step stagger (homepage):**
- Selects all `.process-step` elements
- Removes CSS `.reveal` and `.reveal-delay-*` classes to prevent double-animation
- Sets initial state (opacity 0, translateY 30px) via inline styles
- GSAP `.to()` animates to full opacity and y:0 with 0.8s duration and 120ms stagger
- ScrollTrigger fires once when `.process-grid` reaches 80% viewport

**Chapter entrance (bespoke page):**
- Iterates all `.chapter` elements
- Content slides in from the text side: 40px from right (normal), 40px from left (reversed)
- Images fade in without translation for a calmer effect
- 1s duration for content, 1.2s for images
- ScrollTrigger fires once when chapter reaches 75% viewport

**Preserved existing code:**
- Scroll reveal observer (lines 57-69) -- unchanged
- Clock observer (lines 71-103) -- unchanged
- Counter animation (lines 107-119) -- unchanged
- Nav, hamburger, smooth scroll, active link -- all unchanged

### Task 2: Visual verification checkpoint (not executed -- requires human)

This task is a `checkpoint:human-verify` gate. The following verification steps require human visual inspection:

1. **index.html at desktop (1200px+):** Hero with wordmark, tagline, two CTAs (WhatsApp + "Learn about our process"); clock counter animation; philosophy quote in italic serif; process steps stagger one-by-one (not all at once); featured commission with SVG placeholder and stats; CTA banner; all text dark on ivory
2. **index.html at mobile (375px):** Hero shows only "Begin your commission" button; process grid reflows to 2-column; featured grid stacks vertically
3. **bespoke.html at desktop (1200px+):** Page hero on ivory (no dark gradient); five alternating chapters with slide-in animations; fabric archive with 4 cards; promise triptych with 3 cells; CTA banner; all text dark on ivory
4. **bespoke.html at mobile (375px):** Chapters stack vertically; fabric grid 1 column; promise cells stack
5. **WhatsApp CTA:** Hero buttons on both pages open WhatsApp with pre-filled message
6. **Console:** Zero JavaScript errors, no CSS variable warnings

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added missing GSAP CDN script tags to both HTML files**
- **Found during:** Task 1, Step 0
- **Issue:** Neither index.html nor bespoke.html included GSAP CDN script tags. The plan noted this possibility and instructed to add them if missing.
- **Fix:** Added `gsap.min.js` and `ScrollTrigger.min.js` CDN scripts before `main.js` script tag in both files
- **Files modified:** index.html, bespoke.html
- **Commit:** 75bcdf2

## Known Stubs

None. All GSAP code is wired to real DOM elements with proper ScrollTrigger configuration.

## Self-Check: PASSED

- [x] js/main.js exists
- [x] index.html exists
- [x] bespoke.html exists
- [x] Commit 75bcdf2 exists
- [x] SUMMARY.md exists
