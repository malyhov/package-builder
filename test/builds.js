const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../pkgbuilder');
const should = require('chai').should();

chai.use(chaiHttp);


describe('Builds', () => {
  
  it('it should get all builds', (done) => {
    chai.request(server)
    .get('/api/v1.0/builds')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });

  it('it should create new build', (done) => {
    chai.request(server)
    .get('/api/v1.0/builds/create')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.message.should.be.a('string');
      res.body.message.should.equal('Please wait, build undefined creating');
      done();
    });
  });

  it('it should get single build', (done) => {
    chai.request(server)
    .get('/api/v1.0/builds/1')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });

  it('it dont should get wrong build', (done) => {
    chai.request(server)
    .get('/api/v1.0/builds/88888888')
    .end(function(err, res) {
      res.should.have.status(404);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });

  it('it should deploy build on existing host');
  it('it dont should deploy build on not existing host');
});
