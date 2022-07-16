const API = 'https://pokeapi.co/api/v2/pokemon';

let currentPokemon = 1;
let offset = 0;
let currentImg = 0;
let pokemonImages = [];

function getData(API) {
  return fetch(API)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}

function getPokeImages(sprites) {
  const images = [
    sprites['official-artwork']?.front_default,
    sprites.dream_world?.front_default,
    sprites.home?.front_default,
  ].filter((img) => img !== null);
  return images;
}

function printCurrentPokemon(currentPokemon) {
  const response = getData(`${API}/${currentPokemon}`);
  response.then((data) => {
    /* console.log(data); */
    const types = data.types.map((type) => type.type.name);
    pokemonImages = getPokeImages(data.sprites.other);
    getDescription(data.species.url).then((desc) => {
      createPokemonLayout(
        data.id,
        data.name,
        pokemonImages[0],
        types,
        desc,
        data.height,
        data.weight,
        data.stats
      );
    });
  });
}
function nextImg(n) {
  const pokemonImg = document.querySelector('#pokemon-img');
  currentImg += n;
  if (currentImg > pokemonImages.length - 1) {
    currentImg = 0;
  } else if (currentImg < 0) {
    currentImg = pokemonImages.length - 1;
  }
  pokemonImg.src = pokemonImages[currentImg];
}

function nextPokemon(n) {
  currentPokemon += n;
  console.log(currentPokemon);
  if (currentPokemon > 898) {
    currentPokemon = 1;
  } else if (currentPokemon < 1) {
    currentPokemon = 898;
  }
  printCurrentPokemon(currentPokemon);
}

function fetchPokemons(API) {
  getData(`${API}?offset=${offset}&limit=15`)
    .then((data) => data.results)
    .then((data) => data.map((item) => getData(item.url)))
    .then((promiseArray) => Promise.all(promiseArray))
    .then((data) => {
      data.map((item) => {
        const types = item.types.map((type) => type.type.name);
        const img =
          item.sprites.other['official-artwork']?.front_default;
        createPokemonCard(item.name, types, img);
      });
    });
}

fetchPokemons(API);
/* printCurrentPokemon(currentPokemon); */
