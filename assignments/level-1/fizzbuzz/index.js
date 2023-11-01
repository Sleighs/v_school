function fizzBuzz(){
    var storage = {
        fizz: 0,
        buzz: 0,
        fizzbuzz: 0,
    }

    for (var a = 1; a <= 100; a++){
        // If both divisible by 3 and 5 log 'fizzbuzz'
        if ((a % 3 === 0) && (a % 5 === 0)){
            storage.fizzbuzz++
            console.log('fizzbuzz')
        } else 
        // If only divisible by 3 log 'fizz'
        if (a % 3 === 0 && a % 5 !== 0){
            storage.fizz++
            console.log('fizz')
        } else 
        // If only divisible by 5 log 'buzz'
        if (a % 5 === 0 && a % 3 !== 0){
            storage.buzz++
            console.log('buzz')
        }
        // If a is divisible by neither log number
        else  {
            console.log(a)
        }
    }
    console.log(storage)
}

console.log(fizzBuzz())