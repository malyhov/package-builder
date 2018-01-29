const express = require('express');
const router = express.Router();
const dbGateway = require('../lib/db-gateway');
const scriptHelper = require('../lib/scripts-helper');


router.get('/create', function (req, res) {
  let lastBuildId = dbGateway('lastNumber', null, function(err, result) {
    let buildId = result + 1;
    res.json({ message: 'Please wait, build ' + buildId + ' creating'});
    scriptHelper('build', buildId);
  });
});

router.route('/').get(function(req, res) {
  let result = dbGateway('all', null, function(err, result) {
    if (err) console.log(err);
    if (!result) {
      res.json('No builds');
    } else {
      res.json(result);
    }
  });
});

router.route('/:buildId/deploy').post(function (req, res) {
  let buildId = req.params.buildId;
  let host = req.params.host;
  console.log('Deploy package ' + buildId + ' on ', host);
  console.log(scriptHelper('deploy'));
});

router.route('/:buildId').get(function(req, res) {
  let buildId = req.params.buildId;
  let result = dbGateway('buildInfo', buildId, function(err, result) {
    if (result == 0) res.status(404);
    res.json(result);
  });
});


module.exports = router;
