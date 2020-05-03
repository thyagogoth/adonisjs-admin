'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BlogCategoriesSchema extends Schema {
  up () {
    this.create('blog_categories', (table) => {
      table.increments()
      table.string('title',80).notNullable().unique()
      table.string('slug',80).notNullable().unique()
      table.boolean('is_active').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('blog_categories')
  }
}

module.exports = BlogCategoriesSchema
