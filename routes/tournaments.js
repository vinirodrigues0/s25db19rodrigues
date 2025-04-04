var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tournaments', { title: 'Search Results: Tournaments' });
});

module.exports = router;
