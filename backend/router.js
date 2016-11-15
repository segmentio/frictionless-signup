var express = require('express')
var router = express.Router()

/**
* Integrations
*/
var clearbit = require('./integrations/clearbit_router')
var madkudu = require('./integrations/madkudu_router')

/**
* Router definitions
*/

router.use('/clearbit', clearbit)
router.use('/madkudu', madkudu)


module.exports = router
