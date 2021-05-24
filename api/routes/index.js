const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');
const userRouter = require('./users');
const {
  expressResponseHandler,
  expressErrorHandler,
} = require('../middlewares');

// assign `success` and `fail` methods to the `res` object
router.use(expressResponseHandler);

// api documentation
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// user routes
router.use('/users', userRouter)

// handle all the response errors
router.use(expressErrorHandler);

module.exports = router;
