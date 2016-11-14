const chai = require('chai');
const expect = chai.expect;
const Mapper = require('../lib/Mapper')

var mappedPayload = {
	firstName: 'Steve',
	lastName: 'Jobs',
	fullName: 'Steve Jobs',
	companyName: 'Apple',
	companySize: 1010,
	jobTitle: 'CEO'
}


describe('Mapper', function () {

	describe('Default mapper', function () {

		it('should return an default mapped object', function () {

			var mapper = Mapper()
			var mappedData = mapper.mapData()

			expect(mappedData).to.have.a.property('firstName')
			expect(mappedData).to.have.a.property('lastName')
			expect(mappedData).to.have.a.property('fullName')
			expect(mappedData).to.have.a.property('companyName')
			expect(mappedData).to.have.a.property('companySize')
			expect(mappedData).to.have.a.property('jobTitle')

		});
	});
});
