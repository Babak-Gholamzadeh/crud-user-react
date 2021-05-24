const Ajv = require('ajv');
const ajv = new Ajv({
  allErrors: true,
  // verbose: true,
});

const createValidator = objField =>
  schema => {
    const validate = ajv.compile(schema);
    return (req, res, next) => {
      const valid = validate(req[objField]);
      if (!valid)
        return next(validate.errors);
      next();
    };
  };

module.exports = createValidator;
