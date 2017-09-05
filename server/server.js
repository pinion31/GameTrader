import igdb from 'igdb-api-node';
import User from './models/User';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/local');
mongoose.Promise = global.Promise;

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const db = mongoose.connection;


const app = express();
const client = igdb(process.env.IGDB_KEY);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('static'));

app.use(session({
  secret: 'noodles',
  saveUninitialized: true,
  resave: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2, httpOnly: false}, // 2 days
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));

// **** USER ACTIONS ***///
app.post('/loginUser', (req, res) => {
  // strips out trailing spaces after username
  const usernameStripped = req.body.username.split(' ')[0];

  User.findOne({username: usernameStripped})
    .then((user) => {
      if (user) {
        // decrypt password
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          if (match) {
            // session check
            if (typeof req.session.user === 'undefined') {
              req.session.user = usernameStripped;
              req.session.save((err) => {
                if (err) {
                  throw err;
                } else {
                  res.json({
                    redirect: '/Dashboard',
                    validation: 'valid',
                  });
                }
              });
            } else if (req.session.user != usernameStripped) {
              req.session.user = usernameStripped;
              req.session.save((err) => {
                if (err) {
                  throw err;
                } else {
                  res.json({
                    redirect: '/Dashboard',
                    validation: 'valid',
                  });
                }
              });
            } else {
              res.json({
                redirect: '/Dashboard',
                validation: 'valid',
              });
            }
          } else {
            res.json({
              field: 'passwordHelp',
              validation: 'Invalid Password',
            });
          }
        });
      } else {
        res.json({
          field: 'usernameHelp',
          validation: 'Invalid Username',
        });
      }
    });
});

app.post('/addUser', (req, res) => {
  // strips out trailing spaces after username
  const usernameStripped = req.body.username.split(' ')[0];

  User.findOne({username: usernameStripped})
    .then((result) => {
      if (!result) {
        req.session.user = usernameStripped;
        req.session.save((err) => {
          if (err) { throw err; }
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password1, salt, (err, hash) => {
            // Store hash in your password DB.
            console.log('hash is ' + hash);
            const user = new User(
              {
                username: usernameStripped,
                password: hash,
                email: req.body.email,
                city: req.body.city,
                state: req.body.state,
                requests: null,
                games: null
              }
            );

            user.save((err) => {
              if (err) { throw err; }
            });

            res.json({
              validation: 'valid',
              redirect: '/Dashboard'
            });
          });
        });
      } else {
        res.json({validation: 'User already exists.'});
      }
    });
});

// ** GAME ACTIONS ***//

app.get('/findGame/:console/:game', (req, res) => {
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

app.get('/getAllGames', (req, res) => {
  let allGames = [];
  User.find({}).lean()
    .then((users) => {
      users.forEach((user) => {
        if (user.games) {
          if (user.games[0].owner != req.session.user) {
            allGames = allGames.concat(user.games);
          }
        }
      });

      res.json(allGames);
    }).catch((err) => {
      throw err;
    });
});

app.get('/getUserGames', (req, res) => {
  console.log(req.session.user);
  User.findOne({username: req.session.user}).lean()
    .then((user) => {
      if (user.games) {
        res.json(user.games);
      } else {
        res.json([]);
      }
    });
});

app.post('/addGame', (req, res) => {
  User.findOne({username: req.session.user}).lean()
    .then((user) => {
      const modifiedUser = Object.assign({}, user);

      const gametoAdd = Array.from(req.body);
      gametoAdd[0].owner = req.session.user; // append owner info to added game

      const newGameColl = modifiedUser.games === null ? gametoAdd :
        Array.from(modifiedUser.games).concat(gametoAdd);

      User.findOneAndUpdate({username: req.session.user}, {games: newGameColl})
        .then(() => {
          res.json(req.body);
        });
    });
});

app.post('/removeGame', (req, res) => {
  User.findOne({username: req.session.user}).lean()
    .then((user) => {
      const modifiedUser = Object.assign({}, user);

      const newGameColl = Array.from(modifiedUser.games).filter((game) => {
        if (req.body.id != game.id) {
          return game;
        }
      });

      User.findOneAndUpdate({username: req.session.user}, {games: newGameColl})
        .then(() => {
          res.json(newGameColl);
        });
    });
});

app.post('/declineTrade', (req, res) => {
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
app.post('/completeTrade', (req, res) => {
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

// **** REQUEST ACTIONS *****/////

app.post('/addRequest', (req, res) => {
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

app.post('/removeRequest', (req, res) => {
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

app.get('/getUserRequests', (req, res) => {
  User.findOne({username: req.session.user}).lean()
    .then((user) => {
      if (user.requests) {
        res.json(user.requests);
      } else {
        res.json([]);
      }
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static', 'index.html'));
});

app.listen(3000, () => {
  console.log('App started again');
});
