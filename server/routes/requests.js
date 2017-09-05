const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/addRequest', (req, res) => {
  User.findOne({username: req.session.user}).lean()
    .then((user) => {
      const retrievedUser = Object.assign({}, user);
      const userRequests = retrievedUser.requests === null ? Array.from(req.body) :
        Array.from(retrievedUser.requests).concat(req.body);

      User.findOneAndUpdate({username: req.session.user}, {requests: userRequests})
        .then(() => {
          const incomingRequest = Object.assign({}, req.body[0]);
          // create request for recipient of trade offer and append to their requests
          const newRequest = {
            status: 'Pending',
            requestedGame: incomingRequest.offeredGame,
            offeredGame: incomingRequest.requestedGame,
            path: 'incoming',
          };

          // find target owner of requested game
          User.findOne({username: incomingRequest.requestedGame.owner}).lean()
            .then((user) => {
              const targetUser = Object.assign({}, user);

              // add request
              const targetUserRequests = targetUser.requests === null ? Array.from([newRequest]) :
                Array.from(targetUser.requests).concat([newRequest]);
              // update target owner's request
              User.findOneAndUpdate(
                {username: incomingRequest.requestedGame.owner},
                {requests: targetUserRequests})
                .then(() => {
                  res.json(req.body);
                });
            });
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
  User.findOne({username: req.session.user}).lean()
    .then((user) => {
      if (user.requests) {
        res.json(user.requests);
      } else {
        res.json([]);
      }
    });
});

module.exports = router;
