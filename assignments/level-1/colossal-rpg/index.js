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
    cash: 50,

    // Inventory
    startItems: ['Laser Knife', 'Dark Ale'],
    items: [],

    // State
    gamePhase: 'intro', // intro, beginning, middle, end
    fight: false,
    showStats: null,
    continue: null,
    eventText: {
        walking: [
            'Normal residential houses. No activity.',
            'You pass a residential apartment building. Looks well protected.',
            'You pass an empty field.  Signs kid\'s were playing there earlier. Nothing suspicious.' 
        ],
        search: [
            'You come across a suspicious building',
            'You hear fighting in the nearby alley',
            'You come across a home that looks broken into',
        ],
        fight: [
            'Enemy gang member approaches...',
            'An enemy thief approaches...',
            'A Brawler wants to fight...',
        ]
    
    }
}

var randEncounter, randBuilding, randItem;

function Item(name, uses, strength, hp){
    this.name = name
    this.uses = uses
    this.strength = strength
    this.hp = hp
}

function randomNum(max){
    return Math.floor(Math.random() * max)
}
function addItem(type, num, name){
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
            item = new Item('Laser Knife', null, 5, null)
            Game.items.push(item)

            console.log('')
            console.log('Laser Knife added to items.')
            console.log('Inventory: ', Game.items)
            console.log('')
        } else
        if (num === 1 || num === '1'){
            //Game.items.push('Dark Ale')
            item = new Item('Dark Ale', 5, null, 10)
            Game.items.push(item)

            console.log('')
            console.log('Dark Ale added to items.')
            console.log('Inventory: ', Game.items)
            console.log('')
        } else {
            console.log('')
            console.log('No item acquired')
            console.log('')
            return
        }
    }

    if (type == 'new'){
        // check inventory
        console.log('adding ' + name + '...')

        var newInv = []

        if(name){
            for (var a = 0; a < Game.items.length; a++){

                console.log(Game.items[a].name)
                
                if (name === Game.items[a].name){
                    console.log('item exists', Game.items.Item.name)
                } else {
                    console.log('item does not exist')
                    item = new Item(name, 1,2,3)
                }
            }
        }
    }
}

function removeItem(){

}

function walk(encounter){
    console.log('')
    console.log('Walking on..')

    var randEventNum = randomNum(Game.eventText.walking.length)

    if (encounter < 20){
        console.log(Game.eventText.fight[randEventNum])
        fight()
    } else {
        console.log(Game.eventText.walking[randEventNum])
    }
}

function search(){
    console.log('')
    console.log('You entered the building...')
    //readline.question('Press [Enter] to continue..')
    
    // get random event from array of random building events
    console.log('(random search event)')

    // 
    randEncounter = randomNum(100)
    if (randEncounter < 20){
        //fight
        fight()
    }

    randItem = randomNum(100)
    if (randItem < 10){
        console.log('(found item)')
    } 

    //test
    addItem('new', 1 ,'dung beetle')
}

function fight(){
    console.log('')

    // fight commands
        // attack
        // defend
        // use item
        // run

    console.log('fight initialized')
}

  ///////////////////
 /// Intro Phase ///
///////////////////

console.log("Welcome to Dark City!!")
console.log('=========Introduction=========')
console.log(
    'Miles down the nearby two lane highway is a sprawling city.  '
    + 'Electric lights, gangs and darkness have flooded every corner of the technopolis.  '
    + 'A place of endless possibilites ruled by power and might.  '
    + 'Fortune and glory lies at the top of Dark City\'s underworld, however nearly all who come to conquer it find despair.  '
)
console.log('')
readline.question('Press [Enter] to begin...', {
    hideEchoBack: true,
})

Game.phase = 'beginning'

/*
    Describe setting
    - room on a homestead

    Describe the opening plot
    - hero out for revenge
    - landowner is sympathetic to hero's causes: to get the Brawlers and will do anything for payback
*/

console.log(' ')
console.log(
    '"Beep Beeeeeep Beep Beep Beeep".  A cell phone rings in a second floor bedroom of a lonely farmhouse.  '
    + 'You slightly wake from your slumber to tilt the phone on the night stand.  '
    + 'Three unread messages...'
)
console.log(' ')
//readline.question('Press [Enter] to continue...', {hideEchoBack: true,})
//console.log(' ')
Game.name = readline.question('(What is your name?)  ');
console.log(' ')
console.log('Messages:  ')
console.log('4:59pm: Get here soon ' + Game.name + ' -Ana" ')
console.log('4:50pm: "Brawlers planning something big tonight! It\s finally going down! -M" ')
console.log('4:30pm: "NINE DICE CLUB 10PM -Anonymous" ')
//console.log('...')

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
readline.question('Press [Enter] to continue...', {hideEchoBack: true,})
console.log(' ')
console.log(
    'As the sun touches the horizon.  '
    + 'You put on your jacket with pocket space for an item.  '
    + 'A Laser Knife and Dark Ale sit on the desk.  '
)
Game.startItem = readline.keyInSelect(Game.startItems, 'Which item are you bringing?  ');

// Add item to inventory
addItem('start', Game.startItem)

