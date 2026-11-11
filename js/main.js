import {chargerFilms} from "./api.js";


async function afficher(){
    const cinetrack = await chargerFilms();
    console.table(cinetrack);
}

afficher();