const express = require('express');
const router = express.Router();

router.route('/').get(function(req, res) {
  let hosts = ['dev', 'stage', 'prod'];
  res.json(hosts);
});

module.exports = router;
