'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BannerSchema extends Schema {
	up() {
		this.create('banners', (table) => {
			table.increments()
			table.string('title', 120).notNullable()
			table.boolean('schedule_date').defaultTo(0)
			table.timestamp('date_begin',['defaultToNow'])
			table.date('date_end')
			table.string('url', 255)
			table.enum('target', ['_self', '_blank']).notNullable()
			table.string('file', 120).notNullable()
			table.boolean('is_active').defaultTo(1)
			table.timestamps()
		})
	}

	down() {
		this.drop('banners')
	}
}

module.exports = BannerSchema
