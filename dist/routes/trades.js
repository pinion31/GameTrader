'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.post('/declineTrade', function (req, res) {
  var traderGameToReceive = Object.assign({}, req.body.offeredGame); // from tradee to trader
  var tradeeGameToReceive = Object.assign({}, req.body.requestedGame); // from trader to tradee

  User.findOne({ username: req.session.user }).lean().then(function (user) {
    var userRequests = user.requests.filter(function (request) {
      if (request.requestedGame.id != req.body.requestedGame.id && request.offeredGame.id != req.body.offeredGame.id) {
        return request;
      }
    });

    User.findOneAndUpdate({ username: req.session.user }, { requests: userRequests }).then(function () {
      User.findOne({ username: req.body.requestedGame.owner }).lean().then(function (owner) {
        var ownerRequests = Array.from(owner.requests);
        ownerRequests.map(function (request) {
          if (request.requestedGame.id === traderGameToReceive.id && request.offeredGame.id === tradeeGameToReceive.id) {
            request.status = req.body.type;
          }
        });

        User.findOneAndUpdate({ username: req.body.requestedGame.owner }, { requests: ownerRequests }).then(function () {
          res.json(userRequests);
        });
      });
    });
  });
});

// complete trade for trader after tradee accepts trade
router.post('/completeTrade', function (req, res) {
  var traderGameToReceive = Object.assign({}, req.body.offeredGame); // from tradee to trader
  var tradeeGameToReceive = Object.assign({}, req.body.requestedGame); // from trader to tradee
  var gameTradee = req.session.user;
  var gameTrader = req.body.requestedGame.owner;

  // perform exchange on trader library
  User.findOne({ username: gameTrader }).lean().then(function (trader) {
    var traderGames = Array.from(trader.games);
    var traderRequests = Array.from(trader.requests);

    // remove game from trader's library
    traderGames = traderGames.filter(function (game) {
      if (game.id != tradeeGameToReceive.id) {
        return game;
      }
    });

    // change status for request to accept
    traderRequests.map(function (request) {
      if (request.requestedGame.id === traderGameToReceive.id && request.offeredGame.id === tradeeGameToReceive.id) {
        request.status = 'Accepted';
      }
    });

    // change owner of game to new owner
    traderGameToReceive.owner = gameTrader;

    // add game to trader's library
    traderGames = traderGames.concat([traderGameToReceive]);

    User.findOneAndUpdate({ username: gameTrader }, { games: traderGames, requests: traderRequests }).then(function () {
      // perform exchange on tradee library
      User.findOne({ username: gameTradee }).lean().then(function (tradee) {
        var tradeeGames = Array.from(tradee.games);
        // remove game from tradee's library
        tradeeGames = tradeeGames.filter(function (game) {
          if (game.id != traderGameToReceive.id) {
            return game;
          }
        });

        // change owner of game to new owner
        tradeeGameToReceive.owner = gameTradee;

        // add game to tradee's library
        tradeeGames = tradeeGames.concat([tradeeGameToReceive]);

        User.findOneAndUpdate({ username: gameTradee }, { games: tradeeGames }).then(function () {
          res.json(tradeeGames);
        });
      });
    });
  });
});

module.exports = router;
//# sourceMappingURL=trades.js.map