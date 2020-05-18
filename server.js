const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "employee_trackerDB"
});

const question = [
    {
        type: "checkbox",
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
            "Exit"
        ]
    }
];


connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome!");
    askQuestions();
});

function askQuestions() {
    inquirer.prompt(question).then(function(answer) {
        switch(answer.choice) {
            case "View All Employees":
                // Placeholder
                break;
            case "View All Employees by Department":
                // Placeholder
                break;
            case "View All Employees by Manager":
                // Placeholder
                break;
            case "Add Employee":
                // Placeholder
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
                // Placeholder
                break;
            case "Remove Role":
                // Placeholder
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
}