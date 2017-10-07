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

  User.find({}).lean()
    .then((users) => {
      users.forEach((user) => {
        if (user.games.length > 0) {
          if (user.games[0].owner != req.session.user) {
            const userGame = user.games.filter((game) => {
              if (game.name.toLowerCase().match(regSearch)) {
                return game;
              }
            });

            allGames = allGames.concat(userGame);
          }
        }
      });

  res.json(allGames);
    }).catch((err) => {
      throw err;
    });
});

router.get('/getUserGames', (req, res) => {
  User.findOne({username: req.session.user}).lean()
    .populate('games')
    .then((user) => {
      if (user.games) {
        res.json(user.games);
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
        gameConsole: req.body[0].console,
        cover: req.body[0].cover,
        summary: req.body[0].summary,
        id: req.body[0].id,
        name: req.body[0].name,
        owner: user,
      });

      user.games.push(newGame);

      Promise.all([user.save(), newGame.save()])
        .then(() => {
          res.json(req.body);
        });
    }).catch(err => {throw err;});
});

router.post('/removeGame', (req, res) => {
  Game.findByIdAndRemove(req.body.mongoId).lean()
    .then(() => {
      User.findOne({username: req.session.user}).lean()
        .populate('games')
        .then((user) => {
          res.json(user.games);
        });
    });
});

module.exports = router;
