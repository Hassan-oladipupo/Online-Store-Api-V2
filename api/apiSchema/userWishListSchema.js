const Joi = require('@hapi/joi');

module.exports.createUserWishListSchema = Joi.object().keys({
  userId: Joi.string().hex().length(24).required(),
  productId: Joi.string().hex().length(24).required(),
});


