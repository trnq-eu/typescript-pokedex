// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { State, initState } from "./state.js"

const state = initState()

function main() {
  startREPL(state);
}

main();