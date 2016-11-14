const chai = require('chai');
const expect = chai.expect;
const Api = require('../lib/Api')

var clearbitPayload = {
	firstName: 'Steve',
	lastName: 'Jobs',
	fullName: 'Steve Jobs',
	companyName: 'Apple',
	companySize: 1010,
	jobTitle: 'CEO'
}

describe('Api', function () {


	describe('Clearbit api call', function () {

		var api = Api()

		it('should return an payload mapped', function () {

			var payload = api.callClearbit()

			expect(payload).to.have.a.property('firstName')
			expect(payload).to.have.a.property('lastName')
			expect(payload).to.have.a.property('fullName')
			expect(payload).to.have.a.property('companyName')
			expect(payload).to.have.a.property('companySize')
			expect(payload).to.have.a.property('jobTitle')

		});
	});
});
