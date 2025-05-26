import { getCommands } from "./repl.js"
import { createInterface, type Interface } from "readline";
import { PokeAPI } from "./pokeapi.js"
import * as readline from 'readline';


export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeAPIobj: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(): State {
    // Create the interface
        const pokeAPIobj = new PokeAPI();
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'Pokedex >'
        });
        const commands = getCommands()
        // start at the FIRST page! No previous page yet.
        const nextLocationsURL = "https://pokeapi.co/api/v2/location-area/";
        const prevLocationsURL = null;
        return {rl, commands, pokeAPIobj,nextLocationsURL, prevLocationsURL}
}