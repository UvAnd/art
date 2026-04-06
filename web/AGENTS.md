<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Checkpoint (handoff)

- **Sanity**: Project wired; public dataset; Studio in `studio/`, site in `web/`. Content fill-in in progress.
- **Socials**: Site settings → Social links — platforms are Instagram, Pinterest, Behance, Email. Email accepts plain address or `mailto:`; frontend normalizes hrefs. Legacy `linkedin` values still render a generic external-link icon until edited in CMS.
- **Next**: After content passes, home-page richer sections; then Cloudflare Pages + env + Sanity deploy webhook. Contact: Web3Forms key on Contact page doc.
