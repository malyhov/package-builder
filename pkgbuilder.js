var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
var port = process.env.PORT || 3000;
 
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : 'password',
  database : 'database',
});
 
var router = express.Router();
 
router.get('/', function(req, res) {
    res.json({ message: 'api!' });
});
 
router.get('/builds/create', function (req, res) {
    console.log('Здесь запускается скрипт создания билда')
    res.json({ message: 'Please wait, build NOMER_BILDA creating'});
});
 
router.route('/builds').get(function(req, res) {
    con.query("SELECT * FROM builds", function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
});
 
router.route('/builds/:build_id/deploy').post(function (req, res) {
    var build_id = req.params.build_id;
    var host = req.params.host;
    console.log('Deploy package NOMER_BILDA on ', host);
})
 
router.route('/builds/:build_id').get(function(req, res) {
  var build_id = req.params.build_id;
  con.query("SELECT * FROM builds WHERE number = ?", [build_id], function (err, result, fields) {
    if (err) throw err;
      res.json(result);
    });
});
 
app.use('/api/v1.0', router);
 
app.listen(port);
console.log('Server start on port ' + port);

