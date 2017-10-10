const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/addRequest', (req, res) => {
  const userRequests = Array.from(req.body);
  User.findOneAndUpdate({username: req.session.user}, {$push: {requests: userRequests[0]}}, {new:true})
    .then((user) => {
      const incomingRequest = Object.assign({}, req.body[0]);
      // create request for recipient of trade offer and append to their requests
      const newRequest = {
        status: 'Pending',
        requestedGame: incomingRequest.offeredGame,
        offeredGame: incomingRequest.requestedGame,
        path: 'incoming',
      };

      User.findOneAndUpdate(
        {username: incomingRequest.requestedGame.owner},
        {$push: {requests: newRequest}})
        .then(() => {
          res.json(user.requests);
        });
    });
});

router.post('/removeRequest', (req, res) => {
  User.findOne({username: req.session.user}).lean()
    .then((user) => {
      const userRequests = user.requests.filter((request) => {
        if (request.requestedGame.id != req.body.requestedGameId &&
            request.offeredGame.id != req.body.offeredGameId) {
          return request;
        }
      });

      User.findOneAndUpdate({username: req.session.user}, {requests: userRequests})
        .then(() => {
          res.json(userRequests);
        });
    });
});

router.get('/getUserRequests', (req, res) => {
  if (req.session.user) {
    User.findOne({username: req.session.user}).lean()
      .then((user) => {
        if (user.requests) {
          console.dir(user.requests);
          res.json(user.requests);
        } else {
          res.json([]);
        }
      });
  } else {
    res.json({session: 'none'});
  }
});

module.exports = router;
