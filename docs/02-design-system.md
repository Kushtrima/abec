# ABEC — Design System

## 🎨 Colors

```css
:root {
  /* Brand */
  --color-black:        #000000;   /* primary dark, hero, footer */
  --color-red:          #E30613;   /* accent — CTAs, dividers, numerals */
  --color-red-hover:    #B8050F;   /* darker red for hover states */
  --color-white:        #FFFFFF;   /* light surface */

  /* Neutrals */
  --color-gray-50:      #F7F7F7;   /* lightest surface (Baunetzwerk bg) */
  --color-gray-100:     #EDEDED;   /* hairline dividers */
  --color-gray-300:     #C4C4C4;
  --color-gray-500:     #757575;   /* secondary text */
  --color-gray-700:     #3D3D3D;   /* strong body text */
  --color-gray-900:     #1A1A1A;   /* near-black */
}
```

## 🔤 Typography

```css
:root {
  /* Families */
  --font-display: "Fraunces", "Playfair Display", Georgia, serif;
  --font-body:    "Inter", "Helvetica Neue", system-ui, sans-serif;

  /* Scale (clamp for fluid) */
  --fs-display-xl: clamp(2.75rem, 5vw, 4.5rem);   /* hero H1 */
  --fs-display-lg: clamp(2rem, 3.5vw, 3rem);      /* section H2 */
  --fs-display-md: clamp(1.5rem, 2.5vw, 2rem);    /* card titles */
  --fs-body-lg:    1.125rem;                      /* lead paragraphs */
  --fs-body:       1rem;                          /* default */
  --fs-small:      0.875rem;                      /* meta */
  --fs-eyebrow:    0.75rem;                       /* uppercase labels */

  /* Weights */
  --fw-light:    300;
  --fw-regular:  400;
  --fw-medium:   500;
  --fw-bold:     700;

  /* Line height */
  --lh-tight:    1.1;
  --lh-snug:     1.3;
  --lh-base:     1.6;
}
```

**Hierarchy rules**
- Display H1/H2 → **serif**, tight leading, dark
- Eyebrow labels (e.g. `UNSERE DIENSTLEISTUNGEN`) → sans, **uppercase**, tracked `0.1em`, gray
- Body → sans, regular, comfortable line-height
- Numerals (01/02/03) → display serif, large, often colored red

## 📐 Layout

```css
:root {
  --container-max: 1280px;
  --container-pad: clamp(1rem, 4vw, 3rem);

  /* Spacing scale (8pt grid) */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-6: 3rem;
  --space-8: 4rem;
  --space-12: 6rem;
  --space-16: 8rem;   /* between major sections */
  --space-24: 12rem;  /* hero/landing breathing room */

  /* Radius — keep small/none for premium architectural feel */
  --radius-none: 0;
  --radius-sm: 2px;
  --radius-md: 4px;
}
```

**Grid**
- 12-column desktop, 4-column tablet, single-column mobile
- Section dividers: 2-3 px solid red line above eyebrow labels
- Generous vertical rhythm (`--space-16` between sections)

## 🧩 Components

### Buttons
- **Primary:** solid red bg, white text, no radius (or 2px), uppercase optional, padding `1rem 2rem`
- **Secondary:** transparent bg, 1px border (white on dark / black on light), same paddings
- **Tertiary / link:** "Text →" with red arrow, underline on hover

### Cards
- White surface, subtle border (`--color-gray-100`) or no border
- Title in display font, body in sans
- Red arrow indicator at bottom-left for "more" interactions

### Forms
- Underlined inputs (no boxes) for premium minimalist feel
- Label above input, error state in red
- Submit button = primary style

## 🎬 Motion

- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (standard) or `cubic-bezier(0.16, 1, 0.3, 1)` (expressive)
- **Duration:** 200–400ms for UI; 600–900ms for hero/scroll-in
- **Patterns:**
  - Fade + 12px translate-up on section reveal
  - Subtle parallax on hero video / project images
  - Underline-grow on text links
  - Image zoom (1.05) on project card hover

## 📱 Breakpoints

```css
/* Mobile-first */
--bp-sm:  640px;
--bp-md:  768px;
--bp-lg:  1024px;
--bp-xl:  1280px;
--bp-2xl: 1536px;
```

## ♿ Accessibility minimums
- Body text contrast ratio ≥ 4.5:1
- Red (`#E30613`) on white passes AA for normal text — **but check on light gray**
- Focus visible rings on all interactive elements (red outline, 2px)
- Skip-to-content link
- Form inputs labeled, error messages programmatically associated
