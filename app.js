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

            case "Remove employee":
                removeEmployee();
                break;

            case "Exit":
                console.log("Goodbye!");
                connection.end();
                break;
        }
    })
};

// Displays all employees and their relevant data based on askUser selection "View all employees"
function viewAll() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function(err, res) {
            if (err) throw err
            console.table(res)
            askUser();
        })
}

// Displays all employee roles based on askUser selection "View all roles"
function viewRoles() {
    connection.query("SELECT * from role",
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

// Allows user to add an employee to the database
function addEmployee() {

    connection.query("SELECT * FROM role", function(err, results) {
        if (err) throw err;

        inquirer.prompt([{
                type: "input",
                name: "firstname",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "lastname",
                message: "What is the employee's last name?"
            },
            {
                name: "choice",
                type: "rawlist",
                message: "What is the employee's role?",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }

                    return choiceArray;
                },
            }
        ]).then(function(res) {
            for (var i = 0; i < results.length; i++) {
                if (results[i].title === res.choice) {
                    res.role_id = results[i].id;
                }
            }
            var query = "INSERT INTO employee SET ?"
            const VALUES = {
                first_name: res.firstname,
                last_name: res.lastname,
                role_id: res.role_id
            }
            connection.query(query, VALUES, function(err) {
                    if (err) throw err;
                    console.log("Employee successfully added!");
                    askUser();
                }

            )
        })
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
    ]).then(function(result) {
        connection.query(
            "INSERT INTO role SET ?", {
                title: result.newrole,
                salary: result.newsalary,
                department_id: result.deptid
            },
            function(err) {
                if (err) throw err;
                console.table(result);
                console.log("New role added!");
                askUser();
            });
    });
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

// Allows user to update employee role
function updateRole() {
    inquirer.prompt({
            type: "input",
            name: "id",
            message: "Enter employee ID:",
        })
        .then(function(answer) {
            var id = answer.id;

            inquirer
                .prompt({
                    type: "input",
                    name: "roleId",
                    message: "Enter employee's new role ID",
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

// Allows user to remove an employee
function removeEmployee() {
    inquirer
        .prompt({
            name: "employeeRemove",
            type: "input",
            message: "To REMOVE an employee, enter the Employee id",

        })
        .then(function(answer) {
            console.log(answer);
            var query = "DELETE FROM employee WHERE ?";
            var newId = Number(answer.employeeRemove);
            console.log(newId);
            connection.query(query, { id: newId }, function(err, res) {
                askUser();

            });
        });
}