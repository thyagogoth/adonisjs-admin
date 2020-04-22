'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
	up () {
		this.create('messages', (table) => {
			table.increments(),

			table
				.integer('department_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('departments')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')

			table.string('name', 120).notNullable()
			table.string('email', 120).notNullable()
			table.text('message').notNullable()
			table.boolean('read').defaultTo(0)

			table.timestamps()
		})
	}

	down () {
		this.drop('messages')
	}
}

module.exports = MessageSchema
