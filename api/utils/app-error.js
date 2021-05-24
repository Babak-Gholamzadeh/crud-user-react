const AppError = field => ({
  USERNAME_IS_DUPLICATED: {
    code: 'USERNAME_IS_DUPLICATED',
    field,
  },
  USERID_NOT_FOUND: {
    code: 'USERID_NOT_FOUND',
    field,
  },
});

module.exports = AppError;
