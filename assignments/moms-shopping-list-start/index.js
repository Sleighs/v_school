/////////////////////////
// Mom's Shopping List //
/////////////////////////


// A place to store list data
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
        // Get id and text of entry
        var id = listData.listEntries[i][0]
        var text = listData.listEntries[i][1]

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
            // Replace list text with input and button
            console.log(e.target)

            // remove text
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

        // Add color change option

        document.getElementById("list").appendChild(newListItem)
    }
}

// Add date functionality
/*const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();

let month = months[d.getMonth()];
let day = d.getDay()
let year = d.getFullYear()

document.getElementById('header').textContent = month + ' ' + day + ', ' + year;
*/