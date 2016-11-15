var express = require('express')
var router = express.Router()

var madkudu = require('./madkudu')()

router.post('/predict', (req, res) => {

	madkudu.getMadKuduSegment(req.body, (err, payload) => {
		if (err) {
			res.status(500).send(err)
		}
		res.json(payload);
	});

});

module.exports = router;
