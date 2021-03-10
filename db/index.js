const connection = require("./connection");

module.exports = {
    viewDepartment() {

        return connection.query(" SELECT * FROM department");
    
    },    
    
    viewRole() {

        return connection.query(" SELECT * FROM role");
    
    },    
    
    viewEmployee() {

        return connection.query(" SELECT * FROM employee");
    
    }, 

    createRole(data) {
        return connection.query("INSERT INTO role SET ?", data);
    },

    createDepartment(data) {
        return connection.query("INSERT INTO department SET ?", data);
    },

    createEmployee(data) {
        return connection.query("INSERT INTO employee SET ?", data);
    },

    deleteEmployees(data) {
        return connect.query("DELETE FROM employee WHERE ?", data)
    }

}