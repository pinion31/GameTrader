'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');

/** Trader = user that created offer
*   Tradee = user that receives offer and decides to accept trade or decline
**/

/**
 * Adds Request to current user
 * Input {Array of one obj} - obj format {
    offeredGame: Object,
    requestedGame: Object
 }
 * Output: {Array} - sends back current user request with newly added request
 */

router.post('/addRequest', function (req, res) {
  var userRequests = Array.from(req.body);
  // Request added to Tradee here
  User.findOneAndUpdate({ username: req.session.user }, { $push: { requests: userRequests[0] } }, { new: true }).then(function (user) {
    var incomingRequest = Object.assign({}, req.body[0]);
    // create new request for Tradee and append to Tradee requests
    var newRequest = {
      status: 'Pending',
      requestedGame: incomingRequest.offeredGame,
      offeredGame: incomingRequest.requestedGame,
      path: 'incoming'
    };

    // Request added to Trader here
    User.findOneAndUpdate({ username: incomingRequest.requestedGame.owner.username }, { $push: { requests: newRequest } }).then(function () {
      res.json(user.requests);
    });
  });
});

/**
 * Removes request from current user
 * Output {Array}: sends back array of user requests minus removed request
 */
router.post('/removeRequest', function (req, res) {
  User.findOne({ username: req.session.user }).lean().then(function (user) {
    var userRequests = user.requests.filter(function (request) {
      if (request.requestedGame.id != req.body.requestedGameId || request.offeredGame.id != req.body.offeredGameId) {
        return request;
      }
    });

    User.findOneAndUpdate({ username: req.session.user }, { requests: userRequests }).then(function () {
      res.json(userRequests);
    });
  });
});

/**
 * Retrieves current user requests
 * @param {String} req.session.user
 * Output: {Array} userRequests - sends back array of request objs
 * if no session user, sends back {session: 'none'} for error handling
 */
router.get('/getUserRequests', function (req, res) {
  if (req.session.user) {
    User.findOne({ username: req.session.user }).lean().then(function (user) {
      if (user.requests) {
        var userRequests = Array.from(user.requests);
        userRequests.map(function (request, key) {
          request.offeredGame.owner = { username: req.session.user, id: user._id };

          request.requestedGame.owner = //converts requestGame.owner from String to Obj ({username: String, id: String})
          { username: user.requests[key].requestedGame.owner.username,
            id: user.requests[key].requestedGame.owner.id
          };
        });
        res.json(userRequests);
      } else {
        res.json([]);
      }
    });
  } else {
    res.json({ session: 'none' });
  }
});

module.exports = router;
//# sourceMappingURL=requests.js.map