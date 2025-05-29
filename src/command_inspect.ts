import { State } from "./state.js";


export async function commandInspect(state: State, ...args: string[]) {
  if (args.length !== 1) {
    console.log("Usage: inspect <pokemon_name>");
    console.log("Example: inspect pikachu");
    return;
  }

  const pokemonName = args[0].toLowerCase();
  const pokemonInPokedex = state.pokedex[pokemonName];
  if (!pokemonInPokedex) {
    console.log(`you have not caught that pokemon`);
    return;
  }

   // Pokemon is found in the Pokedex, print its details
  console.log(`Name: ${pokemonInPokedex.name}`);
  console.log(`Height: ${pokemonInPokedex.height}`);
  console.log(`Weight: ${pokemonInPokedex.weight}`);

  console.log(`Stats:`);
  pokemonInPokedex.stats.forEach(statInfo => {
    console.log(`   -${statInfo.stat.name}: ${statInfo.base_stat}`)
  });
  console.log(`Types:`);
  pokemonInPokedex.types.forEach(typeInfo => {
    console.log(`   -${typeInfo.type.name}`);
  })

}