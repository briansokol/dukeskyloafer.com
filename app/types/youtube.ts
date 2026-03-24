export interface YouTubeThumbnails {
  default: { url: string };
  high?: { url: string };
}

export interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: { title: string; thumbnails: YouTubeThumbnails };
}

export interface YouTubeSearchResponse {
  items?: YouTubeSearchItem[];
}

export interface YouTubeVideoItem {
  id: string;
  snippet: { title: string; thumbnails: YouTubeThumbnails };
  liveStreamingDetails?: { scheduledStartTime?: string };
}

export interface YouTubeVideosResponse {
  items: YouTubeVideoItem[];
}

export interface YouTubePlaylistItemItem {
  snippet: {
    title: string;
    thumbnails: YouTubeThumbnails;
    resourceId: { videoId: string };
  };
  contentDetails: { videoPublishedAt: string };
}

export interface YouTubePlaylistItemsResponse {
  items: YouTubePlaylistItemItem[];
}

export interface YouTubePlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
  };
  contentDetails: { itemCount: number };
}

export interface YouTubePlaylistsResponse {
  items: YouTubePlaylistItem[];
}

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
