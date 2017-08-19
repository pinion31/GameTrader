'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '../static')));
app.use(express.static('static'));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../static', 'index.html'));
});

app.listen(3000, function () {
  console.log('App started again');
});
//# sourceMappingURL=server.js.map