// (Tell user what item does)
if (
    Game.startItems[Game.startItem] == 'Laser Knife' 
    || Game.startItems[Game.startItem] == 'Dark Ale'
){
    console.log('You pick up the ' + Game.startItems[Game.startItem] + ' and leave the room.')
} else {
    console.log('You leave the room')
}
console.log('')
console.log('You walk downstairs...  ')
console.log(
    'The farmer sits in the kitchen.  '
    + '"It\'s about that time", said the farmer.  
    + 'You nod.  '
    + '"Good luck and farewell", he says as he tosses you keys.  '
    //+ '"Give em hell kid", you hear stepping out the door'
) 
console.log('')
readline.question('Press [Enter] to depart for Dark City...', {hideEchoBack: true,})
console.log('')

  ////////////////////
 /// Middle Phase ///
////////////////////
/*
  todo
    - story moments
    - walk function
    - fight function
 */

Game.phase = 'middle'

// Leave for Dark City
console.log('You step out the front door...');
console.log(
    'Outside, the farm house is surrounded by many acres of untended fields.  '
    + 'A silent two lane highway cuts through the middle of the land leading south.  '
)
console.log('')
readline.question('Press [Enter] to continue...', {hideEchoBack: true,})
console.log('')
console.log('You start up the old motorcycle in the garage...')
console.log(
    'It puckers, followed by a loud "VROOOM".  '
    + 'You head down the long driveway and set out down Highway 99.  '
    + 'Endless rolling fields of rural Abbington pass as you fly down the road to Dark City.  '
)
console.log('')
readline.question('Press [Enter] to continue...', {hideEchoBack: true,})
console.log('')
console.log('The city blooms slowly on the horizon...')
console.log(
    'The highway cuts through a quiet commercial district just beyond city limits.  '
    + 'Save for a few well lit corner stores, most businesses closed early and were nestled behind heavy locked security gates.  '
    + 'The town\'s neighborhoods lie in the shadow of Dark City\'s skyline.  '
    + 'Run down homes litter the rows of identical unlit homes as you breeze pass the residential district.  '
)
console.log('')
readline.question('Press [Enter] to continue...', {hideEchoBack: true,})
console.log('')
console.log(
    '"Beep Beeeeeep Beep Beep Beeep..."'
    + 'The caller displayed on your helmet visor.'
)
console.log('')
console.log('"Caller: Ana"')
console.log('')

// Call from Ana 
    // Unlocks item later 
readline.keyInYN('Talk to Ana? ')
console.log('')
console.log(
'"' + Game.name + '" '
)
console.log('')
readline.question('Press [Enter] to talk...')
console.log('')
console.log('It\'s good to hear your voice.  I hope tonight\'s the night.  ') 
console.log('')
readline.question('Press [Enter] to respond...')
console.log('')
console.log(
    'I\'m glad you\'re confident.  '
    + 'It\'s been chaos in the 9th district since you started pushing back against the Brawlers.  '
    + 'People are more hopeful than ever now but the Brawlers are more aggresive than they\'ve been in years.  '
    + 'They\'re at war with anyone who looks at them sour now.  '
    + 'They know they\'re falling apart. I hope...  '
) 
console.log('')
readline.question('Press [Enter] to agree and reassure...')
console.log('')
console.log(
    'That\'s true.  Well...  Get here soon. '
)
console.log('')
readline.question('Press [Enter] to end call...')
console.log('')
console.log('You arrive at the bridge to the city')
console.log('')
readline.question('Press [Enter] to enter Dark City...', {hideEchoBack: true,})
console.log('')
console.log('City feels eerie...  ')
console.log(
    'The highway from the bridge takes you through downtown. '  
    + 'The corporations are asleep.  (Something feels weird)  '
    + 'You shift gears take the exit for the ninth district.  '
    + '(Arrived at the 9th. Gotta go on foot now)  '
    + 'You park and enter the district.'
)

/*
    Middle Phase Story
    - lvl 2: You save a group of teenagers
    - lvl 3: You start winning fights, the brawlers no your coming
    - lvl 4: Ana is taken by the Brawlers
    - lvl 5: You get information on her whereabouts
    - lvl 6: The boss traps you (it was a trap) and bounds you
    - lvl 7: The teenagers return with people from the community
        - large battle ensuesy  

    Actions
    - walk
    - buy
    - search
    - inventory
    - end

*/



while (Game.phase === 'middle'){
    console.log('')
    
    // if building let user search
    randBuilding = randomNum(100)
    
    // Get action
    if (randBuilding < 20){
        // get random search event text
        var randSearchEvent = randomNum(Game.eventText.search.length)
        console.log(Game.eventText.search[randSearchEvent])
        console.log('')
        console.log('Actions: [w]:walk  [s]search [i]: inventory [end]:end')
        Game.action = readline.question('>')
    } else {
        console.log('Actions: [w]:walk [i]: inventory [end]:end')
        Game.action = readline.question('>')
    }

    // 
    if (Game.action == 'w'){
        randEncounter = randomNum(100)

        walk(randEncounter)
    }
    if (Game.action == 's' && randBuilding < 20){
        search()
    }
    if (Game.action == 'b'){
        // open store to buy items
    }
    if (Game.action == 'i'){
        console.log('')
        console.log('==Inventory==')
        console.log('Cash: $' + Game.cash)
        console.log('Items: ', Game.items)
    }

    if (Game.action == 'end'){
        Game.phase = 'end'
        console.log('Goodbye')
    }
}

/*

Game Mechanics
- Fight
- Walk
- Search Builidings

*/


console.log(Game)