const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");
const pokemonImage = document.getElementById("pokemon-image");
const pokemonTypes = document.getElementById("types");

let tiposPokemon = [];

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
        pokemonTypes.innerHTML = "";
        pokemonTypes.style.display = "none";
        tiposPokemon = [];
        return;
    }

    try {

        const response = await fetch(pokemonUrl).then(response => response.json());

        pokemonImage.src = response.sprites.front_default;
        pokemonName.textContent = response.name;

        tiposPokemon = [];

        response.types.forEach(type => {
            tiposPokemon.push(type.type.name);
        });

        pokemonStats.innerHTML = "<h2>Estadisticas</h2>";

        response.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);
        });

        abilities.textContent = "Habilidades";
        pokemonAbilities.innerHTML = "";

        response.abilities.forEach(ability => {
            const li = document.createElement("li");
            li.textContent = ability.ability.name;
            pokemonAbilities.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }

}

pokemonImage.addEventListener("mouseover", () => {

    pokemonTypes.style.display = "block";
    pokemonTypes.innerHTML = "<h2>Tipos</h2>";

    tiposPokemon.forEach(tipo => {
        const li = document.createElement("li");
        li.textContent = tipo;
        pokemonTypes.appendChild(li);
    });

});

pokemonImage.addEventListener("mouseleave", () => {
    pokemonTypes.style.display = "none";
});