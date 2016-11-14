var Helper = function () {

}

Helper.prototype.checkEmail = function (email) {

	var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return pattern.test(email);
}

Helper.prototype.objectByString = function (object, string) {
	try {
		string = string.replace(/\[(\w+)\]/g, '.$1');
		string = string.replace(/^\./, '');

		var attribute = string.split('.');

		for (var i = 0, n = attribute.length; i < n; ++i) {

			var k = attribute[i];

			if (k in object) {
				object = object[k];
			} else {
				return;
			}
		}

		return object;

	} catch (e) {
		return;
	}
}

module.exports = function () {
	return new Helper();
}
