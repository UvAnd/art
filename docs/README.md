# Artist Portfolio — Project Documentation

This repository contains:

- `web/` — Next.js (App Router) site configured for static export (`output: "export"`)
- `studio/` — Sanity CMS studio (schemas + Desk)

## Repository Layout

- `web/` — public site (`npm run dev`, `npm run build` → `web/out`)
- `studio/` — Sanity Studio (`cd studio && npm run dev`)

## Current Architecture (high level)

1. Content lives in **Sanity** (Studio).
2. The **web** app reads Sanity via GROQ queries at **build time** (static export).
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
# NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=...   # contact form (see .env.local.example)

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

1. `siteSettings` document (site title, logo, hero slides, socials, SEO defaults, footer text, optional external shop URL)
2. `aboutPage` document (portrait, bio, optional CV link)
3. `contactPage` document (headline, illustration, side text, contact email display) — **no** Web3Forms key in Sanity; the form uses `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `web/.env.local`
4. `category` documents
5. `work` documents (at least 2 works with `slug`, `status`, `mainImage`, `categories`)

## Plan Implementation (phase map)

The original architecture plan defines 12 phases. Below is the **current** mapping to this repository (updated to match the code as implemented).

1. Phase 1 — Next.js + Tailwind + static export + UI base: **Completed**
2. Phase 2 — Sanity schemas + Studio: **Completed** (`studio/`)
3. Phase 3 — Data layer (Sanity client + queries + types): **Completed**
4. Phase 4 — Root layout + shared UI (Header/Footer, mobile nav, analytics): **Completed** — sticky header; **no** global route `PageTransition` (removed); mobile menu is `HeaderMobileNav` inside the header
5. Phase 5 — Home page (Hero + gallery): **Completed** — hero uses viewport-based height (`calc(100dvh − header)` pattern); home gallery passes **all** works, category filter via `?category=`, **load more** (+9) with scroll sentinel, layout via **`react-masonry-css`** (multi-column, round-robin; not CSS `column-count`)
6. Phase 6 — Works catalog (`/works`) + filter + infinite scroll: **Completed** (page size 12, IntersectionObserver)
7. Phase 7 — Work detail (`/works/[slug]`) + images + sold/available: **Completed** — `SanityImage` is a client component with optional LQIP fade-out after main image load
8. Phase 8 — About + Contact + Web3Forms: **Completed** — form key from env only
9. Phase 9 — SEO (metadata + sitemap/robots + JSON-LD): **Completed**
10. Phase 10 — Analytics placeholder: **Completed** (env-driven, disabled by default)
11. Phase 11 — Cloudflare Pages deploy + Sanity webhook automation: **Not done** (no `wrangler`/CI config in repo yet; steps documented below)
12. Phase 12 — Testing & QA + content churn workflow: **Planned** (manual checklist; no automated E2E in repo)

### Where to look in code (key files by phase)

1. Phase 1 (static export & app structure)
   - `web/next.config.ts` (export mode + `images.unoptimized` for static hosting)
   - `web/app/layout.tsx` (fonts, Header, Footer, `AnalyticsProvider`)
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
   - `web/lib/cms.ts` (fetch wrappers used by pages)

4. Phase 4 (shared UI + app chrome)
   - `web/components/layout/header.tsx` (sticky header; desktop blur only at `md+` to avoid breaking `fixed` mobile menu)
   - `web/components/layout/header-mobile-nav.tsx` (full-screen menu + body scroll lock)
   - `web/components/layout/footer.tsx`
   - `web/components/analytics/analytics-provider.tsx`

5. Phase 5 (home page)
   - `web/app/page.tsx` (loads all works for gallery + categories)
   - `web/components/home/hero-slider.tsx` (marquee hero + viewport height)
   - `web/components/home/slider-card.tsx` (card sizing tied to hero CSS variables)
   - `web/components/home/gallery-preview.tsx` (`react-masonry-css`, filters, infinite “load more”)

6. Phase 6 (works catalog)
   - `web/app/works/page.tsx`
   - `web/components/works/works-catalog.tsx` (filter pills + infinite scroll)
   - `web/components/works/work-card.tsx` + `web/components/works/sold-badge.tsx`

7. Phase 7 (work detail)
   - `web/app/works/[slug]/page.tsx` (`generateStaticParams` + empty-slug placeholder)
   - `web/components/work/work-detail-layout.tsx`
   - `web/components/work/work-image-section.tsx`
   - `web/components/ui/sanity-image.tsx`
   - `web/components/seo/work-json-ld.tsx`

8. Phase 8 (about + contact)
   - `web/app/about/page.tsx`
   - `web/components/about/portrait-section.tsx`
   - `web/app/contact/page.tsx`
   - `web/components/contact/contact-form.tsx`

9. Phase 9 (SEO)
   - `web/app/sitemap.ts`, `web/app/robots.ts`
   - `generateMetadata()` in each route

10. Phase 10 (analytics placeholder)
    - `web/components/analytics/analytics-provider.tsx`
    - `web/.env.local.example`

11. Phase 11 (Cloudflare deploy)
    - **Todo:** connect Cloudflare Pages to the repo, set root/build/output/env (see [Deployment Notes](#deployment-notes-cloudflare-pages)), add **Sanity webhook → Cloudflare deploy hook** so publishes trigger rebuilds.

12. Phase 12 (testing & QA)
    - **Todo:** manual pass — routing, home gallery (filter + load more + masonry), `/works` infinite scroll, sold badge, contact submit (prod + Web3Forms domain allowlist), Lighthouse, accessibility (keyboard, focus, contrast).

## Static Export Notes (important)

Because `web/` uses `output: "export"`:

- Routes depending on Sanity must be **fully prerenderable** at build time.
- The works detail route (`/works/[slug]`) includes an explicit empty-slug placeholder to satisfy Next.js static export when there are zero works:
  - `web/app/works/[slug]/page.tsx` uses `BUILD_EMPTY_SLUG` and returns `[{ slug: "__empty__" }]` when Sanity has no slugs.

If you add a new Sanity-dependent route, confirm it is compatible with static export.

## SEO: robots, sitemap, and “автооновлення”

### Already in the app

- **`web/app/robots.ts`** — `allow: /` for everyone, посилання на sitemap: `{NEXT_PUBLIC_SITE_URL}/sitemap.xml`.
- **`web/app/sitemap.ts`** — статичні маршрути (`/`, `/works`, `/about`, `/contact`) + усі work URLs з Sanity (`getAllWorkSlugs()`).

На **продакшені** обов’язково задай **`NEXT_PUBLIC_SITE_URL=https://annakopach.com`** (без слеша в кінці) у Cloudflare — інакше в `robots`/`sitemap` потрапить `localhost`.

