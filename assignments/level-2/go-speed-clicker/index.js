var mouse = { x: 0, y: 0, }
var clickCount = 0
var clicks = []
var newList = false

var clickLogEle = document.getElementById('click-log')
var logXEle = document.getElementById('logx')
var logYEle = document.getElementById('logy')
var clicksEle = document.getElementById('clicks')

// Listens for mouse movement
addEventListener("mousemove", function(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
    
    //console.log("x ", mouse.x, "y ", mouse.y);

    logXEle.innerHTML = 'x: ' + event.pageX
    logYEle.innerHTML = 'y: ' + event.pageY
});

// Logs and displays users clicks
var clickEvent = (event) => {
    // If clear list is clicked do not add button click x and y to list
    if (newList === true){
        newList = false
        displayClicks()
        return
    }

    // Update click count
    clickCount++

    // Add click to list
    clicks.push([event.pageX, event.pageY, clickCount])
    
    // Display list
    displayClicks()
}

addEventListener("click", clickEvent)

var intervalCount = 30

// Countdown interval
const clickInterval = setInterval(()=>{
    //console.log('interval', intervalCount)

    // Show countdown
    var timeEle = document.getElementById('click-time')
    if (intervalCount == 0){
        timeEle.innerText = 'Time: 0'
    } else {
        timeEle.innerText = 'Time left: ' + intervalCount
    }
    intervalCount--
}, 1000)

const clickEnd = setTimeout(()=>{
    //console.log('interval cleared')

    //remove event listener
    removeEventListener('click', clickEvent)
    clearInterval(clickInterval)
}, 30000)

// Display stored clicks
function displayClicks(){
    
    // Clear list before populating
    var clicksItems = document.getElementsByClassName('clicks-item')
    
    while (clicksItems.length > 0){
        clicksItems[0].parentNode.removeChild(clicksItems[0]) 
    } 
    
    // Show click count
    var clickCountEle = document.getElementById('click-count')
    clickCountEle.innerText = 'Count: ' + clickCount

    // Add list entry for each click
    clicks.forEach(item => {
        var itemEle = document.createElement('div')
        var xValEle = document.createElement('span')    
        var yValEle = document.createElement('span')

        itemEle.classList = 'clicks-item'

        xValEle.innerText = 'x: ' + item[0] + ' '
        yValEle.innerText = 'y: ' + item[1] + ' '

        itemEle.appendChild(xValEle)
        itemEle.appendChild(yValEle)

        clicksEle.appendChild(itemEle)
    })

    createCookie('clicks', clicks)

}

// Clear cookie and list
document.getElementById('clear-clicks-btn').addEventListener('click', () => {
    deleteCookie('clicks')
    clicks = []
    newList = true;
    displayClicks()
})


window.onload = () => {
    // Check local storage for clicks array
    if (readCookie('clicks') !== null){
        // Retrieve saved clicks from local storage
        clicks = JSON.parse(readCookie('clicks'))
    }

    displayClicks()
}

// Create cookie
const createCookie = (key, value) => {
    const cookie = 
        key 
        + "=" 
        + JSON.stringify(value) 
        +";max-age=86400;" // Stored for 1 day
    ;
    document.cookie = cookie;
}

// Read cookie
const readCookie = (name) => {
    let key = name + "=";
    let cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];

        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }

        if (cookie.indexOf(key) === 0) {
            return cookie.substring(key.length, cookie.length);
        }
    }

    return null;
}

// Delete cookie
const deleteCookie = (name) => {
    createCookie(name, "", -1);
    //console.log('cookie deleted', readCookie("clicks") )
}
