const AppError = field => ({
  USERNAME_IS_DUPLICATED: {
    code: 'USERNAME_IS_DUPLICATED',
    field,
  },
});

module.exports = AppError;
