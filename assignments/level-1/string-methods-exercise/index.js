// 1
function capilizeAndLowercase(letters){
    return letters.toUpperCase() + letters.toLowerCase()
}
console.log(capilizeAndLowercase('HelLo'))

// 2
function findMiddleIndex(string){
    return Math.floor(string.length / 2)
}
console.log(findMiddleIndex('Hello'))
console.log(findMiddleIndex('Hello world'))

// 3
function returnFirstHalf(phrase){
    return phrase.slice(0, Math.floor(phrase.length / 2))
}
console.log(returnFirstHalf('Pizzas'))

// 4
function capilizeAndLowercase2(string){
    var half = Math.floor(string.length / 2)
    var arr = []

    for (var a = 0; a < half; a++){
        if (string[a] === ' '){
            arr.push(' ')
        } else {
            arr.push(string[a].toUpperCase())
        }
    }

    for (var b = half; b < string.length; b++){
        if (string[b] === ' '){
            arr.push(' ')
        } else {
            arr.push(string[b].toLowerCase())
        }
    }
    return arr.join('')
}
console.log(capilizeAndLowercase2('Maple tree'))

// 5
function capitalize(phrase){
    var arr = phrase.split(' ')
    var newArr = []

    for (var i = 0; i < arr.length; i++){
        var word = []

        word.push(arr[i][0].toUpperCase())

        for (var j = 1; j < arr[i].length; j++){
            word.push(arr[i][j])
        }

        newArr.push(word.join(''))
    }

    return newArr.join(' ')
}

console.log(capitalize('hey friends! practice practice practice!'))