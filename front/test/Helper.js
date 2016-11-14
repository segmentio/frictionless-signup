const chai = require('chai');
const expect = chai.expect;


describe('Helper', function () {

	const Helper = require('../lib/Helper')
	var helper = Helper();

	it ('should valid an email ', function () {

		var email = 'foo@bar.com'

		expect(helper.checkEmail(email)).to.be.true;

	});


});
