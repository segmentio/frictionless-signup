var Helper = require('./Helper')

var Mapper = function () {
	this.helper = Helper()
}

Mapper.prototype.mapData = function (dataForm, dataApi) {
	var mappedData = {}

	for (var key in dataForm) {

		var sourceData = this.helper.objectByString(dataApi, key);

		mappedData[key] = (sourceData) ? sourceData : null;
	}
	return mappedData;
}

module.exports = function () {
	return new Mapper()
}
