'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AboutImageSchema extends Schema {
	up() {
		this.create('about_images', (table) => {
			table.increments()

			table.integer('about_id').unsigned().notNullable()
			table.string('image_name', 255).notNullable()
			table.string('label', 120)

			table
				.foreign('about_id')
				.references('id')
				.inTable('abouts')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')

			table.timestamps()
		})
	}

	down() {
		this.drop('about_images')
	}
}

module.exports = AboutImageSchema
