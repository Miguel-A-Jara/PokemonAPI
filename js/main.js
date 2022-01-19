//Defining the "End-Point"
const pokemonURL = 'https://pokeapi.co/api/v2/';
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




//We listen to the form button
listenToElements('#searchButton', () => {
    makeApiRequest(searchBar.value.toLowerCase());
})




//We make the API request
async function makeApiRequest(pathName){
    if(searchBar.value != ''){
        try {

            const fetchResponse = await fetch(`${pokemonURL}pokemon/${pathName}`)
            .then(response => response.json())
            .then(data => {return data});

            printPokemon(fetchResponse); //Calling the HTML "printing" method

        } catch (error) {
            pokemonContainer.innerHTML = 'Introduce a correct Pokémon name please!';
        }


        

    } else {
        pokemonContainer.innerHTML = 'Input some data, please!';
    }
}




function printPokemon(pokemonData){
    pokemonContainer.innerHTML = `
        <img src="${pokemonData.sprites.other.dream_world.front_default}">
    `;
}
