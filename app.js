const mysql = require("mysql");
const config = require("config.json")("./config.json");
const inquirer = require("inquirer");
const conTable = require("console.table");

const connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    askUser();
})

// Main menu - runs after every function completes
function askUser() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all roles",
            "View all departments",
            "Add employee",
            "Add role",
            "Add department",
            "Update employee role",
            "Remove employee",
            "Exit"
        ]
    }).then(function(answer) {
        console.log(answer);
        // Switch statement for user selection 
        switch (answer.choice) {
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

            case "Exit":
                connection.end();
                break;
        }
    })
};

// Displays all employees and their relevant data based on askUser selection "View all employees"
function viewAll() {
    console.log("Retrieving all employees from database:");
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function(err, res) {
            if (err)
                throw err;
            console.table(res);
            askUser();
        })
};

// Displays all employee roles based on askUser selection "View all roles"
function viewRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS title FROM employee JOIN role ON employee.role_id = role.id;",
        function(err, res) {
            if (err) throw err;
            console.log("\n Employee roles found in database: \n");
            console.table(res);
            askUser();
        });
}

// Displays all employee departments based on askUser selection "View all departments"
function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.log("\n Departments found in database: \n");
        console.table(res);
        askUser();
    });
}

// Queries role title for addEmployee function
let roleArray = [];

function getRole() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }

    })
    return roleArray;
}

// Allows user to add an employee to the database
function addEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "firstname",
            message: "Enter employee's first name: "
        },
        {
            type: "input",
            name: "lastname",
            message: "Enter employee's last name: "
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: getRole()
        },
    ]).then(function(answer) {
        let roleId = getRole().indexOf(answer.role) + 1;
        connection.query(
            "INSERT INTO employee SET ?", {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: roleId,
            }
        )
    }, function(err) {
        if (err) throw err
        console.log("Employee has been added!")
        console.table(answer);
        askUser();
    })
}

// Allows user to add a role to database
function addRole() {
    inquirer.prompt([{
            type: "input",
            name: "newrole",
            message: "What is the title of new role?"
        },
        {
            type: "input",
            name: "newsalary",
            message: "What is the salary for new role?"
        },
        {
            type: "input",
            name: "deptid",
            message: "Enter the department id for new role:"
        }
    ]).then(function(answer) {
        connection.query(
            "INSERT INTO role SET ?", {
                title: answer.newrole,
                salary: answer.newsalary,
                department_id: answer.deptid
            },
            function(err) {
                if (err) throw err;
            },
            console.table(answer)
        )
    })
}

// Allows user to add a department to database
function addDepartment() {

    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is the name of the new department?"
    }]).then(function(res) {
        connection.query("INSERT INTO department SET ? ", {
                name: res.name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                askUser();
            }
        )
    })
}

function updateRole() {
    console.log('updating emp');
    inquirer.prompt({
            type: "input",
            name: "id",
            message: "Enter employee id",
        })
        .then(function(answer) {
            var id = answer.id;

            inquirer
                .prompt({
                    type: "input",
                    name: "roleId",
                    message: "Enter role id",
                })
                .then(function(answer) {
                    var roleId = answer.roleId;

                    var query = "UPDATE employee SET role_id=? WHERE id=?";
                    connection.query(query, [roleId, id], function(err, res) {
                        if (err) {
                            console.table(res);
                        }
                        askUser();
                    });
                });
        });
}