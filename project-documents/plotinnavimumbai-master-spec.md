# PlotInNaviMumbai — Master Build Specification

**Document type:** Single source of truth for the implementing AI agent
**Consumes:** `requirements.md` (brand blueprint)
**Status:** Locked. Deviations require an entry in §2.
**Target stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · No database
**Last updated:** 12 August 2026

---

## 0. AGENT OPERATING RULES

Read this section before writing a single file. It governs everything below.

### 0.1 Authority order

When two instructions conflict, follow this order:

1. This document (`master-spec.md`)
2. `requirements.md` — brand philosophy, voice, principles
3. Framework defaults

`requirements.md` defines **what the brand is**. This document defines **what you build**. Where this document overrides `requirements.md`, the override is logged in §2 — do not "fix" it back.

### 0.2 Non-negotiable rules

| # | Rule |
|---|---|
| R1 | **No database.** No Prisma, no MongoDB, no Supabase, no ORM, no `/api/db`. Content lives in typed TypeScript files and MDX. |
| R2 | **No blue.** Not in the palette, not in default shadcn tokens, not in focus rings, not in link colours, not in SVG illustrations. Audit every generated component for leftover `blue-500`, `#3b82f6`, `sky-*`, `indigo-*`. |
| R3 | **Never invent facts.** No fake testimonials, no fake RERA/MMRDA numbers, no invented statistics, no "500+ happy families", no made-up awards, no placeholder phone numbers that look real. Use `TODO_CLIENT` markers and empty states. |
| R4 | **No dark patterns.** No countdown timers, no "only 2 plots left", no exit-intent popups, no forced modals, no guaranteed-return claims. |
| R5 | **Component-driven.** Every repeated visual unit is a component in `/components`. No copy-pasted JSX blocks across pages. |
| R6 | **Content is data.** No hardcoded property details, testimonials, FAQs, or service copy inside page components. Everything is imported from `/content`. |
| R7 | **Server Components by default.** Add `"use client"` only where interactivity genuinely requires it. Every client component must be justifiable in one sentence. |
| R8 | **Copy is written, not generated.** Use the copy in §16 verbatim. Do not "improve" it with marketing language. |

### 0.3 Execution protocol

- Build in the phase order of §14. Do not skip ahead.
- At the end of each phase, run the phase's acceptance checklist. Report pass/fail per item. Do not begin the next phase with failures open.
- After every phase: `npm run build` must pass with zero TypeScript errors and zero ESLint errors.
- When something in this spec is genuinely ambiguous, **stop and ask** — do not guess and do not invent a third option.
- Never install a package that is not listed in §3.3 without asking first.

### 0.4 What "done" means for a component

A component is done when: it renders correctly at 360px / 768px / 1440px, it has no layout shift on load, its interactive elements are keyboard-reachable with a visible focus ring, its images have real alt text, and it respects `prefers-reduced-motion`.

---

## 1. PROJECT BRIEF

**Business:** PlotInNaviMumbai — a property advisory practice specialising in plots and land across Navi Mumbai.

**What the site is:** The digital home of a trusted property advisor. Not a listing marketplace.

**Primary conversion:** A conversation — WhatsApp, phone, video call, or a Family Property Tour. Not a form submission, not a "book now".

**Core philosophy:** Trust before transaction. The site earns the right to a conversation; it does not chase one.

**Audience:** First-time buyers, families, investors, NRIs, business owners, HNIs — mostly on mobile, mostly in Mumbai / Navi Mumbai, plus NRI traffic from the Gulf, US and UK.

**Geographic focus (use these real node names throughout — they carry the local SEO):**
Ulwe · Kharghar · Panvel · Taloja · Dronagiri · Karanjade · New Panvel · Kalamboli

**The one-line definition:**
> Build PlotInNaviMumbai as a premium, human-first property advisory experience for Navi Mumbai land buyers — designed not to sell plots, but to earn enough trust that a visitor wants to talk to a real person before making an important decision.

**The test before you ship anything (from `requirements.md` §75):**
1. Does it look like a normal real estate website? → If yes, redesign.
2. Does it feel like someone is selling to me? → If yes, reduce pressure.
3. Can I understand the brand in seconds? → If no, simplify.
4. Would I feel comfortable contacting them? → If no, improve the human connection.

---

## 2. DEVIATIONS FROM `requirements.md` — APPROVED

These are deliberate. Do not revert them.

### D1 — Brand colour is NOT sky blue

`requirements.md` §15 and §77 specify sky blue. **Overridden by the client.**

Reason: blue is the default of every property portal in India (99acres, MagicBricks, Housing, NoBroker) and directly conflicts with `requirements.md` §75 Q1 — "does it look like a normal real estate website?" The replacement palette (§5.1) is built on deep forest green, which signals growth and land, is warmer and more human than blue, and is genuinely uncommon in Indian real estate.

Wherever `requirements.md` says "sky blue", read "Canopy green" (`#1E4D3A`).

### D2 — No database, no admin panel in v1

`requirements.md` §52 and §67 describe a database and an admin CMS. **Overridden by the client.**

v1 is a fully static site. Properties, testimonials, FAQs and blog posts live in version-controlled files (§6). Content updates ship via a git commit and an automatic redeploy.

This is not a downgrade — for a curated portfolio of 10–40 plots it is faster, cheaper, better for SEO, and has no attack surface. The data layer in §6 is deliberately shaped like a repository so that a CMS (Sanity, Payload, or a Laravel API) can be dropped in later by changing one file.

### D3 — Leads go to WhatsApp, not a leads table

`requirements.md` §53 describes lead storage. Replaced by the WhatsApp flow in §9, with an optional email fallback so no lead is silently lost.

### D4 — Testimonials ship empty

`requirements.md` §37 forbids fake testimonials. Therefore the "Stories of Trust" section ships with a designed empty state and zero entries until the client supplies real, attributable ones. Do not fill it with samples that could reach production.

---

## 3. TECH STACK — LOCKED

### 3.1 Core

| Package | Version | Note |
|---|---|---|
| next | `16.3.x` | App Router, Turbopack default |
| react / react-dom | `19.2.x` | |
| typescript | `5.x` | `strict: true`, no `any` |
| tailwindcss | `4.3.x` | CSS-first config via `@theme` — there is **no** `tailwind.config.js` |
| Node | `>=20` | required by Next 16 |

### 3.2 Scaffold command

```bash
npx create-next-app@latest plotinnavimumbai \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd plotinnavimumbai
npx shadcn@latest init
```

### 3.3 Approved dependencies — nothing else without asking

| Package | Purpose |
|---|---|
| `shadcn` (CLI) | Component primitives — copied in, fully ownable |
| `lucide-react` | Icons (ships with shadcn) |
| `zod` | Content schema validation + form validation |
| `react-hook-form` + `@hookform/resolvers` | Contact / tour forms |
| `motion` | Scroll reveals and hero motion **only** — see §5.6 |
| `@next/mdx` (or `next-mdx-remote`) | Blog posts |
| `gray-matter` | MDX frontmatter |
| `resend` | Optional lead-email fallback (§9.5) |

**Explicitly banned:** any UI kit (MUI, Chakra, Mantine, Ant, Bootstrap), any carousel library (build with CSS scroll-snap), `moment`, `lodash`, `axios`, any analytics SDK heavier than 3kb, any AI-image package.

### 3.4 On the "download a theme" instruction

Every open-source Next.js real-estate theme currently on GitHub is one of: abandoned (last push 2021–2024), unlicensed, or built around MongoDB + auth + a bookings table — the exact architecture this project rejects. Adopting one would mean deleting 70% of it and fighting the remaining 30%, and every one of them produces the generic portal look that `requirements.md` §75 explicitly fails.

**So the base is `shadcn/ui` (MIT, copy-in, no runtime lock-in) plus the custom token layer in §5.** shadcn gives production-grade accessible primitives — dialog, accordion, form, sheet, tabs — and because the components are copied into the repo, re-theming is a token change rather than a CSS fight.

Install these blocks after `init`:

```bash
npx shadcn@latest add button card accordion dialog sheet form input textarea select label badge separator tabs sonner
```

