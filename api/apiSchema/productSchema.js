const Joi = require('@hapi/joi');

module.exports.createProductSchema = Joi.object().keys({
  productName: Joi.string().required(),
  price: Joi.string().required(),
  productDescription: Joi.string().required(),
  brand: Joi.string().optional(),
  minimumOrderQuantity: Joi.string().required()
});

module.exports.retrieveAllProductSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string()
});

module.exports.updateExitingProductSchema = Joi.object().keys({
    productName: Joi.string(),
    price: Joi.string(),
    productDescription: Joi.string(),
    brand: Joi.string(),
    minimumOrderQuantity: Joi.string()
});

module.exports.searchProductSchema = Joi.object({
  name: Joi.string().optional(),
  minPrice: Joi.string().optional(),
  maxPrice: Joi.string().optional(),
  minMoQ: Joi.string().optional(),
  maxMoQ: Joi.string().optional(),
  description: Joi.string().optional(),
  brand: Joi.string().optional(),
});
