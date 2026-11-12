import {chargerFilms} from "./api.js";
import { afficherCards} from "./movies.js"
import { ouvrirModal , fermerModal } from "./modal.js";
const grid = document.getElementById("grid")
const message = document.getElementById("message")
const boutonFermer=document.getElementById("fermer")
let films=[]

async function afficher(){
    films = await chargerFilms();
    if (films.length === 0){
    message.textContent="Impossible de charger les films"
    message.classList.remove("hidden")
    return; }

afficherCards(films);
    }

grid.addEventListener("click",function(e){
    if(e.target.closest(".coeur")) return
    
    const card = e.target.closest(".card")
    if(card === null) return

    const clicSurImage = e.target.tagName === "IMG"
    const clicSurBouton = e.target.closest(".btn-voir")
    
    if (!clicSurImage && !clicSurBouton) return

    const film = films.find(f=>String(f.id) === card.dataset.id)
    ouvrirModal(film)
})

boutonFermer.addEventListener("click",fermerModal)

afficher()
