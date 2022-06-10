var fruit = ["banana", "apple", "orange", "watermelon"];
var vegetables = ["carrot", "tomato", "pepper", "lettuce"];

// 1
vegetables.pop()

//2
fruit.splice(0, 1)

// 3 + 4
var orangeIndex;
fruit.forEach((item, i) => {
    if (item ==='orange'){
        orangeIndex = i;
        fruit.push(i)
    }
})

// 5
var vegLength = vegetables.length

// 6
vegetables.push(vegetables.length)

// 7
var food = fruit.concat(vegetables)

// 8
food.splice(4, 2)

// 9
food.reverse()

// 10
food = String(food)

console.log("fruit: ", fruit);
console.log("vegetables: ", vegetables);
console.log("food: ", food);