const mysql = require("mysql");
const config = require("config.json")("./config.json");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const con = mysql.createConnection(config);

con.connect(function(err) {
    if(err) throw(err);
    console.log("Connected!");
});