'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AboutSchema extends Schema {
	up() {
		this.create('abouts', (table) => {
			table.increments()
			table.text('description').notNullable()
			table.boolean('is_active').defaultTo(0)
			table.timestamps()
		})
	}

	down() {
		this.drop('abouts')
	}
}

module.exports = AboutSchema
