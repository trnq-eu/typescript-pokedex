export async function commandExplore(state, ...args) {
    if (args.length !== 1) {
        console.log("Usage: explore <location_area_name");
        console.log("Example: explore pastoria-city-area");
        return;
    }
    const locationName = args[0];
    console.log(`Exploring ${locationName}...`);
    try {
        const locationData = await state.pokeAPIobj.fetchLocation(locationName);
        if (locationData.pokemon_encounters.length === 0) {
            console.log(`No Pokemon found in ${locationName}.`);
            return;
        }
        console.log("Found Pokemon:");
        for (const encounter of locationData.pokemon_encounters) {
            console.log(`- ${encounter.pokemon.name}`);
        }
    }
    catch (error) {
        console.error(`Failed to fetch data for ${locationName}. Error:}`, error instanceof Error ? error.message : error);
    }
}
;
