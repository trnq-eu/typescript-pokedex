import { State } from "./state.js";

export async function commandPokedex(state: State) {
    console.log("Usage: pokedex");

    const pokedexContent = Object.values(state.pokedex);

    if (pokedexContent.length === 0) {
        console.log("Your Pokedex is empty. Go catch some Pokemon!")
    } else {
        pokedexContent.forEach(element => {
        console.log(`- ${element.name}`);
    });
    }
  
    
}
