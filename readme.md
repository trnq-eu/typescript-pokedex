# Pokedex CLI

A command-line interface (CLI) application built with TypeScript to simulate a Pokedex. Explore areas, encounter Pokémon, attempt to catch them, and manage your collection!

This is a project developed for the [boot.dev Typescript Backend Path course](https://www.boot.dev/courses/build-pokedex-cli-typescript): 

## Features

*   **Explore Areas**: Discover different location areas from the Pokémon world.
*   **Find Pokémon**: See which Pokémon can be found in each explored area.
*   **Catch Pokémon**: Attempt to catch Pokémon you encounter. Catch probability is influenced by the Pokémon's base experience.
*   **Inspect Pokémon**: View detailed information (name, height, weight, stats, types) for Pokémon you've caught.
*   **View Pokedex**: List all Pokémon you have successfully caught.
*   **Navigation**: Paginate through lists of location areas (`map`, `mapb`).
*   **Caching**: API responses are cached to improve performance and reduce redundant calls.
*   **Help & Exit**: Standard CLI commands for assistance and quitting the application.

## Prerequisites

*   Node.js (v16 or newer recommended)
*   npm (comes with Node.js) or yarn

## Installation & Setup

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <your-repository-url>
    cd typescript-pokedex
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Compile TypeScript:**
    The project likely has a build script in `package.json`. Typically, this would be:
    ```bash
    npm run build
    ```
    (This command assumes a `tsconfig.json` is configured and a build script like `"build": "tsc"` exists in `package.json`.)

## How to Run

After installation and compilation, you can start the Pokedex CLI:

```bash
npm start
```
Or, if you know the entry point of the compiled JavaScript (e.g., `dist/repl.js`):
```bash
node dist/repl.js
```

You will be greeted with the `Pokedex >` prompt.

## Available Commands

*   `help`: Displays a list of available commands and their descriptions.
*   `exit`: Exits the Pokedex application.
*   `map`: Displays the next page of location areas to explore.
*   `mapb`: Displays the previous page of location areas.
*   `explore <location_area_name>`: Shows a list of Pokémon that can be encountered in the specified location area.
    *   Example: `explore canalave-city-area`
*   `catch <pokemon_name>`: Attempts to catch the specified Pokémon. The success of the catch is based on the Pokémon's base experience.
    *   Example: `catch pikachu`
*   `inspect <pokemon_name>`: Displays detailed information (name, height, weight, stats, types) for a Pokémon you have caught.
    *   Example: `inspect pikachu`
    *   If the Pokémon has not been caught, it will inform you.
*   `pokedex`: Lists the names of all Pokémon you have successfully caught and stored in your Pokedex.

## Technologies Used

*   **TypeScript**: For static typing and modern JavaScript features.
*   **Node.js**: As the runtime environment.
*   **PokeAPI (v2)**: The source of all Pokémon, location, and game data.
*   **readline**: Node.js module for creating the command-line interface.

## Project Structure (Illustrative)

```
typescript-pokedex/
├── src/
│   ├── repl.ts           # Main REPL (Read-Eval-Print Loop) logic
│   ├── pokeapi.ts        # Handles communication with the PokeAPI
│   ├── state.ts          # Manages the application's state
│   ├── pokecache.ts      # Caching mechanism for API calls
│   ├── command_help.ts   # 'help' command logic
│   ├── command_exit.ts   # 'exit' command logic
│   ├── command_map.ts    # 'map' command logic
│   ├── command_mapb.ts   # 'mapb' command logic
│   ├── command_explore.ts# 'explore' command logic
│   ├── command_catch.ts  # 'catch' command logic
│   ├── command_inspect.ts# 'inspect' command logic
│   └── command_pokedex.ts# 'pokedex' command logic
├── dist/                 # Compiled JavaScript files (output of tsc)
├── node_modules/         # Project dependencies
├── package.json          # Project metadata and scripts
├── package-lock.json     # Lockfile for dependencies
└── tsconfig.json         # TypeScript compiler options
└── README.md             # This file
```

## Future Enhancements (Ideas)

*   Persistent Pokedex: Save caught Pokémon data so it persists between sessions.
*   More interactive catch mechanics.
*   Pokémon battles.
*   Visual representation of Pokémon (e.g., ASCII art).