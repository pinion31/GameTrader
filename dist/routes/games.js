'use strict';

var _igdbApiNode = require('igdb-api-node');

var _igdbApiNode2 = _interopRequireDefault(_igdbApiNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Game = require('../models/game');

var client = (0, _igdbApiNode2.default)(process.env.IGDB_KEY);

/**
 * Utilizes igdb API to retrieve game information from igdb based on game and console req params
 * sends back up to 15 games
 * input params - :console - game console filter
 *                :game - game title to search for
 * @return {Array of Objects} searchResults - obj format:
  {
    id: String,
    name: String,
    summary: String,
    cover: String,
    gameConsole: Number
    screenshots: [String, String, etc],
  }
  */
router.get('/findGame/:console/:game', function (req, res) {
  var searchResults = [];

  client.games({
    fields: ['id', 'name', 'cover', 'summary', 'developers', 'screenshots'],
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

/**
 * Retrieves all available games from other users that can be traded to current user
 * @param {String} :filter - regex used to filter out games
 * Output: {Array Of Game Objs} - obj format: {
    _id : ObjectId,
    gameConsole: Number,
    cover: String,
    summary: String,
    id: Number,
    name: String,
    owner: {username: String, id: String}
    screenshots: [String, String, String, String, String]
 }
 */

router.get('/getAllGames/:filter', function (req, res) {
  var allGames = [];
  var regSearch = void 0;

  if (req.params.filter === 'nofilter') {
    regSearch = /[a-zA-Z0-9]/;
  } else {
    regSearch = new RegExp(req.params.filter.toLowerCase());
  }

  User.findOne({ username: req.session.user }).lean().then(function (user) {
    return Game.find({ 'owner.id': { $ne: user._id } }).lean().limit(36);
  }).then(function (games) {
    var gamesList = games.filter(function (game) {
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

/**
 * Retrieves all games for current user
 * @param {String} req.session.user
 * Output: {Array Of Game Objs} - obj format: {
    _id : ObjectId,
    gameConsole: Number,
    cover: String,
    summary: String,
    id: Number,
    name: String,
    owner: String
    screenshots: [String, String, String, String, String]
 }
 */

router.get('/getUserGames', function (req, res) {
  User.findOne({ username: req.session.user }).populate('games').then(function (user) {
    if (user.games) {
      var userGames = Array.from(user.games);
      userGames.map(function (game) {
        var gameOwner = game.owner.username;
        game.owner = gameOwner; // changes game.owner from obj to string
      });
      res.json(userGames);
    } else {
      res.json([]);
    }
  });
});

/**
 * Adds Game to current user lib
 * @param {String} req.session.user
 * Input (from req.body) {Array with one Obj} -
 * obj format : {
    screenshots: [String, String, String, String, String]
    gameConsole: Number,
    cover: String,
    summary: String,
    id: Number,
    name: String,
    owner: String
  }

 * Output: {Array with one obj} -
  * obj format : {
    screenshots: [String, String, String, String, String]
    gameConsole: Number,
    cover: String,
    summary: String,
    id: Number,
    mongoId: Number,
    name: String,
    owner: {username: String, id: String}
 }*/

router.post('/addGame', function (req, res) {
  User.findOne({ username: req.session.user }).then(function (user) {
    var newGame = new Game({
      screenshots: req.body[0].screenshots,
      gameConsole: req.body[0].gameConsole,
      cover: req.body[0].cover,
      summary: req.body[0].summary,
      id: req.body[0].id,
      name: req.body[0].name,
      owner: { username: user.username, id: user._id }
    });

    user.games.push(newGame);

    var gameObj = newGame.toObject();
    gameObj.mongoId = newGame._id;
    // gameObj.owner = user.username;

    Promise.all([newGame.save(), user.save()]).then(function () {
      res.json([gameObj]);
    });
  }).catch(function (err) {
    throw err;
  });
});

/**
 * Removes game from user lib
 * @param {String} (from req.body)- req.body.mongoId
 * Output: {Array of Objs} - returns Array of user games minus removed Game
 */
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