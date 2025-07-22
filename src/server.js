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

app.post("/importbook", (req, res) => {
  const sql = "INSERT INTO book (name, quantity, cost, price, category, position) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [req.body.name, req.body.quantity, req.body.cost, req.body.price, req.body.category, req.body.position];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ message: "Database error", error: err.message });
    }
    return res.json({ message: "Import successful", data });
  });
});

app.post("/addCustomer", (req, res) => {
  const sql = "INSERT INTO customer (name, phone, address) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.phone, req.body.address];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ message: "Database error", error: err.message });
    }
    return res.json({ message: "Customer added successfully", data });
  });
});

app.get("/getCustomers", (req, res) => {
  const sql = "SELECT * FROM customer";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ message: "Database error", error: err.message });
    }
    return res.json(data);
  });
});

app.post("/searchCustomer", (req, res) => {
  const sql = "SELECT * FROM customer WHERE name LIKE ?";
  const searchName = `%${req.body.searchCustomer}%`;
  db.query(sql, [searchName], (err, data) => {
    if (err) {
      return res.json({ message: "Database error", error: err.message });
    }
    return res.json({ customers: data });
  });
});

app.get("/getBooks", (req, res) => {
  const sql = "SELECT * FROM book";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ message: "Database error", error: err.message });
    }
    return res.json(data);
  });
});

app.post("/searchBook", (req, res) => {
  const sql = "SELECT * FROM book WHERE name LIKE ?";
  const searchName = `%${req.body.searchBook}%`;
  db.query(sql, [searchName], (err, data) => {
    if (err) {
      return res.json({ message: "Database error", error: err.message });
    }
    if(data.length === 0) {
      return res.json({ message: "No books found" });
    }
    return res.json({ books: data });
  });
});
