const Joi = require('@hapi/joi');

module.exports.createProductSchema = Joi.object().keys({
  productName: Joi.string().required(),
  price: Joi.string().required(),
  productDescription: Joi.string().required(),
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
    minimumOrderQuantity: Joi.string()
});
