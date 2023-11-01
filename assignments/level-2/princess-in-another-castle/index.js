class Player {
    constructor(
        name, 
        totalCoins, 
        status,
        hasStar,
    ) {
        this.name = name;
        this.totalCoins = totalCoins;
        this.status = status;
        this.hasStar = hasStar;
    }

    setName(namePicked) {
        this.name = namePicked
        this.print('setname')
    }

    gotHit(arg) {
        // If player has a star status remains the same
        if (this.hasStar === true){
            this.hasStar = false
            this.print('hit')
            console.log("Your star protected you!")
            
        } else {
            if (this.status === 'Small'){
                this.status = 'Dead'
            } else if (this.status === 'Big'){
                this.status = 'Small'
            } if (this.status === 'Powered Up'){
                this.status = 'Big'
            }
            this.print('hit')
        }
    }

    gotPowerup() {
        // Updates status based on previous status
        if (this.status === 'Small'){
            this.status = 'Big'
        } else if (this.status === 'Big'){
            this.status = 'Powered Up'
        } if (this.status === 'Powered Up'){
            // Show message and update only if player gains a star 
            if (this.hasStar === false){
                this.hasStar = true
                this.print('star')
            }
        }

        this.print('powerup')
    }

    addCoin() {
        this.totalCoins++
    }

    print(msg) {
        // Prints message based on received parameter
        if (msg === 'setname'){
            console.log('You changed your name to ' + player.name)
            console.log('')
        } else 
        if (msg === 'hit'){
            console.log('You got hit!')
            console.log('')
        } else 
        if (msg === 'powerup'){
            console.log('You got a PowerUp!')
            console.log('')
        } else 
        if (msg === 'star'){
            console.log('Congratulations! You got a star!')
            console.log('')
        } else 
        if (msg === 'dead'){
            console.log("You Are dead")
            console.log('')
            console.log('Final Stats:')
            console.log('Name: ' + player.name)
            console.log('Status: ' + player.status)
            console.log('Total Coins: ', player.totalCoins)
            console.log('')
        } else
        if (msg == null){
            console.log('')
            console.log('Name: ' + player.name)
            console.log('Status: ' + player.status)
            console.log('Total Coins: ', player.totalCoins)

            if (player.hasStar){
                console.log('You have a star')
            }
            console.log('')
        }
    }
}

function getRandomInt() {
    return Math.floor(Math.random() * 3);
}

var player = new Player(
    'Mario',
    0,
    'Big',
    false
)

player.print()

player.setName('Luigi')

var interval =  setInterval(() => {
    // Clear interval if player is dead
    if (player.status === 'Dead'){
        player.print('dead')
        clearInterval(interval)
        return
    } else {
        player.print()
    }

    // Get number for random event 
    var randomNum = getRandomInt()

    // Based on number run event 
    if (randomNum === 0){
        player.gotHit(true)
    } else
    if (randomNum === 1){
        player.gotPowerup()
    } else
    if (randomNum === 2){
        player.addCoin()
    }
}, 2000)
