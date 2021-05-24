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

module.exports = {
  createOne,
};
