"use strict";

const express = require('express');
const router  = express.Router();
const uuid = require('node-uuid');
const bcrypt = require('bcrypt');

module.exports = (knex) => {

  router.get('/', function(req, res) {
    res.render('register');
  })
  // Register user (part of nav header bar)
  router.post("/", (req, res) => {

    if (!req.body.email || !req.body.password) {
      return res.status(400).send("The email or password field is empty. Please retry.");

    }
    knex
    .select('email')
    .from('users')
    .where('email', req.body.email)
    .then(results => {
      if (results.length >0) {
        return res.status(400).send("This email already exists");
      }
      var newUser = {
        id: uuid.v4(),
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      }
      knex('users').insert(newUser).then(results => {
         res.send(results);
      });

    })


  });
return router;
}
