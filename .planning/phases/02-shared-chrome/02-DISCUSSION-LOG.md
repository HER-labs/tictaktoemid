# Phase 2: Shared Chrome - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-22
**Phase:** 02-shared-chrome
**Areas discussed:** Navigation bar, WhatsApp CTA component, Footer content, Image directory structure, Mobile-specific

---

## Navigation Bar

| Option | Description | Selected |
|--------|-------------|----------|
| Text wordmark | "TIME TAKEN TO MAKE A DRESS" in Jost uppercase tracking | ✓ |
| Short abbreviation | "TTMD" or shortened form | |
| Logo image | SVG/PNG logo file | |

**User's choice:** Text wordmark
**Notes:** Keeps it pure typography, no image dependency. Matches existing .nav-logo pattern.

---

| Option | Description | Selected |
|--------|-------------|----------|
| 4 links: Bespoke, Archive, Rental, Contact | Core pages, Contact opens WhatsApp | ✓ |
| 3 links: Bespoke, Archive, Rental | WhatsApp CTA separate from nav | |
| 5 links: About, Bespoke, Archive, Rental, Contact | Includes About page | |

**User's choice:** 4 links — Contact opens WhatsApp
**Notes:** Homepage reached via wordmark click.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Frosted glass throughout | Semi-transparent with backdrop-blur, more opaque on scroll | ✓ |
| Fully transparent → solid | Completely transparent over hero, snaps to solid | |
| Always solid | No transition | |

**User's choice:** Frosted glass throughout
**Notes:** Already coded in style.css. Subtle, luxury feel.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Full-screen ivory overlay | Covers viewport below nav, links stacked vertically | ✓ |
| Slide-in panel from right | Side drawer | |
| Dropdown below nav | Links drop down, no full-screen cover | |

**User's choice:** Full-screen ivory overlay
**Notes:** Matches existing .nav-links.open CSS pattern.

---

## WhatsApp CTA Component

| Option | Description | Selected |
|--------|-------------|----------|
| Full-width editorial banner | Section-width block, headline + subtext + dark button | ✓ |
| Centered card block | Contained card with border/background shift | |
| Minimal text + button | One-liner and button, no container | |

**User's choice:** Full-width editorial banner
**Notes:** Magazine ad strip aesthetic. No green, no WhatsApp branding.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Occasion-focused | "Hello — I'd like to discuss a bespoke commission for [occasion]." | ✓ |
| Open-ended greeting | "Hello — I'd like to learn more about commissioning a gown." | |
| Referral-aware | Includes referral field | |

**User's choice:** Occasion-focused
**Notes:** Signals a qualified lead with intent.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Vary by page | Different button text per page context | ✓ |
| Same everywhere | One universal label | |
| You decide | Claude picks per page | |

**User's choice:** Vary by page
**Notes:** Homepage: "Begin your commission", Bespoke: "Start your journey", Archive: "Enquire about a gown", Rental: "Enquire about rental"

---

| Option | Description | Selected |
|--------|-------------|----------|
| No floating button | Only in-page editorial CTA blocks | ✓ |
| Subtle bottom-corner button | Small monochromatic button in corner | |

**User's choice:** No floating button
**Notes:** Floating elements read as mass-market.

---

## Footer Content

| Option | Description | Selected |
|--------|-------------|----------|
| Wordmark + address + tagline | Full brand, address, tagline | |
| Wordmark + address only | No tagline | |
| Wordmark + tagline only | No address | |

**User's choice:** Other — No address at all. The atelier is now personal, they go to the client's home.
**Notes:** Footer brand = wordmark + tagline, no physical address anywhere on the site.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Instagram only | Primary visual platform for haute couture | ✓ |
| Instagram + Pinterest | Both visual-first platforms | |
| Instagram + Facebook + Pinterest | Broader coverage | |
| You decide | Claude picks | |

**User's choice:** Instagram only
**Notes:** One link, clean and focused.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Mirror the main nav | Same 4 links: Bespoke, Archive, Rental, Contact | ✓ |
| Expanded with extras | Main nav + Privacy, Terms, Credits | |
| Minimal — just WhatsApp CTA | No nav links, just brand + WhatsApp | |

**User's choice:** Mirror the main nav
**Notes:** Consistent, no surprises. Footer repeats nav for scroll-to-bottom visitors.

---

## Image Directory Structure

| Option | Description | Selected |
|--------|-------------|----------|
| By role | images/hero/, images/gowns/, images/process/, images/fabric/, images/rental/ | ✓ |
| By page | images/homepage/, images/bespoke/, images/archive/, images/rental/ | |
| Flat with naming convention | All in images/ with descriptive names | |

**User's choice:** By role
**Notes:** Each folder maps to a page section.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Separate placeholders folder | images/placeholders/ holds SVGs, photos in role folders | ✓ |
| Inside each role folder | Each role folder has its own placeholder | |

**User's choice:** Separate placeholders folder
**Notes:** Clean separation — when photos arrive, never touch the placeholder folder.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Descriptive kebab-case | hero-homepage.jpg, gown-bridal-01.jpg | ✓ |
| Numbered by role | hero-01.jpg, gown-01.jpg | |
| You decide | Claude picks | |

**User's choice:** Descriptive kebab-case
**Notes:** Self-documenting filenames.

---

## Mobile-Specific (additional areas)

| Option | Description | Selected |
|--------|-------------|----------|
| Tap opens WhatsApp directly | wa.me link opens app immediately | ✓ |
| Tap shows confirmation sheet | Brief overlay before opening WhatsApp | |
| Tap copies number + opens WhatsApp | Belt and suspenders | |

**User's choice:** Tap opens WhatsApp directly
**Notes:** Fastest path to conversion. Most clients view on mobile.

---

| Option | Description | Selected |
|--------|-------------|----------|
| CTA button at bottom of overlay | 4 nav links at top, WhatsApp button at bottom | ✓ |
| Just the 4 nav links | Keep overlay clean, Contact link covers WhatsApp | |
| CTA replaces Contact link | Styled WhatsApp button instead of text link | |

**User's choice:** CTA button at bottom of overlay
**Notes:** Every menu open = conversion opportunity.

---

## Claude's Discretion

- Exact headline/subtext copy for WhatsApp CTA banner
- Tagline wording for footer brand
- Hamburger animation timing
- Footer responsive breakpoints
- Instagram icon style
- Additional image subdirectories if needed

## Deferred Ideas

None — discussion stayed within phase scope
