import { actions } from '../actions.js';


const searchReducer = function(state = { "searchText": "" }, action) {
    console.log("State should not be empty WTF?! ", state);
    switch (action.type) {
        case actions.RESET_APP:
            return Object.assign({}, state, {
                "searchText": action.text
            });
        default:
            return state;
    }
};

export default searchReducer;