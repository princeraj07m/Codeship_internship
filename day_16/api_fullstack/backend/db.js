const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",   // your MySQL username
  password: "@Prince2427", // your MySQL password
  database: "todo_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected!");
});

module.exports = db;
