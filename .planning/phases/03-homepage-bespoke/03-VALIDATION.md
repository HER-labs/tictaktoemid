---
phase: 3
slug: homepage-bespoke
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-24
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual browser verification (static HTML site — no test runner) |
| **Config file** | none — static site |
| **Quick run command** | `open index.html` in browser, check console for JS errors |
| **Full suite command** | `grep -r "var(--" css/style.css index.html bespoke.html \| sort` + visual inspection |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Open modified HTML file in browser, check for visual regressions and console errors
- **After every plan wave:** Full visual walkthrough of both pages + CSS variable audit
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | HP-01 | — | N/A | manual | `open index.html` — verify hero renders full-viewport | ✅ | ⬜ pending |
| 03-01-02 | 01 | 1 | HP-02 | — | N/A | manual | Scroll to clock — verify counter animates once | ✅ | ⬜ pending |
| 03-01-03 | 01 | 1 | HP-03, HP-04 | — | N/A | manual | Scroll through process/philosophy/featured — verify fade-up | ✅ | ⬜ pending |
| 03-01-04 | 01 | 1 | HP-05, HP-06 | — | N/A | grep | `grep -c "wa.me" index.html` — must return ≥3 | ✅ | ⬜ pending |
| 03-02-01 | 02 | 1 | BP-01, BP-02 | — | N/A | manual | `open bespoke.html` — verify five chapters alternate | ✅ | ⬜ pending |
| 03-02-02 | 02 | 1 | BP-03 | — | N/A | manual | Scroll to fabric archive — verify ≥4 cards | ✅ | ⬜ pending |
| 03-02-03 | 02 | 1 | BP-04 | — | N/A | manual | Scroll to promise section — verify triptych | ✅ | ⬜ pending |
| 03-02-04 | 02 | 1 | BP-05, WA-03 | — | N/A | grep | `grep -c "wa.me" bespoke.html` — must return ≥2 | ✅ | ⬜ pending |
| 03-XX-01 | all | all | AN-01, AN-02 | — | N/A | grep | `grep -c "class=\"reveal\"" index.html bespoke.html` — must return ≥10 | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. No test framework needed for a static HTML/CSS/JS site — validation is via grep commands and visual inspection.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero renders full-viewport | HP-01 | Visual layout check | Open index.html, verify hero fills 100vh with wordmark and tagline visible |
| Clock counter animates once | HP-02 | Requires scroll interaction | Scroll to clock, verify it counts up, reload and verify it does NOT re-animate |
| Scroll-reveal fade-up | HP-03, AN-01 | Visual animation timing | Scroll slowly through all sections, verify each fades up on entry |
| Bespoke chapter alternation | BP-01, BP-02 | Visual layout pattern | Open bespoke.html, verify image/text sides alternate across five chapters |
| Promise triptych layout | BP-04 | Visual 3-column check | Scroll to "Our promise", verify 3 cards display side-by-side on desktop |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
