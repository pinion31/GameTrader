const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');
mongoose.Promise = global.Promise;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../dist/server');
const should = chai.should();
const User = require('../dist/models/user');
const session = require('supertest-session');

const { chris, lucy, nicole, Skyrim, AssassinCreed,
  RedDead2, Fallout4, offeredGame, requestedGame, offeredGame2, requestedGame2} = require('../__mockData__/mockServerData');

chai.use(chaiHttp);
const request = require('supertest');
const agent = request.agent('http://localhost:3000');

let RedDead2Game;
let Fallout4Game;
let SkyrimGame;
let AssassinCreedGame;

describe('Log Out', () => {
  xit('logs out and destroys session', (done) => {
    chai.request('http://localhost:3000')
      .post('/logoutUser')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.eql('session ended');
        done();
      });
  });
});

describe('Find Games', () => {
  xit('retrieves game results when querying', (done) => {
    chai.request('http://localhost:3000')
      .get('/games/findGame/49/fallout')
      .end((err, res) => {
        res.should.have.status(200);
        let results = JSON.parse(res.body);
        results.length.should.be.eql(11);
        results[0].id.should.be.eql(9630);
        results[0].name.should.be.eql('Fallout 4');
        done();
      });
  });
});

describe('Add Users To Database', () => {
  beforeEach((done) => {
    const {users, games} = mongoose.connection.collections;
    users.drop(() => {
      games.drop(() => {
        done();
      });
    });
  });

  it('add a user to database', (done) => {
    chai.request('http://localhost:3000')
      .post('/users/addUser')
      .send(chris)
      .end((err, res) => {
        res.body.validation.should.be.eql('valid');
        res.body.redirect.should.be.eql('/Dashboard');
        done();
      });
  });

  it('add two users to database', (done) => {
    chai.request('http://localhost:3000')
      .post('/users/addUser')
      .send(lucy)
      .end((err, res) => {
        chai.request('http://localhost:3000')
          .post('/users/addUser')
          .send(nicole)
          .end((err, res) => {
            res.body.validation.should.be.eql('valid');
            res.body.redirect.should.be.eql('/Dashboard');
            done();
          });
      });
  });

});

describe('Login', () => {
  it('logs in user, chris', (done) => {
    chai.request('http://localhost:3000')
      .post('/users/loginUser')
      .send({username: 'chris', password: 'wonderdog1!'})
      .end((err, res) => {
        res.body.validation.should.be.eql('valid');
        res.body.redirect.should.be.eql('/Dashboard');
        done();
      });
  });
});

describe('Add Game to user', () => {
  it('adds game to a user', (done) => {
    agent.post('/users/loginUser')
      .send({username: 'nicole', password: 'augustus2!'})
      .end((err, res) => {
        agent.post('/games/addGame')
          .send([Skyrim])
          .end((error, response) => {
            response.should.have.status(200);
            User.findOne({username: 'nicole'})
              .populate('games')
              .then(user => {
                user.username.should.be.eql('nicole');
                user.games[0].name.should.be.eql(Skyrim.name);
                user.games[0].id.should.be.eql(Skyrim.id);
                //user.games[0].owner.should.be.eql(user.username);
                response.body[0].name.should.be.eql(Skyrim.name);
                response.body[0].id.should.be.eql(Skyrim.id);
                done();
              });
          });
      });
  });
});

describe('Add 2nd Game to user, nicole', () => {
  it('adds game to a user, nicole', (done) => {
    agent.post('/games/addGame')
      .send([AssassinCreed])
      .end((error, response) => {
        response.should.have.status(200);

        User.findOne({username: 'nicole'})
          .populate('games')
          .then(user => {
            user.username.should.be.eql('nicole');
            user.games[1].name.should.be.eql(AssassinCreed.name);
            user.games[1].id.should.be.eql(AssassinCreed.id);
            //user.games[1].owner.should.be.eql(user.username);
            response.body[0].name.should.be.eql(AssassinCreed.name);
            response.body[0].id.should.be.eql(AssassinCreed.id);
            done();
          });
      });
  });
});

