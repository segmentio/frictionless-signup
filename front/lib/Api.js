const CLEARBIT_ENRICHMENT_API_URL = 'http://localhost:3000/clearbit/';
const MADKUDU_PREDICTION_API_URL = 'http://localhost:3000/madkudu/predict';

var Api = function () {

}

Api.prototype.callServer = function (email, callback) {

	console.log('Call Server');
	var request = new XMLHttpRequest();
	var url = CLEARBIT_ENRICHMENT_API_URL + email
	var params = '';

	request.open('GET', url, true);
	request.setRequestHeader('Content-type', 'application/json');

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var res = JSON.parse(request.responseText);
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

Api.prototype.callMadKudu = function (lead_information, callback) {

	console.log('Call MadKudu API');
	var request = new XMLHttpRequest();

	const post_data = JSON.stringify(lead_information);

	request.open('POST', MADKUDU_PREDICTION_API_URL, true);
	request.setRequestHeader('Content-type', 'application/json');

	request.onreadystatechange = function () {
	    if (request.readyState == 4 && request.status == 200) {
				var json_response = null;
				try {
					json_response = JSON.parse(request.responseText)
				}
				catch(err) {
					return callback('Could not read MadKudu\'s API response.')
				}
				callback(null, json_response);
	    }
	}

	request.onerror = function(err) {
		console.log('Connection error while contacting MadKudu api.');
		callback(err);
	};

	request.send(post_data);
}

module.exports = function () {
	return new Api()
}
