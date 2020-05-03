const Route = use('Route')

Route.group( () => {

    /**
     * Categorias de Blog
     */
    Route.get('blog/categories', 'Blog/CategoryController.index')
	Route.get('blog/categories/new', 'Blog/CategoryController.showCreateForm')
    Route.post('blog/categories/new', 'Blog/CategoryController.store')

	Route.get('blog/categories/edit/:id', 'Blog/CategoryController.showUpdateForm')
	Route.post('blog/categories/edit/:id', 'Blog/CategoryController.update')

    Route.get('blog/categories/delete/:id', 'Blog/CategoryController.destroy')

    /**
     * Posts no Blog
     */

}).middleware(['auth'])

module.exports = Route
