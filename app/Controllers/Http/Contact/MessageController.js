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

		if ( message ) {

			console.log(message.read)
			// altera status de lida: Não pra Sim
			message.read = true
			await message.save()
		}

		const department = await Department.find(message.department_id)
		message.department_title = department.title

		return view.render('contact.messages.read', {message: message.toJSON()} )
	}

	async destroy( { params, response, session} ) {
		let message = await Message.findBy('id', params.id)
		if ( message ) {
			await message.delete();

			session.flash({
				notification: {
					type: 'success',
					message: `Mensagem removida com sucesso`
				}
			})
		} else {
			session.flash({
				notification: {
					type: 'warning',
					message: `Nâo foi possível remover o item selecioado`
				}
			})
		}
		return response.redirect('/contacts/messages')
	}

}

module.exports = MessageController
