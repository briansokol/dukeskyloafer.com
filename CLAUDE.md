# CLAUDE.md

## Project Overview

Personal website (dukeskyloafer.com) built with React Router v7 (SSR) on Cloudflare Workers. Displays GitHub projects, YouTube streams/videos, and playlists.

## Tech Stack

- **Framework**: React Router 7 with SSR
- **Runtime**: Cloudflare Workers
- **Styling**: Tailwind CSS v4 with CSS custom properties for theming (defined in `app/app.css` under `@theme`)
- **Linting**: Oxlint (not ESLint) — config in `.oxlintrc.json`
- **Formatting**: Oxfmt (not Prettier) — config in `.oxfmtrc.json`. Double quotes, semicolons, 100 char width, trailing commas
- **Testing**: Vitest with explicit imports (globals disabled)
- **Pre-commit**: Husky + lint-staged runs `oxlint --fix` and `oxfmt` on staged files

## Architecture Patterns

### Route structure

Routes are defined in `app/routes.ts`. Each route file exports:

- `meta()` — page title/description
- `loader()` — server-side data fetching via `Route.LoaderArgs`
- `default` component — receives `loaderData` via `Route.ComponentProps`

Route types are auto-generated — import from `./+types/{routeName}`.

### Data fetching

All data fetching is server-side in loaders. The `cachedFetch<T>()` utility in `app/lib/cache.server.ts` wraps Cloudflare KV with TTL-based caching. Pattern:

```ts
const data = await cachedFetch(env.DSCACHE, "cache-key", ttlSeconds, () => fetchFunction(args));
```

### Server code

Files with `.server.ts` suffix are server-only (never bundled to client). API integrations live in `app/lib/`.

### Environment variables

Accessed via `context.cloudflare.env` in loaders. Public vars are in `wrangler.jsonc`, secrets use `wrangler secret put`. Dev secrets go in `.dev.vars`.

## Conventions

- **Components**: PascalCase filenames, named exports, functional components only
- **Routes**: kebab-case filenames
- **Tests**: Collocated with source (e.g., `foo.server.test.ts` next to `foo.server.ts`)
- **Types**: Interfaces in `app/types/`, no `any` (warned by linter)
- **Path alias**: `~/` maps to `app/`
- **No global state**: Data flows from loaders through props
- **Circular imports forbidden**: `import/no-cycle` is set to error
