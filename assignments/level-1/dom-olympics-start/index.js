//////////////////
// DOM Olympics //
//////////////////

// Counter for new chat messages
var chatCounter = 1;

// Elements of chat messages
var messages = document.getElementsByClassName('messages')
var leftMessages = document.getElementsByClassName('left')
var rightMessages = document.getElementsByClassName('right')

// Initializes app functionality
function init(){
    // Create header elements
    var headerEle = document.getElementById('header')
    var title1 = document.createElement('h1')
    var title2 = document.createElement('h2')
    var nameEle = document.createElement('span')
    var textEle = document.createElement('span')

    // Add text to header elements
    title1.innerHTML = 'JavaScript Made This!!'
    nameEle.innerHTML = 'Samuel Wright'
    textEle.innerHTML = ' wrote the JavaScript'

    // Add style to header elements
    title1.style.textAlign = 'center'
    title2.style.textAlign = 'center'
    nameEle.style.color = 'lightgreen'

    // Add elements to page
    title2.append(nameEle, textEle)
    headerEle.appendChild(title1)
    headerEle.appendChild(title2)

    // Change chat text
    leftMessages[0].innerHTML = 'Hey'
    rightMessages[0].innerHTML = 'Sup'
    leftMessages[1].innerHTML = 'Be there in 10'
    rightMessages[1].innerHTML = 'Awesome'

    // Add onclick to clear button
    var clearBtnEle = document.getElementById('clear-button')

    clearBtnEle.onclick = () => {
         // While left and right chat elements exist, remove first child
        while(leftMessages.length > 0){
            //leftMessages[0].parentNode.removeChild(leftMessages[0]);
            leftMessages[0].remove()
        }
        while(rightMessages.length > 0){
            rightMessages[0].parentNode.removeChild(rightMessages[0]);
        }
    }

    // Element of the theme selection dropdown
    var selectEle = document.getElementById('theme-drop-down')

    // Add options to select
    var newOption = document.createElement('option')
    var newOption2 = document.createElement('option')
    newOption.innerHTML = 'green/gray'
    newOption2.innerHTML = 'beige/blue'
    newOption.value = "theme-three"
    newOption2.value = "theme-four"    
    selectEle.appendChild(newOption)
    selectEle.appendChild(newOption2)

    selectEle.addEventListener('change', ()=> applyTheme(selectEle.value))

    // Get form element name
    var formEle = document.getElementsByName('message')
    
    formEle[0].addEventListener('submit', function (event){
        // Create new element 
        var textEle = document.createElement('div')

        // Add 'message' class to element
        textEle.classList.add('message')
        
        // If message counter is odd add to left side, if counter is even add to right side
        if (chatCounter % 2){
            textEle.classList.add('left')
        } else {
            textEle.classList.add('right')
        }

        // Add input text to message element
        textEle.innerHTML = String(document.getElementById('input').value)

        // Add message to chat
        messages[0].appendChild(textEle)

        // Update theme
        applyTheme(selectEle.value)

        // Update counter for next message
        chatCounter++

        // Prevent page from refreshing
        event.preventDefault()
    })
}

// Applies theme to chat
function applyTheme(val){
    var leftChat = document.querySelectorAll('.left')
    var rightChat = document.querySelectorAll('.right')

    switch(val){
        case 'theme-one':
            leftChat.forEach((item) => {
                item.style.backgroundColor = 'burlywood';
            });
            rightChat.forEach(item => {
                item.style.backgroundColor = 'lightblue';
            });
            break;
        case 'theme-two':
            leftChat.forEach(item => {
                item.style.backgroundColor = 'lightgray';
            });
            rightChat.forEach(item => {
                item.style.backgroundColor = 'red';
            });
            break;
        case 'theme-three':
            leftChat.forEach(item => {
                item.style.backgroundColor = 'lightgray';
            });
            rightChat.forEach(item => {
                item.style.backgroundColor = 'lightgreen';
            });
            break;
        case 'theme-four':
            leftChat.forEach(item => {
                item.style.backgroundColor = 'beige';
            });
            rightChat.forEach(item => {
                item.style.backgroundColor = 'cornflowerblue';
            });
            break;
    }
}

// Initiallize on page load
window.onload = init()