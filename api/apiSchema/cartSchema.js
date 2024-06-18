const Joi = require('@hapi/joi');

module.exports.createCartSchema = Joi.object().keys({
  quantity: Joi.number().required(),
  productId: Joi.array().items(Joi.string().hex().length(24)).required(), 
  userId: Joi.string().hex().length(24).required() 
});

module.exports.updateCartSchema = Joi.object().keys({
  quantityChange: Joi.number().required(),
  productId: Joi.required(), 

  });


