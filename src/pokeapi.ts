export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
  
    constructor() {}
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      let response 
      if (!pageURL){
        pageURL = 'https://pokeapi.co/api/v2/location-area/'
      }
      response = await fetch(pageURL);
      if (!response.ok) {
        //errors handling
        throw new Error(`HTTP error. Status: ${response.status} - ${response.statusText}`)
      }
      const data = await response.json();
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
