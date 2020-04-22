'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

let config = {
	YEAR: '2020 - ' + new Date().getFullYear()
}

class LoginController {
	showLoginForm( { view, session } ) {
		config.title = 'Login | Painel de controle'
		return view.render('auth.login', { config })
	}

	async login ({ request, response, auth, session}) {
		// get form data
		const { username, password, remember } = request.all()

		try {

			// retrieve user base on the form data
			const user = await User.query()
				.where('username', username)
				.where('is_active', 1)
				.first()

			// verify password
			if ( user ) {
				const passwordVerified = await Hash.verify(password, user.password)

				if ( passwordVerified ) {
					await auth.remember(!!remember).login(user)

					return response.route('/')
				}
			}

			// display error message
			session.flash({
				notification: {
					type: 'danger',
					message: `Falha na autenticação! Tente novamente`
				}
			})

			return response.redirect('back')

		} catch(e) {
			session.flash({
				type: 'danger',
				notification: "Falha na autenticação"
			})
			return response.redirect('/login')
		}
	}



}

module.exports = LoginController
