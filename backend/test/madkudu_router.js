// this test requires to have the backend app js running to pass.

const PROXY_URL = 'http://localhost:3000/madkudu/predict';
const PORT_NUMBER = 3000;

const clearbitData = {"options":{},"person":{"id":"fc141228-b1ce-45ca-aacd-9fb7e276e0dc","name":{"fullName":"Sam Levan","givenName":"Sam","familyName":"Levan"},"email":"sam@madkudu.com","gender":"male","location":"Mountain View, CA, US","timeZone":"America/Los_Angeles","utcOffset":-8,"geo":{"city":"Mountain View","state":"California","stateCode":"CA","country":"United States","countryCode":"US","lat":37.3860517,"lng":-122.0838511},"bio":"Co-founder at MadKudu. In a love-triangle with SaaS and data science. Flamenco player when drunk. Happy (and struggling) father of four otherwise.","site":"http://madkudu.com","avatar":"https://d1ts43dypk8bqh.cloudfront.net/v1/avatars/fc141228-b1ce-45ca-aacd-9fb7e276e0dc","employment":{"domain":"madkudu.com","name":null,"title":"Co-founder & CEO","role":"ceo","seniority":"executive"},"facebook":{"handle":null},"github":{"handle":null,"id":null,"avatar":null,"company":null,"blog":null,"followers":null,"following":null},"twitter":{"handle":"anselmelevan","id":386092078,"bio":"Co-founder at MadKudu. In a love-triangle with SaaS and data science. Flamenco player when drunk. Happy (and struggling) father of four otherwise.","followers":169,"following":128,"statuses":163,"favorites":35,"location":"Mountain View, CA","site":"http://madkudu.com","avatar":"https://pbs.twimg.com/profile_images/505053235506196480/oyjJ9vHM.jpeg"},"linkedin":{"handle":null},"googleplus":{"handle":null},"aboutme":{"handle":null,"bio":null,"avatar":null},"gravatar":{"handle":"selmo07","urls":[],"avatar":"http://2.gravatar.com/avatar/19f1eee1e533a3368ca448fb68d0e212","avatars":[{"url":"http://2.gravatar.com/avatar/19f1eee1e533a3368ca448fb68d0e212","type":"thumbnail"}]},"fuzzy":true,"emailProvider":false,"indexedAt":"2016-11-10T23:16:47.520Z"},"company":{"id":"a996c075-7bf1-4324-ad26-e59e97ba4fd2","name":"MadKudu","legalName":"MadKudu Inc","domain":"madkudu.com","domainAliases":[],"url":"http://madkudu.com","site":{"url":"http://madkudu.com","title":"MadKudu | Accelerating SaaS sales with predictive analytics","h1":"Advanced lead scoring for SaaS sales","metaDescription":"Accelerating SaaS sales with predictive analytics","metaAuthor":null,"phoneNumbers":["+1 408-909-5838","+1 510-859-4520"],"emailAddresses":["hello@madkudu.com","sam@madkudu.com","mara@madkudu.com","francis@madkudu.com","erik@madkudu.com","paul@madkudu.com","yanael@madkudu.com","privacy@madkudu.com"]},"category":{"sector":"Information Technology","industryGroup":"Software & Services","industry":"Internet Software & Services","subIndustry":"Internet Software & Services"},"tags":["SAAS","B2B","Information Technology & Services","Technology","Software"],"description":"Accelerating SaaS sales with predictive analytics","foundedYear":null,"location":"Mountain View, CA 94040, USA","timeZone":"America/Los_Angeles","utcOffset":-8,"geo":{"streetNumber":null,"streetName":null,"subPremise":null,"city":"Mountain View","postalCode":"94040","state":"California","stateCode":"CA","country":"United States","countryCode":"US","lat":37.3785351,"lng":-122.086585},"logo":"https://logo.clearbit.com/madkudu.com","facebook":{"handle":"682334211804512"},"linkedin":{"handle":"company/madkudu"},"twitter":{"handle":"madkudu","id":"2558168940","bio":"Turn trials into sales. MadKudu analyzes what users do and who they are to find signals they are ready to convert or that they need help.","followers":253,"following":264,"location":"Mountain View, CA","site":"http://t.co/FQPmdhrlUD","avatar":"https://pbs.twimg.com/profile_images/664136410526429184/04OG2Ua3_normal.png"},"crunchbase":{"handle":"organization/madkudu"},"emailProvider":false,"type":"private","ticker":null,"phone":null,"metrics":{"alexaUsRank":null,"alexaGlobalRank":1753963,"googleRank":null,"employees":5,"employeesRange":"1-10","marketCap":null,"raised":118000,"annualRevenue":null},"indexedAt":"2016-10-28T23:20:24.587Z","tech":["disqus","mixpanel","optimizely","segment","wordpress","google_apps","aws_route_53","intercom","cloud_flare","nginx","mixpanel"]}};

const chai = require('chai');
const expect = chai.expect;
const request = require('request');

describe('MadKudu', function () {

	describe('MadKudu Segmentation', function () {

		it('should return a customer fit', function (done) {

			const options = {
				url: PROXY_URL,
				port: PORT_NUMBER,
				method: 'POST',
				json: true,
				body: clearbitData,
			};

			request(options, function (error, response, body) {
				if (error) {
					return done(error);
				}
				if (response.statusCode !== 200) {
					return done(body);
				}
			  if (!error && response.statusCode === 200) {
					expect(body).to.have.a.property('customer_fit');
					return done()
			  }
			});

		});
	});
});
