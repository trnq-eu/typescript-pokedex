import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache;
    constructor(cacheInterval = 5 * 60 * 100) {
        this.cache = new Cache(cacheInterval);
    }
    async fetchLocations(pageURL) {
        const urlToFetch = pageURL || `${PokeAPI.baseURL}/location-area/`;
        // Check cache first
        const cachedData = this.cache.get(urlToFetch);
        if (cachedData) {
            // console.log(`[Cache HIT] for ${urlToFetch}`); // Optional: for debugging
            return cachedData;
        }
        const response = await fetch(urlToFetch);
        if (!response.ok) {
            //errors handling
            throw new Error(`HTTP error. Status: ${response.status} - ${response.statusText}`);
        }
        // const data = await response.json();
        const data = await response.json();
        // Add to cache
        this.cache.add(urlToFetch, data);
        return data;
    }
    async fetchLocation(locationName) {
        const locationURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
        // Check cache first
        const cachedData = this.cache.get(locationURL);
        if (cachedData) {
            // console.log(`[Cache HIT] for ${locationURL}`); // Optional: for debugging
            return cachedData;
        }
        const response = await fetch(locationURL);
        if (!response.ok) {
            //errors handling
            throw new Error(`HTTP error. Status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        // Add to cache
        this.cache.add(locationURL, data);
        return data;
    }
    async fetchPokemon(pokemonName) {
        const pokemonURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        // Check cache first
        const cachedData = this.cache.get(pokemonURL);
        if (cachedData) {
            return cachedData;
        }
        const response = await fetch(pokemonURL);
        if (!response.ok) {
            //errors handling
            throw new Error(`HTTP error. Status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        // Add to cache
        this.cache.add(pokemonURL, data);
        return data;
    }
}
// export type Location = {
// "name": string,
// "url": string
// };
