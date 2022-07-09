
const people = [ "John", "Adam", "Amber" ]

//Expected Output: [ "<h1>John</h1>", "<h1>Adam</h1>", "<h1>Bill</h1>" ]

function peopleElements(arr){
    return arr.map( item => "<h1>" + item + "</h1>")
}


console.log(peopleElements(people))
