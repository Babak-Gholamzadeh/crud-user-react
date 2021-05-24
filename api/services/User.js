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

const getOne = async id => {
  const user = await UserCollection.findById(id);
  // check if nothing is found by the id
  // throw a NOT_FOUND error
  if (!user)
    throw AppError('userId').USERID_NOT_FOUND;

  return user;
};

const updateOne = async (id, userData) => {
  // check if the `userName` is duplicated,
  // throw a DUPLICATED error
  const { userName } = userData;
  if (userName) {
    const users = await UserCollection.find({ userName });
    if (users.total)
      if (users.data.find(entity => entity.id !== id))
        throw AppError('userName').USERNAME_IS_DUPLICATED;
  }

  const user = await UserCollection.updateById(id, userData);
  // check if nothing is found by the id
  // throw a NOT_FOUND error
  if (!user)
    throw AppError('userId').USERID_NOT_FOUND;

  return user;
};

module.exports = {
  createOne,
  getAll,
  getOne,
  updateOne,
};
