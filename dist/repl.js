import { commandExit } from './command_exit.js';
import { commandHelp } from "./command_help.js";
import { commandMap } from './command_map.js';
import { commandMapb } from './command_mapb.js';
export function cleanInput(input) {
    // Convert to lowercase and split by spaces
    return input.toLowerCase().trim().split(" ");
}
export function getCommands() {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays the help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays a list of 20 locations",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays a list of the previous 20 locations",
            callback: commandMapb,
        }
    };
}
export function startREPL(state) {
    // Display yhe initial prompt
    state.rl.prompt();
    // listen for user input
    state.rl.on('line', async (input) => {
        // Clean the input
        const cleanedInput = cleanInput(input);
        // If the input is empty, just show the prompt again
        if (cleanedInput.length === 0 || cleanedInput[0] === '') {
            state.rl.prompt();
            return;
        }
        const command = state.commands[cleanedInput[0]];
        if (!command) {
            console.log("Unknown command");
            state.rl.prompt();
            return;
        }
        else {
            try {
                await command.callback(state);
            }
            catch (error) {
                console.log("Error:", error);
            }
            if (command.name !== "exit") {
                state.rl.prompt();
            }
        }
    });
}
