const Route = use('Route')

Route.group( () => {
    Route.get('/new-test', 'Auth/RegisterController.createNewForTest')

	Route.get('/register', 'Auth/RegisterController.showRegisterForm')
	Route.post('/register', 'Auth/RegisterController.register').as('register')
	Route.get('/register/confirm/:token', 'Auth/RegisterController.confirmEmail')

	Route.get('/login', 'Auth/LoginController.showLoginForm')
	Route.post('/login', 'Auth/LoginController.login').as('login')

	Route.get('password/reset', 'Auth/PasswordResetController.showLinkRequestForm')
	Route.post('password/email', 'Auth/PasswordResetController.sendResetLinkEmail')
	Route.get('password/reset/:token', 'Auth/PasswordResetController.showResetForm')
}).middleware(['authenticated'])

module.exports = Route
