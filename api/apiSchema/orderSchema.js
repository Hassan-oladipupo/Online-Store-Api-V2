const Joi = require('@hapi/joi');


module.exports.createOrderSchema = Joi.object().keys({
  contactPerson: Joi.string().required(),
  deliveryAddress: Joi.string().required(),
  orderNote: Joi.string().allow(''),
  phoneNumber: Joi.string().required(), 
  TotalProduct: Joi.number().required(),
  productId: Joi.array().items(Joi.string().hex().length(24)).required(), 
  userId: Joi.string().hex().length(24).required() 
});

module.exports.updateOrderSchema = Joi.object().keys({
    contactPerson: Joi.string(),
    orderStatus: Joi.string(),
    deliveryAddress: Joi.string(),
    orderNote: Joi.string().allow(''),
    phoneNumber: Joi.string(),
    TotalProduct: Joi.number(),
    productId: Joi.array().items(Joi.string().hex().length(24)), 
    userId: Joi.string().hex().length(24) 
  });

module.exports.retrieveUserOrderSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
  });
