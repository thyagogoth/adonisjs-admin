const Route = use('Route')

Route.group( () => {
    Route.get('about/edit', 'About/AboutController.showForm')
    Route.post('about/edit', 'About/AboutController.store')
}).middleware(['auth'])

module.exports = Route
