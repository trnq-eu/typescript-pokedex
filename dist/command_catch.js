export async function commandCatch(state, ...args) {
    if (args.length !== 1) {
        console.log("Usage: catch <pokemon_name>");
        console.log("Example: catch pikachu");
        return;
    }
    const pokemon = args[0];
    console.log(`Throwing a Pokeball at ${pokemon}...`);
    try {
    }
    catch {
        Error;
    }
}
