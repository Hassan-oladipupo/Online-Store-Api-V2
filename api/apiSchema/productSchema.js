const Joi = require('@hapi/joi');

module.exports.createProductSchema = Joi.object().keys({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  productDescription: Joi.string().required(),
  imageUrl: Joi.string().required(),
  minimumOrderQuantity: Joi.number().required()
});

module.exports.retrieveAllProductSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string()
});

module.exports.updateExitingProductSchema = Joi.object().keys({
  name: Joi.string(),
  price: Joi.number(),
  brand: Joi.string()
});
