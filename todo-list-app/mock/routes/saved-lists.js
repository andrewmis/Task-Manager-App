var express = require('express');
var router = express.Router();
var cors = require('cors');
var path = require('path');
var fs = require('fs');

const db = require('../db.json');

router.use(cors())

router.get('/', function(req, res) {
  return res.json(db);
});

router.post('/', function(req, res) {
  const writePath = path.join(__dirname, '../db.json');
  const dbString = JSON.stringify(req.body, undefined, 2);

  fs.writeFile(writePath, dbString, function(err) {
    if(err) {
       return console.log(err);
    }
    res.sendStatus(200);
  });
});

module.exports = router;
