export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, val) {
        const entry = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }
    #reap() {
        const now = Date.now();
        for (const [key, entry] of this.#cache.entries()) {
            if (entry.createdAt < (now - this.#interval)) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }
    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
    get(key) {
        // 1. Get the CacheEntry from the internal map
        const entry = this.#cache.get(key);
        // 2. Check if the entry exists
        if (!entry) {
            return undefined;
        }
        // 3. Return the 'val' property of the CacheEntry,
        return entry.val;
    }
}
