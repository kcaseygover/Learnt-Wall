const uuid = require('node-uuid');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
  .then(function () {
    return Promise.all([
        // Inserts seed entries
        knex('categories').insert({id: uuid.v4(), name: 'Javascript'}),
        knex('categories').insert({id: uuid.v4(), name: 'Databases'}),
        knex('categories').insert({id: uuid.v4(), name: 'HTML/CSS'}),
        knex('categories').insert({id: uuid.v4(), name: 'AJAX'}),
        knex('categories').insert({id: uuid.v4(), name: 'jQuery'}),
        knex('categories').insert({id: uuid.v4(), name: 'node'}),
        ]);

  });
}
