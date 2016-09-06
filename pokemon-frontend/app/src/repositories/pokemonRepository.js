import 'whatwg-fetch';
import { baseUrl } from '../config';

var pokemonFetched;
var pokemonFetchedPromise;

export const getPokemonList = () => {
    // todo add pagination to it
    const url = baseUrl + "pokemons";
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    }).then(
        response => {
            return response.json();
        },
        error => {
            console.error(error);
        }
    );
};

export const searchPokemon = (pokemonName) => {
    // todo implement search as request to api
};

export const getPokemon = (id) => {
    return fetch(baseUrl + "pokemon/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    }).then(
        response => {
            let pokemonFetchedPromise = response.json().then(pokemonFound => {
                pokemonFetched = pokemonFound;
                console.log("Found pokemon inside repository: ", pokemonFound);
                return pokemonFound;
            });
            return pokemonFetchedPromise;
        },
        error => {
            console.error(error);
        }
    );
};