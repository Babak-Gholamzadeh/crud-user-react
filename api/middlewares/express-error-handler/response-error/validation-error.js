const BAD_REQ_STATUS_CODE = 400;

const normalizeField = (keyword, instancePath, params) => {
  let path = (keyword === 'required' ?
    `${instancePath}.${params.missingProperty}` :
    instancePath.substr(1));
  if(path.startsWith('.')) path = path.substr(1);
  return path;
};

const isValidationError = err => Array.isArray(err);

const parseValidationError = ajvErrors => {

  const errors = ajvErrors.reduce((errors, { keyword, instancePath, params, message }) => {
    const field = normalizeField(keyword, instancePath, params);

    Array.isArray(errors[field]) || (errors[field] = []);
    errors[field].push(message);

    return errors;
  }, {});

  return {
    statusCode: BAD_REQ_STATUS_CODE,
    errors,
  };
};

module.exports = {
  isValidationError,
  parseValidationError,
};
