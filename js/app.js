let pokemon;

const $name = $("#name")
const $img = $("img");
const $input = $('input[type="text"]')



//Event Listener
$('form').on('submit', handleGetData);

function handleGetData(event){
  //Prevent page from reloading when we submit the user input
  event.preventDefault();

  //Get the user input
  userInput = $input.val().toLowerCase();
  
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
    $name.text(pokemon.name)
    $img.attr('src', pokemon.sprites.other['official-artwork'].front_default)
    // console.log(pokemon.sprites.other['official-artwork'].front_default)
  }

  userInput = $input.val('');
}


