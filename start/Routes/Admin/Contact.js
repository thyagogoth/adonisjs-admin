const Route = use('Route')

Route.group( () => {

    /**
     * Departamentos
     */
	Route.get('contacts/departments', 'Contact/DepartmentController.index') // List items

	Route.get('contacts/departments/new', 'Contact/DepartmentController.showCreateForm') // Show Edit Form
	Route.post('contacts/departments/new', 'Contact/DepartmentController.store') // Save Edited Item

	Route.get('contacts/departments/edit/:id', 'Contact/DepartmentController.showUpdateForm') // Show Edit Form
	Route.post('contacts/departments/edit/:id', 'Contact/DepartmentController.update') // Save Edited Item
    Route.get('contacts/departments/delete/:id', 'Contact/DepartmentController.destroy') // Remove item

    /**
     * Mensagens
     */
    Route.get('contacts/messages', 'Contact/MessageController.index') // List Messages
	Route.get('contacts/messages/view/:id', 'Contact/MessageController.view')
    Route.get('contacts/messages/delete/:id', 'Contact/MessageController.destroy')

}).middleware(['auth'])

module.exports = Route
