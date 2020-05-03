'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BlogPostSchema extends Schema {
  up () {
    this.create('blog_posts', (table) => {
      table.increments()
      table.integer('category').notNullable()
      table.string('title',80).notNullable().unique()
      table.string('slug',80).notNullable().unique()
      table.text('description').notNullable()
      table.boolean('is_active').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('blog_posts')
  }
}

module.exports = BlogPostSchema
