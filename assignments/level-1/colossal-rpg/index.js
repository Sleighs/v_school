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

    // Inventory
    startItems: ['Laser Knife', 'Dark Ale'],
    items: [],

    // State
    gamePhase: 'intro', // intro, beginning, middle, end
    fight: false,
    showStats: null,
    continue: null,
    location: [
        ['north', 'east', 'south', 'west']
    ],
}

function Item(name, uses, strength, hp){
    this.name = name
    this.uses = uses
    this.strength = strength
    this.hp = hp
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
   var item;

    if (type === 'start'){
        if (num === 0 || num === '0'){
            //Game.items.push('Laser Knife')
            item = new Item('Dark Ale', 5, 0, 10)
            Game.items.push(item)

            console.log('Laser Knife added to items.')
            console.log('Inventory: ', Game.items)
        } else
        if (num === 1 || num === '1'){
            //Game.items.push('Dark Ale')
            item = new Item('Dark Ale', 5, 0, 10)
            Game.items.push(item)

            console.log('Dark Ale added to items.')
            console.log('Inventory: ', Game.items)
        } else {
            console.log('No item acquired')
            return
        }
    }
}

function removeItem(){

}

function walk(){
    console.log('walking..')
}

function fight(){

    // fight commands
        // attack
        // defend
        // use item
        // run


}

  ///////////////////
 /// Intro Phase ///
///////////////////

console.log("Welcome to Dark City!!")
console.log('=========Introduction=========')
console.log(
    'Miles down the nearby two lane highway is a sprawling city.  '
    + 'Electric lights, gangs and darkness have flooded every corner of the technopolis.  '
    + 'While most seeking to conquer Dark City find despair, some have found fortune and glory.  '
    + ' '
    // instructions
)
console.log('')
readline.question('Press [Enter] to begin...', {
    hideEchoBack: true,
})

Game.phase = 'beginning'

/*
    Describe setting.
        - room on a homestead
        - landowner is sympathetic to hero's causes: to get the Dusty Brawlers and will do anything for payback
*/

console.log(' ')
console.log('Beep Beeeeeep Beep Beep Beeep.  A cell phone rings in a second floor bedroom of a lonely farmhouse.  ')
console.log(' ')
Game.name = readline.question('Please enter your name:');
console.log(' ')
console.log('You slightly wake from your slumber to tilt the phone on the night stand.  ')
console.log(' ')
console.log('Two unread messages...')
console.log(' ')
readline.question('Press [Enter] to continue...', {hideEchoBack: true,})
console.log(' ')
console.log('Messages:  ')
console.log('4:50pm: "Brawlers planning something big! Get here soon ' + Game.name + '! -Ana"  ')
console.log('4:30pm: "NINE DICE CLUB 10PM -Anonymous"  ')

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
console.log(' ')
readline.keyIn('Press any key to continue...', {hideEchoBack: true,})
console.log(' ')
console.log(
    'As the sun touches the horizon.  '
    + 'You put on your jacket with pocket space for an item.  '
    + 'A Laser Knife and Dark Ale sit on the desk.  '
)
Game.startItem = readline.keyInSelect(Game.startItems, 'Which item are you bringing?  ');

addItem('start', Game.startItem)

// Update to tell user what item does
if (
    Game.startItems[Game.startItem] == 'Laser Knife' 
    || Game.startItems[Game.startItem] == 'Dark Ale'
){
    console.log('You pick up the ' + Game.startItems[Game.startItem] + ' and leave the room.')
} else {
    console.log('You leave the room')
}
console.log('')
/*
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
*/


/*if (readline.keyInYN('Are you ready to go to Dark City?')) {
    // 'Y' key was pressed.
    console.log('Departing now...');

  } else {
    // Another key was pressed.
    console.log('You return to grab a different item...');

    // allow user to bring a different item and maybe look around
    // Game.startItem = readline.keyInSelect(Game.startItems, 'Which item are you bringing?');
    // addItem('start', Game.startItem)

    //console.log('You pick up the ' + Game.startItem + ' and leave the room.');

  }*/

console.log('The farmer tosses you keys.  "Good luck and farewell", he says. ') //"Give em hell kid"
console.log('')
readline.question('Press [Enter] to depart for Dark City...', {hideEchoBack: true,})
console.log('')

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

console.log('Outside...');
console.log(
    'Outside, the farm house is surrounded by many acres of untended fields.  '
    + 'Bordering the land is thick forest and a two lane highway.  '
)
readline.question('Press [Enter] to continue...', {hideEchoBack: true,})
console.log('')
console.log(
    'You start up the old motorcycle in the garage, head down the long driveway and set out down Highway 99.  '
    + 'Endless rolling fields of rural Abbington Valley fly by on the route to Dark City.  '
)
console.log('')
readline.question('Press [Enter] to continue...', {hideEchoBack: true,})
console.log('')
/*
    Describe entering the city
    As you approach the city ...
    Give the user a choice of picking up an item before the city
    - a weapon
    - a bribe
*/

while (Game.phase === 'middle'){
    // check if fighting or walking

    Game.action = readline.question('action')

    if (Game.action == 'w'){
        walk()
    }
    if (Game.action == 'end'){
        Game.phase = 'end'
    }
}
/*

Game Mechanics
- Fight
- Walk
- Search Builidings

*/


console.log(Game)