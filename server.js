const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: process.env.MYSQL_PASSWORD,
    database: "employee_trackerDB"
});

const mainMenu = [
    {
        type: "list",
        name: "choice",
        message: "What would you like to do today?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "View All Departments",   
            "Add Department",
            "Remove Department",
            "View Department Budget",
            "Exit"
        ]
    }
];

const createDeptQs = [
    {
        type: "input",
        name: "deptName",
        message: "What is the name of the department you would like to make?"
    },
];

// const createEmployeeQs = [
//     {
//         type: "input",
//         name: "firstName",
//         message: "What is the employee's first name?"
//     },
//     {
//         type: "input",
//         name: "lastName",
//         message: "What is the employee's last name?"
//     },
//     {
//         type: "input",
//         name: "role",
//         message: "what role would you like to assign this employee?"
//     }
// ];

connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome!");
    askQuestions();
});

function renderChoices(cb) {
    let query = "SELECT name FROM department;";
    connection.query(query, function(err, res) {
        if(err) throw err;
        var choiceArray = [];
        for(var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].name);
        }
        cb(choiceArray);
    });
}

function askQuestions() {
    inquirer.prompt(mainMenu).then(function(answer) {
        switch(answer.choice) {
            case "View All Employees":
                askQuestions();
                break;
            case "View All Employees by Department":
                // Placeholder
                break;
            case "View All Employees by Manager":
                // Placeholder
                break;
            case "Add Employee":
                create("Employee");
                break;
            case "Remove Employee":
                // Placeholder
                break;
            case "Update Employee Role":
                 // Placeholder
                break;
            case "Update Employee Manager":
                // Placeholder
                break;
            case "View All Roles":
                // Placeholder
                break;
            case "Add Role":
                create("Role");
                break;
            case "Remove Role":
                // Placeholder
                break;
            case "View All Departments":
                // Placeholder
                break;
            case "Add Department":
                create("Department");
                // Placeholder
                break;
            case "Remove Department":
                // Placeholder
                break;
            case "Update Department":
                // Placeholder
                break;
            case "View Department Budget":
                // Placeholder
                break;
            case "Exit":
                console.log("Goodbye! See you again soon!");
                connection.end();
                break;
        }
    });
}

function create(answer) {
    if(answer === "Department") {
        inquirer.prompt(createDeptQs).then(function(answer) {
            let query = `INSERT INTO department (name) VALUES ("${answer.deptName}");`;
            connection.query(query, function(err, res) {
                if(err) throw err;
                askQuestions();
            });
        });
    } else if(answer === "Role") {
        renderChoices(function(result) {
            inquirer.prompt([
                {
                    type: "list",
                    name: "deptName",
                    message: "Which department will this new role be a part of?",
                    choices: result
                },
                {
                    type: "input",
                    name: "roleName",
                    message: "What would you like to name the new role?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary of this role?"
                }
            ]
            ).then(function(answer) {
                let query = `INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleName}", ${answer.salary}, ${answer.deptName});`;
                connection.query(query, function(err, res) {
                    if(err) throw err;
                    askQuestions();
                });
            });
        });
    } else if(answer === "Employee") {
        
    }
}
