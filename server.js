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
            "View All Departments",
            "View All Roles",               
            "Add Employee",
            "Add Role",
            "Add Department",            
            "Update Employee Role",
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

// function renderChoices(cb) {
//     let query = "SELECT id, name FROM department;";
//     connection.query(query, function(err, res) {
//         if(err) throw err;
//         console.log(res);
//         var choiceArray = [];
//         for(var i = 0; i < res.length; i++) {
//             choiceArray.push(
//                 {id: res[i].id, name: res[i].name});
//         }
//         cb(choiceArray);
//     });
// }

function askQuestions() {
    inquirer.prompt(mainMenu).then(function(answer) {
        switch(answer.choice) {
            case "View All Employees":
                askQuestions();
                break;
            case "View All Employees by Department":
                // Placeholder
                break;
            case "View All Roles":
                // Placeholder
                break;
            case "View All Departments":
                // Placeholder
                break;                
            case "Add Employee":
                add("Employee");
                break;
            case "Add Role":
                add("Role");
                break;  
            case "Add Department":
                add("Department");
                // Placeholder
                break;                              
            case "Update Employee Role":
                 // Placeholder
                break;
            case "Update Employee Manager":
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

function add(answer) {
    if(answer === "Department") {
        inquirer.prompt(createDeptQs).then(function(answer) {
            let query = `INSERT INTO department (name) VALUES ("${answer.deptName}");`;
            connection.query(query, function(err, res) {
                if(err) throw err;
                askQuestions();
            });
        });
    } else if(answer === "Role") {
        // renderChoices(function(result) {
        //     console.log(result);
        //     inquirer.prompt([
        //         {
        //             type: "list",
        //             name: "deptName",
        //             message: "Which department will this new role be a part of?",
        //             choices: result
        //         },
        //         {
        //             type: "input",
        //             name: "roleName",
        //             message: "What would you like to name the new role?"
        //         },
        //         {
        //             type: "input",
        //             name: "salary",
        //             message: "What is the salary of this role?"
        //         }
        //     ]
        //     ).then(function(answer) {
        //         console.log(answer);
        //         let query = 
        //         `INSERT INTO role (title, salary, department_id) 
        //         VALUES ("${answer.roleName}", ${answer.salary}, ${answer.deptName.index});`;
        //         connection.query(query, function(err, res) {
        //             if(err) throw err;
        //             askQuestions();
        //         });
        //     });
        // });
        let query = `SELECT id, name FROM department`;
        connection.query(query, function(err, res) {
            if(err) throw err;
            inquirer.prompt([
                {
                    type: "list",
                    name: "deptName",
                    message: "Which department will this new role be a part of?",
                    choices: res.map(dept => {
                        return {
                            name: dept.name,
                            value: dept.id
                        }
                    })
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
            ]).then(function(answer) {
                connection.query("INSERT INTO role SET ?",
                {
                    title: answer.roleName,
                    salary: answer.salary,
                    department_id: answer.deptName
                },
                function(err, res) {
                        if(err) throw err;
                        askQuestions();
                    }
                );
            });
        });
    } else if(answer === "Employee") {
        connection.query("SELECT id, title FROM role", function(err, res) {
            if(err) throw err;
            inquirer.prompt([
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
                    type: "list",
                    name: "role",
                    message: "What role would you like to assign this employee?",
                    choices: res.map(role => {
                        return {
                            name: role.title,
                            id: role.id
                        }
                    })
                }
            ]).then(function(answer) {

            });
        });
    }
}
