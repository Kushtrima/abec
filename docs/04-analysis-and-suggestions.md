# ABEC PDF — Analysis & Suggestions

A complete review of the client PDF (`/reference/website-spec.pdf`) with recommendations before we start building.

---

## ✅ What's strong in the brief

1. **Clear 5-page architecture** — typical Swiss SME structure, easy to navigate.
2. **Strong narrative** — 20-year story, founder, Swiss craftsmanship — gives copywriters good hooks.
3. **Defined services** — three clear offerings, each with body + bullet list of Leistungen.
4. **Concrete trust signals** — testimonials, stats, project portfolio.
5. **CTA-driven** — every page ends in a contact/conversion banner. Good funnel design.

---

## ⚠️ Gaps / open questions to resolve with client

### Content gaps
| Gap | Impact | Suggestion |
|-----|--------|------------|
| Only **4 of 19 project tiles** have real data — the rest are placeholders. | Referenzen page looks empty without content. | Ask client to provide remaining 15 (title, Bauherr, m², 2-3 photos each). Or design the page to gracefully handle 4–6 instead of forcing 19. |
| No **business hours** stated (placeholder `[CLIENT] Business hours`). | Contact page incomplete. | Get hours, e.g. *Mo–Fr 08:00–17:00*. |
| No **social media links** in footer. | Reduces trust + reach. | Confirm if they have IG / LinkedIn / FB. |
| Hero **video** not provided. | Hero is half the homepage impact. | Either supply a 10–20s loop video, or design a strong static fallback. |
| Team photos are placeholders. | Über-uns page looks unfinished. | Schedule a short photo session, or use professional portraits. |
| Logo is **low-resolution PNG** (~14 KB). | Will look pixelated on retina, in print, in favicon. | Re-create or upgrade to **SVG**. Provide white version too for dark sections. |
| No **Impressum / Datenschutz** pages mentioned. | **Legally required in Switzerland (& Germany).** | Add `/impressum` and `/datenschutz` (or as footer links). I can scaffold templates. |
| No **cookie banner / privacy** approach. | Required if loading Google Maps, fonts, analytics. | Decide: minimal banner vs. full consent manager. |

### UX / structural gaps
| Issue | Suggestion |
|-------|------------|
| Project page has **no filter or category** for 19 projects. | Add filter: *Neubau · Sanierung · Design · Verputz*. Helps users + SEO. |
| Process section lacks visual identity (client noted this). | Use bold serif numerals (01/02/03) + small icons or process line graphic. |
| No **services landing teaser** on home links to specific service detail. | Link each service card → `/angebot#01-design-fassaden` (anchor) for deep-linking. |
| Testimonial section has only 3 cards — could be a slider. | Carousel-style on mobile, static 3-up on desktop. |
| No **"Karriere / Bewerbung"** page, but contact form has *Bewerbung* dropdown. | Either add a small careers section or remove the dropdown option. |
| **Über-uns** doesn't list certifications or memberships (typical for Swiss trades). | Ask if they have SUVA, SVDB, or other industry badges to display. |

### Technical / SEO gaps
- **No meta strategy** — needs page-by-page title + meta description.
- **No structured data** — should include `LocalBusiness` JSON-LD for Google rich results (address, phone, opening hours, area served).
- **No Open Graph / Twitter cards** — needed for WhatsApp / LinkedIn sharing previews.
- **No sitemap.xml / robots.txt** plan.
- **No analytics decision** — Plausible (privacy-friendly, GDPR-friendly) recommended over GA4 for Swiss/EU.

---

## 💡 Suggestions to elevate beyond the brief

1. **Real photography matters more than design tricks.** For a facade builder, the work IS the brand. Budget for a half-day shoot of completed projects (golden-hour drone + detail shots).
2. **Add a "before/after" slider** in Sanierung projects — extremely persuasive in this industry.
3. **Material library mini-section** on Angebot page — show actual stone/glass/render samples (close-up tiles). Differentiator.
4. **Quote form on services page**, not only on contact — capture leads at the moment of intent.
5. **Performance budget**: target Lighthouse 90+ on mobile. Heavy hero video can kill scores — preload poster, lazy-load video.
6. **i18n-ready from day one**, even if launching DE only. Swiss market often demands DE/FR/IT.
7. **Project case-study pages** (`/referenzen/[slug]`): each project gets its own page with full gallery, scope, Bauherr, materials, year. Big SEO benefit (each page targets long-tail queries).
8. **Schema-driven content** — store project + testimonial data in JSON/MDX so updates don't require code changes.
9. **CMS suggestion**: if client wants to self-edit, integrate **Sanity**, **Payload**, or **Decap CMS**. Otherwise keep it as a static codebase.
10. **Accessibility audit pre-launch** — hire ourselves to it, since Swiss regulations are getting stricter.

---

## 🚀 Tech stack recommendation (open for discussion)

**Recommended:** **Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion**

Reasons:
- Excellent SEO out of the box (SSR/SSG)
- Native image optimization (critical for a facade portfolio)
- App Router supports per-page metadata + structured data cleanly
- Tailwind matches the design tokens we'll define
- Easy Vercel deploy (or Netlify / self-host)

**Alternative (lighter):** Astro + minimal JS — even faster, perfect if no app-like interactivity is needed.

**CMS layer (optional):** Sanity if client wants to edit copy/projects themselves; otherwise everything in MDX/JSON.

---

## 📦 What's been set up so far

```
ABEC - Website/
├── assets/
│   ├── images/{hero,projects,team,services,about,partners,icons}/  ← each has README of expected files
│   ├── videos/        ← hero video lives here
│   ├── logos/         ← logo-abec.png (current, low-res)
│   └── fonts/         ← self-hosted webfonts
├── content/
│   ├── pages/         ← page-level copy (markdown/json)
│   ├── projects/      ← per-project data
│   └── testimonials/
├── docs/
│   ├── 01-sitemap.md
│   ├── 02-design-system.md
│   ├── 03-content-brief.md
│   └── 04-analysis-and-suggestions.md   (this file)
├── reference/
│   ├── website-spec.pdf       ← original client PDF
│   └── website-spec.pptx      ← original client PPTX
├── public/                     ← (for static framework output)
└── src/                        ← (source code, framework TBD)
```

---

## 🎯 Recommended next steps (in order)

1. **Confirm tech stack** (Next.js vs Astro vs other).
2. **Get final assets** from client: logo SVG, hero video, team photos, remaining project images.
3. **Resolve content gaps** above (especially: hours, social, full project list, legal pages).
4. **Initialize codebase** — install framework, set up design tokens, build component primitives.
5. **Build page by page** — Startseite first (highest impact, biggest design surface).
6. **Pre-launch:** SEO meta + structured data + Impressum + Datenschutz + cookie banner.
7. **QA on real devices** (especially Swiss-market common: Safari iOS, Chrome desktop).

> Send your content whenever you're ready — I'll start translating it into pages and components.
