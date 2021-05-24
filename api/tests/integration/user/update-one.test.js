const request = require('supertest');
const app = require('../../../app');
const faker = require('faker');
const { db } = require('../../../utils');

describe('User :: PUT /users/:id', () => {

  beforeEach(async (done) => {
    await db.dropCollection('users');
    done();
  });

  afterAll(async (done) => {
    await db.dropCollection('users');
    done();
  });

  it('should returns the data of an updated user correctly', async () => {
    const userData = {
      userName: faker.internet.userName(),
      givenName: faker.name.findName(),
      surName: faker.name.lastName(),
      DOB: faker.date.past().toString(),
    };
    const { id } = await db.getCollection('users').insertOne(userData);

    const newUserData = {
      userName: faker.internet.userName(),
      givenName: faker.name.findName(),
      surName: faker.name.lastName(),
      DOB: faker.date.past().toString(),
    };

    const res = await request(app)
      .put(`/users/${id}`)
      .send(newUserData)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual({
      id,
      ...newUserData,
    });
  });

  it('should returns a not found error', async () => {
    const newUserData = {
      userName: faker.internet.userName(),
      givenName: faker.name.findName(),
      surName: faker.name.lastName(),
      DOB: faker.date.past().toString(),
    };

    const id = faker.datatype.uuid();

    const res = await request(app)
      .put(`/users/${id}`)
      .send(newUserData)
      .set('Accept', 'application/json');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual({
      userId: ['the user id is not found']
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
    await db.getCollection('users').insertOne(firstUserData);

    const secondUserData = {
      userName: faker.internet.userName(),
      givenName: faker.name.findName(),
      surName: faker.name.lastName(),
      DOB: faker.date.past().toString(),
    };

    const { id } = await db.getCollection('users').insertOne(secondUserData);

    const res = await request(app)
      .put(`/users/${id}`)
      .send({ userName })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual({
      userName: ['the username has already been taken']
    });
  });

});
