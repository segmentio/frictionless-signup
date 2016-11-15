/**
* Display file contain all interactions with the view.
* I/O file
*/

var Display = function () {
	this.frictionlessSelectors = {}
}

/*
* Get the email in params
*/

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

/*
* Get data in a field
*/

Display.prototype.getDataField = function (selector) {

	var data = this.fieldIsEmpty(selector) === true ? null : selector.value

	return data
}

/*
* Get the key (clearbit endpoint wanted) in the data attributes
*/

Display.prototype.getKeyField = function (selector) {

	var key = selector.getAttribute('frictionless')

	return key
}

/*
* Get the mapping key in the data attributes
*/

Display.prototype.getKeyFieldMapping = function (selector) {

	var key = selector.getAttribute('frictionless-mapping')

	return key
}

/*
* Search a selector with a specific key/name
*/

Display.prototype.getSelectorWithName = function (name) {

	for (var i = 0; i < this.frictionlessSelectors.length; i++) {

		var selector = this.frictionlessSelectors[i];
		var key = selector.getAttribute('frictionless')

		if (key === name)
			return selector
	}

	return null
}

/*
* Get a custom mapping key
*/

Display.prototype.customMapper = function (key, value, selector) {
	var res = null;

	if (typeof window[key] === 'function')
		res = window[key](value, selector)
	else
		console.log('You need to create a function in the main file with this name: ', key);
	return res
}

/*
* Show the request demo section
*/

Display.prototype.show_request_demo = function () {
	var selector = this.getSelectorWithName('requestDemoSection');
	if (selector && selector.style) {
		selector.style.display = 'inline';
	}
}

/*
* Hide the request demo section
*/

Display.prototype.hide_request_demo = function () {
	var selector = this.getSelectorWithName('requestDemoSection');
	if (selector && selector.style) {
		selector.style.display = 'none';
	}
}


/*
* Set the field value according to mapper or if field is empty
*/

Display.prototype.setDataField = function (selector, value) {

	var mapping = this.getKeyFieldMapping(selector)

	if (mapping) {
		selector.value = this.customMapper(mapping, value, selector);
	}
	else if (this.fieldIsEmpty(selector) === true) {
		selector.value = value
	}
}

/**
* Check if field is empty (returns bool)
*/

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

	this.frictionlessSelectors = document.querySelectorAll('[frictionless]')

	for (var i = 0; i < this.frictionlessSelectors.length; i++) {

		var key = this.getKeyField(this.frictionlessSelectors[i])
		var data = this.getDataField(this.frictionlessSelectors[i])

		frictionlessData[key] = data;
	}

	return frictionlessData
}

/**
*
*/

Display.prototype.setAllFields = function (data_form) {

	for (var i = 0; i < this.frictionlessSelectors.length; i++) {

		var selector = this.frictionlessSelectors[i]
		var key = this.getKeyField(selector)
		var data = this.getDataField(selector)

		this.setDataField(selector, data_form[key])

	}
}

/**
* Add on all fields the onfocus emmitter
*/

Display.prototype.setAllEmitter = function () {

	for (var i = 0; i < this.frictionlessSelectors.length; i++) {

		var field = this.frictionlessSelectors[i];

		this.setEmitter(field);
	}
};

/**
* Add an listener on all frictionlessSelectors, to autofill when the data is available
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
