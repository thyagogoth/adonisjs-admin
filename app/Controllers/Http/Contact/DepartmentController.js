'use strict'

const Department = use('App/Models/Department')

class DepartmentController {

	async index({ view }) {
		let departments = await Department.all()
		departments = departments.toJSON()
		return view.render('contact.list-departments', {departments} )
	}

	async showEditForm( { view, params }) {
		const departments = await Department.find(params.id )
		const department = departments.toJSON()
		return view.render('contact.edit-departments', {department} )
	}

	async edit({ params, request, response, session }) {
		// const department = new Department()
		const department = await Department.findBy('id', params.id)

		department.title = request.input('title')
		department.email = request.input('email')
		department.is_active = request.input('is_active') ? true : false

		await department.save()

		session.flash({
			notification: {
				type: 'success',
				message: `Departamento ${department.title} alterado com sucesso`
			}
		})

		return response.redirect('/contacts/departments')

	}

}

module.exports = DepartmentController
