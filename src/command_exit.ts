import  { State } from "./state.js"

export async function commandExit(state: State, ..._args: string[]) {
    console.log('Closing the Pokedex... Goodbye!')
    state.rl.close()
    process.exit(0)
};