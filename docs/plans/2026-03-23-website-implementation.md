# dukeskyloafer.com Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a personal website for Duke Skyloafer that showcases YouTube content and GitHub projects, deployed on Cloudflare Workers.

**Architecture:** React Router v7 with SSR on Cloudflare Workers/Pages. Loaders fetch from YouTube Data API v3 and GitHub GraphQL API, caching responses in Cloudflare KV. Tailwind CSS v4 for styling with a dark neon-glow theme.

**Tech Stack:** React Router v7, Cloudflare Workers/Pages, Cloudflare KV, Tailwind CSS v4, YouTube Data API v3, GitHub GraphQL API, TypeScript

---

### ~~Task 1: Scaffold the Project~~ ✅

**Files:**
- Create: entire project scaffold via template

**Step 1: Create the React Router + Cloudflare project**

```bash
cd /Users/bsokol/WebProjects
npx create-react-router@latest --template remix-run/react-router-templates/cloudflare dukeskyloafer.com
```

When prompted, accept defaults (install dependencies, init git).

**Step 2: Verify it runs locally**

```bash
cd dukeskyloafer.com
npm run dev
```

Expected: Dev server starts, browser shows default React Router welcome page.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: scaffold React Router v7 + Cloudflare project"
```

---

### ~~Task 2: Configure Tailwind Theme and Fonts~~ ✅

**Files:**
- Modify: `app/app.css`
- Modify: `app/root.tsx`

**Step 1: Update `app/app.css` with the dark theme and accent colors**

Replace the contents of `app/app.css` with:

```css
@import "tailwindcss" source(".");

@import url("https://fonts.googleapis.com/css2?family=Anta&family=Space+Grotesk:wght@300..700&display=swap");

@theme {
  --font-heading: "Anta", sans-serif;
  --font-body: "Space Grotesk", sans-serif;
  --color-bg-dark: #0a0a0f;
  --color-bg-card: #12121a;
  --color-accent-cyan: #00C9CB;
  --color-accent-purple: #8600FF;
  --color-text-primary: #f0f0f0;
  --color-text-secondary: #a0a0b0;
}

html {
  color-scheme: dark;
}

body {
  @apply bg-bg-dark text-text-primary font-body;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}
```

**Step 2: Update `app/root.tsx` to set the lang attribute and remove any default light-mode styling**

Ensure the `<html>` tag in `root.tsx` has `lang="en"` and no conflicting background styles.

**Step 3: Verify the dark theme renders**

```bash
npm run dev
```

Expected: Page has dark background (#0a0a0f), light text, fonts load.

**Step 4: Commit**

```bash
git add app/app.css app/root.tsx
git commit -m "feat: configure dark theme with Anta/Space Grotesk fonts and accent colors"
```

---

### ~~Task 3: Build the Root Layout with Navigation~~ ✅

**Files:**
- Create: `app/components/Nav.tsx`
- Create: `app/components/GlowLine.tsx`
- Modify: `app/root.tsx`

**Step 1: Create `app/components/GlowLine.tsx`**

A reusable glow-line divider component:

```tsx
export function GlowLine() {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--color-accent-cyan), var(--color-accent-purple), transparent)",
        boxShadow:
          "0 0 8px var(--color-accent-cyan), 0 0 8px var(--color-accent-purple)",
      }}
    />
  );
}
```

**Step 2: Create `app/components/Nav.tsx`**

Navigation bar with logo and links:

```tsx
import { NavLink } from "react-router";
import { GlowLine } from "./GlowLine";

const links = [
  { to: "/", label: "Home" },
  { to: "/youtube", label: "YouTube" },
  { to: "/projects", label: "Projects" },
];

