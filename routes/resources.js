"use strict"

const express = require('express');
const router  = express.Router();
const uuid = require('node-uuid');
const bcrypt = require('bcrypt');

module.exports = (knex) => {

     //Add new resource
     router.post("/", (req, res) => {

      let newResource = {
        id: uuid.v4(),
        users_id: req.session.user_id,
        url: req.body.url,
        title: req.body.title,
        description: req.body.description,
        category_id: req.body.category
      }
      knex('resources').insert(newResource).then(results => {
        res.send(results);
      });
    });

    // Show a user's resources
    router.get("/", (req, res) => {

      knex
      .select('*')
      .from('resources')
      .where('users_id', req.session.user_id)
      .then(results => {
        res.json(results)
      })

    });

    // Search resources via category
    router.get("/search", (req, res) => {
      knex
      .select('*')
      .from('resources')
      .where('category_id', '???')
      .then(results => {
        res.json(results)
      })
    })


    return router;
  }

