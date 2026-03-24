---
name: project_website_plan
description: dukeskyloafer.com website - all 12 implementation tasks complete, ready for deploy configuration
type: project
---

Personal website dukeskyloafer.com implementation is complete. All code tasks done.

**Why:** User wants to showcase YouTube content (streams, videos, playlists) and pinned GitHub repos.

**How to apply:** The site is fully built. Remaining steps are user-driven configuration before deploy:
1. Place logo at `public/logo.png`
2. Create KV namespace: `npx wrangler kv namespace create CACHE` and update id in `wrangler.jsonc`
3. Set secrets: `npx wrangler secret put YOUTUBE_API_KEY` and `GITHUB_TOKEN`
4. Add real playlist IDs to `FEATURED_PLAYLIST_IDS` in `app/routes/youtube-playlists.tsx`
5. Deploy: `npm run deploy`

Key facts:
- YOUTUBE_CHANNEL_ID and GITHUB_USERNAME already set in wrangler.jsonc
- Local dev secrets go in `.dev.vars` (gitignored)
- 8 tests pass across 3 test files
- All types clean
