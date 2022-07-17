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
function getDescription(API) {
  const data = getData(API);
  return data
    .then((obj) => obj.flavor_text_entries)
    .then((arrayTxt) =>
      arrayTxt.filter((item) => item.language.name === 'en')
    )
    .then((desc) => desc[7] || desc[0])
    .then((des) => des.flavor_text);
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
      notFound();
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

function handleSearch(event) {
  event.preventDefault();
  const search = document.getElementById('search');
  let query = search.value;
  if (query > 898) {
    query = 1000;
  } else {
    query = query.toLowerCase();
  }
  printCurrentPokemon(query);
}

form.addEventListener('submit', handleSearch);

fetchPokemons(0);

/* printCurrentPokemon(currentPokemon); */
