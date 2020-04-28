'use strict'

const Department = use('App/Models/Department')

class DepartmentController {

	/**
	 * Lista os departamentos cadastrados
	 * view: list-departments
	 */
	async index({ view }) {
		let departments = await Department.all()
		departments = departments.toJSON()
		return view.render('contact.departments.list', {departments} )
	}

	async showCreateForm({ view }) {
		return view.render('contact.departments.new')
	}

	async store( { request, response, session }) {
		const department = new Department()

		department.title = request.input('title')
		department.email = request.input('email')
		department.is_active = request.input('is_active') ? true : false

		try {
			await department.save()

			session.flash({
				notification: {
					type: 'success',
					message: `Departamento ${department.title} cadastrado com sucesso`
				}
			})
			return response.redirect('/contacts/departments')

		} catch ( error ) {
			session.flash({
				notification: {
					type: 'warning text-white',
					message: `Houve uma falha na gravação dos dados`
				}
			})
			return response.redirect('/contacts/departments/new', { department })

		}

	}

	/**
	 * Exibe o formulário de edição
	 * de um departamento (params.id) existente
	 */
	async showUpdateForm( { view, params }) {
		const departments = await Department.find(params.id )
		const department = departments.toJSON()
		return view.render('contact.departments.edit', {department} )
	}

	/**
	 * Grava as alterações do departamento
	 */
	async update({ params, request, response, session }) {
		const department = await Department.findBy('id', params.id)

		const data = request.only(['title','email', 'is_active'])
		data.is_active = request.input('is_active') ? true : false

		department.merge(data)
		await department.save()

		session.flash({
			notification: {
				type: 'success',
				message: `Departamento ${department.title} alterado com sucesso`
			}
		})

		return response.redirect('/contacts/departments')

	}

	async destroy( { params, response, session} ) {
		let department = await Department.findBy('id', params.id)
		if ( department ) {
			await department.delete();

			session.flash({
				notification: {
					type: 'success',
					message: `Departamento ${department.title} removido com sucesso`
				}
			})
		} else {
			session.flash({
				notification: {
					type: 'warning',
					message: `Nâo foi possível remover o item selecioado`
				}
			})
		}
		return response.redirect('/contacts/departments')
	}

}

module.exports = DepartmentController
