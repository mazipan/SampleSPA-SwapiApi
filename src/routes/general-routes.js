var express = require('express');
var router = express.Router();

const ROOT_URL = "http://localhost:3000";

/* HOMEPAGE */
router.get('/', function(req, res, next) {
  res.render('dashboard', {
    title: 'SPA Using Swapi API',
    root : ROOT_URL
  });
});

module.exports = router;
