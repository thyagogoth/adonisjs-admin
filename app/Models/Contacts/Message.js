'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
	department() {
		return this.hasOne('App/Models/Department')
	}
}

module.exports = Message
