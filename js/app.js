let pokemon;

const $name = $("#name")
const $img = $("img");
const $type = $("#type")
const $input = $('input[type="text"]')


//Event Listener
$('form').on('submit', handleGetData);

function handleGetData(event){
  //Prevent page from reloading when we submit the user input
  event.preventDefault();

  //Get the user input
  userInput = $input.val().toLowerCase();

  //Clear previous search results
  $name.empty();
  $type.empty();
  $img.attr('src', '');
  $('#pokemon-moves').empty();

//Make Api call
  $.ajax({
    url:  'https://pokeapi.co/api/v2/pokemon/' + userInput
  }).then(
    (data) => {
      pokemon = data
      render();
    }, 
    (error) => {
      console.log('bad request', error)
    }
  )
  
  //Render funntion that determines what we display to the dom
  function render(){
    $name.text(`Pokemon: ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`)
    $type.text(`Type: ${pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1)}`)
    $img.attr('src', pokemon.sprites.other['official-artwork'].front_default)

    //Display the pokemons type
    // console.log(pokemon.types[0].type.name)


    //Create a loop that loops through the first 3 moves and displays them to the dom
    // console.log(pokemon.moves[50].move.name)

    //Refernce variable where the moves array is located
    let pokemonMoves = pokemon.moves;

    //Empty array where we will push pokemons moves
    let movesArray = [];

    for(let i = 0; i < pokemonMoves.length; i++){
      let movesList = pokemonMoves[i].move.name;
      movesArray.push(movesList);
    }
    
   //Reference variable to the first 3 moves of the large moves array.
    let firstThreeMoves = movesArray.slice(1, 4);

    //Reference Variable that will hold  the unordered list we will append the moves to
    const $pokeMoves = $('#pokemon-moves');

    $($pokeMoves).append('Moves: ')

    //loop through the first Three Moves array and append each move as a new LI to pokemon-moves which is a reference to our unordered list
    firstThreeMoves.forEach((move) => {
      let $newItem = `<li>${move}</li>`
      $($pokeMoves).append($newItem)
    })
}
  //Reset user input
  userInput = $input.val('');
}


