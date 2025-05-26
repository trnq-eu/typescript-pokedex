export async function commandExit(state, ..._args) {
    console.log('Closing the Pokedex... Goodbye!');
    state.rl.close();
    process.exit(0);
}
;
