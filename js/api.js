const url = "https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json";
export async function chargerFilms(){
    const data = localStorage.getItem("cinetrack");
    if(data !== null){
        return JSON.parse(data);
    }

    try{
        const reponse = await fetch(url);
        if(!reponse.ok){
            throw new Error("Erreur API");
        }
        const films = await reponse.json();
        sauvgarder(films);
        return films;
    } catch(erreur){
        console.log("Probleme :", erreur);
        return [];
    }
}

function sauvgarder(cinetrack){
    localStorage.setItem("cinetrack", JSON.stringify(cinetrack));
}