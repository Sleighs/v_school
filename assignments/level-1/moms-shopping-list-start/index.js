/////////////////////////
// Mom's Shopping List //
/////////////////////////


// A place to store the app's data
var listData = {
    listEntries: []
}


// Add listener to button
document.getElementsByName("addItem")[0].addEventListener("submit", function(e){
    // Create new list item
    createListItem(e)

    // Prevent page refresh
    e.preventDefault()
})

const newId = () => {  
    var newNum = Math.floor(Math.random() * 999999999999)
    var id = newNum
    
    // Check if id is already used
    for (var i = 0; i < listData.listEntries.length; i++){
        // Replace id if duplicate exists
        if (listData.listEntries[i][0] === newNum){
            id = newId()
        }
    }

    return id
}

const createListItem = (e) => {
    // Get input text element
    var item = document.getElementById("title")
    
    // Create unique-id
    var id = newId()

    // Store list data
    listData.listEntries.push([id, item.value])

    // Display new list
    displayList()
}


const deleteEntry = (node, id) => {
    // Remove node from page
    node.remove()

    // Create new array
    var newArr = []

    // Populate new array with current list, excluding deleted item
    for (var i = 0; i < listData.listEntries.length; i++){
        if (listData.listEntries[i][0] !== id){
            newArr.push(listData.listEntries[i])
        }
    }

    // Store new array
    listData.listEntries = newArr

    // Display new list
    displayList()
}

const editEntry = (e, id, newText) => {
    // Create new array
    var newArr = []

    // Populate new array with current list, updating the new text
    for (var i = 0; i < listData.listEntries.length; i++){
        if (listData.listEntries[i][0] === id){
            newArr.push([id, newText])
        } else {
            newArr.push(listData.listEntries[i])
        }
    }

    // Store new array
    listData.listEntries = newArr

    // Display new list
    displayList()
}

const displayList = () => {
    // Clear old list from page
    var listElements = document.getElementsByClassName('list-item');

    while (listElements.length > 0){
        listElements[0].parentNode.removeChild(listElements[0]);
    }

    // Get list data
    for (var i = 0; i < listData.listEntries.length; i++){
        let id = listData.listEntries[i][0]
        let text = listData.listEntries[i][1]
        console.log(listData.listEntries[i][1], id)

        // Create li element
        var newListItem = document.createElement("li")
        newListItem.setAttribute("class", "list-item")

        // Add text to li element 
        const itemText = document.createElement("div")
        itemText.innerHTML = text
        newListItem.appendChild(itemText)

        // Create edit and delete button
        const editButton = document.createElement("button")
        const deleteButton = document.createElement("button")

        // Edit button
        editButton.textContent = 'edit'
        editButton.setAttribute("class", "edit-button")
        editButton.addEventListener('click', (e) => {
            //var currentId = id;
            console.log('id', id)
            // Replace list text with input and button
            var editEle = document.createElement('div')
            var inputEle = document.createElement('input')
            var submitEle = document.createElement('button')
            inputEle.value = text
            submitEle.textContent = 'Update'

            // Add listener to button
            submitEle.addEventListener('click', (e) => {
                editEntry(e, id, inputEle.value)
                console.log(e, id, inputEle.value)
            })

            // Add element to page
            editEle.appendChild(inputEle)
            editEle.appendChild(submitEle)
            e.target.parentNode.appendChild(editEle)
            editButton.remove()
            deleteButton.remove()
            
        })
        newListItem.appendChild(editButton)

        // Delete button
        deleteButton.textContent = 'X'
        deleteButton.setAttribute("class", "delete-button")
        deleteButton.addEventListener('click', (e) => {
            // Send event parent node to delete from html 
                // Send id to delete from storage
            deleteEntry(e.target.parentNode, id)
        })
        newListItem.appendChild(deleteButton)

        document.getElementById("list").appendChild(newListItem)
    }

    // Store list in cookie
    createCookie("saved-list", listData.listEntries)
}

/*const getDate = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();

    let month = months[d.getMonth()];
    let day = d.getDay()
    let year = d.getFullYear()

    document.getElementById('header').textContent = month + ' ' + day + ', ' + year;

}*/

// Create cookie
const createCookie = (key, value) => {
    const cookie = 
        key 
        + "=" 
        + JSON.stringify(value) 
        +";max-age=86400;" // Stored for 1 day
    ;
    
    document.cookie = cookie;

    /*console.log(
        "New cookie with key: " 
        + key 
        + " value: " 
        + value 
        + ";max-age=86400;"
    );*/
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

window.onload = () => {
    var deleteSavedListEle = document.createElement('button')
    deleteSavedListEle.textContent = 'clear list'
    deleteSavedListEle.addEventListener('click', ()=>{
        // Clears cookie and page
        deleteCookie('saved-list')
        listData.listEntries = []
        displayList()
    })

    document.getElementsByClassName('main')[0].appendChild(deleteSavedListEle)

    // Get saved
    if (readCookie("saved-list") && JSON.parse(readCookie("saved-list").length > 0)){
        listData.listEntries = JSON.parse(readCookie("saved-list"))

        console.log(JSON.parse(readCookie("saved-list")))
    }

    displayList()
}


