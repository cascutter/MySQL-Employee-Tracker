const mysql = require("mysql");
const config = require("config.json")("./config.json");
const inquirer = require("inquirer");
const conTable = require("console.table");

const con = mysql.createConnection(config);

con.connect(function(err) {
    if(err) throw(err);
    console.log("Connected!");
});

function askUser() {
    inquirer.prompt(
        {
            type: "list",
            name: "askUser",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "Add employee",
                "Add role",
                "Add department",
                "Update employee role",
                "Remove employee"
            ]
        }).then(function(answer) {
            console.log(answer);
            switch (answer.name) {
                case "View all employees":
                    viewAll();
                    break;

                case "View all roles":
                    viewRoles();
                    break;

                case "View all departments":
                    viewDepartments();
                    break;

                case "Add employee":
                    addEmployee();
                    break;
                
                case "Add role":
                    addRole();
                    break;

                case "Add department":
                    addDepartment();
                    break;

                case "Update employee role":
                    updateRole();
                    break;

                case "Remove employee":
                    removeEmployee();
                    break;
            }
        })
} askUser();

// function viewAll()

// function viewRoles()

// function viewDepartments()

// function addEmployee()

// function addRole()

// function addDepartment()

// function updateRole()

// function removeEmployee()