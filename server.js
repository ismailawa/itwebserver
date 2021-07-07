const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { v4: uuidv4, v4 } = require("uuid");

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
  res.render("index", { users: users });
});

app.get("/register", (req, res) => {
  res.render("register_view");
});

app.post("/create_user", (req, res) => {
  const id = v4();
  const newuser = { id: id, ...req.body };
  users.push(newuser);
  res.redirect("/");
});

app.get("/remove/:id", (req, res) => {
  const id = req.params.id;
  const deleteuser = users.filter((user) => user.id == id);
  const index = users.indexOf(deleteuser[0]);
  users.splice(index, 1);
  console.log(users);
  res.redirect("/");
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const user = users.filter((user) => user.id == id)[0];
  res.render("user_detail", { user: user });
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