Then immediately do the token surgery in §5.7 — shadcn's defaults are blue-adjacent and must be replaced before any component is used.

---

## 4. REPOSITORY STRUCTURE

Create exactly this. Do not add folders that are not here.

```
src/
├── app/
│   ├── layout.tsx                       # fonts, <html lang="en-IN">, Header, Footer, JSON-LD
│   ├── page.tsx                         # Home
│   ├── globals.css                      # Tailwind v4 @theme tokens (§5.7)
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx              # next/og default OG card
│   ├── not-found.tsx
│   ├── properties/
│   │   ├── page.tsx                     # /properties — all plots + filters
│   │   └── [node]/
│   │       ├── page.tsx                 # /properties/ulwe — node landing (SEO)
│   │       └── [slug]/page.tsx          # /properties/ulwe/sector-19-plots
│   ├── why-we-exist/page.tsx
│   ├── services/page.tsx
│   ├── family-property-tour/page.tsx
│   ├── investment-guide/page.tsx
│   ├── stories-of-trust/page.tsx
│   ├── faq/page.tsx
│   ├── insights/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── privacy-policy/page.tsx
│   └── terms/page.tsx
│
├── components/
│   ├── layout/         Header, MobileNav, Footer, StickyContactBar, Container, Section
│   ├── home/           Hero, RealProblem, WhyWeExist, OurPromise, HowWeGuideYou,
│   │                   CuratedPlots, FamilyTourInvite, FounderNote, TrustStories
│   ├── property/       PropertyCard, PropertyGrid, PropertyFilters, PropertyGallery,
│   │                   VerificationRecord, PropertyFit, WhyWeLikeThis, PropertyMeta,
│   │                   NearbyLandmarks, PropertyEnquiryPanel
│   ├── shared/         SectionHeading, Eyebrow, PlotGrid, Reveal, Prose, EmptyState,
│   │                   Breadcrumbs, StatusPill, FAQAccordion
│   ├── forms/          ConsultationForm, TourRequestForm, PropertyEnquiryForm, FormField
│   ├── whatsapp/       WhatsAppButton, WhatsAppFloat
│   ├── seo/            JsonLd
│   └── ui/             (shadcn — do not hand-edit except tokens)
│
├── content/
│   ├── properties/     index.ts, ulwe-sector-19.ts, …   (one file per plot)
│   ├── nodes.ts        Ulwe, Kharghar, Panvel, Taloja, Dronagiri…
│   ├── services.ts
│   ├── faqs.ts
│   ├── promises.ts
│   ├── process.ts      the 6 guidance steps
│   ├── testimonials.ts (ships as an empty array — see D4)
│   ├── site.ts         brand constants, contact details, nav
│   └── insights/       *.mdx blog posts
│
├── lib/
│   ├── schemas.ts      zod schemas for every content type
│   ├── properties.ts   getAllProperties, getPropertyBySlug, getByNode, filters
│   ├── whatsapp.ts     deep-link builder + Cloud API client
│   ├── metadata.ts     buildMetadata() helper
│   ├── jsonld.ts       structured-data builders
│   ├── analytics.ts    track()
│   └── utils.ts        cn()
│
├── actions/
│   └── submit-enquiry.ts   'use server' — the only server mutation in the app
│
└── types/
    └── index.ts
```

---

## 5. DESIGN SYSTEM

### 5.1 Colour

**Direction:** a near-monochrome forest-green system on paper-white, with one bright growth-green accent used sparingly, and a single warm sand tone reserved for the human/story sections. Land, not luxury. Growth, not gold.

Every value is fixed. Do not introduce shades outside this table.

| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#12261D` | Headings, body text on light. Never pure black. |
| `--color-canopy` | `#1E4D3A` | Primary brand. Buttons, links, dark section backgrounds. |
| `--color-moss` | `#3D6B54` | Secondary text on dark, icon strokes, hover states. |
| `--color-sprout` | `#83A83B` | **Accent — use sparingly.** Verified marks, active states, key underlines, step numbers. |
| `--color-paper` | `#FAFAF7` | Page background. |
| `--color-panel` | `#EFF1EA` | Alternating section background, cards on paper. |
| `--color-sand` | `#E8E2D5` | **Once per page maximum.** Founder letter / story sections only. |
| `--color-line` | `#D6DACD` | Hairlines, borders, the plot-grid motif. |
| `--color-muted` | `#5C6B60` | Secondary text, captions, meta. |
| `--color-amber` | `#A66A16` | "Under review" / pending status only. Never decorative. |
| `--color-white` | `#FFFFFF` | Cards on panel, text on canopy. |

**Rules**
- Sprout green (`#83A83B`) covers **less than 3% of any screen**. It is a highlight, not a colour scheme. If a section looks green-and-lime, you have overused it.
- Sand (`#E8E2D5`) appears at most once per page. It marks human/personal content only.
- Body text on paper is `--color-ink` (contrast 13.9:1). Muted text is `--color-muted` (contrast 5.4:1) and is never used below 14px.
- Buttons: `--color-canopy` background + white text (contrast 8.4:1).
- Focus ring: `2px solid --color-sprout` with `2px` offset. **Never blue.**
- Status colours: Verified → canopy; Under review → amber; Not applicable → muted. Never red/green traffic-light chips.

### 5.2 Typography

| Role | Face | Why |
|---|---|---|
| Display (h1, h2, hero) | **Bricolage Grotesque** | Variable optical sizing. Warm and characterful at large sizes, restrained at small — friendly premium without the fashion-serif cliché every AI site reaches for. |
| Body & UI | **IBM Plex Sans** | Humanist, unusually readable on Indian mobile screens, and it has a matching Devanagari family for a future Marathi/Hindi version. |
| Data & labels | **IBM Plex Mono** | Carries the signature device (§5.5). Plot sizes, prices, survey references, verification dates, section eyebrows. |

Load via `next/font/google` in `layout.tsx` with `display: 'swap'` and subsets `['latin']`. Expose as `--font-display`, `--font-sans`, `--font-mono`.

**Scale** (mobile → desktop, `clamp()`):

| Level | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Hero h1 | `clamp(2.25rem, 6vw, 4.25rem)` | 500 | `-0.03em` | 1.05 |
| h2 | `clamp(1.75rem, 4vw, 2.75rem)` | 500 | `-0.02em` | 1.15 |
| h3 | `clamp(1.25rem, 2.5vw, 1.625rem)` | 500 | `-0.01em` | 1.25 |
| Lead | `clamp(1.0625rem, 1.6vw, 1.25rem)` | 400 | `0` | 1.6 |
| Body | `1rem` / `1.0625rem` desktop | 400 | `0` | 1.7 |
| Small | `0.875rem` | 400 | `0` | 1.6 |
| Eyebrow / data | `0.75rem` mono | 500 | `0.12em` | 1.4, uppercase |

**Rules**
- Body copy max width `68ch`. Lead paragraphs `54ch`. Never full-bleed text.
- Headings are sentence case. **Never Title Case, never ALL CAPS** except mono eyebrows.
- No text over a busy image without a scrim (`bg-ink/55` minimum).
- Minimum body size on mobile is 16px. Never smaller.

### 5.3 Spacing, radius, elevation

- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px. Nothing off-scale.
- **Section rhythm:** `py-20` mobile, `py-28` tablet, `py-32` desktop. Use the `<Section>` component so this is never hand-typed.
- **Container:** max-width `1200px`, padding `20px` mobile / `32px` desktop. Use `<Container>`.
- **Radius:** `--radius-sm: 4px` (pills, inputs), `--radius: 8px` (cards, buttons), `--radius-lg: 16px` (feature panels, images). Nothing fully rounded except avatars and the WhatsApp float.
- **Elevation:** almost none. Depth comes from `1px solid --color-line`, not shadows. Only two shadows exist:
  - `--shadow-card`: `0 1px 2px rgb(18 38 29 / 0.04), 0 4px 12px rgb(18 38 29 / 0.05)` (hover only)
  - `--shadow-float`: `0 4px 16px rgb(18 38 29 / 0.18)` (WhatsApp float, mobile bar)

  No glows, no coloured shadows, no glassmorphism.

