'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/addRequest', function (req, res) {
  var userRequests = Array.from(req.body);
  User.findOneAndUpdate({ username: req.session.user }, { $push: { requests: userRequests[0] } }, { new: true }).then(function (user) {
    var incomingRequest = Object.assign({}, req.body[0]);
    // create request for recipient of trade offer and append to their requests
    var newRequest = {
      status: 'Pending',
      requestedGame: incomingRequest.offeredGame,
      offeredGame: incomingRequest.requestedGame,
      path: 'incoming'
    };

    User.findOneAndUpdate({ username: incomingRequest.requestedGame.owner.username }, { $push: { requests: newRequest } }).then(function () {
      res.json(user.requests);
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
        var userRequests = Array.from(user.requests);
        userRequests.map(function (request, key) {

          //request.offeredGame.owner_id = request.offeredGame.owner._id;
          request.offeredGame.owner = { username: req.session.user, id: user._id };

          console.log('request.requestedGame.owner', request.requestedGame.owner);
          //request.requestedGame.owner_id = request.requestedGame.owner._id;
          //request.requestedGame.owner =
          // user.requests[key].requestedGame.owner.username;

          request.requestedGame.owner = { username: user.requests[key].requestedGame.owner.username,
            id: user.requests[key].requestedGame.owner._id
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