const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const Display = require('../lib/Display')

describe('Display', function () {

	describe('fieldIsEmpty', function () {

		var display = Display()

		it('should return false', function () {

			var selector = { value: '42 is the answer' }

			expect(display.fieldIsEmpty(selector)).to.be.false

		});

		it('should return true', function () {
			var selector = { value: '' }

			expect(display.fieldIsEmpty(selector)).to.be.true

		});
	});

	describe('setDataField', function () {


		it('should data exist in the object', function () {
			var display = Display()
			var selector = { value: '' }

			display.setDataField(selector, '42')

			expect(selector.value).to.have.string('42')
		});
	});

	describe('setListener', function () {

		it('should be an listener', function () {

			

		});
	});

	describe('getUrlParameter', function () {
		var sandbox


		// beforeEach(function () {
		// 	sandbox = sinon.sandbox.create()
		// 	console.log(sandbox);
		// 	// sandbox.stub(window.location, 'search')
		// })

		// afterEach(function () {
		// 	sandbox.restore()
		// })

		// it('should return an email', function () {
		// 	var display = Display()
		// 	var search = {
		// 		location: {
		// 			search: 'https://segment.com/signup?email=foo@bar.com'
		// 			}
		// 		}
		//
		// 	// obj['location']['search'] = 'https://segment.com/signup?email=foo@bar.com'
		//
		// 	sinon.stub(display.window, 'search')
		//
		// 	// search = function () {
		// 	// 	return 'foob@bar.com'
		// 	// }
		// 	// location = function () {
		// 	// 	return 'foo@bar.com'
		// 	// }
		//
		//
		// 	var email = display.getUrlParameter('email');
		// 	console.log(email);
		// 	//
		// 	// sinon.assert.calledOnce(location, 'search');
		// 	// expect(email).to.be.a.string
		// 	// expect(email).to.be.equal('foo@bar.com')
		//
		// 	sinon
		// });
	});
});