export function Nav() {
  return (
    <nav>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-heading font-bold tracking-wide">
          Duke Skyloafer
        </NavLink>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-widest transition-colors ${
                    isActive
                      ? "text-accent-cyan"
                      : "text-text-secondary hover:text-text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <GlowLine />
    </nav>
  );
}
```

**Step 3: Add the Nav to the root layout in `app/root.tsx`**

Import and render `<Nav />` above the `<Outlet />` in the layout.

**Step 4: Verify navigation renders**

```bash
npm run dev
```

Expected: Dark page with nav bar showing "Duke Skyloafer" logo text + links, glow line divider underneath.

**Step 5: Commit**

```bash
git add app/components/Nav.tsx app/components/GlowLine.tsx app/root.tsx
git commit -m "feat: add root layout with navigation and glow line divider"
```

---

### ~~Task 4: Configure KV Namespace and Wrangler Secrets~~ ✅

**Files:**
- Modify: `wrangler.jsonc`

**Step 1: Add KV namespace binding to `wrangler.jsonc`**

Add to the config:

```jsonc
{
  "kv_namespaces": [
    {
      "binding": "CACHE",
      "id": "<will-be-filled-after-creation>"
    }
  ]
}
```

**Step 2: Add secret variable placeholders**

Add vars for the channel configuration (non-secret):

```jsonc
{
  "vars": {
    "YOUTUBE_CHANNEL_ID": "<channel-id>",
    "GITHUB_USERNAME": "dukeskyloafer"
  }
}
```

Note: `YOUTUBE_API_KEY` and `GITHUB_TOKEN` will be set as Cloudflare secrets via `wrangler secret put`, NOT in the config file.

**Step 3: Regenerate types**

```bash
npx wrangler types
```

Expected: `Env` interface is updated with `CACHE: KVNamespace`, `YOUTUBE_CHANNEL_ID: string`, `GITHUB_USERNAME: string`.

**Step 4: Document the required secrets**

Add a comment in the wrangler config or a note in the README explaining that before deployment, you must run:

```bash
npx wrangler secret put YOUTUBE_API_KEY
npx wrangler secret put GITHUB_TOKEN
```

**Step 5: Commit**

```bash
git add wrangler.jsonc
git commit -m "feat: configure KV namespace and environment variables"
```

---

### ~~Task 5: Build the KV Cache Utility~~ ✅

**Files:**
- Create: `app/lib/cache.server.ts`
- Create: `app/lib/cache.server.test.ts`

**Step 1: Write the failing test**

Create `app/lib/cache.server.test.ts`:

```typescript
import { describe, it, expect, vi } from "vitest";
import { cachedFetch } from "./cache.server";

function createMockKV(store: Record<string, string> = {}) {
  return {
    get: vi.fn(async (key: string) => store[key] ?? null),
    put: vi.fn(async (key: string, value: string) => {
      store[key] = value;
    }),
  } as unknown as KVNamespace;
}

describe("cachedFetch", () => {
  it("returns cached data on hit", async () => {
    const kv = createMockKV({
      "test-key": JSON.stringify({ data: "cached" }),
    });
    const fetcher = vi.fn();

    const result = await cachedFetch(kv, "test-key", 1800, fetcher);

    expect(result).toEqual({ data: "cached" });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("calls fetcher and caches on miss", async () => {
    const kv = createMockKV();
    const fetcher = vi.fn().mockResolvedValue({ data: "fresh" });

    const result = await cachedFetch(kv, "test-key", 1800, fetcher);

    expect(result).toEqual({ data: "fresh" });
    expect(fetcher).toHaveBeenCalled();
    expect(kv.put).toHaveBeenCalledWith(
      "test-key",
      JSON.stringify({ data: "fresh" }),
      { expirationTtl: 1800 }
    );
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npx vitest run app/lib/cache.server.test.ts
```

Expected: FAIL — module not found.

**Step 3: Write the implementation**

Create `app/lib/cache.server.ts`:

```typescript
export async function cachedFetch<T>(
  kv: KVNamespace,
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = await kv.get(key);
  if (cached) {
    return JSON.parse(cached) as T;
  }

  const data = await fetcher();
  await kv.put(key, JSON.stringify(data), { expirationTtl: ttlSeconds });
  return data;
}
```

**Step 4: Run test to verify it passes**

```bash
npx vitest run app/lib/cache.server.test.ts
```

Expected: PASS

**Step 5: Commit**

```bash
git add app/lib/cache.server.ts app/lib/cache.server.test.ts
git commit -m "feat: add KV cache utility with TTL support"
```

---

### ~~Task 6: Build the YouTube API Client~~ ✅

**Files:**
- Create: `app/lib/youtube.server.ts`
- Create: `app/lib/youtube.server.test.ts`

**Step 1: Write the failing tests**

Create `app/lib/youtube.server.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchUpcomingStreams, fetchRecentVideos, fetchPlaylists } from "./youtube.server";

// Mock global fetch
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("fetchUpcomingStreams", () => {
  it("fetches upcoming streams and their scheduled times", async () => {
    // Mock search response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          { id: { videoId: "vid1" }, snippet: { title: "Stream 1", thumbnails: { high: { url: "thumb1.jpg" } } } },
        ],
      }),
    });
    // Mock videos response for liveStreamingDetails
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            id: "vid1",
            snippet: { title: "Stream 1", thumbnails: { high: { url: "thumb1.jpg" } } },
            liveStreamingDetails: { scheduledStartTime: "2026-03-25T18:00:00Z" },
          },
        ],
      }),
    });

    const result = await fetchUpcomingStreams("API_KEY", "CHANNEL_ID");

    expect(result).toHaveLength(1);
    expect(result[0].videoId).toBe("vid1");
    expect(result[0].scheduledStartTime).toBe("2026-03-25T18:00:00Z");
  });

  it("returns empty array when no upcoming streams", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [] }),
    });

    const result = await fetchUpcomingStreams("API_KEY", "CHANNEL_ID");
    expect(result).toEqual([]);
  });
});

