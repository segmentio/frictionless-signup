// this test requires to have the MADKUDU_API_KEY envronment variable defined to pass.

const chai = require('chai');
const expect = chai.expect;

describe('MadKudu', function () {

	describe('MadKudu Segmentation', function () {
		this.timeout(5000);

		const madkudu = require('../integrations/madkudu.js')();

		it('should return a customer fit', function (done) {

			return madkudu.getMadKuduSegment({email: 'erik@madkudu.com'}, (err, payload) => {
				if (err) {
					return done(err);
				}
				expect(payload).to.have.a.property('customer_fit');
				return done();
			});

		});
	});
});
