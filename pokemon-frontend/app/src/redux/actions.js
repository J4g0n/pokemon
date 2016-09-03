export const actions = {
    SEARCH_POKEMON: "SEARCH_POKEMON",
    RESET_APP: "RESET_APP"
};


export const actionHandlers = {
    searchPokemon(searchText) {
        return {
            type: actions.SEARCH_POKEMON,
            searchText: searchText
        }
    },

    resetApp() {
        return {
            type: actions.RESET_APP
        }
    }
};
