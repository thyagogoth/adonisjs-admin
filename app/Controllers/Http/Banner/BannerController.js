'use strict'

const Banner = use('App/Models/Banner')
const moment = use('moment')
const Helpers = use('Helpers')

class BannerController {

	async index({
		view
	}) {
		var banners = await Banner.all()
		banners = banners.toJSON()

		return view.render('banner.list', {
			banners
		})
	}

	async showForm({
		view
	}) {
		return view.render('banner.new')
	}

	/**
	 * Exibe o formulário de edição
	 * de um departamento (params.id) existente
	 */
	async showUpdateForm({
		view,
		params
	}) {
		const banners = await Banner.find(params.id)
		const banner = banners.toJSON()
		return view.render('banner.edit', {
			banner
		})
	}

	async store({
		request,
		response,
		session
	}) {
		const banner = new Banner()

		banner.title = request.input('title')
		banner.is_schedule = request.input('is_schedule') ? true : false
		if (banner.is_schedule == true) {
			banner.date_begin = moment(request.input('schedule_date').split(' - ')[0]).format('YYYY-MM-DD')
			banner.date_end = moment(request.input('schedule_date').split(' - ')[1]).format('YYYY-MM-DD')
		}
		banner.url = request.input('url')
		banner.is_active = request.input('is_active') ? true : false

		const picture = request.file('file', {
			types: ['image'],
			size: '2mb'
		})

		await picture.move(Helpers.publicPath('uploads'), {
			name: `${new Date().getTime()}.${picture.subtype}`,
			overwrite: true
		})
		banner.file = picture.fileName

		try {
			await banner.save()

			session.flash({
				notification: {
					type: 'success',
					message: `Banner ${banner.title} cadastrado com sucesso`
				}
			})
			return response.redirect('/banners/list')

		} catch (error) {
			session.flash({
				notification: {
					type: 'warning text-white',
					message: `Houve uma falha na gravação dos dados`
				}
			})
			return response.redirect('/banners/new', {
				department
			})
		}
	}

	async update({ params, request, response, session }) {
		const banner = await Banner.findBy('id', params.id)
		const update = request.only('title', 'is_schedule', 'schedule_date','url', 'target', 'is_active')

		update.is_schedule = request.input('is_schedule') ? true : false
		if (update.is_schedule == true && update.schedule_date != undefined) {
			let data = update.schedule_date.split(' - ')
			update.date_begin = moment(data[0]).format('YYYY-MM-DD')
			update.date_end = moment(data[1]).format('YYYY-MM-DD')
		}
		update.is_active = request.input('is_active') ? true : false

		if ( request.file('file')) {
			const picture = request.file('file', {
				types: ['image'],
				size: '2mb'
			})

			await picture.move(Helpers.publicPath('uploads'),  {
				name: `${new Date().getTime()}.${picture.subtype}`,
				overwrite: true
			})
			update.file = picture.fileName
		}

		banner.merge(update)
		await banner.save()

		session.flash({
			notification: {
				type: 'success',
				message: `Banner ${banner.title} alterado com sucesso`
			}
		})

		return response.redirect('/banners/list')

	}

}

module.exports = BannerController
