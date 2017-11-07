'use strict';

import igdb from 'igdb-api-node';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Game = require('../models/game');

const client = igdb(process.env.IGDB_KEY);

/**
 * Utilizes igdb API to retrieve game information from igdb based on game and console req params
 * sends back up to 15 games
 * input params - :console - game console filter
 *                :game - game title to search for
 * @return {Array of Objects} searchResults - obj format:
  {
    id: String,
    name: String,
    summary: String,
    cover: String,
    gameConsole: Number
    screenshots: [String, String, etc],
  }
  */
router.get('/findGame/:console/:game', (req, res) => {
  let searchResults = [];

  client.games({
    fields: ['id', 'name', 'cover', 'summary', 'developers', 'screenshots'],
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

/**
 * Retrieves all available games from other users that can be traded to current user
 * @param {String} :filter - regex used to filter out games
 * Output: {Array Of Game Objs} - obj format: {
    _id : ObjectId,
    gameConsole: Number,
    cover: String,
    summary: String,
    id: Number,
    name: String,
    owner: {username: String, id: String}
    screenshots: [String, String, String, String, String]
 }
 */

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
      return Game.find({'owner.id': {$ne: user._id}}).lean()
        .limit(36);
    }).then(games => {
      let gamesList = games.filter(game => {
        if (req.params.filter !== 'nofilter') {
          if (game.name.toLowerCase().match(regSearch)) {
                return game;
          }
        } else {
          return game;
        }
      });
      res.json(gamesList);
    });
});

/**
 * Retrieves all games for current user
 * @param {String} req.session.user
 * Output: {Array Of Game Objs} - obj format: {
    _id : ObjectId,
    gameConsole: Number,
    cover: String,
    summary: String,
    id: Number,
    name: String,
    owner: String
    screenshots: [String, String, String, String, String]
 }
 */

router.get('/getUserGames', (req, res) => {
  User.findOne({username: req.session.user})
    .populate('games')
    .then((user) => {
      if (user.games) {
        let userGames = Array.from(user.games);
        userGames.map(game => {
          let gameOwner = game.owner.username;
          game.owner = gameOwner; // changes game.owner from obj to string
        });
        res.json(userGames);
      } else {
        res.json([]);
      }
    });
});

/**
 * Adds Game to current user lib
 * @param {String} req.session.user
 * Input (from req.body) {Array with one Obj} -
 * obj format : {
    screenshots: [String, String, String, String, String]
    gameConsole: Number,
    cover: String,
    summary: String,
    id: Number,
    name: String,
    owner: String
  }

 * Output: {Array with one obj} -
  * obj format : {
    screenshots: [String, String, String, String, String]
    gameConsole: Number,
    cover: String,
    summary: String,
    id: Number,
    mongoId: Number,
    name: String,
    owner: {username: String, id: String}
 }*/

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
        owner: {username: user.username, id: user._id}
      });

      user.games.push(newGame);

      let gameObj = newGame.toObject();
      gameObj.mongoId = newGame._id;
     // gameObj.owner = user.username;

      Promise.all([newGame.save(), user.save()])
        .then(() => {
          res.json([gameObj]);
        });
    }).catch(err => {throw err;});
});

/**
 * Removes game from user lib
 * @param {String} (from req.body)- req.body.mongoId
 * Output: {Array of Objs} - returns Array of user games minus removed Game
 */
router.post('/removeGame', (req, res) => {
  Game.findById(req.body.mongoId)
    .then((game) => {
      game.remove();
      User.findOne({username: req.session.user})
        .populate('games')
        .then((user) => {
          res.json(user.games);
        });
    });
});

module.exports = router;
