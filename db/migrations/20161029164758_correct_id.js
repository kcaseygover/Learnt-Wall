
exports.up = function(knex, Promise) {
  return Promise.all([
     knex.schema.dropTable('likes', function(table) {
      table.dropColumn('id');
      table.dropColumn('users_id');
      table.dropColumn('like');
      table.dropColumn('resources_id');

    }),
    knex.schema.dropTable('ratings', function(table) {
      table.dropColumn('id');
      table.dropColumn('users_id');
      table.dropColumn('resources_id');
      table.dropColumn('rating');

    }),
    knex.schema.dropTable('comments', function(table) {
      table.dropColumn('id');
      table.dropColumn('users_id');
      table.dropColumn('resources_id');
      table.dropColumn('content');
    }),
knex.schema.dropTable('resources', function(table) {
      table.dropColumn('id');
      table.dropColumn('users_id');
      table.dropColumn('url');
      table.dropColumn('title');
      table.dropColumn('description');
      table.dropColumn('category_id');
    }),
    knex.schema.dropTable('categories', function(table) {
      table.dropColumn('id');
      table.dropColumn('name');

    }),


    knex.schema.dropTable('users', function(table) {
      table.dropColumn('id');
      table.dropColumn('users_id');
      table.dropColumn('email');
    }),


    knex.schema.createTable('users', function (table) {
      table.uuid('id').primary();
      table.string('password');
      table.string('email');
    }),

    knex.schema.createTable('resources', function (table) {
      table.uuid('id').primary();
      table.uuid('users_id')
      table.foreign('users_id').references('id').inTable('users');
      table.string('url');
      table.string('title');
      table.string('description');
      table.uuid('category_id')
      table.foreign('category_id').references('id').inTable('categories');
    }),

    knex.schema.createTable('categories', function (table) {
      table.uuid('id').primary();
      table.string('name');

    }),

    knex.schema.createTable('likes', function (table) {
      table.uuid('id').primary();
      table.uuid('users_id')
      table.foreign('users_id').references('id').inTable('users');
      table.uuid('resources_id')
      table.foreign('resources_id').references('id').inTable('resources');
      table.boolean('like');
    }),

    knex.schema.createTable('ratings', function (table) {
      table.uuid('id').primary();
      table.uuid('users_id')
      table.foreign('users_id').references('id').inTable('users');
      table.uuid('resources_id')
      table.foreign('resources_id').references('id').inTable('resources');
      table.integer('rating');

    }),

    knex.schema.createTable('comments', function (table) {
      table.uuid('id').primary();
      table.uuid('users_id')
      table.foreign('users_id').references('id').inTable('users');
      table.uuid('resources_id')
      table.foreign('resources_id').references('id').inTable('resources');
      table.string('content');

    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([


    knex.schema.dropTable('resources', function(table) {
      table.dropColumn('id');
      table.dropColumn('users_id');
      table.dropColumn('url');
      table.dropColumn('title');
      table.dropColumn('description');
      table.dropColumn('category_id');
    }),
    knex.schema.dropTable('categories', function(table) {
      table.dropColumn('id');
      table.dropColumn('name');

    }),
    knex.schema.dropTable('likes', function(table) {
      table.dropColumn('id');
      table.dropColumn('users_id');
      table.dropColumn('like');
      table.dropColumn('resources_id');

    }),
    knex.schema.dropTable('ratings', function(table) {
      table.dropColumn('id');
      table.dropColumn('users_id');
      table.dropColumn('resources_id');
      table.dropColumn('rating');

    }),
    knex.schema.dropTable('comments', function(table) {
      table.dropColumn('id');
      table.dropColumn('users_id');
      table.dropColumn('resources_id');
      table.dropColumn('content');
    }),

    knex.schema.dropTable('users', function(table) {
      table.dropColumn('id');
      table.dropColumn('users_id');
      table.dropColumn('email');
    }),
  ])
};



