import 'whatwg-fetch';
import { baseUrl } from '../config';


export const getPokemonList = () => {
    // todo 1. externalise this to rest api
    // todo 2. add pagination to it
    const url = "http://pokeapi.co/api/v2/pokemon/?limit=1000";
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

export const getPokemon = (url) => {
    // todo 1. externalise this to rest api
    // todo 2. add pagination to it
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