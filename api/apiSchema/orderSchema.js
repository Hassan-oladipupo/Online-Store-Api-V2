const Joi = require('@hapi/joi');


module.exports.createOrderSchema = Joi.object().keys({
  contactPerson: Joi.string().required(),
  deliveryAddress: Joi.string().required(),
  orderNote: Joi.string().allow(''),
  phoneNumber: Joi.string().required(), 
  totalProduct: Joi.number().required(),
  totalAmount: Joi.number().required(),
  items: Joi.array().items(
    Joi.object().keys({
      productId: Joi.string().hex().length(24).required(),
      quantity: Joi.number().required()
    })
  ).required(),
  userId: Joi.string().hex().length(24).required() 
});

module.exports.updateOrderSchema = Joi.object().keys({
    contactPerson: Joi.string().optional(),
    orderStatus: Joi.string().optional(),
    deliveryAddress: Joi.string().optional(),
    orderNote: Joi.string().allow('').optional(),
    phoneNumber: Joi.string().optional(),
    totalProduct: Joi.number().optional(),
    items: Joi.array().items(
      Joi.object().keys({
        productId: Joi.string().hex().length(24).required(),
        quantity: Joi.number().required()
      })
    ).optional(),
    userId: Joi.string().hex().length(24).optional(),
    quantity: Joi.number().optional(),
  totalAmount: Joi.number().optional(),
  });

module.exports.retrieveUserOrderSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
  });
