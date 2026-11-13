import {chargerFilms} from "./api.js";
import { afficherCards} from "./movies.js"
import { ouvrirModal , fermerModal } from "./modal.js";
import { estFavori, ajouterFavori,retirerFavori,afficherFavoris } from "./favorites.js";

const grid = document.getElementById("grid")
const message = document.getElementById("message")
const boutonFermer=document.getElementById("fermer")
const champRecherche=document.getElementById("recherche")
const boutonsFiltre = document.querySelectorAll(".filtre")
const listeFavoris = document.getElementById("liste-favoris")

const boutonPrecedent = document.getElementById("precedent")
const boutonSuivant = document.getElementById("suivant")
const infoPage = document.getElementById("info-page")

let films=[]
let recherche = ""
let typeChoisi="all"

let page = 1
let nbPages = 1
const parPage = 8

function afficherListe(){
    // 1. recherche, 2. filtre
    const resultat = films
        .filter(f => f.title.toLowerCase().includes(recherche))
        .filter(f => typeChoisi === "all" || f.type === typeChoisi)

    // 3. pagination
    nbPages = Math.ceil(resultat.length / parPage)
    if (nbPages === 0) nbPages = 1

    const debut = (page - 1) * parPage
    const filmsDeLaPage = resultat.slice(debut, debut + parPage)

    afficherCards(filmsDeLaPage)

    infoPage.textContent = "Page " + page + " / " + nbPages
    boutonPrecedent.disabled = page === 1
    boutonSuivant.disabled = page === nbPages
}

async function afficher(){
    afficherFavoris()

    films = await chargerFilms();
    if (films.length === 0){
        message.textContent = "Impossible de charger les films"
        message.classList.remove("hidden")
        return
    }

    afficherListe()
}

champRecherche.addEventListener("input", function(){
    recherche = champRecherche.value.toLowerCase().trim()
    page = 1
    afficherListe()
})

boutonsFiltre.forEach( function(bouton){
    bouton.addEventListener("click",function(){
        typeChoisi = bouton.dataset.type
        page = 1
        boutonsFiltre.forEach(b=>b.classList.remove("bg-red-700"))
        bouton.classList.add("bg-red-700")
        afficherListe()
    })
});

boutonPrecedent.addEventListener("click", function(){
    if (page > 1){
        page--
        afficherListe()
    }
})

boutonSuivant.addEventListener("click", function(){
    if (page < nbPages){
        page++
        afficherListe()
    }
})

grid.addEventListener("click",function(e){
    const card = e.target.closest(".card")
    if(card === null) return

    const film = films.find(f=>String(f.id) === card.dataset.id)

    if(e.target.closest(".coeur")){
        if(estFavori(film.id)){
            retirerFavori(film.id)
        }else{
            ajouterFavori(film)
        }
        afficherFavoris()
        afficherListe()
        return
    }

    const clicSurImage = e.target.tagName === "IMG"
    const clicSurBouton = e.target.closest(".btn-voir")
    if (!clicSurImage && !clicSurBouton) return

    ouvrirModal(film)
})

listeFavoris.addEventListener("click",function(e){
    const bouton = e.target.closest(".retirer")
    if(bouton === null) return
    const id = bouton.closest("li").dataset.id
    retirerFavori(id)
    afficherFavoris()
    afficherListe()
})

boutonFermer.addEventListener("click",fermerModal)

afficher()