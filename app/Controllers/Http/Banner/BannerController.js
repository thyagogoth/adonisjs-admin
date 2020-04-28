'use strict'

const Banner = use('App/Models/Banner')

class BannerController {

	async index( { view } ) {
		const banners = Banner.all()

		return view.render('banner.list', banners )
	}

	async showForm( { view } ) {
		return view.render('banner.new')
	}

}

module.exports = BannerController
