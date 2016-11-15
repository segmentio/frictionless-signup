var Promise = require('bluebird')
var request = require('request');
var _ = require('lodash');

const MADKUDU_PREDICTION_API_URL = 'https://api.madkudu.com/v1/predictions';
const MADKUDU_PREDICTION_API_KEY = process.env.MADKUDU_API_KEY;

var MadKudu = function () {};

MadKudu.prototype.getMadKuduSegment = function(clearbitData, callback) {

	var mapped_clearbit_data = _.extend({
		email: clearbitData.person ? clearbitData.person.email : 'unknown'
	}, clearbitData);

	const options = {
		url: MADKUDU_PREDICTION_API_URL,
		method: 'POST',
		json: true,
		body: mapped_clearbit_data,
		auth: {
			user: MADKUDU_PREDICTION_API_KEY
		}
	};

	request(options, function (error, response, body) {
		if (error) {
			return callback(error);
		}
		if (response.statusCode !== 200) {
			return callback(body);
		}
	  if (!error && response.statusCode === 200) {
			return callback(null, body)
	  }

	});
}


module.exports = function () {
	return new MadKudu()
}
