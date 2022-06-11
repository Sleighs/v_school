var people = ["Jon", "Jacob", "Jingle", "Heimer", "Schmidt"]
var alphabet = "abcdefghijklmnopqrstuvwxyz"


function forception(people, alphabet){
    var arr = []
    for (var a = 0; a < people.length; a++){
        //push name to array 
        arr.push(people[a] + ':')
        for (var b = 0; b < alphabet.length; b++){
            arr.push(alphabet[b].toUpperCase())
        }
    }
    return arr
}

console.log(forception(people, alphabet))