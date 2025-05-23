import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;


    constructor(cacheInterval: number = 5 * 60 * 1000) { // Default cache interval: 5 minutes
      this.cache = new Cache(cacheInterval);
    }
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      // let response 
      // if (!pageURL){
      //   pageURL = 'https://pokeapi.co/api/v2/location-area/'
      // }
      const urlToFetch = pageURL || `${PokeAPI.baseURL}/location-area/`;
      
      // Check cache first
      const cachedData = this.cache.get<ShallowLocations>(urlToFetch);
      if (cachedData) {
        // console.log(`[Cache HIT] for ${urlToFetch}`); // Optional: for debugging
        return cachedData;
      }
  
      const response = await fetch(urlToFetch);
      
      // response = await fetch(pageURL);
      if (!response.ok) {
        //errors handling
        throw new Error(`HTTP error. Status: ${response.status} - ${response.statusText}`)
      }
      // const data = await response.json();
      const data: ShallowLocations = await response.json();

      // Add to cache
      this.cache.add(urlToFetch, data);
  
      return data
    }
  
    async fetchLocation(locationName: string): Promise<Location> {
        let response
        const locationURL = `https://pokeapi.co/api/v2/location-area/${locationName}`
        response = await fetch(locationURL)
        if (!response.ok) {
            //errors handling
            throw new Error(`HTTP error. Status: ${response.status} - ${response.statusText}`)
          }
        const data = await response.json();
        return data
  }
}

export type ShallowLocationResult = {
    "name": string,
    "url": string
}

  
export type ShallowLocations = {
count: number,
next: string | null,
previous: string | null,
results: Array<ShallowLocationResult>,

};

export type Location = {
"name": string,
"url": string
};
