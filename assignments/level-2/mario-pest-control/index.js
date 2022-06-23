var catalog = [
    {
        name: 'Goombas',
        coins: 5,
        count: 0,
        image: 'assets/goombas.png',
    },
    {
        name: 'Bob-ombs',
        coins: 7,
        count: 0,
        image: 'assets/bob-omb.png',
    },
    {
        name: 'Cheep-cheeps',
        coins: 11,
        count: 0,
        image: 'assets/cheep.png',
        
    }
]

let pestList = document.getElementById('pest-list')

function displayList() {
    // Clear list before populating
    var listItems = document.getElementsByClassName('list-item')
    while(listItems.length > 0){
        listItems[0].parentNode.removeChild(listItems[0])
    }

    // Create list item for each pest in catalog
    catalog.forEach(item => {
        // Create elements
        var listEle = document.createElement('div')
        var imageEle = document.createElement('img')    
        var nameEle = document.createElement('span')
        var coinsEle = document.createElement('span')
        var countEle = document.createElement('input')
        var increaseBtnEle = document.createElement('div')
        var decreaseBtnEle = document.createElement('div')

        // Add classes
        imageEle.classList = 'item-pic'
        listEle.classList = 'list-item ' + item.name + '-item'
        nameEle.classList = 'list-name'
        coinsEle.classList = 'list-coins'
        countEle.classList = 'list-count'
        increaseBtnEle.classList = 'list-increase-btn'
        decreaseBtnEle.classList = 'list-decrease-btn'

        imageEle.src = item.image

        // Add text
        nameEle.innerText = item.name
        coinsEle.innerText = '$' + item.coins
        countEle.value = item.count
        increaseBtnEle.innerText = '+'
        decreaseBtnEle.innerText = '-'

        // Add listeners to increment buttons
        increaseBtnEle.addEventListener('click', e => {
            item.count++
            // Reload list
            displayList()
        })
        decreaseBtnEle.addEventListener('click', e => {
            if (item.count > 0){
                item.count--
            }
            // Reload list
            displayList()
        })

        // Append elements to list item
        nameEle.appendChild(imageEle)
        listEle.appendChild(nameEle)
        listEle.appendChild(coinsEle)
        listEle.appendChild(countEle)
        listEle.appendChild(increaseBtnEle)
        listEle.appendChild(decreaseBtnEle)

        // Append list item to list
        pestList.appendChild(listEle)
    })

    // Add total row
    var totalListEle = document.createElement('div')
    var totalNameEle = document.createElement('span')
    var totalCoinsEle = document.createElement('span')
    var totalCountEle = document.createElement('span')

    // Add classes
    totalListEle.classList = 'list-item total-row'
    totalNameEle.classList = 'list-name'
    totalCoinsEle.classList = 'list-coins'
    totalCountEle.classList = 'list-count'

    var totalCoins = 0, totalCount = 0;

    catalog.forEach(item => {
        totalCoins += item.coins * item.count
        totalCount += item.count
    })
    // Add text
    totalNameEle.innerText = 'Total:'
    totalCoinsEle.innerText = '$' + totalCoins
    totalCountEle.innerText = totalCount

    // Append elements to list item
    totalListEle.appendChild(totalNameEle)
    totalListEle.appendChild(totalCoinsEle)
    totalListEle.appendChild(totalCountEle)

    // Append list item to list
    pestList.appendChild(totalListEle)
}

// Show list on page load
displayList()