var mouse = {
    x: 0,
    y: 0,
    
}
var clickCount = 0
var clicks = []

var clickLogEle = document.getElementById('click-log')
var logXEle = document.getElementById('logx')
var logYEle = document.getElementById('logy')
var clicksEle = document.getElementById('clicks')

addEventListener("mousemove", function(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
    
    //console.log("x ", mouse.x, "y ", mouse.y);

    logXEle.innerHTML = 'x: ' + event.pageX
    logYEle.innerHTML = 'y: ' + event.pageY
});


addEventListener("click", function(event) {
    clickCount++
    clicks.push([event.pageX, event.pageY, clickCount])
    displayClicks()
})

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
}

displayClicks()

// add interval and clear at 30 seconds
    // show interval countdown on page

// add local storage
/*


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
    console.log('cookie deleted', readCookie("saved-list") )
}

*/