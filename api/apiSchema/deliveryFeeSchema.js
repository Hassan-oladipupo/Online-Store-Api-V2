const Joi = require('@hapi/joi');

module.exports.addDeliveryFeeSchema = Joi.object().keys({
  productId: Joi.string().required(),
  deliveryFee: Joi.string().required(),
  state: Joi.string().required(),
  location: Joi.string().required(),
  quantity: Joi.number().required()
});


module.exports.retrieveAllDeliveryFeeSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string()
});


module.exports.updateDeliveryFeeSchema = Joi.object().keys({
  productId: Joi.string().optional(),
  deliveryFee: Joi.string().optional(),
  state: Joi.string().optional(),
  location: Joi.string().optional(),
  quantity: Joi.number().optional()
});


