const expressResponseHandler = (req, res, next) => {
  const handlers = {
    success: (result, message = 'operation was successful', statusCode = 200) => {
      let metaData = undefined;
      let data = result;
      if (result && result.pagination) {
        metaData = {
          pagination: result.pagination
        };
        ({ data } = result);
      }
      res.status(statusCode).json({
        success: true,
        metaData,
        data,
        message,
      });
    },
    fail: next,
  };
  Object.assign(res, handlers);
  next();
};

module.exports = expressResponseHandler;
