'use strict'

const { validateAll } = use('Validator')

const User = use('App/Models/User')

const randomString = require('random-string')

const Mail = use('Mail')

class RegisterController {

	showRegisterForm( { view } ) {
		return view.render('auth.register')
	}

	async register ( { request, response, session }) {
		// validate form inputs
		const messages = {
			'first_name.required': 'O campo <strong>Nome</strong> é obrigatório',
			'first_name.min': 'O campo <strong>Nome</strong> é muito curto (mín: 5 caracteres)',
			'first_name.max': 'O campo <strong>Nome</strong> é longo demais (máx: 80 caracteres)',

			'last_name.required': 'O campo <strong>Sobrenome</strong> é obrigatório',
			'last_name.min': 'O campo <strong>Sobrenome</strong> é muito curto (mín: 2 caracteres)',
			'last_name.max': 'O campo <strong>Sobrenome</strong> é longo demais (máx: 80 caracteres)',

			'occupation.required': 'O campo <strong>Sobrenome</strong> é obrigatório',

			'email.required': 'O campo <strong>E-mail</strong> é obrigatório',
      		'email.email': 'Informe um <strong>E-mail</strong> válido',
			'email.unique': 'O <strong>E-mail</strong> informado já está cadastrado',

			'username.required': 'O campo <strong>Nome de usuário</strong> é obrigatório',
			'username.unique': 'O <strong>Nome de usuário</strong> informado já está cadastrado',

			'password.required': 'Informe a <strong>Senha</strong>',
			'confirm_password.required': 'Confirme a <strong>Senha</strong>',
		}

		const validation = await validateAll(request.all(), {
			first_name: 'required|min:5|max:80',
			last_name: 'required|min:2|max:80',
			occupation: 'required',
			email: 'required|email|unique:users,email',
			username: 'required|unique:users,username',
			password: 'required|min:6|max:10',
			confirm_password: 'required'
		}, messages)

		if ( validation.fails() ) {
			session.withErrors( validation.messages()).flashExcept(['password', 'confirm_password'])

			return response.redirect('back')
		}

		// create user

		const user = await User.create( {
			first_name: request.input('first_name'),
			last_name: request.input('last_name'),
			occupation: request.input('occupation'),
			email: request.input('email'),
			username: request.input('username'),
			password: request.input('password'),
			confirmation_token: randomString({ length: 40 })
		})

		// send confirmation mail
		await Mail.send('auth.emails.confirm_email', user.toJSON(), message => {
			message.to(user.email)
			.from('hello@adonisjs.org')
			.subject("Confirme seu cadastro")
		})

		// display success message
		session.flash({
			notification: {
				type: 'success',
				message: `Usuário cadastrado com sucesso! Um e-mail foi enviado para ${user.email}`
			}
		})
		return response.redirect('back')
	}

	async confirmEmail( { params, session, response } ) {
		// get user with the confirmation token
		const user = await User.findBy('confirmation_token', params.token)

		//set confirmation to null and is_active to true (1)
		user.confirmation_token = null,
		user.is_active = true

		//persist use to database
		await user.save()

		// display success message
		session.flash({
			notification: {
				type: 'success',
				message: `E-mail confirmado com sucesso. Faça login`
			}
		})
		return response.redirect('/login')
	}
}

module.exports = RegisterController
