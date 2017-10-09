'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Game = require('../models/game');

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
  var gameTradee = traderGameToReceive.owner;
  var gameTrader = tradeeGameToReceive.owner;

  var setTradeeRequestToAccepted = function setTradeeRequestToAccepted(requests) {
    var newRequests = Array.from(requests);

    newRequests.map(function (request) {
      if (request.requestedGame.id === traderGameToReceive.id && request.offeredGame.id === tradeeGameToReceive.id) {
        request.status = 'Accepted';
      }
    });

    return newRequests;
  };

  var deleteTraderRequest = function deleteTraderRequest(requests) {
    var newRequests = requests.filter(function (request) {
      if (request.requestedGame.id != tradeeGameToReceive.id && request.offeredGame.id != traderGameToReceive.id) {
        return request;
      }
    });

    return newRequests;
  };

  // perform exchange on trader library
  User.find({ '_id': { $in: [gameTradee, gameTrader] } }).populate({
    path: 'games',
    populate: {
      path: 'owner',
      model: 'users'
    }
  }).then(function (trader) {
    var gameKey0 = void 0;
    var gameKey1 = void 0;
    Array.from(trader[0].games).map(function (game, key) {
      if (game._id.toString() === tradeeGameToReceive._id.toString()) {
        // trader[0].games[key] is still a user model so can't use spread operator
        // to transfer properties
        trader[0].games[key].name = traderGameToReceive.name;
        trader[0].games[key].gameConsole = traderGameToReceive.gameConsole;
        trader[0].games[key].summary = traderGameToReceive.summary;
        trader[0].games[key].id = traderGameToReceive.id;
        trader[0].games[key].cover = traderGameToReceive.cover;
        trader[0].games[key].screenshots = traderGameToReceive.screenshots;
        gameKey0 = key;
      }
    });

    Array.from(trader[1].games).map(function (game, key) {
      if (game._id.toString() === traderGameToReceive._id.toString()) {
        trader[1].games[key].name = tradeeGameToReceive.name;
        trader[1].games[key].gameConsole = tradeeGameToReceive.gameConsole;
        trader[1].games[key].summary = tradeeGameToReceive.summary;
        trader[1].games[key].id = tradeeGameToReceive.id;
        trader[1].games[key].cover = tradeeGameToReceive.cover;
        trader[1].games[key].screenshots = tradeeGameToReceive.screenshots;
        gameKey1 = key;
      }
    });

    if (trader[0]._id.toString() === traderGameToReceive.owner) {

      trader[1].requests = setTradeeRequestToAccepted(trader[1].requests);
      trader[0].requests = deleteTraderRequest(trader[0].requests);

      Promise.all([trader[1].games[gameKey1].save(), trader[0].games[gameKey0].save(), trader[1].save(), trader[0].save()]).then(function () {
        res.json(trader[0].requests);
      });
    } else {
      trader[0].requests = setTradeeRequestToAccepted(trader[0].requests);
      trader[1].requests = deleteTraderRequest(trader[1].requests);

      Promise.all([trader[1].games[gameKey1].save(), trader[0].games[gameKey0].save(), trader[1].save(), trader[0].save()]).then(function () {
        res.json(trader[1].requests);
      });
    }
  });
});

module.exports = router;
//# sourceMappingURL=trades.js.map