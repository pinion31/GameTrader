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
      if (request.requestedGame.id != req.body.requestedGame.id || request.offeredGame.id != req.body.offeredGame.id) {
        return request;
      }
    });

    User.findOneAndUpdate({ username: req.session.user }, { requests: userRequests }).then(function () {
      User.findOne({ username: req.body.requestedGame.owner.username }).lean().then(function (owner) {
        var ownerRequests = Array.from(owner.requests);
        ownerRequests.map(function (request) {
          if (request.requestedGame.id === traderGameToReceive.id && request.offeredGame.id === tradeeGameToReceive.id) {
            request.status = req.body.type;
          }
        });

        User.findOneAndUpdate({ username: req.body.requestedGame.owner.username }, { requests: ownerRequests }).then(function () {
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
  var gameKeys = { tradee: -1, trader: -1 };

  var setTraderRequestToAccepted = function setTraderRequestToAccepted(requests) {
    var newRequests = Array.from(requests);

    newRequests.map(function (request) {
      if (request.requestedGame.id === traderGameToReceive.id && request.offeredGame.id === tradeeGameToReceive.id) {
        request.status = 'Accepted';
      }
    });

    return newRequests;
  };

  var deleteTradeeRequest = function deleteTradeeRequest(requests) {
    var newRequests = requests.filter(function (request) {
      if (request.requestedGame.id != tradeeGameToReceive.id && request.offeredGame.id != traderGameToReceive.id) {
        return request;
      }
    });

    return newRequests;
  };

  var copyProps = function copyProps(trader, gameToGive, gameToReceive, traderString) {
    Array.from(trader.games).map(function (game, key) {
      if (game.id.toString() === gameToGive.id.toString()) {
        trader.games[key].name = gameToReceive.name;
        trader.games[key].gameConsole = gameToReceive.gameConsole;
        trader.games[key].summary = gameToReceive.summary;
        trader.games[key].id = gameToReceive.id;
        trader.games[key].cover = gameToReceive.cover;
        trader.games[key].screenshots = gameToReceive.screenshots;
        gameKeys[traderString] = key;
      }
    });
  };

  // perform exchange on trader library
  User.find({ _id: { $in: [tradeeGameToReceive.owner.id, traderGameToReceive.owner.id] } }).populate('games').then(function (user) {
    var tradee = void 0;
    var trader = void 0;

    if (user[0].username === req.session.user) {
      tradee = user[0];
      trader = user[1];
    } else {
      tradee = user[1];
      trader = user[0];
    }
    copyProps(tradee, traderGameToReceive, tradeeGameToReceive, 'tradee');
    copyProps(trader, tradeeGameToReceive, traderGameToReceive, 'trader');

    trader.requests = setTraderRequestToAccepted(trader.requests);
    tradee.requests = deleteTradeeRequest(tradee.requests);

    // Promise.all with save() causes issues with mongoose
    Promise.all([trader.games[gameKeys.trader].save(), tradee.games[gameKeys.tradee].save(), trader.save(), tradee.save()]).then(function () {
      res.json(tradee.games);
    });
  });
});

module.exports = router;
//# sourceMappingURL=trades.js.map