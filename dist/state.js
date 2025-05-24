import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";
import * as readline from 'readline';
export function initState() {
    // Create the interface
    const pokeAPIobj = new PokeAPI();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex >'
    });
    const commands = getCommands();
    // start at the FIRST page! No previous page yet.
    const nextLocationsURL = "https://pokeapi.co/api/v2/location-area/";
    const prevLocationsURL = null;
    return { rl, commands, pokeAPIobj, nextLocationsURL, prevLocationsURL };
}
