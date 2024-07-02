const Joi = require('@hapi/joi');

module.exports.ProductReviewSchema = Joi.object().keys({
  productId: Joi.number().required(),
  review: Joi.string().required(),
  reviewer: Joi.string().required(),
  reviewerEmail: Joi.string().optional(),
  rating: Joi.string().required()
});



module.exports.updateProductReviewSchema = Joi.object().keys({
  productId: Joi.number().optional(),
  review: Joi.string().optional(),
  reviewer: Joi.string().optional(),
  reviewerEmail: Joi.string().optional(),
  rating: Joi.string().optional()
});


