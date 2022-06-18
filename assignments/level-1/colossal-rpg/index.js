const readline = require("readline-sync")

///////////////////////////////////////
//// Dark City Text Adventure Game ////
///////////////////////////////////////


// Game data
var Game = {
    // Stats
    name: '',
    hp: 100,
    hpMax: 100,
    strength: 10,
    charm: 10,
    exp: 0,
    startItem: null,
    cash: 50,

    // Inventory
    startItems: ['Laser Knife', 'Dark Ale'],
    equippedWeapon: null,
    items: [
        {
            name: 'Laser Knife',
            strength: 7,
            uses: null,
            hp: null,
            count: 1
        },
    ],
    gameItems: [
        'Laser Knife',
        'Dark Ale',
        'Baseball Bat',
        'Brawler Chain',
        'Crowbar',
        'Med Kit',
    ],
    allItems: [
        {
            name: 'Laser Knife',
            strength: 6,
            uses: null,
            hp: null,
            count: 1,
            rarity: 'common',
        },
        {
            name: 'Laser Knife +2',
            strength: 10,
            uses: null,
            hp: null,
            count: 1,
            rarity: 'uncommon',
        },
        {
            name: 'Laser Knife +3',
            strength: 14,
            uses: null,
            hp: null,
            count: 1,
            rarity: 'rare',
        },
        {
            name: 'Dark Ale',
            strength: null,
            uses: 1,
            hp: 100,
            count: 1,
            rarity: 'rare',
        },
        {
            name: 'Med Kit',
            strength: null,
            uses: 1,
            hp: 30,
            count: 1,
            rarity: 'common',
        },
        {
            name: 'Med Kit +2',
            strength: null,
            uses: 1,
            hp: 60,
            count: 1,
            rarity: 'uncommon',
        },
    ],

    // State
    gamePhase: 'intro', // intro, beginning, middle, end
    fightState: false,
    walkingState: false,
    showStats: null,
    continue: null,

    // Events
    eventText: {
        walking: [
            'Normal residential houses.  No activity.',
            'Quiet row of homes.  No sign of Brawlers here.',
            'You pass an apartment building.  Looks well protected.',
            'You pass an empty field.  Signs kid\'s were playing there earlier.  Nothing suspicious.',
            'A highrise with armed security in the lobby.  Wouldn\'t wanna mess with them.',
            'Food cart with food sizzling.  Closing soon. Not hungry now.',
            'You pass a small shop about to close.  Looks fine for now.  Hope the staff gets home safe.'
        ],
        search: [
            'You come across a suspicious building',
            'You hear fighting in the nearby alley',
            'You notice suspicious activity in the alley closeby',
            'You come across a home that looks broken into',
            'A shop that looks recently vandalized and broken into',
        ],
        fight: [
            'Enemy gang member approaches...',
            'An enemy thief approaches...',
            'A Brawler wants to fight...',
        ]
    
    },

    // Enemies
    enemies:[
        {
            name: 'Thief',
            health: 31,
            strength: 10,
            exp: 7,
        },
        {
            name: 'Thief',
            health: 31,
            strength: 10,
            exp: 8,
        },
        {
            name: 'New Recruit',
            health: 20,
            strength: 7,
            exp: 9,
        },
        {
            name: 'New Recruit',
            health: 23,
            strength: 7,
            exp: 10,
        },
        {
            name: 'Gang Initiate',
            health: 26,
            strength: 5,
            exp: 10,
        },
        {
            name: 'Gang Initiate',
            health: 27,
            strength: 7,
            exp: 11,
        },
        {
            name: 'Grifter Sidekick',
            health: 38,
            strength: 12,
            exp: 15,
        },
        {
            name: 'Greasy Hipster',
            health: 42,
            strength: 14,
            exp: 17,
        },
        {
            name: 'Brawler Thug',
            health: 61,
            strength: 16,
            exp: 20,
        },
    ],
    currentEnemy: {
        name: 'the thief',
        health: 20,
        strength: 15,
        state: 'active',
    }

}

var randEncounter, randBuilding, randItem;

function Item(name, uses, strength, hp, count){
    this.name = name
    this.uses = uses
    this.strength = strength
    this.hp = hp
    this.count = count ? count : 1
}

