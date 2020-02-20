var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var savedLists = require('./routes/saved-lists.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

//Put your angular dist folder here
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/samples', express.static(path.join(__dirname, 'dist')));
app.use('/saved-lists', savedLists);

module.exports = app;