### Чи оновлюється sitemap “сам”?

Так, але **тільки після нової збірки**. Сайт — static export: GROQ виконується під час `npm run build`. Нові сторінки в sitemap з’являться після **деплою** (наприклад, webhook Sanity → Pages після публікації в CMS). Окремого “runtime cron” для sitemap не потрібно — це нормальна модель для статики.

### Приховати `*.pages.dev` від SEO (додатково до кастомного домену)

1. **`web/public/_headers`** — додано офіційні шаблони Cloudflare:
   - `https://:project.pages.dev/*` → `X-Robots-Tag: noindex`
   - `https://:version.:project.pages.dev/*` → `X-Robots-Tag: noindex`  
   Кастомний домен **не** матчиться цими правилами.

2. **Bulk Redirects** (у Cloudflare Dashboard) — окремо налаштуй редірект з **`art-7hs.pages.dev`** (або всього `*.pages.dev`, якщо підходить політика) на **`https://annakopach.com`**. Див. [Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/) та документацію Pages щодо редіректів з `pages.dev` на custom domain.

## Social Links Notes

Site social links are controlled by `siteSettings.socials`.

Supported platforms:

- `instagram`
- `pinterest`
- `behance`
- `email` (in Sanity use a plain address like `name@example.com`; the frontend normalizes to `mailto:name@example.com`)

If you previously added `linkedin`, it will no longer appear from Studio because the platform list was updated. Replace the old entry in Sanity with `pinterest` or `behance`.

## Rules

Implementation rules for UI and the Figma MCP workflow are documented in [`RULES.md`](RULES.md).

## Deployment Notes (Cloudflare Pages)

This site uses Next.js **`output: "export"`** — the production artifact is **static files in `out/`**, not a Node server or OpenNext bundle.

### Correct setup (Cloudflare Pages)

Use **Workers & Pages → Create → Pages → Connect to Git** (not the Workers + `wrangler deploy` wizard).

| Setting | Value |
|--------|--------|
| **Root directory** | `web` |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Deploy command** | *(empty / none)* — do **not** run `npx wrangler deploy` |

If the UI only shows a **Deploy command** pre-filled with `npx wrangler deploy`, clear it or create a **Pages** project instead of a **Workers** Git project.

Set the same env vars you use locally (Sanity project/dataset, `NEXT_PUBLIC_SITE_URL`, Web3Forms key, optional analytics) in the Pages project.

After publishing content in Sanity, configure a **Sanity webhook** that triggers your **Cloudflare Pages deploy hook** so static pages rebuild with fresh GROQ data.

**Node:** target **Node 20.19+** where possible (several dependencies declare newer engine ranges).

### If the build log shows this failure

`npm run build` **succeeds**, then **`npx wrangler deploy`** runs and fails with:

`ENOENT ... .next/standalone/.next/server/pages-manifest.json`

**Cause:** Wrangler is using the **OpenNext / Cloudflare Workers** path. That expects a **standalone** server build. This repo is **fully static** (`out/`), so those files are never created.

**Fix:** Remove the **deploy / wrangler** step. On **Pages**, only the build + `out` directory should run — no second OpenNext build.
