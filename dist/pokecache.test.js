import { describe, test, expect } from "vitest";
import { Cache } from "./pokecache.js";
describe("Cache", () => {
    test.concurrent.each([
        {
            key: "https://example.com",
            val: "testdata",
            interval: 500, // 1/2 second
        },
        // {
        //   key: "https://example.com/path",
        //   val: "moretestdata",
        //   interval: 1000, // 1 second
        // },
        {
            key: "https://example.com/short",
            val: "shortlived",
            interval: 50, // 50 ms, very short for quick reaping test
        },
    ])("Test Caching ($description) $interval ms", async ({ key, val, interval }) => {
        const cache = new Cache(interval);
        cache.add(key, val);
        const cached = cache.get(key);
        expect(cached).toBe(val);
        // Wait for the interval plus a small buffer to ensure the reap cycle has a chance to run
        await new Promise((resolve) => setTimeout(resolve, interval + 100));
        const reaped = cache.get(key);
        expect(reaped).toBe(undefined);
        cache.stopReapLoop(); // Important to clean up timers
    });
});
