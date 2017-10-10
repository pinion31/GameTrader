import igdb from 'igdb-api-node';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Game = require('../models/game');

const client = igdb(process.env.IGDB_KEY);

router.get('/findGame/:console/:game', (req, res) => {
  let searchResults = [];

  client.games({
    fields: ['id', 'name', 'cover', 'summary', 'developers', 'screenshots'],
    // fields: '*',
    search: req.params.game,
    filters: {
      'release_dates.platform-eq': req.params.console,
    },
    limit: 15, // Limit to 5 results
    offset: 0 // Index offset for results
  }).then((response) => {
    const result = response.body;

    result.forEach((game) => {
      if (game.cover) {
        const coverImage = client.image({
          cloudinary_id: game.cover.cloudinary_id},
        'cover_small',
        'jpg'
        );

        // convert and add screenshots
        const screenShots = [];

        if (game.screenshots) {
          game.screenshots.map((screenshot) => {
            const screenShotURL = client.image({
              cloudinary_id: screenshot.cloudinary_id},
            'screenshot_med',
            'jpg'
            );
            screenShots.push(screenShotURL);
          });
        }

        searchResults = searchResults.concat([
          {
            id: game.id,
            name: game.name,
            summary: game.summary,
            cover: coverImage,
            gameConsole: req.params.console,
            screenshots: screenShots,
          }]);
      }
    });

    res.json(JSON.stringify(searchResults));
  }).catch((error) => {
    throw error;
  });
});

router.get('/getAllGames/:filter', (req, res) => {
  let allGames = [];
  let regSearch;

  if (req.params.filter === 'nofilter') {
    regSearch = /[a-zA-Z0-9]/;
  } else {
    regSearch = new RegExp(req.params.filter.toLowerCase());
  }


  User.findOne({username: req.session.user}).lean()
    .then(user => {
      return Game.find({'owner': {$ne: user._id}}).lean()
        .populate('owner')
        .limit(36);
    }).then(games => {
      games.forEach(game => {
        let username = game.owner.username;
        game.owner = username;
      });
      res.json(games);
    });
});

router.get('/getUserGames', (req, res) => {
  User.findOne({username: req.session.user})
    .populate({
      path: 'games',
      populate: {
        path: 'owner',
        model: 'users'
      }
    }).then((user) => {
      if (user.games) {
        let userGames = Array.from(user.games);
        userGames.map(game => {
          let gameOwner = game.owner.username;
          game.owner = gameOwner;
        });
        //console.log('users games are', user.games);
        res.json(userGames);
      } else {
        res.json([]);
      }
    });
});

router.post('/addGame', (req, res) => {
  User.findOne({username: req.session.user})
    .then((user) => {
      const newGame = new Game({
        screenshots: req.body[0].screenshots,
        gameConsole: req.body[0].gameConsole,
        cover: req.body[0].cover,
        summary: req.body[0].summary,
        id: req.body[0].id,
        name: req.body[0].name,
        owner: user,
      });
      user.games.push(newGame);

      let gameObj = newGame.toObject();
      gameObj.mongoId = newGame._id;
      gameObj.owner = user.username;

      Promise.all([user.save(), newGame.save()])
        .then(() => {
          res.json([gameObj]);
        });
    }).catch(err => {throw err;});
});

router.post('/removeGame', (req, res) => {
  Game.findById(req.body.mongoId)
    .then((game) => {
      game.remove();
      User.findOne({username: req.session.user})
        .populate('games')
        .then((user) => {
          res.json(user.games);
        });
  /*
  console.log('new function');
  User.findOne({username: req.session.user})
    .populate('games')
    .then((user) => {
      Array.from(user.games).map((game, key) => {
        if(game._id.toString() === req.body.mongoId.toString()) {
          console.log('removing', user.games[key].name);
          user.games[key].remove()
            .then(() => {
              user.save(() => {
                console.log(user.games);
                res.json(user.games);
              });
            });
        }
      });*/
/*
  Game.findByIdAndRemove(req.body.mongoId).lean()
    .then((game) => {
      User.findOne({username: req.session.user})
        .populate('games')
        .then((user) => {
          Array.from(user.games).map((game, key) => {
            if(game._id.toString() === req.body.mongoId.toString()) {
              console.log('removing', user.games[key].name);
              user.games[key].remove();
            }
          });

          user.save(() => {
            res.json(user.games);
          });

        });*/
    });
});

module.exports = router;