function randomNum(max){
    return Math.floor(Math.random() * max)
}

function addItem(name, num){
   var itemExists = Game.items.some(item => {
        if (name == item.name){
            return true 
        } else {
            return false
        }
    })

    if (itemExists){
        // Find item in inventory and update the count
        Game.items.forEach((item, index) => {
            if (name == item.name){
                item.count = item.count + 1

                if (item.uses !== null){
                    // Update to check for specific item type
                    item.uses = item.uses + 1
                }
            }
        })

        console.log('')
        console.log(name + ' added to inventory!')
        console.log('')
    } else {
        // Add new Item to items
        var newItem;

        Game.allItems.forEach((item, index) => {
            if (item.name == name){
                newItem = {
                    name: item.name, 
                    uses: item.uses, 
                    strength: item.strength,
                    hp: item.hp,
                    count: 1,
                }
            }
        })

        Game.items.push(newItem)

        console.log('')
        console.log(name + ' added to inventory!')
        console.log('')
    }
}
function removeItem(){

}
function getItem(rarity){
    // Get rarity
    var type = 'common'

    if (rarity < 8){
        type = 'rare'
    } else if (rarity < 34){
        type = 'uncommon'
    }

    // Get all items of rarity type

    var itemsArr = []

    Game.allItems.forEach(item => {
        if (item.rarity == type){
            itemsArr.push(item)
        }
    })

    var randNum = randomNum(itemsArr.length)

    return itemsArr[randNum].name
}
function useItem(type){
    console.log(type + ' used...')

    // Get type info
    var currentItem;
    var itemIndex;

    Game.items.forEach((item, i) => {
        if (item.name == type){
            currentItem = item
            itemIndex = i
        }
    })

    // If health already full dont use
    if (Game.hp >= Game.hpMax){
        console.log('Full health already...')
        return
    } else 
    if (type == 'Med Kit'){
        Game.hp = Game.hp + currentItem.hp
        if (Game.hp > Game.hpMax){
            Game.hp = Game.hpMax
        }
        currentItem.uses = currentItem.uses - 1  
        console.log('Health restored by ' + currentItem.hp + '.')      
    } else 
    if (type == 'Med Kit +2'){
        Game.hp = Game.hp + currentItem.hp
        if (Game.hp > Game.hpMax){
            Game.hp = Game.hpMax
        }
        currentItem.uses = currentItem.uses - 1 
        console.log('Health restored by ' + currentItem.hp + '.')
    } else 
    if (type == 'Dark Ale'){
        Game.hp = Game.hpMax
        currentItem.uses = currentItem.uses - 1  
        console.log('Health fully restored.')
    }

    // Update item info by replacing former item with currentItem
    if (currentItem.uses <= 0 ){
        Game.items.splice(itemIndex, 1)
    } else {
        Game.items.splice(itemIndex, 1, currentItem)
    }
}

function displayStats(stat){
    if (stat == 'inventory'){
        console.log('')
        console.log('==Inventory==')
        console.log('Cash: $' + Game.cash)
        console.log('Items: ', Game.items)
    }
    if (stat == 'status'){
        console.log('')
        console.log('==Status==')
        console.log('Player: ' + Game.name)
        console.log('Cash: $' + Game.cash)
        console.log('Health: ' + Game.hp)
        console.log('Strength: ', Game.strength)
        console.log('Charm: ', Game.charm)
        console.log('Exp: ', Game.exp)
    }
    if (stat == 'full'){
        console.log('')
        console.log('==Stats==')
        console.log('Player: ' + Game.name)
        console.log('Cash: $' + Game.cash)
        console.log('Health: ' + Game.hp)
        console.log('Strength: ', Game.strength)
        console.log('Charm: ', Game.charm)
        console.log('Exp: ', Game.exp)
        console.log('Items: ', Game.items)
    }
}
function walk(encounter){
    console.log('')
    console.log('Walking on..')

    var randEventNum = randomNum(Game.eventText.walking.length)

    if (encounter < 25){
        console.log(Game.eventText.fight[randEventNum])

        fightInit()
    } else {
        console.log(Game.eventText.walking[randEventNum])
    }
}

