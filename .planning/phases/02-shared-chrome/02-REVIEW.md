---
phase: 02-shared-chrome
reviewed: 2026-04-23T00:00:00Z
depth: standard
files_reviewed: 6
files_reviewed_list:
  - css/style.css
  - js/main.js
  - index.html
  - bespoke.html
  - archive.html
  - commission.html
findings:
  critical: 1
  warning: 6
  info: 3
  total: 10
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-04-23
**Depth:** standard
**Files Reviewed:** 6
**Status:** issues_found

## Summary

Reviewed the shared chrome implementation across four HTML pages, the global stylesheet, and the main JavaScript module. The shared navigation, footer, scroll reveals, and mobile menu are well-structured and the JavaScript is clean and defensive. The primary concern is a systemic CSS variable gap: `tokens.css` defines only a small subset of the variables consumed by the pages, meaning the entire dark/gold color scheme silently renders as invalid values in every browser. There are also several content/logic bugs, including a mislabeled CTA button, an inconsistent WhatsApp number, a non-functional form submission, and an inaccessible form field.

---

## Critical Issues

### CR-01: CSS tokens.css missing ~10 variables used across all pages

**File:** `css/tokens.css:1-34` (consumed in `index.html`, `bespoke.html`, `archive.html`, `commission.html`, `css/style.css`)

**Issue:** `tokens.css` only defines `--bg`, `--bg-surface`, `--text`, `--text-secondary`, `--text-tertiary`, `--serif`, `--sans`, spacing tokens, `--ease`, `--transition`, and `--placeholder-opacity`. Every page and `style.css` use additional variables that are never declared:

- `--gold`, `--gold-light`, `--gold-dim` — used for all gold accent colors, headings, icons
- `--border`, `--border-gold` — used for all hairline borders
- `--text-dim`, `--text-faint` — used extensively for body copy and descriptive text
- `--bg-card` — used in `bespoke.html` `.fabric-card`

When a CSS custom property references an undefined variable, the property is treated as invalid and falls back to the property's initial value (usually `transparent` for colors, `0` for sizes). This means the gold color scheme, all border lines, and several text tiers are broken silently across every page in every browser.

**Fix:** Add the missing tokens to `css/tokens.css`:

```css
:root {
  /* ... existing tokens ... */

  /* Dark palette (used on dark sections / overlays) */
  --bg-dark:    #0A0806;
  --bg-card:    #0F0C09;

  /* Gold scale */
  --gold:       #BA7517;
  --gold-light: #D4943A;
  --gold-dim:   #8A5A10;

  /* Extended border tokens */
  --border:      rgba(232,224,208,0.12);
  --border-gold: rgba(186,117,23,0.35);

  /* Extended text tokens */
  --text-dim:   #C8BFB0;
  --text-faint: #6A6055;
}
```

Exact values should be confirmed against the design spec in `02-UI-SPEC.md`, but these are consistent with the hardcoded rgba values already used inline (e.g., `rgba(186,117,23,0.08)` throughout).

---

## Warnings

### WR-01: WhatsApp number inconsistent — real number leaks in index.html footer only

**File:** `index.html:513`

**Issue:** The footer WhatsApp link on `index.html` uses a real Singapore number (`6588567038`), while every other WhatsApp link across all four pages (nav overlay CTAs, CTA banners, footers on `bespoke.html`, `archive.html`, `commission.html`) still uses the placeholder `65XXXXXXXX`. A visitor clicking WhatsApp from any page except the homepage footer will reach a dead link.

**Fix:** Replace all instances of `65XXXXXXXX` with the real number, or replace the real number with the placeholder until the number is confirmed and ready to go live. There are at least 10 occurrences across the four pages.

```html
<!-- Replace all occurrences of: -->
https://wa.me/65XXXXXXXX?text=...
<!-- With: -->
https://wa.me/6588567038?text=...
```

---

### WR-02: commission.html CTA banner has wrong button label

**File:** `commission.html:554`

**Issue:** The CTA banner on the commission page has the button text "Enquire about rental" — a copy-paste error. This is a commission/consultation page; the button should direct visitors to start a commission, not enquire about rental.

**Fix:**
```html
<!-- Change: -->
<a href="https://wa.me/65XXXXXXXX?text=..." class="btn-primary">Enquire about rental</a>
<!-- To: -->
<a href="https://wa.me/65XXXXXXXX?text=..." class="btn-primary">Begin your commission</a>
```

---

### WR-03: Form submission on commission.html collects no data

**File:** `commission.html:621-636`

**Issue:** The commission form intercepts submit with `e.preventDefault()`, shows a thank-you message, and does nothing else. On a static Plesk host there is no server-side handler, so all enquiry data is silently discarded. A visitor who completes the detailed four-step form receives a confirmation message but the atelier receives nothing.

