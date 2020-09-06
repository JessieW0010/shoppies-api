exports.up = function(knex) {
  return knex.schema.createTable('nominations', function (table) {
    table.increments('id');
    table.integer('user_id');
    table.foreign('user_id').references('accounts.id');
    table.string('imdbID', 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('nominations');
};

