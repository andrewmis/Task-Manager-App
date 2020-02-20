var express = require('express');
var router = express.Router();
const db = require('../db.json');

router.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  return res.json(db);
});

module.exports = router;
