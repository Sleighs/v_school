  //////////////////////////
 /// Axios Todo Project ///
//////////////////////////

// A place to store the app's data
var listData = {

}

// Add listener to button
document.getElementsByName("addItem")[0].addEventListener("submit", function(e){
    // Create new list item
    createListItem()

    // Prevent page refresh
    e.preventDefault()
})

const createListItem = () => {
    // Get input text element
    var title = document.getElementById("title-input")
    var description = document.getElementById("description-input")
    var imageUrl = document.getElementById("image-url-input")
    var price = document.getElementById("price-input")

    var newTodo = {
        title: title.value, // required
        description: description.value,
        price: price.value, 
        imgUrl: imageUrl.value,
        completed: false,
    };

    if (title.value === null || title.value == '') {
        console.log('title required!')
    } else {
        axios.post('https://api.vschool.io/samuelwright/todo', newTodo)
            .then(function(res){
                getListData()
            })
            .catch(error => console.log(error))
    }
}


const deleteEntry = (id) => {
    axios.delete('https://api.vschool.io/samuelwright/todo/' + id)
        .then(function(res){
            getListData()
        })
}

const editEntry = (id, updatedItem) => {
    axios.put('https://api.vschool.io/samuelwright/todo/' + id, updatedItem)
        .then(function(res){
            getListData()
        })
}

const displayList = () => {
    // Clear old list from page
    var listElements = document.getElementsByClassName('list-item');

    while (listElements.length > 0){
        listElements[0].parentNode.removeChild(listElements[0]);
    }

    // Display list data
    for (var i = 0; i < listData.apiData.length; i++){
        let id = listData.apiData[i]._id
        let title = listData.apiData[i].title
        let description = listData.apiData[i].description
        let imageUrl = listData.apiData[i].imgUrl
        let completed = listData.apiData[i].completed
        let price = listData.apiData[i].price
        
        //console.log('item ' + i + ':', id)

        // Create li element
        var newListItem = document.createElement("li")
        newListItem.setAttribute("class", "list-item")
        newListItem.setAttribute("data-id", id)

        // Create containers
        var listItemTitle = document.createElement("div")
        listItemTitle.setAttribute("class", "list-item__top")
        var listItemDes = document.createElement("div")
        listItemDes.setAttribute("class", "list-item__des")
        var listItemBtns = document.createElement("div")
        listItemBtns.setAttribute("class", "list-item__btns")

        var checkbox = completed

        //  Create checkbox element
        var completedEle = document.createElement("div")
        var completedCheckbox = document.createElement("input")
        completedEle.setAttribute("class", "completed-container")
        completedCheckbox.setAttribute("class", "completed-checkbox")
        completedCheckbox.type = 'checkbox'
        completedCheckbox.checked = completed
        completedCheckbox.addEventListener('change', event => {
            editEntry(id, {
                title: title,
                description: description,
                imgUrl: imageUrl,
                completed: event.target.checked,
            })
        })
        completedEle.appendChild(completedCheckbox)
        listItemTitle.appendChild(completedEle)

        // Add title, description and image elements to li element 
        const itemTitle = document.createElement("div")
        itemTitle.innerHTML = title
        itemTitle.setAttribute("class", "input-title")
            // If completed add strike though
        if (completed){
            itemTitle.style.textDecoration = 'line-through'
        }
        listItemTitle.appendChild(itemTitle)

        // Price element
        const itemPrice = document.createElement("div")
        itemPrice.innerText = '$' + price
        itemPrice.setAttribute("class", "input-price")
        
        if (price !== null && price > 0){
            listItemTitle.appendChild(itemPrice)
        }

        // Description element
        const itemDes = document.createElement("div")
        itemDes.innerHTML = description
        itemDes.setAttribute("class", "input-description")
        listItemTitle.appendChild(itemDes)

        // Image element
        const itemImgContainer = document.createElement("div")
        itemImgContainer.setAttribute("class", "input-image__container")
        const itemImg = document.createElement("img")
        itemImg.src = imageUrl
        itemImg.setAttribute("class", "input-image")
        itemImgContainer.appendChild(itemImg)

        // Create edit and delete button
        const editButton = document.createElement("button")
        const deleteButton = document.createElement("button")

        // Edit button
        editButton.textContent = 'Edit'
        editButton.setAttribute("class", "edit-button")
        editButton.addEventListener('click', (e) => {
            var listEleToEdit = document.querySelectorAll('[data-id ="' + id + '"]');

            // Clears out previous elements
            while (listEleToEdit[0].childNodes.length > 0){
                listEleToEdit[0].removeChild(listEleToEdit[0].childNodes[0]);
            }

            var editTitle = title
            var editDes = description
            var editImageUrl = imageUrl
            var editPrice = price

            // Add title input element
            var editTitleEle = document.createElement('input')
            editTitleEle.placeholder = 'Title'
            editTitleEle.classList.add('input')
            editTitleEle.value = title
            editTitleEle.addEventListener('change', event => {
                editTitle = event.target.value
            })
            // Add description input element
            var editDescriptionEle = document.createElement('input')
            editDescriptionEle.placeholder = 'Description'
            editDescriptionEle.classList.add('input')
            editDescriptionEle.value = description
            editDescriptionEle.addEventListener('change', event => {
                editDes = event.target.value
            })
            // Add image input element
            var editImageUrlEle = document.createElement('input')
            editImageUrlEle.placeholder = 'Image Url'
            editImageUrlEle.classList.add('input')
            editImageUrlEle.value = imageUrl
            editImageUrlEle.addEventListener('change', event => {
                editImageUrl = event.target.value
            })
            // Add price input element
            var editPriceEle = document.createElement('input')
            editPriceEle.placeholder = 'Price'
            editPriceEle.classList.add('input')
            editPriceEle.value = price
            editPriceEle.addEventListener('change', event => {
                editPrice = event.target.value
            })
            
            // Add elements to list element
            listEleToEdit[0].appendChild(editTitleEle)
            listEleToEdit[0].appendChild(editDescriptionEle)
            listEleToEdit[0].appendChild(editImageUrlEle)
            listEleToEdit[0].appendChild(editPriceEle)

            // Create and add Save button
            var submitEle = document.createElement('button')
            submitEle.textContent = 'Save'
            listEleToEdit[0].appendChild(submitEle)

            // Add listener to button
            submitEle.addEventListener('click', (e) => {
                editEntry(id, {
                    title: editTitle,
                    description: editDes,
                    imgUrl: editImageUrl,
                    price: editPrice,
                    completed: checkbox,
                })
            })
        })
        listItemBtns.appendChild(editButton)
        
        // Delete button
        deleteButton.textContent = 'Delete'
        deleteButton.setAttribute("class", "delete-button")
        deleteButton.addEventListener('click', (e) => {
            // Send event parent node to delete from html 
                // Send id to delete from storage
            deleteEntry(id)
        })
        listItemBtns.appendChild(deleteButton)

        newListItem.appendChild(itemImgContainer)
        newListItem.appendChild(listItemTitle)
        //newListItem.appendChild(listItemDes)
        newListItem.appendChild(listItemBtns)

        document.getElementById("list").appendChild(newListItem)
    }
}

/*const getDate = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();

    let month = months[d.getMonth()];
    let day = d.getDay()
    let year = d.getFullYear()

    document.getElementById('header').textContent = month + ' ' + day + ', ' + year;

}*/

// Get all todos
async function getListData() {
    try {
        const response = await axios.get('https://api.vschool.io/samuelwright/todo');
        listData.apiData = response.data
        displayList()
    } catch (error) {
        console.error(error);
    }
}

//window.onload = () => {
    getListData()
//}