function search(){
    console.log('')
    console.log('You search the area...')

    randEncounter = randomNum(100)
    if (randEncounter < 20){
        //fight
        fightInit()
    }

    randItem = randomNum(100)
    if (randItem < 10){
        // Add item to inventory
        console.log('Item discovered!!')
        var randGameItem = randomNum(Game.allItems.length)
        addItem(Game.allItems[randGameItem].name, 1)
    } else {
        console.log('Nothing here')
    }
}

function fightInit(){
    // Get enemy
    var randEnemy = randomNum(Game.enemies.length)
    var current = Game.enemies[randEnemy]
    
    // Set new enemy as current
    Game.currentEnemy.name = current.name
    Game.currentEnemy.strength = current.strength
    Game.currentEnemy.health = current.health

    // Update game state
    Game.fightState = true
    Game.walkingState = false

    console.log('')
    console.log('============= Fight Initiated =============')
    console.log('')
}
function attack(weapon, enemy) {
    if (weapon !== false){
        console.log('')
        console.log('You attack ' + Game.currentEnemy.name + ' with the ' + weapon)
        console.log('')
    } else {
        console.log('')
        console.log('You attack ' + Game.currentEnemy.name)
        console.log('')
    }
    
    // Attacks enemy if successful 
    var hitChance = randomNum(100)

    if (hitChance < 90){
        // Attack min = base strength; max = base + extra
        var attack = Game.strength + randomNum(Math.round(Game.strength * .6))

        Game.currentEnemy.health = Game.currentEnemy.health - attack
        console.log('Attack successful for ' + attack + ' hit points!')
    } else {
        console.log('Attack missed!')
    }

    console.log('')

    // Enemy attacks if possible
    if (enemy === true){
            
        var enemyHitChance = randomNum(100)
        if (enemyHitChance > 10){
            var enemyAttack = Game.currentEnemy.strength + randomNum(Math.round(Game.currentEnemy.strength * .4))
            Game.hp = Game.hp - enemyAttack

            console.log('')
            console.log(Game.currentEnemy.name + ' attacks for ' + enemyAttack + ' hit points!')
        } else {
            console.log('')
            console.log(Game.currentEnemy.name + '\'s attack missed!')
        }
    }
}

function updateLevel(exp){
    if (exp > 100){
        console.log('')
        console.log('============= Congratulations!! =============')
        console.log('')
        console.log('You win!!  You\'ve defeated the Brawlers and brought peace to District 9!!')
        console.log('')

        Game.phase = 'end'
    } 
}

/*
var randRarity1 = randomNum(100)
addItem(getItem(randRarity1), 1)
addItem(getItem(50), 1)
addItem(getItem(1), 1)
*/


  ///////////////////
 /// Intro Phase ///
///////////////////

// Set game phase
Game.phase = 'beginning'

console.log('')
console.log('============Introduction============')
console.log(
    'Miles down the nearby two lane highway is a sprawling city.  '
    + 'Electric lights, gangs and darkness have flooded every corner of the technopolis.  '
    + 'A place of endless possibilites ruled by power and might.  '
    + 'Fortune and glory lies at the top of Dark City\'s underworld, however nearly all who come to conquer it find despair.  '
)
console.log('')
console.log("Welcome to Dark City...")
console.log('')
readline.question('Press [Enter] to begin...', {hideEchoBack: true,})
console.log(' ')
console.log('"Beep Beeeeeep Beep Beep Beeep..."')
console.log(
    'A cell phone rings in a second floor bedroom of a lonely farmhouse.  '
    + 'You slightly wake from your slumber to tilt the phone on the night stand.  '
    + 'Three unread messages...'
)
console.log('')

// Get Player name
Game.name = readline.question('(What is your name?)  ');
console.log('')
console.log('Messages:  ')
console.log('4:59pm: Get here soon ' + Game.name + ' -Ana" ')
console.log('4:50pm: "Brawlers planning something big tonight! It\s finally going down! -M" ')
console.log('4:30pm: "NINE DICE CLUB 10PM -Anonymous" ')

// Choose start Item
    // While player is in room they can look around before leaving
console.log('')
readline.question('Press [Enter] to continue...', {hideEchoBack: true,})
console.log('')
console.log(
    'As the sun touches the horizon.  '
    + 'You put on your jacket with pocket space for an item.  '
    + 'A Laser Knife and Dark Ale sit on the desk.  '
)
Game.startItem = readline.keyInSelect(Game.startItems, 'Which item are you bringing?  ');

