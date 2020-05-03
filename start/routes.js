'use strict'

let config = {
	title: 'Painel de controle',
	YEAR: '2020 - ' + new Date().getFullYear()
}

const Route = use('Route')

const AuthRouter = use('./Routes/Auth')
const AboutRouter = use('./Routes/Admin/About')
const BannersRouter = use('./Routes/Admin/Banner')
const ContactsRouter = use('./Routes/Admin/Contact')
const BlogRouter = use('./Routes/Admin/Blog')

// Rotas que necessiam de sessão
Route.on('/about', 'AboutRouter')
Route.on('/banners', 'BannerRouter')
Route.on('/contacts', 'ContactsRouter')
Route.on('/blog', 'BlogRouter')

// Rotas que não necessiam de sessão
Route.on('/auth', 'AuthRouter')

Route.group(() => {
	Route.on('/').render('pages/home', { config })
	// Route.get('/profile', 'Profile/ProfileController.showProfileForm')
}).middleware(['auth'])

Route.get('/logout', 'Auth/AuthenticatedController.logout')
