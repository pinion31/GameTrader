const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');
mongoose.Promise = global.Promise;

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const db = mongoose.connection;
import igdb from 'igdb-api-node';
import User from './models/User';

const app = express();


const client = igdb(process.env.IGDB_KEY);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '../static')));
app.use(express.static('static'));

app.use(session({
  secret: 'noodles',
  saveUninitialized: true,
  resave: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2, httpOnly: false}, // 2 days
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));

//**** USER ACTIONS ***///
app.post('/loginUser', (req, res) => {
  if (typeof req.session.user === 'undefined') {
    req.session.user = req.body.username;
    console.log('resaving session');
    req.session.save((err) => {

      if(err){
        console.log('error with session');
      }
      else {
        res.json({redirect: '/'});
      }

    });
  }
  else if (req.session.user != req.body.username) {
      req.session.user = req.body.username;
      req.session.save((err) => {
          if(err){
            console.log('error with session');
          }
          else {
            res.json({redirect: '/'});
          }
        });
    /*req.session.destroy((err) => {
      if (err) {throw err};

        req.session.user = req.body.username;
        console.log('resaving session with new user');
        req.session.save((err) => {
          if(err){
            console.log('error with session');
          }
          else {
            res.json({redirect: '/'});
          }
        });

    });*/
  } else {
    res.json({redirect: '/'});
  }



  console.dir(req.session);

  //console.log('redirecting...');
  //res.json({redirect: '/'});
  //res.redirect('/');


  /*req.session.user = req.body.username;
  req.session.save((err) => {
    if(err){
      console.log('error with session');
    }
  });*/
  //res.json(req.session);
});

app.post('/addUser', (req, res) => {
  const user = new User(
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      city: req.body.city,
      state: req.body.state,
      requests: null,
      games: null
    }
  );

  user.save((err) => {
    if (err) {throw err};
  });
});

//** GAME ACTIONS ***//

app.get('/findGame/:console/:game', (req,res) => {
  let searchResults = [];

  client.games({
    fields: ['id', 'name', 'cover', 'summary', 'developers', 'publishers'] , // Return all fields
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
        let coverImage = client.image({
          cloudinary_id: game.cover.cloudinary_id},
          'cover_small',
          'jpg'
        );

        searchResults = searchResults.concat([
          {
            id: game.id,
            name: game.name,
            summary: game.summary,
            cover: coverImage,
            gameConsole: req.params.console,
            // developer: result.developer,
            // publisher: result.publishers,
          }]);
      }
    });

    res.json(JSON.stringify(searchResults));
  }).catch((error) => {
    throw error;
});
});

app.get('/getAllGames', (req,res) => {
  let allGames = [];

  User.find({}).lean()
    .then((users) => {
      users.forEach((user) => {
        if (user.games) {
          allGames = allGames.concat(user.games);
        }
      });

      res.json(allGames);

    }).catch((err) => {
      throw err;
    });

});

app.get('/getUserGames/:user', (req, res) => {
  User.findOne({username: req.session.user}).lean()
    .then((user) => {
      if (user.games) {
        res.json(user.games);
      } else {
        res.json([]);
      }
    });
});

app.post('/addGame/:user', (req, res) => {
  User.findOne({username: req.session.user}).lean()
    .then((user) => {
      const modifiedUser = Object.assign({}, user);
      const newGameColl = modifiedUser.games === null?Array.from(req.body):
        Array.from(modifiedUser.games).concat(req.body);

      User.findOneAndUpdate({username: req.session.user}, {games: newGameColl})
        .then(() => {
          res.json(req.body);
        });
    });
});

app.post('/removeGame/:user', (req, res) => {
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

//**** REQUEST ACTIONS *****/////

app.post('/addRequest/:user', (req, res) => {
  User.findOne({username: req.session.user}).lean()
    .then((user) => {
      const retrievedUser = Object.assign({}, user);
      const userRequests = retrievedUser.requests === null?Array.from(req.body):
        Array.from(retrievedUser.requests).concat(req.body);

      User.findOneAndUpdate({username: req.session.user}, {requests: userRequests})
        .then(() => {
          res.json(req.body);
        });
    });
});

app.post('/removeRequest/:user', (req, res) => {
  User.findOne({username: req.session.user}).lean()
    .then((user) => {
      const retrievedUser = Object.assign({}, user);
      console.dir(req.body);
      let userRequests = user.requests.filter((request) => {
          console.dir(request);
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

app.get('/getUserRequests/:user', (req, res) => {
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


 /*
  client.platforms({
    fields: '*' , // Return all fields
   // search: req.params.game,
    limit: 50, // Limit to 5 results
    offset: 100 // Index offset for results
    }).then((response) => {
        console.dir(response);



     });*/