### 5.4 Imagery

- All images through `next/image`. Explicit `width`/`height` or `fill` + `sizes`. `priority` on the hero image **only**.
- Formats: AVIF then WebP. Quality 80. Below-fold images lazy by default.
- **Never generate or use AI-looking stock renders of glass towers.** Navi Mumbai land looks like: open plots with boundary markers, laid-out sector roads, the Kharghar hills, mangroves, under-construction infrastructure, the Atal Setu approach, families walking a site.
- Ship with a `TODO_CLIENT` manifest at `/public/images/README.md` listing every image slot and what the client must supply. Use neutral placeholder greys with correct aspect ratios in the meantime — not stock photos that could reach production.
- Alt text describes the specific place: `"Boundary-marked residential plot in Sector 19, Ulwe, with the approach road visible"` — not `"property image"`.

### 5.5 The signature device — "The Plot Record"

This is the one memorable element. Everything else stays quiet.

These are land parcels, and land parcels come with records — survey references, sector numbers, plot areas, approval status, a date somebody last checked. The site treats that record as its visual language instead of hiding it behind marketing badges.

**Three expressions, and no more:**

**(a) The record strip.** Every property card and detail page carries a mono-set strip that reads like a line from a land record, not a badge row:

```
NODE ULWE · SEC 19   ·   PLOT 1,250 SQ FT   ·   RERA VERIFIED   ·   CHECKED 04 AUG 2026
```

Set in IBM Plex Mono, `0.75rem`, uppercase, `0.12em` tracking, `--color-muted`, separated by `·`. Status words take their colour from §5.1. A hairline `--color-line` sits above it. This strip is the most important trust element on the site — it makes verification look like a record, which is exactly what it is.

**(b) The plot grid.** A background motif of 1px `--color-line` rules on a 48px grid, at 40% opacity, with two or three cells outlined slightly heavier to read as plot boundaries. Rendered as an inline SVG in `<PlotGrid />`. Appears behind the hero and behind at most **two** other sections per page. Absolutely positioned, `aria-hidden`, `pointer-events-none`.

**(c) Sector eyebrows.** Section labels are set like plan annotations — mono, uppercase, tracked, prefixed with a thin `--color-sprout` 24px rule:

```
──  HOW WE GUIDE YOU
```

**Do not** extend the device further. No blueprint textures, no fake surveyor's tools, no compass roses, no animated grid lines.

### 5.6 Motion

Motion budget: **one orchestrated moment on load, one reveal pattern on scroll, quiet hovers.** Nothing else.

- **Hero on load:** a single staggered sequence — eyebrow, headline lines, lead, CTAs — 60ms apart, `opacity 0→1` + `translateY 12px→0`, 500ms, `cubic-bezier(0.16, 1, 0.3, 1)`. Runs once.
- **Scroll reveal:** `<Reveal>` wraps section content. `opacity 0→1` + `translateY 16px→0`, 500ms, triggered by IntersectionObserver at `rootMargin: '-10% 0px'`, `once: true`. Never staggers more than 4 children.
- **Hover:** cards lift `translateY(-2px)` and gain `--shadow-card` over 200ms. Images scale to `1.03` over 400ms inside `overflow-hidden`. Buttons darken. That's all.
- **Banned:** parallax, counters that tick up, typewriter text, marquees, page-load spinners, scroll-jacking, anything over 600ms, anything that moves more than 24px.
- **`prefers-reduced-motion: reduce` disables all of it.** Content renders at final state immediately. Hard requirement — test it.

`motion` is imported **only** in `Hero` and `Reveal`. Everywhere else, use CSS transitions.

### 5.7 Token implementation — `src/app/globals.css`

Write this file first, before any component.

```css
@import "tailwindcss";

@theme {
  /* colour */
  --color-ink:    #12261D;
  --color-canopy: #1E4D3A;
  --color-moss:   #3D6B54;
  --color-sprout: #83A83B;
  --color-paper:  #FAFAF7;
  --color-panel:  #EFF1EA;
  --color-sand:   #E8E2D5;
  --color-line:   #D6DACD;
  --color-muted:  #5C6B60;
  --color-amber:  #A66A16;

  /* type */
  --font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  --font-sans:    var(--font-plex-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono:    var(--font-plex-mono), ui-monospace, monospace;

  /* radius */
  --radius-sm: 4px;
  --radius:    8px;
  --radius-lg: 16px;

  /* elevation */
  --shadow-card:  0 1px 2px rgb(18 38 29 / 0.04), 0 4px 12px rgb(18 38 29 / 0.05);
  --shadow-float: 0 4px 16px rgb(18 38 29 / 0.18);

  /* motion */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}

/* shadcn variable bridge — REPLACES the default blue-adjacent palette */
:root {
  --background: var(--color-paper);
  --foreground: var(--color-ink);
  --card: #FFFFFF;
  --card-foreground: var(--color-ink);
  --primary: var(--color-canopy);
  --primary-foreground: #FFFFFF;
  --secondary: var(--color-panel);
  --secondary-foreground: var(--color-ink);
  --muted: var(--color-panel);
  --muted-foreground: var(--color-muted);
  --accent: var(--color-sprout);
  --accent-foreground: var(--color-ink);
  --border: var(--color-line);
  --input: var(--color-line);
  --ring: var(--color-sprout);
  --destructive: var(--color-amber);
}

@layer base {
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
  body {
    background: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  h1, h2, h3, h4 { font-family: var(--font-display); font-weight: 500; }
  :focus-visible {
    outline: 2px solid var(--color-sprout);
    outline-offset: 2px;
    border-radius: 2px;
  }
  ::selection { background: var(--color-sprout); color: var(--color-ink); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Immediately after writing this, grep the repo for `blue`, `sky-`, `indigo-`, `#3b82f6` and remove every hit.**

---

## 6. CONTENT LAYER — NO DATABASE

### 6.1 Principle

Content is typed data in git. Every content type has a zod schema; `getX()` functions in `/lib` are the only way pages read content. Pages never import a content file directly. When a CMS is added later, only `/lib/properties.ts` changes.

### 6.2 Types — `src/types/index.ts`

```ts
export type VerificationStatus = 'verified' | 'under-review' | 'applicable' | 'not-applicable';
export type PropertyType = 'residential-plot' | 'commercial-plot' | 'na-plot' | 'farmhouse-plot';
export type Availability  = 'available' | 'few-remaining' | 'sold-out';

export interface Property {
  slug: string;                  // 'sector-19-residential-plots'
  node: string;                  // 'ulwe' — must match a Node.slug
  name: string;
  tagline: string;               // one honest line, max 90 chars
  type: PropertyType;
  availability: Availability;

  plotSizes: { label: string; sqft: number; sqm?: number }[];
  priceFrom?: number;            // INR, absolute. undefined => "Price on request"
  priceTo?: number;
  priceNote?: string;            // 'Excluding registration and stamp duty'

  location: {
    sector?: string;
    landmark: string;
    lat?: number;
    lng?: number;
    mapEmbedUrl?: string;
  };

  overview: string[];            // 2–4 plain paragraphs
  highlights: string[];          // 3–6 short factual points
  amenities: string[];
  nearby: { name: string; distanceKm: number; type: 'transport'|'education'|'health'|'retail'|'civic' }[];
  connectivity: string[];

  verification: {
    rera:  { status: VerificationStatus; reference?: string };
    mmrda: { status: VerificationStatus; reference?: string };
    documents: VerificationStatus;
    lastCheckedISO: string;      // '2026-08-04'
  };

  whyWeLikeThis?: { points: string[]; suitsWho: string[] };  // honest, no returns promised
  fit?: { profile: string; note: string }[];                 // 'First-time buyer' -> why

  images: { src: string; alt: string; caption?: string }[];
  brochureUrl?: string;
  masterPlanUrl?: string;
  notes?: string[];

  seo: { title: string; description: string };
  isSample?: boolean;            // MUST be absent/false in production — see 6.5
  published: boolean;
}
```

### 6.3 Zod schemas — `src/lib/schemas.ts`

