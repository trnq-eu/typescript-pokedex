import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length !== 1) {
    console.log("Usage: catch <pokemon_name>");
    console.log("Example: catch pikachu");
    return;
  }

  const pokemonName = args[0].toLowerCase();
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  try {
    if (state.pokedex[pokemonName]) {
      console.log(`${pokemonName} has already been caught!`);
      return;
    }

    const pokemonData = await state.pokeAPIobj.fetchPokemon(pokemonName);

    // Catch logic:
    // The higher the base_experience, the harder it is to catch.
    // We'll use a simple formula: chance = (threshold - base_experience) / threshold
    // Adjust `catchDifficultyThreshold` to make catching generally easier or harder.
    // A higher threshold means easier catches for Pokémon with lower base_experience.
    // Max base_experience is around 635 (Blissey).

    const catchDifficultyThreshold = 500;
    let chanceOfSuccess =
      (catchDifficultyThreshold - pokemonData.base_experience) /
      catchDifficultyThreshold;
    // Clamp the chance between a minimum (e.g., 5%) and a maximum (e.g., 95% or 100%)
    // This prevents negative chances or guaranteed catches for very low base_experience.
    chanceOfSuccess = Math.max(0.05, Math.min(1.0, chanceOfSuccess));

    const catchRoll = Math.random(); // Generates a number between 0.0 (inclusive) and 1.0 (exclusive)

    // For debugging the catch mechanic:
    // console.log(`[Debug] Pokemon: ${pokemonData.name}, Base Exp: ${pokemonData.base_experience}`);
    // console.log(`[Debug] Chance of Success: ${chanceOfSuccess.toFixed(3)}`);
    // console.log(`[Debug] Catch Roll: ${catchRoll.toFixed(3)}`);

    if (catchRoll < chanceOfSuccess) {
      console.log(`${pokemonData.name} was caught!`);
      state.pokedex[pokemonData.name.toLowerCase()] = pokemonData; // Add to Pokedex using lowercase name as key
      console.log(`${pokemonData.name} added to your Pokedex.`);
    } else {
      console.log(`${pokemonData.name} escaped! Better luck next time.`);
    }
  } catch (error) {
    // FIX: Corrected typo `loLowerCase` to `toLowerCase`
    // FIX: Added the `error` object to console.error
    if (
      error instanceof Error &&
      (error.message.includes("404") ||
        error.message.toLowerCase().includes("not found"))
    ) {
      console.log(`Pokemon "${pokemonName}" could not be found.`);
    } else {
      console.error("An unexpected error occurred:", error); // More descriptive error logging
    }
  }
}