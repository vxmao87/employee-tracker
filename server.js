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

connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome!");
    askQuestions();
});

function askQuestions() {
    inquirer.prompt(mainMenu).then(function(answer) {
        switch(answer.choice) {
            case "View All Employees":
                view("Employee");
                break;
            case "View All Roles":
                view("Role");
                break;
            case "View All Departments":
                view("Department");
                break;
            case "View All Employees by Department":
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
                },
                {
                    type: "input",
                    name: "manager",
                    message: "Who would you like to assign as this employee's manager?"
                }
            ]).then(function(answer) {
                connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.role,
                    manager_id: answer.manager
                }, 
                function(err, res) {
                    if (err) throw err;
                    askQuestions();
                })
            });
        });
    }
}

function view(answer) {
    if(answer === "Department") {
        connection.query("SELECT id, name FROM department", function(err, res) {
            if (err) throw err;
            console.table(res);
            askQuestions();
        });
    } else if(answer === "Role") {
        var query = "SELECT role.id, role.title, role.salary FROM role ";
        query += "LEFT JOIN department ON role.department_id = department.id";
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            askQuestions();
        });
    } else if(answer === "Employee") {
        var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id FROM employee ";
        query += "LEFT JOIN role ON employee.role_id = role.id ";
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            askQuestions();
        });
    }
}
