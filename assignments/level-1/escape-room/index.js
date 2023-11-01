const readline = require("readline-sync");
const name = readline.question("What is your name? ");

var key = false
var gameOver = false
var doorLocked = true

while (!gameOver){
    // Prompts user for action 
    var action = readline.question(
        "What is your action? ([hole]Put hand in hole, [key]Find the key), [door]Open the door) "
    );

    // Checks user action
    if (action !== 'key' && action !== 'hole' && action !== 'door'){
        console.log('Try again ' + name)
    }

    if (action === 'hole'){
        console.log('You died. Game over.')
        gameOver = true
    }

    if (action === 'key'){
        if (!key){
            console.log('You\'ve found the key')
            key = true
        } else {
            console.log('You already have the key')
        }
    }

    if (action === 'door'){
        if (!key){
            console.log('Door is locked')
        } else if (key && doorLocked) {
            // Unlock door if user has key and door is locked 
            console.log('You used the key and unlocked the door')
            doorLocked = false

            // Finish Game
            console.log('You\'ve escaped!')
            gameOver = true
        } else if (!doorLocked){
            // Alternate ending to stay in room
            console.log('You\'ve escaped!')
            gameOver = true
        }
    }
}