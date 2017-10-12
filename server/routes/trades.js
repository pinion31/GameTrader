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
router.post('/completeTrade', function (req, res) {
  const traderGameToReceive = Object.assign({}, req.body.offeredGame); // from tradee to trader
  const tradeeGameToReceive = Object.assign({}, req.body.requestedGame); // from trader to tradee
  //console.log('traderGameToReceive.owner', traderGameToReceive.owner);
  //console.log('tradeeGameToReceive.owner', tradeeGameToReceive.owner);
  //console.log('traderGameToReceive.owner.owner', traderGameToReceive.owner.id);
  //console.log('tradeeGameToReceive.owner.owner', tradeeGameToReceive.owner.id);
  const gameTradee = traderGameToReceive.owner.id;
  const gameTrader = tradeeGameToReceive.owner.id;

  const setTradeeRequestToAccepted = (requests) => {
    const newRequests = Array.from(requests);

    newRequests.map(request => {
      if (request.requestedGame.id === traderGameToReceive.id &&
          request.offeredGame.id === tradeeGameToReceive.id) {
        request.status = 'Accepted';
      }
    });

    return newRequests;
  };

  const deleteTraderRequest = (requests) => {
    const newRequests = requests.filter(request => {
      if (request.requestedGame.id != tradeeGameToReceive.id &&
          request.offeredGame.id != traderGameToReceive.id) {
        return request;
      }
    });

    return newRequests;
  };

  // perform exchange on trader library
  User.find({'_id': {$in :[gameTradee, gameTrader]}})
    .populate({
      path: 'games',
      populate: {
        path: 'owner',
        model: 'users'
      }
    }).then((trader) => {
      let gameKey0;
      let gameKey1;

      Array.from(trader[0].games).map((game, key) => {
        console.log('game.id', game.id);
        console.log('tradeeGameToReceive.id', tradeeGameToReceive.id);
        if (game.id.toString() === tradeeGameToReceive.id.toString()) {
          trader[0].games[key].name = traderGameToReceive.name;
          trader[0.games[key].gameConsole = traderGameToReceive.gameConsole;
          trader[0].games[key].summary = traderGameToReceive.summary;
          trader[0].games[key].id = traderGameToReceive.id;
          trader[0].games[key].cover = traderGameToReceive.cover;
          trader[0].games[key].screenshots = traderGameToReceive.screenshots;
          gameKey0 = key;
        }
      });

      Array.from(trader[1].games).map((game, key) => {
        console.log('game.id', game.id);
        console.log('traderGameToReceive.id', traderGameToReceive.id);
        if (game.id.toString() === traderGameToReceive.id.toString()) {
          trader[1].games[key].name = tradeeGameToReceive.name;
          trader[1].games[key].gameConsole = tradeeGameToReceive.gameConsole;
          trader[1].games[key].summary = tradeeGameToReceive.summary;
          trader[1].games[key].id = tradeeGameToReceive.id;
          trader[1].games[key].cover = tradeeGameToReceive.cover;
          trader[1].games[key].screenshots = tradeeGameToReceive.screenshots;
          gameKey1 = key;
        }
      });

      if (trader[0]._id.toString() === traderGameToReceive.owner.id.toString()) {
      //  console.log('hit2');
        trader[1].requests = setTradeeRequestToAccepted(trader[1].requests);
        trader[0].requests = deleteTraderRequest(trader[0].requests);

        console.log('gameKey1', gameKey1);
        console.log('gameKey0', gameKey0);

        Promise.all([
          trader[1].games[gameKey1].save(),
          trader[0].games[gameKey0].save(),
          trader[1].save(),
          trader[0].save()
        ]).then(() => {
          console.log('trader[0].requests*************************',trader[0].games);
          res.json(trader[0].games);
        });
      } else {
        trader[0].requests = setTradeeRequestToAccepted(trader[0].requests);
        trader[1].requests = deleteTraderRequest(trader[1].requests);
        console.log('gameKey1', gameKey1);
        console.log('gameKey0', gameKey0);
        //console.log('hit1');
        Promise.all([
          trader[1].games[gameKey1].save(),
          trader[0].games[gameKey0].save(),
          trader[1].save(),
          trader[0].save()
        ]).then(() => {
          console.log('trader[1].requests***************************',trader[1].games);
          res.json(trader[1].games);
        });

      }
    });
});

module.exports = router;
