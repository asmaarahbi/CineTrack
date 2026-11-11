function creation_carte(film){
return `<div class ="card cursor-pointer" data-id="${film.id}">
<img src="${film.image}" alt="${film.title}" class="h-72 w-full rounded-lg object-cover>
<h3 class="mt-2 font-bold">${film.title} </h3>
<p class="text-sm text-gray-400">${film.releaseYear} . ${film.type}</p>;
</div>`;
}
export function afficherCards (films){
    const grid = document.getElementById("grid")
    grid.innerHTML=films.map(creation_carte).join("")
}