import type { Route } from "./+types/youtube";
import { cachedFetch } from "../lib/cache.server";
import { fetchUpcomingStreams, fetchRecentVideos } from "../lib/youtube.server";
import { CardGrid } from "../components/CardGrid";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { VideoCard } from "../components/VideoCard";
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
    <PageContainer>
      <YouTubeTabs />
      {upcoming.length > 0 && (
        <section className="mb-12">
          <PageHeader
            title="Upcoming Streams"
            link={{ label: "My YouTube Channel", href: "https://www.youtube.com/@DukeSkyloafer" }}
            subtitle="I typically stream on Thursdays and Sundays."
          />
          <CardGrid columns={3}>
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
          </CardGrid>
        </section>
      )}

      <section className="mt-12">
        <PageHeader
          title="Recent Videos"
          link={{ label: "See All Videos", href: "https://www.youtube.com/@DukeSkyloafer/videos" }}
        />
        <CardGrid columns={3}>
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
        </CardGrid>
      </section>
    </PageContainer>
  );
}
