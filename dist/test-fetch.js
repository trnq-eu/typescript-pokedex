// test-fetch.ts
import { PokeAPI } from "./pokeapi.js";
async function testFetch() {
    const poke = new PokeAPI();
    const result = await poke.fetchLocations();
    console.log(result);
}
testFetch();
