const cle = "favorites"
export function getFavoris(){
    return JSON.parse(localStorage.getItem(cle)) || []
}
function sauvegarder(favs){
    localStorage.setItem(cle,JSON.stringify(favs))
}
export function estFavori (id){
    return getFavoris().some(f=>String(f.id) === String(id))
}
export function ajouterFavori (film){
    if(estFavori(film.id)) return;
    const favs = getFavoris()
    favs.push(film)
    sauvegarder(favs)
}

export function retirerFavori(id){
    const favs = getFavoris().filter(f=>String(f.id) !== String(id))
    sauvegarder(favs)
}

export function afficherFavoris(){
    const liste = document.getElementById("liste-favoris")
    const compteur = document.getElementById("compteur")
    const favs = getFavoris()

    if(favs.length === 0){
        liste.innerHTML = `<p class = " text-sm text-gray-500"> Aucun favori pour le moment</p>` 
       }else{
        liste.innerHTML=favs.map(f=>` <li class = "flex items-center gap-3" data-id="${f.id}">
            <img src = "${f.image}" alt="${f.title}" class="h-14 w-10 rounded object-cover">
            <div class= "min-w-0 flex-1">
            <p class= "truncate text-sm font-bold">${f.title}</p>
            <p class = "text-xs text-gray-400">${f.type}</p>
             </div>
             <button class="retirer text-gray-400 hover:text-red-500">X</button>
            </li>`).join("")
       }

       const nbFilms = favs.reduce((total,f)=> f.type === "movie" ? total+1 : total,0)
        const nbSeries = favs.reduce((total,f)=> f.type ==="series" ? total+1 : total,0)
       compteur.textContent = nbFilms + " films ." +nbSeries +" series "
}        
