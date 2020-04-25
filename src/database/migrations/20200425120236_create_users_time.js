
exports.up = function (knex) {
	return knex.schema.createTable('status_time', (table) => {
		table.increments();

		table.integer('user').unsigned().notNullable();
		table.datetime('start').notNullable();
		table.datetime('end').nullable();

		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at').defaultTo(knex.fn.now())

		table.foreign('user').references('id').inTable('users');
	})
};

exports.down = function (knex) {
	return knex.schema.dropTable('status_time');
};
