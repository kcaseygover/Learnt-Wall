"use strict";

const express = require('express');
const router  = express.Router();
const uuid = require('node-uuid');
const bcrypt = require('bcrypt');

module.exports = (knex) => {

   //Add new resource
  router.post("/", (req, res) => {
    console.log("req.body", req.body.url)
    let newResource = {
      id: uuid.v4(),
      url: req.body.url,
      title: req.body.title,
      description: req.body.description
    }
    knex('resources').insert(newResource).then(results => {
      res.send(results);
    });

  });

  // Show a user's resources
  router.get("/", (req, res) => {
$(document).ready(function()  {

  $.ajax({
    method: "GET",
    url: "/api/resources"
  }).done((resources) => {
    for(resource of resources) {
      let myResource = knex
      .select('*')
      .from('resources')
      .where('user_id', req.session.user_id)
      .then(results => {


        $("<article>").text(myResource).appendTo($(".resource-feed"));
      })
    }
  });;


    res.send("/");
  });
});
  return router;
}

