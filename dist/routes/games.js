'use strict';

var _igdbApiNode = require('igdb-api-node');

var _igdbApiNode2 = _interopRequireDefault(_igdbApiNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Game = require('../models/game');

var client = (0, _igdbApiNode2.default)(process.env.IGDB_KEY);

router.get('/findGame/:console/:game', function (req, res) {
  var searchResults = [];

  client.games({
    fields: ['id', 'name', 'cover', 'summary', 'developers', 'screenshots'],
    // fields: '*',
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

        // convert and add screenshots
        var screenShots = [];

        if (game.screenshots) {
          game.screenshots.map(function (screenshot) {
            var screenShotURL = client.image({
              cloudinary_id: screenshot.cloudinary_id }, 'screenshot_med', 'jpg');
            screenShots.push(screenShotURL);
          });
        }

        searchResults = searchResults.concat([{
          id: game.id,
          name: game.name,
          summary: game.summary,
          cover: coverImage,
          gameConsole: req.params.console,
          screenshots: screenShots
        }]);
      }
    });

    res.json(JSON.stringify(searchResults));
  }).catch(function (error) {
    throw error;
  });
});

router.get('/getAllGames/:filter', function (req, res) {
  var allGames = [];
  var regSearch = void 0;

  if (req.params.filter === 'nofilter') {
    regSearch = /[a-zA-Z0-9]/;
  } else {
    regSearch = new RegExp(req.params.filter.toLowerCase());
  }

  User.findOne({ username: req.session.user }).lean().then(function (user) {
    return Game.find({ 'owner': { $ne: user._id } }).lean().populate('owner').limit(36);
  }).then(function (games) {

    var gamesList = games.filter(function (game) {
      //strips out password info and only sends back id and username to client
      var username = game.owner.username;
      var id = game.owner._id;
      game.owner = { username: username, id: id };

      if (req.params.filter !== 'nofilter') {
        if (game.name.toLowerCase().match(regSearch)) {
          return game;
        }
      } else {
        return game;
      }
    });
    res.json(gamesList);
  });
});

router.get('/getUserGames', function (req, res) {
  User.findOne({ username: req.session.user }).populate({
    path: 'games',
    populate: {
      path: 'owner',
      model: 'users'
    }
  }).then(function (user) {
    if (user.games) {
      var userGames = Array.from(user.games);
      userGames.map(function (game) {
        var gameOwner = game.owner.username;
        game.owner = gameOwner;
      });
      res.json(userGames);
    } else {
      res.json([]);
    }
  });
});

router.post('/addGame', function (req, res) {
  User.findOne({ username: req.session.user }).then(function (user) {
    var newGame = new Game({
      screenshots: req.body[0].screenshots,
      gameConsole: req.body[0].gameConsole,
      cover: req.body[0].cover,
      summary: req.body[0].summary,
      id: req.body[0].id,
      name: req.body[0].name,
      owner: user
    });
    user.games.push(newGame);

    var gameObj = newGame.toObject();
    gameObj.mongoId = newGame._id;
    gameObj.owner = user.username;

    Promise.all([user.save(), newGame.save()]).then(function () {
      res.json([gameObj]);
    });
  }).catch(function (err) {
    throw err;
  });
});

router.post('/removeGame', function (req, res) {
  Game.findById(req.body.mongoId).then(function (game) {
    game.remove();
    User.findOne({ username: req.session.user }).populate('games').then(function (user) {
      res.json(user.games);
    });
  });
});

module.exports = router;
//# sourceMappingURL=games.js.map