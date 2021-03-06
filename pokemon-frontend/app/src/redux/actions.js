export const actions = {
    SEARCH_POKEMON: "SEARCH_POKEMON",
    GET_POKEMON: "GET_POKEMON",
    GET_POKEMON_LIST: "GET_POKEMON_LIST",
    GET_TYPE_STATS: "GET_TYPE_STATS",
    RESET_APP: "RESET_APP"
};


export const actionHandlers = {
    getTypeStats(typeStats) {
        return {
            type: actions.GET_TYPE_STATS,
            typeStats: typeStats
        }
    },

    selectPokemon(pokemon) {
        return {
            type: actions.GET_POKEMON,
            selectedPokemon: pokemon
        }
    },

    getPokemonList(pokemons) {
        return {
            type: actions.GET_POKEMON_LIST,
            pokemons: pokemons
        }
    },

    searchPokemon(searchText) {
        console.log("search text: ", searchText);
        return {
            type: actions.SEARCH_POKEMON,
            searchText: searchText
        }
    },

    resetApp() {
        console.log("RESET APP");
        return {
            type: actions.RESET_APP
        }
    }
};
