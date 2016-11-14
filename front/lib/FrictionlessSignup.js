
var Helper = require('./Helper')
var Mapper = require('./Mapper')
var Display = require('./Display')
var Api = require('./Api')

var FrictionlessSignup = function () {
	this.helper = Helper()
	this.mapper = Mapper()
	this.display = Display()
	this.api = Api()
	this.data_form = {}
	this.metadata = {}
	this.discarded = false
}

FrictionlessSignup.prototype.setEvents = function () {

	// Set all emitter focusout on frictionlessSelectos
	this.display.setAllEmitter()

	// Add all events listenners
	addEventListener('email valid', () => {

		console.log('email valid: ',this.data_form.email);

	})

	addEventListener('email invalid', () => {

		console.log('email invalid: ',this.data_form.email);

	})

	// Event listener
	addEventListener('email focusout', () => {
		console.log('Email event focusout');

		var selectorEmail = this.display.getSelectorWithName('email')
		var email = this.display.getDataField(selectorEmail)

		this.data_form.email = email
		this.emailAvailable()
	})

}

FrictionlessSignup.prototype.emailAvailable = function () {

	if (this.helper.checkEmail(this.data_form.email) === true) {
		this.display.dispatchEventGlobal('email valid')
		this.callApi()
	} else {
		this.display.dispatchEventGlobal('email invalid')
	}
}


FrictionlessSignup.prototype.getForm = function () {
	console.log('Get From');

	this.data_form = this.display.getAllFields()
}

FrictionlessSignup.prototype.getEmail = function () {

	console.log('Get Email');

	// Get email from URL
	this.data_form.email = this.display.getUrlParameter('email');
	if (this.data_form.email) {
		var selectorEmail = this.display.getSelectorWithName('email');
		this.display.setDataField(selectorEmail, this.data_form.email)
		this.emailAvailable()
	}
}

FrictionlessSignup.prototype.callApi = function () {
	console.log('Call Api');

	this.api.callServer((res) => {
		this.mapData(res)
	}, this.data_form.email)

}

FrictionlessSignup.prototype.mapData = function (data) {
	console.log('Map Data');

	this.data_form = this.mapper.mapData(this.data_form, data)

	this.prefill()
}

FrictionlessSignup.prototype.prefill = function () {
	console.log('Prefill');

	this.display.setAllFields(this.data_form)
}

FrictionlessSignup.prototype.run = function () {
	this.getForm()
	this.setEvents()
	this.getEmail()
}

module.exports = function () {
	return new FrictionlessSignup
}
