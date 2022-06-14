const readline = require("readline-sync")

///////////////////////////////////////
//// Dark City Text Adventure Game ////
///////////////////////////////////////


// Game data
var Game = {
    // Stats
    name: '',
    hp: 100,
    strength: 10,
    charm: 10,
    exp: 0,
    startItem: null,

    startItems: ['Laser Knife', 'Dark Ale'],
    items: [],

    location: [
        ['north', 'east', 'south', 'west']
    ],
    
    start: false,
    
    gamePhase: 'intro', // intro, beginning, middle, end
    showStats: null,
    continue: null,
}

function addItem(type, num){
    //console.log(type, num)

    /* 
        {
            name: name,
            uses: 0,
            stats:
        }
    
    */
    if (type === 'start'){
        if (num === 0 || num === '0'){
            Game.items.push('laser knife')
        } else
        if (num === 1 || num === '1'){
            Game.items.push('dark ale')
        } else {
            console.log('No item acquired')
            return
        }
    }
    console.log('item added', Game.items)
}

function removeItem(){

}

function walk(){

}

function fight(){

}

  ///////////////////
 /// Intro Phase ///
///////////////////
/*
    Introduce
        - story
        - character
        - setting
    Setup
        - choose item

*/

console.log("Welcome to Dark City!!")
console.log('=========Introduction=========')
console.log(
    'Miles down the nearby two lane highway is a sprawling city.  '
    + 'Electric lights, gangs and darkness have flooded every corner of the technopolis.  '
    + 'While most seeking to conquer Dark City find despair, some have found fortune and glory.  '
    + ' '
    // directions
    // instructions
)

Game.continue = readline.keyIn('Press any key to begin...',{hideEchoBack: true,})

Game.phase = 'beginning'

/*
    Describe setting.
        - room on a homestead
        - landowner is sympathetic to hero's causes: to get the Dusty Brawlers and will do anything for payback
    
        You see something with your name on it reading...
*/

console.log(
    'Beep Beeeeeep Beep Beep Beeep. A cell phone rings upstairs in a lonely farmhouse. '
)
Game.name = readline.question('Please enter your name:');

console.log(
    'You slightly wake from your slumber to pick up the phone from the night stand  '
)
//console.log('Wake up ' + Game.name + '.  The night has come. ')

console.log( 
    'Two unread messages.'
)

readline.keyInYN('Read messages?')

console.log(
    'The recent message reads "NINE DICE CLUB 10PM -Anonymous 4:30pm".  '
    + 'The second reads "Brawlers planning something big! Get here soon ' + Game.name + '! -Ana 4:50pm"'
)

readline.keyInYN('Leave bed?')


/*  
    introduce motive for going out: revenge
        - Gotta find the Brawlers
        - Dusty has a price to pay 
        - Tonight is the night
        - following intel from last night when you closed down a gang hideout. 
        - You have been systematically 'closing' hideouts
*/


/*
    
    Describe players background and skills
        - former nerd turned air force veteran
        - a lot's changed since returning from the jungle

    Phone Call
    - new intel comes and you have to act fast, 
        and fight your way through dangerous teritory


    Give user choice of an item to aid the night's hunt
*/

// Choose start Item
    // While player is in room they can look around before leaving

readline.keyIn('Press any key to continue...', {hideEchoBack: true,})

Game.startItem = readline.keyInSelect(Game.startItems, 'Which item are you bringing?  ');

addItem('start', Game.startItem)

// Update to tell user what item does
console.log(
    (
        Number(Game.startItem) === 0
        ? 'You pick up the Laser Knife and '
        : Number(Game.startItem) === 1
            ? 'You pick up the Dark Ale and '
            : 'You '
    )     
    + 'leave the room.'
);



//Game.start = readline.question('Are you ready to enter Dark City?');

if (readline.keyInYN('Are you ready to go to Dark City?')) {
    // 'Y' key was pressed.
    console.log('Departing now...');

  } else {
    // Another key was pressed.
    console.log('You return to grab a different item...');

    // allow user to bring a different item and maybe look around
    // Game.startItem = readline.keyInSelect(Game.startItems, 'Which item are you bringing?');
    // addItem('start', Game.startItem)

    //console.log('You pick up the ' + Game.startItem + ' and leave the room.');

  }

  ////////////////////
 /// Middle Phase ///
////////////////////
/*
  todo
    - Story moments at lvl 2 & 5
    - walk function
    - fight function
 */

Game.phase = 'middle'

console.log(
    'Many acres of untended fields surround the house between woods and a two lane highway.  '
    + 'You start up the old motorcycle in the garage, head down the long driveway and set out down Highway 99.  '
    + 'You pass the endless rolling fields of rural Abbington Valley on the way to Dark City.  '
)


/*
    Describe entering the city
    As you approach the city ...
    Give the user a choice of picking up an item before the city
    - a weapon
    - a bribe
*/

/*

Game Mechanics
- Fight
- Walk
- Search Builidings

*/


console.log(Game)