# Artist portfolio

Static Next.js site (App Router, `output: "export"`) + **Sanity** CMS + **Cloudflare Pages** hosting.

## Repository layout

- [`web/`](web/) — Next.js 16 application (`npm run dev`, `npm run build` → `web/out`)
- [`studio/`](studio/) — Sanity Studio (`npm run dev` inside `studio/`)

## Quick start

### Web

```bash
cd web
cp .env.local.example .env.local
# Set NEXT_PUBLIC_SANITY_PROJECT_ID (and optional SANITY_API_READ_TOKEN)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Studio

```bash
cd studio
# Use the same project id as the web app (see .env.local)
export SANITY_STUDIO_PROJECT_ID="your_project_id"
npm install
npm run dev
```

Create singleton documents from the desk (Site settings, About, Contact) and add categories + works.

## Deployment (Cloudflare Pages)

Use **Pages** (static hosting), not **Workers** + `wrangler deploy`.

- **Root directory:** `web`
- **Build command:** `npm run build`
- **Output directory:** `out` (relative to `web/`, i.e. `web/out` from repo root)
- **Deploy command:** leave **empty** (`wrangler` / OpenNext is for server-style Next apps; this site is `output: "export"`).

**Environment variables:** see [`web/.env.local.example`](web/.env.local.example) — set the same values in Cloudflare (including `NEXT_PUBLIC_SITE_URL` for production).

After publishing content in Sanity, trigger a rebuild via a **Sanity webhook → Cloudflare Pages deploy hook**.

## Node

Target **Node 20.19+** to satisfy upstream engine ranges (see warnings if you are on older 20.x).
