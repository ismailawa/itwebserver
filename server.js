const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { v4: uuidv4, v4 } = require("uuid");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "ixnote",
});

var users = [];

const port = process.env.PORT || 3000;

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Adding Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  connection.query("SELECT * FROM students", (error, students) => {
    if (!error) {
      console.log(students);
      res.render("index", { students: students });
    } else {
      console.log(error);
    }
  });
});

app.get("/register", (req, res) => {
  res.render("register_view");
});

app.post("/create_user", (req, res) => {
  const { firstName, lastName, email, address } = req.body;

  connection.query(
    "INSERT INTO students (firstName, lastName, email, address) VALUES (?,?,?,?)",
    [firstName, lastName, email, address],
    (error, result) => {
      if (!error) {
        res.redirect("/");
      } else {
        console.log(error);
      }
    }
  );
});

app.get("/remove/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM students WHERE id=?", [id], (error, result) => {
    if (!error) {
      console.log(result);
      res.redirect("/");
    } else {
      console.log(error);
    }
  });
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM students WHERE id=?",
    [id],
    (error, result) => {
      if (!error) {
        console.log(result);
        res.render("user_detail", { student: result[0] });
      } else {
        console.log(error);
      }
    }
  );
});
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const user = users.filter((user) => user.id == id)[0];
  res.render("edit", { user: user });
});
app.post("/update", (req, res) => {
  const { id, name, address } = req.body;
  // const user = users.filter(user => user.id == id)[0]

  users = users.map((user) => {
    if (user.id == id) {
      user.name = name;
      user.address = address;
      return user;
    }

    return user;
  });
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Serving is running on PORT: " + port);
});
