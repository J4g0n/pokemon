import 'isomorphic-fetch';
import axios from 'axios';
import _ from 'lodash';
require('es6-promise').polyfill();
import { baseUrl } from '../config';


function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json();
}


export const getPokemonList = () => {
    // todo add pagination to it
    const url = baseUrl + "pokemons";
    return fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
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
            return response.json();
        },
        error => {
            console.error(error);
        }
    );
};

/*export const getTypeStats = (id) => {
    return fetch(baseUrl + "typeStats/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "reload"
    })
        .then(status)
        .then(json)
        .catch(error => {
            console.log("ERROR: ", error);
        });
};*/

export const getTypeStats = (id) => {
    return axios.get(baseUrl + "typeStats/" + id).then(function (response) {
        console.log("Type stats: ", response);
        return response;
    })
};

