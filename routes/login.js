"use strict";

const express = require('express');
const router  = express.Router();
const uuid = require('node-uuid');
const bcrypt = require('bcrypt');

module.exports = (knex) => {


  router.get('/', function(req, res){
    res.render('login')
  });

  // Login user (part of nav header bar)
  router.post("/", (req, res) => {
    knex
    .select('*')
    .from('users')
    .where('email', req.body.email)
    .then(results => {
      let user = results[0];



      if(user && bcrypt.compareSync(req.body.password, user.password)){

        let user_id = user.id;

        req.session.user_id = user_id;
        res.json(user);

      } else {
        res.status(401).send("The email or password is incorrect");
      }


    });
  });





  return router;
}
