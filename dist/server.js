'use strict';

var _igdbApiNode = require('igdb-api-node');

var _igdbApiNode2 = _interopRequireDefault(_igdbApiNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var users = require('./routes/users');
var trades = require('./routes/trades');
var games = require('./routes/games');
var requests = require('./routes/requests');

mongoose.connect('mongodb://localhost/local');
mongoose.Promise = global.Promise;

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var db = mongoose.connection;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('static'));

app.use(session({
  secret: 'noodles',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 2, httpOnly: false }, // 2 days
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
}));

function ensureAuthenicated(req, res, next) {
  if (res.session != undefined) {
    return next();
  }

  res.redirect('/');
}

app.use('/users', users);
//app.use('/', ensureAuthenicated);
app.use('/games', games);
app.use('/trades', trades);
app.use('/requests', requests);

app.get('*', function (req, res) {
  if (res.session === undefined) {
    res.redirect('/');
  }

  res.sendFile(path.resolve(__dirname, '../static', 'index.html'));
});

app.listen(3000, function () {
  console.log('App started again');
});
//# sourceMappingURL=server.js.map