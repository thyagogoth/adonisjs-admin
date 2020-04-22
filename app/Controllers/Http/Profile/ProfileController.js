'use strict'

class ProfileController {
	showProfileForm( { request, response, view, session, auth }) {
		return view.render('pages.profile.index')
	}
}

module.exports = ProfileController
