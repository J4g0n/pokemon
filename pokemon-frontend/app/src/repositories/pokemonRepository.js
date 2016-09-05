import 'whatwg-fetch';
import { baseUrl } from '../config';


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
    // todo add search as request to api
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
            return response.json();
        },
        error => {
            console.error(error);
        }
    );
};