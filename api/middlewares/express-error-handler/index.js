const { parseResponseError } = require('./response-error');

const expressErrorHandler = (err, req, res, next) => {
  if(process.env.NODE_ENV === 'development')
    console.log('Response error handler:', err);

  const {
    errors,
    statusCode,
  } = parseResponseError(err);

  res
    .status(statusCode)
    .json({
      success: false,
      message: 'something wrong happend',
      errors,
    });

};

module.exports = expressErrorHandler;
