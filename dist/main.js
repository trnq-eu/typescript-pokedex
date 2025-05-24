// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initState } from "./state.js";
const state = initState();
function main() {
    startREPL(state);
}
main();
