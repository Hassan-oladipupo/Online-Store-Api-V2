const Joi = require('@hapi/joi');

module.exports.createProductSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.string().required(),
  productDescription: Joi.string().required(),
  short_description: Joi.string().optional(),
  imageUrl: Joi.string().optional(),
  minimumOrderQuantity: Joi.string().required(),
  productBrand: Joi.string().optional(),
  productCategory: Joi.string().optional(), 
  date_created: Joi.date().optional(),
  date_modified: Joi.date().optional(),
  type: Joi.string().optional().default('simple'),
  status: Joi.string().optional().default('publish'),
  sku: Joi.string().optional(),
  regular_price: Joi.string().optional(),
  sale_price: Joi.string().optional(),
  date_on_sale_from: Joi.date().optional(),
  date_on_sale_to: Joi.date().optional(),
  on_sale: Joi.string().valid('true', 'false').required(),
  purchasable: Joi.string().valid('true', 'false').required(),
  total_sales: Joi.number().optional(),
  productTag: Joi.string().optional() 
}).options({ stripUnknown: true });

module.exports.retrieveAllProductSchema = Joi.object({
  skip: Joi.string().optional(),
  limit: Joi.string().optional()
});

module.exports.updateExistingProductSchema = Joi.object({
  productName: Joi.string().optional(),
  price: Joi.string().optional(),
  productDescription: Joi.string().optional(),
  short_description: Joi.string().optional(),
  imageUrl: Joi.string().optional(),
  minimumOrderQuantity: Joi.string().optional(),
  productBrand: Joi.string().optional(),
  productCategory: Joi.string().optional(), 
  date_created: Joi.date().optional(),
  date_modified: Joi.date().optional(),
  type: Joi.string().optional(),
  status: Joi.string().optional(),
  sku: Joi.string().optional(),
  regular_price: Joi.string().optional(),
  sale_price: Joi.string().optional(),
  date_on_sale_from: Joi.date().optional(),
  date_on_sale_to: Joi.date().optional(),
  on_sale: Joi.string().valid('true', 'false').optional(),
  purchasable: Joi.string().valid('true', 'false').optional(),
  total_sales: Joi.number().optional(),
  productTag: Joi.string().optional() 
}).options({ stripUnknown: true });

module.exports.searchProductSchema = Joi.object({
  productName: Joi.string().optional(),
  minPrice: Joi.string().optional(),
  maxPrice: Joi.string().optional(),
  minMoQ: Joi.string().optional(),
  maxMoQ: Joi.string().optional(),
  productDescription: Joi.string().optional(),
  brand: Joi.string().optional(),
  category: Joi.string().optional(),
  tag: Joi.string().optional() 
}).options({ stripUnknown: true });
