const responseError = (field = 'defaultMessage') => ({
  SAMPLE_ERROR: {
    errors: { [field]: ['sample message'] },
    statusCode: 400,
  },
});

module.exports = responseError;
