import type { Route } from "./+types/youtube-playlists";
import { cachedFetch } from "../lib/cache.server";
import { fetchPlaylists } from "../lib/youtube.server";
import { Card } from "../components/Card";
import { CardGrid } from "../components/CardGrid";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { YouTubeTabs } from "../components/YouTubeTabs";

// Hardcoded playlist IDs to feature — update these with your actual playlist IDs
const FEATURED_PLAYLIST_IDS = [
  "PLGQJWsVIUT6uqx7CiBu9spR6bjFx66WUS", // Titan
  "PLGQJWsVIUT6tXJn-YqF634JvJrQ6sfiyC", // Designated Survivors
  "PLGQJWsVIUT6tGczW4wIND4AdpBAkm_Fkp", // SE2 Early Access
  "PLGQJWsVIUT6u9qCTRQz4pCRGXFDXKpVrD", // Stellar Garage
  "PLGQJWsVIUT6vaehhXbdeY6_tUMbTIHUg4", // Outpost 52
  "PLGQJWsVIUT6vsTLnTijQoCYCWFu-8lMkJ", // Distant Stars
  "PLGQJWsVIUT6vM9HXq6dOjCiH6I5mircqF", // SE DLC
  "PLGQJWsVIUT6vPFTw9cm9a6lhy7aIYhaiz", // Elder Scrolls Online
  "PLGQJWsVIUT6vHrM2egqcScIpvHW3K1KVX", // EDF 5
  "PLGQJWsVIUT6siI8A1LleG1lXuqIv67YcV", // EDF 6
  "PLGQJWsVIUT6uMwT9B3rzRJHsqZnNmCzg_", // Halo MCC
  "PLGQJWsVIUT6tXGQ5Usk3Ktlh5NXg1qcHy", // Halo Infinite
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
    <PageContainer>
      <YouTubeTabs />
      <PageHeader title="Playlists" />

      {playlists.length === 0 ? (
        <p className="mt-8 text-text-secondary">No playlists featured yet.</p>
      ) : (
        <CardGrid columns={3}>
          {playlists.map((playlist) => (
            <a
              key={playlist.id}
              href={`https://www.youtube.com/playlist?list=${playlist.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="overflow-hidden">
                <img
                  src={playlist.thumbnail}
                  alt={playlist.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-4">
                  <h3 className="font-heading text-sm text-text-primary">{playlist.title}</h3>
                  <p className="text-xs text-text-secondary mt-1">{playlist.videoCount} videos</p>
                </div>
              </Card>
            </a>
          ))}
        </CardGrid>
      )}
    </PageContainer>
  );
}
