// write a function (oneWordOnly) that takes an array of strings, and 
// returns an array of just the strings with one word in them

function oneWordOnly(words){
    return words.filter(item => {
        var noSpace = true

        for (var a = 0; a < item.length; a++){
            if (item[a] === ' '){
                noSpace = false
            }
        }

        return noSpace
    })
}


console.log(oneWordOnly(["bird", "bird dog", "humming bird", "dog"])) //=>["bird", "dog"]
console.log(oneWordOnly(["house", "tiny mansion", "humming bird", "fish", "word"])) //=>["house", "fish", "word"]