describe("fetchRecentVideos", () => {
  it("fetches recent videos from uploads playlist", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            snippet: {
              title: "Recent Video",
              resourceId: { videoId: "vid2" },
              thumbnails: { high: { url: "thumb2.jpg" } },
            },
            contentDetails: { videoPublishedAt: "2026-03-18T14:00:00Z" },
          },
        ],
      }),
    });

    const result = await fetchRecentVideos("API_KEY", "CHANNEL_ID");

    expect(result).toHaveLength(1);
    expect(result[0].videoId).toBe("vid2");
    expect(result[0].title).toBe("Recent Video");
  });
});

describe("fetchPlaylists", () => {
  it("fetches playlist metadata by IDs", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            id: "PL123",
            snippet: {
              title: "My Playlist",
              description: "Description",
              thumbnails: { high: { url: "pl-thumb.jpg" } },
            },
            contentDetails: { itemCount: 42 },
          },
        ],
      }),
    });

    const result = await fetchPlaylists("API_KEY", ["PL123"]);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("PL123");
    expect(result[0].title).toBe("My Playlist");
    expect(result[0].videoCount).toBe(42);
  });
});
```

**Step 2: Run tests to verify they fail**

```bash
npx vitest run app/lib/youtube.server.test.ts
```

Expected: FAIL — module not found.

**Step 3: Write the implementation**

Create `app/lib/youtube.server.ts`:

```typescript
const YT_BASE = "https://www.googleapis.com/youtube/v3";

export interface UpcomingStream {
  videoId: string;
  title: string;
  thumbnail: string;
  scheduledStartTime: string;
}

export interface RecentVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoCount: number;
}

export async function fetchUpcomingStreams(
  apiKey: string,
  channelId: string
): Promise<UpcomingStream[]> {
  const searchUrl = `${YT_BASE}/search?part=snippet&channelId=${channelId}&eventType=upcoming&type=video&order=date&maxResults=10&key=${apiKey}`;
  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) throw new Error(`YouTube search failed: ${searchRes.status}`);
  const searchData = await searchRes.json();

  if (!searchData.items?.length) return [];

  const videoIds = searchData.items.map((item: any) => item.id.videoId).join(",");
  const videosUrl = `${YT_BASE}/videos?part=snippet,liveStreamingDetails&id=${videoIds}&key=${apiKey}`;
  const videosRes = await fetch(videosUrl);
  if (!videosRes.ok) throw new Error(`YouTube videos failed: ${videosRes.status}`);
  const videosData = await videosRes.json();

  return videosData.items.map((item: any) => ({
    videoId: item.id,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high?.url ?? item.snippet.thumbnails.default.url,
    scheduledStartTime: item.liveStreamingDetails?.scheduledStartTime ?? "",
  }));
}

export async function fetchRecentVideos(
  apiKey: string,
  channelId: string,
  maxResults = 12
): Promise<RecentVideo[]> {
  // Derive uploads playlist ID: UC... -> UU...
  const uploadsPlaylistId = "UU" + channelId.slice(2);
  const url = `${YT_BASE}/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube playlistItems failed: ${res.status}`);
  const data = await res.json();

  return data.items.map((item: any) => ({
    videoId: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high?.url ?? item.snippet.thumbnails.default.url,
    publishedAt: item.contentDetails.videoPublishedAt,
  }));
}

