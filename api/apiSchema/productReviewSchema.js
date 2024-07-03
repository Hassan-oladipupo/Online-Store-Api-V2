const Joi = require('@hapi/joi');

module.exports.addProductReviewSchema = Joi.object().keys({
  productId: Joi.string().required(),
  userId: Joi.string().required(),
  review: Joi.string().required(),
  rating: Joi.number().required()
});



module.exports.updateProductReviewSchema = Joi.object().keys({
  productId: Joi.string().optional(),
  userId: Joi.string().required(),
  review: Joi.string().optional(),
  reviewer: Joi.string().optional(),
  reviewerEmail: Joi.string().optional(),
  rating: Joi.number().required()
});


