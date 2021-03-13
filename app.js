const db = require("./db");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const mysql = require("mysql");
const sqlStatements = require("./db/index.js");
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

function startingPrompt() {
    inquirer
        .prompt({
            message: "What would you like to do?",
            name: "action",
            type: "list",
            choices: [
                "VIEW_DEPARTMENT",
                "VIEW_ROLE",
                "VIEW_EMPLOYEE",
                "CREATE_ROLE",
                "CREATE_DEPARTMENT",
                "CREATE_EMPLOYEE",
                "UPDATE_EMPLOYEE_ROLES",
                "DELETE_EMPLOYEE",
                "QUIT"
            ]

        })
        .then((res) => {

            switch (res.action) {
                case "VIEW_DEPARTMENT":
                    viewDepartment();
                    break;                

                case "VIEW_ROLE":
                    viewRole()
                    break;

                case "VIEW_EMPLOYEE":
                    viewEmployee()
                    break;

                    case "CREATE_ROLE":
                    createRole();
                    break;
                case "CREATE_DEPARTMENT":
                    createDepartment();
                    break;

                case "CREATE_EMPLOYEE":
                    createEmployee();
                    break;
                case "UPDATE_EMPLOYEE_ROLES":
                    updateEmployeeRoles();
                    break;
                case "DELETE_EMPLOYEE":
                    deleteEmployee();
                    break;

                default:
               connection.end();
            }

        })
}

function viewDepartment () {

    db.viewDepartment()
    .then((results) => {
        console.table(results);
        startingPrompt()
    });

};

function viewRole(){
    db.viewRole()
    .then((results) => {
        console.table(results);
        startingPrompt();
    });
};

function viewEmployee(){
    db.viewEmployee()
    .then((results) => {
        console.table(results);
        startingPrompt();
    });
};

function createDepartment() {
    inquirer
        .prompt({
            name: "department_name",
            type: "input",
            message: "What is the name of the department?",
        })
        .then(response => {
            db.createDepartment(response);
            startingPrompt();
        })
}

function createRole() {
    db.viewDepartment()
    .then((department) => {
        const departmentChoices = department.map((department) => ({
            value: department.id,
            name: department.department_name
        }))
        inquirer.prompt([
            {
                message: "What department is this role for?",
                type: "list",
                name: "department_id",
                choices: departmentChoices

            },
            {
                message: "What is the salary for this position?",
                type: "number",
                name: "salary"
            },
            {
                message: "What role will this employee fulfill?",
                type: "input",
                name: "title"
            }
        ]).then(res => {
            // console.table(res);
            console.log(res);
            sqlStatements.createRole(res);
            startingPrompt();
        })
    })
}

function createEmployee(){

    db.viewRole()
    .then((role) => {
        const roleChoices = role.map((roles) => ({
            value: roles.id,
            name: roles.title
        }))
        inquirer.prompt([
            {
                message: "What is the employee's first name?",
                type: "input",
                name: "first_name"
            },
            {
                message: "What is the employee's last name?",
                type: "input",
                name: "last_name"
            },
            {
                message: "What is the role of this employee?",
                type: "list",
                name: "role_id",
                choices: roleChoices
            }
        ]).then(res => {
            console.log(res);
            console.log(roleChoices);
            sqlStatements.createEmployee(res);
            startingPrompt();
        })
    })
};

async function updateEmployeeRoles() {
    var userInput= await inquirer.prompt([{
        type:"input",
        message:"what is the employee id?",
        name:"employee_id"
    },{
        type:"input",
        message:"enter the new role id!",
        name:"new_role"
    }])
    results =await query("update employee set role_id = ? where id =?",[userInput.new_role, userInput.employee_id])
    console.log("update")
    viewEmployee()
}

function deleteEmployee(id, last_name) {
    db.viewEmployee()
    .then((employees) => {

            console.table(employees);

            const employeeChoices = employees.map((employees) => ({
                value: employees.id,
                name: employees.last_name
            }))
            console.log(id, last_name);
            console.table(employeeChoices);

        inquirer
            .prompt({
                    name: 'id',
                    type: 'list',
                    message: "select the employee's lastname that you want to remove?",
                    choices: employeeChoices,
            })
            .then((response) => {
                console.table(response);
                const data = {id: response.id}

                db.deleteEmployee(data);
                startingPrompt()
            })
        })
}




startingPrompt();
