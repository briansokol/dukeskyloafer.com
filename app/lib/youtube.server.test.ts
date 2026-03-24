import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchUpcomingStreams, fetchRecentVideos, fetchPlaylists } from "./youtube.server";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

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