describe('retrieve user games for nicole', () => {
  it('gets user games, nicole', (done) => {
    agent.get('/games/getUserGames')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(2);
        User.findOne({username: nicole.username})
          .populate('games')
          .then(user => {
            SkyrimGame = res.body[0];
            AssassinCreedGame = res.body[1];
            //user.games[0].owner.should.be.eql(user.username);
            //user.games[1].owner.should.be.eql(user.username);
            res.body[0].name.should.be.eql(Skyrim.name);
            res.body[0].id.should.be.eql(Skyrim.id);
            res.body[1].name.should.be.eql(AssassinCreed.name);
            res.body[1].id.should.be.eql(AssassinCreed.id);
            done();
          });
      });
  });
});

describe('Add Game to chris', () => {
  it('adds game to a second user, chris', (done) => {
    agent.post('/users/loginUser')
      .send({username: 'chris', password: 'wonderdog1!'})
      .end((err, res) => {
        agent.post('/games/addGame')
          .send([RedDead2])
          .end((error, response) => {
            response.should.have.status(200);

            User.findOne({username: chris.username})
              .populate('games')
              .then(user => {
                user.games[0].name.should.be.eql(RedDead2.name);
                user.games[0].id.should.be.eql(RedDead2.id);
                //user.games[0].owner.should.be.eql(user.username);
                response.body[0].name.should.be.eql(RedDead2.name);
                response.body[0].id.should.be.eql(RedDead2.id);
                done();
              });
          });
      });
  });
});

describe('Add 2nd Game', () => {
  it('adds game to a user, chris', (done) => {
    agent.post('/games/addGame')
      .send([Fallout4])
      .end((error, response) => {
        User.findOne({username: chris.username})
          .populate('games')
          .then(user => {
            user.games[1].name.should.be.eql(Fallout4.name);
            user.games[1].id.should.be.eql(Fallout4.id);
            //user.games[1].owner.should.be.eql(user.username);
            response.body[0].name.should.be.eql(Fallout4.name);
            response.body[0].id.should.be.eql(Fallout4.id);
            done();
          });
      });
  });
});

describe('retrieve user games for chris', () => {
  it('gets user games, chris', (done) => {
    agent.get('/games/getUserGames')
      .end((err, res) => {
        User.findOne({username: chris.username})
          .populate('games')
          .then(user => {
            RedDead2Game = user.games[0];
            Fallout4Game = user.games[1];
            user.games[0].name.should.be.eql(RedDead2.name);
            user.games[0].id.should.be.eql(RedDead2.id);
            //user.games[0].owner.should.be.eql(user.username);
            user.games[1].name.should.be.eql(Fallout4.name);
            user.games[1].id.should.be.eql(Fallout4.id);
            //user.games[1].owner.should.be.eql(user.username);
            res.should.have.status(200);
            //res.body[0].owner.should.be.eql(user.username);
            res.body[0].name.should.be.eql(RedDead2.name);
            res.body[0].id.should.be.eql(RedDead2.id);
            //res.body[1].owner.should.be.eql(user.username);
            res.body[1].name.should.be.eql(Fallout4.name);
            res.body[1].id.should.be.eql(Fallout4.id);
            done();
          });
      });
  });
});

describe('remove game', () => {
  let gameToRemove;

  it('removes a game from chris', (done) => {
    agent.get('/games/getUserGames')
      .end((err, res) => {
        res.body.forEach((game) => {
          if (game.id.toString() === Fallout4.id.toString()) {
            gameToRemove = game;
          }
        });

        agent.post('/games/removeGame')
          .send({mongoId: gameToRemove._id.toString()})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.be.eql(1);
            res.body[0].name.should.be.eql(RedDead2.name);
            res.body[0].id.should.be.eql(RedDead2.id);
            done();
          });
      });
  });
});

describe('Add Fallout4 Game', () => {
  it('adds Fallout4 back to chris', (done) => {
    agent.post('/games/addGame')
      .send([Fallout4])
      .end((error, response) => {
        response.should.have.status(200);
        //response.body[0].owner.should.be.eql(chris.username);
        response.body[0].name.should.be.eql(Fallout4.name);
        response.body[0].id.should.be.eql(Fallout4.id);
        done();
      });
  });
});

