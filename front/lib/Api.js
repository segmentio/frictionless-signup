
var Api = function () {

}

Api.prototype.callServer = function (callback, email) {

	console.log('Call Server');
	var request = new XMLHttpRequest();
	var url = 'http://localhost:3000/clearbit/' + email
	var params = '';

	request.open('GET', url, true);
	request.setRequestHeader('Content-type', 'application/json');

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			res = JSON.parse(request.responseText);
			callback(res);
		} else {
			console.log('error API');
		}
	};

	request.onerror = function() {
		console.log('connexion error');
	};

	request.send();
}

Api.prototype.callClearbit = function () {


}

Api.prototype.callSegment = function () {

}

module.exports = function () {
	return new Api()
}