// Add item to inventory
addItem(Game.startItems[Game.startItem], 1)

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
    + '"It\'s about that time", said the farmer.  '
    + 'You nod.  '
    + '"Farewell and good luck", he says as he tosses you keys.  '
    //+ '"Give em hell kid!", you hear stepping out the door'
) 
console.log('')
readline.question('Press [Enter] to depart for Dark City...', {hideEchoBack: true,})
console.log('')

// Leave for Dark City
console.log('You step out the front door...');
console.log(
    'Outside, the farm house is surrounded by many acres of untended fields.  '
    + 'A silent two lane highway cuts through the middle of the farmland leading south.  '
)
console.log('')
readline.question('Press [Enter] to continue...', {hideEchoBack: true,})
console.log('')
console.log('You start up the old motorcycle in the garage...')
console.log(
    'It puckers, followed by a loud "VROOOM".  '
    + 'You head down the long driveway and set out down Highway 99.  '
    + 'Endless rolling fields of rural Abbington pass as you race to Dark City.  '
)
console.log('')
readline.question('Press [Enter] to continue...', {hideEchoBack: true,})
console.log('')
console.log('After miles of driving, the city skyline slowly blooms on the horizon...')
console.log(
    'The highway runs through a quiet commercial district just beyond city limits.  '
    + 'Save for a few well lit corner stores, most stores closed early and were nestled behind heavy locked security gates.  '
    + 'The surrounding neighborhoods lie in the shadow of Dark City\'s skyline.  '
    + 'You speed pass countless rows of identical unlit homes with occassional abandoned houses breaking the pattern.  '
)
console.log('')
readline.question('Press [Enter] to continue...', {hideEchoBack: true,})
console.log('')
console.log(
    '"Beep Beeeeeep Beep Beep Beeep..."  '
    + 'The caller is displayed on your helmet visor.'
)
console.log('')
console.log('"Caller: Ana"')
console.log('')

// Call from Ana that unlocks later event

if (readline.keyInYN('Talk to Ana?')){
    console.log('')
    console.log(
    '"' + Game.name + '...?" '
    )
    console.log('')
    readline.question('Press [Enter] to talk...')
    console.log('')
    console.log('"It\'s good to hear your voice.  I hope the turf war ends tonight."  ') 
    console.log('')
    readline.question('Press [Enter] to respond...')
    console.log('')
    console.log(
        '"I\'m glad you\'re confident.  '
        + 'It\'s been chaos in the 9th district since you started pushing back against the Brawlers.  '
        + 'People are more hopeful than ever now, but the Brawlers are more aggresive.  '
        + 'They\'re even at war with the residents now.  '
        + 'I hope the fighting ends soon..."  '
    ) 
    console.log('')
    readline.question('Press [Enter] to reassure...')
    console.log('')
    console.log(
        '"That\'s true.  Well...  Get here soon."'
    )
    console.log('')
    readline.question('Press [Enter] to end call...')
}

console.log('')
console.log('You arrive at the bridge to the city')
console.log('')
readline.question('Press [Enter] to enter Dark City...', {hideEchoBack: true,})
console.log('')
console.log('The city was quieter than normal...  ')
console.log(
    'The highway from the bridge takes you through downtown. '  
    + 'The corporations are asleep.  No sirens are going off.  (Something feels weird)  '
    + 'You shift gears taking the exit for the ninth district.  '
    + 'A weathered "D9" sign hangs in front of a the D9 plaza.  '
    + 'Gotta go on foot now.  '
    + 'You park, cover the motorcycle and enter the district.'
)
console.log('')
readline.question('Press [Enter] to enter District 9...', {hideEchoBack: true,})
/* 
console.log('You look up...')
console.log(
    'High rise apartments loom over the 9th district neighborhoods.  '
    + 'Shops, apartments and food carts layering each level of the plaza above.  '
)
*/

  ////////////////////
 /// Middle Phase ///
////////////////////

Game.phase = 'middle'

Game.walkingState = true

