# ABEC Website — Deployable Source

Static HTML / Tailwind / Vanilla JS site. **No build step required.**

## How to view locally
Just open `index.html` in your browser.

## How to deploy
Upload the **entire contents of this `src/` folder** to your web host.
Works on any static host: Hostpoint, Infomaniak, cPanel hosts, Netlify, Vercel, etc.

## Structure

```
src/
├── index.html           ← Startseite (Home)
├── ueber-uns.html       ← (coming)
├── angebot.html         ← (coming)
├── referenzen.html      ← (coming)
├── kontakt.html         ← (coming)
├── css/styles.css       ← custom styles (buttons, animations)
├── js/main.js           ← mobile menu, scroll, reveal
└── assets/
    ├── logo-abec.png    ← brand logo
    ├── hero-banner.webp ← hero banner image
    └── projects/        ← drop project images here (projekt-01.jpg etc)
```

## Replacing image placeholders

Project tiles, team photos, and process step images currently use placeholder `<div>`s.
To swap, just replace the div with an `<img>`:

```html
<!-- Before -->
<div class="placeholder-image aspect-[4/3]" data-label="Projekt 01"></div>

<!-- After -->
<img src="assets/projects/projekt-01.jpg" alt="Neubau Würenlos" class="aspect-[4/3] w-full object-cover" />
```
