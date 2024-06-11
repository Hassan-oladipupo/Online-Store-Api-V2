const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const constants = require('../constants');

module.exports.validateToken = (req, res, next) => {
  let response = { ...constants.defaultServerResponse };
  try {
    if (!req.headers.authorization) {
      throw new Error(constants.requestValidationMessage.TOKEN_MISSING);
    }
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Error', error);
    response.message = error.message;
    response.status = 401;
    return res.status(response.status).send(response);
  }
};

module.exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.userRoles !== 'admin') {
      return res.status(403).send({ message: constants.requestValidationMessage.FORBIDDEN });
    }
    next();
  } catch (error) {
    console.log('Something went wrong: Middleware: isAdmin', error);
    throw new Error(error);
  }
};

module.exports.isValidPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /\d/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasDigits
  );
};
