var peopleArray = [
    {
        firstName: "Sarah",
        lastName: "Palin",
        age: 47
    },
    {
        firstName: "Frank",
        lastName: "Zappa",
        age: 12
    },
    {
        firstName: "Rick",
        lastName: "Sanchez",
        age: 78
    },
    {
        firstName: "Morty",
        lastName: "Smith",
        age: 29
    },
    {
        firstName: "Kyle",
        lastName: "Mooney",
        age: 27
    },
    {
        firstName: "Pasha",
        lastName: "Datsyuk",
        age: 13
    },
    {
        firstName: "Lev",
        lastName: "Tolstoy",
        age: 82
    }
]

function sortedOfAge(arr){
    // First, filter out age
    return arr.filter(item => {
        if (item.age >= 18){
           return item
        } 

    })
    // Second, sort by last name
    .sort((a, b) => {
        if (a === b) {
            return 0;
        }
        return a.lastName < b.lastName ? -1 : 1;
    })
    // Third, log each item
    .map(item => {
        return "<li>" + item.firstName + " " + item.lastName+ " is " + item.age + "</li>"
    })
}
 
console.log(sortedOfAge(peopleArray));