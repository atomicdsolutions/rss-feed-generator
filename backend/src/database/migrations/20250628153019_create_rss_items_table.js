/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('rss_items', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.string('media_url').notNullable();
    table.string('media_type');
    table.timestamp('pub_date').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('rss_items');
};
