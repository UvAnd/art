# Artist Portfolio — Project Documentation

This repository contains:

- `web/` — Next.js (App Router) site configured for static export (`output: "export"`)
- `studio/` — Sanity CMS studio (schemas + Desk)

## Repository Layout

- `web/` — public site (`npm run dev`, `npm run build` → `web/out`)
- `studio/` — Sanity Studio (`cd studio && npm run dev`)

## Current Architecture (high level)

1. Content lives in **Sanity** (Studio).
2. The **web** app reads Sanity via GROQ queries at build time (static export).
3. Deployment target is **Cloudflare Pages** using `web/out` as the output directory.

## Local Setup

### Web

```bash
cd web
cp .env.local.example .env.local

# Required
# NEXT_PUBLIC_SANITY_PROJECT_ID=...
# NEXT_PUBLIC_SANITY_DATASET=production
# NEXT_PUBLIC_SITE_URL=http://localhost:3000

npm install
npm run dev
```

### Studio

```bash
cd studio

# Create `studio/.env` (or set env vars) to match the Sanity project:
# SANITY_STUDIO_PROJECT_ID=...
# SANITY_STUDIO_DATASET=production

npm install
npm run dev
```

## Content Checklist (what to create in Sanity first)

To make the website render correctly with minimal content, create:

1. `siteSettings` document (Site title, hero slides, socials, SEO defaults, footer text)
2. `aboutPage` document (portrait, bio, CV link)
3. `contactPage` document (headline, illustration, side text, contact email, Web3Forms access key)
4. `category` documents
5. `work` documents (at least 2 works with `slug`, `status`, `mainImage`, `categories`)

## Plan Implementation (phase map)

The original architecture plan defines 12 phases. Below is how they map to what exists in this repository now.

1. Phase 1 — Next.js + Tailwind + static export + UI base: **Completed**
2. Phase 2 — Sanity schemas + Studio: **Completed** (`studio/`)
3. Phase 3 — Data layer (Sanity client + queries + types): **Completed**
4. Phase 4 — Root layout + shared UI (Header/Footer/PageTransition/analytics): **Completed**
5. Phase 5 — Home page (Hero + gallery): **Implemented** (with Figma-driven adjustments)
6. Phase 6 — Works catalog (`/works`) + filter + infinite scroll: **Completed**
7. Phase 7 — Work detail (`/works/[slug]`) + images + sold/available behavior: **Completed**
8. Phase 8 — About + Contact pages + Web3Forms: **Completed**
9. Phase 9 — SEO (metadata + sitemap/robots + JSON-LD): **Completed**
10. Phase 10 — Analytics placeholder: **Completed** (env-driven, disabled by default)
11. Phase 11 — Cloudflare Pages deploy + Sanity webhook automation: **Not yet done** (planned)
12. Phase 12 — Testing & QA + content churn workflow: **Planned**

### Where to look in code (key files by phase)

1. Phase 1 (static export & app structure)
- `web/next.config.ts` (export mode + static-friendly settings)
- `web/app/layout.tsx` (Header/Footer/PageTransition/AnalyticsProvider)
- `web/app/globals.css` (Tailwind + design tokens)

2. Phase 2 (Sanity schemas)
- `studio/sanity.config.ts`
- `studio/schemas/siteSettings.ts`
- `studio/schemas/aboutPage.ts`
- `studio/schemas/contactPage.ts`
- `studio/schemas/category.ts`
- `studio/schemas/work.ts`

3. Phase 3 (Sanity data layer)
- `web/lib/sanity.client.ts`
- `web/lib/sanity.fetch.ts`
- `web/lib/sanity.queries.ts` (GROQ)
- `web/lib/sanity.image.ts` (Sanity URL builder)
- `web/types/sanity.ts`
- `web/lib/cms.ts` (fetchSanity wrappers used by pages)

4. Phase 4 (shared UI + app chrome)
- `web/components/layout/header.tsx`, `web/components/layout/footer.tsx`
- `web/components/ui/page-transition.tsx`
- `web/components/analytics/analytics-provider.tsx`

5. Phase 5 (home page)
- `web/app/page.tsx` (home server component: fetches Sanity data)
- `web/components/home/hero-slider.tsx` (Figma-driven hero thumbnail strip)
- `web/components/home/gallery-preview.tsx` (Figma-driven tabs + masonry-like gallery)

6. Phase 6 (works catalog)
- `web/app/works/page.tsx`
- `web/components/works/works-catalog.tsx` (filter pills + IntersectionObserver infinite scroll)
- `web/components/works/work-card.tsx` + `web/components/works/sold-badge.tsx`

7. Phase 7 (work detail)
- `web/app/works/[slug]/page.tsx` (`generateStaticParams` + empty-slug placeholder)
- `web/components/work/work-detail-layout.tsx`
- `web/components/seo/work-json-ld.tsx`

8. Phase 8 (about + contact)
- `web/app/about/page.tsx`
- `web/app/contact/page.tsx`
- `web/components/contact/contact-form.tsx` (Web3Forms submit + UI states)

9. Phase 9 (SEO)
- `web/app/sitemap.ts`, `web/app/robots.ts`
- `generateMetadata()` blocks inside each page route

10. Phase 10 (analytics placeholder)
- `web/components/analytics/analytics-provider.tsx`
- `web/.env.local.example` (see analytics env flags)

11. Phase 11 (Cloudflare deploy)
- Planned: connect Cloudflare Pages to repo, configure env vars, add Sanity → CF deploy webhook.

12. Phase 12 (testing & QA)
- Planned manual checklist: verify routing, filter/infinite scroll, sold state, contact form submission, performance (Lighthouse), and accessibility.

## Static Export Notes (important)

Because `web/` uses `output: "export"`:

- Routes depending on Sanity must be **fully prerenderable** at build time.
- The works detail route (`/works/[slug]`) includes an explicit empty-slug placeholder to satisfy Next.js static export requirements:
  - `web/app/works/[slug]/page.tsx` uses `BUILD_EMPTY_SLUG` and returns `[{ slug: "__empty__" }]` when Sanity has zero works.

If you add a new Sanity-dependent route, confirm it is compatible with static export.

## Social Links Notes

Site social links are controlled by `siteSettings.socials`.

Supported platforms:

- `instagram`
- `pinterest`
- `behance`
- `email` (in Sanity use a plain address like `name@example.com`; the frontend normalizes to `mailto:name@example.com`)

If you previously added `linkedin`, it will no longer appear from Studio because the platform list was updated. Replace the old entry in Sanity with `pinterest` or `behance`.

## Rules

Implementation rules for UI and the Figma MCP workflow are documented in [`docs/RULES.md`](RULES.md).

## Deployment Notes (Cloudflare Pages)

Deployment should run:

- Build: `cd web && npm run build`
- Output: `web/out`

Set the same env vars you use locally (especially Sanity project/dataset + `NEXT_PUBLIC_SITE_URL`) in the Cloudflare Pages environment.

After publishing content in Sanity, use a webhook that triggers the Cloudflare deploy hook.

