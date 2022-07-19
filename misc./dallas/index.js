var testId = 'ab73'

function test1(a) {
    this.testId = 'new id'
}
var newTest = new test1()

console.log(newTest)