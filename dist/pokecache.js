export class Cache {
    #cache = new Map();
    add(key, val) {
        const entry = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
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
