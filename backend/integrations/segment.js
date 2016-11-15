var Promise = require('bluebird')
var Analytics = require('analytics-node');
var analytics = new Analytics(process.env.SEGMENT_API_KEY);

var Segment = function () {

}

Segment.prototype.mapping = function (data) {
	return new Promise((resolve, reject) => {
		resolve(data)
	})
}

Segment.prototype.anonymous = function(email, data) {
	return analytics.identify({
		userId: email,
		traits: data
		});
}

module.exports = function () {
	return new Segment()
}
