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

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var db = mongoose.connection;


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

app.use(session({
  secret: 'noodles',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 2, httpOnly: false }, // 2 days
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
}));

//**** USER ACTIONS ***///
app.post('/loginUser', function (req, res) {
  if (typeof req.session.user === 'undefined') {
    req.session.user = req.body.username;
    console.log('resaving session');
    req.session.save(function (err) {

      if (err) {
        console.log('error with session');
      } else {
        res.json({ redirect: '/' });
      }
    });
  } else if (req.session.user != req.body.username) {
    req.session.user = req.body.username;
    req.session.save(function (err) {
      if (err) {
        console.log('error with session');
      } else {
        res.json({ redirect: '/' });
      }
    });
    /*req.session.destroy((err) => {
      if (err) {throw err};
         req.session.user = req.body.username;
        console.log('resaving session with new user');
        req.session.save((err) => {
          if(err){
            console.log('error with session');
          }
          else {
            res.json({redirect: '/'});
          }
        });
     });*/
  } else {
    res.json({ redirect: '/' });
  }

  console.dir(req.session);

  //console.log('redirecting...');
  //res.json({redirect: '/'});
  //res.redirect('/');


  /*req.session.user = req.body.username;
  req.session.save((err) => {
    if(err){
      console.log('error with session');
    }
  });*/
  //res.json(req.session);
});

app.post('/addUser', function (req, res) {
  var user = new _User2.default({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    city: req.body.city,
    state: req.body.state,
    requests: null,
    games: null
  });

  user.save(function (err) {
    if (err) {
      throw err;
    };
  });
});

//** GAME ACTIONS ***//

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

app.get('/getAllGames', function (req, res) {
  var allGames = [];

  _User2.default.find({}).lean().then(function (users) {
    users.forEach(function (user) {
      if (user.games) {
        allGames = allGames.concat(user.games);
      }
    });

    res.json(allGames);
  }).catch(function (err) {
    throw err;
  });
});

app.get('/getUserGames/:user', function (req, res) {
  _User2.default.findOne({ username: req.session.user }).lean().then(function (user) {
    if (user.games) {
      res.json(user.games);
    } else {
      res.json([]);
    }
  });
});

app.post('/addGame/:user', function (req, res) {
  _User2.default.findOne({ username: req.session.user }).lean().then(function (user) {
    var modifiedUser = Object.assign({}, user);

    var gametoAdd = Array.from(req.body);
    gametoAdd[0].owner = req.session.user; //append owner info to added game

    var newGameColl = modifiedUser.games === null ? gametoAdd : Array.from(modifiedUser.games).concat(gametoAdd);

    _User2.default.findOneAndUpdate({ username: req.session.user }, { games: newGameColl }).then(function () {
      res.json(req.body);
    });
  });
});

app.post('/removeGame/:user', function (req, res) {
  _User2.default.findOne({ username: req.session.user }).lean().then(function (user) {
    var modifiedUser = Object.assign({}, user);

    var newGameColl = Array.from(modifiedUser.games).filter(function (game) {
      if (req.body.id != game.id) {
        return game;
      }
    });

    _User2.default.findOneAndUpdate({ username: req.session.user }, { games: newGameColl }).then(function () {
      res.json(newGameColl);
    });
  });
});

//**** REQUEST ACTIONS *****/////

app.post('/addRequest/:user', function (req, res) {
  _User2.default.findOne({ username: req.session.user }).lean().then(function (user) {
    var retrievedUser = Object.assign({}, user);
    var userRequests = retrievedUser.requests === null ? Array.from(req.body) : Array.from(retrievedUser.requests).concat(req.body);

    _User2.default.findOneAndUpdate({ username: req.session.user }, { requests: userRequests }).then(function () {

      var incomingRequest = Object.assign({}, req.body[0]);
      //create request for recipient of trade offer and append to their requests
      var newRequest = {
        status: 'Pending',
        requestedGame: incomingRequest.offeredGame,
        offeredGame: incomingRequest.requestedGame,
        path: 'incoming'
      };

      console.log('req.session.user = ' + req.session.user);
      //console.log('req.body.requestedGame.owner = ' + req.body.requestedGame.owner);
      console.dir(incomingRequest);

      // find target owner of requested game
      _User2.default.findOne({ username: incomingRequest.requestedGame.owner }).lean().then(function (user) {
        var targetUser = Object.assign({}, user);

        // add request
        var targetUserRequests = targetUser.requests === null ? Array.from([newRequest]) : Array.from(targetUser.requests).concat([newRequest]);
        // console.dir(targetUserRequests);
        // update target owner's request
        _User2.default.findOneAndUpdate({ username: incomingRequest.requestedGame.owner }, { requests: targetUserRequests }).then(function () {
          //console.dir(targetUserRequests);
          res.json(req.body);
        });
      });
    });
  });
});

app.post('/removeRequest/:user', function (req, res) {
  _User2.default.findOne({ username: req.session.user }).lean().then(function (user) {
    var retrievedUser = Object.assign({}, user);
    console.dir(req.body);
    var userRequests = user.requests.filter(function (request) {
      console.dir(request);
      if (request.requestedGame.id != req.body.requestedGameId && request.offeredGame.id != req.body.offeredGameId) {
        return request;
      }
    });

    _User2.default.findOneAndUpdate({ username: req.session.user }, { requests: userRequests }).then(function () {
      res.json(userRequests);
    });
  });
});

app.get('/getUserRequests/:user', function (req, res) {
  _User2.default.findOne({ username: req.session.user }).lean().then(function (user) {
    if (user.requests) {
      res.json(user.requests);
    } else {
      res.json([]);
    }
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