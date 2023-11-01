const readline = require("readline-sync")

var type, number1, number2;

number1 = readline.question('Please enter your first number ');
number2 = readline.question('Please enter your second number ');
type = readline.question('Please enter the operation to perform: (add, sub, mul, div)')

function add(num1, num2){
    return  Number(num1) + Number(num2)
}
function sub(num1, num2){
    return  Number(num1) - Number(num2)
}
function mul(num1, num2){
    return  Number(num1) * Number(num2)
}
function div(num1, num2){
    return  Number(num1) / Number(num2)
}

if (type === 'add'){
    console.log('The result is: ' + add(number1, number2))
} else if (type === 'sub'){
    console.log('The result is: ' + sub(number1, number2))
} else if (type === 'mul'){
    console.log('The result is: ' + mul(number1, number2))
} else if (type === 'div'){
    console.log('The result is: ' + div(number1, number2))
} else {
    console.log('Try again')
}
