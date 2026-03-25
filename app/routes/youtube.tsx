import type { Route } from "./+types/youtube";
import { cachedFetch } from "../lib/cache.server";
import { fetchUpcomingStreams, fetchRecentVideos } from "../lib/youtube.server";
import { VideoCard } from "../components/VideoCard";
import { PageHeader } from "../components/PageHeader";
import { YouTubeTabs } from "../components/YouTubeTabs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "YouTube | Duke Skyloafer" },
    { name: "description", content: "Watch Duke Skyloafer's streams and videos." },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const env = context.cloudflare.env;
  const apiKey = env.YOUTUBE_API_KEY;
  const channelId = env.YOUTUBE_CHANNEL_ID;

  const [upcoming, recent] = await Promise.all([
    cachedFetch(env.DSCACHE, "yt:upcoming", 1800, () => fetchUpcomingStreams(apiKey, channelId)),
    cachedFetch(env.DSCACHE, "yt:recent", 1800, () => fetchRecentVideos(apiKey, channelId)),
  ]);

  const upcomingIds = new Set(upcoming.map((s) => s.videoId));
  const filteredRecent = recent.filter((v) => !upcomingIds.has(v.videoId));

  return { upcoming, recent: filteredRecent };
}

export default function YouTube({ loaderData }: Route.ComponentProps) {
  const { upcoming, recent } = loaderData;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <YouTubeTabs />
      {upcoming.length > 0 && (
        <section className="mb-12">
          <PageHeader title="Upcoming Streams" />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((stream) => (
              <VideoCard
                key={stream.videoId}
                videoId={stream.videoId}
                title={stream.title}
                thumbnail={stream.thumbnail}
                subtitle={new Date(stream.scheduledStartTime).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <PageHeader title="Recent Videos" />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
