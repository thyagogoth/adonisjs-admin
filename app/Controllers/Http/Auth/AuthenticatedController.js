'use strict'

class AuthenticatedController {
	async logout({ response, session, auth }) {
		await auth.logout()
		session.flash({
			notification: {
				type: 'info',
				message: `Usuário desconectado com sucesso`
			}
		})
		return response.redirect('/login')
	}
}

module.exports = AuthenticatedController
