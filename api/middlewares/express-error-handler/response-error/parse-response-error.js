const parseResponseError =
  (isValidationError, parseValidationErrors, parseAppError) =>
    error =>
      (isValidationError(error) ?
        parseValidationErrors(error) :
        parseAppError(error));

module.exports = parseResponseError;
