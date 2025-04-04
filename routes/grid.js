var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = req.query;

  if (query.rows && query.cols) {
    console.log(`rows ${query.rows}`);
    console.log(`cols ${query.cols}`);
  }

  res.render('grid', {
    title: query.rows && query.cols ? "Make a grid" : "Grid Display",
    query: query
  });
});

module.exports = router;
