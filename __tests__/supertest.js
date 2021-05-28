/* eslint-disable arrow-body-style */
/* eslint-disable linebreak-style */
const request = require('supertest');
require('regenerator-runtime/runtime');
const app = require('../server/server');

const server = 'http://localhost:3000';

// https://www.npmjs.com/package/supertest
describe('Routes', () => {
  describe('/test', () => {
    describe('GET', () => {
      it('gets the test endpoint', async () => {
        const response = await request(app).get('/test');

        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toBe('Test Response!');
      });
    });
  });

  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', (done) => {
        request(app)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200, done);
      });
    });
    describe('POST', () => {
      it('responds to unknown method with 404 status', (done) => {
        request(app)
          .post('/')
          .expect(404, done);
      });
    });
  });

  describe('/user', () => {
    describe('POST', () => {
      it('sends back user information after logging in', async () => {
        const response = await request(app)
          .post('/user')
          .send({ username: 'Thomas', password: 'codesmith' });
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ user: 'Thomas' });
      });
    });
    describe('POST /signup', () => {
      it('sends back user information after signing up', async () => {
        const response = await request(app)
          .post('/user/signup')
          .set('Content-Type', 'application/json')
          .send({
            newUser: 'ThomasClone',
            newPassword: 'codesmith',
            email: 'test@test.com',
            amazon: true,
            hulu: true,
            netflix: true,
          });
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ user: 'ThomasClone' });
      });
    });
  });

  describe('/movie', () => {
    describe('GET', () => {
      it('sends back movie data', async () => {
        // route has query string of ?title=Paddington attached
        const response = await request(app)
          .get('/movie/?title=Paddington');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ movie: '???' });
      });
    });
  });
});
