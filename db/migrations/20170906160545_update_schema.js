
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    // knex.schema.dropTable('awards'),
    // knex.schema.dropTable('genres'),
    // // knex.schema.dropTable('payment_methods'),
    // knex.schema.dropTable('transactions'),
    // knex.schema.dropTable('movies'),
    // knex.schema.dropTable('crew'),
    knex.schema.dropTable('profiles'),
    knex.schema.createTableIfNotExists('profiles', function(table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable();
      table.string('phone', 100).nullable();
      table.timestamps(true, true);
      table.text('avatar').nullable();
      table.jsonb('favorites').nullable();
      table.jsonb('follow_genre').nullable();
      table.jsonb('follow_actor').nullable();
      table.jsonb('follow_director').nullable();
      table.jsonb('follow_movies').nullable();
      table.jsonb('follow_writers').nullable();
      table.jsonb('vod_subscriptions').nullable();
      table.boolean('new_user').defaultTo('True');
    }),

    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),

    knex.schema.createTableIfNotExists('crew', function(table) {
      table.increments('id').unsigned().primary();
      table.text('name').notNullable();
      table.jsonb('genre').nullable();
      table.jsonb('awards').nullable();
      table.boolean('actor').nullable();
      table.boolean('director').nullable();
      table.boolean('writer').nullable();
    }),

    knex.schema.createTableIfNotExists('genres', function(table) {
      table.increments('id').unsigned().primary();
      table.text('name').notNullable();
      table.jsonb('movies').nullable();
    }),

    knex.schema.createTableIfNotExists('movies', function(table) {
      table.increments('id').unsigned().primary();
      table.text('title').notNullable();
      table.smallint('year').nullable();
      table.jsonb('release_date').nullable();
      table.jsonb('genres').nullable();
      table.jsonb('awards').nullable();
      table.jsonb('director').notNullable();
      table.jsonb('writer').notNullable();
      table.jsonb('actors').notNullable();
      table.bigint('box_office').nullable();
      table.text('production').nullable();
      table.jsonb('ratings').nullable();
    }),

    knex.schema.createTableIfNotExists('awards', function(table) {
      table.increments('id').unsigned().primary();
      table.text('name').notNullable();
      table.smallint('year').nullable();
      table.text('category').nullable();
      table.integer('crew').references('id').inTable('crew').onDelete('CASCADE');
      table.integer('movie').references('id').inTable('movies').onDelete('CASCADE');
    }),

    knex.schema.createTableIfNotExists('payment_methods', function(table) {
      table.increments('id').unsigned().primary(); //Transaction Number
      table.integer('user_id').references('profiles.id').onDelete('CASCADE');
      table.text('payment_method').notNullable();
      table.text('CCN').nullable();
    }),

    knex.schema.createTableIfNotExists('transactions', function(table) {
      table.increments('id').unsigned().primary(); //Transaction Number
      table.integer('method').references('payment_methods.id');
      table.integer('price').notNullable();
      table.integer('movie').references('movies.id');
      //Subscription?
    }),

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('awards'),
    knex.schema.dropTable('genres'),
    knex.schema.dropTable('payment_methods'),
    knex.schema.dropTable('transactions'),
    knex.schema.dropTable('movies'),
    knex.schema.dropTable('crew'),
    knex.schema.dropTable('profiles')
  ]);
};
