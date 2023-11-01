const pokeUrl = 'https://api.vschool.io/pokemon'

var pokeData;
var pokemon;

window.onload = () => { 
    fetchData(pokeUrl)
}

// Fetch data
function fetchData(url){
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        // Store data
        pokemon = data.objects[0].pokemon

        // Make array for the data objects
        var newArr = []
        for (var x = 0; x < pokemon.length; x++){
            // Create object with name, index and resource number
            newArr.push({
                name: pokemon[x].name,
                index: x,
                number: getPokemonNum(pokemon[x].resource_uri),
            })
        }

        // Sorts array by pokemon number
        pokeData = sortByNum(newArr)

        // Displays list on page
        makeList()
    }).catch(function() {
        console.log("caught");
    });
}

// Get pokemon reference number
function getPokemonNum(poke){
    num = poke.split('/')
    return Number(num[3])
}

// Sorts array of objects numerically
function sortByNum(arr){
    return arr.sort((a, b) => {
        if (a.number < b.number){
            return -1;
          }
          if (a.number > b.number){
            return 1;
          }
          return 0;
    })
}

// Makes and displays the list
function makeList() {
    var listEle = document.getElementById('list')

    for (var a = 0; a < 151 /*pokeData.length*/; a++){
        let newPokeEle = document.createElement('div')
        let newItemEle = document.createElement('p')

        newItemEle.textContent = 
            pokeData[a].number 
            + '. ' 
            + pokeData[a].name 
    
        newPokeEle.appendChild(newItemEle)
        listEle.appendChild(newPokeEle)
    }
}    