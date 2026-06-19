const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");

const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`).then(response => response.json());
        response.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
}

loadPokemons();

const pokemonSelected = async (pokemonUrl) => {
    const pokemonImage = document.getElementById("pokemon-image");
    const pokemonName = document.getElementById("pokemon-name");
    const pokemonStats = document.getElementById("pokemon-stats");
    const pokemonAbilities = document.getElementById("pokemon-abilities");
    const abilities = document.getElementById("abilities");

    if (pokemonUrl === "") {
        pokemonImage.src = "";
        pokemonName.textContent = "";
        pokemonStats.innerHTML = "";
        pokemonAbilities.innerHTML = "";
        abilities.textContent = "";
        return;
    }
  
    try {

        const response = await fetch(pokemonUrl).then(response => response.json());

        

        pokemonImage.src = response.sprites.front_default;
        pokemonName.textContent = response.name;

        pokemonStats.innerHTML = "<h2>Estadisticas</h2>";

        response.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);

        
        })
        const pokemonAbilities = document.getElementById("pokemon-abilities");
        const abilities = document.getElementById("abilities");
        abilities.textContent = "Habilidades";
        pokemonAbilities.innerHTML = "";

        response.abilities.length

        response.abilities.forEach(ability => {    
            console.log(ability.ability.name);
            const li = document.createElement("li");
            li.textContent = ability.ability.name;

            pokemonAbilities.appendChild(li);
        })


    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
    
}
// fetch(`${POKEAPI_URL}/pokemon`)
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// });