Mirror every interface above with a zod schema and validate at module load in `content/properties/index.ts`. A malformed property must fail `npm run build`, not render broken in production.

```ts
export const propertySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  node: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(3).max(80),
  tagline: z.string().max(90),
  // …
  verification: z.object({
    rera:  z.object({ status: verificationStatus, reference: z.string().optional() }),
    mmrda: z.object({ status: verificationStatus, reference: z.string().optional() }),
    documents: verificationStatus,
    lastCheckedISO: z.string().date(),
  }),
  seo: z.object({ title: z.string().max(60), description: z.string().min(70).max(160) }),
  published: z.boolean(),
});
```

Note the SEO length constraints are enforced by the schema — the agent cannot ship a 200-character meta description.

### 6.4 Data access — `src/lib/properties.ts`

```ts
getAllProperties(): Property[]                    // published only, sorted by node then name
getPropertyBySlug(node, slug): Property | null
getPropertiesByNode(node): Property[]
getFeaturedProperties(limit = 3): Property[]
getAllNodes(): Node[]
filterProperties(all, filters): Property[]        // pure function, runs client-side
```

`filterProperties` is a **pure function** so the Properties page can filter on the client without a round trip. Filters: `node`, `type`, `minPrice`, `maxPrice`, `minSqft`, `maxSqft`, `availability`, `reraVerifiedOnly`, `query` (matches name + landmark + sector).

### 6.5 The sample-data guard — required

The agent needs data to build against, and that data must never reach production.

1. Seed 4–6 properties in `content/properties/` with `isSample: true` and names clearly marked `[SAMPLE]`.
2. Add `scripts/check-content.ts` that throws if any property with `isSample: true` is also `published: true`, or if `NODE_ENV === 'production'` and any sample exists.
3. Wire it: `"prebuild": "tsx scripts/check-content.ts"`.

The production build physically cannot ship sample plots. Same guard for testimonials.

### 6.6 Site constants — `src/content/site.ts`

```ts
export const site = {
  name: 'PlotInNaviMumbai',
  legalName: 'TODO_CLIENT',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://plotinnavimumbai.com',
  tagline: 'Honest guidance on land in Navi Mumbai',
  description: '…',                        // 155 chars, see §11
  phone: process.env.NEXT_PUBLIC_PHONE ?? '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',  // E.164, no '+'
  email: 'TODO_CLIENT',
  address: { street: 'TODO_CLIENT', locality: 'TODO_CLIENT', city: 'Navi Mumbai',
             region: 'Maharashtra', postalCode: 'TODO_CLIENT', country: 'IN' },
  reraRegistration: 'TODO_CLIENT',         // render only if present — never fabricate
  social: { instagram: '', youtube: '', linkedin: '' },
  nav: [
    { label: 'Properties',           href: '/properties' },
    { label: 'Why we exist',         href: '/why-we-exist' },
    { label: 'Services',             href: '/services' },
    { label: 'Family Property Tour', href: '/family-property-tour' },
    { label: 'Insights',             href: '/insights' },
    { label: 'Contact',              href: '/contact' },
  ],
} as const;
```

Anything reading `TODO_CLIENT` must render nothing (not the literal string). Add a dev-only console warning listing unfilled fields.

---

## 7. COMPONENT INVENTORY

Build in this order. Each entry is a contract — match the props exactly.

### 7.1 Layout primitives (build first)

| Component | Props | Notes |
|---|---|---|
| `Container` | `children, className?` | max-w-[1200px], responsive padding. Never hand-write container classes anywhere else. |
| `Section` | `children, tone?: 'paper'\|'panel'\|'sand'\|'canopy', grid?: boolean, id?, className?` | Owns vertical rhythm. `grid` renders `<PlotGrid/>` behind. `tone='canopy'` flips text to white automatically. |
| `Eyebrow` | `children` | Mono rule + uppercase label (§5.5c). |
| `SectionHeading` | `eyebrow?, title, lead?, align?: 'left'\|'center'` | The only way headings are rendered. Default align left — centre only on Hero and CTA sections. |
| `Reveal` | `children, delay?: number` | Client component. IntersectionObserver + motion. Respects reduced motion. |
| `PlotGrid` | `variant?: 'light'\|'dark'` | Inline SVG motif. `aria-hidden`, `pointer-events-none`, absolute. |
| `Prose` | `children` | Long-form typography wrapper for MDX and legal pages. |
| `EmptyState` | `title, description, action?` | Used by testimonials, empty filter results, empty blog. Designed, not apologetic. |
| `Breadcrumbs` | `items: {label, href?}[]` | Renders visible trail + emits BreadcrumbList JSON-LD. |
| `StatusPill` | `status: VerificationStatus, label: string` | Mono, uppercase, colour per §5.1. No icons except a 12px check for `verified`. |

### 7.2 Header / Footer

**`Header`** — Server component wrapping a small client shell.
- Transparent over the hero, then on scroll >80px: `bg-paper/92`, `backdrop-blur-sm`, `border-b border-line`. One state change only, no shrink animation.
- Desktop: wordmark left, nav centre-right, one CTA button right ("Talk to us").
- Mobile: wordmark + hamburger → `Sheet` from shadcn, full height, nav items at 20px, WhatsApp and Call buttons pinned at the bottom of the sheet.
- Max 6 nav items (§site.nav). No mega-menu. No dropdowns.
- Active route gets a 2px `--color-sprout` underline.

**`Footer`** — `tone='canopy'` (dark green).
- Row 1: wordmark + the brand line — *"Built on trust. Guided by honesty. Focused on your future."*
- Row 2: four columns — Explore / Properties by node / Company / Contact. The node column links `/properties/ulwe`, `/properties/kharghar` etc. — real internal-linking value.
- Row 3: address, phone, email, RERA registration **only if `site.reraRegistration` is set**.
- Row 4: © year, Privacy, Terms, and a one-line honest disclaimer (§16.10).

**`StickyContactBar`** — mobile only (`<768px`), fixed bottom, two buttons: "WhatsApp" (canopy) and "Call" (outline). `env(safe-area-inset-bottom)` padding. Hidden when a form field has focus. This replaces the floating bubble on mobile.

**`WhatsAppFloat`** — desktop only, bottom-right, 56px, canopy background. Appears after 25% scroll depth. No auto-open bubble, no fake "1 unread" badge, no notification sound.

### 7.3 `PropertyCard` — the most-reused component

Structure, top to bottom:

```
┌─────────────────────────────────┐
│ [image 4:3, hover scale 1.03]   │  availability pill top-left if 'few-remaining'
├─────────────────────────────────┤
│ ULWE · SECTOR 19        (mono)  │  ← location eyebrow
│ Sector 19 Residential Plots     │  ← h3, display face
│ Open plots with clear access…   │  ← tagline, 2 lines max, muted
│                                 │
│ ₹42L – ₹68L      1,250–2,400 sqft │  ← price mono, size mono right
├─────────────────────────────────┤
│ RERA VERIFIED · CHECKED 04 AUG  │  ← THE RECORD STRIP (§5.5a)
└─────────────────────────────────┘
```

- Entire card is one `<Link>`. No nested interactive elements — no "Enquire" button inside the card (that violates the no-pressure principle and breaks keyboard semantics).
- `bg-white`, `border border-line`, `rounded-[--radius]`. Hover: `-translate-y-0.5` + `--shadow-card`.
- Price formatting: Indian short form via a shared `formatINR()` — `₹42L`, `₹1.2Cr`. If `priceFrom` is undefined → `Price on request`. Never `₹0`.
- `sold-out` cards render at 60% opacity with a mono `SOLD OUT` pill and remain linkable.

### 7.4 `VerificationRecord` — the trust centrepiece (detail page)

A bordered panel, `bg-panel`, styled like a record extract — **not** a badge grid.

```
──  VERIFICATION RECORD

RERA STATUS          Verified          P5170000XXXXX
MMRDA STATUS         Applicable        —
LEGAL DOCUMENTS      Verified          —
PROJECT STATUS       Ongoing           —

Last checked by our team on 04 August 2026.
Approval status can change. We re-check before every site visit and
will share the current documents with you directly.
```

