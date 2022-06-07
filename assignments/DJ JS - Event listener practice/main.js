var colors = {
    blue: 'blue',
    red: 'red',
    yellow: 'yellow',
    green: 'green',
    orange: 'orange',
}

// Function to check if the mouse is hovering a chosen element
const hovered = (e) => {
    return e.parentElement.querySelector(':hover') === e; 
}

function start(){
    // Set variables for square and window elements
    var squareEle = document.getElementById('square')
    var windowEle = document.getElementById('app')
    
    // Set defult color to square
    squareEle.style.backgroundColor = 'orange';

    // Add event listeners to update colors
    squareEle.addEventListener('mousedown', function(){
        squareEle.style.backgroundColor = colors.red;
    })
    squareEle.addEventListener('mouseup', function(){
        squareEle.style.backgroundColor = colors.yellow;
    }) 
    squareEle.addEventListener('dblclick', function(){
        squareEle.style.backgroundColor = colors.green;
    }) 
    document.addEventListener('mousemove', function checkHover() {
        const squareHover = hovered(squareEle);
        const windowHover = hovered(windowEle);

        // Set color to blue if square is hovered
        if (windowHover && squareHover) {
            squareEle.style.backgroundColor = colors.blue;
        }
        // Set color to orange if square is not being hovered
        if (windowHover && !squareHover){
            squareEle.style.backgroundColor = colors.orange;
        }
      });
}

// Runs start function when page loads
window.onload = start()