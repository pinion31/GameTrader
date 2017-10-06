

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');
mongoose.Promise = global.Promise;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../dist/server');
const should = chai.should();
const User = require('../dist/models/user');
const session = require('supertest-session');

const { newUser01, newUser02, newUser03, RedDead2, Fallout4} = require('../__mockData__/mockServerData');

chai.use(chaiHttp);
const request = require('supertest');
//let testSession = session(chaiHttp);
//chai.use(testSession);
const agent = request.agent('http://localhost:3000');
beforeEach(function () {
  //testSession = session(chai);
});

/*
beforeEach((done) => {
  mongoose.connection.collections.gametraders.drop(() => {
    done();
  });
});*/

describe('Log Out', () => {
  it('logs out and destroys session', (done) => {
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
  it('retrieves game results when querying', (done) => {
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
    mongoose.connection.collections.gametraders.drop(() => {
      done();
    });
  });

  it('add a user to database', (done) => {
    chai.request('http://localhost:3000')
      .post('/users/addUser')
      .send(newUser01)
      .end((err, res) => {
        res.body.validation.should.be.eql('valid');
        res.body.redirect.should.be.eql('/Dashboard');
        done();
      });
  });

  it('add two users to database', (done) => {
    chai.request('http://localhost:3000')
      .post('/users/addUser')
      .send(newUser02)
      .end((err, res) => {
        chai.request('http://localhost:3000')
          .post('/users/addUser')
          .send(newUser03)
          .end((err, res) => {
            done();
          });
      });
  });

});

describe('Login', () => {
  it('logs in user, chris81', (done) => {
    chai.request('http://localhost:3000')
      .post('/users/loginUser')
      .send({username: 'chris81', password: 'wonderdog1!'})
      .end((err, res) => {
        res.body.validation.should.be.eql('valid');
        res.body.redirect.should.be.eql('/Dashboard');
        done();
      });
  });
});

describe('Add Game', () => {
  it('adds game to a user', (done) => {
    agent.post('/users/loginUser')
      .send({username: 'chris81', password: 'wonderdog1!'})
      .end((err, res) => {
        agent.post('/games/addGame')
          .send([RedDead2])
          .end((error, response) => {
            response.should.have.status(200);
            response.body[0].owner.should.be.eql(newUser01.username);
            response.body[0].name.should.be.eql(RedDead2.name);
            response.body[0].id.should.be.eql(RedDead2.id);
            done();
          });
      });
  });
});

describe('Add 2nd Game', () => {
  it('adds game to a user', (done) => {
    agent.post('/users/loginUser')
      .send({username: 'chris81', password: 'wonderdog1!'})
      .end((err, res) => {
        agent.post('/games/addGame')
          .send([Fallout4])
          .end((error, response) => {
            response.should.have.status(200);
            response.body[0].owner.should.be.eql(newUser01.username);
            response.body[0].name.should.be.eql(Fallout4.name);
            response.body[0].id.should.be.eql(Fallout4.id);
            done();
          });
      });
  });
});

describe('retrieve user games', () => {
  it('gets user games', (done) => {
    agent.get('/games/getUserGames')
      .end((err, res) => {
        res.should.have.status(200);
        res.body[0].owner.should.be.eql(newUser01.username);
        res.body[0].name.should.be.eql(RedDead2.name);
        res.body[0].id.should.be.eql(RedDead2.id);
        res.body[1].owner.should.be.eql(newUser01.username);
        res.body[1].name.should.be.eql(Fallout4.name);
        res.body[1].id.should.be.eql(Fallout4.id);
        done();
      });
  });
});

describe('remove game', () => {
  it('removes a game', (done) => {
    agent.post('/games/removeGame')
      .send({id:Fallout4.id})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(1);
        res.body[0].owner.should.be.eql(newUser01.username);
        res.body[0].name.should.be.eql(RedDead2.name);
        res.body[0].id.should.be.eql(RedDead2.id);
        done();
      });
  });
});


