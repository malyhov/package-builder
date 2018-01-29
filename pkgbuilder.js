const express = require('express');
const index = require('./routes/index');
const builds = require('./routes/builds');
const hosts = require('./routes/hosts');
const app = express();
const bodyParser = require('body-parser');

const env = require('node-env-file');
env(__dirname + '/.env');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/api/v1.0/builds', builds);
app.use('/api/v1.0/hosts', hosts);

app.listen(port);
console.log('Server start on port ' + port);

module.exports = app;
