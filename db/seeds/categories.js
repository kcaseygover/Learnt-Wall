const uuid = require('node-uuid');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
        // Inserts seed entries
        knex('categories').insert({id: uuid.v4, name: ''}),
        knex('categories').insert({id: uuid.v4, name: ''}),
        knex('categories').insert({id: uuid.v4, name: ''}),
        knex('categories').insert({id: uuid.v4, name: ''}),
        knex('categories').insert({id: uuid.v4, name: ''}),
        knex('categories').insert({id: uuid.v4, name: ''}),
        ]);

};
