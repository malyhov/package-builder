const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../pkgbuilder');
const should = require('chai').should();

chai.use(chaiHttp);


describe('Hosts', () => {

  it('it should get All hosts', () => {
    chai.request(server)
    .get('/api/v1.0/hosts')
    .end(function(err, res) {
      res.should.have.status(200);
      // res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.equal(["dev","stage","prod"])
    });
  });

  it('it should get single host');

  it('it should create new host');

});
