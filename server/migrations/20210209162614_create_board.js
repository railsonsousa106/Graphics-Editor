
exports.up = function(knex) {
    return knex.schema.createTable('boards', (table) => {
        table.increments('id').primary().unsigned();
        table.string('boardName').notNullable().unique();
        table.text('actions');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('boards');
};
