const { db, AppError } = require('../utils');

const UserCollection = db.getCollection('users');

const createOne = async userData => {
  // check if the `userName` is duplicated,
  // throw a DUPLICATED error
  const { userName } = userData;
  const users = await UserCollection.find({ userName });
  if (users.total)
    throw AppError('userName').USERNAME_IS_DUPLICATED;

  const newUser = await UserCollection.insertOne(userData);
  return newUser;
};

const getAll = async ({ skip, limit }) => {
  const { total, data } = await UserCollection.find({}, { skip, limit });
  return {
    pagination: {
      total,
      skip: +skip,
      limit: +limit,
    },
    data,
  };
};

module.exports = {
  createOne,
  getAll,
};
