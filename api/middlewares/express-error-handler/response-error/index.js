const
  responseError
    = require('./response-error-list'),

  {
    isValidationError,
    parseValidationError
  } = require('./validation-error'),

  parseAppError
    = require('./parse-app-error')(
      responseError
    ),

  parseResponseError
  = require('./parse-response-error')(
    isValidationError,
    parseValidationError,
    parseAppError
  );

module.exports = {
  // responseError,
  parseResponseError,
};
