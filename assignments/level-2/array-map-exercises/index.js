// 1
function doubleNumbers(arr){
    return arr.map(item => item * 2)
}

console.log(doubleNumbers([2, 5, 100])); // [4, 10, 200]

// 2
function stringItUp(arr){
    return arr.map(item => String(item))
}

console.log(stringItUp([2, 5, 100])); // ["2", "5", "100"]

// 3
function capitalizeNames(arr){
    return arr.map( item => {
        var arr = []

        for (var x = 0; x < item.length; x++){
            if (x === 0){
                arr.push(String(item[x]).toUpperCase())
            } else {
                arr.push(String(item[x]).toLowerCase())
            }
        }
        
        return arr.join('')
    })
}

console.log(capitalizeNames(["john", "JACOB", "jinGleHeimer", "schmidt"])); 

// 4
function namesOnly(arr){
    return arr.map(item => {
        return item.name
    })
}

console.log(namesOnly([
    {
        name: "Angelina Jolie",
        age: 80
    },
    {
        name: "Eric Jones",
        age: 2
    },
    {
        name: "Paris Hilton",
        age: 5
    },
    {
        name: "Kayne West",
        age: 16
    },
    {
        name: "Bob Ziroll",
        age: 100
    }
]));

// 5
function makeStrings(arr){
    return arr.map(item => {
        if (item.age < 18){
            return item.name + ' is under age!!'
        } else {
            return item.name + ' can go to The Matrix'
        }
    })
}
  
console.log(makeStrings([
    {
        name: "Angelina Jolie",
        age: 80
    },
    {
        name: "Eric Jones",
        age: 2
    },
    {
        name: "Paris Hilton",
        age: 5
    },
    {
        name: "Kayne West",
        age: 16
    },
    {
        name: "Bob Ziroll",
        age: 100
    }
]));