- Two-column definition list, mono values, hairline between rows.
- Reference numbers render **only when present in the data**. Never a placeholder.
- The closing note is mandatory and must not be softened or removed — it is what makes the section honest rather than a claim.
- If every status is `not-applicable`, render the panel with an explanation instead of hiding it.

### 7.5 Remaining property components

| Component | Behaviour |
|---|---|
| `PropertyGrid` | 1 col mobile / 2 tablet / 3 desktop, `gap-6`. Renders `EmptyState` when `properties.length === 0`. |
| `PropertyFilters` | Client. Search input (wide, prominent, top), then node / type / budget / size / verified-only. Desktop: sticky left rail. Mobile: a "Filters" button opening a `Sheet`, with an active-filter count badge. Syncs to URL search params so filtered views are shareable. Includes a visible "Clear all". |
| `PropertyGallery` | Client. Main image + thumbnail strip. CSS scroll-snap, arrow-key navigation, `Dialog` lightbox. No third-party carousel. |
| `WhyWeLikeThis` | `tone='sand'` panel. Bullets from `whyWeLikeThis.points` + a "This may suit" list. Renders nothing if the field is absent — never invent reasons. |
| `PropertyFit` | 2–4 profile chips ("First-time buyer", "Long-term investor", "NRI buyer") each with one honest sentence. |
| `NearbyLandmarks` | Grouped by type with distances in mono. Distances come from data only — never estimated by the agent. |
| `PropertyEnquiryPanel` | Sticky sidebar on desktop (`top-24`), inline block after the gallery on mobile. Contains: price, plot sizes, WhatsApp button with property-specific prefilled message, Call button, "Request a Family Property Tour" link. Maximum three actions. |

### 7.6 Home section components

One component per section in `components/home/`, each self-contained and importing its own content. `page.tsx` is then just a readable stack of nine components — no logic.

---

## 8. PAGE SPECIFICATIONS

Copy for every section lives in §16. Do not write new copy.

### 8.1 Home — `/`

Nine sections, in this exact order. This order is the emotional arc from `requirements.md` §60 and must not be rearranged.

| # | Section | Tone | Purpose | Key content |
|---|---|---|---|---|
| 1 | `Hero` | paper + grid | "This feels different" | H1, lead, two CTAs, one real Navi Mumbai image, node list |
| 2 | `RealProblem` | panel | "They understand my problem" | 4 honest frictions buyers actually face |
| 3 | `WhyWeExist` | paper | "They seem honest" | Purpose statement + link to full page |
| 4 | `OurPromise` | canopy (dark) | Commitment | The 8 promises, 2-col mono-numbered list |
| 5 | `HowWeGuideYou` | paper + grid | "They have a real process" | 6 numbered steps — numbering is meaningful here |
| 6 | `CuratedPlots` | panel | "Let me look" | Exactly 3 `PropertyCard`s + "See all plots" |
| 7 | `FounderNote` | sand | Human connection | Short first-person extract + link to the full letter |
| 8 | `TrustStories` | paper | Social proof | Real testimonials, or `EmptyState` (see D4) |
| 9 | `FamilyTourInvite` | canopy | The single ask | One CTA — WhatsApp. Nothing else on screen. |

**CTA discipline:** primary CTAs appear in section 1 and section 9 only. Sections 2–8 end with a quiet text link at most. `requirements.md` §31 is explicit — a CTA after every section creates the desperate feeling the brand is built to avoid.

### 8.2 Properties — `/properties`

- Compact header: h1 + one lead line + result count in mono (`24 PLOTS ACROSS 6 NODES`).
- Search bar full-width and prominent, directly under the header.
- Filters per §7.5. Sort: Newest / Price low→high / Price high→low / Plot size.
- Grid of `PropertyCard`. No pagination below 40 properties.
- Below the grid: a node index — text links to each `/properties/[node]` page, for crawlability.
- Empty state: "No plots match these filters" + a "Clear filters" action + a WhatsApp line offering to look for something specific. **Never** show unrelated plots as a consolation.

### 8.3 Node landing — `/properties/[node]`

`generateStaticParams` from `nodes.ts`. This is the local-SEO workhorse — one page per node.

Sections: breadcrumb → h1 `Plots in Ulwe, Navi Mumbai` → 2–3 paragraphs of genuine, specific context about that node (connectivity, what's being built, who typically buys there — from `nodes.ts`, written by a human, not generated) → `PropertyGrid` for that node → "How we check plots in this area" → other nodes → CTA.

Metadata title: `Plots in Ulwe, Navi Mumbai | PlotInNaviMumbai`

### 8.4 Property detail — `/properties/[node]/[slug]`

`generateStaticParams` over all published properties. `notFound()` on unknown slug.

Order: Breadcrumbs → `PropertyGallery` → header (name, location, tagline) → the record strip → two-column layout: **left** (overview, highlights, `WhyWeLikeThis`, `VerificationRecord`, amenities, `NearbyLandmarks`, connectivity, map, brochure/master-plan downloads, notes) / **right** (`PropertyEnquiryPanel`, sticky) → "Other plots in this node" → CTA.

Mobile: single column; the enquiry panel moves directly under the gallery.

Every property page emits `RealEstateListing` + `BreadcrumbList` JSON-LD (§11.3).

### 8.5 Why we exist — `/why-we-exist`

Story structure, not a company page: The problem we noticed → Why a land decision matters → What we believe → How we work differently → Our promise → **A letter from the founder** (first person, `tone='sand'`, signed with a real name once the client provides it) → Our long-term vision → CTA.

### 8.6 Services — `/services`

Organised around the buyer's need, not a service list. Cards from `services.ts`: title, who it's for, what actually happens, what it does **not** include.

**Legal wording is mandatory and non-negotiable** (`requirements.md` §35): the business coordinates with qualified professionals; it does not provide legal advice. Use the exact phrasing in §16.7. Do not rewrite it.

### 8.7 Family Property Tour — `/family-property-tour`

The conversion page. What it is → what it is not (a sales meeting) → the six stages → what to bring → how long it takes → who comes along → FAQ → `TourRequestForm` + WhatsApp.

Explicit, prominent line: **"There is no obligation to buy anything, and no charge for the visit."**

### 8.8 Investment guide — `/investment-guide`

Useful but deliberately not exhaustive (`requirements.md` §36): what to check before buying land, why location matters, why documentation matters, aligning budget with goal, why the right plot differs per person. Ends by pointing to a conversation for anything personal.

**Never** include projected returns, appreciation percentages, or "best time to buy" claims.

### 8.9 Stories of Trust · FAQ · Insights · Contact · Legal

- **Stories of Trust** — real testimonials only; ships as `EmptyState` (D4).
- **FAQ** — shadcn `Accordion` from `faqs.ts`, grouped into Getting started / Site visits / Documentation / NRI buyers. Emits `FAQPage` JSON-LD.
- **Insights** — MDX list + detail. Frontmatter: `title, description, date, author, tags, image, readingTime`. Article JSON-LD. No AI-written posts shipped without the client reading them — mark drafts `published: false`.
- **Contact** — h1 *"Let's start with a conversation"*. Four contact methods as equal cards (WhatsApp / Call / Video call / Meet in person), then the short form, then office address + map. Form fields per `requirements.md` §40 only. Nothing extra.
- **Privacy Policy / Terms** — real content covering the items in `requirements.md` §41–42, in `Prose`. Head both with a visible note: *"Reviewed by the client's legal advisor before launch."* Flag clearly in the handover that these need a lawyer's review — do not present generated legal text as final.

---

## 9. WHATSAPP INTEGRATION

There is no database, so WhatsApp is the entire lead pipeline. Get this exactly right.

### 9.1 Two mechanisms — know which is which

| | **A · Click-to-chat (primary)** | **B · Cloud API notification (backup)** |
|---|---|---|
| Direction | Visitor → business | Server → business owner |
| Setup | None. Just the number. | Meta Business + WABA + approved template |
| Cost | Free | Utility-template rate (India rates are among the lowest) |
| Use for | Every WhatsApp button on the site | Form submissions only |

**A is the primary path and must work on day one, before any Meta account exists.** B is a reliability layer for the forms so a submitted enquiry is never lost.

Note on billing: WhatsApp moved to per-delivered-message pricing on 1 July 2025. Visitor-initiated conversations open a free 24-hour service window, so path A costs nothing. Meta has signalled changes to service-message charging from 1 October 2026 — check the current rate card before launch rather than trusting this line.

### 9.2 Deep link builder — `src/lib/whatsapp.ts`

```ts
export function buildWhatsAppUrl({ message, number = site.whatsapp }: {
  message: string; number?: string;
}): string {
  // number is E.164 WITHOUT '+' — e.g. '919876543210'
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
```

`https://wa.me/` works on mobile app, desktop app and WhatsApp Web without any branching. Do not hand-roll `api.whatsapp.com` fallbacks.

If `site.whatsapp` is empty, `WhatsAppButton` renders the phone CTA instead and logs a dev warning. **It must never render a link to a fake number.**

### 9.3 Contextual messages — required

A generic message wastes the lead. Every button passes context:

```ts
export const waMessages = {
  general: () =>
    `Hi PlotInNaviMumbai, I found your website and I'd like to understand which plots might suit my requirement.`,

  consultation: () =>
    `Hi PlotInNaviMumbai, I'd like to book a free consultation. Please guide me on choosing the right plot.`,

  property: (p: Property) =>
    `Hi PlotInNaviMumbai, I'm interested in ${p.name} (${p.location.sector ? p.location.sector + ', ' : ''}${nodeLabel(p.node)}). Could you share more details and the current documentation status?`,

  tour: () =>
    `Hi PlotInNaviMumbai, I'd like to arrange a Family Property Tour. Please let me know the available dates.`,

  node: (n: Node) =>
    `Hi PlotInNaviMumbai, I'm looking at plots in ${n.name}. Could you tell me what's currently available?`,
};
```

Tone rules: never ALL CAPS, never "BUY NOW", never emoji, never more than two sentences. It should read like a person typed it.

### 9.4 `WhatsAppButton`

```tsx
<WhatsAppButton
  message={waMessages.property(property)}
  variant="primary" | "outline" | "float"
  source="property-detail"     // fires analytics event
  label="Ask about this plot"