export async function fetchPlaylists(
  apiKey: string,
  playlistIds: string[]
): Promise<Playlist[]> {
  const ids = playlistIds.join(",");
  const url = `${YT_BASE}/playlists?part=snippet,contentDetails&id=${ids}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube playlists failed: ${res.status}`);
  const data = await res.json();

  return data.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high?.url ?? item.snippet.thumbnails.default.url,
    videoCount: item.contentDetails.itemCount,
  }));
}
```

**Step 4: Run tests to verify they pass**

```bash
npx vitest run app/lib/youtube.server.test.ts
```

Expected: PASS

**Step 5: Commit**

```bash
git add app/lib/youtube.server.ts app/lib/youtube.server.test.ts
git commit -m "feat: add YouTube API client for streams, videos, and playlists"
```

---

### ~~Task 7: Build the GitHub API Client~~ ✅

**Files:**
- Create: `app/lib/github.server.ts`
- Create: `app/lib/github.server.test.ts`

**Step 1: Write the failing test**

Create `app/lib/github.server.test.ts`:

```typescript
import { describe, it, expect, vi } from "vitest";
import { fetchPinnedRepos } from "./github.server";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("fetchPinnedRepos", () => {
  it("fetches pinned repositories via GraphQL", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          user: {
            pinnedItems: {
              nodes: [
                {
                  name: "cool-project",
                  description: "A cool project",
                  url: "https://github.com/user/cool-project",
                  primaryLanguage: { name: "TypeScript", color: "#3178c6" },
                  stargazerCount: 42,
                },
              ],
            },
          },
        },
      }),
    });

    const result = await fetchPinnedRepos("TOKEN", "user");

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("cool-project");
    expect(result[0].language).toBe("TypeScript");
    expect(result[0].languageColor).toBe("#3178c6");
    expect(result[0].stars).toBe(42);
  });

  it("handles repos with no language", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          user: {
            pinnedItems: {
              nodes: [
                {
                  name: "docs-repo",
                  description: null,
                  url: "https://github.com/user/docs-repo",
                  primaryLanguage: null,
                  stargazerCount: 0,
                },
              ],
            },
          },
        },
      }),
    });

    const result = await fetchPinnedRepos("TOKEN", "user");

    expect(result[0].language).toBeNull();
    expect(result[0].languageColor).toBeNull();
    expect(result[0].description).toBeNull();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npx vitest run app/lib/github.server.test.ts
```

Expected: FAIL — module not found.

**Step 3: Write the implementation**

Create `app/lib/github.server.ts`:

```typescript
export interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  languageColor: string | null;
  stars: number;
}

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            primaryLanguage {
              name
              color
            }
            stargazerCount
          }
        }
      }
    }
  }
`;

export async function fetchPinnedRepos(
  token: string,
  username: string
): Promise<PinnedRepo[]> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { username } }),
  });

  if (!res.ok) throw new Error(`GitHub API failed: ${res.status}`);

  const json = await res.json();
  const nodes = json.data.user.pinnedItems.nodes;

  return nodes.map((node: any) => ({
    name: node.name,
    description: node.description,
    url: node.url,
    language: node.primaryLanguage?.name ?? null,
    languageColor: node.primaryLanguage?.color ?? null,
    stars: node.stargazerCount,
  }));
}
```

**Step 4: Run test to verify it passes**

```bash
npx vitest run app/lib/github.server.test.ts
```

Expected: PASS

**Step 5: Commit**

```bash
git add app/lib/github.server.ts app/lib/github.server.test.ts
git commit -m "feat: add GitHub GraphQL client for pinned repos"
```

---

### ~~Task 8: Build the Home Page~~ ✅

**Files:**
- Modify: `app/routes/home.tsx` (this is the index route created by the scaffold)
- Modify: `app/routes.ts`

**Step 1: Update `app/routes.ts` to define all routes**

```typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("youtube", "routes/youtube.tsx"),
  route("youtube/playlists", "routes/youtube-playlists.tsx"),
  route("projects", "routes/projects.tsx"),
] satisfies RouteConfig;
```

**Step 2: Build the home page in `app/routes/home.tsx`**

```tsx
import { GlowLine } from "../components/GlowLine";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-center">
      <img
        src="/logo.png"
        alt="Duke Skyloafer logo"
        className="w-40 h-40 mx-auto mb-8 rounded-lg"
        style={{
          boxShadow:
            "0 0 20px var(--color-accent-cyan), 0 0 40px var(--color-accent-purple)",
        }}
      />
      <h1 className="text-4xl mb-4 text-text-primary">Duke Skyloafer</h1>
      <GlowLine />
      <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
        {/* User will fill in their own about text */}
        Gamer, streamer, and open source enthusiast. Follow along on YouTube for
        live streams and videos, or check out my projects on GitHub.
      </p>
    </main>
  );
}
```

