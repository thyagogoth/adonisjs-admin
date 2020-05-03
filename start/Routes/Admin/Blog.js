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
    Route.get('blog/posts', 'Blog/PostController.index')
	Route.get('blog/posts/new', 'Blog/PostController.showCreateForm')
    Route.post('blog/posts/new', 'Blog/PostController.store')

	// Route.get('blog/posts/edit/:id', 'Blog/PostController.showUpdateForm')
	// Route.post('blog/posts/edit/:id', 'Blog/PostController.update')

    // Route.get('blog/posts/delete/:id', 'Blog/PostController.destroy')

}).middleware(['auth'])

module.exports = Route
