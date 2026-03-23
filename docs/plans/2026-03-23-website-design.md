# dukeskyloafer.com — Website Design

## Overview

Personal website for Duke Skyloafer to showcase YouTube content (streams, videos, playlists) and open source projects from GitHub. The site should feel clean and minimal with a dark, gamer-aesthetic theme featuring neon glow accents.

## Architecture

```
Browser <──> Cloudflare Workers (Edge SSR)
                  │
                  ├── YouTube Data API v3 (cached in KV, ~30 min TTL)
                  └── GitHub GraphQL API (cached in KV, ~60 min TTL)
```

- **Framework:** React Router v7 (framework mode, SSR)
- **Runtime:** Cloudflare Workers + Pages
- **Caching:** Cloudflare KV for API response caching
- **Styling:** Tailwind CSS v4
- **Deployment:** wrangler CLI / Cloudflare Pages Git-push deploys

React Router loaders run on the edge (server-side) and fetch YouTube/GitHub data. Responses are cached in KV with a TTL (~30 min for YouTube, ~60 min for GitHub). On cache hit, the loader returns cached data instantly; on miss/stale, it fetches fresh data and updates the cache. The browser receives fully server-rendered HTML.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Logo + about/description of Duke Skyloafer |
| `/youtube` | Upcoming streams + recent videos |
| `/youtube/playlists` | Curated playlists (links out to YouTube) |
| `/projects` | Featured GitHub repos |

## Data Flow

### YouTube Data (loaders for `/youtube` and `/youtube/playlists`)

- **Upcoming streams:** `search` or `playlistItems` endpoint filtered to upcoming/live events from the channel
- **Recent videos:** `playlistItems` endpoint on the channel's "Uploads" playlist, limited to ~10-12 most recent
- **Playlists:** `playlists` endpoint for a hardcoded list of playlist IDs to feature
- All cached in KV with **30 min TTL**

### GitHub Data (loader for `/projects`)

- **Pinned repos:** GitHub GraphQL API to fetch pinned repositories (name, description, language, stars, URL)
- Cached in KV with **60 min TTL**

### Cache Strategy

Each loader checks KV first. On miss or expiry, fetches from the API, writes to KV, and returns. Key scheme: `yt:upcoming`, `yt:recent`, `yt:playlists`, `gh:pinned`.

### Secrets

YouTube API key and GitHub token stored as Cloudflare Worker secrets (environment variables), never exposed to the client.

## Visual Design

### Theme

- Dark background (#0a0a0f or similar deep dark)
- Light text (white/light gray)
- Accent colors: #00C9CB (cyan) and #8600FF (purple)

### Glow Lines

- Horizontal dividers between sections using CSS box-shadow or gradient borders with glow effect in accent colors
- Thin lines with a soft neon bloom — subtle, not overpowering

### Logo

- Centered on the home page, square logo with a subtle glow halo in accent colors

### Cards

- Video/project cards on a slightly lighter dark surface (#12121a or similar)
- Hover state: accent-colored border glow
- Thumbnails for videos, language color dots for GitHub repos

### Typography

- **Headlines:** Anta (Google Fonts) — geometric/techy feel
- **Body:** Space Grotesk — clean and readable

### Layout

- Responsive grid: 1 column mobile, 2-3 columns desktop for cards
- Generous whitespace to keep it clean despite the dark theme
- Navigation: simple top bar with logo + links, accent underline on active route