describe('add request', () => {
  it('adds a request to chris', (done) => {
    agent.post('/requests/addRequest')
      .send([{status: 'Pending', path: 'outgoing', offeredGame, requestedGame}])
      .end((err, res) => {
        res.should.have.status(200);
        res.body[0].offeredGame.owner.should.be.eql(chris.username);
        res.body[0].requestedGame.owner.should.be.eql(nicole.username);
        res.body[0].offeredGame.id.should.be.eql(offeredGame.id);
        res.body[0].requestedGame.id.should.be.eql(requestedGame.id);
        res.body[0].status.should.be.eql('Pending');
        res.body[0].path.should.be.eql('outgoing');
        done();
    });
  });
});

describe('add 2nd request', () => {
  it('adds a 2nd request to user, chris', (done) => {
    agent.post('/requests/addRequest')
      .send([{status: 'Pending', path: 'outgoing', offeredGame: offeredGame2, requestedGame: requestedGame2}])
      .end((err, res) => {
        res.should.have.status(200);
        res.body[1].offeredGame.owner.should.be.eql(chris.username);
        res.body[1].requestedGame.owner.should.be.eql(nicole.username);
        res.body[1].offeredGame.id.should.be.eql(offeredGame2.id);
        res.body[1].requestedGame.id.should.be.eql(requestedGame2.id);
        res.body[1].status.should.be.eql('Pending');
        res.body[1].path.should.be.eql('outgoing');
        done();
    });
  });
});

describe('get request', () => {
  it('gets user requests for chris', (done) => {
    agent.get('/requests/getUserRequests')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(2);
        //res.body[0].offeredGame.owner.should.be.eql(chris.username);
       // res.body[0].requestedGame.owner.should.be.eql(nicole.username);
        res.body[0].offeredGame.id.should.be.eql(offeredGame.id);
        res.body[0].requestedGame.id.should.be.eql(requestedGame.id);
        res.body[0].status.should.be.eql('Pending');
        res.body[0].path.should.be.eql('outgoing');
        done();
      });
  });
});

describe('get requests from nicole', () => {
  it('logs in under nicole and gets requests', (done) => {
    agent.post('/users/loginUser')
      .send({username: 'nicole', password: 'augustus2!'})
      .end(err => {
        agent.get('/requests/getUserRequests')
          .end((err, res) => {
            res.body.length.should.be.eql(2);
            res.should.have.status(200);
            //res.body[0].offeredGame.owner.should.be.eql(nicole.username);
            //res.body[0].requestedGame.owner.should.be.eql(chris.username);
            res.body[0].offeredGame.id.should.be.eql(requestedGame.id);
            res.body[0].requestedGame.id.should.be.eql(offeredGame.id);
            res.body[0].status.should.be.eql('Pending');
            res.body[0].path.should.be.eql('incoming');
            done();
          });
      });
  });
});

describe('accept request', () => {
  it('accepts request under nicole', (done) => {
    agent.post('/trades/completeTrade')
      .send({offeredGame: SkyrimGame, requestedGame: RedDead2Game})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(1);
        done();
      });
  });
});

describe('decline request', () => {
  it('accepts request under nicole', (done) => {
    agent.post('/trades/declineTrade')
      .send({type: 'Declined', offeredGame: requestedGame2, requestedGame: offeredGame2})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(0);
        done();
      });
  });
});

describe('check request status', () => {
  it('checks request status of nicole', (done) => {
    agent.get('/requests/getUserRequests')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(0);
        done();
      });
  });
});

describe('check request status', () => {
  it('checks request status for chris', (done) => {
    agent.post('/users/loginUser')
      .send({username: 'chris', password: 'wonderdog1!'})
      .end((err, res) => {
        agent.get('/requests/getUserRequests')
          .end((err, res) => {
            res.should.have.status(200);
            res.body[0].status.should.be.eql('Accepted');
            res.body[1].status.should.be.eql('Declined');
            done();
          });
      });
  });
});

describe('get all games', () => {
  it('gets all games from users other than chris', (done) => {
    agent.get('/games/getAllGames/nofilter')
      .end((err, res) => {
        res.body.length.should.be.eql(2);
        res.body[0].owner.should.be.eql('nicole');
        res.body[1].owner.should.be.eql('nicole');
        done();
      });
  });
});



