require("dotenv").config();
const mysql = require("mysql");
const keys = require("./keys");
const pw = keys.password.pw

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: pw,
  database: "burgers_db"
});

con.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + con.threadId);
});

module.exports = con;
