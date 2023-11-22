// 오류
const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync()
})

beforEach(() => {
  
});

describe('POST /join', () => {
  test('로그인 안 했으면 가입', (done) => {
    request(app).post('/auth/join')
      .send({
        email: 'choibo@naver.com',
        nick: 'bobobo',
        password: 'choibo11'
      })
      .expect('Location', '/')
      .expect(302, done)
  })
})

describe('POST /login', () =>{
  test('로그인 수행', (done) => {
    request(app).post('/auth/login')
      .send({
        email: 'choibo@naver.com',
        password: 'choibo11'
      })
      .expect('Location', '/')
      .expect(302, done)
  })
});

afterEach(() => {});

aftereAll(() => {

});