var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router');
var port = process.env.PORT || 3000;
var domains = process.env.DOMAINS || '*'

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', domains);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', false);
	next();
});
app.use(bodyParser.json())
app.use(router);

app.listen(port, () => {
	console.log('Listen on port: ', port);
});
