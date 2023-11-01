// Preliminary 1
var prelim = [0,1,2,3,4,5,6,7,8,9]
console.log('Preliminary 1:')
for (var i = 0; i < prelim.length; i++){
    console.log(i)
}

// Prelininary 2
console.log('Preliminary 2:')
for (var j = prelim.length - 1; j >= 0; j--){
    console.log(j)
}

// Preliminary 3
console.log('Preliminary 3:')
const fruit = ["banana", "orange", "apple", "kiwi"]
for (var k = 0; k < fruit.length; k++){
    console.log(fruit[k])
}

// Bronze 1
var bronze1 = []
for(var l = 0; l <= 9; l++){
    bronze1.push(l)
}
console.log('Bronze 1: ', bronze1)

// Bronze 2
var bronze2 = []
for(var m = 0; m <= 100; m++){
    bronze2.push(m)
}
console.log('Bronze 2: ', bronze2)

// Bronze 3
const bronze3 = []
const fruit2 = ["banana", "orange", "apple", "kiwi", "pear", "peach"]
for (var n = 0; n < fruit2.length; n++){
    if (n % 2){
        bronze3.push(fruit2[n])
    }
}
console.log('Bronze 3: ', bronze3)

// Silver 1
const peopleArray = [
    {
        name: "Harrison Ford",
        occupation: "Actor"
    },
    {
        name: "Justin Bieber",
        occupation: "Singer"
    },
    {
        name: "Vladimir Putin",
        occupation: "Politician"
    },
    {
        name: "Oprah",
        occupation: "Entertainer"
    }
]
for (var o = 0; o < peopleArray.length; o++){
    console.log(peopleArray[o].name)
}
  
// Silver 2
var silverNames = []
var silverOccupations = []

for (var p = 0; p < peopleArray.length; p++){
    silverNames.push(peopleArray[p].name)
    silverOccupations.push(peopleArray[p].occupation)
}

var silverArr = []
for (var p = 0; p < peopleArray.length - 1; p++){
    silverArr.push(peopleArray[p].name)
    silverArr.push(peopleArray[p + 1].occupation)

}
console.log('Silver: ', silverNames, silverOccupations)
console.log(silverArr)

// Gold
var goldArr1 = []
for (var q = 0; q < 3; q++){
    var newArr = []
    for (var r = 0; r < 3; r++){
        newArr.push(0)
    }
    goldArr1.push(newArr)
}
var goldArr2 = []
for (var s = 0; s < 3; s++){
    var newArr2 = []
    for (var t = 0; t < 3; t++){
        newArr2.push(s)
    }
    goldArr2.push(newArr2)
}
var goldArr3 = []
for (var u = 0; u < 3; u++){
    var newArr3 = []
    for (var v = 0; v < 3; v++){
        newArr3.push(v)
    }
    goldArr3.push(newArr3)
}
console.log('Gold 1: ', goldArr1)
console.log('Gold 2: ', goldArr2)
console.log('Gold 3: ', goldArr3)

var nestedArr = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]
for (var x = 0; x < nestedArr.length; x++){
    for (var y = 0; y < nestedArr[x].length; y++){
        nestedArr[x][y] = 'x'
    }
}
console.log('nestedArr: ', nestedArr)