---
name: project_website_plan
description: dukeskyloafer.com website - design complete, implementation plan ready to execute (12 tasks)
type: project
---

Personal website dukeskyloafer.com has a completed design and implementation plan ready to execute.

**Why:** User wants to showcase YouTube content (streams, videos, playlists) and pinned GitHub repos.

**How to apply:** Start by reading `docs/plans/2026-03-23-website-implementation.md` and execute task-by-task. Design doc is at `docs/plans/2026-03-23-website-design.md`. Project is not yet scaffolded — Task 1 is the starting point.

Key decisions:
- React Router v7 (SSR) on Cloudflare Workers/Pages
- Tailwind CSS v4, dark theme with #00C9CB (cyan) and #8600FF (purple) accent glow lines
- Fonts: Anta (headlines), Space Grotesk (body)
- YouTube Data API v3 + GitHub GraphQL API, cached in Cloudflare KV
- Routes: /, /youtube, /youtube/playlists, /projects
- Home page is logo + about text (not a dashboard with preview cards)
