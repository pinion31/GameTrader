const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Request = require('../models/request');

router.post('/addRequest', (req, res) => {
  const userRequests = Array.from(req.body);

  const newRequestOutgoing = new Request({
    status: userRequests[0].status,
    requestedGame: userRequests[0].requestedGame._id,
    offeredGame: userRequests[0].offeredGame._id,
    path: userRequests[0].path,
  });


  User.findOneAndUpdate({username: req.session.user}, {$push: {requests: newRequestOutgoing}})
    .then(() => {
      //const incomingRequest = Object.assign({}, req.body[0]);
      // create request for recipient of trade offer and append to their requests
      //console.log('findOne', user);

      const newRequestIncoming = new Request({
        status: userRequests[0].status,
        requestedGame: userRequests[0].offeredGame._id,
        offeredGame: userRequests[0].requestedGame._id,
        path: 'incoming',
      });

      //console.log('sh', userRequests[0].requestedGame.owner);
      User.findByIdAndUpdate(
        {_id: userRequests[0].requestedGame.owner.toString()},
        {$push: {requests: newRequestIncoming}})
        .then(() => {
          Promise.all([newRequestIncoming.save(), newRequestOutgoing.save()])
            .then(() => {
              res.json(req.body);
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
  if (req.session.user) {
    User.findOne({username: req.session.user}).lean()
      .populate('requests')
      .then((user) => {
        if (user.requests) {
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
