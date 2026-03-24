import type { Route } from "./+types/youtube-playlists";
import { cachedFetch } from "../lib/cache.server";
import { fetchPlaylists } from "../lib/youtube.server";
import { GlowLine } from "../components/GlowLine";

// Hardcoded playlist IDs to feature — update these with your actual playlist IDs
const FEATURED_PLAYLIST_IDS = [
  "PLGQJWsVIUT6uqx7CiBu9spR6bjFx66WUS",
  "PLGQJWsVIUT6tXJn-YqF634JvJrQ6sfiyC",
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Playlists | Duke Skyloafer" },
    { name: "description", content: "Duke Skyloafer's featured YouTube playlists." },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const env = context.cloudflare.env;

  if (FEATURED_PLAYLIST_IDS.length === 0) {
    return { playlists: [] };
  }

  const playlists = await cachedFetch(env.DSCACHE, "yt:playlists", 1800, () =>
    fetchPlaylists(env.YOUTUBE_API_KEY, FEATURED_PLAYLIST_IDS),
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
                <h3 className="font-heading text-sm text-text-primary">{playlist.title}</h3>
                <p className="text-xs text-text-secondary mt-1">{playlist.videoCount} videos</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
