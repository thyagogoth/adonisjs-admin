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

	// Route.get('/profile', 'Profile/ProfileController.showProfileForm')

	/**
	 * CONTATOS
	 * 	Departamentos
	 */
	Route.get('contacts/departments', 'Contact/DepartmentController.index') // List items

	Route.get('contacts/departments/new', 'Contact/DepartmentController.showCreateForm') // Show Edit Form
	Route.post('contacts/departments/new', 'Contact/DepartmentController.store') // Save Edited Item

	Route.get('contacts/departments/edit/:id', 'Contact/DepartmentController.showUpdateForm') // Show Edit Form
	Route.post('contacts/departments/edit/:id', 'Contact/DepartmentController.update') // Save Edited Item
	Route.get('contacts/departments/delete/:id', 'Contact/DepartmentController.destroy') // Remove item

	/**
	 * CONTATOS
	 *  Mensagens
	 */
	Route.get('contacts/messages', 'Contact/MessageController.index') // List Messages
	Route.get('contacts/messages/view/:id', 'Contact/MessageController.view')
	Route.get('contacts/messages/delete/:id', 'Contact/MessageController.destroy')

	/**
	 * ABOUT
	 * Cadastro/Edição
	 */
	Route.get('about/edit', 'About/AboutController.showForm')
	Route.post('about/edit', 'About/AboutController.store')

	/**
	 * BANNERS
	 * Listagem
	 */
	Route.get('banners/list', 'Banner/BannerController.index')

	Route.get('banners/new', 'Banner/BannerController.showForm')
	Route.post('banners/new', 'Banner/BannerController.store')

	Route.get('banners/edit/:id', 'Banner/BannerController.showUpdateForm')
	Route.post('banners/edit/:id', 'Banner/BannerController.update')

}).middleware(['auth'])

// Rotas livres de sessão
Route.group(() => {
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

Route.get('/logout', 'Auth/AuthenticatedController.logout')
