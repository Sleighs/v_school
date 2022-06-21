function getNumberOfVowels(str) { 
    // insert code here
    var vowels = ['a', 'e', 'i', 'o', 'u']
    var count = 0; 
    var newArr = str.split('')

    newArr.forEach(item => {
        // if item exists in vowels 
        for (var a = 0; a < vowels.length; a++){
            if (item === vowels[a]){
                count++
            }
        }
    })

    return count

 }
 console.log(getNumberOfVowels("hello world")) // 3
 console.log(getNumberOfVowels("fishing")) // 2



 let names = [ "Jerry", "Adam" ]
 const person = { firstName: "Robert", lastName: "Jones", age: 37 }

names.push(person.firstName)


