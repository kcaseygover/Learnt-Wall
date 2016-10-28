"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Register user (part of nav header bar)
app.post("/register", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("The email or password field is empty. Please retry.");
  }
  else if (searchEmail(users, req.body.email)) {
    res.status(400).send("That email is already registered.");
  } else {
  var randomID = generateRandomString();
  users[randomID] = {id: randomID, email: req.body.email, password: req.body.password};
  res.redirect(302, "/");
  }
  res.redirect("/");
});

// Login user (part of nav header bar)
app.post("/login", (req, res) => {
  res.redirect("/");
});

// Logout user
app.post("/logout", (req, res) => {
  res.redirect("/");
});

// Add new resource
app.post("/user_id/resource", (req, res) => {
  res.redirect("/");
});

// Show a user's resources
app.get("/user_id/myresources", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
