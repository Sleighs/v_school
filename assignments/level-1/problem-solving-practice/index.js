// Problem 1
function largest(arr){
    var highest = 0;

    if (arr.length === 1){
        highest = arr[0]
    } else if (arr.length < 1){
        console.log('no numbers exist')
        return
    }
    arr.forEach(item => {
        if (item > highest){
            highest = item
        }
    })

    return highest
}

console.log('Problem 1: ', largest([3, 5, 2, 8, 1]))

// Problem 2
function lettersWithStrings(arr, char){
    var newArr = []

    arr.forEach(item => {
        var strArr = item.split('')

        for (var a = 0; a < strArr.length; a++){
            if (strArr[a] === char){
                newArr.push(item)
                a = strArr.length
            }
        }
    })

    return newArr
}
console.log('Problem 2:', lettersWithStrings(["#3", "$$$", "C%4!", "Hey!"], "!"))

// Problem 3
function isDivisible(dividend, divisor){
    if (dividend % divisor === 0){
        return true
    } else {
        return false
    }
}

console.log(
    'Problem 3:',
    isDivisible(4, 2),
    isDivisible(9, 3), 
    isDivisible(15, 4)
)