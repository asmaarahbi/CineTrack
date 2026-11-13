
import { estFavori } from "./favorites.js"
function creation_carte(film){
let remplissage = "none"
let couleur= "text-white"
if(estFavori(film.id)){
    remplissage="currentColor"
    couleur="text-red-700"
}

return `<div class ="card  rounded-xl border border-neutral-700 bg-neutral-900 p-3" data-id="${film.id}">

<div class="relative">
<img src="${film.image}" alt="${film.title}" class="h-72 w-full rounded-lg object-cover">
<button class="coeur absolute right-2 top-2 rounded-full bg-black/60 p-2 ${couleur}  hover:text-red-500">
<svg xmlns="http://www.w3.org/2000/svg" fill="${remplissage}" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

</button>
</div>



<h3 class="mt-2 font-bold">${film.title} </h3>
<p class="text-sm text-gray-400">${film.releaseYear} . ${film.type}</p>
<button class = "btn-voir mt-3 w-full rounded border border-red-800 py-2 hover:bg-red-700">Voir plus</button> 
</div>`

}
export function afficherCards (films){
    const grid = document.getElementById("grid")
    if(films.length=== 0){
    grid.innerHTML=`<p class="col-span-full text-center text-gray-400">Aucun résultat</p>`
     return}

grid.innerHTML=films.map(creation_carte).join("")
    }