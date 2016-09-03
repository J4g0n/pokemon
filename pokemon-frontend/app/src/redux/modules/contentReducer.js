import { actions, actionHandlers } from '../actions.js';


const contentReducer = function(state = { "pokemons": [] }, action) {
    switch (action.type) {
        case actions.SEARCH_POKEMON:
            return Object.assign({}, state, {
                "selectedPokemon": undefined,
            });
        default:
            return state;
    }
};

export default contentReducer;