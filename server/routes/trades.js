const express = require('express');
const router = express.Router();
const User = require('../models/user');

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
  const gameTradee = req.session.user;
  const gameTrader = req.body.requestedGame.owner;

  // perform exchange on trader library
  User.findOne({username: gameTrader}).lean()
    .then((trader) => {
      let traderGames = Array.from(trader.games);
      const traderRequests = Array.from(trader.requests);

      // remove game from trader's library
      traderGames = traderGames.filter((game) => {
        if (game.id != tradeeGameToReceive.id) {
          return game;
        }
      });

      // change status for request to accept
      traderRequests.map((request) => {
        if (request.requestedGame.id === traderGameToReceive.id &&
            request.offeredGame.id === tradeeGameToReceive.id) {
          request.status = 'Accepted';
        }
      });

      // change owner of game to new owner
      traderGameToReceive.owner = gameTrader;

      // add game to trader's library
      traderGames = traderGames.concat([traderGameToReceive]);

      User.findOneAndUpdate({username: gameTrader}, {games: traderGames, requests: traderRequests})
        .then(() => {
          // perform exchange on tradee library
          User.findOne({username: gameTradee}).lean()
            .then((tradee) => {
              let tradeeGames = Array.from(tradee.games);
              // remove game from tradee's library
              tradeeGames = tradeeGames.filter((game) => {
                if (game.id != traderGameToReceive.id) {
                  return game;
                }
              });

              // change owner of game to new owner
              tradeeGameToReceive.owner = gameTradee;

              // add game to tradee's library
              tradeeGames = tradeeGames.concat([tradeeGameToReceive]);

              User.findOneAndUpdate({username: gameTradee}, {games: tradeeGames})
                .then(() => {
                  res.json(tradeeGames);
                });
            });
        });
    });
});

module.exports = router;