/>
```

- Renders `<a href target="_blank" rel="noopener noreferrer">`.
- Fires `track('whatsapp_click', { source })` before navigation.
- Label varies by context — never the generic "Chat with us" everywhere.

### 9.5 Server action — `src/actions/submit-enquiry.ts`

The only server mutation in the app.

```
'use server'

1. Validate payload with zod (server side — never trust the client).
2. Reject if honeypot filled  → return generic success (don't tell bots).
3. Rate limit by IP: 3 submissions / 10 min, in-memory Map. Fail open on error.
4. Send WhatsApp Cloud API utility template to the OWNER's number
   (POST https://graph.facebook.com/v21.0/{PHONE_NUMBER_ID}/messages).
5. If step 4 fails → send email via Resend to LEAD_NOTIFY_EMAIL. Never lose a lead.
6. If both fail → return { ok: false } and the UI shows the WhatsApp deep link
   as a fallback so the visitor can still reach the business.
7. Return { ok: true, whatsappUrl } — the UI offers "Continue on WhatsApp".
```

**Template requirement:** business-initiated messages outside an open service window need a Meta-approved template. Register a **utility** template (not marketing — wrong category gets rejected and costs more), for example:

```
Name: new_website_enquiry
Category: UTILITY
Body: New enquiry from the website.
      Name: {{1}}
      Phone: {{2}}
      Interested in: {{3}}
      Preferred contact: {{4}}
      Message: {{5}}
```

Never log or expose `WHATSAPP_ACCESS_TOKEN`. It is server-only — no `NEXT_PUBLIC_` prefix, ever.

### 9.6 Graceful degradation — mandatory

If Meta credentials are absent (which is the state on day one), the server action **skips step 4 entirely** and goes straight to the email fallback. The site must be fully functional and deployable before the client's WhatsApp Business account exists. Guard with `if (!process.env.WHATSAPP_ACCESS_TOKEN) { ... }` — do not throw.

---

## 10. FORMS

### 10.1 Rules

- Three forms only: `ConsultationForm`, `TourRequestForm`, `PropertyEnquiryForm`. All share `FormField` and the same server action.
- **Short forms.** Consultation = 4 fields. Tour = 6. Property enquiry = 4. Every additional field costs conversions and breaks the no-pressure principle.
- `react-hook-form` + `zodResolver`. Validate on blur, not on every keystroke.
- Errors sit **below** the field, in `--color-amber`, and say what to do: "Enter a 10-digit mobile number" — not "Invalid input".
- Labels are always visible. **No placeholder-only fields** — they fail accessibility and disappear on focus.
- Submit button shows a pending state via `useFormStatus` and is disabled while submitting. Never a full-page spinner.
- On success: replace the form with a calm confirmation + a "Continue on WhatsApp" button. No confetti, no modal.

### 10.2 Field set

| Field | Type | Required | Validation |
|---|---|---|---|
| Name | text | yes | 2–60 chars |
| WhatsApp number | tel | yes | `/^[6-9]\d{9}$/` for India; allow `+<country><number>` for NRI |
| Preferred contact | select | yes | WhatsApp / Call / Video call / Meet in person |
| Looking for | select | tour, consultation | Residential plot / Commercial plot / Investment / Not sure yet |
| Preferred location | multi-select | optional | node list |
| Budget | select | optional | Ranges + "Prefer to discuss" |
| Message | textarea | optional | max 800 chars |
| `website` | hidden honeypot | — | must be empty |

"Not sure yet" and "Prefer to discuss" must exist as options. A visitor who does not know yet is exactly who this brand is for.

### 10.3 Spam protection

Honeypot + a minimum 3-second time-to-submit check + IP rate limiting. **No CAPTCHA in v1** — it adds friction and a third-party script for a site with low-volume, high-intent traffic. If spam becomes a real problem, add Cloudflare Turnstile then, not now.

---

## 11. SEO

### 11.1 Metadata

`buildMetadata()` in `lib/metadata.ts` is the only place metadata is constructed. Every page calls it.

- Titles ≤60 chars, unique per page, format `Page | PlotInNaviMumbai`. Home overrides with a full descriptive title.
- Descriptions 70–160 chars, written for a human deciding whether to click. Enforced by zod (§6.3).
- `metadataBase` set from `NEXT_PUBLIC_SITE_URL`. Canonical on every page.
- OG + Twitter card on every page. Property pages generate a per-property OG image via `next/og` showing the plot name, node and size.
- `robots: { index: true, follow: true }` — except unpublished content, which must not be reachable at all.

**Locked titles:**

| Route | Title |
|---|---|
| `/` | `Plots in Navi Mumbai — Honest Property Guidance \| PlotInNaviMumbai` |
| `/properties` | `Plots for Sale in Navi Mumbai \| PlotInNaviMumbai` |
| `/properties/[node]` | `Plots in {Node}, Navi Mumbai \| PlotInNaviMumbai` |
| `/properties/[node]/[slug]` | from `property.seo.title` |
| `/why-we-exist` | `Why We Exist \| PlotInNaviMumbai` |
| `/family-property-tour` | `Family Property Tour — Visit Before You Decide \| PlotInNaviMumbai` |
| `/investment-guide` | `Buying Land in Navi Mumbai: What to Check \| PlotInNaviMumbai` |

**Home description (155 chars):**
> Independent advice on residential and commercial plots across Ulwe, Kharghar, Panvel, Taloja and Dronagiri. We check the documents before we recommend.

### 11.2 Search intent to target

Primary: *plots in Navi Mumbai · residential plots Navi Mumbai · NA plots Navi Mumbai · plots in Ulwe / Kharghar / Panvel / Taloja / Dronagiri · investment plots Navi Mumbai · RERA registered plots Navi Mumbai · land for sale Navi Mumbai*

Node pages carry the location intent. Blog posts carry the question intent ("documents to check before buying a plot in Maharashtra", "what is a 7/12 extract", "NA plot vs gaothan land"). **Write for humans. No keyword stuffing** — `requirements.md` §49.

### 11.3 Structured data — `lib/jsonld.ts`

| Schema | Where |
|---|---|
| `RealEstateAgent` (+ `address`, `areaServed`, `telephone`) | Root layout, once |
| `WebSite` | Root layout |
| `RealEstateListing` | Every property page — name, description, image, address, `offers` **only when a price exists** |
| `BreadcrumbList` | Every page below root |
| `FAQPage` | FAQ page and any page with a real FAQ block |
| `Article` | Blog posts |

Rule: structured data must describe **only what is visible on the page and true**. No `aggregateRating` (there are no verified reviews), no invented `offers`.

### 11.4 Technical

`sitemap.ts` generates from real routes + all published properties, nodes and posts. `robots.ts` allows everything and points to the sitemap. Clean lowercase hyphenated URLs. Internal links between property → node → related properties → relevant blog posts. `lang="en-IN"`. One `h1` per page, no skipped heading levels.

---

## 12. ANALYTICS

Use Vercel Analytics or Plausible. **No Google Analytics without a cookie consent banner** — and a banner conflicts with the calm experience, so prefer a cookieless tool.

`track(event, props)` in `lib/analytics.ts`, no-ops if unconfigured. Events:

`whatsapp_click` (source) · `phone_click` (source) · `tour_request_submitted` · `consultation_submitted` · `property_enquiry_submitted` (property) · `property_view` (slug, node) · `property_filter_used` (filters) · `brochure_download` (property) · `scroll_depth` (50 / 90 on home only)

Intent events matter, not pageviews (`requirements.md` §70). Never track form field contents. Never send phone numbers to analytics.

---

## 13. PERFORMANCE & ACCESSIBILITY BUDGETS

**Performance — measured on mobile, throttled:** LCP < 2.0s · INP < 200ms · CLS < 0.05 · First-load JS ≤ 110kb gzipped · Lighthouse mobile ≥ 95 across all four categories.

Enforced by: Server Components by default, `next/font` (no render-blocking font CSS), `next/image` everywhere with explicit dimensions, zero client JS on the home page except `Reveal`, `Header` and the WhatsApp buttons, no third-party scripts except the analytics beacon.

**Accessibility — WCAG 2.1 AA, non-negotiable:** every interactive element keyboard-reachable in a logical order · visible sprout focus ring, never `outline: none` · body text ≥ 4.5:1, large text ≥ 3:1 · every image has meaningful alt (decorative ones `alt=""` + `aria-hidden`) · every input has a `<label>` · one `h1`, no skipped levels · `Sheet`/`Dialog` trap focus and close on Escape · a "Skip to content" link as the first focusable element · reduced motion fully respected · touch targets ≥ 44×44px.

---

## 14. BUILD PHASES

Complete each phase and pass its checklist before starting the next.

### Phase 1 — Foundation
Scaffold, shadcn init, `globals.css` tokens, fonts, `Container`/`Section`/`Eyebrow`/`SectionHeading`/`PlotGrid`/`Reveal`, `site.ts`, types, zod schemas, `lib/utils.ts`.
✅ `npm run build` clean · zero blue in the repo (grep) · tokens visible on a scratch page · fonts loading with no FOUT · reduced-motion media query present.

### Phase 2 — Shell
`Header` (desktop + mobile sheet), `Footer`, `StickyContactBar`, `WhatsAppFloat`, `layout.tsx`, `not-found.tsx`, skip link.
✅ Nav works at 360/768/1440 · sheet traps focus and closes on Escape · header state change is smooth · sticky bar respects safe-area · full keyboard pass with no trap.

### Phase 3 — Content layer
All content files, sample properties with `isSample: true`, `lib/properties.ts`, `scripts/check-content.ts`, prebuild hook.
✅ Schema rejects a deliberately malformed property · prebuild fails when a sample is published · filters return correct results in unit checks.

### Phase 4 — Property system
`PropertyCard`, `PropertyGrid`, `VerificationRecord`, `PropertyFilters`, `PropertyGallery`, `WhyWeLikeThis`, `PropertyFit`, `NearbyLandmarks`, `PropertyEnquiryPanel`, all three property routes.
✅ Static params generate for every published property · record strip renders correctly for all four verification states · filters sync to URL and survive reload · gallery is keyboard-navigable · empty state renders on a no-match filter.

### Phase 5 — Home
All nine sections in order, with the §16 copy.
✅ Emotional arc intact and in order · CTAs in sections 1 and 9 only · sand used once · sprout under 3% of the viewport · Lighthouse mobile ≥ 95 · scroll reveals fire once and are disabled under reduced motion.

### Phase 6 — Remaining pages
Why we exist, Services, Family Property Tour, Investment Guide, Stories of Trust, FAQ, Insights, Contact, Privacy, Terms.
✅ Every route in §4 resolves · no lorem ipsum · no invented facts · legal pages carry the review note · services page uses the exact §16.7 legal phrasing.

### Phase 7 — WhatsApp & forms
`lib/whatsapp.ts`, `WhatsAppButton`, the three forms, the server action, rate limiting, email fallback.
✅ Every WhatsApp button opens a correctly prefilled chat on a real device · buttons degrade to phone when the number is unset · server action validates independently of the client · honeypot blocks a scripted submit · site builds and works with **zero** Meta credentials configured.

### Phase 8 — SEO
Metadata on every route, JSON-LD, sitemap, robots, OG images, internal linking.
✅ Every page has a unique title ≤60 and description ≤160 · JSON-LD passes Google's Rich Results Test · sitemap lists every published route · no `noindex` left on a live page.

### Phase 9 — QA & polish
Run §15 in full. Then remove one thing from every page that does not earn its place (`requirements.md` §65).

### Phase 10 — Handover
`README.md` (how to add a property, how to publish a post, how to update contact details), `.env.example`, the `TODO_CLIENT` list, Vercel deploy, domain, Search Console, sitemap submission.

---

## 15. PRE-LAUNCH QA CHECKLIST

**Brand**
- [ ] Does it look like a normal real estate website? (must be **no**)
- [ ] Does any section feel like a sales pitch?
- [ ] Is the brand understandable within 5 seconds of landing?
- [ ] Would a first-time buyer feel comfortable messaging them?
- [ ] Does the site sound like a knowledgeable family member, not a salesperson?

**Honesty**
- [ ] Zero fake testimonials, statistics, badges or awards
- [ ] Zero blanket approval claims — every status is per-property and dated
- [ ] Zero guaranteed-return or appreciation claims anywhere, including the blog
- [ ] Every RERA/MMRDA reference traces to a real document
- [ ] No `TODO_CLIENT` string visible in the rendered output

**Technical**
- [ ] `npm run build` clean; zero TS and ESLint errors
- [ ] No blue anywhere (grep `blue`, `sky-`, `indigo-`, `#3b82f6`)
- [ ] No `localStorage`, no browser storage APIs
- [ ] No console errors or warnings on any route
- [ ] No sample data reachable in production
- [ ] All environment variables documented in `.env.example`

**Device & a11y**
- [ ] 360 / 390 / 768 / 1024 / 1440 all correct
- [ ] Real Android + iOS check — WhatsApp links open the app
- [ ] Full keyboard-only pass on every page
- [ ] Reduced-motion pass
- [ ] Lighthouse mobile ≥ 95 on Home, Properties and one property page

**Content**
- [ ] Every image has specific alt text
- [ ] Every internal link resolves; no 404s
- [ ] Legal pages flagged for the client's lawyer
- [ ] Phone, WhatsApp and email are the client's real details

---

## 16. COPY BANK

Use verbatim. This copy is deliberately plain. Do not add adjectives, do not add "unlock", "seamless", "elevate", "embark", "epitome", "unparalleled", or exclamation marks.

### 16.1 Hero

> **Eyebrow:** `── NAVI MUMBAI · PLOTS & LAND`
>
> **H1:** We'll tell you when a plot isn't right for you.
>
> **Lead:** Even when it costs us the sale. That's the whole idea here — straight guidance on land across Ulwe, Kharghar, Panvel, Taloja and Dronagiri, so you can decide at your own pace.
>
> **Primary CTA:** Talk to us on WhatsApp
> **Secondary CTA:** See how we work
>
> **Under the CTAs, mono:** `WE CHECK THE PAPERWORK BEFORE WE SHOW YOU ANYTHING`

*Alternate H1 if the client prefers something warmer:* "Buying land shouldn't feel like a gamble."

### 16.2 The real problem

> **Eyebrow:** `── WHY THIS FEELS HARD`
>
> **H2:** Nobody is confused about wanting land. The confusion starts after that.
>
> **Lead:** Most people we meet aren't short of options. They're short of someone who will explain things plainly and has no reason to rush them.
>
> **Four points:**
> - **Ten brokers, ten prices.** The same sector, quoted five different ways, and no clear reason why.
> - **A file nobody explains.** You're handed documents and expected to nod along.
> - **The urgency that never ends.** "Only two plots left, sir" — every week, for months.
> - **The question nobody answers.** Not "is this a good plot", but "is this a good plot *for me*".

### 16.3 Why we exist

> **Eyebrow:** `── WHY WE EXIST`
>
> **H2:** A plot is not a product. It's usually somebody's biggest decision.
>
> **Body:** For most families, buying land happens once, maybe twice. It involves savings built over years and a decision that shapes what comes next. That deserves more care than a site visit and a follow-up call.
>
> So we work the other way around. We ask what you're actually trying to do — build in three years, hold for ten, park capital, move your parents closer. Then we look at what fits. Sometimes the honest answer is that nothing we have fits, and we say so.
>
> **Link:** Read the full story →

### 16.4 Our promise (8 items, dark canopy section)

> **Eyebrow:** `── OUR PROMISE`
> **H2:** Eight things you can hold us to.
>
> `01` We won't pressure you. Not on a call, not on site, not afterwards.
> `02` We'll explain things in plain language, as many times as you need.
> `03` We'll respect your budget instead of talking you past it.
> `04` We'll listen before we recommend anything.
> `05` We'll recommend based on what suits you, not what we need to move.
> `06` We'll check the documentation before we put a plot in front of you.
> `07` If something looks wrong, we'll tell you — even about our own listing.
> `08` We'd rather have you as a contact for ten years than a sale this month.

### 16.5 How we guide you (6 steps)

> **Eyebrow:** `── HOW WE GUIDE YOU`
> **H2:** Six steps. You control the pace of every one.
>
> `01 Understand` — We start with your situation, not our inventory. What you need it for, when, and what you're comfortable spending.
> `02 Explore` — We shortlist what genuinely fits. Usually a handful of options, not a catalogue.
> `03 Verify` — We review the available documents and approval status for each one, and tell you what's confirmed and what isn't.
> `04 Visit` — You see the plots yourself, with the boundaries, the access road and the surroundings in front of you.
> `05 Discuss` — You ask everything. We answer, including the parts that aren't in our favour.
> `06 Decide` — You decide. If that takes six months, or the answer is no, that's a fine outcome.

### 16.6 Family Property Tour

> **Eyebrow:** `── FAMILY PROPERTY TOUR`
> **H2:** Come see the land before anyone talks about paperwork.
>
> **Body:** Bring your family. We'll drive you through the plots that match what you told us, show you the access roads, the surroundings and what's being built nearby, and answer whatever comes up. There's no obligation to buy anything, and no charge for the visit.
>
> Most people leave understanding their options better. Some decide it isn't the right time. Both are fine.
>
> **CTA:** Arrange a Family Property Tour

### 16.7 Services — legal wording (use exactly)

> **We are not a law firm and we do not provide legal advice.** For documentation, title verification and registration, we coordinate with qualified advocates and licensed professionals, and we'll tell you clearly which parts are their work and which are ours.

### 16.8 Verification note (mandatory under every `VerificationRecord`)

> Last checked by our team on {date}. Approval status can change. We re-check before every site visit and will share the current documents with you directly.

### 16.9 Testimonials empty state

> **H2:** Stories of trust
>
> We're collecting these properly — with permission, in people's own words, and only from people we've actually worked with. Rather than fill this page with something invented, we've left it as it is until we have the real thing.
>
> **CTA:** Talk to us directly instead →

### 16.10 Footer

> **Brand line:** Built on trust. Guided by honesty. Focused on your future.
>
> **Disclaimer:** Property details, prices and approval status are shared in good faith and can change. Nothing on this website is an offer or a guarantee of investment returns. Please verify all documents independently before any transaction.

### 16.11 Words that must never appear

`unlock` · `seamless` · `elevate` · `embark` · `epitome` · `unparalleled` · `game-changer` · `revolutionary` · `dream home awaits` · `luxury redefined` · `best in class` · `world-class` · `No.1` · `guaranteed returns` · `limited time` · `hurry` · `don't miss out` · `100% safe`

---

## 17. ENVIRONMENT VARIABLES

`.env.example` — commit this file, never `.env.local`.

```bash
# Public
NEXT_PUBLIC_SITE_URL=https://plotinnavimumbai.com
NEXT_PUBLIC_WHATSAPP_NUMBER=          # E.164 without '+', e.g. 919876543210
NEXT_PUBLIC_PHONE=                    # display + tel: link
NEXT_PUBLIC_ANALYTICS_ID=             # optional

# Server-only — never prefix with NEXT_PUBLIC_
WHATSAPP_PHONE_NUMBER_ID=             # Meta Cloud API
WHATSAPP_ACCESS_TOKEN=                # permanent system-user token
WHATSAPP_OWNER_NUMBER=                # where lead alerts go
WHATSAPP_TEMPLATE_NAME=new_website_enquiry

RESEND_API_KEY=                       # fallback path
LEAD_NOTIFY_EMAIL=
```

Every server-only variable must be optional at build time. A missing token degrades a feature; it never breaks the build (§9.6).

---

## 18. THINGS THE AGENT MUST NEVER DO

1. Add a database, ORM, or auth system.
2. Use blue in any form.
3. Invent a testimonial, statistic, approval number, award or client logo.
4. Claim "all our properties are RERA approved" or any blanket approval statement.
5. Promise returns, appreciation, or "the best time to buy".
6. Add a countdown, exit popup, scarcity message, or auto-opening chat bubble.
7. Put a CTA after every section.
8. Use `localStorage` or any browser storage API.
9. Ship AI-generated stock imagery of glass towers.
10. Rewrite the §16 copy into marketing language.
11. Add a package outside §3.3 without asking.
12. Present generated privacy/terms text as legally reviewed.
13. Let sample data reach production.
14. Remove the verification note under `VerificationRecord`.
15. Skip a phase acceptance checklist.

---

## APPENDIX A — FIRST PROMPT TO THE AGENT

Paste this into Cursor with this file attached:

> You are building PlotInNaviMumbai, a Next.js 16 property advisory website.
>
> `master-spec.md` is your single source of truth. `requirements.md` is the brand blueprint it is derived from. Read both fully before writing any code.
>
> Start with **Phase 1** only (§14). Do not proceed past it.
>
> Before you begin, confirm back to me:
> 1. The three non-negotiable constraints from §0.2 that you consider highest-risk to violate, and how you'll avoid each.
> 2. The exact list of files you will create in Phase 1.
> 3. Anything in the spec you find genuinely ambiguous.
>
> Then build Phase 1 and report against its acceptance checklist item by item.

---

## APPENDIX B — WHAT THE CLIENT STILL OWES

Track these; the site cannot launch without them.

| # | Item | Blocks |
|---|---|---|
| 1 | WhatsApp Business number | All CTAs |
| 2 | Contact phone + email | Header, footer, contact |
| 3 | Office address | Footer, LocalBusiness schema |
| 4 | Firm's RERA registration (if any) | Footer credibility |
| 5 | Real property data + documentation status | Every property page |
| 6 | Real site photographs per plot | Cards, galleries, OG images |
| 7 | Founder's name, photo, and letter | Why we exist |
| 8 | 3–5 real testimonials with permission | Stories of trust |
| 9 | Legal review of privacy + terms | Launch |
| 10 | Meta Business account + approved template | WhatsApp Cloud API path |
