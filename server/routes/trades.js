const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Game = require('../models/game');

router.post('/declineTrade', (req, res) => {
  const traderGameToReceive = Object.assign({}, req.body.offeredGame); // from tradee to trader
  const tradeeGameToReceive = Object.assign({}, req.body.requestedGame); // from trader to tradee

  User.findOne({username: req.session.user}).lean()
    .then((user) => {
      const userRequests = user.requests.filter((request) => {
        if (request.requestedGame.id != req.body.requestedGame.id &&
            request.offeredGame.id != req.body.offeredGame.id) {
          return request;
        }
      });

      User.findOneAndUpdate({username: req.session.user}, {requests: userRequests})
        .then(() => {
          User.findOne({username: req.body.requestedGame.owner}).lean()
            .then((owner) => {
              const ownerRequests = Array.from(owner.requests);
              ownerRequests.map((request) => {
                if (request.requestedGame.id === traderGameToReceive.id &&
                  request.offeredGame.id === tradeeGameToReceive.id) {
                  request.status = req.body.type;
                }
              });

              User.findOneAndUpdate(
                {username: req.body.requestedGame.owner},
                {requests: ownerRequests})
                .then(() => {
                  res.json(userRequests);
                });
            });
        });
    });
});

// complete trade for trader after tradee accepts trade
router.post('/completeTrade', (req, res) => {
  const traderGameToReceive = Object.assign({}, req.body.offeredGame); // from tradee to trader
  const tradeeGameToReceive = Object.assign({}, req.body.requestedGame); // from trader to tradee
  const gameKeys = {tradee: -1, trader: -1};

  const setTraderRequestToAccepted = (requests) => {
    const newRequests = Array.from(requests);

    newRequests.map((request) => {
      if (request.requestedGame.id === traderGameToReceive.id &&
          request.offeredGame.id === tradeeGameToReceive.id) {
        request.status = 'Accepted';
      }
    });

    return newRequests;
  };

  const deleteTradeeRequest = (requests) => {
    const newRequests = requests.filter((request) => {
      if (request.requestedGame.id != tradeeGameToReceive.id &&
          request.offeredGame.id != traderGameToReceive.id) {
        return request;
      }
    });

    return newRequests;
  };

  const copyProps = (trader, gameToGive, gameToReceive, traderString) => {
    Array.from(trader.games).map((game, key) => {
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
  User.find({_id: {$in: [tradeeGameToReceive.owner.id, traderGameToReceive.owner.id]}})
    .populate({
      path: 'games',
      populate: {
        path: 'owner',
        model: 'users'
      }
    }).then((user) => {
      let tradee;
      let trader;

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

      Promise.all([
        trader.games[gameKeys.trader].save(),
        tradee.games[gameKeys.tradee].save(),
        trader.save(),
        tradee.save()
      ]).then(() => {
        res.json(tradee.games);
      });
    });
});

module.exports = router;
