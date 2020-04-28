'use strict'

const { hooks } = require('@adonisjs/ignitor')
const moment = use('moment')

hooks.after.providersBooted(() => {
	const View = use('View')
	const Env = use('Env')
	const Exception = use('Exception')

	View.global('appUrl', path => {
		const APP_URL = Env.get('APP_URL')

		return path ? `${APP_URL}/${path}` : APP_URL
	})

	// hanfle  InvalidSessionException
	Exception.handle('InvalidSessionException', (error, { response }) => {
		return response.redirect('/login')
	})

	/**
	 * Função para formatação de datas diretamente na TPL (EDGE)
	 */
	View.global('dateFormat', (date, formato) => {
		if (date != null && date != "")
			return moment(date).format(formato)
		else return "Não Informado"
	})

	/**
	 * Função para retornar o valor booleano no formato Human
	 */
	View.global('getBooleanValue', (value) => {
		if ( value == 1 ) {
			return 'Sim'
		} else {
			return 'Não'
		}
	})
})
