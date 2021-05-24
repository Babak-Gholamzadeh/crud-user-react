const parseControllerError =
  responseError =>
    error => ({
      ...responseError().INTERNAL_SERVER_ERROR,
      ...responseError(error.field)[error.code]
    });

module.exports = parseControllerError;
