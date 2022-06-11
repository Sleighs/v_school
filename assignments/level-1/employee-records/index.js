
var employees = []

function Employee(name, jobTitle, salary) {
    this.name = name;
    this.jobTitle = jobTitle;
    this.salary = salary;
    this.status = 'Full Time';
}

// Create new employees
var gary = new Employee('Gary Johnston', 'Broadway Actor', 90000)
var hannah = new Employee('Hannah McKay', 'Botanist', 125000)
var peter = new Employee('Peter Quinn', 'Officer', 180000)

// Change status
peter.status = 'Contract'

// Send to 'eployees' array
employees.push(gary, hannah, peter)

// Add method
gary.printEmployeeForm =  function() {
    console.log(this)
}
hannah.printEmployeeForm =  function() {
    console.log(this)
}
peter.printEmployeeForm =  function() {
    console.log(this)
}

// Print form
gary.printEmployeeForm()
hannah.printEmployeeForm()
peter.printEmployeeForm()

//console.log(employees)