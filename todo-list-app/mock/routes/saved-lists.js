var express = require('express');
var router = express.Router();
var cors = require('cors');
var path = require('path');
var fs = require('fs');

const db = require('../db.json');

router.use(cors())

router.get('/', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  return res.json(db);
});

router.post('/', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  const writePath = path.join(__dirname, '../db.json');
  const dbString = JSON.stringify(req.body);

  fs.writeFile(writePath, dbString, function(err) {
    if(err) {
       return console.log(err);
    }
    console.log('Saved all lists\nBody: ', dbString);
    res.sendStatus(200);
  });
});

module.exports = router;
