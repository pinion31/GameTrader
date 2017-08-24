'use strict';

var _igdbApiNode = require('igdb-api-node');

var _igdbApiNode2 = _interopRequireDefault(_igdbApiNode);

var _User = require('./models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');
mongoose.Promise = global.Promise;


/*
var test = new User({
  'test': {
     username: 'chriscantu',
      password: 'moondog1',
      email: 'pinion31@gmail.com',
      city: 'Manor',
      state: 'TX',
      requests: {},
      games: {
        1234:
          {
            name: 'Fallout 4',
            id: 1234,
            cover: '',
            owner: 'chriscantu',
            gameconsole: 'xbox',
            summary: '',
          },
      }
  }

});

test.save(err) => {
  if (err) {throw err}
  else {
    console.log('test saved');
  }
});*/

var app = express();

var client = (0, _igdbApiNode2.default)(process.env.IGDB_KEY);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '../static')));
app.use(express.static('static'));

app.get('/findGame/:console/:game', function (req, res) {
  var searchResults = [];

  client.games({
    fields: ['id', 'name', 'cover', 'summary', 'developers', 'publishers'], // Return all fields
    search: req.params.game,
    filters: {
      'release_dates.platform-eq': req.params.console
    },
    limit: 15, // Limit to 5 results
    offset: 0 // Index offset for results
  }).then(function (response) {
    var result = response.body;

    result.forEach(function (game) {
      if (game.cover) {
        var coverImage = client.image({
          cloudinary_id: game.cover.cloudinary_id }, 'cover_small', 'jpg');

        searchResults = searchResults.concat([{
          id: game.id,
          name: game.name,
          summary: game.summary,
          cover: coverImage,
          gameConsole: req.params.console
          // developer: result.developer,
          // publisher: result.publishers,
        }]);
      }
    });

    res.json(JSON.stringify(searchResults));
  }).catch(function (error) {
    throw error;
  });
});

app.post('/addUser', function (req, res) {
  var user = new _User2.default({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    city: req.body.city,
    state: req.body.state,
    requests: {},
    games: {}
  });

  user.save(function (err) {
    if (err) {
      throw err;
    };
  });
});

app.get('/getUserGames/:user', function (req, res) {
  _User2.default.findOne({ username: '' + req.params.user }).lean().then(function (user) {
    res.json(user.games);
  });
});

app.post('/addGame', function (req, res) {

  _User2.default.findOne({ username: 'chris' }).lean().then(function (user) {
    var modifiedUser = Object.assign({}, user);

    var newGameColl = modifiedUser.games === null ? Array.from(req.body) : Array.from(modifiedUser.games).concat(req.body);

    _User2.default.findOneAndUpdate({ username: 'chris' }, { games: newGameColl }).then(function (response) {
      res.json(req.body);
    });
  });
});

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../static', 'index.html'));
});

app.listen(3000, function () {
  console.log('App started again');
});

/*
 client.platforms({
   fields: '*' , // Return all fields
  // search: req.params.game,
   limit: 50, // Limit to 5 results
   offset: 100 // Index offset for results
   }).then((response) => {
       console.dir(response);

     });*/
//# sourceMappingURL=server.js.map