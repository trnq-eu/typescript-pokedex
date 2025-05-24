export type CacheEntry<T> = {
    createdAt: number,
    val: T;
};


export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    public add<T>(key: string, val: T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }

    #reap(): void {
        const now = Date.now();
        for (const [key, entry] of this.#cache.entries()) {
            if (entry.createdAt < (now - this.#interval)) {
                this.#cache.delete(key);
            }
        }
    }



    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    public stopReapLoop(): void {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }


    public get<T>(key: string): T | undefined {
        // 1. Get the CacheEntry from the internal map
        const entry = this.#cache.get(key);

        // 2. Check if the entry exists
        if (!entry) {
            return undefined
        }

        // 3. Return the 'val' property of the CacheEntry,
        return entry.val;
    }

}