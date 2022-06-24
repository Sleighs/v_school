// Integer check
function sum(x, y){
    //console.log('x', Number.isInteger(x), 'y', Number.isInteger(y))
    try {
        if (Number.isInteger(x) === false || Number.isInteger(y) === false){
            throw "Please try again"
        } else {
            return (x + y)
        }
      } catch(err) {
        console.log(err);
      }
}

console.log('sum try 1: ', sum(1, 2))
console.log('sum try 2: ', sum('paul', '453sdu'))
console.log('')

// Login check
var user = {username: "sam", password: "123abc"};

function login(username, password){
    try {
        if (username !== user.username || password !== user.password){
            throw 'username or password does not match'
        } else {
            return 'login successful!'
        }
    } catch(err) {
        console.log(err);
    }
}

console.log('login try 1: ', login('sam', '123abc'))
console.log('login try 2: ', login('paul', '453sdu'))