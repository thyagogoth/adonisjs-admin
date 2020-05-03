'use strict'

const Category = use('App/Models/Blog/BlogCategory')
/**
 * Resourceful controller for interacting with blogcategories
 */
class CategoryController {

	async index({ view }) {
		let categories = await Category.all()
		categories = categories.toJSON()
		return view.render('blog.categories.list', { categories })
	}

	async showCreateForm({ view }) {
		return view.render('blog.categories.new')
	}

	async store({ request, response, session }) {
		const category = new Category()

		category.title = request.input('title')
		category.slug = request.input('slug')
		category.is_active = request.input('is_active') ? true : false

		try {
			await category.save()

			session.flash({
				notification: {
					type: 'success',
					message: `Categoria ${category.title} cadastrada com sucesso`
				}
			})
			return response.redirect('/blog/categories')

		} catch (error) {
			session.flash({
				notification: {
					type: 'warning text-white',
					message: `Houve uma falha na gravação dos dados`
				}
			})
			return response.redirect('/blog/categories/new', { category })

		}

	}

	async showUpdateForm({ view, params }) {
		const categories = await Category.find(params.id)
		const category = categories.toJSON()
		return view.render('blog.categories.edit', { category })
	}

	async update({ params, request, response, session }) {
		const category = await Category.findBy('id', params.id)

		const data = request.only(['title', 'slug', 'is_active'])
		data.is_active = request.input('is_active') ? true : false

		category.merge(data)
		await category.save()

		session.flash({
			notification: {
				type: 'success',
				message: `Categoria ${category.title} alterada com sucesso`
			}
		})

		return response.redirect('/blog/categories')

	}

	async destroy({ params, response, session }) {
		let category = await Category.findBy('id', params.id)
		if (category) {
			await category.delete();

			session.flash({
				notification: {
					type: 'success',
					message: `Categoria ${category.title} removida com sucesso`
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
		return response.redirect('/blog/categories')
	}

}

module.exports = CategoryController
