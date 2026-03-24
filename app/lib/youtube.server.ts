import type {
  UpcomingStream,
  RecentVideo,
  Playlist,
  YouTubeSearchResponse,
  YouTubeVideosResponse,
  YouTubePlaylistItemsResponse,
  YouTubePlaylistsResponse,
} from "../types/youtube";

export type { UpcomingStream, RecentVideo, Playlist } from "../types/youtube";

const YT_BASE = "https://www.googleapis.com/youtube/v3";

export async function fetchUpcomingStreams(
  apiKey: string,
  channelId: string,
): Promise<UpcomingStream[]> {
  const searchUrl = `${YT_BASE}/search?part=snippet&channelId=${channelId}&eventType=upcoming&type=video&order=date&maxResults=10&key=${apiKey}`;
  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) throw new Error(`YouTube search failed: ${searchRes.status}`);
  const searchData: YouTubeSearchResponse = await searchRes.json();

  if (!searchData.items?.length) return [];

  const videoIds = searchData.items.map((item) => item.id.videoId).join(",");
  const videosUrl = `${YT_BASE}/videos?part=snippet,liveStreamingDetails&id=${videoIds}&key=${apiKey}`;
  const videosRes = await fetch(videosUrl);
  if (!videosRes.ok) throw new Error(`YouTube videos failed: ${videosRes.status}`);
  const videosData: YouTubeVideosResponse = await videosRes.json();

  return videosData.items
    .map((item) => ({
      videoId: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high?.url ?? item.snippet.thumbnails.default.url,
      scheduledStartTime: item.liveStreamingDetails?.scheduledStartTime ?? "",
    }))
    .toSorted(
      (a, b) => new Date(a.scheduledStartTime).getTime() - new Date(b.scheduledStartTime).getTime(),
    );
}

export async function fetchRecentVideos(
  apiKey: string,
  channelId: string,
  maxResults = 12,
): Promise<RecentVideo[]> {
  // Derive uploads playlist ID: UC... -> UU...
  const uploadsPlaylistId = "UU" + channelId.slice(2);
  const url = `${YT_BASE}/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube playlistItems failed: ${res.status}`);
  const data: YouTubePlaylistItemsResponse = await res.json();

  return data.items.map((item) => ({
    videoId: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high?.url ?? item.snippet.thumbnails.default.url,
    publishedAt: item.contentDetails.videoPublishedAt,
  }));
}

export async function fetchPlaylists(apiKey: string, playlistIds: string[]): Promise<Playlist[]> {
  const ids = playlistIds.join(",");
  const url = `${YT_BASE}/playlists?part=snippet,contentDetails&id=${ids}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube playlists failed: ${res.status}`);
  const data: YouTubePlaylistsResponse = await res.json();

  return data.items.map((item) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high?.url ?? item.snippet.thumbnails.default.url,
    videoCount: item.contentDetails.itemCount,
  }));
}
