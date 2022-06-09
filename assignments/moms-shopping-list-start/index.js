/////////////////////////
// Mom's Shopping List //
/////////////////////////

// Add date to header
/*const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();

let month = months[d.getMonth()];
let day = d.getDay()
let year = d.getFullYear()

document.getElementById('header').textContent = month + ' ' + day + ', ' + year;
*/


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
    // Remove parent node to delete item
    node.remove()

    var newArr = []

    // Populate new array, excluding deleted item
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

const editEntry = (e) => {
    console.log('edit', e)
}

const displayList = () => {
    // Clear old list from page
    var listElements = document.getElementsByClassName('list-item');

    while (listElements.length > 0){
        listElements[0].parentNode.removeChild(listElements[0]);
    }

    // Get list data
    for (var i = 0; i < listData.listEntries.length; i++){
        var id = listData.listEntries[i][0]
        var text = listData.listEntries[i][1]

        // Create li element
        var newListItem = document.createElement("li")
        newListItem.setAttribute("class", "list-item")

        // Add id to element
        //newListItem.setAttribute("data", String(id))

        // Add input text to li element 
        const itemText = document.createElement("div")
        itemText.innerHTML = text
        newListItem.appendChild(itemText)

        // Create edit button and add to li element
        const editButton = document.createElement("button")
        editButton.textContent = 'edit'
        editButton.setAttribute("class", "edit-button")
        editButton.addEventListener('click', (e, id) => {
            editEntry(id)
        })
        newListItem.appendChild(editButton)

        // Create delete button and add to li element
        const deleteButton = document.createElement("button")
        deleteButton.textContent = 'X'
        deleteButton.setAttribute("class", "delete-button")
        deleteButton.addEventListener('click', (e) => {
            deleteEntry(e.target.parentNode, id)
        })
        newListItem.appendChild(deleteButton)

        // Add color change option
        /*const dropDown = createDropDown()
        newItem.appendChild(dropDown)*/

        document.getElementById("list").appendChild(newListItem)
    }
}