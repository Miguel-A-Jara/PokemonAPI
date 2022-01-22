//Defining the "End-Point"
const pokemonURL = 'https://pokeapi.co/api/v2/';
const pokemonGender = 'https://pokeapi.co/api/v2/gender/';
const pokemonContainer = document.querySelector('#pokemonContainer');
const searchBar = document.querySelector('#pokeName');




/*  ==========  FUNCTIONS ==========   */
function listenToElements(type, callback){
    document.addEventListener('click', (e) => {
        if(e.target.matches(type)){
            callback();
        }
    })
}





//We make the API request
async function makeApiRequest(pathName){
    if(searchBar.value != ''){
        try {

            const fetchResponse = await fetch(`${pokemonURL}pokemon/${pathName}`)
            .then(response => response.json())
            .then(data => {return data});

            printPokemon(fetchResponse);

        } catch (error) {
            pokemonContainer.innerHTML = 'Introduce a correct Pokémon name please!';
        }

    } else {
        pokemonContainer.innerHTML = 'Input some data, please!';
    }
}



function spinnerLoadAnimation(){
    pokemonContainer.innerHTML = `<div id="spinnerDiv"></div>`;
}




function printPokemon(pokemonData){
    pokemonContainer.innerHTML = `
        <div id="pokemonCard">
            <section>
                <img src="${pokemonData.sprites.front_default}" alt="Pokemon Image not found">
                <img src="${pokemonData.sprites.back_default}" alt="Pokemon Image not found">
            </section>
            <section>
                <h2>${pokemonData.name.toUpperCase()}</h2>
                <span>Weight: ${pokemonData.weight}</span>
                <span>Height: ${pokemonData.height}</span>
                <span>ID: ${pokemonData.id}</span>
                <span>Base Experience: ${pokemonData.base_experience}</span>
                </section>
        </div>
    `;
}




//We listen to the form button
listenToElements('#searchButton', () => {
    spinnerLoadAnimation();
    makeApiRequest(searchBar.value.toLowerCase());
})
