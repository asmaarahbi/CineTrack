const modal =document.getElementById("modal")
const contenu = document.getElementById("modal-contenu")

export function ouvrirModal(film){
    contenu.innerHTML=`<img src ="${film.image}" alt="${film.title}" class="mb-4 h-64 w-full rounded-lg object-cover">
    <h2 class="text-xl font-bold">${film.title}</h2>
    <p class="text-sm text-gray-400">${film.releaseYear} .${film.type}</p>`
    modal.classList.remove("hidden")
    modal.classList.add("flex")
}
export function fermerModal(){
    modal.classList.add("hidden")
    modal.classList.remove("flex")
}