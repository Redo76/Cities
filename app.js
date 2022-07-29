const selectContinent = document.querySelector('#continent');
const selectPays = document.querySelector('#pays');
const divCities = document.querySelector('#cities');
const loader = document.querySelector(".loader")
let cities;
let pays;

loader.style.display = "none"
startApp();

selectContinent.addEventListener("change", (e) =>{
    remove(selectPays);
    remove(divCities);
    selectPays.style.display = "block";
    pushPays(pays, e.target.value);
    
})

selectPays.addEventListener("change", (e) =>{
    displayVilles(cities, e.target.value)
})

window.addEventListener("load", () =>{

})

async function startApp() {
    
    cities = await getCities();
    selectPays.style.display = "none";
    pays = getPays(cities);
    console.log(pays);
    
}

async function getCities() {
    await fetch('./cities.json')
    
    .then(response => response.json())
    
    .then(function (data){
        cities = data
    })
    return cities;
}

function getPays(cities) {
    let pays = [];
    let dejaPays = [];
    for (const city of cities) {
        if (!dejaPays.find(element => element == city.countrycode.name)) {
            dejaPays.push(city.countrycode.name);
            pays.push({
                "pays" : city.countrycode.name,
                "continent" : city.countrycode.continent
            });
            pays.sort((a, b) => a.pays.localeCompare(b.pays));	     
        }
    }
    return pays
}

function pushPays(pays, value) {
    remove(selectPays)

    let baseOption = document.createElement("option");
    baseOption.textContent = "Select a country";
    baseOption.setAttribute("disabled", true);
    baseOption.setAttribute("selected", true);
    selectPays.appendChild(baseOption);


    for (const unPays of pays) {
        
        if (value === unPays.continent ) {
            let option = document.createElement('option');
            option.textContent = unPays.pays;
            selectPays.appendChild(option);

        }
    }
    
    console.log(selectPays.lastElementChild);

}

function displayVilles(cities , value) {
    remove(divCities);
    divCities.style.display = "none";
    loader.style.display = "block";
    for (const city of cities) {
        if (value === city.countrycode.name) {
            let p = document.createElement("p");
            p.textContent = city.name;
            divCities.appendChild(p);
            console.log(p);
        }
    }
    setTimeout(() => {
        divCities.style.display = "block";
        loader.style.display = "none";
    
    }, 250)
}

// Afin de reinitialiser la liste des pays quand on change de continent

function remove(parent) {
    let child = parent.firstElementChild; // On stocke le première élement du select
    while (child) { // Tant qu'un première element est présent dans le select
        parent.removeChild(child); //On supprime l'élement (enfant) du select
        child = parent.firstElementChild; //On redéfini dans child le premier élement
    }
}

