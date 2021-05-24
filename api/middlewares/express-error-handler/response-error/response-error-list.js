const responseError = (field = 'defaultMessage') => ({
  USERNAME_IS_DUPLICATED: {
    errors: { [field]: ['the username has already been taken'] },
    statusCode: 400,
  },
  USERID_NOT_FOUND: {
    errors: { [field]: ['the user id is not found'] },
    statusCode: 404,
  },
});

module.exports = responseError;
