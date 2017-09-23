'use strict';

var _igdbApiNode = require('igdb-api-node');

var _igdbApiNode2 = _interopRequireDefault(_igdbApiNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var User = require('../models/user');

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

  User.find({}).lean().then(function (users) {
    users.forEach(function (user) {
      if (user.games.length > 0) {
        if (user.games[0].owner != req.session.user) {
          var userGame = user.games.filter(function (game) {
            if (game.name.toLowerCase().match(regSearch)) {
              return game;
            }
          });

          allGames = allGames.concat(userGame);
        }
      }
    });

    res.json(allGames);
  }).catch(function (err) {
    throw err;
  });
});

router.get('/getUserGames', function (req, res) {
  User.findOne({ username: req.session.user }).lean().then(function (user) {
    if (user.games) {
      res.json(user.games);
    } else {
      res.json([]);
    }
  });
});

router.post('/addGame', function (req, res) {
  var gametoAdd = Array.from(req.body);
  gametoAdd[0].owner = req.session.user; // append owner info to added game

  User.findOneAndUpdate({ username: req.session.user }, { $push: { games: gametoAdd[0] } }).then(function () {
    res.json(req.body);
  });
});

router.post('/removeGame', function (req, res) {
  User.findOne({ username: req.session.user }).lean().then(function (user) {
    var modifiedUser = Object.assign({}, user);

    var newGameColl = Array.from(modifiedUser.games).filter(function (game) {
      if (req.body.id != game.id) {
        return game;
      }
    });

    User.findOneAndUpdate({ username: req.session.user }, { games: newGameColl }).then(function () {
      res.json(newGameColl);
    });
  });
});

module.exports = router;
//# sourceMappingURL=games.js.map