Note: The user should place their square logo at `public/logo.png`.

**Step 3: Verify the home page renders**

```bash
npm run dev
```

Expected: Home page shows logo placeholder (will 404 until logo file is added), heading, glow line, and about text.

**Step 4: Commit**

```bash
git add app/routes/home.tsx app/routes.ts
git commit -m "feat: add home page with logo and about section"
```

---

### ~~Task 9: Build the YouTube Page (`/youtube`)~~ ✅

**Files:**
- Create: `app/routes/youtube.tsx`
- Create: `app/components/VideoCard.tsx`

**Step 1: Create the VideoCard component**

Create `app/components/VideoCard.tsx`:

```tsx
interface VideoCardProps {
  videoId: string;
  title: string;
  thumbnail: string;
  subtitle: string;
}

export function VideoCard({ videoId, title, thumbnail, subtitle }: VideoCardProps) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-bg-card rounded-lg overflow-hidden transition-shadow hover:shadow-[0_0_15px_var(--color-accent-cyan)]"
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full aspect-video object-cover"
      />
      <div className="p-4">
        <h3 className="font-heading text-sm text-text-primary line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-text-secondary mt-1">{subtitle}</p>
      </div>
    </a>
  );
}
```

**Step 2: Create the YouTube route with loader**

Create `app/routes/youtube.tsx`:

```tsx
import type { Route } from "./+types/youtube";
import { cachedFetch } from "../lib/cache.server";
import { fetchUpcomingStreams, fetchRecentVideos } from "../lib/youtube.server";
import { VideoCard } from "../components/VideoCard";
import { GlowLine } from "../components/GlowLine";

export async function loader({ context }: Route.LoaderArgs) {
  const env = context.cloudflare.env;
  const apiKey = env.YOUTUBE_API_KEY;
  const channelId = env.YOUTUBE_CHANNEL_ID;

  const [upcoming, recent] = await Promise.all([
    cachedFetch(env.CACHE, "yt:upcoming", 1800, () =>
      fetchUpcomingStreams(apiKey, channelId)
    ),
    cachedFetch(env.CACHE, "yt:recent", 1800, () =>
      fetchRecentVideos(apiKey, channelId)
    ),
  ]);

  return { upcoming, recent };
}

export default function YouTube({ loaderData }: Route.ComponentProps) {
  const { upcoming, recent } = loaderData;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {upcoming.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl mb-6 text-accent-cyan">Upcoming Streams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((stream) => (
              <VideoCard
                key={stream.videoId}
                videoId={stream.videoId}
                title={stream.title}
                thumbnail={stream.thumbnail}
                subtitle={new Date(stream.scheduledStartTime).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  }
                )}
              />
            ))}
          </div>
        </section>
      )}

      <GlowLine />

      <section className="mt-12">
        <h2 className="text-2xl mb-6 text-accent-purple">Recent Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((video) => (
            <VideoCard
              key={video.videoId}
              videoId={video.videoId}
              title={video.title}
              thumbnail={video.thumbnail}
              subtitle={new Date(video.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
```

