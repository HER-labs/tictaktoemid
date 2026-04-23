---
phase: 2
slug: shared-chrome
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-23
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Browser manual testing (static HTML/CSS/JS — no test framework) |
| **Config file** | none — static site, no build tools |
| **Quick run command** | `open index.html` (visual inspection) |
| **Full suite command** | `grep -r 'class="nav"' *.html && grep -r 'class="site-footer"' *.html && grep -r 'wa.me' *.html` |
| **Estimated runtime** | ~2 seconds (grep checks) |

---

## Sampling Rate

- **After every task commit:** Run grep verification commands
- **After every plan wave:** Visual inspection in browser + grep suite
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | SC-01 | — | N/A | grep | `grep 'class="nav"' index.html` | ⬜ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | SC-02 | — | N/A | grep | `grep 'nav-toggle' index.html` | ⬜ W0 | ⬜ pending |
| 02-01-03 | 01 | 1 | SC-03 | — | N/A | grep | `grep 'site-footer' index.html` | ⬜ W0 | ⬜ pending |
| 02-01-04 | 01 | 1 | SC-04 | — | N/A | diff | `diff <(grep 'class="nav"' index.html) <(grep 'class="nav"' bespoke.html)` | ⬜ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | WA-01 | — | N/A | grep | `grep 'wa.me' index.html` | ⬜ W0 | ⬜ pending |
| 02-02-02 | 02 | 1 | WA-02 | — | N/A | grep | `grep 'cta-banner' index.html` | ⬜ W0 | ⬜ pending |
| 02-03-01 | 03 | 1 | IMG-03 | — | N/A | ls | `ls images/hero/ images/gowns/ images/process/` | ⬜ W0 | ⬜ pending |
| 02-03-02 | 03 | 1 | IMG-04 | — | N/A | ls | `ls images/placeholders/` | ⬜ W0 | ⬜ pending |
| 02-04-01 | 04 | 1 | AN-04 | — | N/A | grep | `grep 'scrolled' css/style.css` | ⬜ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure covers all phase requirements. No test framework needed — static HTML/CSS/JS site uses grep/diff/ls verification.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Nav scroll transition | SC-01 | Visual animation quality | Open index.html, scroll down, verify nav transitions from transparent to solid |
| Mobile hamburger overlay | SC-02 | Touch interaction | Open in mobile viewport, tap hamburger, verify full-screen overlay |
| WhatsApp tap-through | WA-01 | External app launch | Tap CTA button on mobile, verify WhatsApp opens with pre-filled message |
| Image swap workflow | IMG-04 | File system + visual | Drop a new image in role directory, update src, verify it renders |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending