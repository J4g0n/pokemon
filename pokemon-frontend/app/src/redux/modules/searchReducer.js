import { actions } from '../actions.js';


const searchReducer = function(state = { "searchText": "" }, action) {
    switch (action.type) {
        case actions.SEARCH_POKEMON:
            console.log("SEARCH POKEMON: ", action);
            return Object.assign({}, state, {
                "searchText": action.searchText
            });
        default:
            return state;
    }
};

export default searchReducer;