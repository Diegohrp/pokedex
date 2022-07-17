let currentPokemon = 1;
const pokemonDetails = document.querySelector('#pokemon-details');
const pokeList = document.querySelector('#poke-list');
const navList = document.querySelector('#nav-list');
const form = document.querySelector('#form');

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

function setColors(types) {
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
  statBarFilling.style.width = `${base_stat / 1.5}%`;
  statBar.appendChild(statBarFilling);
  statName.innerText = formatStat(stat.name);
  statValue.innerText = base_stat;
  statContainer.appendChild(statName);
  statContainer.appendChild(statValue);
  statContainer.appendChild(statBar);
  return statContainer;
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
  pokeList.style.display = 'none';
  navList.style.display = 'none';
  pokemonDetails.style.display = 'grid';
  pokemonDetails.innerHTML = `
  <article class="pokemon">
    <div class="pokemon__info" id="pokemon-info">
      <button class="pokemon-section__back" onclick="closeDetails()">
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
  setColors(types);
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

function createPokemonCard(name, types, img, id) {
  const container = document.createElement('article');
  const baseColor = `var(${colors[types[0]].color})`;
  const darkColor = `var(${colors[types[0]].dark})`;
  const auraColor = `var(${colors[types[0]].aura})`;

  container.style.backgroundColor = baseColor;
  container.className = 'pokemon-card';
  container.innerHTML = `
  <img
  src="./assets/pokeball.svg"
  alt="pokeball"
  class="pokemon__pokeball"
  />
  <h1>${name.charAt(0).toUpperCase() + name.slice(1)}</h1>
  <div class="pokemon-card__go-details">
    <div id="${name}">
    </div>
    <img id=${'img-' + name} src="${img}">
  </div>`;
  pokeList.appendChild(container);

  const typesDiv = document.getElementById(name);
  const button = document.createElement('button');
  const picture = document.getElementById('img-' + name);
  picture.style.filter = `drop-shadow(0 -6mm 4mm ${auraColor})`;
  button.innerText = 'Details';
  button.style.border = `3px solid ${darkColor}`;
  button.style.color = darkColor;
  button.onclick = () => {
    currentPokemon = id;
    printCurrentPokemon();
  };

  types.map((type) => {
    const span = document.createElement('span');
    span.innerText = type.charAt(0).toUpperCase() + type.slice(1);
    span.style.backgroundColor = `var(${colors[type].dark})`;
    typesDiv.appendChild(span);
  });
  typesDiv.appendChild(button);
  return container;
}
function closeDetails() {
  pokemonDetails.innerHTML = '';
  pokemonDetails.style.display = 'none';
  pokeList.style.display = 'grid';
  navList.style.display = 'flex';
}

function closeModal() {
  const main = document.querySelector('main');
  const modal = document.querySelector('#modal');
  main.removeChild(modal);
}

function notFound() {
  const main = document.querySelector('main');
  const modal = document.createElement('section');
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  const button = document.createElement('button');

  modal.className = 'modal';
  modal.id = 'modal';
  h2.innerText = '404: Not found';
  p.innerText = "We're sorry, try with another id or name.";
  button.innerText = 'OK';
  button.addEventListener('click', closeModal);
  article.appendChild(h2);
  article.appendChild(p);
  article.appendChild(button);
  modal.append(article);
  main.appendChild(modal);
}
