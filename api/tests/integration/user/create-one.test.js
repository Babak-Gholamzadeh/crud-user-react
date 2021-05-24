const request = require('supertest');
const app = require('../../../app');
const faker = require('faker');
const { db } = require('../../../utils');

describe('User :: POST /users', () => {

  beforeEach(async (done) => {
    await db.dropCollection('users');
    done();
  });

  afterAll(async (done) => {
    await db.dropCollection('users');
    done();
  });

  it('should returns the data and id of new user correctly', async () => {
    const userData = {
      userName: faker.internet.userName(),
      givenName: faker.name.findName(),
      surName: faker.name.lastName(),
      DOB: faker.date.past().toString(),
    };

    const res = await request(app)
      .post('/users')
      .send(userData)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual({
      id: expect.any(String),
      ...userData,
    });
  });

  it('should returns a duplication error', async () => {
    const userName = faker.internet.userName();
    const firstUserData = {
      userName,
      givenName: faker.name.findName(),
      surName: faker.name.lastName(),
      DOB: faker.date.past().toString(),
    };
    const secondUserData = {
      userName,
      givenName: faker.name.findName(),
      surName: faker.name.lastName(),
      DOB: faker.date.past().toString(),
    };

    await db.getCollection('users').insertOne(firstUserData);

    const res = await request(app)
      .post('/users')
      .send(secondUserData)
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual({
      userName: ['the username has already been taken']
    });
  });

});