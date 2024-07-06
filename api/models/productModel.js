const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  price: String,
  productDescription: String,
  short_description: String,
  imageUrl: String,
  minimumOrderQuantity: String,
  productBrand: String,
  productCategory: String, 
  date_created: {
    type: Date,
    default: Date.now
  },
  date_modified: {
    type: Date,
    default: Date.now
  },
  type: { type: String, default: 'simple' },
  status: { type: String, default: 'publish' },
  sku: String,
  regular_price: String,
  sale_price: String,
  date_on_sale_from: Date,
  date_on_sale_from_gmt: Date,
  date_on_sale_to: Date,
  date_on_sale_to_gmt: Date,
  on_sale: Boolean,
  purchasable: Boolean,
  total_sales: Number,
  productTag: String 
}, { 
  timestamps: true,
  toObject: {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = mongoose.model('Product', productSchema);
