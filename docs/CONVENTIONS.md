# Conventions & Best Practices

This file captures the implementation conventions used across `web/` and `studio/`.

## Import Conventions (web/)

- Prefer absolute imports from `src/` (implemented as `@/...` in this repo).
- Import UI primitives from `wdx/dist` if that exists in the project; otherwise use local `web/components/...` primitives.
- Import types from `graphql-generated-types` when applicable (this repo currently uses Sanity GROQ types from `web/types/sanity.ts`).

## UI Components (web/)

- Keep “client” components small and focused; server components should not import `"use client"` modules.
- Design-system primitives live in `web/components/ui/*`.
- When you need to reuse non-client utilities from a client component, split them into a separate non-client module (example: `buttonVariants` split to avoid server/client boundary errors).

## Styling

- The project uses Tailwind classes (see `web/app/globals.css` importing Tailwind/Shadcn).
- Reuse existing shadcn/Tailwind tokens/utility patterns rather than inventing ad-hoc styling.

## GraphQL / CMS Data (Sanity)

- Operations are kept in dedicated GROQ query files: `web/lib/sanity.queries.ts`.
- Data access is centralized: `web/lib/cms.ts` wraps Sanity fetch calls.

## Accessibility

- Use semantic HTML (`header`, `nav`, `main`, `footer`, `section`, proper `label` for `input`).
- Keyboard navigation must work for interactive elements.
- Add ARIA attributes only where needed; prefer native semantics.

## Testing

- Unit tests: Jest + React Testing Library.
- New components should include coverage in `__tests__/` directories when the change has meaningful UI logic.

## Security

- Never ship sensitive tokens to the browser.
- Keep `SANITY_API_READ_TOKEN` (if used) in server/build/CI env vars only (never `NEXT_PUBLIC_...`).
- Sanity “url” fields should be validated to avoid invalid links.

## Environment Variables

- `web/.env.local`:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SITE_URL`
- `studio/` uses non-public env vars (see `studio/.env`).

