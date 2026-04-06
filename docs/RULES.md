# Project Rules (UI + Figma MCP)

This file defines non-negotiable rules for how to implement UI changes and how to use the Figma MCP workflow in this project.

## UI Implementation Rules

1. Follow the repo conventions first
   - Use absolute imports from `web/` (`@/…`).
   - Put new components under `web/components/<feature>/…` with an `index.ts` export only when it matches existing patterns.

2. Respect client vs server boundaries
   - Server components must not import `"use client"` modules.
   - If you need to share logic between client and server, move the shared logic into a server-safe module and re-export from client components when needed.

3. Use the existing design system primitives
   - Use shadcn primitives only when they already exist in `web/components/ui/*` (Button, Input, Textarea, Badge, etc.).
   - For complex behavior (carousel, masonry, infinite scroll), implement custom UI with Tailwind and small focused client components.

4. Styling
   - Prefer design-token based colors and spacing via existing Tailwind/shadcn conventions in the project.
   - Don’t copy raw “pixel-perfect” Tailwind classes from Figma if they conflict with the project’s token system.

5. Accessibility (must pass jsx-a11y expectations)
   - Use semantic HTML (`header`, `nav`, `main`, `footer`, `section`, `label`).
   - Keyboard navigation must work for all interactive elements.
   - Ensure aria-labels for icon-only links/buttons.

6. Performance
   - Keep React client state localized.
   - Memoize expensive computations when needed; avoid unnecessary re-renders.
   - Load images lazily unless they are above the fold and explicitly marked as high priority.

## Figma MCP Usage Rules

1. Use MCP for layout context, not as an asset CDN
   - The `get_design_context` response is for understanding layout/structure and for optional reference screenshots.

2. Do NOT hardcode or reference Figma MCP asset URLs
   - Never embed or commit images using URLs that match:
     - `www.figma.com/api/mcp/asset/…`
   - Those links are temporary and not part of the project’s assets pipeline.

3. For any image/icon/vector required by the UI
   - First check whether the asset already exists in the repo (for example `web/public/*` or Sanity/CMS).
   - If it doesn’t exist:
     - Ask the user to upload the asset into the repo (recommended: `web/public/…`), OR
     - Ask the user to provide a backend/Sanity way to source it, OR
     - Ask the user to export an SVG/PNG version so we can store it locally.
   - If you can’t obtain the asset: recreate it using local code (inline SVG/CSS) rather than using the forbidden Figma asset URL pattern.

4. If an asset is missing, ask before implementing
   - When the required design element depends on a Figma-only asset and you can’t reproduce it locally, you must ask the user to provide the missing asset(s).

5. Conversion principle
   - Translate the design intent (typography, spacing, hierarchy, responsive behavior) into this project’s Tailwind + shadcn conventions.
   - Don’t introduce new dependencies just to match visual details from Figma.

