const db = require("./db");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const mysql = require("mysql");


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
                "QUIT"
            ]

        })
        .then((res) => {

            switch (res.action) {
                case "VIEW_DEPARTMENT":
                    viewDepartment();
                    return;                

                case "VIEW_ROLE":
                    viewRole()
                    return;

                case "VIEW_EMPLOYEE":
                    viewEmployee()
                    return;

                    case "CREATE_ROLE":
                    createRole();
                    return;
                case "CREATE_DEPARTMENT":
                    createDepartment();
                    return;

                case "CREATE_EMPLOYEE":
                    createEmployee();
                    return;

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

function createDepartment(){
    db.viewDepartment()
    .then((department) => {
        const departmentChoices = department.map((department) => ({
            value: department.department_id,
            name: department.name
        }))
        inquirer
            .prompt({
                name: "department_name",
                type: "input",
                message: "What is the department name?",
        })
        .then(res => {
            console.table(res);
            startingPrompt();
        })
    })
    

};

function createRole() {
    db.viewDepartment()
    .then((department) => {
        const departmentChoices = department.map((department) => ({
            value: department.department_id,
            name: department.name
        }))
        inquirer.prompt([
            {
                message: "What department is this role for?",
                type: "input",
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
            console.table(res);
            startingPrompt();
        })
    })
}

function createEmployee(){

    db.viewRole()
    .then((role) => {
        const roleChoices = role.map((roles) => ({
            value: roles.role_id,
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
            db.insertEmployee(res);
            startingPrompt();
        })
    })
};


startingPrompt();
