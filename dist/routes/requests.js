'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.post('/addRequest', function (req, res) {
  User.findOne({ username: req.session.user }).lean().then(function (user) {
    var retrievedUser = Object.assign({}, user);
    var userRequests = retrievedUser.requests === null ? Array.from(req.body) : Array.from(retrievedUser.requests).concat(req.body);

    User.findOneAndUpdate({ username: req.session.user }, { requests: userRequests }).then(function () {
      var incomingRequest = Object.assign({}, req.body[0]);
      // create request for recipient of trade offer and append to their requests
      var newRequest = {
        status: 'Pending',
        requestedGame: incomingRequest.offeredGame,
        offeredGame: incomingRequest.requestedGame,
        path: 'incoming'
      };

      // find target owner of requested game
      User.findOne({ username: incomingRequest.requestedGame.owner }).lean().then(function (user) {
        var targetUser = Object.assign({}, user);

        // add request
        var targetUserRequests = targetUser.requests === null ? Array.from([newRequest]) : Array.from(targetUser.requests).concat([newRequest]);
        // update target owner's request
        User.findOneAndUpdate({ username: incomingRequest.requestedGame.owner }, { requests: targetUserRequests }).then(function () {
          res.json(req.body);
        });
      });
    });
  });
});

router.post('/removeRequest', function (req, res) {
  User.findOne({ username: req.session.user }).lean().then(function (user) {
    var userRequests = user.requests.filter(function (request) {
      if (request.requestedGame.id != req.body.requestedGameId && request.offeredGame.id != req.body.offeredGameId) {
        return request;
      }
    });

    User.findOneAndUpdate({ username: req.session.user }, { requests: userRequests }).then(function () {
      res.json(userRequests);
    });
  });
});

router.get('/getUserRequests', function (req, res) {
  if (req.session.user) {
    User.findOne({ username: req.session.user }).lean().then(function (user) {
      if (user.requests) {
        res.json(user.requests);
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