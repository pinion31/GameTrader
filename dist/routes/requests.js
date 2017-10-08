'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Request = require('../models/request');

router.post('/addRequest', function (req, res) {
  var userRequests = Array.from(req.body);

  var newRequestOutgoing = new Request({
    status: userRequests[0].status,
    requestedGame: userRequests[0].requestedGame._id,
    offeredGame: userRequests[0].offeredGame._id,
    path: userRequests[0].path
  });

  User.findOneAndUpdate({ username: req.session.user }, { $push: { requests: newRequestOutgoing } }).then(function () {
    //const incomingRequest = Object.assign({}, req.body[0]);
    // create request for recipient of trade offer and append to their requests
    //console.log('findOne', user);

    var newRequestIncoming = new Request({
      status: userRequests[0].status,
      requestedGame: userRequests[0].offeredGame._id,
      offeredGame: userRequests[0].requestedGame._id,
      path: 'incoming'
    });

    //console.log('sh', userRequests[0].requestedGame.owner);
    User.findByIdAndUpdate({ _id: userRequests[0].requestedGame.owner.toString() }, { $push: { requests: newRequestIncoming } }).then(function () {
      Promise.all([newRequestIncoming.save(), newRequestOutgoing.save()]).then(function () {
        res.json(req.body);
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
    User.findOne({ username: req.session.user }).lean().populate('requests').then(function (user) {
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