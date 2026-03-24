---
name: project_website_plan
description: dukeskyloafer.com website - Tasks 1-9 of 12 complete, resume at Task 10 (playlists page)
type: project
---

Personal website dukeskyloafer.com implementation is in progress. Plan at `docs/plans/2026-03-23-website-implementation.md`.

**Why:** User wants to showcase YouTube content (streams, videos, playlists) and pinned GitHub repos.

**How to apply:** Resume execution using `superpowers:executing-plans` skill starting at Task 10. Read the plan file for full details.

## Task Status (as of 2026-03-23)

- [x] Task 1: Scaffold React Router v7 + Cloudflare project
- [x] Task 2: Configure Tailwind theme and fonts (dark theme, Anta/Space Grotesk, cyan/purple accents)
- [x] Task 3: Build root layout with navigation (Nav.tsx, GlowLine.tsx)
- [x] Task 4: Configure KV namespace and wrangler (CACHE binding, env vars, secrets documented)
- [x] Task 5: Build KV cache utility (cache.server.ts + tests, also added vitest + vitest.config.ts)
- [x] Task 6: Build YouTube API client (youtube.server.ts + tests)
- [x] Task 7: Build GitHub API client (github.server.ts + tests)
- [x] Task 8: Build home page (routes.ts with all 4 routes, home.tsx with logo/about)
- [x] Task 9: Build YouTube page /youtube (VideoCard.tsx, loader with cached API calls)
- [ ] Task 10: Build playlists page /youtube/playlists (stub exists, needs real implementation)
- [ ] Task 11: Build projects page /projects (stub exists, needs real implementation)
- [ ] Task 12: End-to-end verification and deploy prep (logo, KV creation, secrets, real data)

## Notes
- All 8 tests pass (cache: 2, youtube: 4, github: 2)
- Type checking clean throughout
- Each task has its own git commit
- Route stubs for youtube-playlists.tsx and projects.tsx already exist from Task 8
- The welcome/ directory from the scaffold is still present (can be cleaned up)

Key decisions:
- React Router v7 (SSR) on Cloudflare Workers/Pages
- Tailwind CSS v4, dark theme with #00C9CB (cyan) and #8600FF (purple) accent glow lines
- Fonts: Anta (headlines), Space Grotesk (body)
- YouTube Data API v3 + GitHub GraphQL API, cached in Cloudflare KV
- Routes: /, /youtube, /youtube/playlists, /projects
- Home page is logo + about text (not a dashboard with preview cards)
