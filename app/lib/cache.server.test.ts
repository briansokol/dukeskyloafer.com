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
    expect(kv.put).toHaveBeenCalledWith("test-key", JSON.stringify({ data: "fresh" }), {
      expirationTtl: 1800,
    });
  });
});
