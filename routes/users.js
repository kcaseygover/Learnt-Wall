"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  //like a resource
  router.post("/likes", (req, res) => {

    knex('resources')
    .insert(req.body.like)
    .then(results => {
      res.send(results);
    })
  })

  //show a liked resource
  router.get("/:id/likes", (req, res) => {
    knex
    .select("*")
    .from("likes")
    .leftJoin('resources', 'likes.users_id', 'resources.users_id')
    .where("likes.users_id", req.params.id)
    .then((results) => {
      res.json(results);
    });
  });

  router.get('/:id', (req, res) => {
    knex
    .select('*')
    .from('users')
    .where('id', req.params.id)
    .then(results => {
      res.json(results[0])
    })
  });

  return router;
}
