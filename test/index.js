const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../pkgbuilder');
const should = require('chai').should();

chai.use(chaiHttp);


describe('Index', () => {
  
  it('it should index page', (done) => {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('string');
      res.body.should.equal('Package Builder API v1.0');
      done();
    });
  });

});
