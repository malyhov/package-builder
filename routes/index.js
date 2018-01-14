const express = require('express');
const router = express.Router();

router.route('/').get(function(req, res) {
  res.json('Package Builder API v1.0');
});

module.exports = router;
