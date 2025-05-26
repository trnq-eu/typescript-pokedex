import  { State } from "./state.js"

export async function commandHelp(state: State, ..._args: string[]) {
    console.log('Welcome to the Pokedex!')
    console.log('Usage:')
    for (let commandName in state.commands) {
        const command = state.commands[commandName]
        console.log(`${command.name}: ${command.description}`)
    }
};