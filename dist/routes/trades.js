'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Game = require('../models/game');

/** Trader = user that created offer
*   Tradee = user that receives offer and decides to accept trade or decline
**/

/**
 * Declines Trade that has been offered to user
 * Removes Request from current user requests
 * then finds the matching request in other end user and sets that request to status, declined.
 * @param {Obj} (from req.body) offeredGame
 * @param {Obj} (from req.body) requestedGame
 * Output: {Array} - Sends back User Requests minus declined Request
 */
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

/**
 * Completes Trade for Trader after Tradee Accepts
 * Trade is completed by swapping games as specified in trade and removed request from tradee requests
 * Request in trader lib is set to status, accepted
 */

router.post('/completeTrade', function (req, res) {
  var traderGameToReceive = Object.assign({}, req.body.offeredGame); // from tradee to trader
  var tradeeGameToReceive = Object.assign({}, req.body.requestedGame); // from trader to tradee
  var gameKeys = { tradee: -1, trader: -1 };

  var setTraderRequestToAccepted = function setTraderRequestToAccepted(requests) {
    var newRequests = Array.from(requests);

    // Locates request in trader collection by matching game ids and sets that request to accepted
    newRequests.map(function (request) {
      if (request.requestedGame.id === traderGameToReceive.id && request.offeredGame.id === tradeeGameToReceive.id) {
        request.status = 'Accepted';
      }
    });

    return newRequests;
  };

  // Deletes Trade Request from Tradee Collection by filtering it out using game ids
  var deleteTradeeRequest = function deleteTradeeRequest(requests) {
    var newRequests = requests.filter(function (request) {
      if (request.requestedGame.id != tradeeGameToReceive.id && request.offeredGame.id != traderGameToReceive.id) {
        return request;
      }
    });

    return newRequests;
  };

  /** No game objs are deleted or added from trader or tradee collections during trade transaction
  * Game info (such as name, summary, etc) are merely copied over and swapped out between game objs to simulate game trade
  * Game _id is not changed; it always stays the same even though the game name can change after trade
  */
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

  // Finds tradee and trader obj in user collection then swaps out games
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

    // games information swapped out here
    copyProps(tradee, traderGameToReceive, tradeeGameToReceive, 'tradee');
    copyProps(trader, tradeeGameToReceive, traderGameToReceive, 'trader');

    trader.requests = setTraderRequestToAccepted(trader.requests); // update request status to accepted for trader
    tradee.requests = deleteTradeeRequest(tradee.requests); // deleted accepted request from tradee collection

    Promise.all([trader.games[gameKeys.trader].save(), tradee.games[gameKeys.tradee].save(), trader.save(), tradee.save()]).then(function () {
      res.json(tradee.games);
    });
  });
});

module.exports = router;
//# sourceMappingURL=trades.js.map