// 1 - Rest operator
function collectAnimals(...animals) {
    var arr = []

    for (var z = 0; z < animals.length; z++){
        arr.push(animals[z])
    }

    return arr
}

collectAnimals("dog", "cat", "mouse", "jackolope", "platypus");
// ["dog", "cat", "mouse", "jackolope", "platypus"]
console.log(collectAnimals("dog", "cat", "mouse", "jackolope", "platypus"))

// 2
function combineFruit(fruit, sweets, vegetables){
    return {
        fruit: fruit,
        sweets: sweets,
        vegetables: vegetables
    }
}

console.log(
    combineFruit(
        ["apple", "pear"],
        ["cake", "pie"],
        ["carrot"]
    )
)
/*=> {
        fruit: ["apple", "pear"],
        sweets: ["cake", "pie"],
        vegetables: ["carrot"]
     }
*/

// 3 - Destructuring
function returnFirst(items){
    const [firstItem] = items;
    return firstItem
}

console.log(returnFirst([1,2,3]))

// 4
const favoriteActivities = ["magnets", "snowboarding", "philanthropy", "janitor work", "eating"];

function returnFavorites(arr){
    const [firstFav, secondFav, thirdFav] = arr 
    /*your code here*/
    return "My top three favorite activities are " + firstFav + ", " + secondFav + ", and " + thirdFav + "."
}

console.log(
    returnFavorites(favoriteActivities)
)

// 5 - Flatten arrays
function combineAnimals(...arrays) {
    return arrays.reduce((newArr, item) => {
        for (var x = 0; x < item.length; x++){
            newArr.push(item[x])
        }
        return newArr
    })
}

const realAnimals = ["dog", "cat", "mouse"];
const magicalAnimals = ["jackolope"];
const mysteriousAnimals = ["platypus"];

console.log(
    combineAnimals(realAnimals, magicalAnimals, mysteriousAnimals)
)
// ["dog", "cat", "mouse", "jackolope", "platypus"]

// 6 
function product(...args) {
    var [...numbers] = args;
  
    return numbers.reduce((acc, number) => {
      return acc * number;
    }, 1)
}

console.log(
    product(1,4,5,7,8)
)

// 7 
function unshift(array, ...args) {
    return [...args].concat(array);
}
  
console.log(unshift([1,3,5],2,4,6))

// 8
function populatePeople(names){
    return names.map(function(name){
        name = name.split(" ");
        
        const [firstName, lastName] = name

        return {
            firstName: firstName,
            lastName: lastName
        }
    })
}
console.log(
    populatePeople(["Frank Peterson", "Suzy Degual", "Liza Jones"])
)
//[
//  {firstName: "Frank", lastName: "Peterson"},
//  {firstName: "Suzy", lastName: "Degual"},
//  {firstName: "Liza", lastName: "Jones"},
//]