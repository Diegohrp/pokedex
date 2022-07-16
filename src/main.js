const API = 'https://pokeapi.co/api/v2/pokemon';

let offset = 0;
let currentImg = 0;
let pokemonImages = [];

function getData(API) {
  return fetch(API)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
}

function getPokeImages(sprites) {
  const images = [
    sprites['official-artwork']?.front_default,
    sprites.dream_world?.front_default,
    sprites.home?.front_default,
  ].filter((img) => img !== null);
  return images;
}

function printCurrentPokemon(query) {
  const response = getData(`${API}/${query || currentPokemon}`);
  response
    .then((data) => {
      currentPokemon = data.id;
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
    })
    .catch((error) => {
      /* notFound(); */
      console.table(error);
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
  printCurrentPokemon();
}

function fetchPokemons(n) {
  offset += n;

  if (offset < 0) {
    offset = 882;
  } else if (offset > 882) {
    offset = 0;
  }
  console.log(offset);
  pokeList.innerHTML = '';
  getData(`${API}?offset=${offset}&limit=16`)
    .then((data) => data.results)
    .then((data) => data.map((item) => getData(item.url)))
    .then((promiseArray) => Promise.all(promiseArray))
    .then((data) => {
      data.map((item) => {
        const types = item.types.map((type) => type.type.name);
        const img =
          item.sprites.other['official-artwork']?.front_default;
        createPokemonCard(item.name, types, img, item.id);
      });
    });
}

function closeDetails() {
  pokemonDetails.innerHTML = '';
  pokemonDetails.style.display = 'none';
  pokeList.style.display = 'grid';
  navList.style.display = 'flex';
}

function handleSearch(event) {
  event.preventDefault();
  const search = document.getElementById('search');
  const query = search.value;
  printCurrentPokemon(query);
}

form.addEventListener('submit', handleSearch);

fetchPokemons(0);

/* printCurrentPokemon(currentPokemon); */
