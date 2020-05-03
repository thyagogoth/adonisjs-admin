const Route = use('Route')

Route.group( () => {

    Route.get('banners/list', 'Banner/BannerController.index')
	Route.get('banners/new', 'Banner/BannerController.showForm')
	Route.post('banners/new', 'Banner/BannerController.store')
	Route.get('banners/edit/:id', 'Banner/BannerController.showUpdateForm')
	Route.post('banners/edit/:id', 'Banner/BannerController.update')

	Route.get('banners/delete/:id', 'Banner/BannerController.destroy')

}).middleware(['auth'])

module.exports = Route
