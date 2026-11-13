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
let films=[]

let recherche = ""
let typeChoisi="all"

function afficherListe(){
const resultat = films.filter(f => f.title.toLowerCase().includes(recherche))
.filter(f => typeChoisi === "all" || f.type === typeChoisi)
afficherCards(resultat)
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
afficherListe()
})

boutonsFiltre.forEach( function(bouton){
    bouton.addEventListener("click",function(){
        typeChoisi = bouton.dataset.type
        boutonsFiltre.forEach(b=>b.classList.remove("bg-red-700"))
        bouton.classList.add("bg-red-700")
        afficherListe()
    })
    
});
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
    //clic sur img ou voir plus ovurur modal
    const clicSurImage = e.target.tagName === "IMG"
    const clicSurBouton = e.target.closest(".btn-voir")
    
    if (!clicSurImage && !clicSurBouton) return

    
    ouvrirModal(film)
})

// retirer favoris avec X dans side bar
listeFavoris.addEventListener("click",function(e){
    const bouton = e.target.closest(".retirer")
    if(bouton === null) return;
    const id = bouton.closest("li").dataset.id
    retirerFavori(id)
    afficherFavoris()
    afficherListe()
})

boutonFermer.addEventListener("click",fermerModal)

afficher()
