var formName = document.getElementsByName('travel-form')

var firstName = document.getElementById('first-name-input')
var lastName = document.getElementById('last-name-input')
var age = document.getElementById('age-input')
var gender = document.getElementsByName('gender')
var locationEle = document.getElementById('location-input')
let diets = document.getElementsByName('diet');

var submitBtn = document.getElementById('submit-btn')

formName[0].addEventListener('submit', e => {
    // Get gender value
    var genderText = gender[0].checked === true ? 'male': gender[1].checked ? 'female' : ''
    
    // Check for checked diet elements
    var dietText = 'N/A', dietCount = 0
    diets.forEach((diet) => {
        if (diet.checked) {
            if (dietCount > 0){
                dietText = dietText + ', ' + String(diet.value)
            } else {
                dietText = String(diet.value)
            }
            dietCount++
        }
    })

    alert(
        'First name: ' + firstName.value
        + '\nLast name: ' + lastName.value
        + '\nAge: ' + age.value
        + '\nGender: ' + genderText
        + '\nLocation: ' + locationEle.value
        + '\nDietary Restrictions: ' + dietText
    )
    e.preventDefault()
})