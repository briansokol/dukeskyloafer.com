import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchPinnedRepos } from "./github.server";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

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