while (Game.phase === 'middle'){
    Game.searchAvailable = false

    console.log('')
    
    // if building let user search
    randBuilding = randomNum(100)

    // Check player level

    // Check health regen
    
    // Walking
    if (Game.walkingState === true){
        // Get action
        if (randBuilding < 20){
            // get random search event text
            var randSearchEvent = randomNum(Game.eventText.search.length)
            console.log(Game.eventText.search[randSearchEvent])
            console.log('')
            Game.searchAvailable = true
            console.log('Actions: [w]:walk  [s]search [i]:inventory [t]:status [p/print]:status+inv [e]:exit')
            Game.action = readline.question('>')
        } else {
            console.log('Actions: [w]:walk [i]:inventory [t]:status [p/print]:status+inv [e]:exit')
            Game.action = readline.question('>')
        }

        // if walking allow for actions
        if (Game.action == 'w'){
            // Recover health each turn
            if (Game.hp <= 95) {
                var recoveredHealth = randomNum(9) + 1
                Game.hp = Game.hp + recoveredHealth
                console.log('You heal ' + recoveredHealth + ' hit points from resting.')
            }

            randEncounter = randomNum(100)

            walk(randEncounter)
        }
        if (Game.action == 's' && randBuilding < 20){
            search()
        }
        if (Game.action == 'b'){
            // open store to buy items
            console.log('buy items')
        }
        if (Game.action == 'i'){
            displayStats('inventory')
        }
        if (Game.action == 't'){
            displayStats('status')
        }
        if (Game.action == 'p' || Game.action == 'print'){
            displayStats('full')
        }

        if (Game.action == 'e'){
            Game.phase = 'exit'
            console.log('')
            console.log('Goodbye')
        }
    }

    // Fight
    if (Game.fightState === true){
        console.log('\\\\\\\\\\\\ Your turn //////')
        console.log('Enemy: ', Game.currentEnemy)
        console.log('Actions: [a]:attack [r]:run [i]:inventory [t]:status [p/print]:status+inv [e]:exit')
        Game.action = readline.question('>')

        // Action command handlers
        if (Game.action == 'a'){
            attack(false, true)
        } else 
        if (Game.action == 'i'){
            displayStats('inventory')
        } else 
        if (Game.action == 't'){
            displayStats('status')
        } else 
        if (Game.action == 'r'){
            var runChance = randomNum(10)
            if (runChance < 6){
                console.log('You got away safely...')
                Game.fightState = false
                Game.walkingState = true
            } else {
                console.log('You couldn\'t get away')
            }
        } else
        if (Game.action == 'u'){
            var useableItems = []

            // Get useable items to select from
            Game.items.forEach(item => {
                if (item.uses !== null && item.uses > 0){
                    useableItems.push(item.name)
                }
            })

            // If useable items exist open user selection
            if (useableItems.length > 0){
                Game.useItemState = true

                var items = readline.keyInSelect(useableItems, 'Which item do you want to use?  ');

                // Use item
                useItem(useableItems[items])
            } else {
                console.log('Inventory empty...')
            }
        }

        // Exit game command
        if (Game.action == 'e'){
            Game.phase = 'exit'
            console.log('Goodbye')
        }

        // Game ends if player health reaches 0
        if (Game.hp === 0){
            console.log('')
            console.log('You are defeated')
            Game.phase = 'end'
        }

        // Battle ends if enemy health reaches 0
        if (Game.currentEnemy.health <= 0){
            console.log('')
            console.log('')
            console.log('============ Enemy Defeated ============')
            console.log('')

            // Find item
            var randItem = randomNum(20) 

            if (randItem < 5){
                console.log('Item found!!')
                //var randGameItem = randomNum(Game.allItems.length)
                //addItem(Game.allItems[randGameItem].name, 1)

                var randRarity = randomNum(100)
                addItem(getItem(randRarity), 1)
            }

            // Add cash
            var newCash = randomNum(11) + 2
            Game.cash = Game.cash + newCash

            // Add experience points
            var newExp = randomNum(15) + 5
            Game.exp = Game.exp + newExp
            
            console.log('You found $' + newCash + ' and gained ' + newExp + ' experience points')
            console.log('')
            console.log('You continue walking...')

            // Return to walking
            Game.fightState = false
            Game.walkingState = true
        }
    }

    // Update player level
    updateLevel(Game.exp)
}

//console.log(Game)