import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import search from './modules/searchReducer.js';
import content from './modules/contentReducer.js';
//import logger from 'redux-logger'

// here is an example of middleware we can put to process state before reducers
// let's cook some tweaks!!!
/*let finalCreateStore = compose(
    applyMiddleware(logger())
)(createStore);*/

const combinedReducers = combineReducers({
    search,
    content
});

// ok it seems you have to address reducer value by name if you want to avoid warnings
const defaultInitialState = {
    "search": {
        "searchText": ""
    },
    "content": {
        "pokemons": []
    }
};


export default function getStore() {
    return createStore(combinedReducers, defaultInitialState);
}