**Fix:** Since this is a static site, either:

1. Use a third-party form service (Formspree, Netlify Forms, Web3Forms) and `POST` to their endpoint:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST" class="commission-form" id="commissionForm">
```

2. Or construct a pre-filled WhatsApp message from the form data and redirect on submit:
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.querySelector('#firstName').value;
  const occasion = form.querySelector('[name="occasion"]').value;
  const message = encodeURIComponent(`Hello — I'd like to discuss a bespoke commission. Name: ${name}, Occasion: ${occasion}`);
  window.open(`https://wa.me/6588567038?text=${message}`, '_blank');
});
```

---

### WR-04: Occasion select has no accessible label association

**File:** `commission.html:413-415`

**Issue:** The "What is the occasion?" label element has no `for` attribute, and the `<select>` element has no `id`. Screen readers cannot associate the label with the control.

```html
<!-- Current (broken) -->
<label class="form-label">What is the occasion?</label>
<select class="form-select" name="occasion" required>

<!-- Fixed -->
<label class="form-label" for="occasion">What is the occasion?</label>
<select class="form-select" id="occasion" name="occasion" required>
```

---

### WR-05: Archive filter animation unreliable — transition applied in same frame as display

**File:** `archive.html:494-501`

**Issue:** When making a hidden item visible, the code sets `display: ''` and `opacity: '0'` on line 495, then schedules a `requestAnimationFrame` to set `transition` and `opacity: '1'`. However, setting the transition style and the new opacity value in the same rAF callback means the browser may batch both as a single style recalculation, skipping the transition entirely on the first call. The element may just snap to visible without fading.

```javascript
// Current — unreliable
item.style.display = '';
item.style.opacity = '0';
requestAnimationFrame(() => {
  item.style.transition = 'opacity 0.4s ease';
  item.style.opacity = '1';
});

// Fixed — force layout between display change and transition start
item.style.display = '';
item.style.opacity = '0';
item.style.transition = 'none';
requestAnimationFrame(() => {
  requestAnimationFrame(() => {           // double rAF forces a paint
    item.style.transition = 'opacity 0.4s ease';
    item.style.opacity = '1';
  });
});
```

---

### WR-06: cite element is outside blockquote in index.html philosophy strip

**File:** `index.html:383-385`

**Issue:** The `<cite>` element attributing the philosophy quote is a sibling of `<blockquote>`, not contained within it. HTML semantics require `<cite>` to be inside the `<blockquote>` (typically wrapped in a `<footer>`) to be correctly associated with the quoted content by assistive technologies.

```html
<!-- Current -->
<blockquote>
  "We celebrate the tangible beauty of the handmade..."
</blockquote>
<cite>— The Atelier Philosophy</cite>

<!-- Fixed -->
<blockquote>
  <p>"We celebrate the tangible beauty of the handmade..."</p>
  <footer><cite>— The Atelier Philosophy</cite></footer>
</blockquote>
```

---

## Info

### IN-01: Nav logo text inconsistent across pages

**File:** `index.html:333` vs `bespoke.html:227`, `archive.html:242`, `commission.html:323`

**Issue:** The nav logo on `index.html` reads `TTMD` (abbreviated), while all other pages use the full `Time Taken to Make a Dress`. Users navigating between pages will see the wordmark change. This may be intentional (homepage uses the short form as a wordmark), but if so it should be documented as a design decision. If not intentional, pick one and apply consistently.

---

### IN-02: Placeholder WhatsApp number in multiple TODO comments

**File:** `index.html:342`, `index.html:485`, `index.html:512`, `bespoke.html:236`, `bespoke.html:435`, `bespoke.html:467`, `archive.html:251`, `archive.html:434`, `archive.html:466`, `commission.html:331`, `commission.html:552`, `commission.html:584`

**Issue:** Twelve TODO comments flag the same unresolved placeholder number. Since WR-01 confirms the real number exists (in `index.html:513`), this is a ready-to-close task. Consolidate the number into one place (a JS constant or data attribute) to prevent future drift.

---

### IN-03: baseHours variable in craftsmanship clock is unused

**File:** `js/main.js:75`

**Issue:** `const baseHours = 0` is declared and used in the clock calculation (`baseHours + daysSinceLaunch * hoursPerDay`), but since it is always `0` it has no effect. If it was intended to seed the clock from a known historical total (e.g., hours accumulated before the site launched), the value needs to be set. As written, the clock resets to zero for any date after 2010-01-01, which means the displayed number is purely the calculated accumulation — fine, but the variable is misleading as written.

```javascript
// Either remove it:
const currentHours = Math.floor(daysSinceLaunch * hoursPerDay);

// Or document its intent and set a real value:
const baseHours = 12480; // hours completed before site launch (validated against archive)
```

---

_Reviewed: 2026-04-23_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
