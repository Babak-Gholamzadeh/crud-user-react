const faker = require('faker');
const { db } = require('./utils');

(async function generateUsers(count) {
  await db.dropCollection('users');

  const data = Array.from({ length: count }, () => ({
    userName: faker.internet.userName(),
    givenName: faker.name.findName(),
    surName: faker.name.lastName(),
    DOB: faker.date.past().toString(),
  }));

  await db.getCollection('users').insertMany(data);

  console.log(`${count} users with dumy data have been generated`);

})(process.argv[2] || 10);
