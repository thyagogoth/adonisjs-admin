'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

let config = {
	title: 'Painel de controle',
	YEAR: '2020 - ' + new Date().getFullYear()
}

// Rotas que necessiam de sessão
Route.group(() => {
	Route.on('/').render('pages/home', { config })

	Route.get('/profile', 'Profile/ProfileController.showProfileForm')

	/**
	 * CONTATOS
	 * 	Departamentos
	 */
	// List Itens
	Route.get('contacts/departments', 'Contact/DepartmentController.index')
	// Edit Item
	Route.get('contacts/departments/edit/:id', 'Contact/DepartmentController.showEditForm')
	// Save Edited Item
	Route.post('contacts/departments/edit/:id', 'Contact/DepartmentController.edit')

	Route.get('contacts/departments/delete/:id', 'Contact/DepartmentController.remove')

	Route.get('contacts/messages', 'Contact/DepartmentController.index')

}).middleware(['auth'])

// Rotas livres de sessão
Route.group(() => {
	Route.get('/register', 'Auth/RegisterController.showRegisterForm')
	Route.post('/register', 'Auth/RegisterController.register').as('register')
	Route.get('/register/confirm/:token', 'Auth/RegisterController.confirmEmail')

	Route.get('/login', 'Auth/LoginController.showLoginForm')
	Route.post('/login', 'Auth/LoginController.login').as('login')

	Route.get('password/reset', 'Auth/PasswordResetController.showLinkRequestForm')
	Route.post('password/email', 'Auth/PasswordResetController.sendResetLinkEmail')
	Route.get('password/reset/:token', 'Auth/PasswordResetController.showResetForm')

}).middleware(['authenticated'])

Route.get('/logout', 'Auth/AuthenticatedController.logout')
