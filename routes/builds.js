const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const env = require('node-env-file');
env(__dirname + '/../.env');
const port = process.env.PORT || 3000;

let conectionParams = {};
conectionParams.host = process.env.HOST;
conectionParams.user = process.env.USERNAME;
conectionParams.password = process.env.PASSWORD;
conectionParams.database = process.env.DATABASE;
let con = mysql.createConnection(conectionParams);

let exec = require('child_process').exec;
let child;
let log4js = require('log4js');
let logger = log4js.getLogger();
logger.level = 'off';


router.get('/create', function (req, res) {
  let build_id;
  con.query("select number from builds order by number desc limit 1", function(err, result, fields) {
    if (err) throw err;
    // TODO: new build number = last number + 1
    // TODO: let newBuildId = result.number + 1
    let newBuildId = 101
    logger.debug('new build number: ' + newBuildId);
  });
  // TODO: Запуск создания билда
  child = exec("vmstat 5 5", function (err, stdout, stderr) {
    logger.debug('stdout: ' + stdout);
    logger.debug('stderr: ' + stderr);
    if (err !== null) console.log('exec error: ' + err);
  });
  res.json({ message: 'Please wait, build ' + build_id + ' creating'});
});

router.route('/').get(function(req, res) {
    con.query("SELECT * FROM builds", function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
});

router.route('/:build_id/deploy').post(function (req, res) {
    let build_id = req.params.build_id;
    let host = req.params.host;
    console.log('Deploy package ' + build_id + ' on ', host);
    // TODO: Запуск плейбука для деплоя
    child = exec("vmstat 5 5", function (err, stdout, stderr) {
      logger.debug('stdout: ' + stdout);
      logger.debug('stderr: ' + stderr);
      if (err !== null) console.log('exec error: ' + err);
    });
});

router.route('/:build_id').get(function(req, res) {
  let build_id = req.params.build_id;
  con.query("SELECT * FROM builds WHERE number = ?", [build_id], function (err, result, fields) {
    if (err) throw err;
    if (result == 0) res.status(404);
    res.json(result);
    });
});


module.exports = router;
