const mysql = require('mysql');
const env = require('node-env-file');
env(__dirname + '/../.env');
const conectionParams = {
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};
const con = mysql.createConnection(conectionParams);


const db = function(command, buildId, callback) {
  switch(command) {
    case 'all':
      con.query("SELECT * FROM pkgbuilder.builds", function (err, result) {
        callback(err, result);
      });
      break;
    case 'lastNumber':
      con.query("SELECT MAX(number) from builds", function(err, result) {
        let lastNumber = parseInt(result[0]['MAX(number)']);
        console.log('Last build number: ', lastNumber);
        callback(err, lastNumber);
      });
      break;
    case 'buildStart':
      con.query("INSERT INTO builds (`project`, `number`, `created_at`, `path`, `status`) VALUES ('frontend', {}, now(), '/opt/php_builds/php_?_master.tar.gz', 'Creating')", [buildId], function (err, result) {
        callback(err, result);
      }); 
      break;
    case 'buildSuccess':
      con.query("UPDATE builds SET status = 'Ready' WHERE id = ?", [buildId], function(err, result) {
        callback(err, result);
      });
      break;
    case 'buildFault':
      con.query("UPDATE pkgbuilder.builds SET status = 'Broken' WHERE id = ?", [buildId], function(err, result) {
        callback(err, result);
      });
      break;
    case 'buildInfo':
      con.query("SELECT * FROM builds WHERE number = ?", [buildId], function (err, result) {
        callback(err, result);
      });
      break;
    default:
      let err = 'Не указано какой запрос нужно выполнить';
      callback(err, null);
  }
};

module.exports = db;
