import { actions, actionHandlers } from '../actions.js';


const contentReducer = function(state = { "pokemons": [] }, action) {
    switch (action.type) {
        case actions.GET_POKEMON:
            return Object.assign({}, state, {
                "selectedPokemon": action.selectedPokemon,
            });
        case actions.GET_POKEMON_LIST:
            return Object.assign({}, state, {
                "pokemons": action.pokemons,
            });
        case actions.SEARCH_POKEMON:
            return Object.assign({}, state, {
                "searchText": action.searchText
            });
        case actions.RESET_APP:
            return Object.assign({}, state, {
                "selectedPokemon": undefined
            });
        default:
            return state;
    }
};

export default contentReducer;