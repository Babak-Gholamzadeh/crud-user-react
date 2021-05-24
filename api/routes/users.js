const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares');
const { userController } = require('../controllers');

router.route('/')
  .post(validate.createUser, userController.createOne);

module.exports = router;
