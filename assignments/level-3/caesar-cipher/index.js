const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

function cipher(phrase, num){
    var arr = []
    
    for (var a = 0; a < phrase.length; a++){
        if (phrase[a] == ' '){
            arr.push(' ')
        } else {
            var index = alphabet.findIndex(ele => ele === phrase[a])
            if (a + index > alphabet){
                arr.push((a + index) - 26)
            } else {
                arr.push(alphabet[index + num])
            }
        }
    }

    return arr.join('')
}

var readline = require('readline-sync');
var input = readline.question('What phrase would you like to encrypt? ').toLowerCase();
var shift = parseInt(readline.question('How many letters would you like to shift? '));

console.log(cipher(input, shift))