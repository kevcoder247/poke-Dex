let pokemon;

const $name = $("#name")
const $img = $("img");

$.ajax({
  url:  'https://pokeapi.co/api/v2/pokemon/charmander'
}).then(
  (data) => {
    pokemon = data
    // console.log(pokemon)
    console.log(pokemon.sprites.back_default)
    console.log(pokemon.name)
    
    $name.text(pokemon.name)
    $img.attr('src', pokemon.sprites.front_default)
  }
)