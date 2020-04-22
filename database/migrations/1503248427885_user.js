'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
	  table.increments()
	  table.string('first_name', 80).notNullable(),
	  table.string('last_name', 80).notNullable(),
	  table.string('occupation', 120),
      table.string('email', 254).notNullable().unique()
      table.string('username', 80).notNullable().unique()
	  table.string('password', 60).notNullable()
	  table.string('confirmation_token')
	  table.boolean('is_active').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
