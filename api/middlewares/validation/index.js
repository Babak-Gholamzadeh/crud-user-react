const createValidator = require('../../utils/create-validator')('body');

const createUser = require('./schemas/create-user.json');
const updateUser = require('./schemas/update-user.json');

module.exports = {
  createUser: createValidator(createUser),
  updateUser: createValidator(updateUser),
};
