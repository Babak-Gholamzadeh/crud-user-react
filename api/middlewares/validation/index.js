const createValidator = require('../../utils/create-validator')('body');

const createUser = require('./schemas/create-user.json');

module.exports = {
  createUser: createValidator(createUser),
};
