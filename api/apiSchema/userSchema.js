const Joi = require('@hapi/joi');

module.exports.register = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userRoles: Joi.string().optional()
  
});

module.exports.login = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required()
});