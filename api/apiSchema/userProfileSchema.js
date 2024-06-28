const Joi = require('@hapi/joi');

const billingAddressSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  address1: Joi.string().required(),
  address2: Joi.string().optional(), 
  phoneNumber: Joi.string().required(),
  emailAddress: Joi.string().email().required()
});

const shippingAddressSchema = Joi.object().keys({
  firstName: Joi.string().optional(), 
  lastName: Joi.string().optional(), 
  address1: Joi.string().optional(), 
  address2: Joi.string().optional(), 
  phoneNumber: Joi.string().optional(), 
  emailAddress: Joi.string().email().optional(), 
});




module.exports.addUserProfileSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  billingAddress: Joi.array().items(billingAddressSchema).required(),
  shippingAddress: Joi.array().items(shippingAddressSchema).required()
});




module.exports.updateUserProfileSchema = Joi.object().keys({
  email: Joi.string().email().optional(), 
  firstName: Joi.string().optional(), 
  lastName: Joi.string().optional(), 
  billingAddress: Joi.array().items(billingAddressSchema).optional(), 
  shippingAddress: Joi.array().items(shippingAddressSchema).optional(), 
});


