/**
* Display file contain all interactions with the view.
* I/O file
*/

var Display = function () {
	this.frictionlessSelectos = {}
}

Display.prototype.getUrlParameter = function (sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
}

Display.prototype.getDataField = function (selector) {

	var data = this.fieldIsEmpty(selector) === true ? null : selector.value

	return data
}

Display.prototype.getKeyField = function (selector) {

	var key = selector.getAttribute('frictionless')

	return key
}

Display.prototype.getKeyFieldMapping = function (selector) {

	var key = selector.getAttribute('frictionless-mapping')

	return key
}

Display.prototype.getSelectorWithName = function (name) {

	for (var i = 0; i < this.frictionlessSelectos.length; i++) {

		var selector = this.frictionlessSelectos[i];
		var key = selector.getAttribute('frictionless')

		if (key === name)
			return selector
	}

	return null
}

Display.prototype.customMapper = function (key, value, selector) {
	var res = null;

	if (typeof window[key] === 'function')
		res = window[key](value, selector)
	else
		console.log('You need to create a function in the main file with this name: ', key);
	return res
}

Display.prototype.setDataField = function (selector, value) {

	var mapping = this.getKeyFieldMapping(selector)

	if (mapping) {
		selector.value = this.customMapper(mapping, value, selector);
	}
	else if (this.fieldIsEmpty(selector) === true) {
		selector.value = value
	}
}

Display.prototype.fieldIsEmpty = function (selector) {
	var empty = true;

	if (selector.value)
		empty = selector.value.length === 0 ? true : false
	return empty
}

/**
* Get all fields on the document with selector frictionless and return an object
*/

Display.prototype.getAllFields = function () {

	var frictionlessData = {};

	this.frictionlessSelectos = document.querySelectorAll('[frictionless]')

	for (var i = 0; i < this.frictionlessSelectos.length; i++) {

		var key = this.getKeyField(this.frictionlessSelectos[i])
		var data = this.getDataField(this.frictionlessSelectos[i])

		frictionlessData[key] = data;
	}

	return frictionlessData
}

/**
*
*/

Display.prototype.setAllFields = function (data_form) {

	for (var i = 0; i < this.frictionlessSelectos.length; i++) {

		var selector = this.frictionlessSelectos[i]
		var key = this.getKeyField(selector)
		var data = this.getDataField(selector)

		this.setDataField(selector, data_form[key])

	}
}

/**
* Add on all fields the onfocus emmitter
*/

Display.prototype.setAllEmitter = function () {

	for (var i = 0; i < this.frictionlessSelectos.length; i++) {

		var field = this.frictionlessSelectos[i];

		this.setEmitter(field);
	}
};


/**
* Add an listener on all frictionlessSelectos, to autofill when the data is available
*/

Display.prototype.setListenerSelector = function (selector, name, func) {
	selector.addEventListener(name, func)
}

/**
* Create and dispatch an event touht the application
*/

Display.prototype.dispatchEventGlobal = function (name) {

	var event = new Event(name)

	dispatchEvent(event)
}

/**
* Send an event when the user focus out, with name 'focusout'
*/

Display.prototype.setEmitter = function (selector) {

	var name = this.getKeyField(selector)
	var self = this;

	this.setListenerSelector(selector, 'focusout', () => {
		this.dispatchEventGlobal(name + ' ' + 'focusout')
	})
}

module.exports = function () {
	return new Display
}
