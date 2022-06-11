// #1
var officeItems = ["stapler", "monitor", "computer", "desk", "lamp", "computer", "lamp", "stapler", "computer",  "computer"]
var computerCount = 0;
officeItems.forEach(item => {
    if (item === 'computer'){
        computerCount++
    }
})
console.log('computer ' + computerCount)
console.log('')

// #2
var peopleWhoWantToSeeMadMaxFuryRoad = [
    {
      name: "Mike",
      age: 12,
      gender: "male"
    },{
      name: "Madeline",
      age: 80,
      gender: "female"
    },{
      name: "Cheryl",
      age: 22,
      gender: "female"
    },{
      name: "Sam",
      age: 30,
      gender: "male"
    },{
      name: "Suzy",
      age: 4,
      gender: "female"
    }
  ]

peopleWhoWantToSeeMadMaxFuryRoad.forEach(item => {
    if (item.age < 18){
        console.log(item.name + ' is not old enough. ' + (item.gender === 'female' ? 'She' : 'He') + ' can enter.')
    } else {
        console.log(item.name + ' is old enough. Don\'t let ' + (item.gender === 'female' ? 'her' : 'him') + ' in.')
    }
})
  
var switchPresses = [2, 3, 2]
var light = false
var lightCount = 0

switchPresses.forEach(item => {
    for (var x = 0; x < item; x++){
    if (light === false){
        light = true
    } else {
        light = false
    }
    lightCount++
    }
})
console.log('')
console.log('The light is ' + (!light ? 'off' : 'on') + '. The light changed ' + lightCount + ' times')
