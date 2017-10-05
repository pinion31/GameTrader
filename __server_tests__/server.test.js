

const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../dist/server');
const should = chai.should();

chai.use(chaiHttp);

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
