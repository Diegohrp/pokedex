const API = 'https://pokeapi.co/api/v2/pokemon';
const pokemonDetails = document.querySelector('#pokemon-details');

let currentPokemon = 1;
let currentImg = 0;
let pokemonImages = [];

const colors = {
  grass: {
    color: '--grass',
    dark: '--dark-grass',
    aura: '--grass-aura',
  },
  bug: {
    color: '--bug',
    dark: '--dark-bug',
    aura: '--bug-aura',
  },
  dark: {
    color: '--dark',
    dark: '--dark-dark',
    aura: '--dark-aura',
  },
  dragon: {
    color: '--dragon',
    dark: '--dark-dragon',
    aura: '--dragon-aura',
  },
  electric: {
    color: '--electric',
    dark: '--dark-electric',
    aura: '--electric-aura',
  },
  fairy: {
    color: '--fairy',
    dark: '--dark-fairy',
    aura: '--fairy-aura',
  },
  fighting: {
    color: '--fighting',
    dark: '--dark-fighting',
    aura: '--fighting-aura',
  },
  fire: {
    color: '--fire',
    dark: '--dark-fire',
    aura: '--fire-aura',
  },
  flying: {
    color: '--flying',
    dark: '--dark-flying',
    aura: '--flying-aura',
  },
  ghost: {
    color: '--ghost',
    dark: '--dark-ghost',
    aura: '--ghost-aura',
  },
  ground: {
    color: '--ground',
    dark: '--dark-ground',
    aura: '--ground-aura',
  },
  ice: {
    color: '--ice',
    dark: '--dark-ice',
    aura: '--ice-aura',
  },
  normal: {
    color: '--normal',
    dark: '--dark-normal',
    aura: '--normal-aura',
  },
  psychic: {
    color: '--psychic',
    dark: '--dark-psychic',
    aura: '--psychic-aura',
  },
  rock: {
    color: '--rock',
    dark: '--dark-rock',
    aura: '--rock-aura',
  },
  steel: {
    color: '--steel',
    dark: '--dark-steel',
    aura: '--steel-aura',
  },
  water: {
    color: '--water',
    dark: '--dark-water',
    aura: '--water-aura',
  },
  poison: {
    color: '--poison',
    dark: '--dark-poison',
    aura: '--poison-aura',
  },
};

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
    console.log(data);
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
function formatID(id) {
  if (id / 100 >= 1) {
    return '#' + id;
  } else if (id / 10 >= 1) {
    return '#0' + id;
  } else {
    return '#00' + id;
  }
}
function getDescription(API) {
  const data = getData(API);
  return data.then((txt) => txt.flavor_text_entries[7].flavor_text);
}
function formatStat(statName) {
  switch (statName) {
    case 'hp':
      return statName.toUpperCase();
    case 'attack':
      return 'ATK';
    case 'defense':
      return 'DEF';
    case 'special-attack':
      return 'SP. ATK';
    case 'special-defense':
      return 'SP. DEF';
    case 'speed':
      return statName.toUpperCase();
  }
}
function createStat({ base_stat, stat }) {
  const statContainer = document.createElement('div');
  const statName = document.createElement('span');
  const statValue = document.createElement('span');
  const statBar = document.createElement('div');
  const statBarFilling = document.createElement('div');
  statContainer.className = 'pokemon__stat';
  statBar.className = 'pokemon__stat-bar';
  /* statBarFilling.style.backgroundColor = color; */
  statBarFilling.style.width = `${base_stat / 1.5}%`;
  statBar.appendChild(statBarFilling);
  statName.innerText = formatStat(stat.name);
  statValue.innerText = base_stat;
  statContainer.appendChild(statName);
  statContainer.appendChild(statValue);
  statContainer.appendChild(statBar);
  return statContainer;
}
function hola(ms) {
  console.log(ms);
}
function createPokemonLayout(
  id,
  name,
  img,
  types,
  desc,
  height,
  weight,
  stats
) {
  pokemonDetails.innerHTML = `
  <article class="pokemon">
    <div class="pokemon__info" id="pokemon-info">
      <button class="pokemon-section__back">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <img
        src="./assets/pokeball.svg"
        alt="pokeball"
        class="pokemon__pokeball"
      />

      <h1 class="pokemon__id">${formatID(id)}</h1>
      <img 
        id = "pokemon-img"
        src="${img}"
        alt="Pokemon Image"
      />
      <div class="pokemon__name">
        <button class="pokemon__next-img-btn left" onclick="nextImg(-1)">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h1>${name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        <button class="pokemon__next-img-btn right" onclick="nextImg(1)">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
    <div class="pokemon__info--specific">
      <div class="pokemon__about">
      <h2>About</h2>
      <p">
      ${desc.replace('', '')}
      </p>
      <div>
        <span>Height</span>
        <span>Weight</span>
        <span>${height / 10} m.</span>
        <span>${weight / 10} Kg.</span>
      </div>
    </div>
    <div class="pokemon__stats" id="pokemon-stats">
      <h2>Basic Stats</h2>
               
    </div>
    <nav class="pokemon__nav">
      <button onclick="nextPokemon(-1)">Previous</button>
      <button onclick="nextPokemon(1)">Next</button>
    </nav>
  </article>`;
  const baseColor = `var(${colors[types[0]].color})`;
  const darkColor = `var(${colors[types[0]].dark})`;
  const auraColor = `var(${colors[types[0]].aura})`;
  document.documentElement.style.setProperty('--current', baseColor);
  document.documentElement.style.setProperty(
    '--current-dark',
    darkColor
  );
  document.documentElement.style.setProperty(
    '--current-aura',
    auraColor
  );

  //Pokemon info
  const pokemonInfo = document.querySelector('#pokemon-info');
  types.map((type) => {
    const span = document.createElement('span');
    span.style.backgroundColor = `var(${colors[type].dark})`;
    span.innerText = type.charAt(0).toUpperCase() + type.slice(1);
    pokemonInfo.appendChild(span);
  });
  //Stats
  const pokeStatsContainer = document.querySelector('#pokemon-stats');
  const pokeStats = stats.map((stat) => createStat(stat));
  pokeStatsContainer.append(...pokeStats);
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

printCurrentPokemon(currentPokemon);
