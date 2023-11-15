// const loadMoreButton = document.getElementById("loadMoreButton");
const qs = (el) => document.querySelector(el);
const qsA = (el) => document.querySelectorAll(el);
const maxRecord = 151;
const limit = 6;
let offset = 0;

function loadPokemonItens(limit, offset) {
  pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
    pokemons.map((pokemon, index) => {
      console.log(index);

      let pokemonItem = qs(".pokemons .pokemon").cloneNode(true);

      pokemonItem.setAttribute('data-key', index);
      pokemonItem.classList.add(pokemon.type)
      pokemonItem.querySelector(".number").innerHTML = pokemon.number;
      pokemonItem.querySelector(".name").innerHTML = pokemon.name;
      pokemonItem.querySelector(".types").innerHTML = pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("");
      pokemonItem.querySelector(".detail img").src = pokemon.photo;
      pokemonItem.querySelector(".detail img").alt = pokemon.name;
      pokemonItem.querySelector('a').addEventListener('click', (e)=>loadPokemonDetail(e))
      qs(".pokemon-area").append(pokemonItem);
    });
    function loadPokemonDetail(e){
      e.preventDefault();
      let key = e.target.closest(".pokemon").getAttribute("data-key");
  
      let pokemonItemDetail = qs(".pokeDetail .pokemonDetails")
      pokemonItemDetail.querySelector(".photoDetail img").alt = pokemons[key].name;
      pokemonItemDetail.querySelector(".photoDetail img").src = pokemons[key].photo;
      pokemonItemDetail.querySelector(".aboutDetail .numberDetail").innerHTML = pokemons[key].number;
      pokemonItemDetail.querySelector(".aboutDetail .nameDetail").innerHTML = pokemons[key].name;
      pokemonItemDetail.querySelector(".aboutDetail .typesDetail").innerHTML = pokemons[key].types.map((type) => type).join("<br>");
      pokemonItemDetail.querySelector(".aboutDetail .abilitiesDetail").innerHTML = pokemons[key].abilities.map((ability) => ability).join("<br>");
      pokemonItemDetail.querySelector(".aboutDetail .heightDetail").innerHTML = pokemons[key].height;
      pokemonItemDetail.querySelector(".aboutDetail .weightDetail").innerHTML = pokemons[key].weight;
      pokemonItemDetail.querySelector(".photoDetail").classList.add(pokemons[key].type);


      qs('.pokeDetail').style.opacity = 0;
      qs('.pokeDetail').style.display = 'flex';
      setTimeout(()=>{
          qs('.pokeDetail').style.opacity = 1;
      }, 200);
    }
  });
}

// Eventos do MODAL
function closeModal() {
  qs('.pokeDetail').style.opacity = 0;
  setTimeout(()=>{
      qs('.pokeDetail').style.display = 'none';
  }, 500);
}
qsA('pokeDetail').addEventListener('click', closeModal);






function loadMoreButton() {
  offset += limit;
  const qtdRecordNextPage = offset + limit;
  if (qtdRecordNextPage >= maxRecord) {
    const newLimit = maxRecord - offset;
    loadPokemonItens(newLimit, offset);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(limit, offset);
  }
};
