export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
        let response;
        if (!pageURL) {
            pageURL = 'https://pokeapi.co/api/v2/location-area/';
        }
        response = await fetch(pageURL);
        if (!response.ok) {
            //errors handling
            throw new Error(`HTTP error. Status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    async fetchLocation(locationName) {
        let response;
        const locationURL = `https://pokeapi.co/api/v2/location-area/${locationName}`;
        response = await fetch(locationURL);
        if (!response.ok) {
            //errors handling
            throw new Error(`HTTP error. Status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
}
