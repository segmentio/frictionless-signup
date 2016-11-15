
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

	// On event "focus out", get email field + value
	addEventListener('email focusout', () => {
		console.log('Email event focusout');

		var selectorEmail = this.display.getSelectorWithName('email')
		var email = this.display.getDataField(selectorEmail)

		this.data_form.email = email
		this.emailAvailable()
	})

}

// When email available, check if valid
FrictionlessSignup.prototype.emailAvailable = function () {

	if (this.helper.checkEmail(this.data_form.email) === true) {
		this.display.dispatchEventGlobal('email valid')
		this.callApi()
	} else {
		this.display.dispatchEventGlobal('email invalid')
	}
}

// Get all fields from form
FrictionlessSignup.prototype.getForm = function () {
	console.log('Get Form');

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

	this.api.callServer(this.data_form.email,
		(res) => {
		this.mapData(res)
		this.show_request_demo_to_VIPs(res)
	})

}

FrictionlessSignup.prototype.mapData = function (data) {
	console.log('Map Data');

	this.data_form = this.mapper.mapData(this.data_form, data)

	this.prefill()
}

FrictionlessSignup.prototype.show_request_demo_to_VIPs = function (data) {
	console.log('Get customer fit segment from MadKudu');
	// make an API call to your MadKudu api proxy
	this.api.callMadKudu(data, (err, res) => {
		if (err) {
			return console.error('Error fetching customer fit from MadKudu: ' + err);
		}
		// display "request a demo" section if customer fit is good or very good
		if (res.customer_fit && ['good', 'very good'].indexOf(res.customer_fit.segment) > -1) {
			console.log('Show request demo section.');
			this.display.show_request_demo();
		}
		else {
			console.log('Hide request demo section.');
			this.display.hide_request_demo();
		}
	});
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
