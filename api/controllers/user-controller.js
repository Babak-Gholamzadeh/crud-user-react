const { asyncHandler } = require('../utils');
const { User } = require('../services');

const createOne = asyncHandler(async (req, res) => {
  const {
    body: {
      userName,
      givenName,
      surName,
      DOB,
    }
  } = req;

  const result = await User.createOne({
    userName,
    givenName,
    surName,
    DOB,
  });
  res.success(result);
});

const getAll = asyncHandler(async (req, res) => {
  let {
    query: {
      skip = 0,
      limit = 20,
    }
  } = req;
  limit = limit > 100 ? 100 : limit;

  const result = await User.getAll({ skip, limit });
  res.success(result);
});

const getOne = asyncHandler(async (req, res) => {
  const { params: { id } } = req

  const result = await User.getOne(id);
  res.success(result);
});

module.exports = {
  createOne,
  getAll,
  getOne,
};
