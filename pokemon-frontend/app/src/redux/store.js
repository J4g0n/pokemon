import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import searchReducer from './modules/searchReducer.js';
import contentReducer from './modules/contentReducer.js';
//import logger from 'redux-logger'

// here is an example of middleware we can put to process state before reducers
// let's cook some tweaks!!!
/*let finalCreateStore = compose(
    applyMiddleware(logger())
)(createStore);*/

const combinedReducers = combineReducers({
    searchReducer,
    contentReducer
});

// ok it seems you have to address reducer value by name if you want to avoid warnings
const defaultInitialState = {
    "searchReducer": { "searchText": "" },
    "contentReducer": { "pokemons": [] }
};


export default function getStore() {
    return createStore(combinedReducers, defaultInitialState);
}