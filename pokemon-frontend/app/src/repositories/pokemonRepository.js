import 'isomorphic-fetch';
import axios from 'axios';
import _ from 'lodash';
require('es6-promise').polyfill();
import { baseUrl } from '../config';


export const getPokemonList = () => {
    // todo add pagination to it
    const url = baseUrl + "pokemons";
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "reload"
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
        mode: "cors",
        cache: "reload"
    }).then(
        response => {
            return response.json();
        },
        error => {
            console.error(error);
        }
    );
};
/*
export const getTypeStats = (id) => {
    return fetch(baseUrl + "typeStats/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "reload"
    }).then(
        response => {
            console.log(response.status + ": " + response.statusText + "\n" + response);
            return response.json().then(
                json => {
                    console.log("Type stats: ", json);
                    return json;
                }
            );
        },
        error => {
            console.error(error);
        }
    ).catch(error => {
        console.log("ERROR: ", error);
    });
};
*/
export const getTypeStats = (id) => {
    return axios.get(baseUrl + "typeStats/" + id).then(function (response) {
        console.log("Type stats: ", response);
        return response;
    })
};
