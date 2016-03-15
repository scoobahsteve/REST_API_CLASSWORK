const chai = require('chai');
const http = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONBOLAB_URI = 'mongodb://localhost/catsndogs_app_test';
const server = require(__dirname + '/../server.js');
const Cat = require(__dirname + '/../models/cats.js');

describe('the catsndogs api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabose(() => {
      done();
    });
  });

  it('should be able to GET all catsndogs from db', (done) => {
    chai.request('localhost:3000')
      .post('/api/cats')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should be able to create a cat with POST', (done) => {
    chai.request('localhost:3000')
      .post('/api/cats')
      .send({fullName: 'Fluffnstuff'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.fullName).to.eql('Fluffnstuff');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require a cat already be in the db', () => {
    beforeEach((done) => {
      Cat.create({fullName: 'Fluffnstuff'}, (err, data) => {
        this.testCat = data;
        done();
      });
    });

  it('should be able to UPDATE a cat', (done) => {
    chai.request('localhost:3000')
      .put('/api/cats/' + this.testCat._id)
      .send({fullName: 'new cat name'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('you have successfully updated the file');
        done();
      });
  });

  it('should be able to DELETE a cat', (done) => {
    chai.request('localhost:3000')
      .delete('/api/cats/' + this.testCat._id)
      .send({fullName: 'new cat name'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('you have successfully deleted the file');
        done();
      });
  });
  });
});
