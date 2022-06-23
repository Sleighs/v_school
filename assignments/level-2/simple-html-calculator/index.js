var addForm = document.getElementsByName("add-calc")
var subtractForm = document.getElementsByName("subtract-calc")
var multiplyForm = document.getElementsByName("multiply-calc")
var addSolution = document.getElementById("add-solution")
var subtractSolution = document.getElementById("subtract-solution")
var multiplySolution = document.getElementById("multiply-solution")

addForm[0].addEventListener('submit', e => {
    var num1 = document.getElementById('add-num1')
    var num2 = document.getElementById('add-num2')

    addSolution.innerText = Number(num1.value) + Number(num2.value)

    e.preventDefault()
})
subtractForm[0].addEventListener('submit', e => {
    var num1 = document.getElementById('subtract-num1')
    var num2 = document.getElementById('subtract-num2')

    subtractSolution.innerText = Number(num1.value) - Number(num2.value)

    e.preventDefault()
})
multiplyForm[0].addEventListener('submit', e => {
    var num1 = document.getElementById('multiply-num1')
    var num2 = document.getElementById('multiply-num2')

    multiplySolution.innerText = Number(num1.value) * Number(num2.value)

    e.preventDefault()
})