'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartmentSchema extends Schema {
	up () {
		this.create('departments', (table) => {
			table.increments()
			table.string('title', 80).notNullable()
			table.string('email', 120).notNullable()
			table.boolean('is_active').defaultTo(1)
			table.timestamps()
		})
	}

	down () {
		this.drop('departments')
	}
}

module.exports = DepartmentSchema
