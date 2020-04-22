'use strict'

const Message = use('App/Models/Message')
const Department = use('App/Models/Department')

class MessageController {

	async index({ view }) {
		let messages = await Message.all()
		messages = messages.toJSON()
		return view.render('contact.messages.list', {messages} )
	}

	async view({ view, params }) {
		const message = await Message.find(params.id)

		const department = await Department.find(message.department_id)
		message.department_title = department.title

		return view.render('contact.messages.read', {message: message.toJSON()} )
	}

}

module.exports = MessageController
