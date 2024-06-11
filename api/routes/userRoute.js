const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const userSchema = require('../apiSchema/userSchema');


router.post('/register',
  joiSchemaValidation.validateBody(userSchema.register),
  userController.register
);



router.post('/login',
  joiSchemaValidation.validateBody(userSchema.login),
  userController.login
)

module.exports = router;