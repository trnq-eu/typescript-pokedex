import  { State } from "./state.js"

export async function commandMapb(state: State, ..._args: string[]) {
    let urlToFetch = state.prevLocationsURL
    try {
        if (!urlToFetch){
            urlToFetch = "https://pokeapi.co/api/v2/location-area/";
        }
        const locationsList = await state.pokeAPIobj.fetchLocations(urlToFetch)
        state.prevLocationsURL = locationsList['previous']
        state.nextLocationsURL = locationsList['next']
        for (let l of locationsList["results"]) {
            
            console.log(l["name"])
        
        }
    }
        catch (error){
            console.log(error)
    }
    
}
