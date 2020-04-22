'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User')
const PasswordReset = use('App/Models/PasswordReset')
const randomString = require('random-string')
const Mail = use('Mail')
const Hash = use('Hash')

class PasswordResetController {

	showLinkRequestForm( { view }) {
		const config = {
			title: 'Recuperar senha'
		}
		return view.render('auth.passwords.email', {config} )
	}

	async sendResetLinkEmail( { request, response, session } ) {
		// validate form inputs
		const messages = {
			'email.email': 'Informe um <strong>E-mail</strong> válido',
		}

		const validation = await validateAll(request.only('email'), {
			email: 'required|email'
		}, messages)

		if ( validation.fails() ) {
			session.withErrors( validation.messages() ).flashAll()

			return response.redirect('back')
		}

		try {
			// get user
			const user = await User.findBy('email', request.input('email'))

			await PasswordReset.query().where('email', user.email).delete()
			const { token } = await PasswordReset.create({
				email: user.email,
				token: randomString({ length: 40 })
			})

			const mailData = {
				user: user.toJSON(),
				token
			}

			await Mail.send('auth.emails.password_reset', mailData, message => {
				message
				.to(user.email)
				.from('hello@adonisjs.com')
				.subject('Passowrd reset link')
			})

			session.flash({
				notification: {
					type: 'success',
					message: `Um link de recuperação da senha foi enviado para o e-mail ${user.email}`
				}
			})

			return response.redirect('back')

		} catch( error ) {
			session.flash({
				notification: {
					type: 'danger',
					message: `Desculpe, não encontramos usuário com o e-mail informado`
				}
			})

			return response.redirect('back')
		}

	}

	showResetForm( {params, view }) {
		return view.render('auth.passwords.reset', { token: params.token } )
	}

	async reset({ request, response, session }) {
		// validate form inputs
		const messages = {
			'token.required': 'O token da sessão é inválido',
			'email.required': 'Informe um <strong>E-mail</strong> válido',
			// 'email.email': 'Informe um <strong>E-mail</strong> válido',
			'password.required': 'Informe a nova senha',
			'password.min': 'Senha muito curta',
			'password.max': 'Senha muito longa',
			'password.confirmed': 'A confirmação da senha não coincide',
		}

		const validation = await validateAll(request.all(), {
			token: 'required',
			email: 'required|email',
			password: 'required|min:6|max:10|confirmed'
		}, messages)

		if ( validation.fails() ) {
			session.withErrors( validation.messages() ).flashExcept(['password', 'password_confirmation'])

			return response.redirect('back')
		}

		try {
			// get users by the provider email
			const user = await User.findBy('email', request.input('email') )

			// check if password reset token exist for user
			const token = await PasswordReset.query()
				.where('email', user.email)
				.where('token', request.input('token'))
				.first()

			if ( !token ) {
				session.flash({
					notification: {
						type: 'danger',
						message: `Solicitação de troca de senha não encontrada`
					}
				})

				return response.redirect('back')
			}

			user.password = await Hash.make(request.input('password'))
			user.password = request.input('password')
			await user.save()

			// delete password reset token
			await PasswordReset.query().where('email', user.email).delete()

			// display success message
			session.flash({
				notification: {
					type: 'success',
					message: `Alteração de senha efetuada com sucesso`
				}
			})

			return response.redirect('/login')

		} catch(error) {
			// display error message
			session.flash({
				notification: {
					type: 'danger',
					message: `Desculpe, não encontramos usuário com o e-mail informado`
				}
			})

			return response.redirect('back')
		}

	}

}

module.exports = PasswordResetController