**Step 3: Verify the page compiles (won't have real data without API key)**

```bash
npm run dev
```

Navigate to `/youtube`. Expected: Page renders (will show errors until API keys are configured).

**Step 4: Commit**

```bash
git add app/routes/youtube.tsx app/components/VideoCard.tsx
git commit -m "feat: add YouTube page with upcoming streams and recent videos"
```

---

### ~~Task 10: Build the Playlists Page (`/youtube/playlists`)~~ ✅

**Files:**
- Create: `app/routes/youtube-playlists.tsx`

**Step 1: Create the playlists route**

Create `app/routes/youtube-playlists.tsx`:

```tsx
import type { Route } from "./+types/youtube-playlists";
import { cachedFetch } from "../lib/cache.server";
import { fetchPlaylists } from "../lib/youtube.server";
import { GlowLine } from "../components/GlowLine";

// Hardcoded playlist IDs to feature — update these with your actual playlist IDs
const FEATURED_PLAYLIST_IDS = [
  // "PLxxxxxxx1",
  // "PLxxxxxxx2",
];

export async function loader({ context }: Route.LoaderArgs) {
  const env = context.cloudflare.env;

  if (FEATURED_PLAYLIST_IDS.length === 0) {
    return { playlists: [] };
  }

  const playlists = await cachedFetch(env.CACHE, "yt:playlists", 1800, () =>
    fetchPlaylists(env.YOUTUBE_API_KEY, FEATURED_PLAYLIST_IDS)
  );

  return { playlists };
}

export default function Playlists({ loaderData }: Route.ComponentProps) {
  const { playlists } = loaderData;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl mb-6 text-accent-cyan">Playlists</h2>
      <GlowLine />

      {playlists.length === 0 ? (
        <p className="mt-8 text-text-secondary">No playlists featured yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <a
              key={playlist.id}
              href={`https://www.youtube.com/playlist?list=${playlist.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-bg-card rounded-lg overflow-hidden transition-shadow hover:shadow-[0_0_15px_var(--color-accent-purple)]"
            >
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-full aspect-video object-cover"
              />
              <div className="p-4">
                <h3 className="font-heading text-sm text-text-primary">
                  {playlist.title}
                </h3>
                <p className="text-xs text-text-secondary mt-1">
                  {playlist.videoCount} videos
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
```

**Step 2: Verify the page renders**

```bash
npm run dev
```

Navigate to `/youtube/playlists`. Expected: Page shows "No playlists featured yet" (until IDs are configured).

**Step 3: Commit**

```bash
git add app/routes/youtube-playlists.tsx
git commit -m "feat: add playlists page with links to YouTube"
```

---

### ~~Task 11: Build the Projects Page (`/projects`)~~ ✅

**Files:**
- Create: `app/routes/projects.tsx`

**Step 1: Create the projects route with loader**

Create `app/routes/projects.tsx`:

```tsx
import type { Route } from "./+types/projects";
import { cachedFetch } from "../lib/cache.server";
import { fetchPinnedRepos } from "../lib/github.server";
import { GlowLine } from "../components/GlowLine";

export async function loader({ context }: Route.LoaderArgs) {
  const env = context.cloudflare.env;

  const repos = await cachedFetch(env.CACHE, "gh:pinned", 3600, () =>
    fetchPinnedRepos(env.GITHUB_TOKEN, env.GITHUB_USERNAME)
  );

  return { repos };
}

export default function Projects({ loaderData }: Route.ComponentProps) {
  const { repos } = loaderData;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl mb-6 text-accent-cyan">Projects</h2>
      <GlowLine />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-bg-card rounded-lg p-6 transition-shadow hover:shadow-[0_0_15px_var(--color-accent-cyan)]"
          >
            <h3 className="font-heading text-lg text-text-primary">{repo.name}</h3>
            {repo.description && (
              <p className="text-sm text-text-secondary mt-2">{repo.description}</p>
            )}
            <div className="flex items-center gap-4 mt-4 text-xs text-text-secondary">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: repo.languageColor ?? "#666" }}
                  />
                  {repo.language}
                </span>
              )}
              {repo.stars > 0 && <span>★ {repo.stars}</span>}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
```

**Step 2: Verify the page compiles**

```bash
npm run dev
```

Navigate to `/projects`. Expected: Page renders (will error until GitHub token is configured).

**Step 3: Commit**

```bash
git add app/routes/projects.tsx
git commit -m "feat: add projects page with pinned GitHub repos"
```

---

### ~~Task 12: End-to-End Verification and Deploy~~ ✅

**Files:**
- No new files

**Step 1: Add logo file**

Place the Duke Skyloafer logo at `public/logo.png`.

**Step 2: Create the KV namespace on Cloudflare**

```bash
npx wrangler kv namespace create CACHE
```

Copy the returned `id` into `wrangler.jsonc`.

**Step 3: Set secrets**

```bash
npx wrangler secret put YOUTUBE_API_KEY
npx wrangler secret put GITHUB_TOKEN
```

**Step 4: Update `YOUTUBE_CHANNEL_ID` and `GITHUB_USERNAME` in `wrangler.jsonc`**

Fill in the actual values.

**Step 5: Update the featured playlist IDs**

Edit `app/routes/youtube-playlists.tsx` and add real playlist IDs to `FEATURED_PLAYLIST_IDS`.

**Step 6: Test locally with remote KV**

```bash
npm run dev
```

Verify all pages load with real data.

**Step 7: Deploy**

```bash
npm run deploy
```

**Step 8: Verify production**

Visit https://dukeskyloafer.com (after DNS is configured) and check all pages.

**Step 9: Final commit**

```bash
git add -A
git commit -m "chore: configure deployment with real channel/repo data"
```
