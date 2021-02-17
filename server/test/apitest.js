process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../index');
const db = require('../connection/db');
const baseURL = "/api/secret/";

describe('Secret Server API Testing', () => {
  before((done) => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });
  after((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  /**
   * Test GET metthod without params 
   */
  describe('Testing /api/secret/[random parameter]', () => {
    it('It should be return "invalid hash" string', (done) => {
      request(app).get('/api/secret/TEST')
        .then((res) => {
          const body = res.body;
          expect(body.message).to.equal("Invalid hash!");
          done();
        })
        .catch((err) => done(err));
    });
  });

  /**
   * Test POST method without params 
   */
  describe('Testing POST method', () => {
    it('It should be add a secret', (done) => {
      request(app).post(baseURL)
        .send({
          secret: 'My First test secret',
          expireAfterViews: 5,
          expireAfter: 5
        })
        .then((res) => {
          const hash = res.body.hash;
          request(app).get(baseURL + hash)
            .then((res) => {
              const body = res.body;
              expect(body).to.contain.property('hash');
              expect(body).to.contain.property('secretText');
              expect(body).to.contain.property('createdAt');
              expect(body).to.contain.property('expiresAt');
              expect(body).to.contain.property('remainingViews');
              done();
            });
        })
        .catch((err) => done(err));
    });
  });

  /**
   * Testing remainingViews functions
   */
  describe('Testing remaining view functions', () => {
    const POST_OBJECT_1 = {
      secret: 'My Second test secret',
      expireAfterViews: 3,
      expireAfter: 5
    };
    it('It should be decrement the remaining views property', (done) => {
      request(app).post(baseURL)
        .send(POST_OBJECT_1)
        .then((res) => {
          const hash = res.body.hash;
          request(app).get(baseURL + hash)
            .then((res) => {
              expect(res.body.remainingViews).to.be.equal(POST_OBJECT_1.expireAfterViews - 1);
              request(app).get(baseURL + hash)
                .then((res) => {
                  expect(res.body.remainingViews).to.be.equal(POST_OBJECT_1.expireAfterViews - 2);
                  done();
                });
            });
        })
        .catch((err) => done(err));
    });

    const POST_OBJECT_2 = {
      secret: 'My Third test secret',
      expireAfterViews: 1,
      expireAfter: 5
    };
    it('It should be returning to "You have reached the maximum number of views available!" string', (done) => {
      request(app).post(baseURL)
        .send(POST_OBJECT_2)
        .then((res) => {
          const hash = res.body.hash;
          request(app).get(baseURL + hash)
            .then((res) => {
              expect(res.body.message).to.be.equal("You have reached the maximum number of views available!");
              done();
            });
        })
        .catch((err) => done(err));
    });
  });

  /**
   * Testing the expireAfter property
   */
  const POST_OBJECT_3 = {
    secret: 'My fourth test secret',
    expireAfterViews: 100,
    expireAfter: 1
  };
  describe('Testing the expireAfter property', () => {
    let hash = undefined;
    it('The secret should be viewable', (done) => {
      request(app).post(baseURL)
        .send(POST_OBJECT_3)
        .then((res) => {
          hash = res.body.hash;
          request(app).get(baseURL + hash)
            .then((res) => {
              expect(res.body.remainingViews).to.be.equal(POST_OBJECT_3.expireAfterViews - 1);
              done();
            });
        })
        .catch((err) => done(err));
    });
    it('The secret should not be viewable and the server must response the following text: "The secret is expired!" string', function (done) {
      this.timeout(62000);
      setTimeout(function () {
        request(app).get(baseURL + hash)
          .then((res) => {
            expect(res.body.message).to.be.equal("The secret is expired!");
            done();
          });
      }, 60000);
    });
  });
});