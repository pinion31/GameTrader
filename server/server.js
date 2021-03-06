'use strict';

const express = require('express');
const path = require('path');
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');
const trades = require('./routes/trades');
const games = require('./routes/games');
const requests = require('./routes/requests');

//mongoose.connect('mongodb://localhost/local');
mongoose.connect(process.env.MONGOLAB_URI);
mongoose.Promise = global.Promise;

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const db = mongoose.connection;

const app = express();

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('static'));

// create new session
app.use(session({
  secret: 'noodles',
  saveUninitialized: true,
  resave: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2, httpOnly: false}, // 2 days
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));

/**
  set routes for actions
*/
app.use('/users', users);
app.use('/games', games);
app.use('/trades', trades);
app.use('/requests', requests);

app.post('/logoutUser', (req, res) => {
  req.session.destroy(() => {
    // setTimeout(5, () => db.close());
    return res.send('session ended');
  });
});

app.get('*', (req, res) => {

  // makes sure user is logged into before directing
  // to dashboard
  if (res.session === undefined) {
    return res.redirect('/');
  }

  res.sendFile(path.resolve(__dirname, '../static', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('App started again');
});
