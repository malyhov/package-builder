var express = require('express');
var index = require('./routes/index');
var builds = require('./routes/builds');
var hosts = require('./routes/hosts');
var app = express();
var bodyParser = require('body-parser');

var env = require('node-env-file');
env(__dirname + '/.env');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/api/v1.0/builds', builds);
app.use('/api/v1.0/hosts', hosts);

app.listen(port);
console.log('Server start on port ' + port);

module.exports = app;
