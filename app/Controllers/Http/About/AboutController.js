'use strict'

const About = use('App/Models/About/About')

class AboutController {

	async showForm({ request, response, view }) {
		var about = {}
		const registro = await About.first()
		console.log(registro)
		if (registro) {

			about = registro.toJSON()
		}
		return view.render('about.edit.edge', about)
	}

	async store({ request, response, session }) {
		let about = await About.first()

		if ( about ) {
			// ATUALIZAR REGISTRO EXISTENTE
			let about = await About.first()

			let data = request.only(['description','is_active'])
			data.is_active = request.input('is_active') ? true : false

			about.merge(data)

			try {
				await about.save()

				session.flash({
					notification: {
						type: 'success',
						message: `Conteúdo sobre a empresa gerenciado com sucesso`
					}
				})
				return response.redirect('/about/edit')

			} catch (error) {
				session.flash({
					notification: {
						type: 'warning text-white',
						message: `Houve uma falha na gravação dos dados`
					}
				})
				return response.redirect('/about/edit', { about })

			}
		} else {
			// CRIAR NOVO REGISTRO
			let about = new About()
			about.description = request.input('description')
			about.is_active = request.input('is_active') ? true : false
			try {
				await about.save()

				session.flash({
					notification: {
						type: 'success',
						message: `Conteúdo sobre a empresa gerenciado com sucesso`
					}
				})
				return response.redirect('/about/edit')

			} catch (error) {
				session.flash({
					notification: {
						type: 'warning text-white',
						message: `Houve uma falha na gravação dos dados`
					}
				})
				return response.redirect('/about/edit', { about })

			}
		}



	}

}

module.exports = AboutController
