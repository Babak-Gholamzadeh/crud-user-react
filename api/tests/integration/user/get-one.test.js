const request = require('supertest');
const app = require('../../../app');
const faker = require('faker');
const { db } = require('../../../utils');

describe('User :: GET /users/:id', () => {

  beforeEach(async (done) => {
    await db.dropCollection('users');
    done();
  });

  afterAll(async (done) => {
    await db.dropCollection('users');
    done();
  });

  it('should returns the data of an existing user correctly', async () => {
    const userData = {
      userName: faker.internet.userName(),
      givenName: faker.name.findName(),
      surName: faker.name.lastName(),
      DOB: faker.date.past().toString(),
    };

    const { id } = await db.getCollection('users').insertOne(userData);

    const res = await request(app)
      .get(`/users/${id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual({
      id: expect.any(String),
      ...userData,
    });
  });

  it('should returns a not found error', async () => {
    const userId = faker.datatype.uuid();

    const res = await request(app)
      .get(`/users/${userId}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual({
      userId: ['the user id is not found']
    });
  });

});