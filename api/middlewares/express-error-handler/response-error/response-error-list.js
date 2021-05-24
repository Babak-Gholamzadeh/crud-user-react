const responseError = (field = 'defaultMessage') => ({
  USERNAME_IS_DUPLICATED: {
    errors: { [field]: ['the username has already been taken'] },
    statusCode: 400,
  },
});

module.exports = responseError;
