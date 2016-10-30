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

const session = require('express-session')
const bcrypt = require('bcrypt');
const uuid = require('node-uuid');

app.use(session({
    name: 'node_auth_app_cookie',
    secret: 's$Uup3RSecre+M$22G'
  }));

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const resourcesRoutes = require("./routes/resources");

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
app.use("/api/register", registerRoutes(knex));
app.use("/api/login", loginRoutes(knex));
app.use("/api/resources", resourcesRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});


app.get("/test", (req, res) => {
  res.send(req.session.user_id)
})

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req,res) => {
  res.render("login");
});



// Logout user
app.post("/logout", (req, res) => {
  delete req.session.user_id;
  res.redirect("/");
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
