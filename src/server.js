const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // middleware to parse JSON bodies

// chạy sv db ở port khác với client
app.listen(3001, function () {
  console.log("Node server running @ http://localhost:3001");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookstore",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (name, email, password) values (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ message: "Database error", error: err.message });
    }
    return res.json({ message: "Signup successful", data });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE name = ?";
  //const values = [req.body.name, req.body.password];
  db.query(sql, req.body.name, (err, data) => {
    if (err) {
      return res.json({ message: "Database error", error: err.message });
    }
    if (data.length > 0) {
      if (data[0].password === req.body.password) {
        return res.json({ message: "Login successful", data: data[0] });
      } else {
        return res.json({ message: "Wrong password" });
      }
    } else {
      return res.json({ message: "User not found" });
    }
  });
});
