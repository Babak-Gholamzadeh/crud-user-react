const request = require('supertest');
const app = require('../../../app');
const faker = require('faker');
const { db } = require('../../../utils');

describe('User :: GET /users', () => {

  beforeEach(async (done) => {
    await db.dropCollection('users');
    done();
  });

  afterAll(async (done) => {
    await db.dropCollection('users');
    done();
  });

  it('should returns the data of all existing users correctly', async () => {
    let data = Array.from({length: 3}, () => ({
      userName: faker.internet.userName(),
      givenName: faker.name.findName(),
      surName: faker.name.lastName(),
      DOB: faker.date.past().toString(),
    }));
    const users = await db.getCollection('users').insertMany(data);

    const res = await request(app)
      .get('/users');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.metaData.pagination).toEqual({
      total: 3,
      skip: 0,
      limit: 20
    });
    expect(res.body.data).toEqual(users);
  });

  it('should returns an empty array when collection is empty', async () => {
    const res = await request(app)
      .get('/users');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.metaData.pagination).toEqual({
      total: 0,
      skip: 0,
      limit: 20
    });
    expect(res.body.data).toEqual([]);
  });

});