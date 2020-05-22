const inquirier = require("inquirer");

const createDeptQs = [
    {
        type: "input",
        name: "deptName",
        message: "What is the name of the department you would like to make?"
    },
];

const createRoleQs = [
    {
        type: "input",
        name: "roleName",
        message: "What would you like to name the new role?"
    },
    {
        type: "input",
        name: "deptName",
        message: "Which department will this new role be a part of?"
    }
];

const createEmployeeQs = [
    {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?"
    },
    {
        type: "input",
        name: "role",
        message: "what role would you like to assign this employee?"
    }
];

function createDept() {
    inquirier.prompt(createDeptQs).then(function(answer) {
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, [answer.deptName], function(err, res) {
            if(err) throw err;
        });
    });
}

function createRole() {

}

function createEmployee() {

}
