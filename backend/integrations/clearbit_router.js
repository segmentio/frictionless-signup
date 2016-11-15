var express = require('express')
var router = express.Router()

var clearbit = require('./clearbit')()
var segment = require('./segment')()

router.get('/:email', (req, res) => {

	var email = req.params.email

	return clearbit.getDataWithEmail(email)
	.then((data) => {
		segment.anonymous(email, data)
		res.json(data)
	})
	.catch((err) => {
		res.status(500).send(err)
	})

});

module.exports = router;
