import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;


    constructor(cacheInterval: number = 5 * 60 * 100) {
      this.cache = new Cache(cacheInterval);
    }
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      const urlToFetch = pageURL || `${PokeAPI.baseURL}/location-area/`;
      
      // Check cache first
      const cachedData = this.cache.get<ShallowLocations>(urlToFetch);
      if (cachedData) {
        // console.log(`[Cache HIT] for ${urlToFetch}`); // Optional: for debugging
        return cachedData;
      }
  
      const response = await fetch(urlToFetch);
      
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
  
    async fetchLocation(locationName: string): Promise<LocationAreaDetail> {
     
        const locationURL = `${PokeAPI.baseURL}/location-area/${locationName}`
        
        // Check cache first
        const cachedData = this.cache.get<LocationAreaDetail>(locationURL);

        if (cachedData) {
          // console.log(`[Cache HIT] for ${locationURL}`); // Optional: for debugging
          return cachedData;
        }

        const response = await fetch(locationURL);

        if (!response.ok) {
            //errors handling
            throw new Error(`HTTP error. Status: ${response.status} - ${response.statusText}`)
          }

        const data: LocationAreaDetail = await response.json();


        // Add to cache
        this.cache.add(locationURL, data);

        return data
  }

      async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const pokemonURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        // Check cache first
        const cachedData = this.cache.get<Pokemon>(pokemonURL);

        if (cachedData) {
          return cachedData;
      }
        const response = await fetch(pokemonURL);

         if (!response.ok) {
        //errors handling
        throw new Error(`HTTP error. Status: ${response.status} - ${response.statusText}`)
      }

      const data: Pokemon = await response.json();

      // Add to cache
      this.cache.add(pokemonURL, data);

      return data;

  }
}

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    stat: { name: string; url: string };
  }>;
  types: Array<{
    slot: number;
    type: { name: string; url: string };
  }>;

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

// Represents a generic named resource from PokeAPI (like a Pokemon, Location, etc.)
export type PokemonResource = {
  name: string;
  url: string;
};

export type LocationAreaPokemonEncounter = {
  pokemon: PokemonResource;
  version_details: any[];
};

export type LocationAreaDetail = {
  id: number;
  name: string;
  game_index: number;
  location: PokemonResource;
  pokemon_encounters: LocationAreaPokemonEncounter[];

}

// export type Location = {
// "name": string,
// "url": string
// };
