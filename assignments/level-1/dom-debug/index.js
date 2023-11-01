const colors = ["red", "blue", "green"]

document.getElementById("add").addEventListener("click", function(e){
    const subItem = createSubItem(e)
    document.getElementById("list").appendChild(subItem)
})

function createDropDown(){
    const dropDown = document.createElement("select")

    for (let i = 0; i < colors.length; i++){
        const option = document.createElement("option") 
        option.innerHTML = colors[i]
        option.value = colors[i]
        dropDown.append(option)
    }

    dropDown.addEventListener("change", function(e){
        e.target.parentNode.style.backgroundColor = e.target.value
    })
    
    return dropDown
}

function createSubItem(e){
    const subItem = document.createElement("div")
    var subItemValue = document.getElementById("input")

    subItem.textContent = subItemValue.value + ' '

    const dropDown = createDropDown()

    subItem.appendChild(dropDown)
    subItem.setAttribute("class", "subItem")
    
    // Stying for for first subitem and visibility
    subItem.style.backgroundColor = dropDown.childNodes[0].value
    subItem.style.color = 'white'
    subItem.style.padding = '7px'

    subItem.style.fontSize = '24px'

    return subItem
}
